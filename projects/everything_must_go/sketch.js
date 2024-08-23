<<<<<<< HEAD
function setup() {
  createCanvas(400, 400);
=======
const Engine	= Matter.Engine,
      Runner	= Matter.Runner,
      Bodies	= Matter.Bodies,
      Composite = Matter.Composite;

let engine = Engine.create();
let ground = Bodies.rectangle(200, 350, 200, 50, {isStatic: true});
let box1 = Bodies.rectangle(200, 200, 80, 80);

let theta = 0;
let thetaDelta;

function setup() {
  createCanvas(400, 400);

  Composite.add(engine.world, [ground, box1]);
  
  let runner = Runner.create();
  Runner.run(runner, engine);

//  thetaDelta = PI / 100;
>>>>>>> ccd081564287a302e3598ec93c7b2001f4c4c897
}

function draw() {
  background(160);

  push();
    translate(200, 200);
    rotate(theta);
    beginShape();
    for(let t=0; t<TWO_PI; t+=TWO_PI/6){
      vertex(
	100*cos(t), 80*sin(t)
      );
    }
    endShape(CLOSE);
  pop();

  theta += thetaDelta;
  if(theta > TWO_PI){
    theta -= TWO_PI;
  }

  // text();
}

