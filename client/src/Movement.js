import { Player } from "./Frames";

export class Movement {
  #boundaries;
  #player;
  #movables;
  #moving;
  constructor({ boundaries, player, movables, moving }) {
    this.#boundaries = boundaries;
    this.#player = player;
    this.#movables = movables;
    this.#moving = moving;
  }

  moveUp() {
    this.move({ x: 0, y: 3 });

    if (this.#moving)
      this.#movables.forEach((movable) => {
        if (movable?.position) {
          movable.position.y += 3;
        } else movable.movePositionY = 3;
      });
  }

  moveDown() {
    this.move({ x: 0, y: -3 });

    if (this.#moving)
      this.#movables.forEach((movable) => {
        if (movable?.position) {
          movable.position.y -= 3;
        } else movable.movePositionY = -3;
      });
  }

  moveLeft() {
    this.move({ x: 3, y: 0 });

    if (this.#moving)
      this.#movables.forEach((movable) => {
        if (movable?.position) {
          movable.position.x += 3;
        } else movable.movePositionX = 3;
      });
  }

  moveRight() {
    this.move({ x: -3, y: 0 });

    if (this.#moving)
      this.#movables.forEach((movable) => {
        if (movable?.position) {
          movable.position.x -= 3;
        } else movable.movePositionX = -3;
      });
  }

  move({ x = 0, y = 0 }) {
    for (let i = 0; i < this.#boundaries.length; i++) {
      const boundary = this.#boundaries[i];
      const boundaryRectangle = {
        ...boundary,
        position: {
          x: boundary.boundaryPostionX + x,
          y: boundary.boundaryPostionY + y,
        },
      };

      if (this.isColliding(this.#player, boundaryRectangle)) {
        this.#moving = false;
        break;
      }
    }
  }

  isColliding(playerRectangle, boundaryRectangle) {
    if (!(playerRectangle instanceof Player)) return false;
    const IsPlayerTopColliding =
      playerRectangle.playerPositionY <=
      boundaryRectangle.position.y + boundaryRectangle.height;

    const IsPlayerBottomColliding =
      playerRectangle.playerPositionY + playerRectangle.height >=
      boundaryRectangle.position.y;

    const IsPlayerLeftColliding =
      playerRectangle.playerPositionX + playerRectangle.width >=
      boundaryRectangle.position.x;

    const IsPlayerRightColliding =
      playerRectangle.playerPositionX <=
      boundaryRectangle.position.x + boundaryRectangle.width;

    return (
      IsPlayerTopColliding &&
      IsPlayerBottomColliding &&
      IsPlayerLeftColliding &&
      IsPlayerRightColliding
    );
  }
}
