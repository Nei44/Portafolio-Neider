"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useWebglSupport } from "@/hooks/useWebglSupport";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { StaticField } from "./StaticField";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

function useCounts() {
  const [counts, setCounts] = useState({ particles: 1800, connections: 350 });
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setCounts({ particles: 1200, connections: 200 });
      else if (w < 1024) setCounts({ particles: 1800, connections: 350 });
      else setCounts({ particles: 2500, connections: 500 });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return counts;
}

export function GlobalCanvas() {
  const reducedMotion = usePrefersReducedMotion();
  const webglSupported = useWebglSupport();
  const scrollProgressRef = useScrollProgress();
  const { particles, connections } = useCounts();
  const showAnimated = !reducedMotion && webglSupported === true;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    >
      {showAnimated ? (
        <Scene
          scrollProgressRef={scrollProgressRef}
          particleCount={particles}
          connectionCount={connections}
        />
      ) : (
        <StaticField />
      )}
    </div>
  );
}
