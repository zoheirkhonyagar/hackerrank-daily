"use strict";

// process.stdin.resume();
// process.stdin.setEncoding("utf-8");
// let inputString: string = "";
// let inputLines: string[] = [];
// let currentLine: number = 0;
// process.stdin.on("data", function (inputStdin: string): void {
//   inputString += inputStdin;
// });

// process.stdin.on("end", function (): void {
//   inputLines = inputString.split("\n");
//   inputString = "";
//   main();
// });

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
    SM: splitCommand,
    SC: splitCommand,
    SV: splitCommand,
    CM: combineMethod,
    CC: combineClass,
    CV: combineVariable,
  };
};

const removeSpecialCharacters = ({
  mainString,
}: {
  mainString: string;
}): string => {
  return mainString.includes("()")
    ? mainString.substring(0, mainString.length - 2)
    : mainString;
};

const extractWords = (mainString: string): string[] => {
  let pointer = 0;

  let commaSeparatedWords: string = "";

  const normalizedString = removeSpecialCharacters({ mainString });

  for (let character of normalizedString) {
    if (character === character.toUpperCase() && pointer !== 0) {
      commaSeparatedWords += ",";
    }
    commaSeparatedWords += character.trim().toLowerCase();
    ++pointer;
  }

  return commaSeparatedWords.split(",") || [];
};

const splitCommand: ParserFunc = ({ mainString }): string => {
  const words: string[] = extractWords(mainString);

  const result = words.join(" ");

  return result;
};

const combineMethod: ParserFunc = ({ mainString }) => {
  const words: string[] = extractWords(mainString);

  const result = words
    .map((value, index) => {
      return index === 0
        ? value.toLowerCase()
        : `${value[0].toUpperCase()}${value.substring(1)}`;
    })
    .join("")
    .concat("()");

  return result;
};

const combineClass: ParserFunc = ({ mainString }) => {
  const words: string[] = extractWords(mainString);

  const result = words
    .map((value) => {
      return `${value[0].toUpperCase()}${value.substring(1)}`;
    })
    .join("");

  return result;
};

const combineVariable: ParserFunc = ({ mainString }) => {
  const words: string[] = extractWords(mainString);

  const result = words
    .map((value, index) => {
      return index === 0
        ? value.toLowerCase()
        : `${value[0].toUpperCase()}${value.substring(1)}`;
    })
    .join("");

  return result;
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

  extractWords(mainString);

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

function printResult(commands: string[]) {
  commands.map((command) => process.stdout.write(`${command} \n`));
}

function main() {
  // Enter your code here
  const input: string[] = getInput();

  // example

  // const input = [
  //   "S;V;iPad",
  //   "C;M;mouse pad",
  //   "C;C;code swarm",
  //   "S;C;OrangeHighlighter",
  //   "S;M;plasticCup()",
  //   "C;V;mobile phone",
  //   "C;C;coffee machine",
  //   "S;C;LargeSoftwareBook",
  //   "C;M;white sheet of paper",
  //   "S;V;pictureFrame",
  // ];

  const commands: Command[] = getCommands(input);

  const results = handleCommands(commands);

  printResult(results);
}

main();
