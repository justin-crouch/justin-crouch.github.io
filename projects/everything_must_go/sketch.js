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
let boxy = Bodies.rectangle(200, 200, 30, 30);

function setup() 
{
  let windowSize = getWindowSize();
  createCanvas(windowSize.width, windowSize.height);

  Composite.add(engine.world, boxy);

  Runner.run(Runner.create(), engine);
}

function draw() {
  background(127);

  rect(boxy.position.x, boxy.position.y, 30, 30);

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

function customShape(origin, points, scale=1, color='#fff')
{
  push();
  translate(origin[0]*WIN_SCALE, origin[1]*WIN_SCALE);
  fill(color);
  beginShape();

    for(let p of points)
    {
      vertex(p[0]*scale*WIN_SCALE, p[1]*scale*WIN_SCALE);
    }

  endShape(CLOSE);
  pop();
}
