import gsap from "gsap";

export class Movement {
  #boundaries;
  #player;
  #movables;
  #moving;
  #homeBoundaries;
  #homeEntered;
  #animationId;
  #homeBackground;

  constructor({
    boundaries,
    homeBoundaries,
    player,
    movables,
    moving,
    homeEntered,
    animationId,
    homeBackground,
  }) {
    this.#boundaries = boundaries;
    this.#player = player;
    this.#movables = movables;
    this.#moving = moving;
    this.#homeBoundaries = homeBoundaries;
    this.#homeEntered = homeEntered;
    this.#animationId = animationId;
    this.#homeBackground = homeBackground;
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

    if (this.#homeEntered) return;

    for (let i = 0; i < this.#homeBoundaries.length; i++) {
      const boundary = this.#homeBoundaries[i];
      if (
        this.isColliding(
          this.#player,
          boundary,
          boundary.boundaryPostionX + x,
          boundary.boundaryPostionY + y
        )
      ) {
        this.#homeEntered = true;

        window.cancelAnimationFrame(this.#animationId);

        // Activate Animation
        // Activate Animation
        gsap.to("#overlappingDiv", {
          opacity: 1,
          yoyo: true,
          duration: 0.4,
          onComplete: () => {
            // Use arrow function here
            gsap.to("#overlappingDiv", {
              opacity: 1,
              duration: 0.4,
              onComplete: () => {
                // And here as well
                this.animateHomeEntered(); // 'this' now correctly refers to the Movement instance

                gsap.to("#overlappingDiv", {
                  opacity: 0,
                  duration: 0.4,
                });
              },
            });
          },
        });

        break;
      }
    }
  }

  animateHomeEntered() {
    window.requestAnimationFrame(this.animateHomeEntered.bind(this));
    this.#homeBackground.draw();
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
