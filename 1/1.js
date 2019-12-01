const fs = require('fs');

const input = fs.readFileSync('./1/input.txt')
  .toString()
  .split('\n')
  .map(Number);

const fuelRequired = (mass) => Math.floor(mass / 3) - 2;

const fuelRequiredWithFuel = (mass) => {
  const initialFuelRequired = fuelRequired(mass);

  const totalFuel = (m) => {
    if (fuelRequired(m) <= 0) return m;
    return m + totalFuel(fuelRequired(m));
  };
  return totalFuel(initialFuelRequired);
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
