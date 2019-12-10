const fs = require('fs');

const isAsteroid = (coord) => coord === '#';

const greatestCommonDivisor = (a, b) => b === 0
  ? Math.abs(a)
  : greatestCommonDivisor(b, a % b);

const calculateVisibleAsteroids = (asteroidMap, centerX, centerY) => {
  const asteroidDeltas = new Set();
  for (let y = 0; y < asteroidMap.length; y++) {
    for (let x = 0; x < asteroidMap[0].length; x++) {
      if (isAsteroid(asteroidMap[y][x])) {
        const dx = x - centerX;
        const dy = y - centerY;
        const divisor = greatestCommonDivisor(dx, dy);
        asteroidDeltas.add(`${dx / divisor}|${dy / divisor}`);
      }
    }
  }
  return asteroidDeltas.size - 1;
};

const findBestMiningLocation = (input) => {
  const asteroidMap = input
    .split('\n')
    .map((row) => row.split(''));

  const visibleAsteroidMap = asteroidMap.map((row, y) => row.map((_, x) => isAsteroid(asteroidMap[y][x])
    ? calculateVisibleAsteroids(asteroidMap, x, y)
    : 0));

  let bestLocation = {
    asteroids: 0,
    location: null,
  };
  asteroidMap.forEach((row, y) => row.forEach((_, x) => {
    if (visibleAsteroidMap[y][x] > bestLocation.asteroids) {
      bestLocation = {
        asteroids: visibleAsteroidMap[y][x],
        location: [x, y],
      };
    }
  }));

  return bestLocation;
};


if (process.env.NODE_ENV !== 'test') {
  const input = fs.readFileSync('./10/input.txt').toString();

  console.log('part1', findBestMiningLocation(input));
}

module.exports = {
  findBestMiningLocation,
};
