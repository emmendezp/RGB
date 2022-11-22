precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns avg of given texel
float avg(vec3 texel) {
    return (0.2126*texel.r  +  0.7152*texel.g + 0.0722*texel.b)/3.0 ;
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((vec3(avg(texel.rgb))), 1.0) : texel;
}