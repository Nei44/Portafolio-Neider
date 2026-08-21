"use client";

import { useEffect, useRef } from "react";

/**
 * Returns a mutable ref whose `.current` smoothly tracks the user's
 * scroll progress across the full page (0 = top, 1 = bottom).
 *
 * Reading from a ref (not state) means no React re-renders — the
 * value is consumed exclusively in useFrame loops inside R3F.
 */
export function useScrollProgress(): React.MutableRefObject<number> {
  const progress = useRef(0);
  const target = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      target.current = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    };

    const animate = () => {
      // Lerp toward target for buttery smooth transitions
      progress.current += (target.current - progress.current) * 0.08;
      if (Math.abs(target.current - progress.current) < 0.0001) {
        progress.current = target.current;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // capture initial position
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return progress;
}
