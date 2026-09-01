"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "@/data/navigation";

export function Nav() {
  const [activeHref, setActiveHref] = useState<string>("#perfil");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Section observer
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href),
    ).filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Track scroll for glassmorphism effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape to close mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
      >
        Saltar al contenido principal
      </a>

      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a
          href="#perfil"
          className="font-display text-sm font-medium tracking-wide text-text-primary"
        >
          N. ARENAS<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-[var(--radius-sm)] px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-150 ${
                    isActive
                      ? "text-accent"
                      : "text-white hover:text-accent"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-1 -bottom-1 h-[2px] rounded-full bg-accent" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <a
            href="/cv-neider-arenas.pdf"
            className="rounded-[var(--radius-sm)] border border-border-strong px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition-all duration-200 hover:border-accent hover:text-accent hover:shadow-[var(--glow-accent)]"
          >
            Descargar CV
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-border-strong p-2 text-text-primary md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">
            {mobileOpen ? "Cerrar menú" : "Abrir menú"}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className="border-t border-border bg-bg-elevated/95 px-5 py-4 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-[var(--radius-sm)] px-3 py-3 font-mono text-sm uppercase tracking-wider text-text-secondary hover:text-text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="/cv-neider-arenas.pdf"
                onClick={() => setMobileOpen(false)}
                className="block rounded-[var(--radius-sm)] border border-border-strong px-3 py-3 text-center font-mono text-xs uppercase tracking-wider text-text-primary"
              >
                Descargar CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
