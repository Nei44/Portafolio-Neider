"use client";

import { SKILLS } from "@/data/skills";
import { motion } from "motion/react";

const getLogo = (id: string) => {
  switch (id) {
    case "python":
      return (
        <svg viewBox="0 0 24 24" className="w-9 h-9 transition-all duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.87 2.01c-2.37.02-4.5 1.6-4.5 4v1.8h4.5v.9H5.56c-2.2 0-3.6 1.8-3.6 4.1 0 2.3 1.6 4.1 3.8 4.1h1.4v-2c0-2.3 2.1-4.4 4.4-4.4h4.5v-1.8c0-2.3-2.1-4.3-4.4-4.3H11.87z" fill="#3776AB"/>
          <path d="M12.13 21.99c2.37-.02 4.5-1.6 4.5-4v-1.8h-4.5v-.9h6.31c2.2 0 3.6-1.8 3.6-4.1 0-2.3-1.6-4.1-3.8-4.1h-1.4v2c0 2.3-2.1 4.4-4.4 4.4H7.89v1.8c0 2.3 2.1 4.3 4.4 4.3l-.16.2z" fill="#FFE873"/>
          <circle cx="9.25" cy="5.25" r="0.75" fill="#FFF"/>
          <circle cx="14.75" cy="18.75" r="0.75" fill="#306998"/>
        </svg>
      );
    case "sql":
      return (
        <svg viewBox="0 0 24 24" className="w-9 h-9 transition-all duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C7.58 3 4 4.34 4 6s3.58 3 8 3 8-1.34 8-3-3.58-3-8-3z" fill="#00C8FF" opacity="0.8"/>
          <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6C20 7.66 16.42 9 12 9S4 7.66 4 6z" fill="#00C8FF" opacity="0.6"/>
          <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4c0 1.66-3.58 3-12 3s-8-1.34-8-3z" fill="#00C8FF" opacity="0.4"/>
          <path d="M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4c0 1.66-3.58 3-12 3s-8-1.34-8-3z" fill="#00C8FF" opacity="0.2"/>
        </svg>
      );
    case "excel":
      return (
        <svg viewBox="0 0 24 24" className="w-9 h-9 transition-all duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 2.5H4a1.5 1.5 0 00-1.5 1.5v16A1.5 1.5 0 004 21.5h16a1.5 1.5 0 001.5-1.5V10.5L13.5 2.5z" fill="#107C41"/>
          <path d="M13.5 2.5v6.5h6.5" fill="#3f9e60"/>
          <path d="M7 10h10v8H7v-8z" fill="#FFF" opacity="0.15"/>
          <path d="M9 12l6 4M15 12l-6 4" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case "r":
      return (
        <svg viewBox="0 0 24 24" className="w-9 h-9 transition-all duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 5.58 2 10c0 4.42 4.48 8 10 8 1.95 0 3.77-.44 5.31-1.2L20.5 20l-1.12-3.36C20.84 15.1 22 12.67 22 10c0-4.42-4.48-8-10-8z" fill="#1A8FCB" opacity="0.15"/>
          <path d="M10.5 6h4c1.38 0 2.5.9 2.5 2s-1.12 2-2.5 2h-4V6z" fill="#1A8FCB"/>
          <path d="M10.5 10h2.5l2.5 4h-2.5l-2.5-4z" fill="#276B9E"/>
          <path d="M8.5 5h2v10h-2V5z" fill="#276B9E"/>
        </svg>
      );
    case "powerbi":
      return (
        <svg viewBox="0 0 24 24" className="w-9 h-9 transition-all duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 14.5a1.5 1.5 0 011.5-1.5H8v8H5.5A1.5 1.5 0 014 19.5v-5z" fill="#E6AD12"/>
          <path d="M9.5 9a1.5 1.5 0 011.5-1.5h2.5V21H11a1.5 1.5 0 01-1.5-1.5V9z" fill="#F2C811"/>
          <path d="M15 3.5A1.5 1.5 0 0116.5 2H19a1.5 1.5 0 011.5 1.5V21H16.5A1.5 1.5 0 0115 19.5V3.5z" fill="#F8E510"/>
        </svg>
      );
    case "looker":
      return (
        <svg viewBox="0 0 24 24" className="w-9 h-9 transition-all duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="12" r="3.5" fill="#4285F4"/>
          <circle cx="18" cy="6" r="3.5" fill="#EA4335"/>
          <circle cx="18" cy="18" r="3.5" fill="#FBBC05"/>
          <path d="M8.5 10.5l6-3M8.5 13.5l6 3" stroke="#9699A3" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" className="w-9 h-9 transition-all duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.6 10.4L13.6 3.4a2.2 2.2 0 00-3.1 0L3.4 10.5a2.2 2.2 0 000 3.1l7 7a2.2 2.2 0 003.1 0l7-7.1a2.2 2.2 0 00.1-3.1z" fill="#F05032" opacity="0.25"/>
          <circle cx="12" cy="8" r="2" fill="#F05032"/>
          <circle cx="12" cy="16" r="2" fill="#F05032"/>
          <circle cx="16" cy="12" r="2" fill="#F05032"/>
          <path d="M12 10v4M12 12c1.5 0 2 0 2.5-.5l1-.5" stroke="#F05032" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case "jupyter":
      return (
        <svg viewBox="0 0 24 24" className="w-9 h-9 transition-all duration-300 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#F37626" strokeWidth="2" transform="rotate(-15 12 12)"/>
          <circle cx="12" cy="12" r="3.5" fill="#F37626"/>
          <circle cx="6" cy="10" r="1" fill="#FFF"/>
          <circle cx="18" cy="14" r="1.5" fill="#FFF"/>
        </svg>
      );
    default:
      return null;
  }
};

export function Habilidades() {
  return (
    <section id="habilidades" className="py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {"// 02"}
          </p>
          <h2 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">
            Habilidades
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
            Tecnologías y herramientas clave con su especialización técnica secundaria.
          </p>
        </motion.div>

        {/* Habilidades Grid: 4 columns x 2 rows on desktop */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.icon}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-60px" }}
              className="glass-card group flex flex-col items-center justify-between p-5 text-center h-[140px] w-full transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(245,185,66,0.15)]"
            >
              <div className="flex-1 flex items-center justify-center">
                {getLogo(skill.icon)}
              </div>
              <div className="mt-3">
                <h3 className="font-display text-sm font-semibold text-text-primary">
                  {skill.name}
                </h3>
                <p className="text-[11px] font-sans text-text-secondary mt-0.5 whitespace-nowrap">
                  {skill.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
