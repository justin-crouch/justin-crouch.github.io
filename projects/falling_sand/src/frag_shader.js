let fragSrc = `
precision highp float;
uniform sampler2D tex;
uniform vec2 normalRes;
varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  vec4 color = texture2D(tex, uv);

  // Set each pixel's RGBA value to yellow.
  //gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  gl_FragColor = color;
}
`;

