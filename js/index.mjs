import { collisions } from './data/collisions.js';

const canvas = document.querySelector('#map');
const canvas2d = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionsMap = [];

for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    canvas2d.fillStyle = 'rgba(255,0,0,0.0)';
    canvas2d.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

const boundaries = [];

const offset = {
  x: 0,
  y: -500,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol == 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

canvas2d.fillStyle = 'white';
canvas2d.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = '../img/Github Game Map.png';

const playerDownImage = new Image();
playerDownImage.src = '../img/player/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = '../img/player/playerUp.png';

const playerRightImage = new Image();
playerRightImage.src = '../img/player/playerRight.png';

const playerLeftImage = new Image();
playerLeftImage.src = '../img/player/playerLeft.png';

const foregroundImage = new Image();
foregroundImage.src = '../img/foregroundObjects.png';

const playerWidth = 192;
const playerHeiht = 68;

/**
 * frames: the count of the character images == 4
 */
class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };

    this.moving = false;
    this.sprites = sprites;
  }

  /** 4 is next image */
  draw() {
    canvas2d.drawImage(
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
}

const player = new Sprite({
  position: {
    x: canvas.width / 2 - playerWidth / 4 / 2,
    y: canvas.height / 2 - playerHeiht / 2,
  },
  image: playerDownImage,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

// key pressed, need to go to some direction
// Need to get the value the current direction

const movables = [background, ...boundaries, foreground];

function rectangularCollision({ playerRectangle, boundaryRectangle }) {
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

function collisionHandler({ playerRectangle, boundaryRectangle }) {
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

  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i];
    if (
      rectangularCollision({
        playerRectangle: player,
        boundaryRectangle: {
          ...boundary,
          position: {
            x: boundary.position.x + 3,
            y: boundary.position.y,
          },
        },
      })
    ) {
      moving = false;
      break;
    }
  }
  if (moving)
    movables.forEach((movable) => {
      movable.position.x += 3;
    });
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();

  /** Code for drawing boundary and detecting boundary */
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  player.draw();

  let moving = true;
  player.moving = false;

  foreground.draw();

  if (keys.w.pressed) {
    player.moving = true;
    player.image = player.sprites.up;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          playerRectangle: player,
          boundaryRectangle: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.a.pressed) {
    player.moving = true;
    player.image = player.sprites.left;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          playerRectangle: player,
          boundaryRectangle: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (keys.s.pressed) {
    player.moving = true;
    player.image = player.sprites.down;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          playerRectangle: player,
          boundaryRectangle: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  } else if (keys.d.pressed) {
    player.image = player.sprites.right;

    player.moving = true;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          playerRectangle: player,
          boundaryRectangle: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
}

animate();

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true;
      break;
    case 'a':
      keys.a.pressed = true;
      break;

    case 's':
      keys.s.pressed = true;
      break;

    case 'd':
      keys.d.pressed = true;
      break;
  }
});
