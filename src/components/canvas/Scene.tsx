"use client";

import { Canvas } from "@react-three/fiber";
import { ParticleUniverse } from "./ParticleUniverse";

type SceneProps = {
  scrollProgressRef: React.MutableRefObject<number>;
  particleCount: number;
  connectionCount: number;
};

export default function Scene({
  scrollProgressRef,
  particleCount,
  connectionCount,
}: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "default" }}
      camera={{ position: [0, 0, 18], fov: 50 }}
      aria-hidden="true"
    >
      <ParticleUniverse
        scrollProgressRef={scrollProgressRef}
        particleCount={particleCount}
        connectionCount={connectionCount}
      />
    </Canvas>
  );
}
