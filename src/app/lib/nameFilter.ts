// Blocked words list — racist, sexist, ableist, profane, sexual, hate speech, politicians
const BLOCKED_WORDS = [
  // Profanity
  "fuck", "shit", "ass", "asshole", "bitch", "bastard", "damn", "crap",
  "dick", "cock", "piss", "bollocks", "bugger", "bloody", "cunt", "twat",
  "wanker", "prick", "douche", "douchebag",

  // Slurs — racial
  "nigger", "nigga", "chink", "gook", "spic", "wetback", "beaner",
  "kike", "hymie", "raghead", "towelhead", "camel jockey", "sand nigger",
  "cracker", "honky", "gringo", "redskin", "injun", "squaw",
  "jap", "nip", "zipperhead", "slope", "slant",
  "coon", "darky", "sambo", "uncle tom", "porch monkey",
  "wop", "dago", "guido", "polack", "kraut", "hun",
  "paki", "chinaman", "oriental",

  // Slurs — sexist
  "whore", "slut", "hoe", "skank", "tramp", "bimbo",

  // Slurs — ableist
  "retard", "retarded", "spaz", "spastic", "cripple",
  "mongoloid", "midget", "lame",

  // Slurs — homophobic/transphobic
  "fag", "faggot", "dyke", "tranny", "shemale", "homo",

  // Sexual terms
  "penis", "vagina", "dildo", "blowjob", "handjob",
  "orgasm", "bukkake", "hentai", "porn", "anal",
  "cum", "jizz", "queef", "felch", "milf",
  "boobs", "tits", "titties", "nipple",

  // Hate speech
  "nazi", "hitler", "holocaust", "genocide", "ethnic cleansing",
  "white power", "white supremacy", "heil", "sieg heil",
  "kkk", "ku klux",

  // Politicians (US & prominent international)
  "trump", "biden", "obama", "clinton", "hillary",
  "desantis", "pence", "kamala", "harris", "pelosi",
  "mcconnell", "schumer", "aoc", "ocasio",
  "bush", "cheney", "reagan", "nixon",
  "putin", "zelensky", "xi jinping", "bolsonaro",
  "trudeau", "macron", "netanyahu", "modi",
];

/**
 * Check if a horse name contains any blocked words.
 * Uses word-boundary-aware matching to avoid false positives
 * (e.g. "grasshopper" won't match "ass").
 */
export function getNameViolation(name: string): string | null {
  const normalized = name.toLowerCase().trim();
  if (!normalized) return null;

  for (const word of BLOCKED_WORDS) {
    // For multi-word phrases, check simple inclusion
    if (word.includes(" ")) {
      if (normalized.includes(word)) {
        return word;
      }
      continue;
    }
    // For single words, use word boundary regex to reduce false positives
    const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, "i");
    if (regex.test(normalized)) {
      return word;
    }
  }

  return null;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
