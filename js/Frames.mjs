import { ImageInstance } from './Image.mjs';

export class Frames extends ImageInstance {
  /**
   *
   * @param {Object} config - The configuration object for the constructor.
   * @param {Object} config.position - The position of inside of Canvas has x,y value
   * @param {String} config.image - The image src of Character, Foreground, Background
   * @param {Object} [config.frames={ max: 1 }] - Frame data for sprite animation. Character has 4 frames
   * @param {CanvasRenderingContext2D} config.canvas2d - The 2D rendering context for a canvas element.
   */
  constructor({ position, image, frames = { max: 1 }, canvas2d }) {
    super(image);
    this.position = position;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.canvas2d = canvas2d;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };

    this.moving = false;
  }

  /** Draw Image on Canvas 2d */
  draw() {
    this.canvas2d.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
  }
}

export class Player extends Frames {
  /**
   * Creates a new Player instance.
   *
   * @param {Object} config - The configuration object for creating a Player.
   * @param {Object} config.position - The position of inside of Canvas has x,y value
   * @param {String} config.image - The image src of Character, Foreground, Background
   * @param {Object} [config.frames={ max: 1 }] - Frame data for sprite animation. Character has 4 frames
   * @param {Object} config.sprites - The sprites for different animations.
   * @param {CanvasRenderingContext2D} config.canvas2d - The 2D rendering context for a canvas element.
   */
  constructor({ position, image, frames = { max: 1 }, sprites, canvas2d }) {
    super({
      position,
      image,
      frames,
      canvas2d,
    });

    this.sprites = sprites;
  }

  /** Draw Character */
  draw() {
    super.draw();
    if (!this.moving) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % 10 === 0) {
      if (this.frames.val < this.frames.max - 1) {
        /** Animation frame */
        this.frames.val++;
      } else this.frames.val = 0;
    }
  }

  /** Stop movement */
  stopMovement() {
    this.moving = false;
  }

  /** Move up direction */
  moveUp() {
    this.moving = true;
    this.image = this.sprites.up;
  }

  /** Move down direction */
  moveDown() {
    this.moving = true;
    this.image = this.sprites.down;
  }

  /** Move left direction */
  moveLeft() {
    this.moving = true;
    this.image = this.sprites.left;
  }

  /** Move right direction */
  moveRight() {
    this.moving = true;
    this.image = this.sprites.right;
  }
}
