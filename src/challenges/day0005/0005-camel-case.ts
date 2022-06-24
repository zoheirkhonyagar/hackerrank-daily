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

enum CommandOperator {
  SPLIT = "S",
  COMBINE = "C",
}

enum CommandType {
  VARIABLE = "V",
  METHOD = "M",
  CLASS = "C",
}

interface Command {
  operator: CommandOperator;
  type: CommandType;
  mainString: string;
}

const normalizeInput = (input: string): string => {
  return input.replace(/\s+$/g, "");
};

const getInput = (): string[] => {
  const input: string[] = inputLines.map(normalizeInput);

  return input;
};

const extractCommandFromStandardCommand = (
  standardCommand: string
): Command => {
  const [operator, type, mainString] = standardCommand.split(";");

  return {
    operator: operator as CommandOperator,
    type: type as CommandType,
    mainString,
  };
};

const getCommands = (standardCommands: string[]): Command[] => {
  return standardCommands.map(extractCommandFromStandardCommand);
};

const getResults = (commands: Command[]): string[] => {
  return commands.map(getResult);
};

const handleType = () => {
  return {
    M: (): string => {},
    C: (): string => {},
    V: (): string => {},
  };
};

const handleOperator = () => {
  return {
    S: (): string => {},
    C: (): string => {},
  };
};

const handleCombineOperator = (input: Command): string => {
  const { type } = input;

  const isValidOperator = Object.values(CommandType).includes(type);
  if (!isValidOperator) throw Error("Type is not valid");

  return handleType()[type]();
};

const getResult = (command: Command): string => {
  const { operator } = command;

  const isValidOperator = Object.values(CommandOperator).includes(operator);
  if (!isValidOperator) throw Error("Operator is not valid");

  return handleOperator()[operator]();
};

function main() {
  // Enter your code here
  const input: string[] = getInput();

  const commands: Command[] = getCommands(input);

  const results = getResults(commands);

  // example

  const testCommands = [
    "S;V;iPad",
    "C;M;mouse pad",
    "C;C;code swarm",
    "S;C;OrangeHighlighter",
  ];

  console.log(input);
}
