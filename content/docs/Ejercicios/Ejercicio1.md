# Ejercicio 1
{{< hint info >}}
**Ejercicio 1**  
Let rgb1 and rgb2 be two rgb colors. What would rgb1 * rgb2 mean?
{{< /hint >}}

#RGB
RGB se refiere a un sistema para representar los colores que se utilizan en la pantalla de un ordenador. RGB es una combinación de rojo, verde y azul. Estos colores pueden combinarse en varias proporciones para obtener cualquier color del espectro visible.

Cada nivel se mide por el rango de números decimales de 0 a 255 (256 niveles para cada color). Por ejemplo, si un color tiene cero azul, será una mezcla de rojo y verde. Esto significa que podemos generar 256 x 256 x 256 = 16.777.216 colores diferentes con este modelo.

<img src="https://miro.medium.com/max/1400/1*ueef5pNNsTIEJoMoPr5tZw.png" alt="Colors RGB" style="width: 50%;"/>

Un formato de color RGB se representa por sus valores de rojo, verde y azul, Ejemplo:
~~~
RGB = (54, 155, 229)  |   54 = Rojo, 155 = Verde and 229 = Azul
~~~

#Multiplicación de colores

La multiplicación de dos colores RGB es una operación puntual. Cada elemento del color se multiplica componente a componente.  

Ejemplo:

~~~
RGB1 = (0, 255, 255)/255 -> (0,1,1) |   Cyan
RGB2 = (255, 0, 255)/255 -> (1,0,1) |   Magneta

RGB1 * RGB2 = R(0*1)+G(1*0)+B(1*1) = (0,0,1)*255 -> (0,0,255)

(0,0,255) | Azul
~~~
<img src="https://imgur.com/2tSAa0P.png" alt="Colors Multiply" style="width: 50%;"/>

## Code (solution) & results

{{< details title="p5-global-iframe markdown" open=false >}}
{{< highlight html >}}
{{</* p5-global-iframe id="breath" width="410" height="450" >}}
let r, g,b,r1, g1, b1 ;

function setup() {
  createCanvas(720, 400);
  // colores aleatorios
  r = random(255);
  g = random(255);
  b = random(255);
  r1 = random(255);
  g1 = random(255);
  b1 = random(255);
}

function draw() {
  blendMode(BLEND)
  
  background("white");
  blendMode(MULTIPLY);
  btn = createButton("Change Color");
  btn.position(30, 80);
  btn.mousePressed(changeColor);
  // dibujar el círculo
  strokeWeight(2);
  stroke(r, g, b);
  fill(r, g, b, 127);
  ellipse(240, 200, 200, 200);
  strokeWeight(2);
  stroke(r1, g1, b1);
  fill(r1, g1, b1, 127);
  ellipse(360, 200, 200, 200);
}

// cuando el usuario hace click
function changeColor() {
  // revisar si el ratón está dentro del círculo
    // escoger nuevos colores aleatorios
    r = random(255);
    g = random(255);
    b = random(255);
    r1 = random(255);
    g1 = random(255);
    b1 = random(255);
  
  }
{{< /p5-global-iframe */>}}
{{< /highlight >}}
{{< /details >}}

{{< p5-global-iframe id="breath" width="410" height="450" >}}
let r, g,b,r1, g1, b1 ;

function setup() {
  createCanvas(720, 400);
  // colores aleatorios
  r = random(255);
  g = random(255);
  b = random(255);
  r1 = random(255);
  g1 = random(255);
  b1 = random(255);
}

function draw() {
  blendMode(BLEND)
  
  background("white");
  blendMode(MULTIPLY);
  btn = createButton("Change Color");
  btn.position(30, 80);
  btn.mousePressed(changeColor);
  // dibujar el círculo
  strokeWeight(2);
  stroke(r, g, b);
  fill(r, g, b, 127);
  ellipse(240, 200, 200, 200);
  strokeWeight(2);
  stroke(r1, g1, b1);
  fill(r1, g1, b1, 127);
  ellipse(360, 200, 200, 200);
}

// cuando el usuario hace click
function changeColor() {
  // revisar si el ratón está dentro del círculo
    // escoger nuevos colores aleatorios
    r = random(255);
    g = random(255);
    b = random(255);
    r1 = random(255);
    g1 = random(255);
    b1 = random(255);
  
  }
{{< /p5-global-iframe >}}
