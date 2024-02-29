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
    this.#canvas2d.fillStyle = "rgba(255,0,0,0.0)";

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
}
