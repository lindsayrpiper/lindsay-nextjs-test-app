"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      router.push(`/customize?name=${encodeURIComponent(name.trim())}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-md w-full -mt-20">
      <div className="text-center">
        <p className="text-6xl mb-4">&#127918;</p>
        <h2 className="text-2xl font-bold text-[var(--brand)] mb-2">
          Name Your Horse
        </h2>
        <p className="text-[var(--accent)]">
          Every great horse needs a great name. What will yours be?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your horse's name..."
          className="w-full px-4 py-3 rounded-lg border-2 border-[var(--accent-light)] bg-white text-[var(--foreground)] text-lg focus:outline-none focus:border-[var(--brand)] transition-colors"
          autoFocus
        />
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
