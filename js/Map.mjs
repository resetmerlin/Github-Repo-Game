import { Boundary } from './Boundary.mjs';

export class Map {
  constructor({ collisions, offset, canvas2d }) {
    this.collisionsMap = [];
    this.boundaries = [];
    this.collisions = collisions;
    this.offset = offset;
    this.canvas2d = canvas2d;
  }

  fillCollision() {
    for (let i = 0; i < this.collisions.length; i += 70) {
      this.collisionsMap.push(this.collisions.slice(i, 70 + i));
    }
  }

  fillBoundaries() {
    const collisionSymbol = 1025;

    this.collisionsMap.forEach((row, collIndex) => {
      row.forEach((symbol, rowIndex) => {
        if (symbol === collisionSymbol)
          this.boundaries.push(
            new Boundary({
              x: rowIndex * Boundary.width + this.offset.x,
              y: collIndex * Boundary.height + this.offset.y,
              canvas2d: this.canvas2d,
            })
          );
      });
    });
  }

  setup() {
    this.fillCollision();
    this.fillBoundaries();
  }

  get getBoundaries() {
    return this.boundaries;
  }
}
