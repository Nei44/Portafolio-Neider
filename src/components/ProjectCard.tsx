import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="glow-card group block rounded-[var(--radius-lg)] border border-border bg-surface/60 p-6 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Category + Status */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-accent">
          {project.category}
        </span>
        <span className="rounded-full border border-border-strong px-2.5 py-0.5 font-mono text-[0.65rem] text-text-tertiary">
          {project.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-lg font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">
        {project.title}
      </h3>

      {/* Summary */}
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {project.summary}
      </p>

      {/* Tools */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full bg-bg-elevated px-2.5 py-1 font-mono text-[0.7rem] text-text-tertiary"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* CTA */}
      <span className="mt-5 inline-flex items-center gap-1 font-mono text-xs text-accent transition-transform duration-200 group-hover:translate-x-1">
        Ver estudio de caso
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
