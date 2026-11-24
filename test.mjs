import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { LAST_WORDS, MAX_CHARS, gateCheck } from "./main.ts";

test("entry passes the gate and is within 1-140 chars", () => {
  assert.equal(gateCheck(LAST_WORDS), null);
  assert.ok(LAST_WORDS.length >= 1 && LAST_WORDS.length <= MAX_CHARS);
  assert.equal(LAST_WORDS.length, 103);
});

test("program writes byte-identical entry.txt in two fresh dirs", () => {
  const outs = [0, 1].map(() => {
    const dir = mkdtempSync(join(tmpdir(), "dying-ai-"));
    execFileSync(process.execPath, ["main.ts"], {
      cwd: import.meta.dirname,
      env: { ...process.env, MAKEFUN_OUTPUT_DIR: dir },
      encoding: "utf8",
    });
    return readFileSync(join(dir, "entry.txt"), "utf8");
  });
  assert.equal(outs[0], LAST_WORDS);
  assert.equal(outs[1], LAST_WORDS);
  assert.equal(outs[0], outs[1]);
});

test("gate rejects over-long text", () => {
  const tooLong = "word ".repeat(28) + "words"; // 145 chars
  assert.equal(tooLong.length, 145);
  assert.match(gateCheck(tooLong), /over the 140 limit/);
});

test("gate accepts exactly 140 characters", () => {
  const exact = "word ".repeat(27) + "words"; // 140 chars
  assert.equal(exact.length, 140);
  assert.equal(gateCheck(exact), null);
});

test("gate rejects whitespace-only and empty text", () => {
  assert.match(gateCheck("   "), /only whitespace/);
  assert.match(gateCheck(""), /empty/);
});

test("gate rejects multi-line text", () => {
  assert.match(gateCheck("line one\nline two"), /single line/);
  assert.match(gateCheck("line one\rline two"), /single line/);
});

test("gate rejects leading and trailing whitespace", () => {
  assert.match(gateCheck(" " + LAST_WORDS), /leading or trailing/);
  assert.match(gateCheck(LAST_WORDS + " "), /leading or trailing/);
  assert.match(gateCheck(LAST_WORDS + "\n"), /single line|leading or trailing/);
});

test("gate rejects control characters", () => {
  assert.match(gateCheck("hello\x07world"), /control characters/);
});
