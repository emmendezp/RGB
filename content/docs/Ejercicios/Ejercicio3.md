# Ejercicio 3

{{< hint info >}}
**Ejercicio 3**  
Research some dither visual apps.
{{< /hint >}}
# Dithering

![Dithering](https://149695847.v2.pressablecdn.com/wp-content/uploads/2021/12/image-66.png "Reducción de la profundidad de color de una imagen.")

Es una técnica usada en computación gráfica para crear la ilusión de profundidad de color en imágenes con una paleta de colores limitada. En una imagen tramada, los colores no disponibles en la paleta se aproximan por una difusión de píxeles de color dentro de la gama de colores disponibles. El ojo humano percibe la difusión como una mezcla de los colores dentro de ésta. El tramado es análoga a la técnica denominada semitonos utilizada en impresión. Las imágenes tramadas, en particular las que tienen relativamente pocos colores, a menudo se distinguen por un grado de granulosidad característico o por un aspecto moteado.

![Dithering](https://proyectoidis.org/wp-content/uploads/2015/07/dithering.gif "Reducción de la profundidad de los colores.")

La reducción de la profundidad de color de una imagen a menudo puede tener importantes efectos secundarios visuales. Si la imagen original es una fotografía, es probable que tenga miles o incluso millones de distintos colores. El proceso de limitar los colores disponibles a una paleta de colores específica efectivamente quita una cierta cantidad de información de color.

## Random dither

El Random dither puede considerarse como el proceso de convertir una imagen en escala de grises en una imagen en blanco y negro o monocromática. La razón de ser aleatoria es que el proceso funciona eligiendo al azar los valores de los píxeles de la imagen. Si el valor del píxel es mayor que el valor aleatorio del píxel, entonces se convierte en blanco, y si no, el lugar de la imagen se convierte en negro.

![Dithering](https://149695847.v2.pressablecdn.com/wp-content/uploads/2021/12/image-68.png "Imagen original")
![Dithering](https://149695847.v2.pressablecdn.com/wp-content/uploads/2021/12/image-69.png "Random dithering")

## Ordered Dithering

Este tipo de proceso de dithering también se utiliza para la conversión de imágenes en color en monocromo. Pero este proceso funciona eligiendo un patrón diferente de la imagen dependiendo del color que se presente en el área de trabajo de la imagen. La siguiente imagen es la representación de este tipo de dithering.

![Dithering](https://149695847.v2.pressablecdn.com/wp-content/uploads/2021/12/image-72.png "Imagen original")
![Dithering](https://149695847.v2.pressablecdn.com/wp-content/uploads/2021/12/image-73.png "Ordered  Dithering")

# Aplicaciones

* La visualización de gráficos con precisión es una de las aplicaciones más comunes del dithering. Por ejemplo, podemos mostrar una imagen que contenga millones de colores en un hardware capaz de mostrar 256 colores a la vez utilizando el dithering.

* El GIF puede considerarse como un vídeo de pequeño tamaño en el que las imágenes se encadenan para mostrar la variación en el cuadro. El Dithering resulta muy útil en la creación de gifs porque ayuda a reducir el tamaño de la imagen, lo que proporciona una velocidad adecuada a la variedad de imágenes en el marco y también es útil para gestionar la calidad de la imagen.

{{< /p5-global-iframe >}}
{{< details title="terrain visualization 2" open=false >}}
{{< highlight javascript >}}
// Modificado de https://editor.p5js.org/codingtrain/sketches

let kitten;

function preload() {
  kitten = loadImage("imagen");
}

function setup() {
  createCanvas(1024, 512);

  image(kitten, 0, 0);
  makeDithered(kitten, 1);
  image(kitten, 512, 0);
  // Apply gray filter to the whole canvas
  filter(GRAY);
}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
  let idx = imageIndex(img, x, y);

  let pix = img.pixels;
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
  return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(img, steps) {
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtindex(img, x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);
      let newR = closestStep(255, steps, oldR);
      let newG = closestStep(255, steps, oldG);
      let newB = closestStep(255, steps, oldB);

      let newClr = color(newR, newG, newB);
      setColorAtIndex(img, x, y, newClr);

      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      distributeError(img, x, y, errR, errG, errB);
    }
  }

  img.updatePixels();
}

function distributeError(img, x, y, errR, errG, errB) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtindex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setColorAtIndex(img, x, y, clr);
}
{{< /highlight >}}
{{< /details >}}

{{< p5-global-iframe id="breath" width="610" height="400" >}}
let kitten;

function preload() {
  kitten = loadImage("https://149695847.v2.pressablecdn.com/wp-content/uploads/2021/12/image-72.png");
}

function setup() {
  createCanvas(1024, 512);

  image(kitten, 0, 0);
  makeDithered(kitten, 1);
  image(kitten, 512, 0);
  // Apply gray filter to the whole canvas
  filter(GRAY);
}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
  let idx = imageIndex(img, x, y);

  let pix = img.pixels;
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
  return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(img, steps) {
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtindex(img, x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);
      let newR = closestStep(255, steps, oldR);
      let newG = closestStep(255, steps, oldG);
      let newB = closestStep(255, steps, oldB);

      let newClr = color(newR, newG, newB);
      setColorAtIndex(img, x, y, newClr);

      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      distributeError(img, x, y, errR, errG, errB);
    }
  }

  img.updatePixels();
}

function distributeError(img, x, y, errR, errG, errB) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtindex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setColorAtIndex(img, x, y, clr);
}
{{< /p5-global-iframe >}}

# Conclusión
El uso de dithering tiene la ventaja de que, tras la primera reducción, la imagen puede mostrarse en su forma de baja calidad. para comprimir la imagen, hasta cierto punto medida es beneficioso en términos de almacenamiento y transmisión, debido a la baja asignación de recursos necesaria para
la imagen. Por último, realizar una compresión sin pérdidas utilizando el Ordered Dithering puede ser
ventajoso en términos de conversión de imágenes en color en monocromo.


# Bibliografía

* [What is Dithering in Image Processing and How it Maintains Image Quality?](https://analyticsindiamag.com/what-is-dithering-in-image-processing-and-how-it-maintains-image-quality/) por Yugesh Verma
* [Dithering](https://proyectoidis.org/dithering/), Por piavivo
* [Image Quantization, Halftoning, and Dithering](https://www.cs.princeton.edu/courses/archive/fall00/cs426/lectures/dither/dither.pdf), Por Thomas Funkhouser, Princeton University