import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Neider Arenas De La Cruz`,
    description: project.summary,
  };
}

const FIELDS: { key: keyof typeof PROJECTS[number]; label: string }[] = [
  { key: "context", label: "Contexto" },
  { key: "problem", label: "Problema" },
  { key: "objective", label: "Objetivo" },
  { key: "dataUsed", label: "Datos utilizados" },
  { key: "cleaningProcess", label: "Preparación y limpieza" },
  { key: "methodology", label: "Metodología" },
  { key: "visualizations", label: "Visualizaciones" },
  { key: "results", label: "Resultados" },
  { key: "learnings", label: "Aprendizajes" },
  { key: "limitations", label: "Limitaciones" },
];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main id="main" className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <Link
        href="/#proyectos"
        className="font-mono text-xs text-text-tertiary transition-colors duration-150 hover:text-accent"
      >
        ← Volver a proyectos
      </Link>

      <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {project.category}
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-text-primary sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-text-secondary">{project.summary}</p>

      {project.metrics && project.metrics.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 border-y border-border py-6">
          {project.metrics.map((metric, i) => (
            <div key={i}>
              <p className="text-2xl font-semibold text-accent">{metric.value}</p>
              <p className="mt-1 text-xs text-text-tertiary uppercase tracking-wider">{metric.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-sm bg-surface px-2 py-1 font-mono text-xs text-text-tertiary"
          >
            {tool}
          </span>
        ))}
      </div>

      <dl className="mt-12 space-y-10 border-t border-border pt-10">
        {FIELDS.map(({ key, label }) => (
          <div key={key}>
            <dt className="font-mono text-xs uppercase tracking-wider text-accent">
              {label}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-text-secondary">
              {project[key] as string}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 flex gap-4 border-t border-border pt-8">
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank" rel="noopener noreferrer"
            className="rounded-sm border border-border-strong px-4 py-2 font-mono text-xs text-text-primary hover:border-accent hover:text-accent"
          >
            Repositorio
          </a>
        ) : (
          <span className="rounded-sm border border-dashed border-border-strong px-4 py-2 font-mono text-xs text-text-tertiary">
            [ENLACE AL REPOSITORIO PENDIENTE]
          </span>
        )}
        {project.notebookUrl && (
          <a
            href={project.notebookUrl}
            target="_blank" rel="noopener noreferrer"
            className="rounded-sm border border-border-strong px-4 py-2 font-mono text-xs text-text-primary hover:border-accent hover:text-accent"
          >
            Notebook
          </a>
        )}
      </div>
    </main>
  );
}
