import {
  collisions,
  Movement,
  Map,
  Frames,
  Player,
  ImageInstance,
  homeCollisions,
} from "./src";

const canvas = document.querySelector("#map");
const canvas2d = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas2d.fillStyle = "white";
canvas2d.fillRect(0, 0, canvas.width, canvas.height);

const offset = {
  x: 0,
  y: -500,
};

const map = new Map({ collisions, offset, canvas2d, homeCollisions });

const boundaries = map.getBoundaries;
const homeBoundaries = map.getHomeBoundaries;

const playerDownImage = new ImageInstance("../img/player/playerDown.png");
const playerUpImage = new ImageInstance("../img/player/playerUp.png");
const playerRightImage = new ImageInstance("../img/player/playerRight.png");
const playerLeftImage = new ImageInstance("../img/player/playerLeft.png");

const playerWidth = 192;
const playerHeight = 68;

const player = new Player({
  position: {
    x: canvas.width / 2 - playerWidth / 4 / 2,
    y: canvas.height / 2 - playerHeight / 2,
  },
  image: "../img/player/playerDown.png",
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUpImage.imageProperty,
    down: playerDownImage.imageProperty,
    left: playerLeftImage.imageProperty,
    right: playerRightImage.imageProperty,
  },
  canvas2d,
});

const background = new Frames({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: "../img/Github Game Map.png",
  canvas2d,
});

const foreground = new Frames({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: "../img/foregroundObjects.png",
  canvas2d,
});

const homeBackground = new Frames({
  position: {
    x: 0,
    y: 0,
  },
  image: "../img/Home Map.png",
  canvas2d,
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

const homeEntered = false;

// key pressed, need to go to some direction
// Need to get the value the current direction
const movables = [background, ...boundaries, foreground, ...homeBoundaries];

function animate() {
  const animationId = window.requestAnimationFrame(animate);

  /** Draw Background */
  background.draw();

  /** Code for drawing boundary and detecting boundary */
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  homeBoundaries.forEach((boundary) => {
    boundary.draw();
  });

  player.draw();

  let moving = true;

  player.stopMovement();

  foreground.draw();

  const movement = new Movement({
    boundaries,
    homeBoundaries,
    player,
    movables,
    moving,
    homeEntered,
    animationId,
    homeBackground,
  });

  if (keys.w.pressed) {
    player.moveUp();
    movement.moveUp();
  } else if (keys.a.pressed) {
    player.moveLeft();
    movement.moveLeft();
  } else if (keys.s.pressed) {
    player.moveDown();
    movement.moveDown();
  } else if (keys.d.pressed) {
    player.moveRight();
    movement.moveRight();
  }
}

animate();

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;

    case "s":
      keys.s.pressed = true;
      break;

    case "d":
      keys.d.pressed = true;
      break;
  }
});
