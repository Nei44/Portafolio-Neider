export type Skill = {
  name: string;
  subtitle: string;
  icon: string; // identifier used by the component to render the correct SVG logo
};

export const SKILLS: Skill[] = [
  { name: "Python", subtitle: "Data Analysis · ML", icon: "python" },
  { name: "SQL", subtitle: "Queries · DB Design", icon: "sql" },
  { name: "Excel", subtitle: "Modeling · Reports", icon: "excel" },
  { name: "R", subtitle: "Stats · Data Viz", icon: "r" },
  { name: "Power BI", subtitle: "Dashboards · DAX", icon: "powerbi" },
  { name: "Looker Studio", subtitle: "Reporting · BI", icon: "looker" },
  { name: "Git", subtitle: "Version Control", icon: "git" },
  { name: "Jupyter", subtitle: "Notebooks · Research", icon: "jupyter" },
];
