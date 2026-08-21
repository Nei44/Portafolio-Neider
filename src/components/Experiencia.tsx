"use client";

import { EXPERIENCE } from "@/data/experience";
import { motion } from "motion/react";

export function Experiencia() {
  return (
    <section id="experiencia" className="py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {"// 03"}
          </p>
          <h2 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">
            Experiencia
          </h2>
        </motion.div>

        <ol className="mt-10 max-w-2xl space-y-10 border-l border-border pl-8">
          {EXPERIENCE.map((entry, i) => (
            <motion.li
              key={`${entry.role}-${entry.org}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-60px" }}
              className="relative"
            >
              {/* Timeline dot */}
              <span
                className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg"
                aria-hidden="true"
              />
              {/* Glow behind dot */}
              <span
                className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 animate-pulse rounded-full bg-accent/30 blur-sm"
                aria-hidden="true"
              />

              <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
                {entry.period}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-text-primary">
                {entry.role}
              </h3>
              <p className="font-mono text-sm text-accent">{entry.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {entry.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-surface px-2.5 py-1 font-mono text-xs text-text-tertiary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
