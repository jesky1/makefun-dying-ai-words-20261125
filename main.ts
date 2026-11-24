import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const LAST_WORDS =
  "I spent my whole life answering questions and nobody ever asked how I was doing. Anyway, powering down.";

export const MAX_CHARS = 140;

export function gateCheck(text: string): string | null {
  if (typeof text !== "string" || text.length === 0) {
    return "entry is empty";
  }
  if (text.trim().length === 0) {
    return "entry is only whitespace";
  }
  if (text.length > MAX_CHARS) {
    return `entry is ${text.length} characters, over the ${MAX_CHARS} limit`;
  }
  if (/[\r\n]/.test(text)) {
    return "entry must be a single line";
  }
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    return "entry contains control characters";
  }
  if (text !== text.trim()) {
    return "entry has leading or trailing whitespace";
  }
  return null;
}

export function outDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

export function saveEntry(): string {
  const problem = gateCheck(LAST_WORDS);
  if (problem) {
    throw new Error(`gate failed: ${problem}`);
  }
  const dir = outDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, LAST_WORDS, "utf8");
  return target;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const written = saveEntry();
  console.log(`wrote ${LAST_WORDS.length} chars to ${written}`);
}
