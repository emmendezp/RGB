let pg;
let colt;
let truchetShader;
let colorShader;
let moving;
let Hexagram;
let textura;
const opcionesS  = {'truchet':0, 'color':1, 'moving':3, 'Hexagram':4,};

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('texturing_truchet.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });
  colorShader = readShader('texturing_color.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE }); 
  moving = readShader('texturing_mobile.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });
  Hexagram = readShader('texturing_Hexagram.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });

}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  textureMode(NORMAL);
  noStroke();
  texturaD = 'None'
  textura = createSelect();
  textura.position(15, 15);
  textura.style('width', '90px');
  textura.option('None'); 
  textura.option('color'); 
  textura.option('truchet');
  textura.option('moving');
  textura.option('Hexagram');
}

function draw() {
  background(33);
  orbitControl();
  rotateX(millis() / 10000);
  rotateY(millis() / 10000);
  rotateZ(millis() / 10000);
  cylinder(100, 200);
  console.log(opcionesS[textura.value()]);  
 
   if (opcionesS[textura.value()] == 1){
    pg.textureMode(NORMAL);
    pg.noStroke();
    pg.shader(colorShader);
    pg.emitResolution(colorShader);
    //colorShader.setUniform('u_zoom', 3);
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    texture(pg);
  }
   else if(opcionesS[textura.value()] == 0){
    pg.textureMode(NORMAL);
    pg.noStroke();
    pg.shader(truchetShader);
    // emitResolution, see:
    // https://github.com/VisualComputing/p5.treegl#macros
    pg.emitResolution(truchetShader);
    // https://p5js.org/reference/#/p5.Shader/setUniform
    truchetShader.setUniform('u_zoom', 3);
    // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    // set pg as texture
    texture(pg);
  }
  
   else if (opcionesS[textura.value()] == 3){
    pg.textureMode(NORMAL);
    pg.noStroke();
    pg.shader(moving);
    pg.emitResolution(moving);
    //colorShader.setUniform('u_zoom', 3);
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    texture(pg);
  }
   else if (opcionesS[textura.value()] == 4){
    pg.textureMode(NORMAL);
    pg.noStroke();
    pg.shader(Hexagram);
    pg.emitResolution(Hexagram);
    //colorShader.setUniform('u_zoom', 3);
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    texture(pg);
  }
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('_zoom', int(map(mouseX, 0, width, 1, 30)));
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}