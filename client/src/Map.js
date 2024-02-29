import { Boundary } from "./Boundary.js";

export class Map {
  #collisionsMap;
  #boundaries;
  #collisions;
  #offset;
  #canvas2d;
  #homeCollisions;
  #homeCollisionsMap;
  #homeBoundaries;

  constructor({ collisions, homeCollisions, offset, canvas2d }) {
    this.#collisionsMap = [];
    this.#homeCollisionsMap = [];
    this.#collisions = collisions;
    this.#homeCollisions = homeCollisions;
    this.#offset = offset;
    this.#canvas2d = canvas2d;
    this.#boundaries = [];
    this.#homeBoundaries = [];
    this.setup();
  }

  fillCollision() {
    for (let i = 0; i < this.#collisions.length; i += 70) {
      this.#collisionsMap.push(this.#collisions.slice(i, 70 + i));
    }
  }

  fillHomeCollision() {
    for (let i = 0; i < this.#homeCollisions.length; i += 70) {
      this.#homeCollisionsMap.push(this.#homeCollisions.slice(i, 70 + i));
    }
  }

  fillBoundaries() {
    const collisionSymbol = 1025;

    this.#collisionsMap.forEach((row, collIndex) => {
      row.forEach((symbol, rowIndex) => {
        if (symbol === collisionSymbol)
          this.#boundaries.push(
            new Boundary({
              x: rowIndex * Boundary.width + this.#offset.x,
              y: collIndex * Boundary.height + this.#offset.y,
              canvas2d: this.#canvas2d,
            })
          );
      });
    });

    this.#homeCollisionsMap.forEach((row, collIndex) => {
      row.forEach((symbol, rowIndex) => {
        if (symbol === collisionSymbol)
          this.#homeBoundaries.push(
            new Boundary({
              x: rowIndex * Boundary.width + this.#offset.x,
              y: collIndex * Boundary.height + this.#offset.y,
              canvas2d: this.#canvas2d,
            })
          );
      });
    });
  }

  setup() {
    this.fillCollision();
    this.fillHomeCollision();
    this.fillBoundaries();
  }

  get getBoundaries() {
    return this.#boundaries;
  }

  get getHomeBoundaries() {
    return this.#homeBoundaries;
  }
}
