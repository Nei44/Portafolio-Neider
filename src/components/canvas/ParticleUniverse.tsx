"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  generateSphere,
  generateBrain,
  generateNetwork,
  generateStars,
  computeConnectionPairs,
  buildLineBuffers,
} from "@/lib/particlePositions";

// ── SHADERS ──────────────────────────────────────────────────────────

const particleVertexShader = /* glsl */ `
  attribute vec3 aTarget1;
  attribute vec3 aTarget2;
  attribute vec3 aTarget3;
  attribute float aRandom;

  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec3 uSignalPositions[6];
  uniform float uSignalIntensities[6];

  varying vec3 vColor;
  varying float vAlpha;
  varying float vSignalGlow;

  void main() {
    // Interpolate position between 4 states based on scroll progress
    vec3 pos;
    float stateT;

    if (uProgress < 0.33) {
      stateT = smoothstep(0.0, 0.33, uProgress);
      pos = mix(position, aTarget1, stateT);
    } else if (uProgress < 0.66) {
      stateT = smoothstep(0.33, 0.66, uProgress);
      pos = mix(aTarget1, aTarget2, stateT);
    } else {
      stateT = smoothstep(0.66, 1.0, uProgress);
      pos = mix(aTarget2, aTarget3, stateT);
    }

    // Subtle floating animation
    float floatPhase = uTime * 0.4 + aRandom * 6.2831;
    pos.y += sin(floatPhase) * 0.04 * (1.0 + aRandom);
    pos.x += cos(floatPhase * 0.7) * 0.02;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Point size — uses its OWN random value, decorrelated from aRandom
    // (which drives color). Before, size and color both keyed off aRandom,
    // so the whitest/brightest particles were always the biggest ones too —
    // that's what produced the oversized white clump. Also lowered the max.
    float sizeRand = fract(sin(aRandom * 91.345 + 7.13) * 43758.5453);
    float baseSize = 1.0 + pow(sizeRand, 1.8) * 3.3;

    // Isolated "star" points need extra size to read clearly on their own —
    // in the dense brain/network states they reinforce each other, but spread
    // out as stars they were getting lost. This is the fix for that.
    float starState = smoothstep(0.66, 0.85, uProgress);
    baseSize += starState * 1.2;

    // Larger + pulsing during brain state ("glowing brain")
    float brainInfluence = smoothstep(0.15, 0.33, uProgress)
                         * (1.0 - smoothstep(0.50, 0.60, uProgress));
    baseSize += brainInfluence * 1.0
              * (0.6 + 0.4 * sin(uTime * 2.5 + aRandom * 12.0));

    // Neural signal influence on size
    float signalGlow = 0.0;
    for (int i = 0; i < 6; i++) {
      float dist = distance(pos, uSignalPositions[i]);
      signalGlow += smoothstep(0.8, 0.0, dist) * uSignalIntensities[i];
    }
    vSignalGlow = signalGlow;
    baseSize += signalGlow * 1.8;

    gl_PointSize = baseSize * uPixelRatio * (10.0 / max(-mvPosition.z, 0.1));

    // Single accent hue (matches the amber/gold in "Arenas") — no purple/teal
    // 4 narrative color stops, synced to the same scroll segments as the shape
    // morph: desorden (ámbar) → cerebro (magenta) → redes (cian) → desorden (ámbar)
    vec3 c0 = vec3(0.961, 0.620, 0.043); // desorden inicial — ámbar de marca
    vec3 c1 = vec3(0.82, 0.28, 0.58);    // cerebro — magenta vivo
    vec3 c2 = vec3(0.20, 0.65, 0.95);    // redes neuronales — azul cian
    vec3 c3 = vec3(0.961, 0.620, 0.043); // desorden final — regresa al ámbar

    vec3 goldColor;
    if (uProgress < 0.33) {
      goldColor = mix(c0, c1, smoothstep(0.0, 0.33, uProgress));
    } else if (uProgress < 0.66) {
      goldColor = mix(c1, c2, smoothstep(0.33, 0.66, uProgress));
    } else {
      goldColor = mix(c2, c3, smoothstep(0.66, 1.0, uProgress));
    }
    vec3 whiteColor = vec3(1.0, 1.0, 1.0);

    // Phase color + a mix of accents: ~10% blue, ~15% purple, ~10% white
    // sparks, phase color fills the rest
    vec3 blueColor = vec3(0.25, 0.55, 0.95);
    vec3 purpleColor = vec3(0.62, 0.22, 0.85);

    if (aRandom < 0.65) {
      vColor = goldColor;
    } else if (aRandom < 0.75) {
      vColor = blueColor;
    } else if (aRandom < 0.90) {
      vColor = purpleColor;
    } else {
      vColor = whiteColor;
    }

    // Make the brightest few pop
    if (aRandom > 0.96) {
      vColor = mix(vColor, vec3(1.0), 0.8);
    }

    // Alpha with depth attenuation
    vAlpha = 1.0 - 0.05 * smoothstep(5.0, 25.0, -mvPosition.z);

    // Parpadeo / Twinkle: only a subset of particles blink noticeably, like
    // neurons firing — the rest stay steady so the network reads clearly
    // instead of the whole scene flickering at once.
    float isBlinker = step(0.65, fract(aRandom * 17.233));
    float blinkPhase = uTime * (1.2 + aRandom * 3.0) + aRandom * 25.0;
    float blink = sin(blinkPhase) * 0.5 + 0.5;
    blink = pow(blink, 3.0); // snappier on/off pulse, not a soft sine fade
    float twinkleMix = mix(1.0, mix(0.12, 1.0, blink), isBlinker);
    vAlpha *= twinkleMix;
  }
`;

const particleFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vSignalGlow;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;

    // Crisp, hard-edged disc with only a hairline anti-aliased rim — a soft
    // radial gradient always reads as a blurry blob no matter how tight the
    // exponent, so points are drawn as defined discs instead.
    float core = 1.0 - smoothstep(0.36, 0.5, dist);

    float alpha = vAlpha * core * 1.71;
    alpha = mix(alpha, alpha * 1.44 + 0.36, clamp(vSignalGlow, 0.0, 1.0));

    vec3 col = vColor * 1.71;
    col += vColor * vSignalGlow * 3.6;

    // Small hot-white glint in the center, still tightly bounded — a sharp
    // specular highlight, not a wide soft core
    if (dist < 0.14) {
       col = mix(col, vec3(1.0), 0.6);
    }

    gl_FragColor = vec4(col, alpha);
  }
`;

const lineVertexShader = /* glsl */ `
  attribute vec3 aTarget1;
  attribute vec3 aTarget2;
  attribute vec3 aTarget3;
  attribute float aLineProgress;

  uniform float uProgress;
  uniform float uTime;

  varying float vAlpha;
  varying vec3 vColor;
  varying vec3 vWorldPosition;

  void main() {
    vec3 pos;
    float stateT;

    if (uProgress < 0.33) {
      stateT = smoothstep(0.0, 0.33, uProgress);
      pos = mix(position, aTarget1, stateT);
    } else if (uProgress < 0.66) {
      stateT = smoothstep(0.33, 0.66, uProgress);
      pos = mix(aTarget1, aTarget2, stateT);
    } else {
      stateT = smoothstep(0.66, 1.0, uProgress);
      pos = mix(aTarget2, aTarget3, stateT);
    }

    // Removed wave logic to keep lines perfectly straight
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vWorldPosition = pos;

    // Thin and light — dense but not a solid saturated mass (per reference)
    vAlpha = 0.10;

    // Same 4-stop narrative color as the particles, so lines and points
    // always shift together: desorden (ámbar) → cerebro (magenta) →
    // redes (cian) → desorden (ámbar)
    vec3 c0 = vec3(0.961, 0.620, 0.043);
    vec3 c1 = vec3(0.82, 0.28, 0.58);
    vec3 c2 = vec3(0.20, 0.65, 0.95);
    vec3 c3 = vec3(0.961, 0.620, 0.043);

    if (uProgress < 0.33) {
      vColor = mix(c0, c1, smoothstep(0.0, 0.33, uProgress));
    } else if (uProgress < 0.66) {
      vColor = mix(c1, c2, smoothstep(0.33, 0.66, uProgress));
    } else {
      vColor = mix(c2, c3, smoothstep(0.66, 1.0, uProgress));
    }
  }
`;

const lineFragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  varying vec3 vWorldPosition;

  uniform vec3 uSignalPositions[6];
  uniform float uSignalIntensities[6];

  void main() {
    float signalGlow = 0.0;
    for (int i = 0; i < 6; i++) {
      float dist = distance(vWorldPosition, uSignalPositions[i]);
      signalGlow += smoothstep(0.7, 0.0, dist) * uSignalIntensities[i];
    }

    // Restrained multiplier — reduced to 90% to avoid competing with foreground
    vec3 col = mix(vColor * 0.945, vec3(1.0, 1.0, 1.0), signalGlow * 1.35);
    float alpha = mix(vAlpha, vAlpha * 3.6 + 0.54, clamp(signalGlow, 0.0, 1.0));

    gl_FragColor = vec4(col, alpha);
  }
`;

// ── COMPONENT ────────────────────────────────────────────────────────

type ParticleUniverseProps = {
  scrollProgressRef: React.MutableRefObject<number>;
  particleCount: number;
  connectionCount: number;
};

export function ParticleUniverse({
  scrollProgressRef,
  particleCount,
  connectionCount,
}: ParticleUniverseProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Track mouse position (window-level, not canvas — canvas has pointer-events-none)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Generate all position buffers
  const { spherePos, brainPos, networkPos, starsPos, randomArr } =
    useMemo(() => {
      const s = generateSphere(particleCount);
      const b = generateBrain(particleCount);
      const n = generateNetwork(particleCount);
      const st = generateStars(particleCount);
      const rand = new Float32Array(particleCount);
      for (let i = 0; i < particleCount; i++) {
        rand[i] = Math.sin(i * 137.508 + 1) * 43758.5453;
        rand[i] = rand[i] - Math.floor(rand[i]);
      }
      return { spherePos: s, brainPos: b, networkPos: n, starsPos: st, randomArr: rand };
    }, [particleCount]);

  // Connection pairs
  const connectionPairs = useMemo(() => {
    return computeConnectionPairs(particleCount, connectionCount);
  }, [particleCount, connectionCount]);

  // Connection line buffers
  const lineBuffers = useMemo(() => {
    return buildLineBuffers(connectionPairs, spherePos, brainPos, networkPos, starsPos);
  }, [connectionPairs, spherePos, brainPos, networkPos, starsPos]);

  // Adjacency list for signal propagation
  const adjacencyList = useMemo(() => {
    const adj: Record<number, number[]> = {};
    connectionPairs.forEach(([a, b]) => {
      if (!adj[a]) adj[a] = [];
      if (!adj[b]) adj[b] = [];
      adj[a].push(b);
      adj[b].push(a);
    });
    return adj;
  }, [connectionPairs]);

  // Active signals state (reference-based for performance inside useFrame)
  const signalsRef = useRef<Array<{
    startIdx: number;
    endIdx: number;
    progress: number;
    speed: number;
    delay: number;
    active: boolean;
  }>>([]);

  // Initialize signals if empty
  if (signalsRef.current.length === 0 && connectionPairs.length > 0) {
    const count = 4; // enough to feel alive without adding to the visual clutter
    for (let i = 0; i < count; i++) {
      signalsRef.current.push({
        startIdx: 0,
        endIdx: 0,
        progress: 0.0,
        speed: 1.0,
        delay: Math.random() * 2.0, // shorter initial delay so signals start firing sooner
        active: false,
      });
    }
  }

  // Shader materials
  const pointsMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uPixelRatio: { value: typeof window !== "undefined" ? window.devicePixelRatio : 1 },
          uSignalPositions: { value: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] },
          uSignalIntensities: { value: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
        },
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const linesMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uSignalPositions: { value: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] },
          uSignalIntensities: { value: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
        },
        vertexShader: lineVertexShader,
        fragmentShader: lineFragmentShader,
        transparent: true,
        depthWrite: false,
        // Normal (not Additive) blending: additive was the main source of the
        // "difuminado" look — thousands of overlapping lines were stacking
        // into a bright nebulous smear instead of staying as distinct strokes.
        blending: THREE.NormalBlending,
      }),
    [],
  );

  // Animation loop — update uniforms + mouse parallax
  useFrame((state, delta) => {
    if (!groupRef.current || document.hidden) return;

    // Responsive camera Z-scaling based on canvas width
    const width = state.size.width;
    let targetZ = 18;
    if (width < 640) targetZ = 28; // Mobile
    else if (width < 1024) targetZ = 22; // Tablet

    state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;
    state.camera.updateProjectionMatrix();

    const { clock } = state;
    const progress = scrollProgressRef.current;
    const time = clock.elapsedTime;

    // Update signals progress and compute active positions
    const tempPosA = new THREE.Vector3();
    const tempPosB = new THREE.Vector3();
    const signalPositionsArray = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
    const signalIntensitiesArray = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

    const getPos = (idx: number, scrollP: number, tVal: number, out: THREE.Vector3) => {
      const i3 = idx * 3;
      const x0 = spherePos[i3], y0 = spherePos[i3 + 1], z0 = spherePos[i3 + 2];
      const x1 = brainPos[i3], y1 = brainPos[i3 + 1], z1 = brainPos[i3 + 2];
      const x2 = networkPos[i3], y2 = networkPos[i3 + 1], z2 = networkPos[i3 + 2];
      const x3 = starsPos[i3], y3 = starsPos[i3 + 1], z3 = starsPos[i3 + 2];

      let px = 0, py = 0, pz = 0;
      let stateT = 0;

      if (scrollP < 0.33) {
        const rawT = Math.min(1.0, Math.max(0.0, scrollP / 0.33));
        stateT = rawT * rawT * (3.0 - 2.0 * rawT);
        px = x0 + (x1 - x0) * stateT;
        py = y0 + (y1 - y0) * stateT;
        pz = z0 + (z1 - z0) * stateT;
      } else if (scrollP < 0.66) {
        const rawT = Math.min(1.0, Math.max(0.0, (scrollP - 0.33) / 0.33));
        stateT = rawT * rawT * (3.0 - 2.0 * rawT);
        px = x1 + (x2 - x1) * stateT;
        py = y1 + (y2 - y1) * stateT;
        pz = z1 + (z2 - z1) * stateT;
      } else {
        const rawT = Math.min(1.0, Math.max(0.0, (scrollP - 0.66) / 0.34));
        stateT = rawT * rawT * (3.0 - 2.0 * rawT);
        px = x2 + (x3 - x2) * stateT;
        py = y2 + (y3 - y2) * stateT;
        pz = z2 + (z3 - z2) * stateT;
      }

      const aRandom = randomArr[idx];
      const floatPhase = tVal * 0.4 + aRandom * 6.2831;
      py += Math.sin(floatPhase) * 0.04 * (1.0 + aRandom);
      px += Math.cos(floatPhase * 0.7) * 0.02;

      out.set(px, py, pz);
    };

    signalsRef.current.forEach((sig, i) => {
      if (!sig.active) {
        // Countdown delay
        sig.delay -= delta;
        if (sig.delay <= 0 && connectionPairs.length > 0) {
          // Spawn synapse
          const pair = connectionPairs[Math.floor(Math.random() * connectionPairs.length)];
          sig.startIdx = pair[0];
          sig.endIdx = pair[1];
          sig.progress = 0.0;
          sig.speed = 1.0 + Math.random() * 0.8;
          sig.active = true;
        }
      }

      if (sig.active) {
        // Advance progress
        sig.progress += delta * sig.speed;
        if (sig.progress >= 1.0) {
          sig.active = false;
          // Set delay between 1 and 3 seconds
          sig.delay = 1.0 + Math.random() * 2.0;
        }
      }

      if (sig.active) {
        getPos(sig.startIdx, progress, time, tempPosA);
        getPos(sig.endIdx, progress, time, tempPosB);
        signalPositionsArray[i].lerpVectors(tempPosA, tempPosB, sig.progress);

        // Removed wave for signals to match perfectly straight lines
        // signalPositionsArray[i].y += sigWaveY;
        // signalPositionsArray[i].z += sigWaveZ;

        // Sine pulse intensity: peak at middle, 0 at endpoints
        signalIntensitiesArray[i] = Math.sin(sig.progress * Math.PI);
      } else {
        // Place inactive signals far away so they don't light up any particles
        signalPositionsArray[i].set(9999, 9999, 9999);
        signalIntensitiesArray[i] = 0.0;
      }
    });

    // Update particle shader uniforms
    pointsMaterial.uniforms.uProgress.value = progress;
    pointsMaterial.uniforms.uTime.value = time;
    pointsMaterial.uniforms.uSignalPositions.value = signalPositionsArray;
    pointsMaterial.uniforms.uSignalIntensities.value = signalIntensitiesArray;

    // Update line shader uniforms
    linesMaterial.uniforms.uProgress.value = progress;
    linesMaterial.uniforms.uTime.value = time;
    linesMaterial.uniforms.uSignalPositions.value = signalPositionsArray;
    linesMaterial.uniforms.uSignalIntensities.value = signalIntensitiesArray;

    // Enhanced mouse parallax (rotation + translation)
    const targetRotX = mouseRef.current.y * 0.15;
    const targetRotY = mouseRef.current.x * 0.22;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05 + 0.0008;

    const targetPosX = mouseRef.current.x * 0.8;
    const targetPosY = mouseRef.current.y * 0.6;
    groupRef.current.position.x += (targetPosX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetPosY - groupRef.current.position.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Particles */}
      <points material={pointsMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[spherePos, 3]}
          />
          <bufferAttribute
            attach="attributes-aTarget1"
            args={[brainPos, 3]}
          />
          <bufferAttribute
            attach="attributes-aTarget2"
            args={[networkPos, 3]}
          />
          <bufferAttribute
            attach="attributes-aTarget3"
            args={[starsPos, 3]}
          />
          <bufferAttribute
            attach="attributes-aRandom"
            args={[randomArr, 1]}
          />
        </bufferGeometry>
      </points>

      {/* Connection lines */}
      <lineSegments material={linesMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lineBuffers.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aTarget1"
            args={[lineBuffers.targets1, 3]}
          />
          <bufferAttribute
            attach="attributes-aTarget2"
            args={[lineBuffers.targets2, 3]}
          />
          <bufferAttribute
            attach="attributes-aTarget3"
            args={[lineBuffers.targets3, 3]}
          />
          <bufferAttribute
            attach="attributes-aLineProgress"
            args={[lineBuffers.lineProgress, 1]}
          />
        </bufferGeometry>
      </lineSegments>
    </group>
  );
}
