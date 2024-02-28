export class ImageMaker {
  #image = new Image();
  constructor(src) {
    this.#image.src = src;
  }
  get image() {
    return this.#image;
  }
}

export class ImageInstance {
  image = new Image();
  constructor(src) {
    this.image.src = src;
  }

  get imageProperty() {
    return this.image;
  }
}
