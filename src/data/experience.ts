export type ExperienceEntry = {
  role: string;
  org: string;
  summary: string;
  tools: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Analista de Datos (Becario)",
    org: "CJA Contact Center",
    summary:
      "Optimización de procesos de datos, analítica de negocio y modelado predictivo en el sector financiero y de cobranza.\n\n" +
      "· Automatización de Pipelines: Analicé y parametricé el flujo de trabajo manual de limpieza y cruce de datos operativos que previamente basado en fórmulas complejas de Excel, desarrollando scripts de automatización en Python que redujeron el tiempo operativo en un 50%, eliminaron el reprocesamiento y garantizaron la consistencia de carga hacia los CRMs internos.\n\n" +
      "· Modelado Predictivo de Riesgo: Diseñé un modelo de Machine Learning supervisado para perfilar y clasificar la probabilidad de morosidad de la cartera de clientes, permitiendo al equipo de operaciones priorizar cuentas de alto impacto y mejorar la tasa de recuperación.\n\n" +
      "· Business Intelligence & KPIs Operativos: Diseñé dashboards interactivos en Power BI y estructuré consultas complejas en SQL para el seguimiento mensual de KPIs del call center, comparativas interanuales de recuperación, cumplimiento de metas de cobranza y análisis de productividad frente a firmas competidoras del sector.\n\n" +
      "· Consultas y Reportería Masiva: Gestioné consultas y segmentaciones ad-hoc sobre bases de datos de cientos de miles de clientes para responder a requerimientos operativos y estratégicos del negocio.",
    tools: ["Python", "Pandas", "Scikit-Learn", "SQL", "Power BI", "Excel Avanzado"],
  },
  {
    role: "QA Automation Tester (Trainee)",
    org: "PRACTIA (Publicis Groupe)",
    summary:
      "Aseguramiento de calidad, automatización de pruebas y validación de arquitecturas de software para plataformas de telecomunicaciones.\n\n" +
      "· Automatización de Pruebas Web: Desarrollé y ejecuté suites de pruebas automatizadas de regresión para un CRM empresarial de alta complejidad — módulos de gestión de líneas, cambios de plan, facturación y atención al cliente — utilizando Selenium y Playwright con Python, reduciendo significativamente la carga de validación mensual.\n\n" +
      "· Integración y Validación de APIs: Diseñé colecciones de pruebas para servicios y endpoints REST utilizando Postman, asegurando la consistencia e integridad en el intercambio de datos entre la interfaz de usuario y los servicios del backend.\n\n" +
      "· Entorno de Desarrollo y Metodologías Ágiles: Colaboré estrechamente con equipos multidisciplinarios de desarrollo bajo marcos ágiles, dando seguimiento a incidencias, cobertura de pruebas y ciclo de vida de defectos mediante Jira.",
    tools: ["Python", "Selenium", "Playwright", "Postman", "Jira", "Git", "HTML/CSS"],
  },
];
