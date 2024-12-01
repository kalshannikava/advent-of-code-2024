const {readFromFile, writeToFile} = require('../utils/files');
const readAndTransformToLists = () => {
  const data = readFromFile('../data/day-1_input.txt').toString();

  const firstList = [];
  const secondList = [];

  data.split('\n').forEach(pair => {
    const [first, second] = pair.split('   ');
    const f = Number.parseInt(first);
    if (!Number.isNaN(f)) {
      firstList.push(f)
    }
    const s = Number.parseInt(second);
    if (!Number.isNaN(s)) {
      secondList.push(s)
    }
  });
  return [firstList, secondList];
}

// PART ONE
const findTotalDistance = () => {
  const [firstList, secondList] = readAndTransformToLists();
  firstList.sort((a, b) => a - b);
  secondList.sort((a, b) => a - b);
  const diff = firstList.map((item, index) => Math.abs(item - secondList[index]));
  const totalDistance = diff.reduce((prev, curr) => prev + curr, 0);
  return totalDistance;
}

console.log(`Total distance: ${findTotalDistance()}`);

// PART TWO
const createMapFromList = (list, map) => {
  list.forEach(item => {
    if (map.has(item)) {
      const count = map.get(item);
      map.set(item, count + 1);
    } else {
      map.set(item, 1);
    }
   });
}

const findSimilarityScore = () => {
  const [firstList, secondList] = readAndTransformToLists();

  const firstListMap = new Map();
  const secondListMap = new Map();

  createMapFromList(firstList, firstListMap);
  createMapFromList(secondList, secondListMap);

  let score = 0;

  for ([item, count] of firstListMap.entries()) {
    if (secondListMap.has(item)) {
      score += item * count * secondListMap.get(item);
    }
  }

  return score;
}

console.log(`Similarity Score: ${findSimilarityScore()}`);