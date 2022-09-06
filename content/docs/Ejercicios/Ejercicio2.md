# Ejercicio 2

{{< hint info >}}
**Ejercicio 2**  
Develop a terrain visualization application
{{< /hint >}}

# ¿Qué es Perlin Noise?

es una función matemática que utiliza interpolación entre un gran número de gradientes precalculados de vectores que construyen un valor que varía seudo-aleatoriamente en el espacio o tiempo. Se parece al ruido blanco, y es frecuentemente utilizado en imágenes generadas por computadora para simular variabilidad en todo tipo de fenómenos, acercándose estas así a un aspecto más natural.




# Código

{{< details title="p5-global-iframe markdown" open=false >}}
{{< highlight html >}}
{{</* p5-global-iframe id="breath" width="470" height="450" >}}
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
{{< /p5-global-iframe */>}}
{{< /highlight >}}
{{< /details >}}

{{< p5-global-iframe id="breath" width="810" height="450" >}}
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
{{< /p5-global-iframe >}}
