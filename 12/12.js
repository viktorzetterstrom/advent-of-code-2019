const fs = require('fs');

const parseInput = (input) => input
  .split('\n')
  .map((row) => {
    const [, x, y, z] = row.match(/<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/);
    return {
      x: Number(x),
      y: Number(y),
      z: Number(z),
      dx: 0,
      dy: 0,
      dz: 0,
    };
  });

const applyGravityOnAxis = (a1, a2) => {
  const diff = a1 - a2;
  if (diff === 0) return 0;
  else if (diff > 0) return -1;
  return 1;
};

const applyGravity = (moon, otherMoon) => {
  moon.dx += applyGravityOnAxis(moon.x, otherMoon.x);
  moon.dy += applyGravityOnAxis(moon.y, otherMoon.y);
  moon.dz += applyGravityOnAxis(moon.z, otherMoon.z);
  return moon;
};

const applyVelocity = (moon) => {
  moon.x += moon.dx;
  moon.y += moon.dy;
  moon.z += moon.dz;
  return moon;
};

const applyVelocityAll = (moons) => moons.map(applyVelocity);

const moonEnergy = ({ x, y, z, dx, dy, dz }) => (
  (Math.abs(dx) + Math.abs(dy) + Math.abs(dz)) * (Math.abs(x) + Math.abs(y) + Math.abs(z))
);

const totalEnergy = (moons) => moons.reduce((energy, moon) => energy + moonEnergy(moon), 0);

const moonSimulation = (input, steps = 1) => {
  const moons = parseInput(input);

  for (let step = 0; step < steps; step++) {
    for (let i = 0; i < moons.length; i++) {
      for (let j = 0; j < moons.length; j++) {
        if (i !== j) {
          moons[i] = applyGravity(moons[i], moons[j]);
        }
      }
    }
    applyVelocityAll(moons);
  }
  return { moons, energy: totalEnergy(moons) };
};


if (process.env.NODE_ENV !== 'test') {
  const input = fs.readFileSync('./12/input.txt').toString();

  console.log('part 1:', moonSimulation(input, 1000).energy);
}

module.exports = {
  moonSimulation,
};
