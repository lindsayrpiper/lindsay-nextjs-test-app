import { NextResponse } from "next/server";

const FACTS = [
  "Horses can sleep both lying down and standing up.",
  "A group of horses will not go to sleep at the same time.",
  "Horses have the largest eyes of any land mammal.",
];

export async function GET() {
  try {
    // ~50% chance this endpoint throws a server error
    if (Math.random() < 0.5) {
      throw new Error("Failed to load horse facts: database connection timed out");
    }

    // ~25% chance of a different server error
    if (Math.random() < 0.25) {
      const data: Record<string, unknown> = {};
      // @ts-expect-error intentional error for Sentry
      return NextResponse.json({ fact: data.facts.items[0] });
    }

    const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
    return NextResponse.json({ fact });
  } catch (error) {
    // Return a proper JSON error response instead of letting the error propagate
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
