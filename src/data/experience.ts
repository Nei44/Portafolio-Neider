export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  summary: string;
  tools: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Analista de Datos (Becario)",
    org: "CJA Contact Center",
    period: "[FECHA]",
    summary:
      "Dentro del área de análisis de una empresa de cobranza, primer acercamiento real " +
      "al tratamiento de datos operativos: desde la descarga de información de los CRM " +
      "internos hasta su limpieza, transformación y carga de vuelta a la plataforma. " +
      "Se automatizó el proceso con Python, reduciendo en 50% la carga de trabajo manual " +
      "y liberando tiempo para análisis de mayor valor. Diseño de reportes mensuales de " +
      "eficiencia de cobranza (metas, montos cobrados y pendientes, comparativos año contra año). " +
      "Entrenamiento de un modelo de machine learning para perfilar clientes morosos. " +
      "Análisis de KPIs del equipo de call center con Power BI y SQL.",
    tools: ["Excel", "Python", "SQL", "Power BI"],
  },
  {
    role: "QA Tester (Trainee)",
    org: "PRACTIA (Publicis Groupe)",
    period: "[FECHA]",
    summary:
      "Automatización de pruebas sobre la plataforma CRM de un cliente del sector " +
      "telecomunicaciones — un sistema extenso con decenas de módulos y flujos (consultas, " +
      "cambios de plan y gestiones de usuario) que requería validación exhaustiva mes a mes. " +
      "Las pruebas se automatizaron con Selenium y Playwright en Python; las validaciones de " +
      "API se realizaron con Postman, con seguimiento de casos e incidencias en Jira. " +
      "El trabajo con APIs fue la puerta de entrada real a un entorno de desarrollo.",
    tools: ["Selenium", "Playwright", "Python", "Postman", "Jira"],
  },
];
