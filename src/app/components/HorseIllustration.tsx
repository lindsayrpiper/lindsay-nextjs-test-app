"use client";

import { useEffect, useState } from "react";

interface HorseProps {
  mainColor: string;
  maneColor: string;
  eyeColor: string;
  attitude: string;
}

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}

export default function HorseIllustration({
  mainColor,
  maneColor,
  eyeColor,
  attitude,
}: HorseProps) {
  const [finalEyeColor, setFinalEyeColor] = useState(eyeColor);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    // Random eye color bug: ~12% chance eyes are red
    if (Math.random() < 0.12) {
      setFinalEyeColor("#ff0000");
    } else {
      setFinalEyeColor(eyeColor);
    }
    // Sassy horses sometimes face backwards
    setFlip(attitude === "Ssasy" && Math.random() < 0.5);
  }, [eyeColor, attitude]);

  // Throw if the horse is white with a "Mysterious" attitude (~100% for this combo)
  if (mainColor === "#ffffff" && attitude === "Mysterious") {
    throw new Error("A mysterious white horse has breached the void");
  }

  const shadow = darken(mainColor, 30);

  // Attitude-based expressions
  let mouthPath = "M 172 148 Q 178 152 184 148"; // neutral smile
  let eyeOffsetY = 0;
  let eyeScaleY = 1;
  let tailWag = 0;
  let earRotate = 0;

  switch (attitude) {
    case "Wild":
      mouthPath = "M 168 145 Q 178 158 188 145"; // big open mouth
      eyeScaleY = 1.3;
      tailWag = -15;
      earRotate = -10;
      break;
    case "Ssasy":
      mouthPath = "M 170 150 Q 178 147 186 150"; // smirk
      eyeOffsetY = -2;
      eyeScaleY = 0.7;
      tailWag = 10;
      break;
    case "Mysterious":
      mouthPath = "M 172 149 L 184 149"; // flat line
      eyeScaleY = 0.5;
      tailWag = 0;
      break;
    case "Goofy":
      mouthPath = "M 166 146 Q 178 160 190 146"; // huge grin
      eyeScaleY = 1.4;
      eyeOffsetY = 2;
      tailWag = 20;
      earRotate = 15;
      break;
    default: // Gentle
      tailWag = 5;
      break;
  }

  return (
    <svg
      viewBox="0 0 400 320"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* Tail */}
      <path
        d={`M 310 140 Q ${340 + tailWag} 100, ${330 + tailWag} 60 Q ${350 + tailWag} 80, ${345 + tailWag} 120 Q ${355 + tailWag} 90, ${340 + tailWag} 130`}
        fill={maneColor}
        stroke={darken(maneColor, 20)}
        strokeWidth="1"
      />

      {/* Back legs */}
      <rect x="255" y="210" width="22" height="75" rx="8" fill={shadow} />
      <rect x="280" y="210" width="22" height="75" rx="8" fill={shadow} />
      {/* Hooves back */}
      <rect x="253" y="278" width="26" height="12" rx="4" fill="#2c2c2c" />
      <rect x="278" y="278" width="26" height="12" rx="4" fill="#2c2c2c" />

      {/* Front legs */}
      <rect x="130" y="210" width="22" height="75" rx="8" fill={mainColor} />
      <rect x="158" y="210" width="22" height="75" rx="8" fill={mainColor} />
      {/* Hooves front */}
      <rect x="128" y="278" width="26" height="12" rx="4" fill="#2c2c2c" />
      <rect x="156" y="278" width="26" height="12" rx="4" fill="#2c2c2c" />

      {/* Body */}
      <ellipse cx="220" cy="185" rx="105" ry="65" fill={mainColor} />
      {/* Belly highlight */}
      <ellipse cx="220" cy="200" rx="75" ry="35" fill={shadow} opacity="0.3" />

      {/* Neck */}
      <path
        d="M 140 170 Q 130 130, 155 105 Q 170 90, 165 120 Q 155 150, 155 175"
        fill={mainColor}
        stroke={mainColor}
        strokeWidth="20"
        strokeLinejoin="round"
      />
      <path
        d="M 130 155 Q 125 120, 150 95 L 160 100 Q 140 125, 145 160 Z"
        fill={mainColor}
      />

      {/* Head */}
      <ellipse cx="178" cy="118" rx="38" ry="30" fill={mainColor} transform="rotate(-10, 178, 118)" />

      {/* Snout */}
      <ellipse cx="180" cy="140" rx="22" ry="16" fill={darken(mainColor, -20)} />

      {/* Nostrils */}
      <ellipse cx="173" cy="140" rx="3" ry="4" fill={shadow} />
      <ellipse cx="187" cy="140" rx="3" ry="4" fill={shadow} />

      {/* Mouth */}
      <path d={mouthPath} fill="none" stroke={shadow} strokeWidth="2" strokeLinecap="round" />

      {/* Eye */}
      <g transform={`translate(0, ${eyeOffsetY})`}>
        <ellipse cx="170" cy="110" rx="7" ry={7 * eyeScaleY} fill="white" />
        <ellipse cx="171" cy="110" rx="4.5" ry={4.5 * eyeScaleY} fill={finalEyeColor} />
        <ellipse cx="172.5" cy="109" rx="2" ry="2" fill="#111" />
        {/* Eye shine */}
        <circle cx="173.5" cy="107.5" r="1.2" fill="white" opacity="0.8" />
      </g>

      {/* Ears */}
      <g transform={`rotate(${earRotate}, 165, 90)`}>
        <path d="M 158 95 L 150 70 L 165 88 Z" fill={mainColor} stroke={shadow} strokeWidth="0.5" />
        <path d="M 175 90 L 172 65 L 183 84 Z" fill={mainColor} stroke={shadow} strokeWidth="0.5" />
        {/* Inner ear */}
        <path d="M 159 92 L 153 74 L 163 88 Z" fill="#e8a0a0" opacity="0.5" />
        <path d="M 176 88 L 174 70 L 181 83 Z" fill="#e8a0a0" opacity="0.5" />
      </g>

      {/* Mane */}
      <path
        d="M 152 72 Q 140 85, 135 105 Q 130 115, 128 135 Q 126 145, 130 155"
        fill="none"
        stroke={maneColor}
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 155 75 Q 148 80, 143 95 Q 137 108, 134 125"
        fill="none"
        stroke={darken(maneColor, 15)}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Forelock */}
      <path
        d="M 158 78 Q 150 68, 155 60 Q 160 55, 158 70"
        fill={maneColor}
        stroke={darken(maneColor, 10)}
        strokeWidth="1"
      />

      {/* Ground shadow */}
      <ellipse cx="215" cy="293" rx="110" ry="8" fill="#00000015" />
    </svg>
  );
}
