let fragSrc = `
precision highp float;
uniform sampler2D tex;
uniform vec2 normalRes;
varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  vec4 color = texture2D(tex, uv);
  
  if(color.r == 0.5)
  {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  } else
  {
    gl_FragColor = color;
  }
}
`;

