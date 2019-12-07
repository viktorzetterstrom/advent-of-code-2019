const IntcodeComputer = require('../5/IntcodeComputer');

class IntcodeAmp extends IntcodeComputer {
  constructor(intcodes, input, phasecode) {
    super(intcodes, input);
    this.phase = {
      code: phasecode,
      used: false,
    };
  }

  doMove() {
    const pos = this.getNextIntcode();
    if (!this.phase.used) {
      this.intcodes[pos] = this.phase.code;
      this.phase.used = true;
    } else {
      this.intcodes[pos] = this.input;
    }
  }
}

module.exports = IntcodeAmp;
