export default function HorseYearbookLogo({ size = 96 }: { size?: number }) {
  const height = size * 1.25;
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Horse Yearbook logo"
      className="mx-auto mb-4"
    >
      {/* Book cover */}
      <rect x="4" y="2" width="72" height="96" rx="3" fill="#5d4037" />
      {/* Spine */}
      <path d="M4,5 L4,95 Q4,98 7,98 L12,98 L12,2 L7,2 Q4,2 4,5Z" fill="#3e2723" />
      {/* Spine highlight */}
      <line x1="10" y1="4" x2="10" y2="96" stroke="#6d4c41" strokeWidth="0.8" />
      {/* Inner decorative border */}
      <rect x="17" y="9" width="54" height="82" rx="1.5" fill="none" stroke="#c8a96e" strokeWidth="1" />

      {/* Horse head silhouette — right-facing profile, knight/heraldic style */}
      <path
        d={`
          M 30,74
          C 29,70 28,66 28,62
          C 28,57 29,52 31,48
          C 32,45 32,42 31,39
          C 30,36 30,34 31,32
          C 31,30 30,28 29,26
          C 28,24 28,21 30,19
          C 31,18 32,19 32,21
          L 33,24
          C 34,21 36,18 38,17
          C 39,16 40,17 39,19
          L 38,22
          C 40,21 42,21 44,22
          C 47,24 49,27 51,31
          C 53,36 55,42 56,48
          C 57,54 56,60 55,66
          C 54,70 54,74 55,76
          L 30,76
          Z
        `}
        fill="#f5e6c8"
      />
      {/* Cheek/jaw shape */}
      <path
        d="M 34,44 C 36,42 39,41 42,42 C 44,43 45,45 44,47 C 43,48 40,48 38,47 C 36,46 34,46 34,44Z"
        fill="#e8d5b0"
      />
      {/* Eye */}
      <ellipse cx="42" cy="33" rx="2" ry="2.2" fill="#3e2723" />
      <ellipse cx="42.5" cy="32.5" rx="0.7" ry="0.8" fill="#f5e6c8" />
      {/* Nostril */}
      <ellipse cx="32" cy="38" rx="1.5" ry="2" fill="#5d4037" />
      {/* Mouth line */}
      <path d="M 30,40 C 31,41 33,42 35,42" stroke="#5d4037" strokeWidth="0.6" fill="none" />
      {/* Mane — flowing lines along crest of neck */}
      <path d="M 44,22 C 47,26 50,32 52,38" stroke="#d7ccc8" strokeWidth="0.8" fill="none" />
      <path d="M 46,24 C 49,28 51,34 53,40" stroke="#d7ccc8" strokeWidth="0.6" fill="none" />
      <path d="M 48,27 C 50,31 52,37 54,44" stroke="#d7ccc8" strokeWidth="0.5" fill="none" />

      {/* Book title text */}
      <text
        x="43"
        y="88"
        textAnchor="middle"
        fill="#c8a96e"
        fontSize="5.5"
        fontFamily="serif"
        letterSpacing="1.5"
      >
        YEARBOOK
      </text>
    </svg>
  );
}
