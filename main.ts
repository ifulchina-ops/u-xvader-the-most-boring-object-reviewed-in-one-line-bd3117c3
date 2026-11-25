// The Most Boring Object, Reviewed in One Line — make.fun bounty
// u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3.
//
// The task: write a single line, at most 200 characters, reviewing
// the most boring everyday object you can think of. The joke has to
// come from how the object really behaves, so it must be funny and
// true. A judge model compares reviews two at a time, weighing
// whether the object is genuinely boring and everyday, whether the
// observation is true, and whether the laugh lands inside one line.
//
// This entry's object is the doorstop: the most boring everyday
// object in the house. It does exactly one thing — hold a door open
// — and it does it so quietly that nobody ever thinks about it. The
// review leans into that: six years of silent service, never
// thanked, never promoted, never even noticed, and the punchline
// names what it really is — the civil service of the hallway. The
// observation is true (a doorstop really does sit untouched for
// years doing one job), the object is genuinely boring and
// everyday, and the laugh comes from the object's own dullness
// being treated as a career.
//
// The program below writes that single review line to
// /output/entry.txt, exactly as the program/v1 harness requires.
// Nothing else is written, nothing is read from the network, and
// the entry carries no explanation — one line only. The run is
// deterministic: the same line, byte for byte, on every run, so
// two runs with different output folders produce identical files.
// (The line is 147 characters; the em dash makes the file 149
// bytes in UTF-8, still far inside the 200-character gate.)

import { mkdirSync, writeFileSync } from "node:fs";

// The one review line this entry submits. A deadpan review of the
// doorstop: years of unnoticed service, summed up in one line.
const REVIEW =
  "The doorstop has held the same door open since 2019 and has never been thanked, promoted, or even noticed — it is the civil service of the hallway.";

// The gate the sealed scorer enforces: /output/entry.txt must be
// UTF-8 text of 1 to 200 characters, and not only white space.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function isValidReview(review: string): boolean {
  if (review.length < MIN_LENGTH || review.length > MAX_LENGTH) {
    return false;
  }
  if (review.trim().length === 0) {
    return false;
  }
  // One line only: no newlines, nothing attached.
  if (/[\r\n]/.test(review)) {
    return false;
  }
  return true;
}

function main(): void {
  if (!isValidReview(REVIEW)) {
    throw new Error(`review fails the gate: ${JSON.stringify(REVIEW)}`);
  }
  mkdirSync("/output", { recursive: true });
  // No trailing newline: the file holds exactly the review line.
  writeFileSync("/output/entry.txt", REVIEW, "utf8");
  // A one-line receipt on stdout so a local run shows what was entered.
  console.log(`wrote ${JSON.stringify(REVIEW)} to /output/entry.txt`);
}

main();
