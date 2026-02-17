"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ATTITUDES = ["Gentle", "Wild", "Sassy", "Mysterious", "Goofy", "Rowdy", "Anxious", "Shy", "Aloof"];

export default function Customize() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Horse";

  const [mainColor, setMainColor] = useState("#8B4513");
  const [maneColor, setManeColor] = useState("#1a1a1a");
  const [eyeColor, setEyeColor] = useState("#3B2F2F");
  const [attitude, setAttitude] = useState("Gentle");
  const [clickCount, setClickCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setClickCount((prev) => prev + 1);
    if (clickCount === 0 && Math.random() < 0.4) {
      return;
    }

    // TypeError: randomly try to access property on undefined (~15% chance)
    if (Math.random() < 0.15) {
      const horseConfig: Record<string, unknown> | undefined = undefined;
      // @ts-expect-error intentional error for Sentry
      console.log(horseConfig.preferences.colorMode);
    }

    const params = new URLSearchParams({
      name,
      mainColor,
      maneColor,
      eyeColor,
      attitude,
    });
    router.push(`/result?${params.toString()}`);
  };

  useEffect(() => {
    setClickCount(0);
  }, [mainColor, maneColor, eyeColor, attitude]);

  return (
    <div className="flex flex-col items-center gap-8 max-w-md w-full -mt-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--brand)] mb-2">
          Customize {name}
        </h2>
        <p className="text-[var(--accent)]">
          Choose the details for your horse
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-[var(--brand)]">
            Main Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={mainColor}
              onChange={(e) => setMainColor(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer border-2 border-[var(--accent-light)]"
            />
            <span className="text-sm text-[var(--accent)]">{mainColor}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-[var(--brand)]">
            Mane Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={maneColor}
              onChange={(e) => setManeColor(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer border-2 border-[var(--accent-light)]"
            />
            <span className="text-sm text-[var(--accent)]">{maneColor}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-[var(--brand)]">
            Eye Colour
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={eyeColor}
              onChange={(e) => setEyeColor(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer border-2 border-[var(--accent-light)]"
            />
            <span className="text-sm text-[var(--accent)]">{eyeColor}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-[var(--brand)]">Attitude</label>
          <select
            value={attitude}
            onChange={(e) => setAttitude(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-[var(--accent-light)] bg-white text-[var(--foreground)] text-lg focus:outline-none focus:border-[var(--brand)] transition-colors cursor-pointer"
          >
            {ATTITUDES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--brand)] text-white text-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer mt-2"
        >
          Build My Horse &rarr;
        </button>
      </form>
    </div>
  );
}
