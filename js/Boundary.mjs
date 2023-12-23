export class Boundary {
  static width = 48;
  static height = 48;
  constructor({ canvas2d, x, y }) {
    this.position = {
      x: x,
      y: y,
    };
    this.width = 48;
    this.height = 48;
    this.canvas2d = canvas2d;
  }

  draw() {
    this.canvas2d.fillStyle = 'rgba(255,0,0,0.0)';
    this.canvas2d.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

