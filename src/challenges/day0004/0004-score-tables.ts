"use strict";

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString: string = "";
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on("data", function (inputStdin: string): void {
  inputString += inputStdin;
});

process.stdin.on("end", function (): void {
  inputLines = inputString.split("\n");
  inputString = "";

  main();
});

function readLine(): string {
  return inputLines[currentLine++];
}

/*
 * Complete the 'breakingRecords' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY scores as parameter.
 */

interface RecordsCount {
  min: number;
  max: number;
}

function breakingRecords(scores: number[]): number[] {
  // Write your code here
  // [min, max]
  const records = [0, 0];

  const recordsCount: RecordsCount = {
    min: 0,
    max: 0,
  };

  for (let i = 0; i < scores.length; i++) {
    const currentScore = scores[i];
    console.log(`currentScore : ${currentScore}`);

    // first step should be ignored based on the example
    if (i === 0) {
      records[0] = currentScore;
      records[1] = currentScore;
      continue;
    }

    if (currentScore < records[0]) {
      records[0] = currentScore;
      recordsCount.min = recordsCount.min + 1;
    }

    if (currentScore > records[1]) {
      records[1] = currentScore;
      recordsCount.max = recordsCount.max + 1;
    }
  }
  const { min, max } = recordsCount;

  return [max, min];
}

function main() {
  const ws: WriteStream = createWriteStream(process.env["OUTPUT_PATH"]);

  const n: number = parseInt(readLine().trim(), 10);

  const scores: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((scoresTemp) => parseInt(scoresTemp, 10));

  const result: number[] = breakingRecords(scores);

  ws.write(result.join(" ") + "\n");

  ws.end();
}
