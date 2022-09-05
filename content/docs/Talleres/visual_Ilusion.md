# Tallere 2 : Visual Illusions
## Problem statement
Identify, implement, and discuss possible applications of some known optical illussions on the design and development of computer graphics.

## Máscaras de convolución 
### Explicación visual : 


<a href="https://imgur.com/cH0Iyea"><img src="https://i.imgur.com/cH0Iyea.gif" title="source: imgur.com" /></a>

In mathematics (in particular, functional analysis), convolution is a mathematical operation on two functions (f and g) that produces a third function (f * g) that expresses how the shape of one is modified by the other. The term convolution refers to both the result function and to the process of computing it. It is defined as the integral of the product of the two functions after one is reflected about the y-axis and shifted. The choice of which function is reflected and shifted before the integral does not change the integral result (see commutativity). The integral is evaluated for all values of shift, producing the convolution function.

### Example
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
  for(let i = 0;i<width/len;i++){
    fill("white");
    if(i%2 == 0)
    rect(i*len,height,len,-height);
  }
}

{{< /p5-global-iframe >}}


## Image Kernel
In image processing, a kernel, convolution matrix, or mask is a small matrix used for blurring, sharpening, embossing, edge detection, and more. This is accomplished by doing a convolution between the kernel and an image.
### Convolution : 
Convolution is the process of adding each element of the image to its local neighbors, weighted by the kernel. This is related to a form of mathematical convolution. The matrix operation being performed—convolution—is not traditional matrix multiplication, despite being similarly denoted by *.

For example, if we have two three-by-three matrices, the first a kernel, and the second an image piece, convolution is the process of flipping both the rows and columns of the kernel and multiplying locally similar entries and summing. The element at coordinates [2, 2] (that is, the central element) of the resulting image would be a weighted combination of all the entries of the image matrix, with weights given by the kernel:


<a href="https://imgur.com/WKClpxS"><img src="https://i.imgur.com/WKClpxS.gif" title="source: imgur.com" /></a>

### Example

{{< p5-global-iframe id="breath" width="700" height="450" >}}
let img;
let W;
let H;

let identityKernel = [
    [  0,  0,  0 ],
    [  0,  1,  0 ],
    [  0,  0,  0 ]
  ];


function preload() {
    img = loadImage('/images/test.jpeg');
}

function setup() {
    img.resize(windowWidth, 0);
    createCanvas(img.width, img.height);
    noLoop();

    img = applyFilter(img, identityKernel);
    
  }
  
  
  function draw() {
    image(img, 0,0);
  }
  
  
  function applyFilter(input, kernel) {
    
    // se crea una nueva imagen con las mismas dimensiones en blanco para trabajar con ella
    let output = createImage(input.width, input.height);
    

    // Se empieza en 1 y termina en -1 para evitar acceder a un pixel que no existe 
    // (debido a que se trabaja con los pixeles vecinos)
    input.loadPixels();
    output.loadPixels();
    for (let y=1; y<input.height-1; y++) {
      for (let x=1; x<input.width-1; x++) {
  
        // se establecen las sumas en 0 que usaremos para los valores RGB
        // tanto del mismo pixel como de sus vecinos (ponderados por la matriz)

        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        
        // Se recorren los vecinos
        for (let offsetY=-1; offsetY<=1; offsetY++) {
          for (let offsetX=-1; offsetX<=1; offsetX++) {
            
            // elige un pixel
            let neighborIndex = ((y+offsetY) * input.width + (x+offsetX)) * 4;
            let r = input.pixels[neighborIndex];
            let g = input.pixels[neighborIndex+1];
            let b = input.pixels[neighborIndex+2];
            

            // se aplica la matriz y se añade a la suma teniendo en cuenta el valor de cada offset
            // para poder acceder a los valores de la matriz de convolución.
            sumR += kernel[offsetY+1][offsetX+1] * r;
            sumG += kernel[offsetY+1][offsetX+1] * g;
            sumB += kernel[offsetY+1][offsetX+1] * b;
          }
        }
        
    
        // despues de visitar todos los vecinos
        // se asegura de que los valores estan restringidos en el rango RGB (0-255)
        sumR = constrain(sumR, 0,255);
        sumG = constrain(sumG, 0,255);
        sumB = constrain(sumB, 0,255);
        
        // cambia el pixel de la imagen nueva.
        let index = (y * input.width + x) * 4;
        output.pixels[index] =   sumR;
        output.pixels[index+1] = sumG;
        output.pixels[index+2] = sumB;
        output.pixels[index+3] = 255;
      }
    }
    
    // devuelve la imagen
    output.updatePixels();
    return output;
  }

{{< /p5-global-iframe >}}
