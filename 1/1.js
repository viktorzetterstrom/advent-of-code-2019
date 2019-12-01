const fs = require('fs');

const input = fs.readFileSync('./1/input.txt')
  .toString()
  .split('\n')
  .map(Number);

const fuelRequired = (mass) => Math.floor(mass / 3) - 2;

const fuelRequiredWithFuel = (mass) => {
  const fuelReq = fuelRequired(mass);
  return fuelReq > 0
    ? fuelReq + fuelRequiredWithFuel(fuelReq)
    : 0;
};

if (process.env.NODE_ENV !== 'test') {
  console.log(
    `part 1: ${input.reduce((total, mass) => total + fuelRequired(mass), 0)}`,
  );
  console.log(
    `part 2: ${input.reduce((total, mass) => total + fuelRequiredWithFuel(mass), 0)}`,
  );
}

module.exports = {
  fuelRequired,
  fuelRequiredWithFuel,
};
