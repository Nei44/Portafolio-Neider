"use client";

import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { motion } from "motion/react";

export function Proyectos() {
  return (
    <section id="proyectos" className="py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {"// 01"}
          </p>
          <h2 className="font-display text-3xl font-semibold text-text-primary md:text-[40px] md:leading-tight">
            Proyectos
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-text-secondary">
            Presentados como estudios de caso: contexto, metodología,
            herramientas y resultados — no solo una lista de tecnologías.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
