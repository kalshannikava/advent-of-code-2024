const {readFromFile, writeToFile} = require('../utils/files');
const readAndTransformToLists = () => {
  const data = readFromFile('../data/day-2_input.txt').toString();

  const matrix = [];

  data.split('\n').forEach(row => {
    const numbers = row.split(' ');
    const numbersParsed = [];
    numbers.forEach(number => {
      const numberParsed = Number.parseInt(number);
      if (!Number.isNaN(numberParsed)) {
        numbersParsed.push(numberParsed)
      }
    });
    if (numbersParsed.length) {
      matrix.push(numbersParsed);
    }
  });
  return matrix;
}

// PART ONE
const compareElements = (a, b) => {
  let isDecreasing = false;
  let isIncreasing = false;
  const diff = Math.abs(a - b);

  if (diff >= 1 && diff <= 3) {
    a > b ? isDecreasing = true : isIncreasing = true;
  }

  return [isDecreasing, isIncreasing];
}

const checkIfReportIsSafe = (report) => {
  if (!report.length) {
    return false;
  }
  if (report.length === 1) {
    return true;
  }

  let isReportSafe = false;
  const [isDecreasing, isIncreasing] = compareElements(report[0], report[1]);

  if (report.length === 2 && (isIncreasing || isDecreasing)) {
    return true;
  }

  if (isDecreasing || isIncreasing) {
    for (let i = 2; i < report.length; i++) {
      const [isStillDecreasing, isStillIncreasing] = compareElements(report[i - 1], report[i]);
      if (isDecreasing) {
        if (!isStillDecreasing) {
          isReportSafe = false;
          break;
        } else {
          isReportSafe = true;
        }
      } else if (isIncreasing) {
        if (!isStillIncreasing) {
          isReportSafe = false;
          break;
        } else {
          isReportSafe = true;
        }
      }
    }
  }
  return isReportSafe;
}
const calculateSafeReports = (matrix) => {
  let safeReportsCount = 0;

  matrix.forEach(row => {
    if (checkIfReportIsSafe(row)) {
      safeReportsCount++;
    }
  });
  return safeReportsCount;
}

const matrix = readAndTransformToLists();
console.log(`Safe reports count: ${calculateSafeReports(matrix)}`);

// PART TWO - can be improved
const calculateSafeReportsDampener = (matrix) => {
  let safeReportsCount = 0;

  matrix.forEach(row => {
    let counter = -1;

    for (let i = 0; i < row.length + 1; i++) {
      const report = row.filter((num, index) => {
        if (index === counter) {
          return false;
        }
        return true;
      });

      if (checkIfReportIsSafe(report)) {
        safeReportsCount++;
        break;
      }
      counter++;
    }
  });
  return safeReportsCount;
}


console.log(`Safe reports (The Problem Dampener) count: ${calculateSafeReportsDampener(matrix)}`);