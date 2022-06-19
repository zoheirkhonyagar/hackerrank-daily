//
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
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

const timeConversion = (time: string): string => {
  // Write your code here
  if (!isPM(time)) {
    return convertTimeInAMToMilitary(time);
  }

  return convertTimeInPMToMilitary(time);
};

const isPM = (time: string) => {
  return time.toUpperCase().includes("PM");
};

const convertTimeInPMToMilitary = (time: string): string => {
  if (time === EDGE_CASE) {
    return "24:00:00";
  }
  const splittedTime = time.split(":");
  console.log(`splittedTime: ${splittedTime}`);
  const hours = splittedTime[0];
  console.log(`hours: ${hours}`);
  const isTwelve = hours === "12";
  console.log(`isTwelve: ${isTwelve}`);
  const ConvertedHours = !isTwelve ? (Number(hours) + 12).toString() : hours;
  console.log(`ConvertedHours: ${ConvertedHours}`);
  const timeInPMSplitted = [ConvertedHours, ...splittedTime.slice(1)];
  console.log(`timeInPMSplitted: ${timeInPMSplitted}`);
  const timeInPM = timeInPMSplitted.join(":");
  console.log(`timeInPM: ${timeInPM}`);
  return timeInPM.substring(0, timeInPM.length - 2);
};

const EDGE_CASE = "12:00:00PM";
// 12 am == 24

const convertTimeInAMToMilitary = (time: string): string => {
  const splittedTime = time.split(":");

  const hours = splittedTime[0] === "12" ? "00" : splittedTime[0];

  const ConvertedHours = hours.length < 2 ? `0${hours}` : hours;

  const timeInPMSplitted = [ConvertedHours, ...splittedTime.slice(1)];

  const timeInAM = timeInPMSplitted.join(":");

  return timeInAM.substring(0, timeInAM.length - 2);
};

function main() {
  const ws: WriteStream = createWriteStream(process.env["OUTPUT_PATH"]);

  const s: string = readLine();

  const result: string = timeConversion(s);

  ws.write(result + "\n");

  ws.end();
}
