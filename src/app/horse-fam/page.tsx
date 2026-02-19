"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getYearbookEntries, findSimilarHorses, HorseEntry } from "../lib/yearbook";
import HorseIllustration from "../components/HorseIllustration";

export default function HorseFam() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id") || "";

  const [horse, setHorse] = useState<HorseEntry | null>(null);
  const [similar, setSimilar] = useState<HorseEntry[]>([]);

  useEffect(() => {
    const entries = getYearbookEntries();
    const target = entries.find((e) => e.id === id);
    if (target) {
      setHorse(target);
      setSimilar(findSimilarHorses(id, 3));
    }
  }, [id]);

  if (!horse) {
    return (
      <div className="flex flex-col items-center gap-6 max-w-md w-full -mt-20 text-center">
        <h2 className="text-2xl font-bold text-[var(--brand)]">
          Horse Not Found
        </h2>
        <p className="text-[var(--accent)]">
          This horse doesn&apos;t seem to be in the yearbook.
        </p>
        <button
          onClick={() => router.push("/yearbook")}
          className="px-6 py-3 rounded-lg bg-[var(--brand)] text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          Back to Yearbook
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-5xl py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--brand)]">
          Horse Fam
        </h2>
        <p className="text-[var(--accent)] mt-2 max-w-lg mx-auto">
          Did you know horses have 32 pairs of chromosomes in their DNA? Here are the horses most like yours.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-full max-w-sm">
        <div className="w-full max-w-[240px]">
          <HorseIllustration
            mainColor={horse.mainColor}
            maneColor={horse.maneColor}
            eyeColor={horse.eyeColor}
            attitude={horse.attitude}
          />
        </div>
        <h3 className="text-2xl font-bold text-[var(--brand)] mt-2">
          {horse.name}
        </h3>
        <p className="text-[var(--accent)] capitalize text-sm">
          {horse.attitude} spirit
        </p>
      </div>

      {similar.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {similar.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center"
            >
              <div className="w-full max-w-[200px]">
                <HorseIllustration
                  mainColor={entry.mainColor}
                  maneColor={entry.maneColor}
                  eyeColor={entry.eyeColor}
                  attitude={entry.attitude}
                />
              </div>
              <h3 className="text-xl font-bold text-[var(--brand)] mt-2">
                {entry.name}
              </h3>
              <p className="text-[var(--accent)] capitalize text-sm">
                {entry.attitude} spirit
              </p>
            </div>
          ))}
        </div>
      )}

      {similar.length === 0 && (
        <p className="text-[var(--accent)]">
          No other horses in the yearbook yet — create more to find your horse&apos;s fam!
        </p>
      )}

      <button
        onClick={() => router.push("/yearbook")}
        className="px-6 py-3 rounded-lg border-2 border-[var(--brand)] text-[var(--brand)] font-semibold hover:bg-[var(--accent-light)] transition-colors cursor-pointer"
      >
        &larr; Back to Yearbook
      </button>
    </div>
  );
}
