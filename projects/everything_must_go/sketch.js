const ASPECT_RATIO = 16 / 9;
const BASE_WINDOW = {'width': 1280, 'height': 720};
let   WIN_SCALE = 1;

// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MConstraint = Matter.MouseConstraint,
    Mouse  = Matter.Mouse,
    Constraint = Matter.Constraint,
    Vector = Matter.Vector,
    Events = Matter.Events;

let engine = Engine.create();
Events.on(engine, 'collisionStart', onCollideStart);
Events.on(engine, 'collisionActive', onCollideEnd);

let mouseConstraint; 

let circleWorld = Composite.create();
let boxy;
let ground;

let askFullscreen;

function setup() 
{
  let windowSize = getWindowSize();
  let canvas = createCanvas(windowSize.width, windowSize.height);
  frameRate(60);

  boxy = Bodies.rectangle(100, 200, 30, 30);
  boxy.health = 100;
  boxy.minImpact = 20;

  ground = Bodies.rectangle(500, 500, 1000, 30, {isStatic: true});

  askFullscreen = createButton("Fullscreen");
  askFullscreen.position(0, 10);
  askFullscreen.center('horizontal');
  askFullscreen.style('font-size', '20px');
  askFullscreen.style('border-radius', '10px');
  askFullscreen.mousePressed(toggleFullscreen);

  let canvasMouse = Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity();
  mouseConstraint = MConstraint.create(engine, {
    mouse: canvasMouse,
    constraint: {
      stiffness: 0.3
    }
  });

  Mouse.setScale(mouseConstraint.mouse, Vector.create(1/WIN_SCALE, 1/WIN_SCALE));
  Composite.add(engine.world, [boxy, ground, circleWorld, mouseConstraint]);

  Runner.run(Runner.create(), engine);
}

function draw() {
  if(fullscreen())
  {
    askFullscreen.hide();
  } else
  {
    askFullscreen.show();
  }

  if(frameCount%60 == 0)
  {
    let newCircle = Bodies.circle(500 + random(3), 350 + random(3), 20);
    newCircle.defColor = color(random(255), random(255), random(255));
    newCircle.color = newCircle.defColor;
//    Composite.add(circleWorld, newCircle);
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
      fill(body.color || color(255));
      drawCircleFromBody(body, {radius: body.circleRadius});
      pop();
    }
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

  Mouse.setScale(mouseConstraint.mouse, Vector.create(1/WIN_SCALE, 1/WIN_SCALE));
  askFullscreen.position(0, 10);
  askFullscreen.center('horizontal');
}

function keyPressed()
{
  if(key === 'f')
  {
    toggleFullscreen();
  }
}

function deviceOrientation()
{
  askFullscreen.position(0, 10);
  askFullscreen.center('horizontal');
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

function toggleFullscreen()
{
  fullscreen( !fullscreen() );
}

function onCollideStart(evnt)
{
  for(let collision of evnt.pairs)
  {
    let bodyA = collision.bodyA,
	bodyB = collision.bodyB;

    bodyA.collisionVelocity = Vector.clone(bodyA.velocity);
    bodyB.collisionVelocity = Vector.clone(bodyB.velocity);
  }
}

function onCollideEnd(evnt)
{
  let collision = evnt.pairs[0];
  for(let collision of evnt.pairs)
  {
    for(let body of [collision.bodyA, collision.bodyB])
    {
      if(!body.collisionVelocity) continue;

      let momentum = getMomentum(body);
      damageBodyFromMomentum(body, momentum);

      body.collisionVelocity = NaN;
    }
  }
}

function getMomentum(body)
{
  let momentum = Vector.mult((Vector.sub(body.velocity, body.collisionVelocity)), body.mass);
  return momentum;
}

function damageBodyFromMomentum(body, momentum)
{
  if(!body.health) return;
  
  const impact = Vector.magnitude(momentum);
  if(impact >= body.minImpact)
  {
    body.health -= (impact-body.minImpact);
  }
  print(body.health);
}
