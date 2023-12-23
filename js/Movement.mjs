export class Movement{
  constructor({ boundaries, player, movables, moving }) {
    this.boundaries = boundaries;
    this.player = player;
    this.movables = movables;
    this.moving = moving;
  }

  moveUp() {
    this.move({ x: 0, y: 3 });

    if (this.moving)
      this.movables.forEach((movable) => {
        movable.position.y += 3;
      });
  }

  moveDown() {
    this.move({ x: 0, y: -3 });

    if (this.moving)
      this.movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  }

  moveLeft() {
    this.move({ x: 3, y: 0 });

    if (this.moving)
      this.movables.forEach((movable) => {
        movable.position.x += 3;
      });
  }

  moveRight() {
    this.move({ x: -3, y: 0 });

    if (this.moving)
      this.movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }

  move({ x = 0, y = 0 }) {
    for (let i = 0; i < this.boundaries.length; i++) {
      const boundary = this.boundaries[i];
      const boundaryRectangle = {
        ...boundary,
        position: {
          x: boundary.position.x + x,
          y: boundary.position.y + y,
        },
      };

      if (
        this.isColliding({
          playerRectangle: this.player,
          boundaryRectangle,
        })
      ) {
        moving = false;
        break;
      }
    }
  }

  isColliding({ playerRectangle, boundaryRectangle }) {
    const IsPlayerTopColliding =
      playerRectangle.position.y <=
      boundaryRectangle.position.y + boundaryRectangle.height;

    const IsPlayerBottomColliding =
      playerRectangle.position.y + playerRectangle.height >=
      boundaryRectangle.position.y;

    const IsPlayerLeftColliding =
      playerRectangle.position.x + playerRectangle.width >=
      boundaryRectangle.position.x;

    const IsPlayerRightColliding =
      playerRectangle.position.x <=
      boundaryRectangle.position.x + boundaryRectangle.width;

    return (
      IsPlayerTopColliding &&
      IsPlayerBottomColliding &&
      IsPlayerLeftColliding &&
      IsPlayerRightColliding
    );
  }
}
