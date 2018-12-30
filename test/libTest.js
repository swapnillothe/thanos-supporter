const assert = require('assert');
const { wc } = require('../src/counter.js');

describe('wc', function () {
  let fs;
  beforeEach(() => {
    fs = {
      readFileSync: (fileName) => file[fileName],
      existSync: (fileName) => file.hasOwnProperty(fileName)
    }
    const file = {
      'numbers.txt': '1\n2\n3\n4\n5\n6\n7\n8\n8\n10',
      'alphabets.txt': 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj'
    };
  })

  describe('for a option', function () {

    describe('and single file', function () {
      it('should return count of line and file name when option -l is specified', function () {
        let args = ['-l', 'numbers.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '9  numbers.txt';
        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return count of characters and file name when option -c is specified', function () {
        let args = ['-c', 'numbers.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '20  numbers.txt';
        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return count of word and file name when option -w is specified', function () {
        let args = ['-w', 'numbers.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '10  numbers.txt';
        assert.deepEqual(actualOutput, expectedOutput);
      });
    });

    describe('and multiple files', function () {
      it('should return count of words and file names when option -w is specified', function () {
        let args = ['-w', 'numbers.txt', 'alphabets.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '10  numbers.txt\n10  alphabets.txt\n20  total';
        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return count of chars and file names when option -c is specified', function () {
        let args = ['-c', 'numbers.txt', 'alphabets.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '20  numbers.txt\n19  alphabets.txt\n39  total';
        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return count of lines and file names when option -l is specified', function () {
        let args = ['-l', 'numbers.txt', 'alphabets.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '9  numbers.txt\n9  alphabets.txt\n18  total';
        assert.deepEqual(actualOutput, expectedOutput);
      });
    });

  });

  describe('for two options', function () {
    describe('and single file', function () {
      it('should return lines, words count and file name for "l","w" option', function () {
        let args = ['-l', '-w', 'numbers.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '9  10  numbers.txt';
        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return lines, chars count and file name for "l","c" option', function () {
        let args = ['-l', '-c', 'numbers.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '9  20  numbers.txt';
        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return chars, words count and file name for "c","w" option', function () {
        let args = ['-c', '-w', 'numbers.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '10  20  numbers.txt';
        assert.deepEqual(actualOutput, expectedOutput);
      });
    });

    describe('and multiple files', function () {
      it('should return lines, words count and file names for "l","w" options', function () {
        let args = ['-w', 'numbers.txt', 'alphabets.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '10  numbers.txt\n10  alphabets.txt\n20  total';
        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return count of chars and file names for "c","l" options', function () {
        let args = ['-c', '-l', 'numbers.txt', 'alphabets.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '9  20  numbers.txt\n9  19  alphabets.txt\n18  39  total';
        assert.deepEqual(actualOutput, expectedOutput);
      });

      it('should return count of lines and file names for "c","w" options', function () {
        let args = ['-c', '-w', 'numbers.txt', 'alphabets.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '10  20  numbers.txt\n10  19  alphabets.txt\n20  39  total';
        assert.deepEqual(actualOutput, expectedOutput);
      });
    });
  });
  describe('for all three options', function () {
    describe('and single file', function () {
      it('should return lines, words, chars count and file name for "l","w","c" option', function () {
        let args = ['-l', '-w', '-c', 'numbers.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '9  10  20  numbers.txt';
        assert.deepEqual(actualOutput, expectedOutput);
      });
    });

    describe('and multiple files', function () {
      it('should return lines, words count and file names for "l","w" options', function () {
        let args = ['-l', '-w', '-c', 'numbers.txt', 'alphabets.txt'];
        let actualOutput = wc(args, fs);
        let expectedOutput = '9  10  20  numbers.txt\n9  10  19';
        expectedOutput += '  alphabets.txt\n18  20  39  total'
        assert.deepEqual(actualOutput, expectedOutput);
      });
    });
  });
});