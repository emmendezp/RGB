# Implemente otras herramientas de brillo de color , como el valor V de HSV , la luminosidad L de HSL o el promedio de componentes .
# Conversión a escala de grises
El primer método, y más intuitivo, es convertir la imagen a escala de grises sacando el promedio aritmético de los valores RGB.

<img src="https://i.imgur.com/GIPrBj9.png" alt="formula" style="width: 50%;"/>
## Convertir imagen a gris usando  Average 

{{< p5-global-iframe id="breath" width="650" height="650" >}}
    let img;

    function preload() {

        img = loadImage('https://i.ibb.co/PD4LyP5/planeta.jpg');
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


#Bibliografia
* (S/f). Codepen.io. Recuperado el 14 de noviembre de 2022, de https://codepen.io/duketeam/pen/rMxNdB

