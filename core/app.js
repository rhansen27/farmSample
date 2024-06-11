//import { Application, Assets, Container, Sprite } from "pixi.js";
const {
  Application,
  Assets,
  Container,
  Sprite,
  Texture,
  TilingSprite,
  DisplacementFilter,
} = window.PIXI;

const fishes = [];

let overlay;

const app = new Application();

async function init() {
  await setup();
  await preload();
  addBackground(app);
  addFish(app, fishes);
  addWaterOverlay(app);
  addDisplacementEffect(app);
  app.ticker.add((time) => {
    animateFishes(app, fishes, time);
    animateWaterOverlay(app, time);
  });
}

async function setup() {
  await app.init({ background: "#1099bb", resizeTo: window });
  document.body.appendChild(app.canvas);
}

async function preload() {
  const assets = [
    {
      alias: "background",
      src: "https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg",
    },
    {
      alias: "fish1",
      src: "https://pixijs.com/assets/tutorials/fish-pond/fish1.png",
    },
    {
      alias: "fish2",
      src: "https://pixijs.com/assets/tutorials/fish-pond/fish2.png",
    },
    {
      alias: "fish3",
      src: "https://pixijs.com/assets/tutorials/fish-pond/fish3.png",
    },
    {
      alias: "fish4",
      src: "https://pixijs.com/assets/tutorials/fish-pond/fish4.png",
    },
    {
      alias: "fish5",
      src: "https://pixijs.com/assets/tutorials/fish-pond/fish5.png",
    },
    {
      alias: "overlay",
      src: "https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png",
    },
    {
      alias: "displacement",
      src: "https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png",
    },
  ];
  await Assets.load(assets);
}
function addBackground(app) {
  const background = Sprite.from("background");

  background.anchor.set(0.5);

  if (app.screen.width > app.screen.height) {
    background.width = app.screen.width * 1.2;
    background.scale.y = background.scale.x;
  } else {
    background.height = app.screen.height * 1.2;
    background.scale.x = background.scale.y;
  }

  background.x = app.screen.width / 2;
  background.y = app.screen.height / 2;

  app.stage.addChild(background);
}

function addFish() {
  // Create a container to hold all the fish sprites.
  const fishContainer = new Container();

  // Add the fish container to the stage.
  app.stage.addChild(fishContainer);

  const fishCount = 20;
  const fishAssets = ["fish1", "fish2", "fish3", "fish4", "fish5"];

  // Create a fish sprite for each fish.
  for (let i = 0; i < fishCount; i++) {
    // Cycle through the fish assets for each sprite.
    const fishAsset = fishAssets[i % fishAssets.length];

    // Create a fish sprite.
    const fish = Sprite.from(fishAsset);

    // Center the sprite anchor.
    fish.anchor.set(0.5);

    // Assign additional properties for the animation.
    fish.direction = Math.random() * Math.PI * 2;
    fish.speed = 2 + Math.random() * 2;
    fish.turnSpeed = Math.random() - 0.8;

    // Randomly position the fish sprite around the stage.
    fish.x = Math.random() * app.screen.width;
    fish.y = Math.random() * app.screen.height;

    // Randomly scale the fish sprite to create some variety.
    fish.scale.set(0.5 + Math.random() * 0.2);

    // Add the fish sprite to the fish container.
    fishContainer.addChild(fish);

    // Add the fish sprite to the fish array.
    fishes.push(fish);
  }
}

function animateFishes(app, fishes, time) {
  // Extract the delta time from the Ticker object.
  const delta = time.deltaTime;

  // Define the padding around the stage where fishes are considered out of sight.
  const stagePadding = 100;
  const boundWidth = app.screen.width + stagePadding * 2;
  const boundHeight = app.screen.height + stagePadding * 2;

  // Iterate through each fish sprite.
  fishes.forEach((fish) => {
    // Animate the fish movement direction according to the turn speed.
    fish.direction += fish.turnSpeed * 0.01;

    // Animate the fish position according to the direction and speed.
    fish.x += Math.sin(fish.direction) * fish.speed;
    fish.y += Math.cos(fish.direction) * fish.speed;

    // Apply the fish rotation according to the direction.
    fish.rotation = -fish.direction - Math.PI / 2;

    // Wrap the fish position when it goes out of bounds.
    if (fish.x < -stagePadding) {
      fish.x += boundWidth;
    }
    if (fish.x > app.screen.width + stagePadding) {
      fish.x -= boundWidth;
    }
    if (fish.y < -stagePadding) {
      fish.y += boundHeight;
    }
    if (fish.y > app.screen.height + stagePadding) {
      fish.y -= boundHeight;
    }
  });
}

function addWaterOverlay(app) {
  // Create a water texture object.
  const texture = Texture.from("overlay");

  // Create a tiling sprite with the water texture and specify the dimensions.
  overlay = new TilingSprite({
    texture,
    width: app.screen.width,
    height: app.screen.height,
  });

  // Add the overlay to the stage.
  app.stage.addChild(overlay);
}

function animateWaterOverlay(app, time) {
  const delta = time.deltaTime;

  overlay.tilePosition.x -= delta;
  overlay.tilePosition.y -= delta;
}

function addDisplacementEffect(app) {
  const sprite = Sprite.from("displacement");

  sprite.texture.baseTexture.wrapeMode = "repeat";

  const filter = new DisplacementFilter({
    sprite,
    scale: 50,
    width: app.screen.width,
    height: app.screen.height,
  });

  app.stage.filters = [filter];
}

init();
