const ASPECT_RATIO = 16 / 9;
const BASE_WINDOW = {'width': 1280, 'height': 720};
let   WIN_SCALE = 1;

let askFullscreen;

function setup() 
{
  let windowSize = getWindowSize();
  let canvas = createCanvas(windowSize.width, windowSize.height);
  frameRate(60);
  pixelDensity(1);
  noSmooth();
  background(127);

  askFullscreen = createButton("Fullscreen");
  askFullscreen.position(0, 10);
  askFullscreen.center('horizontal');
  askFullscreen.style('font-size', '20px');
  askFullscreen.style('border-radius', '10px');
  askFullscreen.mousePressed(toggleFullscreen);
}

function draw() {
  if(fullscreen())
  {
    askFullscreen.hide();
  } else
  {
    askFullscreen.show();
  }

  scale(WIN_SCALE);

  
  loadPixels();
  for(let i=0; i<width*height*4; i+=4)
  {
    pixels[i] = 0;
    pixels[i+1] = 255;
    pixels[i+2] = 255;
    pixels[i+3] = 255;
  }
  updatePixels();

  textSize(24);
  text(int(frameRate()), 50, 50);
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

