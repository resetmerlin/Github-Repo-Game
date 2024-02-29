export class ImageInstance {
  #image = new Image();
  #frames;
  constructor(src, frames) {
    this.#image.src = src;
    this.#frames = frames;
  }

  onload() {
    this.#image.onload = () => {
      this.width = this.#image.width / this.#frames.max;
      this.height = this.#image.height;
    };
  }
  get imageProperty() {
    return this.#image;
  }
  get imageWidth() {
    return this.#image.width;
  }
  get imageHeight() {
    return this.#image.height;
  }

  set changeImage(image) {
    this.#image = image;
  }
}
