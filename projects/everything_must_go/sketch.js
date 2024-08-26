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
let circleWorld = Composite.create();
let boxy = Bodies.rectangle(1010, 200, 30, 30);
let ground = Bodies.rectangle(500, 500, 1000, 30, {isStatic: true});

function setup() 
{
  let windowSize = getWindowSize();
  createCanvas(windowSize.width, windowSize.height);
  frameRate(60);

  Composite.add(engine.world, [boxy, ground, circleWorld]);

  Runner.run(Runner.create(), engine);
}

function draw() {
  if(frameCount%60 == 0)
  {
    let newCircle = Bodies.circle(500 + random(3), 350 + random(3), 20);
    newCircle.color = color(random(255), random(255), random(255));
    Composite.add(circleWorld, newCircle);
  }
  if(Composite.allBodies(circleWorld).length > 10)
  {
    Composite.remove(
      circleWorld,
      Composite.allBodies(circleWorld)[0]
    );
  }

  background(127);
  scale(WIN_SCALE);

  for(let body of Composite.allBodies(engine.world))
  {
    if(body.label == "Rectangle Body")
    {
      let index0 = createVector(body.vertices[0].x, body.vertices[0].y);
      let index1 = createVector(body.vertices[1].x, body.vertices[1].y);
      let index3 = createVector(body.vertices[3].x, body.vertices[3].y);

      let width = index0.dist(index1);
      let height = index0.dist(index3);
      drawRectFromBody(body, {width: width, height: height});
    } else if(body.label == "Circle Body")
    {
      push();
      fill(body.color);
      drawCircleFromBody(body, {radius: body.circleRadius});
      pop();
    }
  }

//  drawRectFromBody(ground, {width: 1000, height: 30});
//  drawRectFromBody(boxy, {width: 30, height: 30});

//  push();
//  fill(0, 255, 0);
//  for(let ball of balls)
//  {
//    drawCircleFromBody(ball, {radius: 20});
//    fill(255);
//  }
//  pop();

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


