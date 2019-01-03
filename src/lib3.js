const {
  NEW_LINE,
  TAB,
  SPACE,
  L_LETTER,
  W_LETTER,
  C_LETTER,
} = require('../src/constants.js');

const countLines = function (text) {
  return text.split(NEW_LINE).length - 1;
}

const countChars = (text) => text.length;

const countWords = function (text) {
  let textWithoutNewLine = text.replace(/\n/g, SPACE);
  return textWithoutNewLine.split(SPACE).length;
}

const hasLinesCountOption = (option) => option.includes(L_LETTER);
const hasWordsCountOption = (option) => option.includes(W_LETTER);
const hasCharsCountOption = (option) => option.includes(C_LETTER);

const COUNTER = {
  'l': countLines,
  'w': countWords,
  'c': countChars
}

const getCount = function (fs, options, filePaths) {
  let content = fs.readFileSync(filePaths, 'utf8');
  return options.map(option => COUNTER[option](content));
};

const joinCount = function (counts, filePath) {
  let joinedCounts = counts.concat(filePath);
  return joinedCounts.join(TAB);
}

const joinCounts = function (counts, filePaths) {
  let joinedCounts = [];
  for (let index = 0; index < counts.length; index++) {
    joinedCounts.push(joinCount(counts[index], filePaths[index]));
  }
  return joinedCounts;
}

const totalCounts = function (counts) {
  let totalCounts = [];
  for (let countIndex = 0; countIndex < counts[0].length; countIndex++) {
    totalCounts[countIndex] = counts.reduce(
      (accumulator, count) =>
        accumulator[countIndex] + count[countIndex]
    );
  }
  return totalCounts;
}

module.exports = {
  countChars,
  countLines,
  countWords,
  hasCharsCountOption,
  hasLinesCountOption,
  hasWordsCountOption,
  joinCounts,
  totalCounts,
  getCount,
}