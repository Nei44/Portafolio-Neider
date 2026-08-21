/**
 * particlePositions.ts
 *
 * Pure functions that generate Float32Array positions for each of the
 * four particle states: Sphere, Brain, Neural Network, and Stars.
 *
 * All positions are generated deterministically (seeded pseudo-random)
 * so they're stable across renders.
 */

// Deterministic pseudo-random (same as original FullScene.tsx)
const pr = (seed: number): number => {
  const x = Math.sin(seed + 1) * 43758.5453;
  return x - Math.floor(x);
};

// ── STATE 0: SPHERE ──────────────────────────────────────────────────
// Fibonacci sphere for perfectly uniform distribution.

export function generateSphere(
  count: number,
  scale: number = 7.0,
): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const seed = i * 137.508;

    // Spherical coordinates for a random direction
    const theta = pr(seed) * Math.PI * 2;
    const phi = Math.acos(pr(seed + 1) * 2 - 1);

    // Box-Muller transform to get a normal (Gaussian) distribution
    const u1 = pr(seed + 2);
    const u2 = pr(seed + 3);
    const normalDist = Math.sqrt(-2.0 * Math.log(u1 + 0.000001)) * Math.cos(2.0 * Math.PI * u2);

    // Expanded core and halo to fill the screen (simulate being inside)
    let r = 0;
    if (pr(seed + 4) > 0.3) {
      // Wide halo (expands to 18+ units, floating near/behind camera)
      r = Math.abs(normalDist) * scale * 2.6;
    } else {
      // Expanded core
      r = Math.abs(normalDist) * scale * 1.3;
    }

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return positions;
}

// ── STATE 1: BRAIN ───────────────────────────────────────────────────
// Deformed Fibonacci sphere → brain shape with medial fissure,
// hemispheres, flattened base, and surface bumps (gyri).

export function generateBrain(
  count: number,
  scale: number = 7.0,
): Float32Array {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    // Fibonacci sphere base
    const yFib = 1 - (2 * i) / (count - 1); // -1 to 1
    const radiusFib = Math.sqrt(1 - yFib * yFib);
    const theta = goldenAngle * i;

    let x = radiusFib * Math.cos(theta);
    let y = yFib;
    let z = radiusFib * Math.sin(theta);

    // Step 1: Elongate into brain proportions
    x *= 1.3; // wider left-right
    z *= 1.05; // slightly deeper front-to-back
    y *= 0.92; // compressed top-bottom

    // Step 2: Shift up (brain sits above its base)
    y += 0.12;

    // Step 3: Medial fissure (groove on top)
    if (y > 0) {
      const fissureStrength = Math.exp((-x * x) / 0.04) * 0.3 * Math.max(0, y);
      y -= fissureStrength;
      // Push hemispheres apart
      const push = fissureStrength * 0.35;
      if (x > 0) x += push;
      else x -= push;
    }

    // Step 4: Flatten the bottom
    if (y < -0.5) {
      y = -0.5 + (y + 0.5) * 0.3;
    }

    // Step 5: Surface bumps (gyri/sulci simulation)
    const r = Math.sqrt(x * x + y * y + z * z);
    if (r > 0.01) {
      const nx = x / r,
        ny = y / r,
        nz = z / r;
      const phiAngle = Math.acos(Math.max(-1, Math.min(1, yFib)));
      const bump =
        0.06 * Math.sin(6 * theta + 3 * phiAngle) +
        0.04 * Math.sin(10 * theta - 2 * phiAngle) +
        0.03 * Math.cos(8 * theta + 5 * phiAngle);
      x += bump * nx;
      y += bump * ny;
      z += bump * nz;
    }

    // Step 6: Final scale
    positions[i * 3] = x * scale;
    positions[i * 3 + 1] = y * scale;
    positions[i * 3 + 2] = z * scale;
  }

  return positions;
}

// ── STATE 2: NEURAL NETWORK ──────────────────────────────────────────
// 5 layers of nodes spread along x-axis, each layer is a Fibonacci disc.
// Wider middle layers simulate hidden layers of a neural network.

export function generateNetwork(
  count: number,
  scale: number = 5.0,
): Float32Array {
  const positions = new Float32Array(count * 3);
  const layers = 5;
  const particlesPerLayer = Math.floor(count / layers);
  const layerSpacing = scale * 0.8;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const layer = Math.min(Math.floor(i / particlesPerLayer), layers - 1);
    const localIndex = i - layer * particlesPerLayer;

    // Layer x position (centered)
    const x = (layer - (layers - 1) / 2) * layerSpacing;

    // Layer radius: wider in middle layers (hidden layers)
    const layerNorm = Math.abs(layer - (layers - 1) / 2) / ((layers - 1) / 2);
    const maxRadius = scale * (0.5 + (1 - layerNorm) * 0.6);

    // Fibonacci disc distribution
    const r = maxRadius * Math.sqrt((localIndex + 0.5) / particlesPerLayer);
    const angle = goldenAngle * localIndex;

    const y = r * Math.cos(angle);
    const z = r * Math.sin(angle);

    // Small jitter for organic feel
    const seed = i * 137.508;
    const jitter = scale * 0.04;

    positions[i * 3] = x + jitter * (pr(seed) - 0.5);
    positions[i * 3 + 1] = y + jitter * (pr(seed + 1) - 0.5);
    positions[i * 3 + 2] = z + jitter * (pr(seed + 2) - 0.5);
  }

  return positions;
}

// ── STATE 3: STARS ───────────────────────────────────────────────────
// Random distribution in a large sphere — field of stars.

export function generateStars(
  count: number,
  minRadius: number = 10,
  maxRadius: number = 50,
): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const seed = i * 137.508;
    const r = minRadius + pr(seed) * (maxRadius - minRadius);
    const theta = pr(seed + 1) * Math.PI * 2;
    const phi = Math.acos(pr(seed + 2) * 2 - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return positions;
}

// ── CONNECTIONS ──────────────────────────────────────────────────────
// Pre-compute connection pairs using Fibonacci stride pattern.
// These indices define which particles to connect with lines.

export function computeConnectionPairs(
  count: number,
  maxConnections: number = 500,
): [number, number][] {
  const layers = 5;
  const particlesPerLayer = Math.floor(count / layers);
  const pairs: [number, number][] = [];

  const gaps = layers - 1; // 4 gaps
  const connectionsPerGap = Math.floor(maxConnections / gaps);

  for (let g = 0; g < gaps; g++) {
    const start1 = g * particlesPerLayer;
    const start2 = (g + 1) * particlesPerLayer;

    for (let k = 0; k < connectionsPerGap; k++) {
      // Ensure every node in layer 1 gets connected, then repeat randomly
      const i = start1 + (k % particlesPerLayer);

      // Deterministic pseudo-random selection for node in layer 2
      const seed = g * 2000 + k * 137.5;
      const offset = Math.floor(pr(seed) * particlesPerLayer);
      const j = start2 + offset;

      pairs.push([i, j]);
    }
  }

  return pairs.slice(0, maxConnections);
}

// ── LINE GEOMETRY BUILDER ────────────────────────────────────────────
// Builds buffer attributes for LineSegments from connection pairs
// and 4 position arrays. Each line vertex stores all 4 target positions.

export function buildLineBuffers(
  connections: [number, number][],
  spherePos: Float32Array,
  brainPos: Float32Array,
  networkPos: Float32Array,
  starsPos: Float32Array,
): {
  positions: Float32Array;
  targets1: Float32Array;
  targets2: Float32Array;
  targets3: Float32Array;
  lineProgress: Float32Array;
} {
  const segments = 4; // Subdivide into 4 segments (8 vertices per connection)
  const vertCount = connections.length * segments * 2;
  const positions = new Float32Array(vertCount * 3);
  const targets1 = new Float32Array(vertCount * 3);
  const targets2 = new Float32Array(vertCount * 3);
  const targets3 = new Float32Array(vertCount * 3);
  const lineProgress = new Float32Array(vertCount);

  connections.forEach(([a, b], idx) => {
    const baseIdx = idx * segments * 2;

    for (let s = 0; s < segments; s++) {
      const tStart = s / segments;
      const tEnd = (s + 1) / segments;

      const v0 = (baseIdx + s * 2) * 3;
      const v1 = v0 + 3;

      // Vertex 0 (Start of segment)
      lineProgress[baseIdx + s * 2] = tStart;
      for (let k = 0; k < 3; k++) {
        positions[v0 + k] = spherePos[a * 3 + k] + (spherePos[b * 3 + k] - spherePos[a * 3 + k]) * tStart;
        targets1[v0 + k] = brainPos[a * 3 + k] + (brainPos[b * 3 + k] - brainPos[a * 3 + k]) * tStart;
        targets2[v0 + k] = networkPos[a * 3 + k] + (networkPos[b * 3 + k] - networkPos[a * 3 + k]) * tStart;
        targets3[v0 + k] = starsPos[a * 3 + k] + (starsPos[b * 3 + k] - starsPos[a * 3 + k]) * tStart;
      }

      // Vertex 1 (End of segment)
      lineProgress[baseIdx + s * 2 + 1] = tEnd;
      for (let k = 0; k < 3; k++) {
        positions[v1 + k] = spherePos[a * 3 + k] + (spherePos[b * 3 + k] - spherePos[a * 3 + k]) * tEnd;
        targets1[v1 + k] = brainPos[a * 3 + k] + (brainPos[b * 3 + k] - brainPos[a * 3 + k]) * tEnd;
        targets2[v1 + k] = networkPos[a * 3 + k] + (networkPos[b * 3 + k] - networkPos[a * 3 + k]) * tEnd;
        targets3[v1 + k] = starsPos[a * 3 + k] + (starsPos[b * 3 + k] - starsPos[a * 3 + k]) * tEnd;
      }
    }
  });

  return { positions, targets1, targets2, targets3, lineProgress };
}
