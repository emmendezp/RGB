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

# Código

{{< details title="Implementation of the Floyd-Steinberg Dithering algorithm" open=false >}}
{{< highlight javascript >}}
// Modificado de https://editor.p5js.org/codingtrain/sketches
let img;
var factor=1; //If it is equal to 1 and there is a gray filter there will be only two colors. 
var wd;
var d;


function preload() {
    img = loadImage('imagen');
}

function setup() {
    let c=createCanvas(img.width,img.height);
    background(255, 255, 255);
    pixelDensity(1);
    image(img,0,0);
    filter(GRAY);  
    wd=img.width;
    loadPixels();
    d = pixelDensity();
    for (let y = 0; y < height-1; y++) {
        for (let x = 1; x < width-1; x++){

            var index = getIndex(x,y);
            
            var r=  pixels[index];
            var g=  pixels[index + 1];
            var b=  pixels[index + 2];
            var a=  pixels[index + 3];

            var newR=find_closest_palette_color(r);
            var newG=find_closest_palette_color(g);
            var newB=find_closest_palette_color(b);
            var newA=  find_closest_palette_color(a);

            pixels[index] = newR;
            pixels[index + 1] = newG;
            pixels[index + 2] = newB;
            pixels[index + 3] = newA;


            //Calculating quantization error of a pixel.
            var quant_error_R=r-newR;
            var quant_error_G=g-newG;
            var quant_error_B=b-newB;
            var quant_error_A=a-newA;

            //
            index = getIndex(x+1,y);
            r=  pixels[index]+(quant_error_R*7/16.0);
            g=  pixels[index + 1]+(quant_error_G*7/16.0);
            b=  pixels[index + 2]+(quant_error_B*7/16.0);
            a=  pixels[index + 3]+(quant_error_A*7/16.0);
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;

            index = getIndex(x-1,y+1);
            r=  pixels[index]+(quant_error_R*3/16.0);
            g=  pixels[index + 1]+(quant_error_G*3/16.0);
            b=  pixels[index + 2]+(quant_error_B*3/16.0);
            a=  pixels[index + 3]+(quant_error_A*3/16.0);
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;

            index = getIndex(x,y+1);
            r=  pixels[index]+(quant_error_R*5/16.0);
            g=  pixels[index + 1]+(quant_error_G*5/16.0);
            b=  pixels[index + 2]+(quant_error_B*5/16.0);
            a=  pixels[index + 3]+(quant_error_A*5/16.0);
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;

            index = getIndex(x+1,y+1);
            r=  pixels[index]+(quant_error_R*1/16.0);
            g=  pixels[index + 1]+(quant_error_G*1/16.0);
            b=  pixels[index + 2]+(quant_error_B*1/16.0);
            a=  pixels[index + 3]+(quant_error_A*1/16.0);
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;
        }
      }
    updatePixels();
}

//Quantization operation. 
function find_closest_palette_color(old){
    return round(factor*old/255)*(255/factor)
}

//Returns the initial index of a pixel located at (x,y). 
function getIndex(x,y){
    return (x+(y*wd))*4;
}
{{< /highlight >}}
{{< /details >}}

## Imagen original
![Dithering](https://raw.githubusercontent.com/ineventhorizon/Floyd-Steinberg-Dithering-Javascript-p5js/master/images/cat.png "Imagen original")


## Dithering
{{< p5-global-iframe id="breath" width="800" height="800" >}}
let img;
var factor=1; //If it is equal to 1 and there is a gray filter there will be only two colors. 
var wd;
var d;


function preload() {
    img = loadImage('https://raw.githubusercontent.com/ineventhorizon/Floyd-Steinberg-Dithering-Javascript-p5js/master/images/cat.png');
}

function setup() {
    let c=createCanvas(img.width,img.height);
    background(255, 255, 255);
    pixelDensity(1);
    image(img,0,0);
    filter(GRAY);  
    wd=img.width;
    loadPixels();
    d = pixelDensity();
    for (let y = 0; y < height-1; y++) {
        for (let x = 1; x < width-1; x++){

            var index = getIndex(x,y);
            
            var r=  pixels[index];
            var g=  pixels[index + 1];
            var b=  pixels[index + 2];
            var a=  pixels[index + 3];

            var newR=find_closest_palette_color(r);
            var newG=find_closest_palette_color(g);
            var newB=find_closest_palette_color(b);
            var newA=  find_closest_palette_color(a);

            pixels[index] = newR;
            pixels[index + 1] = newG;
            pixels[index + 2] = newB;
            pixels[index + 3] = newA;


            //Calculating quantization error of a pixel.
            var quant_error_R=r-newR;
            var quant_error_G=g-newG;
            var quant_error_B=b-newB;
            var quant_error_A=a-newA;

            //
            index = getIndex(x+1,y);
            r=  pixels[index]+(quant_error_R*7/16.0);
            g=  pixels[index + 1]+(quant_error_G*7/16.0);
            b=  pixels[index + 2]+(quant_error_B*7/16.0);
            a=  pixels[index + 3]+(quant_error_A*7/16.0);
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;

            index = getIndex(x-1,y+1);
            r=  pixels[index]+(quant_error_R*3/16.0);
            g=  pixels[index + 1]+(quant_error_G*3/16.0);
            b=  pixels[index + 2]+(quant_error_B*3/16.0);
            a=  pixels[index + 3]+(quant_error_A*3/16.0);
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;

            index = getIndex(x,y+1);
            r=  pixels[index]+(quant_error_R*5/16.0);
            g=  pixels[index + 1]+(quant_error_G*5/16.0);
            b=  pixels[index + 2]+(quant_error_B*5/16.0);
            a=  pixels[index + 3]+(quant_error_A*5/16.0);
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;

            index = getIndex(x+1,y+1);
            r=  pixels[index]+(quant_error_R*1/16.0);
            g=  pixels[index + 1]+(quant_error_G*1/16.0);
            b=  pixels[index + 2]+(quant_error_B*1/16.0);
            a=  pixels[index + 3]+(quant_error_A*1/16.0);
            pixels[index] = r;
            pixels[index + 1] = g;
            pixels[index + 2] = b;
            pixels[index + 3] = a;
        }
      }
    updatePixels();
}

//Quantization operation. 
function find_closest_palette_color(old){
    return round(factor*old/255)*(255/factor)
}

//Returns the initial index of a pixel located at (x,y). 
function getIndex(x,y){
    return (x+(y*wd))*4;
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