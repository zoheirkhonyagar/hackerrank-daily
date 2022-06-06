'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr: number[]): void {
    // Write your code here
    const ratios = getCalculatedRatios(arr);

    printRatios(ratios);
}

function printRatios(ratios: Ratios) {
    for (const key in ratios) {
        if (ratios.hasOwnProperty(key)) {
            process.stdout.write(`${ratios[key as keyof typeof ratios]} \n`);
        }
    }
}

type StringOrNumber = number | string;

interface Ratios {
    positive: StringOrNumber;
    negative: StringOrNumber;
    zeros: StringOrNumber;
}

function getCalculatedRatios(numbers: number[]):Ratios {
    const {positive,negative,zeros} = getCategoriesCount(numbers);
    const total:number= numbers.length;
    
    return {
        positive: calculateRatio({total,currentCategoryCount: Number(positive)}),
        negative: calculateRatio({total,currentCategoryCount: Number(negative)}),
        zeros: calculateRatio({total,currentCategoryCount: Number(zeros)})
    }
}

interface ICalculateRatio {
    total: number;
    currentCategoryCount: number
}

function calculateRatio({total,currentCategoryCount}: ICalculateRatio): string {
    return (currentCategoryCount / total).toFixed(6)
}

function getCategoriesCount(numbers: number[]):Ratios {
    const ratios:Ratios = {
        positive: getPositiveCount(numbers),
        negative: getNegativeCount(numbers),
        zeros: getZerosCount(numbers)
    }
    
    return ratios
}

function getPositiveCount(numbers: number[]):number {
    return numbers.filter((num) => num > 0).length
}

function getNegativeCount(numbers: number[]): number {
    return numbers.filter((num) => num < 0).length
}

function getZerosCount(numbers: number[]):number {
    return numbers.filter((num) => num === 0).length
}



function main() {
    const n: number = parseInt(readLine().trim(), 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    plusMinus(arr);
}
