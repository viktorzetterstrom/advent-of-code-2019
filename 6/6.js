const fs = require('fs');

const countOrbits = (orbitPairs) => {
  let orbits = 0;
  orbitPairs.forEach(({ parent }) => {
    orbits++; // Direct connection
    while (parent !== 'COM') { // Indirect connections
      orbits++;
      const newParent = orbitPairs.find(({ name }) => name === parent);
      parent = newParent.parent;
    }
  });
  return orbits;
};

const orbitsToSanta = (orbitPairs) => {
  
};

if (process.env.NODE_ENV !== 'test') {
  const input = fs.readFileSync('./6/input.txt')
    .toString()
    .split('\n')
    .map((orbitPair) => orbitPair.split(')'))
    .map(([key, value]) => ({ parent: key, name: value }));

  console.log('part1:', countOrbits(input));
  console.log('part2:', orbitsToSanta(input));
}

module.exports = {
  countOrbits,
  orbitsToSanta,
};
