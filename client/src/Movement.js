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
        movable.moveBoundaryPositionY = 3;
        movable.movePositionY = 3;
      });
  }

  moveDown() {
    this.move({ x: 0, y: -3 });

    if (this.#moving)
      this.#movables.forEach((movable) => {
        movable.moveBoundaryPositionY = -3;
        movable.movePositionY = -3;
      });
  }

  moveLeft() {
    this.move({ x: 3, y: 0 });

    if (this.#moving)
      this.#movables.forEach((movable) => {
        movable.moveBoundaryPositionX = +3;
        movable.movePositionX = 3;
      });
  }

  moveRight() {
    this.move({ x: -3, y: 0 });

    if (this.#moving)
      this.#movables.forEach((movable) => {
        movable.moveBoundaryPositionX = -3;
        movable.movePositionX = -3;
      });
  }

  move({ x = 0, y = 0 }) {
    for (let i = 0; i < this.#boundaries.length; i++) {
      const boundary = this.#boundaries[i];

      if (
        this.isColliding(
          this.#player,
          boundary,
          boundary.boundaryPostionX + x,
          boundary.boundaryPostionY + y
        )
      ) {
        this.#moving = false;
        break;
      }
    }
  }

  isColliding(playerRectangle, boundaryRectangle, positionX, positionY) {
    const IsPlayerTopColliding =
      playerRectangle.playerPositionY <=
      positionY + boundaryRectangle.boundaryHeight;

    const IsPlayerBottomColliding =
      playerRectangle.playerPositionY + playerRectangle.height >= positionY;

    const IsPlayerLeftColliding =
      playerRectangle.playerPositionX + playerRectangle.width >= positionX;

    const IsPlayerRightColliding =
      playerRectangle.playerPositionX <=
      positionX + boundaryRectangle.boundaryWidth;

    return (
      IsPlayerTopColliding &&
      IsPlayerBottomColliding &&
      IsPlayerLeftColliding &&
      IsPlayerRightColliding
    );
  }
}
