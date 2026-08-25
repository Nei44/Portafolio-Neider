import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Format index as // 01, // 02, etc.
  const formattedIndex = `// ${String(index + 1).padStart(2, "0")}`;

  return (
    <Link
      href={`/proyectos/${project.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card group relative block p-6 h-full overflow-hidden"
    >
      {/* Micro-visualization of data in the background */}
      <div className="absolute right-6 bottom-16 w-32 h-14 pointer-events-none opacity-20 group-hover:opacity-40 transition-all duration-500 transform group-hover:scale-105">
        <svg viewBox="0 0 100 50" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Trend line */}
          <path
            d="M 5,42 Q 25,28 45,35 T 85,15"
            fill="none"
            stroke="var(--color-accent-cyan)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          {/* Regression curve */}
          <path
            d="M 5,38 L 85,20"
            fill="none"
            stroke="var(--color-accent-violet)"
            strokeWidth="1"
            strokeDasharray="3,3"
            opacity="0.8"
          />
          {/* Highlighted node points */}
          <circle cx="25" cy="28" r="2" fill="var(--color-accent)" className="animate-pulse" />
          <circle cx="65" cy="25" r="2.5" fill="var(--color-accent-cyan)" />
          <circle cx="85" cy="15" r="3" fill="var(--color-accent)" />
          <circle cx="45" cy="35" r="1.5" fill="var(--color-text-secondary)" />
        </svg>
      </div>

      {/* Header index + diagonal arrow */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs tracking-wider text-accent">
          {formattedIndex}
        </span>
        <svg
          className="w-5 h-5 text-text-tertiary transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="font-display text-lg font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent">
        {project.title}
      </h3>

      {/* Short description */}
      <p className="mt-3 text-sm leading-relaxed text-text-secondary max-w-[85%]">
        {project.summary}
      </p>

      {/* Tech tags: exactly 12px, IBM Plex Mono, 26px height, rounded 5-6px */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tools.slice(0, 3).map((tool) => (
          <span
            key={tool}
            className="h-[26px] px-2 flex items-center font-mono text-[12px] text-text-secondary border border-[#252932] bg-[#101217]/40 rounded-[5px] transition-colors duration-350 group-hover:border-accent/30"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Link Level 3 CTA */}
      <div className="mt-6">
        <span className="inline-flex items-center gap-1 font-mono text-xs text-accent">
          Explorar ↗
        </span>
      </div>
    </Link>
  );
}
