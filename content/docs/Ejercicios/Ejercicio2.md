# Ejercicio 2

{{< hint info >}}
**Ejercicio 2**  
Develop a terrain visualization application
{{< /hint >}}
# Mach band

Las bandas de Mach son una ilusión óptica que parte de una imagen con dos bandas, una iluminada y la otra oscura, separadas por una estrecha banda central coloreada con un gradiente de iluminado a oscuro. El ojo humano percibe dos estrechas bandas de diferente luminosidad, que no están presentes en la imagen verdadera, a cada lado del gradiente. Esta ilusión se denomina así debido a Ernst Mach.


![ilusión óptica](https://upload.wikimedia.org/wikipedia/commons/e/e8/Mach_bands_-_animation.gif "Animación que muestra que tan pronto como se ponen en contacto bandas de tonos ligeramente diferentes de gris, aparece un contraste que exagera los bordes de las bandas")


# ¿Qué es Perlin Noise?

es una función matemática que utiliza interpolación entre un gran número de gradientes precalculados de vectores que construyen un valor que varía seudo-aleatoriamente en el espacio o tiempo. Se parece al ruido blanco, y es frecuentemente utilizado en imágenes generadas por computadora para simular variabilidad en todo tipo de fenómenos, acercándose estas así a un aspecto más natural.




# Código

{{< details title="terrain visualization 1" open=false >}}
{{< highlight javascript >}}

var cols, rows;
var scl = 20;
var w = 1200;
var h = 400;
var zoff = 0;
var inc = 0.1;
var zinc = 0.02;
var start = 0;
var minVal = -50;
var maxVal = 50;
var startInc = 0;

function setup() {
  createCanvas(800, 350, WEBGL);
  cols = w / scl;
  rows = h / scl;
}

function draw() {
  background(0);
  fill(0,255,255);
  stroke(0);
 
  
  rotateX(PI/3);
  translate(-w/2, -h/2);
  
  let yoff = -start;
  for (let y = 0; y < rows - 1; y++) {
    let xoff = 0;
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, map(noise(xoff,yoff,zoff), 0, 1, minVal, maxVal));
      vertex(x*scl, (y+1)*scl, map(noise(xoff,yoff,zoff), 0, 1, minVal, maxVal));
      xoff += inc;
    }
    yoff += inc;
    endShape();
  }
  zoff += zinc;
  start += startInc;
}

{{< /highlight >}}
{{< /details >}}


{{< p5-global-iframe id="breath" width="610" height="400" >}}
var cols, rows;
var scl = 20;
var w = 1200;
var h = 400;
var zoff = 0;
var inc = 0.1;
var zinc = 0.02;
var start = 0;
var minVal = -50;
var maxVal = 50;
var startInc = 0;

function setup() {
  createCanvas(600, 350, WEBGL);
  cols = w / scl;
  rows = h / scl;
}

function draw() {
  background(0);
  fill(0,255,255);
  stroke(0);
 
  
  rotateX(PI/3);
  translate(-w/2, -h/2);
  
  let yoff = -start;
  for (let y = 0; y < rows - 1; y++) {
    let xoff = 0;
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, map(noise(xoff,yoff,zoff), 0, 1, minVal, maxVal));
      vertex(x*scl, (y+1)*scl, map(noise(xoff,yoff,zoff), 0, 1, minVal, maxVal));
      xoff += inc;
    }
    yoff += inc;
    endShape();
  }
  zoff += zinc;
  start += startInc;
}



{{< /p5-global-iframe >}}
{{< details title="terrain visualization 2" open=false >}}
{{< highlight javascript >}}
"use strict";

// ----- vars ----- //
let canvas;
let rows, columns, terrain;
let scale = 15;
let heightOffset = 100;
let yStart = 0;
let noiseOffset = 0.1;


// ----- setup ----- //
function setup() {

   // create and style canvas 
   canvas = createCanvas(windowWidth, windowHeight, WEBGL);
   canvas.style('display: block;');

   // get number of rows and columns 
   columns = Math.floor(width * 2 / scale);
   rows = Math.floor(height * 2 / scale);

   terrain = generateTerrain(rows, columns, heightOffset, noiseOffset, yStart);
}

// ----- resize ----- // 
function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
   columns = Math.floor(width * 2 / scale);
   rows = Math.floor(height * 2 / scale);
}

// ----- draw ----- // 
function draw() {
   background(255);
   yStart -= noiseOffset * 3;
   terrain = generateTerrain(rows, columns, heightOffset, noiseOffset, yStart);
   drawMesh(terrain);
}

// ----- generate terrain ----- // 
function generateTerrain(rows, columns, heightOffset, noiseOffset, yStart) {

   // create 2d array
   let terrain = new Array(rows);
   for (let i = 0; i < terrain.length; i++) {
      terrain[i] = new Array(columns);
   }

   // generate perlin noise
   let yOffset = yStart;
   for (let y = 0; y < rows; y++) {

      let xOffset = 0;
      for (let x = 0; x < columns; x++) {
         terrain[y][x] = map(noise(xOffset, yOffset), 0, 1, -heightOffset, heightOffset);
         xOffset += noiseOffset;
      }
      yOffset += noiseOffset;
   }

   return terrain;
}

// ----- create grid ----- // 
function drawMesh(terrain) {

   // setup
   stroke(0);
   fill("brown");
   rotateX(PI / 3);
   translate(-width, -height * 1.2, 0);

   // draw triangle strips
   for (let y = 0; y < rows - 1; y++) {

      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < columns; x++) {
         vertex(x * scale, y * scale, terrain[y][x]);
         vertex(x * scale, (y + 1) * scale, terrain[y + 1][x]);
      }
      endShape();
   }
}
{{< /highlight >}}
{{< /details >}}

{{< p5-global-iframe id="breath" width="610" height="400" >}}
"use strict";

// ----- vars ----- //
let canvas;
let rows, columns, terrain;
let scale = 15;
let heightOffset = 100;
let yStart = 0;
let noiseOffset = 0.1;


// ----- setup ----- //
function setup() {

   // create and style canvas 
   canvas = createCanvas(windowWidth, windowHeight, WEBGL);
   canvas.style('display: block;');

   // get number of rows and columns 
   columns = Math.floor(width * 2 / scale);
   rows = Math.floor(height * 2 / scale);

   terrain = generateTerrain(rows, columns, heightOffset, noiseOffset, yStart);
}

// ----- resize ----- // 
function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
   columns = Math.floor(width * 2 / scale);
   rows = Math.floor(height * 2 / scale);
}

// ----- draw ----- // 
function draw() {
   background(255);
   yStart -= noiseOffset * 3;
   terrain = generateTerrain(rows, columns, heightOffset, noiseOffset, yStart);
   drawMesh(terrain);
}

// ----- generate terrain ----- // 
function generateTerrain(rows, columns, heightOffset, noiseOffset, yStart) {

   // create 2d array
   let terrain = new Array(rows);
   for (let i = 0; i < terrain.length; i++) {
      terrain[i] = new Array(columns);
   }

   // generate perlin noise
   let yOffset = yStart;
   for (let y = 0; y < rows; y++) {

      let xOffset = 0;
      for (let x = 0; x < columns; x++) {
         terrain[y][x] = map(noise(xOffset, yOffset), 0, 1, -heightOffset, heightOffset);
         xOffset += noiseOffset;
      }
      yOffset += noiseOffset;
   }

   return terrain;
}

// ----- create grid ----- // 
function drawMesh(terrain) {

   // setup
   stroke(0);
   fill("brown");
   rotateX(PI / 3);
   translate(-width, -height * 1.2, 0);

   // draw triangle strips
   for (let y = 0; y < rows - 1; y++) {

      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < columns; x++) {
         vertex(x * scale, y * scale, terrain[y][x]);
         vertex(x * scale, (y + 1) * scale, terrain[y + 1][x]);
      }
      endShape();
   }
}
{{< /p5-global-iframe >}}

# Conclusión
Las funciones de ruido se han utilizado en una amplia gama de métodos de creación de contenidos procedimentales incluyendo la generación de terrenos. Perlin noise, diseñado originalmente para la generación de texturas por procedimientos de tipo natural, es quizás la implementación de ruido más conocida y más conocida y referenciada, y que todavía se utiliza ampliamente en la actualidad. 


# Bibliografía

* [Procedural Generation: Perlin Noise](https://www.cs.umd.edu/class/fall2018/cmsc425/Lects/lect14-perlin.pdf) por Dave Mount
* [Noise Functions](https://www.cs.utexas.edu/~theshark/courses/cs354/lectures/cs354-21.pdf), CMSC 425
