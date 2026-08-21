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
  uniform vec3 uSignalPositions[3];
  uniform float uSignalIntensities[3];

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

    // Point size with distance attenuation
    float baseSize = 2.0 + aRandom * 1.8;

    // Larger + pulsing during brain state ("glowing brain")
    float brainInfluence = smoothstep(0.15, 0.33, uProgress)
                         * (1.0 - smoothstep(0.50, 0.60, uProgress));
    baseSize += brainInfluence * 2.5
              * (0.6 + 0.4 * sin(uTime * 2.5 + aRandom * 12.0));

    // Neural signal influence on size
    float signalGlow = 0.0;
    for (int i = 0; i < 3; i++) {
      float dist = distance(pos, uSignalPositions[i]);
      signalGlow += smoothstep(0.8, 0.0, dist) * uSignalIntensities[i];
    }
    vSignalGlow = signalGlow;
    baseSize += signalGlow * 3.5;

    gl_PointSize = baseSize * uPixelRatio * (10.0 / max(-mvPosition.z, 0.1));

    // Color transitions (Teoría del Color: Ámbar - Púrpura - Turquesa - Blanco)
    vec3 amber       = vec3(0.961, 0.620, 0.043);
    vec3 brightAmber = vec3(0.984, 0.749, 0.141);
    vec3 purple      = vec3(0.588, 0.157, 0.824); // Violeta brillante
    vec3 teal        = vec3(0.078, 0.722, 0.651); // Turquesa
    vec3 warmWhite   = vec3(0.98, 0.95, 0.88);

    if (uProgress < 0.33) {
      vColor = mix(amber, brightAmber, stateT);
      // Destellos púrpura y turquesa
      if (aRandom > 0.85) {
        vColor = mix(purple, brightAmber, stateT);
      } else if (aRandom > 0.68) {
        vColor = mix(teal * 0.8, brightAmber, stateT);
      }
    } else if (uProgress < 0.66) {
      // Mezcla análoga y fluida: Ámbar -> Púrpura -> Turquesa
      if (stateT < 0.5) {
        vColor = mix(brightAmber, purple, stateT * 2.0);
      } else {
        vColor = mix(purple, teal, (stateT - 0.5) * 2.0);
      }
      // Detalle de variedad de colores
      if (aRandom > 0.85) vColor = mix(amber, purple * 1.2, stateT);
      else if (aRandom > 0.70) vColor = mix(teal * 1.1, purple, stateT);
    } else {
      vColor = mix(teal, warmWhite, stateT);
      if (aRandom > 0.80) {
        vColor = mix(purple, warmWhite, stateT);
      }
    }

    // Alpha
    vAlpha = 0.85 - 0.15 * smoothstep(5.0, 25.0, -mvPosition.z);
    // Stars state: vary alpha
    if (uProgress > 0.66) {
      vAlpha *= mix(1.0, 0.3 + aRandom * 0.7, stateT);
    }
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

    // Soft glow with bright core
    float alpha = smoothstep(0.5, 0.05, dist) * vAlpha;
    // Boost alpha for glowing particles
    alpha = mix(alpha, alpha * 1.6 + 0.4, clamp(vSignalGlow, 0.0, 1.0));
    float core = smoothstep(0.12, 0.0, dist) * 0.4;

    // Boost brightness (color) based on signal glow
    vec3 col = vColor * (1.0 + core) * (1.0 + vSignalGlow * 3.0);

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

    // Ondulación senoidal en las aristas (capas red), amortiguada en extremos
    float damping = sin(aLineProgress * 3.14159265);
    float networkInfluence = smoothstep(0.33, 0.55, uProgress) * (1.0 - smoothstep(0.70, 0.88, uProgress));
    float waveY = sin(uTime * 2.8 - pos.x * 0.4) * 0.45 * networkInfluence * damping;
    float waveZ = cos(uTime * 2.8 - pos.x * 0.4) * 0.35 * networkInfluence * damping;
    pos.y += waveY;
    pos.z += waveZ;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vWorldPosition = pos;

    // Visibility per state
    float sphereA  = 0.06;
    float brainA   = 0.2;
    float networkA = 0.3;
    float starsA   = 0.08; // Enabled constellation lines in stars state

    if (uProgress < 0.33) {
      vAlpha = mix(sphereA, brainA, stateT);
    } else if (uProgress < 0.66) {
      vAlpha = mix(brainA, networkA, stateT);
    } else {
      vAlpha = mix(networkA, starsA, stateT);
    }

    // Color transitions (Teoría del Color: Ámbar - Púrpura - Turquesa)
    vec3 amber  = vec3(0.961, 0.620, 0.043);
    vec3 purple = vec3(0.588, 0.157, 0.824);
    vec3 teal   = vec3(0.078, 0.722, 0.651);

    // Smooth color blend matching the particle progression
    vec3 baseColor = mix(amber, teal, smoothstep(0.2, 0.7, uProgress));
    if (uProgress > 0.20 && uProgress < 0.80) {
      float pFactor = smoothstep(0.20, 0.50, uProgress) * (1.0 - smoothstep(0.50, 0.80, uProgress));
      vColor = mix(baseColor, purple, pFactor * 0.8);
    } else {
      vColor = baseColor;
    }
  }
`;

const lineFragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  varying vec3 vWorldPosition;

  uniform vec3 uSignalPositions[3];
  uniform float uSignalIntensities[3];

  void main() {
    float signalGlow = 0.0;
    for (int i = 0; i < 3; i++) {
      float dist = distance(vWorldPosition, uSignalPositions[i]);
      signalGlow += smoothstep(0.7, 0.0, dist) * uSignalIntensities[i];
    }

    // Boost color (to white) and alpha for lines close to the signal
    vec3 col = mix(vColor, vec3(1.0, 1.0, 1.0), signalGlow * 0.8);
    float alpha = mix(vAlpha, vAlpha * 2.5 + 0.7, clamp(signalGlow, 0.0, 1.0));

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
    const count = 3; // 3 concurrent synapses max
    for (let i = 0; i < count; i++) {
      signalsRef.current.push({
        startIdx: 0,
        endIdx: 0,
        progress: 0.0,
        speed: 1.0,
        delay: Math.random() * 3.0, // initial random delay between 0 and 3 seconds
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
          uSignalPositions: { value: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] },
          uSignalIntensities: { value: [0.0, 0.0, 0.0] },
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
          uSignalPositions: { value: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] },
          uSignalIntensities: { value: [0.0, 0.0, 0.0] },
        },
        vertexShader: lineVertexShader,
        fragmentShader: lineFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  // Animation loop — update uniforms + mouse parallax
  useFrame((state, delta) => {
    if (!groupRef.current || document.hidden) return;

    const { clock } = state;
    const progress = scrollProgressRef.current;
    const time = clock.elapsedTime;

    // Update signals progress and compute active positions
    const tempPosA = new THREE.Vector3();
    const tempPosB = new THREE.Vector3();
    const signalPositionsArray = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
    const signalIntensitiesArray = [0.0, 0.0, 0.0];

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

        // Aplicamos la misma ondulación senoidal al pulso para que siga la arista curva
        const networkInfluence = Math.min(1.0, Math.max(0.0, (progress - 0.33) / 0.22)) * (1.0 - Math.min(1.0, Math.max(0.0, (progress - 0.70) / 0.18)));
        const damping = Math.sin(sig.progress * Math.PI);
        const sigWaveY = Math.sin(time * 2.8 - signalPositionsArray[i].x * 0.4) * 0.45 * networkInfluence * damping;
        const sigWaveZ = Math.cos(time * 2.8 - signalPositionsArray[i].x * 0.4) * 0.35 * networkInfluence * damping;
        signalPositionsArray[i].y += sigWaveY;
        signalPositionsArray[i].z += sigWaveZ;

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
