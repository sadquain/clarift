import { createHash } from "node:crypto";

type CacheEntry = {
  key: string;
  value: string;
  hits: number;
  createdAt: string;
};

const cache = new Map<string, CacheEntry>();

export function semanticKey(input: string) {
  const normalized = input.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
  return createHash("sha256").update(normalized).digest("hex");
}

export const semanticCache = {
  get(input: string) {
    const key = semanticKey(input);
    const entry = cache.get(key);
    if (!entry) return null;
    entry.hits += 1;
    return entry.value;
  },
  set(input: string, value: string) {
    const key = semanticKey(input);
    cache.set(key, { key, value, hits: 0, createdAt: new Date().toISOString() });
  },
  stats() {
    const entries = Array.from(cache.values());
    return {
      entries: entries.length,
      hits: entries.reduce((sum, entry) => sum + entry.hits, 0),
    };
  },
};
