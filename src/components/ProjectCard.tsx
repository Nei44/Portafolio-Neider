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
      className="glass-card group relative block p-6 h-full overflow-hidden hover:shadow-[0_0_40px_rgba(245,185,66,0.4),0_0_80px_rgba(245,185,66,0.15),0_1px_0_0_rgba(255,255,255,0.12)_inset]"
    >


      {/* Header index + diagonal arrow */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-sm tracking-wider text-accent">
          {formattedIndex}
        </span>
        <svg
          className="w-5 h-5 text-white transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent">
        {project.title}
      </h3>

      {/* Short description */}
      <p className="mt-3 text-base leading-relaxed text-white max-w-[85%]">
        {project.summary}
      </p>

      {/* Tech tags: exactly 12px, IBM Plex Mono, 26px height, rounded 5-6px */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tools.slice(0, 3).map((tool) => (
          <span
            key={tool}
            className="h-[28px] px-2 flex items-center font-mono text-sm text-white border border-[#252932] bg-[#101217]/40 rounded-[5px] transition-colors duration-350 group-hover:border-accent/30"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Link Level 3 CTA */}
      <div className="mt-6">
        <span className="inline-flex items-center gap-1 font-mono text-sm text-accent">
          Explorar ↗
        </span>
      </div>
    </Link>
  );
}
