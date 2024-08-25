const ASPECT_RATIO = 16 / 9;
const BASE_WINDOW = {'width': 1080, 'height': 720};
let   WIN_SCALE = 1;

// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

let engine = Engine.create();
let boxy = Bodies.rectangle(1010, 200, 30, 30);
let ground = Bodies.rectangle(500, 500, 1000, 30, {isStatic: true});

let balls = [];

function setup() 
{
  let windowSize = getWindowSize();
  createCanvas(windowSize.width, windowSize.height);
  frameRate(60);

  Composite.add(engine.world, [boxy, ground]);

  Runner.run(Runner.create(), engine);
}

function draw() {
  if(frameCount%60 == 0)
  {
    let newCircle = Bodies.circle(500, 350, 20);
    Composite.add(engine.world, newCircle);
    balls.push(newCircle);
  }

  background(127);
  scale(WIN_SCALE);

  drawRectFromBody(ground, {width: 1000, height: 30});
  drawRectFromBody(boxy, {width: 30, height: 30});

  for(let ball of balls)
  {
    drawCircleFromBody(ball, {radius: 20});
  }

  customShape([200, 200], [
    [-3, -2],
    [3, -2],
    [4, -1],
    [4, 1],
    [3, 2],
    [-3, 2],
    [-4, 1],
    [-4, -1]
  ], 10);
}

function windowResized()
{
  let windowSize = getWindowSize();
  resizeCanvas(windowSize.width, windowSize.height);
}

function getWindowSize()
{
  let canvasWidth = windowWidth;
  let canvasHeight = windowWidth / ASPECT_RATIO;
  if(canvasHeight > windowHeight)
  {
    canvasWidth = windowHeight * ASPECT_RATIO;
    canvasHeight = windowHeight;
  }
  WIN_SCALE = canvasWidth / BASE_WINDOW.width;

  return {'width': canvasWidth, 'height': canvasHeight};
}


