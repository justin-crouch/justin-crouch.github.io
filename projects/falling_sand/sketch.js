const ASPECT_RATIO = 16 / 9;
const BASE_WINDOW = {'width': 1280, 'height': 720};
let   WIN_SCALE = 1;

let askFullscreen;
let sandbox;


function setup() 
{
  let windowSize = getWindowSize();
  let canvas = createCanvas(windowSize.width, windowSize.height, WEBGL);
  frameRate(60);
  pixelDensity(1);
  noSmooth();

  askFullscreen = createButton("Fullscreen");
  askFullscreen.position(0, 10);
  askFullscreen.center('horizontal');
  askFullscreen.style('font-size', '20px');
  askFullscreen.style('border-radius', '10px');
  askFullscreen.mousePressed(toggleFullscreen);

  background(127);
  sandbox = createShader(vertSrc, fragSrc);
  shader(sandbox);
  sandbox.setUniform('normalRes', [1.0/width, 1.0/height]);
}

function draw() {
  if(fullscreen())
  {
    askFullscreen.hide();
  } else
  {
    askFullscreen.show();
  }

//  scale(WIN_SCALE);
  sandbox.setUniform('tex', get());
  rect(-width/2, -height/2, width, height);
}

function windowResized()
{
  let windowSize = getWindowSize();
  resizeCanvas(windowSize.width, windowSize.height);

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

