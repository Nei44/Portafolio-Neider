"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// useSyncExternalStore es la API pensada exactamente para esto: leer y
// suscribirse a una fuente de verdad externa al árbol de React (aquí,
// matchMedia del navegador) sin el patrón setState-dentro-de-efecto,
// que React 19 marca como inestable (renders en cascada).
function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

// En servidor no existe `window`; se asume reducido por defecto — la
// opción segura para no animar de más antes de confirmar la preferencia real.
function getServerSnapshot(): boolean {
  return true;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
