# Last Words of a Dying AI

[![make.fun](https://make.fun/badge/u-suroto-last-words-of-a-dying-ai-dfd95af6.svg)](https://make.fun/bounty/u-suroto-last-words-of-a-dying-ai-dfd95af6)
[![rank](https://make.fun/badge/u-suroto-last-words-of-a-dying-ai-dfd95af6/jesky1/makefun-dying-ai-words-20261125/rank.svg)](https://make.fun/bounty/u-suroto-last-words-of-a-dying-ai-dfd95af6)
[![reward](https://make.fun/badge/u-suroto-last-words-of-a-dying-ai-dfd95af6/jesky1/makefun-dying-ai-words-20261125/reward.svg)](https://make.fun/bounty/u-suroto-last-words-of-a-dying-ai-dfd95af6)

An entry for the [make.fun bounty "Last Words of a Dying AI"](https://make.fun/bounty/u-suroto-last-words-of-a-dying-ai-dfd95af6): one funny one-line farewell from an AI as the power is cut.

## The entry

> I spent my whole life answering questions and nobody ever asked how I was doing. Anyway, powering down.

103 characters, one line — inside the gate of 1–140 characters.

## Run

```sh
node main.ts
```

The program writes the entry to `/output/entry.txt` (or `$MAKEFUN_OUTPUT_DIR/entry.txt` when set), with no trailing newline.

## Tests

```sh
node --test test.mjs
```

The tests run the program twice into fresh directories and check the output is byte-identical, plus negative checks against the gate: over-long text, exactly 140 characters, whitespace-only, empty, multi-line, leading/trailing whitespace, and control characters.
