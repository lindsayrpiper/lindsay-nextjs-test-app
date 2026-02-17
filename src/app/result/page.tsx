"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/nextjs";
import HorseIllustration from "../components/HorseIllustration";

export default function Result() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name") || "Horse";
  const mainColor = searchParams.get("mainColor") || "#8B4513";
  const maneColor = searchParams.get("maneColor") || "#1a1a1a";
  const eyeColor = searchParams.get("eyeColor") || "#3B2F2F";
  const attitude = searchParams.get("attitude") || "Gentle";

  const [displayName, setDisplayName] = useState(name);

  useEffect(() => {
    // ~20% chance the name renders backwards
    if (Math.random() < 0.2) {
      setDisplayName(name.split("").reverse().join(""));
    } else {
      setDisplayName(name);
    }

    // Silently report an error for "Wild" horses
    if (attitude === "Wild") {
      Sentry.captureException(
        new Error("Wild horse detected — containment protocols may be needed")
      );
    }
  }, [name, attitude]);

  return (
    <div className="flex flex-col items-center gap-6 max-w-lg w-full -mt-10">
      <h2 className="text-2xl font-bold text-[var(--brand)]">
        Meet Your Horse!
      </h2>

      <div className="w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <HorseIllustration
          mainColor={mainColor}
          maneColor={maneColor}
          eyeColor={eyeColor}
          attitude={attitude}
        />

        <h3 className="text-3xl font-bold text-[var(--brand)] mt-4">
          {displayName}
        </h3>
        <p className="text-[var(--accent)] mt-1 capitalize">
          {attitude} spirit
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-lg border-2 border-[var(--brand)] text-[var(--brand)] font-semibold hover:bg-[var(--accent-light)] transition-colors cursor-pointer"
        >
          &larr; Start Over
        </button>
        <button
          onClick={() =>
            router.push(`/customize?name=${encodeURIComponent(name)}`)
          }
          className="px-6 py-3 rounded-lg bg-[var(--brand)] text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          Redesign
        </button>
      </div>
    </div>
  );
}
