"use client";

import { useSyncExternalStore } from "react";

// El soporte de WebGL no cambia mientras la pestaña está abierta, así
// que no hace falta un evento real al que suscribirse: basta con
// memoizar el resultado la primera vez que se pide. Se modela igual
// como "external store" (en vez de useState+useEffect) para no violar
// la regla react-hooks/set-state-in-effect y para dejar explícito que
// esto es una lectura de una fuente externa a React, no estado propio.
let cachedSupport: boolean | null = null;

function detectWebgl(): boolean {
  if (cachedSupport !== null) return cachedSupport;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cachedSupport = Boolean(gl);
  } catch {
    cachedSupport = false;
  }
  return cachedSupport;
}

function subscribe() {
  // No hay evento de cambio real; no-op suficiente para el contrato de useSyncExternalStore.
  return () => {};
}

function getServerSnapshot(): boolean | null {
  return null; // desconocido en SSR — se decide en cliente
}

export function useWebglSupport(): boolean | null {
  return useSyncExternalStore(subscribe, detectWebgl, getServerSnapshot);
}
