# Tallere 2 : Visual Illusions
## Problem statement
Identify, implement, and discuss possible applications of some known optical illussions on the design and development of computer graphics.

## Máscaras de convolución 
### Explicación visual : 


<a href="https://imgur.com/cH0Iyea"><img src="https://i.imgur.com/cH0Iyea.gif" title="source: imgur.com" /></a>

In mathematics (in particular, functional analysis), convolution is a mathematical operation on two functions (f and g) that produces a third function (f * g) that expresses how the shape of one is modified by the other. The term convolution refers to both the result function and to the process of computing it. It is defined as the integral of the product of the two functions after one is reflected about the y-axis and shifted. The choice of which function is reflected and shifted before the integral does not change the integral result (see commutativity). The integral is evaluated for all values of shift, producing the convolution function.


{{< p5-global-iframe id="breath" width="500" height="450" >}}
var start, speed;
var color_1, color_2, color_3;

function setup() {
  createCanvas(400, 400);
  start = 0;
  // Slider that controls the truning speed.
  slider = createSlider(0, 120, 20);
  slider.position(10, 10);
  slider.style('width', '80px');
  // Color pickers for the three sections.
  color_1 = createColorPicker('red');
  color_1.position(width + 5, 5);
  color_2 = createColorPicker('green');
  color_2.position(width + 5, 35);
  color_3 = createColorPicker('blue');
  color_3.position(width + 5, 65);
}

function draw() {
  background(220);
  speed = slider.value();
  // Draw the three circular sections.
  fill(color_1.color());
  arc(200, 200, 100, 100, start, start + 2*PI/3);
  fill(color_2.color());
  arc(200, 200, 100, 100, start + 2*PI/3, start + 4*PI/3);
  fill(color_3.color());
  arc(200, 200, 100, 100, start + 4*PI/3, start);
  // Update the start point to turn in the next frame.
  start += speed*PI/180;
}
{{< /p5-global-iframe >}}