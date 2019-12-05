
class IntcodeComputer {
  constructor(intcodes, input = 1) {
    this.intcodes = [...intcodes];
    this.iPointer = 0;
    this.output = [];
    this.input = input;
  }

  getNextIntcode() {
    return this.intcodes[this.iPointer++];
  }

  run() {
    while (this.iPointer < this.intcodes.length - 1) {
      const next = this.getNextIntcode();
      if (next === 99) {
        return {
          exit: 99,
          codes: this.intcodes,
          out: this.output,
        };
      }

      const [opcode, , mode1 = 0, mode2 = 0] = Array.from(String(next), Number).reverse();
      switch (opcode) {
        case 1: this.doAddition(mode1, mode2); break;
        case 2: this.doMultiplication(mode1, mode2); break;
        case 3: this.doMove(); break;
        case 4: this.writeToOutput(mode1); break;
        case 5: this.jumpIfTrue(mode1, mode2); break;
        case 6: this.jumpIfFalse(mode1, mode2); break;
        case 7: this.lessThan(mode1, mode2); break;
        case 8: this.equals(mode1, mode2); break;
        default: throw new Error(`bad opcode ${opcode} at ${this.iPointer}`);
      }
    }
    return {
      exit: 0,
      codes: this.intcodes,
      out: this.output,
    };
  }

  doAddition(mode1, mode2) {
    const addend1 = mode1 === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    const addend2 = mode2 === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    const pos = this.getNextIntcode();

    this.intcodes[pos] = addend1 + addend2;
  }

  doMultiplication(mode1, mode2) {
    const factor1 = mode1 === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    const factor2 = mode2 === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    const pos = this.getNextIntcode();
    this.intcodes[pos] = factor1 * factor2;
  }

  doMove() {
    const pos = this.getNextIntcode();
    this.intcodes[pos] = this.input;
  }

  writeToOutput(mode) {
    const value = mode === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    this.output.push(value);
  }

  jumpIfTrue(mode1, mode2) {
    const value1 = mode1 === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    const value2 = mode2 === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    if (value1 !== 0) this.iPointer = value2;
  }

  jumpIfFalse(mode1, mode2) {
    const value1 = mode1 === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    const value2 = mode2 === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    if (value1 === 0) this.iPointer = value2;
  }

  lessThan(mode1, mode2) {
    const value1 = mode1 === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    const value2 = mode2 === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    const pos = this.getNextIntcode();
    if (value1 < value2) this.intcodes[pos] = 1;
    else this.intcodes[pos] = 0;
  }

  equals(mode1, mode2) {
    const value1 = mode1 === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    const value2 = mode2 === 1 ? this.getNextIntcode() : this.intcodes[this.getNextIntcode()];
    const pos = this.getNextIntcode();
    if (value1 === value2) this.intcodes[pos] = 1;
    else this.intcodes[pos] = 0;
  }
}

module.exports = IntcodeComputer;
