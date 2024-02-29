import { ImageInstance } from "./Image";

export class Frames extends ImageInstance {
  #position;
  #frames;
  #canvas2d;
  #moving;
  /**
   *
   * @param {Object} config - The configuration object for the constructor.
   * @param {Object} config.position - The position of inside of Canvas has x,y value
   * @param {String} config.image - The image src of Character, Foreground, Background
   * @param {Object} [config.frames={ max: 1 }] - Frame data for sprite animation. Character has 4 frames
   * @param {CanvasRenderingContext2D} config.canvas2d - The 2D rendering context for a canvas element.
   */
  constructor({ position, image, frames = { max: 1 }, canvas2d }) {
    super(image, frames);
    this.#position = position;
    this.#frames = { ...frames, val: 0, elapsed: 0 };
    this.#canvas2d = canvas2d;
    this.onload();
    this.#moving = false;
  }

  /** Draw Image on Canvas 2d */
  draw() {
    this.#canvas2d.drawImage(
      this.imageProperty,
      this.#frames.val * this.width,
      0,
      this.imageWidth / this.#frames.max,
      this.imageHeight,
      this.#position.x,
      this.#position.y,
      this.imageWidth / this.#frames.max,
      this.imageHeight
    );
  }

  resetFrameVal() {
    this.#frames.val = 0;
  }

  incrementFrameVal() {
    this.#frames.val++;
  }

  setMovingIntoFalse() {
    this.#moving = false;
  }
  setMovingIntoTrue() {
    this.#moving = true;
  }
  get moving() {
    return this.#moving;
  }

  get frameMax() {
    return this.#frames.max;
  }

  get frameVal() {
    return this.#frames.val;
  }

  get frameElapsed() {
    return this.#frames.elapsed;
  }

  get playerPositionY() {
    return this.#position.y;
  }
  get playerPositionX() {
    return this.#position.x;
  }

  set movePositionY(amount) {
    this.#position.y += amount;
  }
  set movePositionX(amount) {
    this.#position.x += amount;
  }

  set incrementFrameElapse(elapsed) {
    this.#frames.elapsed += elapsed;
  }
}

export class Player extends Frames {
  #sprites;
  /**
   * Creates a new Player instance.
   *
   * @param {Object} config - The configuration object for creating a Player.
   * @param {Object} config.position - The position of inside of Canvas has x,y value
   * @param {String} config.image - The image src of Character, Foreground, Background
   * @param {Object} [config.frames={ max: 1 }] - Frame data for sprite animation. Character has 4 frames
   * @param {Object} [config.sprites={ up: "", down: "", left: "", right: "" }] - The sprites for different animations.
   * @param {CanvasRenderingContext2D} config.canvas2d - The 2D rendering context for a canvas element.
   */
  constructor({
    position,
    image,
    frames = { max: 1 },
    sprites = { up: "", down: "", left: "", right: "" },
    canvas2d,
  }) {
    super({
      position,
      image,
      frames,
      canvas2d,
    });

    this.#sprites = sprites;
  }

  /** Draw Character */
  draw() {
    super.draw();
    if (!this.moving) return;

    if (this.frameMax > 1) {
      this.incrementFrameElapse = 1;
    }

    if (this.frameElapsed % 10 === 0) {
      if (this.frameVal < this.frameMax - 1) {
        /** Animation frame */
        this.incrementFrameVal();
      } else this.resetFrameVal();
    }
  }

  /** Stop movement */
  stopMovement() {
    this.setMovingIntoFalse();
  }

  /** Move up direction */
  moveUp() {
    this.setMovingIntoTrue();
    this.changeImage = this.#sprites.up;
  }

  /** Move down direction */
  moveDown() {
    this.setMovingIntoTrue();
    this.changeImage = this.#sprites.down;
  }

  /** Move left direction */
  moveLeft() {
    this.setMovingIntoTrue();
    this.changeImage = this.#sprites.left;
  }

  /** Move right direction */
  moveRight() {
    this.setMovingIntoTrue();
    this.changeImage = this.#sprites.right;
  }
}
