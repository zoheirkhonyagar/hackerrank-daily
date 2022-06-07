"use strict";

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
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(numbers: number[]): void {
  // Write your code here
  const min = findMin(numbers);
  const max = findMax(numbers);
  const foundedNumbers = [min, max];
  printNumbers(foundedNumbers);
}

function printNumbers(numbers: number[]): void {
  numbers.map((num) => {
    process.stdout.write(`${num} `);
  });
}

function findMin(numbers: number[]): number {
  let min = Number.MAX_SAFE_INTEGER;
  let tmp = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i !== j) {
        tmp += numbers[j];
      }
    }
    if (tmp < min) {
      min = tmp;
    }
    tmp = 0;
  }

  return min;
}

function findMax(numbers: number[]): number {
  let max = Number.MIN_SAFE_INTEGER;
  let tmp = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i !== j) {
        tmp += numbers[j];
      }
    }
    if (tmp > max) {
      max = tmp;
    }
    tmp = 0;
  }

  return max;
}

function main() {
  const arr: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  miniMaxSum(arr);
}
