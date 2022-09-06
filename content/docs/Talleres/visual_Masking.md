# Taller 2 : Visual Masking
## Planteamiento del problema 
Identificar, implementar y discutir posibles aplicaciones de algunas ilusiones ópticas conocidas en el diseño y desarrollo de gráficos por computadora.

## Máscaras de convolución 
### Explicación visual : 


<a href="https://imgur.com/cH0Iyea"><img src="https://i.imgur.com/cH0Iyea.gif" title="source: imgur.com" /></a>

En matemáticas (en particular, análisis funcional), la convolución es una operación matemática sobre dos funciones (f y g) que produce una tercera función (f * g) que expresa cómo la forma de una es modificada por la otra. El término conv  olución se refiere tanto a la función de resultado como al proceso de calcularla. Se define como la integral del producto de las dos funciones después de que una se refleja sobre el eje y y se desplaza. La elección de qué función se refleja y desplaza antes de la integral no cambia el resultado de la integral (ver conmutatividad). La integral se evalúa para todos los valores de desplazamiento, produciendo la función de convolución.
### Ejemplo
{{< p5-global-iframe id="breath" width="700" height="450" >}}

// this class describes the structure
// and movents of the brick
class Brick{
  constructor(bc, y){
    this.brickColor = bc;
    this.yPos = y;
    this.xPos = 0;
  }

  // this function creates the brick
  createBrick(){
    fill(this.brickColor);
    rect(this.xPos, this.yPos, 100, 50);
  }

  // this function sets the speed
  // of movement of the brick to 1
  setSpeed(){
    this.xSpeed = 1;
  }

  // this function set the bricks in motion
  moveBrick(){
    this.xPos+=this.xSpeed;
    if(this.xPos+100 >= width || this.xPos <= 0){
      this.xSpeed*=-1;
    }
  }
}

function setup() {
  createCanvas(720, 400);
  createP("Keep the mouse clicked").style('color','#ffffff');
  createP("to check whether the bricks").style('color','#ffffff');
  createP("are moving at same speed or not").style('color','#ffffff');
}

// creating two bricks of
// colors white and black
let brick1 = new Brick("white",100);
let brick2 = new Brick("black",250);

//
brick1.setSpeed();
brick2.setSpeed();

function draw () {
  background(0);
  if(mouseIsPressed){
    background(50);
  }
  brick1.createBrick();
  brick1.moveBrick();
  if(!mouseIsPressed){
    createBars();
  }
  brick2.createBrick();
  brick2.moveBrick();
}

// this function creates the black and
// white bars across the screen
function createBars() {
  let len = 12;
  for(let i = 0;i< width/len;i++){
    fill("white");
    if(i%2 == 0)
    rect(i*len,height,len,-height);
  }
}

{{< /p5-global-iframe >}}


## Image Kernel
En el procesamiento de imágenes, un núcleo, una matriz de convolución o una máscara es una matriz pequeña que se utiliza para desenfocar, agudizar, grabar, detectar bordes y más. Esto se logra haciendo una convolución entre el kernel y una imagen.
### Convolution : 
La convolución es el proceso de agregar cada elemento de la imagen a sus vecinos locales, ponderados por el kernel. Esto está relacionado con una forma de convolución matemática. La operación de matriz que se está realizando, la convolución, no es una multiplicación de matriz tradicional, a pesar de que se indica de manera similar con *.

Por ejemplo, si tenemos dos matrices de tres por tres, la primera es un kernel y la segunda una pieza de imagen, la convolución es el proceso de invertir tanto las filas como las columnas del kernel y multiplicar localmente entradas y sumas similares. El elemento en las coordenadas [2, 2] (es decir, el elemento central) de la imagen resultante sería una combinación ponderada de todas las entradas de la matriz de la imagen, con pesos dados por el kernel:


<a href="https://imgur.com/WKClpxS"><img src="https://i.imgur.com/WKClpxS.gif" title="source: imgur.com" /></a>

### Example

{{< p5-global-iframe id="breath" width="700" height="450" >}}

 
let img;
let w = 80;

// It's possible to convolve the image with many different 
// matrices to produce different effects. This is a high-pass 
// filter; it accentuates the edges. 
const matrix = [ [ -1, -1, -1 ],
                 [ -1,  9, -1 ],
                 [ -1, -1, -1 ] ]; 

function preload() {
  img = loadImage('https://i.imgur.com/drZGUWw.png');
}

function setup() {
  createCanvas(720, 400);
  img.loadPixels();

  // pixelDensity(1) for not scaling pixel density to display density
  // for more information, check the reference of pixelDensity()
  pixelDensity(1);
}

function draw() {
  // We're only going to process a portion of the image
  // so let's set the whole image as the background first
  background(img);

  // Calculate the small rectangle we will process
  const xstart = constrain(mouseX - w/2, 0, img.width);
  const ystart = constrain(mouseY - w/2, 0, img.height);
  const xend = constrain(mouseX + w/2, 0, img.width);
  const yend = constrain(mouseY + w/2, 0, img.height);
  const matrixsize = 3;

  loadPixels();
  // Begin our loop for every pixel in the smaller image
  for (let x = xstart; x < xend; x++) {
    for (let y = ystart; y < yend; y++ ) {
      let c = convolution(x, y, matrix, matrixsize, img);
      
      // retrieve the RGBA values from c and update pixels()
      let loc = (x + y*img.width) * 4;
      pixels[loc] = red(c);
      pixels[loc + 1] = green(c);
      pixels[loc + 2] = blue(c);
      pixels[loc + 3] = alpha(c);
    }
  }
  updatePixels();
}

function convolution(x, y, matrix, matrixsize, img) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  const offset = Math.floor(matrixsize / 2);
  for (let i = 0; i < matrixsize; i++){
    for (let j = 0; j < matrixsize; j++){
      
      // What pixel are we testing
      const xloc = (x + i - offset);
      const yloc = (y + j - offset);
      let loc = (xloc + img.width * yloc) * 4;

      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc, 0 , img.pixels.length - 1);

      // Calculate the convolution
      // retrieve RGB values
      rtotal += (img.pixels[loc]) * matrix[i][j];
      gtotal += (img.pixels[loc + 1]) * matrix[i][j];
      btotal += (img.pixels[loc + 2]) * matrix[i][j];
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  
  // Return the resulting color
  return color(rtotal, gtotal, btotal);
} 
{{< /p5-global-iframe >}}

# The coffee shop wall illusion
Esta ilusión de pared de cafetería ha saltado repetidamente del plano geométrico al mundo real en diferentes cafeterías o ubicaciones, gracias al atractivo visual que representa.

De hecho, uno de los libros más consultados por los amantes de las ilusiones ópticas ha sido escrito por Gregory y se titula El ojo y el cerebro, en el que, además de las aportaciones neurológicas, también aborda cuestiones de percepción, tema que ha inquietado. el autor a lo largo de su carrera profesional.

En esta ilusión de la pared de la cafetería todos los tramos son rectos, aunque la impresión es la contraria, ya que el contraste entre los tonos no permite visualizar claramente las líneas divisorias entre las filas. Por eso las pinturas crean la ilusión de ensancharse hacia los extremos.

<a href="https://imgur.com/AdnD2na"><img src="https://i.imgur.com/AdnD2na.jpg" title="source: imgur.com" /></a>

# Image Histragram

Un histograma de imagen es un tipo de histograma que actúa como una representación gráfica de la distribución tonal en una imagen digital. Traza el número de píxeles para cada valor tonal. Al mirar el histograma de una imagen específica, un espectador podrá juzgar la distribución tonal completa de un vistazo
{{< p5-global-iframe id="breath" width="600" height="600" >}}


function preload() {
  img = loadImage("https://i.imgur.com/h016LEA.jpg"); // Load the image
}

function setup() {
  createCanvas(600, 600);
  background(255);
  img.resize(0,400);
  var maxRange = 256
  colorMode(HSL, maxRange);
  image(img, 0, 0);
  var histogram = new Array(maxRange);
  for (i = 0; i <= maxRange; i++) {
    histogram[i] = 0
  }

  loadPixels();
  
  for (var x = 0; x < img.width; x+=5) {
    for (var y = 0; y < img.height; y+=5) {
      var loc = (x + y * img.width) * 4;
      var h = pixels[loc];
      var s = pixels[loc + 1];
      var l = pixels[loc + 2];
      var a = pixels[loc + 3];
      b = int(l);
      histogram[b]++
    }
  }
  //img.filter(GRAY);
  image(img, 0, 0);
  stroke(300,100,80)
  push()
  translate(10,0)
  for (x = 0; x <= maxRange; x++) {
    index = histogram[x];

    y1=int(map(index, 0, max(histogram), height, height-200));
		y2 = height
    xPos = map(x,0,maxRange,0, width-20)
    line(xPos, y1, xPos, y2);
  }
  pop()
}


{{< /p5-global-iframe >}}