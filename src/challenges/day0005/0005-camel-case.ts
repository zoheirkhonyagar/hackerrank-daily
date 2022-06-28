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

const handleCommands = (commands: Command[]): string[] => {
  return commands.map(handleCommand);
};

enum OperatorType {
  SM = "SM",
  SC = "SC",
  SV = "SV",
  CM = "CM",
  CC = "CC",
  CV = "CV",
}

interface ParserFunc {
  (input: ParserFuncInput): string;
}

interface ParserFuncInput {
  mainString: string;
}

const handleParse = (): {
  [key in OperatorType]: ParserFunc;
} => {
  return {
    SM: splitMethod,
    SC: splitClass,
    SV: splitVariable,
    CM: combineMethod,
    CC: combineClass,
    CV: combineVariable,
  };
};

const splitMethod: ParserFunc = ({ mainString }): string => {
  return "";
};

const splitClass: ParserFunc = ({ mainString }): string => {
  return "";
};

const splitVariable: ParserFunc = ({ mainString }): string => {
  return "";
};

const combineMethod: ParserFunc = ({ mainString }) => {
  return "";
};

const combineClass: ParserFunc = ({ mainString }) => {
  return "";
};

const combineVariable: ParserFunc = ({ mainString }) => {
  return "";
};

const validateType = (type: CommandType) => {
  const isValidType = Object.values(CommandType).includes(type);
  if (!isValidType) throw Error("Type is not valid");
};

const handleType = (command: Command): string => {
  const { operator, type, mainString } = command;

  const handleParseFunctionName = `${operator}${type}` as OperatorType;

  validateType(type);

  const parser: ParserFunc = handleParse()[handleParseFunctionName];

  const result = parser({ mainString });

  return result;
};

const validateOperator = (operator: CommandOperator): void => {
  const isValidOperator = Object.values(CommandOperator).includes(operator);
  if (!isValidOperator) throw Error("Operator is not valid");
};

const handleOperator = (command: Command) => {
  const { operator } = command;

  validateOperator(operator);

  return {
    S: (): string => handleType(command),
    C: (): string => handleType(command),
  };
};

const handleCommand = (command: Command): string => {
  return handleOperator(command)[command.operator]();
};

function main() {
  // Enter your code here
  const input: string[] = getInput();

  const commands: Command[] = getCommands(input);

  const results = handleCommands(commands);

  // example

  const testCommands = [
    "S;V;iPad",
    "C;M;mouse pad",
    "C;C;code swarm",
    "S;C;OrangeHighlighter",
    "S;M;plasticCup()",
    "C;V;mobile phone",
    "C;C;coffee machine",
    "S;C;LargeSoftwareBook",
    "C;M;white sheet of paper",
    "S;V;pictureFrame",
  ];

  console.log(input);
}
