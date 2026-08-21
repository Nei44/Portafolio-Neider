export function StaticField() {
  const dots = Array.from({ length: 80 }, (_, i) => {
    const seed = i * 137.5;
    const x = (Math.sin(seed) * 0.5 + 0.5) * 100;
    const y = (Math.cos(seed * 1.3) * 0.5 + 0.5) * 100;
    const r = 0.12 + ((i * 7) % 5) * 0.06;
    return { x, y, r, key: i };
  });
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <ellipse
        cx="50"
        cy="50"
        rx="20"
        ry="20"
        fill="none"
        stroke="#f59e0b"
        strokeOpacity="0.15"
        strokeWidth="0.1"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="30"
        ry="18"
        fill="none"
        stroke="#14b8a6"
        strokeOpacity="0.1"
        strokeWidth="0.08"
        transform="rotate(-15 50 50)"
      />
      {dots.map((d) => (
        <circle
          key={d.key}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill="#e8e2d9"
          fillOpacity="0.5"
        />
      ))}
    </svg>
  );
}
