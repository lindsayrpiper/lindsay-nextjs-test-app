export interface HorseEntry {
  id: string;
  name: string;
  mainColor: string;
  maneColor: string;
  eyeColor: string;
  attitude: string;
  createdAt: string;
}

const STORAGE_KEY = "horse-yearbook";

export function getYearbookEntries(): HorseEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addHorseToYearbook(horse: Omit<HorseEntry, "id" | "createdAt">): HorseEntry {
  const entries = getYearbookEntries();

  const duplicate = entries.find(
    (e) =>
      e.name === horse.name &&
      e.mainColor === horse.mainColor &&
      e.maneColor === horse.maneColor &&
      e.eyeColor === horse.eyeColor &&
      e.attitude === horse.attitude
  );
  if (duplicate) return duplicate;

  const entry: HorseEntry = {
    ...horse,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  entries.push(entry);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage full or unavailable — return the entry anyway
  }
  return entry;
}

function hexToRgb(hex: string): [number, number, number] {
  const num = parseInt(hex.replace("#", ""), 16);
  return [(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff];
}

function colorDistance(a: string, b: string): number {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

export function findSimilarHorses(horseId: string, count: number): HorseEntry[] {
  const entries = getYearbookEntries();
  const target = entries.find((e) => e.id === horseId);
  if (!target) return [];

  const maxColorDist = Math.sqrt(255 ** 2 * 3); // ~441

  const scored = entries
    .filter((e) => e.id !== horseId)
    .map((e) => {
      const attitudeScore = e.attitude === target.attitude ? 0 : 50;
      const mainDist = colorDistance(e.mainColor, target.mainColor) / maxColorDist * 30;
      const maneDist = colorDistance(e.maneColor, target.maneColor) / maxColorDist * 15;
      const eyeDist = colorDistance(e.eyeColor, target.eyeColor) / maxColorDist * 5;
      return { entry: e, score: attitudeScore + mainDist + maneDist + eyeDist };
    })
    .sort((a, b) => a.score - b.score);

  return scored.slice(0, count).map((s) => s.entry);
}
