# Tallere 2 : Visual Illusions
## Problem statement
Identify, implement, and discuss possible applications of some known optical illussions on the design and development of computer graphics.

## Máscaras de convolución 
### Explicación visual : 


<a href="https://imgur.com/cH0Iyea"><img src="https://i.imgur.com/cH0Iyea.gif" title="source: imgur.com" /></a>

In mathematics (in particular, functional analysis), convolution is a mathematical operation on two functions (f and g) that produces a third function (f * g) that expresses how the shape of one is modified by the other. The term convolution refers to both the result function and to the process of computing it. It is defined as the integral of the product of the two functions after one is reflected about the y-axis and shifted. The choice of which function is reflected and shifted before the integral does not change the integral result (see commutativity). The integral is evaluated for all values of shift, producing the convolution function.


{{< p5-global-iframe id="breath" width="500" height="450" >}}
var linew = 20;
var lineoffset = 30;
var space = linew + lineoffset;

function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('sketch-div');
    strokeCap(PROJECT);
}

function draw() {
    background(255);

    // lines
    strokeWeight(linew);
    for (let i = 0; i < 1.5 * width / space; i++) {
        if (i % 2 == 0) {
            stroke(255, 0, 0);
        } else {
            stroke(0, 0, 255);
        }

        let xoff = i * space + frameCount % (2 * space);
        line(-width / 2 + xoff,
            height / 4,
            xoff,
            3 * height / 4);
    }

    // hiding blocks
    if (!mouseIsPressed) {
        noStroke();
        fill(255);
        rect(0, 0, width, height / 4);
        rect(0, 3 * height / 4, width, height / 4);
        rect(0, 0, 2 * width / 5, height);
        rect(3 * width / 5, 0, 2 * width / 5, height);
    }
    strokeWeight(1);
    stroke(0);
    noFill();
    rect(2 * width / 5, height / 4, width / 5, height / 2);
}
{{< /p5-global-iframe >}}