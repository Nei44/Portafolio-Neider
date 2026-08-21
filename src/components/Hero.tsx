"use client";

import { motion } from "motion/react";

const transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

export function Hero() {
  return (
    <section
      id="perfil"
      className="relative flex min-h-screen items-center pt-24"
    >
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent"
          >
            {"// Física aplicada a datos"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.25 }}
            className="font-display text-5xl font-light leading-[1.05] text-text-primary sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Neider{" "}
            <span className="font-medium text-accent">Arenas</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.4 }}
            className="mt-4 font-display text-lg font-light text-text-secondary sm:text-xl"
          >
            Físico · Analista de Datos
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.55 }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-text-secondary"
          >
            Convierto datos complejos en decisiones claras, con el rigor
            de la física y las herramientas del análisis moderno.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.65 }}
            className="mt-3 max-w-xl text-sm leading-relaxed text-text-tertiary"
          >
            Formación en Física por la Facultad de Ciencias de la UNAM,
            con experiencia en análisis de datos, pruebas de calidad de
            software y machine learning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.75 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#proyectos"
              className="rounded-[var(--radius-md)] bg-accent px-6 py-3 font-mono text-sm font-medium text-bg transition-all duration-200 hover:bg-accent-dim hover:shadow-[var(--glow-accent)]"
            >
              Ver proyectos
            </a>
            <a
              href="#contacto"
              className="rounded-[var(--radius-md)] border border-border-strong px-6 py-3 font-mono text-sm text-text-primary transition-all duration-200 hover:border-accent hover:text-accent"
            >
              Contactar
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: 0.9 }}
            className="mt-10 flex items-center gap-5 text-sm text-text-tertiary"
          >
            <a
              href="#"
              className="transition-colors duration-150 hover:text-accent"
            >
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="#"
              className="transition-colors duration-150 hover:text-accent"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 w-[1px] bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
