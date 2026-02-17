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
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b = Math.min(255, (num & 0x0000ff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
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
    setFlip(attitude === "Sassy" && Math.random() < 0.5);
  }, [eyeColor, attitude]);

  // Throw if the horse is white with a "Mysterious" attitude (~100% for this combo)
  if (mainColor === "#ffffff" && attitude === "Mysterious") {
    throw new Error("A mysterious white horse has breached the void");
  }

  const shadow = darken(mainColor, 30);
  const highlight = lighten(mainColor, 40);

  // Attitude-based expressions & posture
  let mouthPath = "M 172 148 Q 178 152 184 148"; // neutral smile
  let eyeOffsetY = 0;
  let eyeScaleY = 1;
  let eyeScaleX = 1;
  let pupilOffsetX = 0;
  let pupilOffsetY = 0;
  let tailWag = 0;
  let earRotate = 0;
  let headTilt = 0;
  let bodyTilt = 0;
  let frontLegOffset = 0;
  let backLegSpread = 0;
  let maneWild = false;
  let showTongue = false;
  let showBlush = false;
  let showSweatDrops = false;
  let showDustClouds = false;
  let showMotionLines = false;
  let showShadowAura = false;
  let showSparkles = false;
  let showSnortLines = false;
  let tailCurved = false;
  let tailTucked = false;
  let earsFlat = false;
  let secondEyebrow = "";
  let headLowered = false;

  switch (attitude) {
    case "Wild":
      mouthPath = "M 168 145 Q 178 158 188 145"; // big open mouth
      eyeScaleY = 1.3;
      tailWag = -15;
      earRotate = -10;
      maneWild = true;
      showMotionLines = true;
      showDustClouds = true;
      frontLegOffset = -8;
      backLegSpread = 6;
      bodyTilt = -2;
      secondEyebrow = "angry";
      break;
    case "Sassy":
      mouthPath = "M 170 150 Q 178 147 186 150"; // smirk
      eyeOffsetY = -2;
      eyeScaleY = 0.7;
      tailWag = 10;
      tailCurved = true;
      headTilt = 5;
      pupilOffsetX = 2;
      secondEyebrow = "raised";
      showSparkles = true;
      break;
    case "Mysterious":
      mouthPath = "M 172 149 L 184 149"; // flat line
      eyeScaleY = 0.5;
      tailWag = 0;
      showShadowAura = true;
      pupilOffsetX = -1;
      pupilOffsetY = 1;
      secondEyebrow = "flat";
      break;
    case "Goofy":
      mouthPath = "M 166 146 Q 178 160 190 146"; // huge grin
      eyeScaleY = 1.4;
      eyeOffsetY = 2;
      tailWag = 20;
      earRotate = 15;
      showTongue = true;
      headTilt = -8;
      pupilOffsetX = 3;
      pupilOffsetY = -2;
      eyeScaleX = 1.2;
      break;
    case "Rowdy":
      mouthPath = "M 168 143 Q 178 155 188 143"; // open mouth, snorting
      eyeScaleY = 1.1;
      tailWag = -20;
      earRotate = -15;
      frontLegOffset = -12;
      backLegSpread = 10;
      bodyTilt = -3;
      showDustClouds = true;
      showSnortLines = true;
      maneWild = true;
      secondEyebrow = "angry";
      break;
    case "Anxious":
      mouthPath = "M 172 150 Q 178 146 184 150"; // wobbly frown
      eyeScaleY = 1.5;
      eyeScaleX = 1.2;
      eyeOffsetY = -3;
      tailTucked = true;
      earsFlat = true;
      showSweatDrops = true;
      pupilOffsetY = -1;
      secondEyebrow = "worried";
      bodyTilt = 1;
      break;
    case "Shy":
      mouthPath = "M 174 149 Q 178 151 182 149"; // tiny smile
      eyeScaleY = 0.8;
      eyeOffsetY = 2;
      tailTucked = true;
      showBlush = true;
      headTilt = 12;
      headLowered = true;
      pupilOffsetX = -3;
      pupilOffsetY = 2;
      earRotate = 8;
      bodyTilt = 2;
      break;
    case "Aloof":
      mouthPath = "M 172 149 L 184 149"; // indifferent line
      eyeScaleY = 0.6;
      eyeOffsetY = -1;
      pupilOffsetX = 5;
      pupilOffsetY = -1;
      tailWag = -3;
      headTilt = -5;
      earRotate = -5;
      secondEyebrow = "flat";
      break;
    default: // Gentle
      tailWag = 5;
      showSparkles = true;
      mouthPath = "M 172 148 Q 178 153 184 148";
      break;
  }

  const headTransform = `rotate(${headTilt}, 178, 118)${headLowered ? " translate(0, 8)" : ""}`;

  // Tail path based on tucked/curved/normal
  let tailPath: string;
  if (tailTucked) {
    tailPath = "M 310 140 Q 320 160, 315 185 Q 312 195, 308 190";
  } else if (tailCurved) {
    tailPath = `M 310 140 Q ${345 + tailWag} 90, ${335 + tailWag} 50 Q ${355 + tailWag} 60, ${350 + tailWag} 100 Q ${360 + tailWag} 70, ${340 + tailWag} 120`;
  } else {
    tailPath = `M 310 140 Q ${340 + tailWag} 100, ${330 + tailWag} 60 Q ${350 + tailWag} 80, ${345 + tailWag} 120 Q ${355 + tailWag} 90, ${340 + tailWag} 130`;
  }

  // Ear override for flat ears
  const earPath1 = earsFlat
    ? "M 158 95 L 142 88 L 160 90 Z"
    : "M 158 95 L 150 70 L 165 88 Z";
  const earPath2 = earsFlat
    ? "M 175 90 L 190 83 L 178 88 Z"
    : "M 175 90 L 172 65 L 183 84 Z";
  const innerEarPath1 = earsFlat
    ? "M 158 93 L 145 88 L 159 90 Z"
    : "M 159 92 L 153 74 L 163 88 Z";
  const innerEarPath2 = earsFlat
    ? "M 176 89 L 188 84 L 178 88 Z"
    : "M 176 88 L 174 70 L 181 83 Z";

  return (
    <svg
      viewBox="0 0 400 340"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* Shadow aura for Mysterious */}
      {showShadowAura && (
        <>
          <defs>
            <radialGradient id="mysteryAura">
              <stop offset="0%" stopColor="#1a0033" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#2d004d" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="220" cy="190" rx="150" ry="110" fill="url(#mysteryAura)" />
        </>
      )}

      {/* Dust clouds for Wild/Rowdy */}
      {showDustClouds && (
        <>
          <circle cx="120" cy="285" r="12" fill="#d4c5a9" opacity="0.4" />
          <circle cx="140" cy="278" r="8" fill="#d4c5a9" opacity="0.3" />
          <circle cx="105" cy="280" r="10" fill="#d4c5a9" opacity="0.35" />
          <circle cx="290" cy="282" r="11" fill="#d4c5a9" opacity="0.35" />
          <circle cx="310" cy="276" r="7" fill="#d4c5a9" opacity="0.25" />
        </>
      )}

      <g transform={`rotate(${bodyTilt}, 220, 240)`}>
        {/* Tail */}
        <path
          d={tailPath}
          fill={maneColor}
          stroke={darken(maneColor, 20)}
          strokeWidth="1"
        />
        {/* Extra tail flourish for Sassy */}
        {tailCurved && (
          <path
            d={`M ${335 + tailWag} 55 Q ${360 + tailWag} 40, ${355 + tailWag} 45`}
            fill="none"
            stroke={maneColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}

        {/* Back legs */}
        <rect x={255 - backLegSpread} y="210" width="22" height="75" rx="8" fill={shadow} />
        <rect x={280 + backLegSpread} y="210" width="22" height="75" rx="8" fill={shadow} />
        {/* Hooves back */}
        <rect x={253 - backLegSpread} y="278" width="26" height="12" rx="4" fill="#2c2c2c" />
        <rect x={278 + backLegSpread} y="278" width="26" height="12" rx="4" fill="#2c2c2c" />

        {/* Front legs */}
        <rect x={130 + frontLegOffset} y="210" width="22" height="75" rx="8" fill={mainColor} />
        <rect x={158 - frontLegOffset} y="210" width="22" height="75" rx="8" fill={mainColor} />
        {/* Hooves front */}
        <rect x={128 + frontLegOffset} y="278" width="26" height="12" rx="4" fill="#2c2c2c" />
        <rect x={156 - frontLegOffset} y="278" width="26" height="12" rx="4" fill="#2c2c2c" />

        {/* Body */}
        <ellipse cx="220" cy="185" rx="105" ry="65" fill={mainColor} />
        {/* Belly highlight */}
        <ellipse cx="220" cy="200" rx="75" ry="35" fill={shadow} opacity="0.3" />
        {/* Body highlight */}
        <ellipse cx="200" cy="165" rx="50" ry="25" fill={highlight} opacity="0.15" />

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
      </g>

      {/* Head group with tilt */}
      <g transform={headTransform}>
        {/* Head */}
        <ellipse cx="178" cy="118" rx="38" ry="30" fill={mainColor} transform="rotate(-10, 178, 118)" />

        {/* Snout */}
        <ellipse cx="180" cy="140" rx="22" ry="16" fill={darken(mainColor, -20)} />

        {/* Nostrils */}
        <ellipse cx="173" cy="140" rx="3" ry="4" fill={shadow} />
        <ellipse cx="187" cy="140" rx="3" ry="4" fill={shadow} />

        {/* Snort lines for Rowdy */}
        {showSnortLines && (
          <>
            <line x1="165" y1="137" x2="155" y2="133" stroke={shadow} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="165" y1="140" x2="153" y2="140" stroke={shadow} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="165" y1="143" x2="155" y2="147" stroke={shadow} strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}

        {/* Mouth */}
        <path d={mouthPath} fill="none" stroke={shadow} strokeWidth="2" strokeLinecap="round" />

        {/* Tongue for Goofy */}
        {showTongue && (
          <ellipse cx="180" cy="157" rx="6" ry="8" fill="#e87a7a" stroke="#d45b5b" strokeWidth="0.5" />
        )}

        {/* Blush for Shy */}
        {showBlush && (
          <>
            <ellipse cx="160" cy="128" rx="8" ry="5" fill="#ff9999" opacity="0.4" />
            <ellipse cx="195" cy="128" rx="8" ry="5" fill="#ff9999" opacity="0.4" />
          </>
        )}

        {/* Eye */}
        <g transform={`translate(0, ${eyeOffsetY})`}>
          <ellipse cx="170" cy="110" rx={7 * eyeScaleX} ry={7 * eyeScaleY} fill="white" />
          <ellipse cx={171 + pupilOffsetX} cy={110 + pupilOffsetY} rx={4.5 * eyeScaleX} ry={4.5 * eyeScaleY} fill={finalEyeColor} />
          <ellipse cx={172.5 + pupilOffsetX} cy={109 + pupilOffsetY} rx="2" ry="2" fill="#111" />
          {/* Eye shine */}
          <circle cx={173.5 + pupilOffsetX} cy={107.5 + pupilOffsetY} r="1.2" fill="white" opacity="0.8" />
        </g>

        {/* Eyebrow expressions */}
        {secondEyebrow === "angry" && (
          <line x1="162" y1={100 + eyeOffsetY} x2="178" y2={96 + eyeOffsetY} stroke={shadow} strokeWidth="2.5" strokeLinecap="round" />
        )}
        {secondEyebrow === "worried" && (
          <path d={`M 162 ${97 + eyeOffsetY} Q 170 ${93 + eyeOffsetY}, 178 ${97 + eyeOffsetY}`} fill="none" stroke={shadow} strokeWidth="2" strokeLinecap="round" />
        )}
        {secondEyebrow === "raised" && (
          <path d={`M 163 ${96 + eyeOffsetY} Q 170 ${90 + eyeOffsetY}, 177 ${96 + eyeOffsetY}`} fill="none" stroke={shadow} strokeWidth="2" strokeLinecap="round" />
        )}
        {secondEyebrow === "flat" && (
          <line x1="163" y1={98 + eyeOffsetY} x2="177" y2={98 + eyeOffsetY} stroke={shadow} strokeWidth="2" strokeLinecap="round" />
        )}

        {/* Sweat drops for Anxious */}
        {showSweatDrops && (
          <>
            <path d="M 195 95 Q 197 88, 199 95 Q 197 98, 195 95 Z" fill="#88ccff" opacity="0.7" />
            <path d="M 200 105 Q 201 101, 203 105 Q 201 107, 200 105 Z" fill="#88ccff" opacity="0.5" />
            <path d="M 155 100 Q 153 94, 151 100 Q 153 103, 155 100 Z" fill="#88ccff" opacity="0.6" />
          </>
        )}

        {/* Ears */}
        <g transform={`rotate(${earRotate}, 165, 90)`}>
          <path d={earPath1} fill={mainColor} stroke={shadow} strokeWidth="0.5" />
          <path d={earPath2} fill={mainColor} stroke={shadow} strokeWidth="0.5" />
          {/* Inner ear */}
          <path d={innerEarPath1} fill="#e8a0a0" opacity="0.5" />
          <path d={innerEarPath2} fill="#e8a0a0" opacity="0.5" />
        </g>

        {/* Mane */}
        {maneWild ? (
          <>
            <path
              d="M 152 72 Q 135 80, 128 100 Q 120 115, 118 140 Q 116 150, 122 160"
              fill="none"
              stroke={maneColor}
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M 150 70 Q 140 60, 148 50 Q 155 45, 150 62"
              fill={maneColor}
              stroke={darken(maneColor, 10)}
              strokeWidth="1"
            />
            <path
              d="M 155 68 Q 162 52, 155 45 Q 148 42, 155 58"
              fill={maneColor}
              stroke={darken(maneColor, 10)}
              strokeWidth="1"
            />
            <path
              d="M 145 78 Q 130 68, 128 55 Q 132 50, 138 65"
              fill={maneColor}
              stroke={darken(maneColor, 10)}
              strokeWidth="1"
            />
            <path
              d="M 155 75 Q 145 72, 138 85 Q 130 100, 126 120"
              fill="none"
              stroke={darken(maneColor, 15)}
              strokeWidth="7"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </g>

      {/* Motion lines for Wild */}
      {showMotionLines && (
        <>
          <line x1="85" y1="150" x2="65" y2="150" stroke="#999" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <line x1="88" y1="165" x2="60" y2="165" stroke="#999" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          <line x1="85" y1="180" x2="68" y2="180" stroke="#999" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
          <line x1="90" y1="195" x2="72" y2="195" stroke="#999" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
        </>
      )}

      {/* Sparkles for Gentle/Sassy */}
      {showSparkles && (
        <>
          <g transform="translate(100, 80)" opacity="0.6">
            <line x1="0" y1="-5" x2="0" y2="5" stroke="#ffd700" strokeWidth="1.5" />
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#ffd700" strokeWidth="1.5" />
            <line x1="-3" y1="-3" x2="3" y2="3" stroke="#ffd700" strokeWidth="1" />
            <line x1="3" y1="-3" x2="-3" y2="3" stroke="#ffd700" strokeWidth="1" />
          </g>
          <g transform="translate(310, 110)" opacity="0.45">
            <line x1="0" y1="-4" x2="0" y2="4" stroke="#ffd700" strokeWidth="1.5" />
            <line x1="-4" y1="0" x2="4" y2="0" stroke="#ffd700" strokeWidth="1.5" />
          </g>
          <g transform="translate(135, 55)" opacity="0.35">
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#ffd700" strokeWidth="1" />
            <line x1="-3" y1="0" x2="3" y2="0" stroke="#ffd700" strokeWidth="1" />
          </g>
        </>
      )}

      {/* Ground shadow */}
      <ellipse cx="215" cy="293" rx="110" ry="8" fill="#00000015" />
    </svg>
  );
}
