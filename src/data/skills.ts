export type SkillGroup = {
  category: string;
  note?: string; // contexto opcional, ej. de dónde viene la experiencia
  items: string[];
};

// Solo se listan como confirmadas las habilidades mencionadas
// directamente por el usuario. El resto queda marcado con
// "[Herramienta]" — a completar, no a adivinar.
export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Programación y análisis",
    items: ["Python", "[Herramienta]"],
  },
  {
    category: "Estadística y modelación",
    note: "Formación de base: Física, UNAM (Facultad de Ciencias)",
    items: ["Machine Learning", "Econofísica", "[Herramienta]"],
  },
  {
    category: "Calidad de software",
    note: "QA Tester Trainee en PRACTIA (Publicis Groupe)",
    items: ["ISTQB CTFL 4.0", "[Herramienta de automatización de pruebas]"],
  },
  {
    category: "Bases de datos y BI",
    items: ["[SQL]", "[Herramienta de BI]"],
  },
  {
    category: "Herramientas de trabajo",
    items: ["[Control de versiones]", "[Entorno de trabajo / IDE]"],
  },
];
