"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import HorseYearbookLogo from "./components/HorseYearbookLogo";
import { getNameViolation } from "./lib/nameFilter";

export default function Home() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Unhandled promise rejection on page load (~30% chance)
  useEffect(() => {
    if (Math.random() < 0.3) {
      fetch("/api/horse-facts")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          // If response is not ok, still try to parse JSON error response
          return res.json().catch(() => ({ error: "Failed to load horse facts" }));
        })
        .catch((error) => {
          // Properly handle any fetch or JSON parsing errors
          console.error("Failed to fetch horse facts:", error);
        });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Randomly capture a breadcrumb that hints at chaos
    if (Math.random() < 0.25) {
      Sentry.captureMessage("Horse name submitted with suspicious energy", "warning");
    }

    if (name.trim()) {
      const violation = getNameViolation(name);
      if (violation) {
        setError("Whoa there! That name contains inappropriate language. Please choose a friendlier name for your horse.");
        return;
      }
      router.push(`/customize?name=${encodeURIComponent(name.trim())}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-md w-full -mt-20">
      <div className="text-center">
        <HorseYearbookLogo size={96} />
        <h2 className="text-2xl font-bold text-[var(--brand)] mb-2">
          Name Your Horse
        </h2>
        <p className="text-[var(--brand)] font-medium mb-1">
          Happy Year of the Horse! Add your horse to the yearbook.
        </p>
        <p className="text-[var(--accent)]">
          Every great horse needs a great name. What will yours be?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(""); }}
          placeholder="Enter your horse's name..."
          className="w-full px-4 py-3 rounded-lg border-2 border-[var(--accent-light)] bg-white text-[var(--foreground)] text-lg focus:outline-none focus:border-[var(--brand)] transition-colors"
          autoFocus
        />
        {error && (
          <p className="text-red-600 text-sm font-medium -mt-2">{error}</p>
        )}
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full py-3 rounded-lg bg-[var(--brand)] text-white text-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Giddy Up &rarr;
        </button>
      </form>
    </div>
  );
}
