function setup() 
{
  createCanvas(400, 400);
}

function draw() {
  background(127);
  
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

  scaling += scalingDelta;
  if(scaling > 25)
  {
    scaling = 25;
    scalingDelta *= -1;
  } else if(scaling < 5)
  {
    scaling = 5;
    scalingDelta *= -1;
  }
}

function customShape(origin, points, scale=1, color='#fff')
{
  push();
  translate(origin[0], origin[1]);
  fill(color);
  beginShape();

    for(let p of points)
    {
      vertex(p[0]*scale, p[1]*scale);
    }

  endShape(CLOSE);
  pop();
}
