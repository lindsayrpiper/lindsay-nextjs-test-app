"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getYearbookEntries, HorseEntry } from "../lib/yearbook";
import HorseIllustration from "../components/HorseIllustration";

export default function Yearbook() {
  const [entries, setEntries] = useState<HorseEntry[]>([]);
  const router = useRouter();

  useEffect(() => {
    setEntries(getYearbookEntries());
  }, []);

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 max-w-md w-full -mt-20 text-center">
        <p className="text-6xl">📖</p>
        <h2 className="text-2xl font-bold text-[var(--brand)]">
          The Yearbook is Empty
        </h2>
        <p className="text-[var(--accent)]">
          No horses yet! Create your first horse to add it to the yearbook.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-lg bg-[var(--brand)] text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          Create Your First Horse &rarr;
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-5xl py-8">
      <h2 className="text-2xl font-bold text-[var(--brand)]">
        Horse Yearbook
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {entries.map((entry) => (
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
            <button
              onClick={() => router.push(`/horse-fam?id=${entry.id}`)}
              className="mt-3 px-4 py-2 rounded-lg bg-[var(--brand)] text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              32 et Moi
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 rounded-lg bg-[var(--brand)] text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
      >
        Add Another Horse &rarr;
      </button>
    </div>
  );
}
