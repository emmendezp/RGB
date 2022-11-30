# Photomosaic

{{< hint info >}}
**Ejercicio 1**  
1. Implement a mosaic (or/and ascii art) visual application.
{{< /hint >}}


# Background

## Fotomosaico

En el campo de las imágenes y la fotografía, un fotomosaico es una imagen usualmente una fotografía que ha sido dividida en secciones rectangulares (usualmente del mismo tamaño), tal como es compuesto un mosaico tradicional, con la característica de que cada elemento del mosaico es reemplazado por otra fotografía con colores promedios apropiados al elemento de la imagen original. Cuando es vista en detalle, los píxeles individuales se ven como la imagen principal, sin embargo al verla como un todo, es posible apreciar que la imagen está compuesta por cientos de miles de imágenes.

<img src="https://img.unocero.com/2019/07/unocero-photomosaic.jpg" alt="Fotomosaico" style="width: 90%;"/>

## Coherencia espacial

La coherencia espacial hace referencia a una relación de fase definida entre puntos distintos de una sección transversal de un haz luminoso. Para ilustrar este concepto consideremos 2 puntos p1 y p2 que se encuentran en la misma sección transversal del haz (superficie perpendicular a la dirección de propagación), y sean E1(t) y E2(t) los campos eléctricos en ambos puntos. Si la diferencia de fase entre los campos permanece constante en cualquier instante t>0 se dice que entre ambos puntos hay una coherencia espacial perfecta.

En general para un determinado punto P1, los puntos P2, para los cuales se cumple la condición de coherencia espacial, pertenecen a una área limitada en torno a P1 llamada área de coherencia, por lo que se dice que el haz presenta coherencia espacial parcial.

<img src="https://imgur.com/u7Oyl83.png" alt="Fotomosaico" style="width: 90%;"/>

## Idea

En el tipo más avanzado de mosaico fotográfico, la imagen de destino no se reduce, y la coincidencia se realiza comparando cada píxel del rectángulo con el píxel correspondiente de cada imagen de la biblioteca. El rectángulo del objetivo se sustituye por la imagen de la biblioteca que minimiza la diferencia total. Esto requiere muchos más cálculos que el tipo simple, pero los resultados pueden ser mucho mejores, ya que la comparación píxel a píxel puede conservar la resolución de la imagen de destino.

{{< hint info >}}
**¿Cómo crear fotomosaicos?**  
1. Lee las imagenes del dataset, que sustituirán los recuadros de la imagen original.
2. Leer la imagen original y dividirla en recuadros M x N formando el mosaico.
3. Para cada recuadro, encuentra la mejor coincidencia de las imagenes del dataset.
4. Crea el fotomosaico final disponiendo de las imagenes del dataset  seleccionadas.
{{< /hint >}}

## División de la imagen original en partes más pequeñas

<img src="https://media.geeksforgeeks.org/wp-content/uploads/Capture_2-1.jpg" alt="División" style="width: 90%;"/>

## Promediando los valores de los colores
Cada píxel de una imagen tiene un color que puede ser representado por sus valores de rojo, verde y azul. En este caso, se están utilizando imágenes de 8 bits, por lo que cada uno de estos componentes tiene un valor de 8 bits en el rango [0, 255]. Dada una imagen con un total de N píxeles, el promedio RGB se calcula de la siguiente manera:

<img src="https://www.geeksforgeeks.org/wp-content/ql-cache/quicklatex.com-34611203bc6570718be7cb97960bd09b_l3.svg" alt="Promedio colores">


## Eligiendo la mejor imagen para un recuadro

Para el fotomosaico, hay que encontrar una imagen coincidente entre las imágenes del dataset. Para determinar si la imágen coincide con el recuadro seleccionado, utilice los valores RGB medios. La coincidencia más cercana es la imagen con el valor RGB medio más próximo.

<img src="https://www.geeksforgeeks.org/wp-content/ql-cache/quicklatex.com-4bfef269686704233f1e9efbbd7b94f9_l3.svg" alt="eligiendo la mejor imagen">


# Implementación

## Imagen original

<img src="/RGB/sketches/pesebre.png" alt="Pesebre" style="width: 90%;"/>

## Dataset

Los colores de cada imagen se guardan en un archivo TXT, estos serán precargados para puedan ser analizados y obtener su repesentación de color RGB.
<br>
<img src="https://github.com/emmendezp/RGB/blob/ea2c572648c8f8120b18b9c0aabbd6007a344753/content/docs/Talleres/dataset.png" alt="dataset" style="width: 90%;"/>

{{< details title="Fotomosaico por software" open=false >}}
{{< highlight javascript >}}
let picture;
let w_scaled;
let h_scaled;
let availableColors;
let dataset= [];
let loadedImages = [];
const scaleFactor = 6;
const datasetSize =70;

function preload() {
    const location = 'imagen'
    picture = loadImage(location);
    loadStrings('dataset.txt',loadDataset)
    noLoop()
}

function setup() {
    createCanvas(600, 600);
    noLoop();
}

function draw() {
    w_scaled = Math.floor(picture.width / scaleFactor);
    h_scaled = Math.floor(picture.height / scaleFactor);
    picture.resize(w_scaled,h_scaled);
    picture.loadPixels();
    for(let x = 0; x < w_scaled; x++) {
        for(let y = 0; y < h_scaled; y++) {
            const [r, g, b] = picture.get(x, y);
            const index = closestColor(r,g,b);
            const pixelImage = loadedImages[index];
            image(pixelImage,x*scaleFactor, y*scaleFactor);
        }
    }
}
{{< /highlight >}}
{{< /details >}}


## Fotomosaico

{{< p5-global-iframe id="breath" width="600" height="600" >}}
let picture;
let w_scaled;
let h_scaled;
let availableColors;
let dataset= [];
let loadedImages = [];
const scaleFactor = 6;
const datasetSize =70;

function preload() {
    const location = '/RGB/sketches/pesebre.png'
    picture = loadImage(location);
    loadStrings('/RGB/sketches/dataset.txt',loadDataset)
    noLoop()
}

function setup() {
    createCanvas(600, 600);
    noLoop();
}

function draw() {
    w_scaled = Math.floor(picture.width / scaleFactor);
    h_scaled = Math.floor(picture.height / scaleFactor);
    picture.resize(w_scaled,h_scaled);
    picture.loadPixels();
    for(let x = 0; x < w_scaled; x++) {
        for(let y = 0; y < h_scaled; y++) {
            const [r, g, b] = picture.get(x, y);
            const index = closestColor(r,g,b);
            const pixelImage = loadedImages[index];
            image(pixelImage,x*scaleFactor, y*scaleFactor);
        }
    }
}

function closestColor(r,g,b) {
    let minDistance = -1;
    let index;
    for (let i=0; i < datasetSize; ++i) {
        const img_i = dataset[i];
        let distance = dist(r,g,b,img_i[0],img_i[1],img_i[2]);
        if (minDistance == -1 || distance < minDistance) {
            minDistance = distance;
            index = i;
        }
    }
    noLoop();
    return index;
}

function loadDataset(availableColors){
    availableColors.slice(0,datasetSize).map(c => {
        const r = parseInt(c.substring(0,3),10);
        const g = parseInt(c.substring(4,7),10);
        const b = parseInt(c.substring(8,11),10);
        dataset.push([r,g,b]);
        loadImage(`/RGB/docs/Talleres/dataset/${c}`, il => { 
            il.resize(scaleFactor,scaleFactor);
            loadedImages.push(il);
        })
    })
    noLoop();
}

function keyPressed() {
    if (key === "d") {
        image(picture,0,0);
    }
  }


{{< /p5-global-iframe >}}


# Fotomosaico por hardware

{{< details title="Fotomosaico por hardware" open=false >}}
{{< highlight javascript >}}
let mosaic;
let symbol1;
let myImage;
let debug;
let slider;
const WIDTH_PIXEL = 64;
const HEIGHT_PIXEL = 64;
const NUM_IMAGES = 99;
function preload() {
  myImage = loadImage("*****.jpeg");
  symbol1 = loadImage("*****.png");
  mosaic = readShader('***.frag',
                      { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  slider = createSlider(1, 6, 2,1);
  slider.position(50, 560);
  slider.style('width', '100px');
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  mosaic.setUniform("image", myImage);
  mosaic.setUniform("WIDTH_PIXEL", WIDTH_PIXEL);
  mosaic.setUniform("NUM_IMAGES", NUM_IMAGES);
  mosaic.setUniform("HEIGHT_PIXEL", HEIGHT_PIXEL);
  debug = true;
  mosaic.setUniform("debug", debug);
  let img = symbol1;
  mosaic.setUniform("symbol1", img);
}

function draw() {
  mosaic.setUniform("resolution", Math.pow(10,slider.value()));

  background(33);
  cover(true);
}

function cover(texture = false) {
  beginShape();
  if (texture) {
    //texture(img);
    vertex(-width / 2, -height / 2, 0, 0, 0);
    vertex(width / 2, -height / 2, 0, 1, 0);
    vertex(width / 2, height / 2, 0, 1, 1);
    vertex(-width / 2, height / 2, 0, 0, 1);
  } else {
    vertex(-width / 2, -height / 2, 0);
    vertex(width / 2, -height / 2, 0);
    vertex(width / 2, height / 2, 0);
    vertex(-width / 2, height / 2, 0);
  }
  endShape(CLOSE);
}

{{< /highlight >}}
{{< /details >}}
{{< details title="Fotomosaico por hardware .frag" open=false >}}
{{< highlight javascript >}}
precision mediump float;
uniform sampler2D image;
uniform sampler2D symbol1;
uniform bool debug;
uniform float resolution;
uniform float NUM_IMAGES;
uniform float WIDTH_PIXEL;
uniform float HEIGHT_PIXEL;
varying vec2 vTexCoord;
varying vec4 vVertexColor;

float module( float x , float y ){
    float flt_res = x-(y*(floor(x/y)));
    return flt_res;
}

void main() {
    vec2 symbolCoord=vTexCoord*resolution;
    vec2 imageCoord=floor(symbolCoord);
    symbolCoord=symbolCoord-imageCoord;
    imageCoord=imageCoord*vec2(1.0)/vec2(resolution);
    vec4 col=texture2D(image,imageCoord);
    float brightness = dot(col.xyz, vec3(0.2126, 0.7152, 0.0722));
    float temp=brightness*(NUM_IMAGES);
    float level=floor(temp);
    float scalingfactor = 1.0/NUM_IMAGES;
    float y0=0.0;
    float x0= module(level,NUM_IMAGES)*scalingfactor;
    vec2 myCoord=(symbolCoord*vec2(1.0)/vec2(NUM_IMAGES,1))+vec2(x0,y0);
    vec4 finalColor=texture2D(symbol1,myCoord);
    gl_FragColor = debug?finalColor:col;
}
{{< /highlight >}}
{{< /details >}}

{{< p5-global-iframe id="breath" width="600" height="600" >}}
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.js"></script>
    <script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />

  </head>
  <body>
    <main>
    </main>
    <script src="/RGB/docs/Talleres/mosaic.js"></script>
  </body>
</html>
{{< /p5-global-iframe >}}


# Conclusiones
* El procesamiento de imágenes es una rama importante que puede demandar mucha potencia de computación. sin embargo, el uso de procesamiento por hardware mejora el rendimiento considerablemente frente a la implementación de software.

* El enfoque de la coherencia espacial permite obtener una representación de una imagen o fotograma a menor resolución para su posterior procesamiento.

# Bibliografía:
* Artensoft. Archives of sample photos for photomosaic -Archive with christmas images. Recuperado el 12 de noviembre de 2022, de https://www.artensoft.com/ArtensoftPhotoMosaicWizard/photobases.php 

* geeksforgeeks. Implementing Photomosaics by Subhajit Saha.. Recuperado el 12 de noviembre de 2022, de https://www.geeksforgeeks.org/implementing-photomosaics/

* Github. Photo mosaic, SuperIRis . Recuperado el 12 de noviembre de 2022, de https://github.com/SuperIRis/photomosaic 

* DEV. Convert images to mosaics in p5.js, &y H. Golang. Recuperado el 12 de noviembre de 2022, de https://dev.to/andyhaskell/convert-images-to-mosaics-in-p5js-2dlc 


