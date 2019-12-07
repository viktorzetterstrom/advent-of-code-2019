const fs = require('fs');
const IntcodeAmp = require('./IntcodeAmp');

const getAllPhaserSettings = (string) => {
  const results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }
  [...string].forEach((c, i) => {
    const firstChar = c;
    const charsLeft = string.substring(0, i) + string.substring(i + 1);
    const innerPermutations = getAllPhaserSettings(charsLeft);
    innerPermutations.forEach((innerPermutation) => {
      results.push(firstChar + innerPermutation);
    });
  });
  return results;
};

const calculateThrusterSignal = (intcodes, [A, B, C, D, E]) => {
  const ampA = new IntcodeAmp(intcodes, 0, A).run();
  const ampB = new IntcodeAmp(intcodes, ampA.out[0], B).run();
  const ampC = new IntcodeAmp(intcodes, ampB.out[0], C).run();
  const ampD = new IntcodeAmp(intcodes, ampC.out[0], D).run();
  const ampE = new IntcodeAmp(intcodes, ampD.out[0], E).run();
  return ampE.out;
};

const maxThrusterSignal = (intcodes) => getAllPhaserSettings('01234')
  .reduce((max, phaserSetting) => Math.max(
    calculateThrusterSignal(intcodes, [...phaserSetting].map(Number)),
    max,
  ), 0);

const calculateThrusterSignalWithLoop = (intcodes, [A, B, C, D, E]) => {
  const ampA = new IntcodeAmp(intcodes, 0, A).run();
  const ampB = new IntcodeAmp(intcodes, ampA.out[0], B).run();
  const ampC = new IntcodeAmp(intcodes, ampB.out[0], C).run();
  const ampD = new IntcodeAmp(intcodes, ampC.out[0], D).run();
  const ampE = new IntcodeAmp(intcodes, ampD.out[0], E).run();
  return ampE.out;
};

const maxThrusterSignalWithLoop = (intcodes) => getAllPhaserSettings('01234')
  .reduce((max, phaserSetting) => Math.max(
    calculateThrusterSignalWithLoop(intcodes, [...phaserSetting].map(Number)),
    max,
  ), 0);

if (process.env.NODE_ENV !== 'test') {
  const input = fs.readFileSync('./7/input.txt')
    .toString()
    .split(',')
    .map(Number);

  console.log(
    'part 1:', maxThrusterSignal(input),
  );
}

module.exports = {
  maxThrusterSignal,
  maxThrusterSignalWithLoop,
};
