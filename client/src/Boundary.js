export class Boundary {
  static width = 48;
  static height = 48;

  #width;
  #height;
  #position;
  #canvas2d;

  constructor({ canvas2d, x, y }) {
    this.#position = {
      x,
      y,
    };
    this.#canvas2d = canvas2d;
    this.#width = Boundary.width;
    this.#height = Boundary.height;
  }

  draw() {
    this.#canvas2d.fillStyle = "rgba(255,1,1,1.1)";

    this.#canvas2d.fillRect(
      this.#position.x,
      this.#position.y,
      this.#width,
      this.#height
    );
  }

  get boundaryPostionX() {
    return this.#position.x;
  }

  get boundaryPostionY() {
    return this.#position.y;
  }

  get boundaryHeight() {
    return this.#height;
  }

  get boundaryWidth() {
    return this.#width;
  }

  set moveBoundaryPositionX(amount) {
    this.#position.x += amount;
  }

  set moveBoundaryPositionY(amount) {
    this.#position.y += amount;
  }
}
