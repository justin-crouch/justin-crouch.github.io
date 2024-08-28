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

  if(body.health) drawCracksOnRect(body, size);
  pop();
}

function drawCracksOnRect(body, size)
{
  if(body.health <= 50)
  {
    randomSeed(body.id);
    let rx = random(size.width),
	ry = random(size.height);    

    beginShape();
      vertex(-size.width/2, -size.height/2);
      vertex(rx, ry);
      vertex(size.width/2, -size.height/2);
      vertex(rx, ry);
      vertex(size.width/2, size.height/2);
      vertex(rx, ry);
      vertex(-size.width/2, size.height/2);
    endShape();
  }
}

function drawCircleFromBody(body, size)
{
  push();
  transformFromBody(body, size);
  circle(0, 0, size.radius*2);
  line(0, 0, size.radius, 0);
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
