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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return entry;
}
