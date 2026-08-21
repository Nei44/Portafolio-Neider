export type Project = {
  slug: string;
  title: string;
  category: string;
  status: "En desarrollo" | "Completado" | "Pausado";
  summary: string; // teaser corto para la tarjeta de la grilla
  context: string;
  problem: string;
  objective: string;
  dataUsed: string;
  cleaningProcess: string;
  methodology: string;
  tools: string[];
  visualizations: string;
  results: string;
  learnings: string;
  limitations: string;
  repoUrl: string | null;
  demoUrl: string | null;
};

// Un solo proyecto real (el de econofísica/ML en la UNAM, mencionado
// por el usuario), con cada campo específico marcado como pendiente —
// no se inventan datos, metodología ni resultados que no se han dado.
export const PROJECTS: Project[] = [
  {
    slug: "econofisica-ml-unam",
    title: "Proyecto de Econofísica y Machine Learning",
    category: "Econofísica · Finanzas cuantitativas",
    status: "En desarrollo",
    summary:
      "Proyecto personal desarrollado en la UNAM aplicando modelos de física estadística y machine learning a series financieras.",
    context:
      "[CONTEXTO — dónde surge el proyecto, qué pregunta de investigación o necesidad lo originó.]",
    problem:
      "[PROBLEMA — qué pregunta concreta intenta responder o qué comportamiento del mercado/sistema busca modelar.]",
    objective: "[OBJETIVO — qué se buscaba lograr específicamente.]",
    dataUsed:
      "[DATOS UTILIZADOS — fuente, periodo, frecuencia, tamaño del dataset.]",
    cleaningProcess:
      "[PROCESO DE LIMPIEZA — pasos de preparación, tratamiento de valores atípicos/faltantes.]",
    methodology:
      "[METODOLOGÍA — qué modelos de física estadística y de machine learning se aplicaron, y por qué.]",
    tools: ["Python", "[Herramienta adicional]"],
    visualizations: "[GRÁFICAS/VISUALIZACIONES — qué se graficó y qué mostraban.]",
    results: "[RESULTADO — hallazgo concreto, sin inventar métricas.]",
    learnings: "[APRENDIZAJES — qué se aprendió del proceso.]",
    limitations: "[LIMITACIONES — qué no cubre el modelo o el análisis.]",
    repoUrl: null, // [ENLACE AL REPOSITORIO]
    demoUrl: null,
  },
];
