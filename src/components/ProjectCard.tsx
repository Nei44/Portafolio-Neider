import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

function ProjectIcon({ slug }: { slug: string }) {
  if (slug === 'analisis-catalogo-netflix') {
    return (
      <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10,40 L 90,40" stroke="var(--color-text-secondary)" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <rect x="20" y="25" width="12" height="15" fill="var(--color-accent-violet)" rx="2" className="drop-shadow-[0_0_5px_rgba(108,99,255,0.8)] animate-pulse" />
        <rect x="45" y="15" width="12" height="25" fill="var(--color-accent-cyan)" rx="2" className="drop-shadow-[0_0_5px_rgba(0,200,255,0.8)]" />
        <rect x="70" y="5" width="12" height="35" fill="var(--color-accent)" rx="2" className="drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
        <path d="M 26,25 Q 46,-5 76,5" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="3,3" className="drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
        <circle cx="26" cy="25" r="2.5" fill="#fff" className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]" />
        <circle cx="51" cy="15" r="2.5" fill="#fff" className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]" />
        <circle cx="76" cy="5" r="2.5" fill="#fff" className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]" />
        
        <circle r="2" fill="#fff" className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M 26,25 Q 46,-5 76,5" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  } else if (slug === 'sistema-trading-cuantitativo-btc-xgboost') {
    return (
      <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" xmlns="http://www.w3.org/2000/svg">
        <path d="M 15,35 L 30,20 L 50,28 L 70,10 L 85,15" fill="none" stroke="var(--color-accent-cyan)" strokeWidth="1.5" strokeLinejoin="round" className="drop-shadow-[0_0_5px_rgba(0,200,255,0.8)]" />
        <line x1="30" y1="12" x2="30" y2="28" stroke="var(--color-accent)" strokeWidth="1.5" className="drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
        <rect x="27" y="16" width="6" height="8" fill="var(--color-accent)" rx="1" className="drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
        <line x1="50" y1="20" x2="50" y2="36" stroke="var(--color-accent-violet)" strokeWidth="1.5" className="drop-shadow-[0_0_5px_rgba(108,99,255,0.8)]" />
        <rect x="47" y="24" width="6" height="8" fill="var(--color-accent-violet)" rx="1" className="drop-shadow-[0_0_5px_rgba(108,99,255,0.8)]" />
        <line x1="70" y1="5" x2="70" y2="15" stroke="var(--color-accent)" strokeWidth="1.5" className="drop-shadow-[0_0_5px_rgba(245,158,11,0.8)] animate-pulse" />
        <rect x="67" y="8" width="6" height="4" fill="var(--color-accent)" rx="1" className="drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
        <circle r="2.5" fill="#fff" className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M 15,35 L 30,20 L 50,28 L 70,10 L 85,15" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  } else if (slug === 'optimizacion-portafolio-riesgo-crediticio') {
    // Confusion matrix — 4 cells with animated scan line and color-coded accuracy
    return (
      <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-[0_0_8px_rgba(108,99,255,0.6)]" xmlns="http://www.w3.org/2000/svg">
        {/* Grid lines */}
        <line x1="20" y1="8" x2="20" y2="44" stroke="var(--color-border-strong)" strokeWidth="0.8" />
        <line x1="60" y1="8" x2="60" y2="44" stroke="var(--color-border-strong)" strokeWidth="0.8" />
        <line x1="20" y1="26" x2="96" y2="26" stroke="var(--color-border-strong)" strokeWidth="0.8" />
        {/* TP cell — top-left green (correct good) */}
        <rect x="21" y="9" width="38" height="16" fill="var(--color-positive)" fillOpacity="0.18" rx="2">
          <animate attributeName="fill-opacity" values="0.18;0.35;0.18" dur="2.8s" begin="0s" repeatCount="indefinite" />
        </rect>
        <text x="40" y="20" textAnchor="middle" fontSize="7" fill="var(--color-positive)" fontFamily="monospace" fontWeight="bold">TP</text>
        {/* FP cell — top-right red */}
        <rect x="61" y="9" width="34" height="16" fill="var(--color-negative)" fillOpacity="0.12" rx="2" />
        <text x="78" y="20" textAnchor="middle" fontSize="7" fill="var(--color-negative)" fontFamily="monospace">FP</text>
        {/* FN cell — bottom-left red (critical: missed risk) */}
        <rect x="21" y="27" width="38" height="16" fill="var(--color-negative)" fillOpacity="0.22" rx="2">
          <animate attributeName="fill-opacity" values="0.22;0.45;0.22" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
        </rect>
        <text x="40" y="38" textAnchor="middle" fontSize="7" fill="var(--color-negative)" fontFamily="monospace" fontWeight="bold">FN</text>
        {/* TN cell — bottom-right green */}
        <rect x="61" y="27" width="34" height="16" fill="var(--color-positive)" fillOpacity="0.10" rx="2" />
        <text x="78" y="38" textAnchor="middle" fontSize="7" fill="var(--color-positive)" fontFamily="monospace">TN</text>
        {/* Diagonal "correct" accent line */}
        <line x1="21" y1="9" x2="59" y2="25" stroke="var(--color-accent-violet)" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
        {/* Animated scan line */}
        <line x1="20" y1="8" x2="95" y2="8" stroke="var(--color-accent-violet)" strokeWidth="1" opacity="0.7">
          <animate attributeName="y1" values="8;44;8" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="y2" values="8;44;8" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.5s" repeatCount="indefinite" />
        </line>
        {/* Axis labels */}
        <text x="40" y="6.5" textAnchor="middle" fontSize="4.5" fill="var(--color-text-tertiary)" fontFamily="monospace">Pred Good</text>
        <text x="78" y="6.5" textAnchor="middle" fontSize="4.5" fill="var(--color-text-tertiary)" fontFamily="monospace">Pred Bad</text>
        <text x="10" y="21" textAnchor="middle" fontSize="4" fill="var(--color-text-tertiary)" fontFamily="monospace" transform="rotate(-90,10,21)">Good</text>
        <text x="10" y="38" textAnchor="middle" fontSize="4" fill="var(--color-text-tertiary)" fontFamily="monospace" transform="rotate(-90,10,38)">Bad</text>
      </svg>
    );
  } else {
    return (
      <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" xmlns="http://www.w3.org/2000/svg">
        <path d="M 5,42 Q 25,28 45,35 T 85,15" fill="none" stroke="var(--color-accent-cyan)" strokeWidth="2" strokeLinecap="round" className="transition-all duration-500" />
        <path d="M 5,38 L 85,20" fill="none" stroke="var(--color-accent-violet)" strokeWidth="1.5" strokeDasharray="3,4" />
        <circle r="2.5" fill="#ffffff" className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 5,42 Q 25,28 45,35 T 85,15" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="25" cy="28" r="3" fill="var(--color-accent)" className="animate-pulse drop-shadow-[0_0_5px_rgba(245,158,11,1)]" />
        <circle cx="65" cy="25" r="3.5" fill="var(--color-accent-cyan)" className="drop-shadow-[0_0_5px_rgba(0,200,255,1)]" />
        <circle cx="85" cy="15" r="4" fill="var(--color-accent)" className="drop-shadow-[0_0_5px_rgba(245,158,11,1)]" />
        <circle cx="45" cy="35" r="2.5" fill="#ffffff" className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]" />
      </svg>
    );
  }
}

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
      <div className="absolute right-4 bottom-14 w-36 h-16 pointer-events-none opacity-100 z-10">
        <ProjectIcon slug={project.slug} />
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
