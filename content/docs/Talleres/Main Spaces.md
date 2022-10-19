# Taller 2 :  3D Webgl Application
## Planteamiento del problema 
Implementación de  una aplicación webgl 3d. a través de la utilización de p5.treegl o otra librería.

## Main spaces  
## Sistema Tierra-Luna : 

<a href="https://commons.wikimedia.org/wiki/File:Moon_Earth_Comparison.png"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Moon_Earth_Comparison.png" title="source: From Wikimedia Commons, the free media repository" /></a>

La luna es para él planeta tierra eje fundamental de estaciones y mareas pero como sé formo está Los científicos creen que un objeto del tamaño de Marte colisionó con la Tierra hace 4.500 millones de años. La fuerza de esta colisión fue tan impresionante que desprendió materiales de la Tierra y del objeto con el que colisionó y los envió hacia el espacio. Parte de estos escombros se juntó para formar la Luna.

La Luna no solo se formó principalmente con materiales de la Tierra, sino que probablemente una gran cantidad de escombros de la Tierra aterrizaron en la Luna en el período posterior a su formación. Podría haber más indicios sobre la composición de la Tierra primordial ocultos entre las capas de polvo lunar.

Sin la gravedad de la Luna, la Tierra se tambalearía más violentamente sobre su eje, alterando así drásticamente el clima. Además de mantener la estabilidad del clima, la Luna marca el ritmo de la Tierra (las subidas y las bajadas de las mareas), lo que afecta la variedad de maneras en que usamos el océano para alimentarnos, viajar y recrearnos.

El modelado 3D consiste en utilizar software para crear una representación matemática de un objeto o forma tridimensional. El objeto creado se denomina modelo 3D y se utiliza en distintas industrias. Se puede visualizar como una imagen bidimensional mediante un proceso llamado renderizado 3D o utilizar en una simulación por computadora de fenómenos físicos.

## Herramientas a utilizar:

Uno de los dos modos de renderizado en p5.js: P2D (renderizador predeterminado) y WEBGL Habilita el renderizado 3D introduciendo la tercera dimensión: Z. Ambos modos de representación utilizan el elemento de lienzo html; sin embargo, al habilitar el "contexto" WEBGL en el lienzo, ahora podemos dibujar tanto en 2D como en 3D. 

## WEBGL (Web Graphics Library)

Es una especificación estándar que define una API implementada en JavaScript para la renderización de gráficos en 3D dentro de cualquier navegador web. No precisa del uso de plug-ins adicionales en cualquier plataforma que soporte OpenGL 2.0 u OpenGL ES 2.0. WebGL está integrada completamente en todos los estándares web del navegador, permitiendo la aceleración hardware (física) de la GPU y el procesamiento de imágenes y efectos como parte del lienzo o "canvas" de la página web. Los elementos de WebGL se pueden combinar con otros elementos HTML y estar compuestos con otras partes de la página o del fondo (background) de la página.

sintaxis WEBGL:<br>
<a href=#><img src="https://imgur.com/2KlDlVU.png" title="source: From imgur" /></a>

## Sistema de coordenadas 3D

La coordenada cartesiana 0,0 (x,y) se encuentra en la esquina superior izquierda del lienzo de dibujo. En el modo WEBGL introducimos una tercera dimensión: Z. La dimensión z es el eje que apunta hacia usted desde la pantalla. 

<a href="https://commons.wikimedia.org/wiki/File:3D_coordinate_system.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/3D_coordinate_system.svg" title="source: From Wikimedia Commons, the free media repository" /></a>

<a href="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Euler2.gif/300px-Euler2.gif"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Euler2.gif/300px-Euler2.gif" title="source: From Wikimedia Commons, the free media repository" /></a>


## Código y Resultado:

### Inicialización del script<br>
<img src="https://imgur.com/21UNy3u.png" title="Inicialización del script" />

### Función Preload
Nos permite cargar nuestras imágenes a utilizar, como sé observa en las líneas de código son especificas que imagenes utiliza nuestro proyecto.<br>
<img src="https://imgur.com/IPEeysZ.png" title="Función Preload" />

### Create Canvas
la cual en estas líneas está representada la luz con él respectivo eje de rotación permitiendo una visualización de sombra que sé ve reflejada en él planeta tierra.<br>
<img src="https://imgur.com/YRqWe2N.png" title="Create Canvas" />

### Rotate
Esta función nos permite utilizar la rotación y dar una perspectiva de movimiento donde la tierra gira en su propio eje y la luna alrededor de la tierra, aun así la luna gira gira en su propio eje, no obstante cabe aclarar que utilizamos push y pop como funciones.<br>
<img src="https://imgur.com/mutxY4g.png" title="Rotate" />

## Resultado
Se puede observar una imagen, la cual representa la implementación en 3D de la tierra y la luna con un fondo de estrellas, la cual simula la respectiva rotación.<br>
<img src="https://imgur.com/eW3Ipti.png" title="Resultado" />

{{<details title="CODE" open=false >}}

```js
Code Earth and Moon
<!DOCTYPE html>
<html lang="en">

<head>
     <title>Tierra y Luna</title>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
</head>

<body>

     <script>

          function preload() {
               textura_tierra = loadImage('https://i.ibb.co/PD4LyP5/planeta.jpg');
               textura_luna = loadImage('https://i.ibb.co/WPvVybx/luna.jpg');
               textura_fondo_estrellas = loadImage("https://i.ibb.co/NNTFKmL/nocheHD.jpg")
          }

          function setup() {
               createCanvas(800, 450, WEBGL);
          }

          function draw() {
               background("black")
               
               noStroke() //No dibujar la malla de las esferas
               
               texture(textura_fondo_estrellas)
               sphere(800)

               for (let i = 0; i < 3; i++) {
                    directionalLight(
                         255, 255, 255 - i * 25,//Color
                         -1, 1, -1 //Dirección
                    );
               }

               orbitControl() //Controlar con el mouse la cámara

               rotateZ(-0.3) //Inclinación de la tierra

               push()
               rotateY(frameCount * 0.01); //rotación de la tierra sobre su propio eje
               texture(textura_tierra); 
               sphere(100);
               pop()

               push()
               rotateY(-frameCount * 0.05 / 10);//Traslación de la luna alrededor de la tierra
               translate(0, 0, 170)//Distancia del centro de la luna al centro de la tierra
               rotateY(-frameCount * 0.05);//Rotación de la luna sobre su propio eje
               texture(textura_luna);
               sphere(25);
               pop()
          }

     </script>

</body>

</html>


```

{{</details>}}
{{< p5-global-iframe id="breath" width="700" height="450" >}}

Code Earth and Moon
<!DOCTYPE html>
<html lang="en">

<head>
     <title>Tierra y Luna</title>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
</head>

<body>

     <script>

          function preload() {
               textura_tierra = loadImage('https://i.ibb.co/PD4LyP5/planeta.jpg');
               textura_luna = loadImage('https://i.ibb.co/WPvVybx/luna.jpg');
               textura_fondo_estrellas = loadImage("https://i.ibb.co/NNTFKmL/nocheHD.jpg")
          }

          function setup() {
               createCanvas(800, 450, WEBGL);
          }

          function draw() {
               background("black")
               
               noStroke() //No dibujar la malla de las esferas
               
               texture(textura_fondo_estrellas)
               sphere(800)

               for (let i = 0; i < 3; i++) {
                    directionalLight(
                         255, 255, 255 - i * 25,//Color
                         -1, 1, -1 //Dirección
                    );
               }

               orbitControl() //Controlar con el mouse la cámara

               rotateZ(-0.3) //Inclinación de la tierra

               push()
               rotateY(frameCount * 0.01); //rotación de la tierra sobre su propio eje
               texture(textura_tierra); 
               sphere(100);
               pop()

               push()
               rotateY(-frameCount * 0.05 / 10);//Traslación de la luna alrededor de la tierra
               translate(0, 0, 170)//Distancia del centro de la luna al centro de la tierra
               rotateY(-frameCount * 0.05);//Rotación de la luna sobre su propio eje
               texture(textura_luna);
               sphere(25);
               pop()
          }

     </script>

</body>

</html>


{{< /p5-global-iframe >}}


## Image Kernel
En el procesamiento de imágenes, un núcleo, una matriz de convolución o una máscara es una matriz pequeña que se utiliza para desenfocar, agudizar, grabar, detectar bordes y más. Esto se logra haciendo una convolución entre el kernel y una imagen.
### Convolution : 
La convolución es el proceso de agregar cada elemento de la imagen a sus vecinos locales, ponderados por el kernel. Esto está relacionado con una forma de convolución matemática. La operación de matriz que se está realizando, la convolución, no es una multiplicación de matriz tradicional, a pesar de que se indica de manera similar con *.

Por ejemplo, si tenemos dos matrices de tres por tres, la primera es un kernel y la segunda una pieza de imagen, la convolución es el proceso de invertir tanto las filas como las columnas del kernel y multiplicar localmente entradas y sumas similares. El elemento en las coordenadas [2, 2] (es decir, el elemento central) de la imagen resultante sería una combinación ponderada de todas las entradas de la matriz de la imagen, con pesos dados por el kernel:


<a href="https://commons.wikimedia.org/wiki/File:Moon_Earth_Comparison.png"><img src="https://commons.wikimedia.org/wiki/File:Moon_Earth_Comparison.png" title="source: From Wikimedia Commons, the free media repository" /></a>

## Código y su Solución:
{{<details title="CODE" open=false >}}

```js
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

```

{{</details>}}

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

## Código y su Solución:
{{<details title="CODE" open=false >}}

```js
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


```

{{</details>}}
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