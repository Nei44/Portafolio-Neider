"use client";

import { SKILL_GROUPS } from "@/data/skills";
import { motion } from "motion/react";

export function Habilidades() {
  return (
    <section id="habilidades" className="py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {"// 02"}
          </p>
          <h2 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">
            Habilidades
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
            Organizadas por función. El nivel se indica solo cuando puede
            justificarse con formación o experiencia concreta.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-[var(--radius-md)] border border-border bg-surface/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-border-strong"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-6 w-[3px] rounded-full bg-accent" />
                <div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-text-primary">
                    {group.category}
                  </h3>
                  {group.note && (
                    <p className="mt-1 text-xs text-text-tertiary">
                      {group.note}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-bg-elevated px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors duration-200 hover:bg-surface-hover hover:text-text-primary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
