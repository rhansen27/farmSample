const {
  Application,
  Assets,
  Container,
  Sprite,
  Texture,
  TilingSprite,
  DisplacementFilter,
} = window.PIXI;

const cows = [];
const chickens = [];
const sheeps = [];
const pigs = [];

const app = new Application();

async function init() {
  await setup();
  addCows();
  addSheep();
  addPigs();
  addChickens();

  app.ticker.add((time) => {
    animateCows(app, cows, time);
  });
}
async function setup() {
  await app.init({ background: "#83924c", width: 800, height: 600 });
  document.body.appendChild(app.canvas);
}

async function addCows() {
  const cowTexture = await Assets.load("./assets/cow.png");
  const cowContainer = new Container();
  cowContainer.width = 100;
  cowContainer.height = 100;
  console.log(cowContainer.getSize());

  const cowCount = 5;

  for (let i = 0; i < cowCount; i++) {
    const cow = new Sprite(cowTexture);

    app.stage.addChild(cowContainer);

    cow.anchor.set(0.5);

    cow.direction = Math.random() * Math.PI * 2;
    cow.speed = Math.random() + 1;
    cow.turningSpeed = Math.random() - 0.8;

    cow.x = Math.random() * app.screen.width;
    cow.y = Math.random() * app.screen.height;

    cow.scale.set(0.8 + Math.random() * 0.3);
    cowContainer.addChild(cow);
    cows.push(cow);

    cow.interactive = true;
    cow.eventMode = "static";
  }
}

async function addSheep() {
  const sheepTexture = await Assets.load("./assets/sheep.png");

  const sheepCount = 5;

  for (let i = 0; i < sheepCount; i++) {
    const sheep = new Sprite(sheepTexture);

    sheep.anchor.set(0.5);

    sheep.x = Math.random() * app.screen.width;
    sheep.y = Math.random() * app.screen.height;

    app.stage.addChild(sheep);
  }
}

async function addPigs() {
  const pigTexture = await Assets.load("./assets/pig.png");

  const pigCount = 5;

  for (let i = 0; i < pigCount; i++) {
    const pig = new Sprite(pigTexture);

    pig.anchor.set(0.5);

    pig.x = Math.random() * app.screen.width;
    pig.y = Math.random() * app.screen.height;

    app.stage.addChild(pig);
  }
}
async function addChickens() {
  const chickenTexture = await Assets.load("./assets/chicken.png");

  const chickenCount = 5;

  for (let i = 0; i < chickenCount; i++) {
    const chicken = new Sprite(chickenTexture);

    chicken.anchor.set(0.5);

    chicken.x = Math.random() * app.screen.width;
    chicken.y = Math.random() * app.screen.height;

    app.stage.addChild(chicken);
  }
}

function animateCows(app, cows, time) {
  const delta = time.deltaTime;

  const stagePadding = 100;
  const boundWidth = app.screen.width + stagePadding * 2;
  const boundHeight = app.screen.height + stagePadding * 2;

  cows.forEach((cow) => {
    cow.direction += cow.turningSpeed * 0.01;
    cow.x += Math.sin(cow.direction) * cow.speed;
    cow.y += Math.cos(cow.direction) * cow.speed;
    cow.rotation = -cow.direction - Math.PI / 2;

    if (cow.x < -stagePadding) {
      cow.x += boundWidth;
    }
    if (cow.x > boundWidth) {
      cow.x -= boundWidth;
    }
    if (cow.y < -stagePadding) {
      cow.y += boundHeight;
    }
    if (cow.y > boundHeight) {
      cow.y -= boundHeight;
    }
  });
}

init();
