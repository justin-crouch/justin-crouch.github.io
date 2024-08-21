let theta = 0;
let thetaDelta;

function setup() {
  createCanvas(400, 400);
  thetaDelta = PI / 100;
}

function draw() {
  background(127);

  push();
    translate(200, 200);
    rotate(theta);
    beginShape();
    for(let t=0; t<TWO_PI; t+=TWO_PI/100){
      vertex(
	50 *cos(t), 100*sin(t)
      );
    }
    endShape();

    fill(255, 0, 0, 100);
    circle(0, 0, 100);
  pop();

  theta += thetaDelta;
  if(theta > TWO_PI){
    theta -= TWO_PI;
  }

  // text();
}

function ovalRadius(majorLen, minorLen, t)
{
  return lerp(majorLen, minorLen, sin(t));
  // return (0.5*majorLen*minorLen) / sqrt(majorLen*majorLen + minorLen*minorLen);
}
