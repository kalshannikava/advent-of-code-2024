const {readFromFile} = require('../utils/files');

const readData = () => {
  const data = readFromFile('../data/day-3_input.txt').toString().trim();
  return data;
}

const multiplyStrings = (a, b) => {
  const first = Number.parseInt(a);
  const second = Number.parseInt(b);

  if (!Number.isNaN(first) && !Number.isNaN(second)) {
    return (first * second);
  }

  return 0;
}

// PART ONE
const calculate = () => {
  const data = readData();

  const regex = new RegExp(/mul[(][1-9][0-9]{0,2},[1-9][0-9]{0,2}[)]/, 'g');
  const pieces = data.match(regex);

  let result = 0;

  for (piece of pieces) {
    const digitRegex = new RegExp(/[1-9][0-9]{0,2}/, 'g');
    const [a, b] = piece.match(digitRegex);

    result = result + multiplyStrings(a, b);
  }
  return result;
}

console.log(`Results of the multiplications: ${calculate()}`)

// PART TWO
const calculateAdvanced = () => {
  const data = readData();

  const regex = new RegExp(/mul[(][1-9][0-9]{0,2},[1-9][0-9]{0,2}[)]|do[(][)]|don't[(][)]/, 'g');
  const pieces = data.match(regex);

  let result = 0;
  let multiplyAllowed = true;

  for (piece of pieces) {
    const digitRegex = new RegExp(/[1-9][0-9]{0,2}/, 'g');
    const doRegex = new RegExp(/do[(][)]/);
    const dontRegex = new RegExp(/don't[(][)]/);

    const digits = piece.match(digitRegex);
    const dos = piece.match(doRegex);
    const donts = piece.match(dontRegex);

    if (digits && multiplyAllowed) {
      const [a, b] = digits;
      result = result + multiplyStrings(a, b);
    } else if (dos) {
      multiplyAllowed = true;
    } else if(donts) {
      multiplyAllowed = false;
    }
  }
  return result;
}

console.log(`Results of the multiplications (advanced): ${calculateAdvanced()}`);