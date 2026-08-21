export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  summary: string;
  tools: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "QA Tester Trainee",
    org: "PRACTIA (Publicis Groupe)",
    period: "[FECHA]",
    summary:
      "[RESPONSABILIDADES Y PROBLEMAS RESUELTOS — completar con el detalle real del rol.]",
    tools: ["ISTQB CTFL 4.0", "[Herramienta]"],
  },
  {
    role: "Analista de Datos (sector cobranza)",
    org: "[NOMBRE DE LA EMPRESA]",
    period: "[FECHA]",
    summary:
      "[RESPONSABILIDADES Y PROBLEMAS RESUELTOS — completar con el detalle real del rol.]",
    tools: ["[Herramienta]"],
  },
];
