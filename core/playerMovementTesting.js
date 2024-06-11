const {
  Application,
  Assets,
  Container,
  Sprite,
  Texture,
  TilingSprite,
  DisplacementFilter,
} = window.PIXI;

import { name } from "./test.js";
console.log(name);
const app = new Application();
let keys = {};

async function init() {
  await setup();
  const texture = await Assets.load("./assets/player.png");

  const player = new Sprite(texture);
  player.anchor.set(0.5);

  player.x = app.screen.width / 4;
  player.y = app.screen.height / 4;

  app.stage.addChild(player);

  app.ticker.add(gameLoop);
  function gameLoop() {
    if (keys["87"]) {
      console.log("w pressed");
      player.y -= 5;
    }
    if (keys["65"]) {
      player.x -= 5;
    }
    if (keys["83"]) {
      player.y += 5;
    }
    if (keys["68"]) {
      player.x += 5;
    }

    if (player.x < 0 || player.x > app.screen.width - 100) {
      player.x = app.screen.width / 2;
    }
    if (player.y < 0 || player.y > app.screen.height - 100) {
      player.y = app.screen.height / 2;
    }
  }
}

async function setup() {
  await app.init({ background: "#000000", resizeTo: window });
  document.body.appendChild(app.canvas);
}

window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

function keysDown(e) {
  console.log(e.keyCode);
  keys[e.keyCode] = true;
  console.log(keys);
}
function keysUp(e) {
  console.log(e.keyCode);
  keys[e.keyCode] = false;
  console.log(keys);
}

init();
