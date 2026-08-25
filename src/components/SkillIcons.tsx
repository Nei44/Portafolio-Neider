import React from "react";

/* ─────────────────────────────────────────────────────────
   Skill Icon SVGs
   Clean, recognisable logos rendered inline to avoid
   external image requests. Sized to 48×48 by default.
   ───────────────────────────────────────────────────────── */

const size = 48;

export function PythonIcon() {
  return (
    <svg width={size} height={size} viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="12.96%" y1="12.07%" x2="79.68%" y2="78.21%" id="pyA">
          <stop stopColor="#387EB8" offset="0%" />
          <stop stopColor="#366994" offset="100%" />
        </linearGradient>
        <linearGradient x1="19.13%" y1="20.58%" x2="90.43%" y2="88.28%" id="pyB">
          <stop stopColor="#FFC836" offset="0%" />
          <stop stopColor="#FFD43B" offset="100%" />
        </linearGradient>
      </defs>
      <path
        d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
        fill="url(#pyA)"
      />
      <path
        d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"
        fill="url(#pyB)"
      />
    </svg>
  );
}

export function SqlIcon() {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="14" rx="26" ry="10" fill="#4DB6AC" opacity="0.3" />
      <ellipse cx="32" cy="14" rx="26" ry="10" fill="none" stroke="#4DB6AC" strokeWidth="2" />
      <path d="M6 14v36c0 5.523 11.636 10 26 10s26-4.477 26-10V14" fill="none" stroke="#4DB6AC" strokeWidth="2" />
      <ellipse cx="32" cy="50" rx="26" ry="10" fill="none" stroke="#4DB6AC" strokeWidth="2" />
      <path d="M6 26c0 5.523 11.636 10 26 10s26-4.477 26-10" fill="none" stroke="#4DB6AC" strokeWidth="2" opacity="0.5" />
      <path d="M6 38c0 5.523 11.636 10 26 10s26-4.477 26-10" fill="none" stroke="#4DB6AC" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

export function ExcelIcon() {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="2" width="24" height="28" rx="2" fill="#185C37" />
      <rect x="10" y="2" width="18" height="28" rx="1" fill="#21A366" />
      <rect x="10" y="7" width="14" height="18" fill="white" opacity="0.9" rx="1" />
      <line x1="10" y1="11.5" x2="24" y2="11.5" stroke="#21A366" strokeWidth="0.6" />
      <line x1="10" y1="16" x2="24" y2="16" stroke="#21A366" strokeWidth="0.6" />
      <line x1="10" y1="20.5" x2="24" y2="20.5" stroke="#21A366" strokeWidth="0.6" />
      <line x1="17" y1="7" x2="17" y2="25" stroke="#21A366" strokeWidth="0.6" />
      <rect x="2" y="8" width="14" height="16" rx="1.5" fill="#107C41" />
      <text x="9" y="19.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial, sans-serif">X</text>
    </svg>
  );
}

export function RIcon() {
  return (
    <svg width={size} height={size} viewBox="0 0 724 561" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CBCED0" />
          <stop offset="100%" stopColor="#84838B" />
        </linearGradient>
      </defs>
      <path
        d="M361.453 485.937C162.329 485.937.906 377.828.906 244.469.906 111.109 162.329 3 361.453 3 560.578 3 722 111.109 722 244.469 722 377.828 560.578 485.937 361.453 485.937zM416.641 97.406c-106.985 0-193.703 65.297-193.703 145.89 0 80.578 86.718 145.89 193.703 145.89 85.047 0 152.891-35.203 177.797-85.906H459.781v-32.203h145.594c2.688-9.016 4.047-18.25 4.047-27.672 0-80.593-86.719-146.0-192.781-146.0z"
        fill="url(#rGrad)"
      />
      <path
        d="M550.0 341.0l90.0 120.0h-100.0l-80.0-107.0h80.0z"
        fill="#276DC3"
      />
      <path
        d="M361.453 485.937C162.329 485.937.906 377.828.906 244.469.906 111.109 162.329 3 361.453 3 560.578 3 722 111.109 722 244.469 722 377.828 560.578 485.937 361.453 485.937zM416.641 97.406c-106.985 0-193.703 65.297-193.703 145.89 0 80.578 86.718 145.89 193.703 145.89 85.047 0 152.891-35.203 177.797-85.906H459.781v-32.203h145.594c2.688-9.016 4.047-18.25 4.047-27.672 0-80.593-86.719-146.0-192.781-146.0z"
        fill="none"
        stroke="#276DC3"
        strokeWidth="12"
      />
    </svg>
  );
}

export function PowerBIIcon() {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="8" height="22" rx="2" fill="#F2C811" />
      <rect x="20" y="12" width="8" height="30" rx="2" fill="#F2C811" opacity="0.85" />
      <rect x="32" y="6" width="8" height="36" rx="2" fill="#F2C811" opacity="0.7" />
    </svg>
  );
}

export function LookerIcon() {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="5" fill="#4285F4" />
      <circle cx="24" cy="10" r="3.5" fill="#EA4335" />
      <circle cx="36" cy="17" r="3.5" fill="#FBBC04" />
      <circle cx="36" cy="31" r="3.5" fill="#34A853" />
      <circle cx="24" cy="38" r="3.5" fill="#4285F4" />
      <circle cx="12" cy="31" r="3.5" fill="#EA4335" />
      <circle cx="12" cy="17" r="3.5" fill="#FBBC04" />
      <line x1="24" y1="19" x2="24" y2="13.5" stroke="#9c9589" strokeWidth="1" />
      <line x1="28.5" y1="21" x2="33" y2="18" stroke="#9c9589" strokeWidth="1" />
      <line x1="28.5" y1="27" x2="33" y2="30" stroke="#9c9589" strokeWidth="1" />
      <line x1="24" y1="29" x2="24" y2="34.5" stroke="#9c9589" strokeWidth="1" />
      <line x1="19.5" y1="27" x2="15" y2="30" stroke="#9c9589" strokeWidth="1" />
      <line x1="19.5" y1="21" x2="15" y2="18" stroke="#9c9589" strokeWidth="1" />
    </svg>
  );
}

export function GitIcon() {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M251.17 116.6L139.4 4.82a16.49 16.49 0 0 0-23.31 0l-23.21 23.2 29.44 29.45a19.57 19.57 0 0 1 24.8 24.96l28.37 28.38a19.61 19.61 0 1 1-11.75 11.06L137.28 95.4v69.64a19.62 19.62 0 1 1-16.13-1.39V94.2a19.61 19.61 0 0 1-10.65-25.73L81.46 39.44 4.83 116.08a16.49 16.49 0 0 0 0 23.32L116.6 251.17a16.49 16.49 0 0 0 23.32 0l111.25-111.25a16.5 16.5 0 0 0 0-23.33"
        fill="#DE4C36"
      />
    </svg>
  );
}

export function JupyterIcon() {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <circle cx="128" cy="30" r="16" fill="#767677" />
      <circle cx="210" cy="210" r="12" fill="#F37726" />
      <circle cx="40" cy="200" r="14" fill="#989798" />
      <path
        d="M128 32c52.935 0 96.818 38.438 105.49 88.885a8 8 0 0 1-15.77 2.828C210.04 80.455 173.252 48 128 48 82.748 48 45.96 80.455 38.28 123.713a8 8 0 0 1-15.77-2.828C31.182 70.438 75.065 32 128 32z"
        fill="#F37726"
      />
      <path
        d="M128 224c-52.935 0-96.818-38.438-105.49-88.885a8 8 0 0 1 15.77-2.828C45.96 175.545 82.748 208 128 208c45.252 0 82.04-32.455 89.72-75.713a8 8 0 0 1 15.77 2.828C224.818 185.562 180.935 224 128 224z"
        fill="#9E9E9E"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   Icon lookup map
   ───────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.FC> = {
  python: PythonIcon,
  sql: SqlIcon,
  excel: ExcelIcon,
  r: RIcon,
  powerbi: PowerBIIcon,
  looker: LookerIcon,
  git: GitIcon,
  jupyter: JupyterIcon,
};

export function SkillIcon({ id }: { id: string }) {
  const Component = ICON_MAP[id];
  if (!Component) return null;
  return <Component />;
}
