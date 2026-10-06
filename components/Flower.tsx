// Hand-drawn-ish flower that grows with how much you did that day.
// stage 0 = resting soil, 1 = sprout, 2 = bud, 3 = tulip, 4 = full rose.

const PETAL_COLORS = ["var(--accent)", "#f472b6", "#fb7185", "#a78bfa", "#fbbf24"];

export default function Flower({
  stage,
  seed = 0,
  className = "",
}: {
  stage: number;
  seed?: number;
  className?: string;
}) {
  const petal = PETAL_COLORS[seed % PETAL_COLORS.length];
  const leaf = "#6fae7a";
  const soil = "#b08968";

  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden>
      <ellipse cx="20" cy="44" rx="13" ry="3.5" fill={soil} opacity={0.35} />
      {stage === 0 && (
        <>
          <ellipse cx="20" cy="42.5" rx="7" ry="2.6" fill={soil} opacity={0.6} />
          <circle cx="17" cy="41" r="0.9" fill={soil} />
          <circle cx="23" cy="41.5" r="0.7" fill={soil} />
        </>
      )}

      {stage >= 1 && (
        <path
          d={stage === 1 ? "M20 43 C20 38 20 36 20 33" : "M20 43 C19 34 21 26 20 18"}
          stroke={leaf}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {stage === 1 && (
        <>
          <path d="M20 35 C15 34 13 30 14 28 C17 29 20 31 20 35Z" fill={leaf} />
          <path d="M20 34 C25 33 27 29 26 27 C23 28 20 30 20 34Z" fill={leaf} opacity={0.85} />
        </>
      )}
      {stage >= 2 && (
        <>
          <path d="M20 34 C14 33 11 28 12 25 C16 26 20 29 20 34Z" fill={leaf} />
          <path d="M20 30 C26 29 29 24 28 21 C24 22 20 25 20 30Z" fill={leaf} opacity={0.85} />
        </>
      )}

      {stage === 2 && <ellipse cx="20" cy="15" rx="4" ry="6" fill={petal} />}

      {stage === 3 && (
        <g fill={petal}>
          <path d="M20 20 C13 19 11 12 13 7 C16 9 19 12 20 20Z" opacity={0.85} />
          <path d="M20 20 C27 19 29 12 27 7 C24 9 21 12 20 20Z" opacity={0.85} />
          <path d="M20 20 C16 16 16 8 20 4 C24 8 24 16 20 20Z" />
        </g>
      )}

      {stage >= 4 && (
        <g>
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx="20"
              cy="8"
              rx="5"
              ry="6.5"
              fill={petal}
              opacity={0.8}
              transform={`rotate(${angle} 20 14)`}
            />
          ))}
          <circle cx="20" cy="14" r="4.2" fill={petal} />
          <path
            d="M17.5 14 C17.5 11.5 22.5 11.5 22.5 14 C22.5 16 19 16.5 19 14.5"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M33 5 l1 2.2 2.2 1 -2.2 1 -1 2.2 -1 -2.2 -2.2 -1 2.2 -1Z" fill="#fbbf24" />
        </g>
      )}
    </svg>
  );
}
