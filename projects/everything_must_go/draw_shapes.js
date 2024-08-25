function transformFromBody(body, size)
{
  translate(body.position.x, body.position.y);
  rotate(body.angle);
}

function drawRectFromBody(body, size)
{
  push();
  transformFromBody(body, size);
  rect(-size.width/2, -size.height/2, size.width, size.height);
  pop();
}

function drawCircleFromBody(body, size)
{
  push();
  transformFromBody(body, size);
  circle(-size.radius/2, -size.radius/2, size.radius*2);
  pop();
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
