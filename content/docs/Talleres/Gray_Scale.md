# Implemente otras herramientas de brillo de color , como el valor V de HSV , la luminosidad L de HSL o el promedio de componentes .
# Conversión a escala de grises
El primer método, y más intuitivo, es convertir la imagen a escala de grises sacando el promedio aritmético de los valores RGB.

<a href="https://imgur.com/VufHWev"><img src="https://i.imgur.com/VufHWev.png" title="source: imgur.com" /></a>


El segundo método es calculando la variable luma. Para eso se utiliza la siguiente ecuación:

<a href="https://imgur.com/1cXvnyg"><img src="https://i.imgur.com/1cXvnyg.png" title="source: imgur.com" /></a>


Convertir imagen a gris usando  Average 

{{<details title="CODE" open=false >}}

```js
    let img;

    function preload() {

        img = loadImage('https://i.imgur.com/SE4gXmS.jpg');
    }

    function setup() {
    createCanvas(720, 560);
    noLoop();
    }

    function draw() {
    img.loadPixels();
    for (let y=0; y<img.height; y++) {
        for (let x=0; x<img.width; x++) {
        let px = img.get(x, y);   // get pixel value
        let r = px[0];      
        let g = px[1];   
        let b = px[2];  
        let avg = (r+g+b)/3;          
        img.set(x, y, color(avg));  // set pixel to this value
        }
    }
    img.updatePixels();
    image(img, 0,0, 720,560);

    }


```

{{</details>}}

{{< p5-global-iframe id="breath" width="750" height="400" >}}
    let img;

    function preload() {

        img = loadImage('https://i.imgur.com/SE4gXmS.jpg');
    }

    function setup() {
    createCanvas(720, 560);
    noLoop();
    }

    function draw() {
    img.loadPixels();
    for (let y=0; y<img.height; y++) {
        for (let x=0; x<img.width; x++) {
        let px = img.get(x, y);   // get pixel value
        let r = px[0];      
        let g = px[1];   
        let b = px[2];  
        let avg = (r+g+b)/3;          
        img.set(x, y, color(avg));  // set pixel to this value
        }
    }
    img.updatePixels();
    image(img, 0,0, 720,560);

    }


{{< /p5-global-iframe >}}


## Convertir imagen a gris usando  Luminance 
Una alternativa perceptualmente más relevante es usar luma , Y′ , como una dimensión de luminosidad. Luma es el promedio ponderado de R , G y B con corrección de gamma , en función de su contribución a la luminosidad percibida, utilizada durante mucho tiempo como la dimensión monocromática en la transmisión de televisión en color

{{<details title="CODE" open=false >}}

```js
    let img;

    function preload() {
        img = loadImage('https://i.imgur.com/SE4gXmS.jpg');
    }

    function setup() {
    createCanvas(720, 560);
    noLoop();
    }

    function draw() {
    img.loadPixels();
    for (let y=0; y<img.height; y++) {
        for (let x=0; x<img.width; x++) {
        let px = img.get(x, y);   // get pixel value
        let r = px[0];      
        let g = px[1];   
        let b = px[2];  
        let luminence = r * 0.2126 + g * 0.7152 + b * 0.0722
        img.set(x, y, color(luminence));  // set pixel to this value
        }
    }
    img.updatePixels();
    image(img, 0,0, 720,560);
    }


```

{{</details>}}
{{< p5-global-iframe id="breath" width="750" height="400" >}}

    let img;

    function preload() {
        img = loadImage('https://i.imgur.com/SE4gXmS.jpg');
    }

    function setup() {
    createCanvas(720, 560);
    noLoop();
    }

    function draw() {
    img.loadPixels();
    for (let y=0; y<img.height; y++) {
        for (let x=0; x<img.width; x++) {
        let px = img.get(x, y);   // get pixel value
        let r = px[0];      
        let g = px[1];   
        let b = px[2];  
        let luminence = r * 0.2126 + g * 0.7152 + b * 0.0722
        img.set(x, y, color(luminence));  // set pixel to this value
        }
    }
    img.updatePixels();
    image(img, 0,0, 720,560);
    }

{{< /p5-global-iframe >}}

# conclusiones 
* Convertir la imagen a escala de grises usando el promedio de los valores RGB es una solución rápida al problema y análisis de escala de grises de la imagen, por otro lado se puede observar una perdida en la calidad de la imagen 
* En este caso al usar Luma se nota una mejora respecto a la calidad de la imagen en comparacion con la formula de promedio como la que se uso en el otro metodo 
# Bibliografia
* (S/f). Codepen.io. Recuperado el 14 de noviembre de 2022, de https://codepen.io/duketeam/pen/rMxNdB
* Conversión a escala de grises. (s/f). Github.Io. Recuperado el 14 de noviembre de 2022, de https://nigogumolvilada.github.io/grayscale
* Wikipedia contributors. (2022, octubre 13). HSL and HSV. Wikipedia, The Free Encyclopedia. https://en.wikipedia.org/w/index.php?title=HSL_and_HSV&oldid=1115874918

{{< p5-global-iframe id="breath" width="720" height="450" >}}
<!DOCTYPE html>
<html lang="en">
  <head>
    
    <script src="p5.js"></script>
    <script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />

  </head>
  <body>

    <script>

        let lumaShader;
        let img;
        let grey_scale;

        function preload() {
        lumaShader = readShader('`/RGB/docs/Talleres/luma.frag',
                                { varyings: Tree.texcoords2 });
        // image source: https://t.ly/Dz8W
        img = loadImage('RGB/docs/Talleres/fuego.jpg');
        }

        function setup() {
        createCanvas(700, 500, WEBGL);
        noStroke();
        textureMode(NORMAL);
        shader(lumaShader);
        grey_scale = createCheckbox('luma', false);
        grey_scale.position(10, 10);
        grey_scale.style('color', 'white');
        grey_scale.input(() => lumaShader.setUniform('grey_scale',
                                                        grey_scale.checked()));
        lumaShader.setUniform('texture', img);
        }

        function draw() {
        background(0);
        quad(-width / 2, -height / 2, width / 2, -height / 2,
                width / 2, height / 2, -width / 2, height / 2);
        }

    </script>
  </body>
</html>



{{< /p5-global-iframe >}}