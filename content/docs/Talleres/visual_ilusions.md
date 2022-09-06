# Taller # 1

## Visual illusions workshop

Estudiar, implementar y discutir posibles aplicaciones de algunos fenómenos visuales conocidos e ilusiones ópticas.

## Planteamiento del Problema
Identificar, implementar y discutir posibles aplicaciones de algunas ilusiones ópticas conocidas en el diseño y desarrollo de gráficos por computadora.

## Background
Una ilusión visual es una imagen que engaña al sistema visual, desde el ojo al cerebro, y lo lleva a percibir la realidad de forma distorsionada.
Las ilusiones visuales pueden suceder de manera natural o ser creadas por efectos visuales específicos. Este es el resultado del análisis de la información que se recibe del sistema visual. Este puede hacer que se perciba un objeto que no está presente, dando una imagen distorsionada de la realidad.
Estas se producen cuando se presentan varias formas en una imagen única y nuestro cerebro entra en conflicto.

# Implementación

## Se implementaran algunas ilusiones ópticas como ejemplos 

Frisén’s Lazy Shadow 
Este fenómeno se percibe mejor en condiciones de iluminación algo tenues.
Observe rectángulo brillante giratorio
Observe el "rectángulo de sombra" azul oscuro más grande, que también gira, detrás de él.
Ambos giran con la misma velocidad, pero ¿están completamente alineados? [En el par de pentágonos de muestra a la derecha, solo el par izquierdo está 'alineado'.]
Con el control deslizante puede ajustar la alineación relativa. Debajo del control deslizante, se proporciona el ángulo de alineación, para mí alrededor de -2.5 ° parece alineado.
Una vez que esté satisfecho con la coincidencia, presione ' Detener ' o marque la casilla de verificación ' fondo claro

{{<details title="CODE" open=false >}}

```js
let angulo;
let speed;
let rot;
let stopButton;
let startButton;
let speedSlider;
let rotSlider;
let lightBackground;

function stop() {
    speedSlider.value(0);
}

function start() {
    speedSlider.value(0.05);
}

function preload() {

  img = loadImage("https://cdn-icons-png.flaticon.com/512/748/748113.png"); 
}

function setup() {
  createCanvas(500, 500);
  noStroke();
  startButton = createButton('Start');
  startButton.position(0, 0);
  startButton.size(100, 30);
  startButton.mousePressed(start);
  stopButton = createButton('Stop');
  stopButton.position(0, 35);
  stopButton.size(100, 30);
  stopButton.mousePressed(stop);
  speedSlider = createSlider(0, 0.5, 0.1, 0.01);
  speedSlider.position(0, 85);
  speedSlider.size(100, 30);
  rotSlider = createSlider(-0.1, 0.1, 0, 0.01);
  rotSlider.position(0, 130);
  rotSlider.size(100, 30);
  lightBackground = createCheckbox('Light Background', false);
  lightBackground.position(0, 180);
  lightBackground.style('color', '#fff');
  lightBackground.size(150, 30);
  angulo = 0;
  rectMode(CENTER);
}

function draw() {
  background(0);
  if (lightBackground.checked()) {
    fill("rgb(160,250,174)");
    circle(250, 250, 300);
  } 
  speed = speedSlider.value();
  rot = rotSlider.value();
  angulo = angulo + speed % TWO_PI;
  translate(width / 2, height / 2);
  rotate(angulo);
  fill(0,0,255);
  rect(0, 0, 130, 130);
  rotate(rot);
  fill(255);
  rect(0, 0, 110, 110);
  fill(200,200,200);
  rotate(-angulo-rot);
  text("Speed", -225, -170);
  text("Compensate", -240, -125);
  rotate(PI/4);
  image(img, -3, -3, 6, 6);
}

```

{{</details>}}

{{< p5-global-iframe id="breath" width="500" height="500" >}}

let angulo;
let speed;
let rot;
let stopButton;
let startButton;
let speedSlider;
let rotSlider;
let lightBackground;

function stop() {
    speedSlider.value(0);
}

function start() {
    speedSlider.value(0.05);
}

function preload() {

  img = loadImage("https://cdn-icons-png.flaticon.com/512/748/748113.png"); 
}

function setup() {
  createCanvas(500, 500);
  noStroke();
  startButton = createButton('Start');
  startButton.position(0, 0);
  startButton.size(100, 30);
  startButton.mousePressed(start);
  stopButton = createButton('Stop');
  stopButton.position(0, 35);
  stopButton.size(100, 30);
  stopButton.mousePressed(stop);
  speedSlider = createSlider(0, 0.5, 0.1, 0.01);
  speedSlider.position(0, 85);
  speedSlider.size(100, 30);
  rotSlider = createSlider(-0.1, 0.1, 0, 0.01);
  rotSlider.position(0, 130);
  rotSlider.size(100, 30);
  lightBackground = createCheckbox('Light Background', false);
  lightBackground.position(0, 180);
  lightBackground.style('color', '#fff');
  lightBackground.size(150, 30);
  angulo = 0;
  rectMode(CENTER);
}

function draw() {
  background(0);
  if (lightBackground.checked()) {
    fill("rgb(160,250,174)");
    circle(250, 250, 300);
  } 
  speed = speedSlider.value();
  rot = rotSlider.value();
  angulo = angulo + speed % TWO_PI;
  translate(width / 2, height / 2);
  rotate(angulo);
  fill(0,0,255);
  rect(0, 0, 130, 130);
  rotate(rot);
  fill(255);
  rect(0, 0, 110, 110);
  fill(200,200,200);
  rotate(-angulo-rot);
  text("Speed", -225, -170);
  text("Compensate", -240, -125);
  rotate(PI/4);
  image(img, -3, -3, 6, 6);
}


{{< /p5-global-iframe >}}

# Ilussion #2
## Ilusión de Cascada

La ilusión de cascada, o el efecto secundario del movimiento, es una ilusión de movimiento. Se experimenta después de ver un estímulo que se mueve en una dirección durante algún tiempo y luego mirar una escena estacionaria. La escena estacionaria parece tener movimiento (en la dirección opuesta al estímulo en movimiento que uno vio previamente). Esto se llama la "ilusión de la cascada", ya que se puede experimentar después de observar el movimiento del agua en una cascada y luego prestar atención a una escena estacionaria, estas ilusiones de este tipo se conocían mucho antes del siglo XIX. De hecho, el filósofo griego Aristóteles (384 – 322 a. C.) informó sobre tales ilusiones más de 2000 años antes de Addams: “cuando las personas dejan de mirar objetos en movimiento, por ejemplo, ríos, y especialmente aquellos que fluyen muy rápidamente, descubren que el los estímulos visuales todavía se presentan, porque las cosas que realmente están en reposo se ven luego en movimiento”.

## Código y su respectiva Solución:
{{<details title="CODE" open=false >}}

```js
let angle = 0;
function setup() {
  createCanvas(700, 700);
  strokeWeight(4)
}

function draw() {
  background(50);
  noStroke();
  fill(255,0,0)
  ellipse(width/2, height/2, 10,10)
  
  for(let i = 15; i< 5000; i+=15)
  {
    push()
    translate(width/2,height/2)
    rotate(i+ angle * 2)
    noFill()
    stroke(20 , i * 100, i -100)
    ellipse(0, 0, i + 15 , i )
    
    pop()
    
    angle += 0.0003
  }
  
  
}

```

{{</details>}}


{{< p5-global-iframe id="breath" width="700" height="700" >}}

let angle = 0;
function setup() {
  createCanvas(700, 700);
  strokeWeight(4)
}

function draw() {
  background(50);
  noStroke();
  fill(255,0,0)
  ellipse(width/2, height/2, 10,10)
  
  for(let i = 15; i< 5000; i+=15)
  {
    push()
    translate(width/2,height/2)
    rotate(i+ angle * 2)
    noFill()
    stroke(20 , i * 100, i -100)
    ellipse(0, 0, i + 15 , i )
    
    pop()
    
    angle += 0.0003
  }
  
  
}
{{< /p5-global-iframe >}}

# Ilusion 3

## Stepping Feet: 

Observa el movimiento de los “pies” azules y amarillos. Los pies parecen caminar alternativamente, como pies diminutos haciendo tip-tap-tip-tap… Esto es más pronunciado si no miras directamente a los pies, sino entre ellos.

En realidad su movimiento es siempre simultáneo. Encuentro este fenómeno particularmente lindo. La naturaleza de su movimiento es evidente: se mueven de manera constante y conjunta. Esta ilusión fue demostrada originalmente por Stuart Anstis en 2003. La causa real de esta ilusión todavía se está debatiendo.

## Código y su Solución:

{{<details title="CODE" open=false >}}

```js
let checkbox;

var barsColor;



var start, speedSlider, direction;

const feetHeight = 25, feetWidth = 80;



function setup() {

 createCanvas(700, 300);

 start = 0;

 noStroke();

 // Checkbox to toggle the background.

 checkbox = createCheckbox('background', true);

 checkbox.changed(backgroundCheckbox);

 // Start with the bars being drawn.

 barsColor = color('black');

 direction = 1;

 // Slider for the feet speed.

 speedSlider = createSlider(0, 100, 25);

 speedSlider.position(10, height + 20);

 speedSlider.style('width', '80px');

}



function draw() {

 background(220);

 const number_of_bars = 40;

 // Draw the bars using the color from the checkbox.

 for( var i = 0 ; i < number_of_bars ; i ++ ){

   if( i%2 == 0 ) fill(barsColor);

   else fill('white');

   var x = (width/number_of_bars) * i;

   rect(x, 0, width/number_of_bars, height);

 }

 // Draw the feet.

 fill('yellow');

 rect(start, 100, feetWidth, feetHeight);

 fill('blue');

 rect(start, 200, feetWidth, feetHeight);

 // Update the position of the feet.

 var speed = speedSlider.value() / 100 * 2;

 // Update the direction if necessary.

 if( start + feetWidth + speed * direction > width || start + speed * direction < 0 )

   direction *= -1;

 start += speed * direction;

}



function backgroundCheckbox() {

 // If the chack box is active, draw the black bars.

 if (checkbox.checked()) {

   barsColor = color('black');

 } else {

   barsColor = color('white');

 }

}


```

{{</details>}}
{{< p5-global-iframe id="breath" width="710" height="350" >}}
let checkbox;

var barsColor;



var start, speedSlider, direction;

const feetHeight = 25, feetWidth = 80;



function setup() {

 createCanvas(700, 300);

 start = 0;

 noStroke();

 // Checkbox to toggle the background.

 checkbox = createCheckbox('background', true);

 checkbox.changed(backgroundCheckbox);

 // Start with the bars being drawn.

 barsColor = color('black');

 direction = 1;

 // Slider for the feet speed.

 speedSlider = createSlider(0, 100, 25);

 speedSlider.position(10, height + 20);

 speedSlider.style('width', '80px');

}



function draw() {

 background(220);

 const number_of_bars = 40;

 // Draw the bars using the color from the checkbox.

 for( var i = 0 ; i < number_of_bars ; i ++ ){

   if( i%2 == 0 ) fill(barsColor);

   else fill('white');

   var x = (width/number_of_bars) * i;

   rect(x, 0, width/number_of_bars, height);

 }

 // Draw the feet.

 fill('yellow');

 rect(start, 100, feetWidth, feetHeight);

 fill('blue');

 rect(start, 200, feetWidth, feetHeight);

 // Update the position of the feet.

 var speed = speedSlider.value() / 100 * 2;

 // Update the direction if necessary.

 if( start + feetWidth + speed * direction > width || start + speed * direction < 0 )

   direction *= -1;

 start += speed * direction;

}



function backgroundCheckbox() {

 // If the chack box is active, draw the black bars.

 if (checkbox.checked()) {

   barsColor = color('black');

 } else {

   barsColor = color('white');

 }

}



{{< /p5-global-iframe >}}




# Conclusiones:

* Frisén’s Lazy Shadow el cerebro intenta ajustar  la sombra a la superficie, por lo que se logra obtener la ilusión óptica. para esto la velocidad del ajuste es muy importante,ya que si no es la adecuada, no podemos ajustar la sombra a la superficie y no observamos la ilusión

* Ilusión de Cascada: En conclusión, la cuestión de cómo es someterse a la ilusión de la cascada aún no está resuelta. Podría implicar simplemente experimentar cosas moviéndose en la dirección opuesta al estímulo y cambiando de posición. Podría implicar experimentar cosas que se mueven en la dirección opuesta al estímulo y, sin embargo, no cambiar de posición. O podría implicar algo más complejo. Por ejemplo, podría implicar experimentar cosas que se mueven y cambian de posición fuera del centro del campo visual pero que no se mueven en el centro. O podría implicar experimentar cosas moviéndose y cambiando de posición, pero luego volver a saltar a la posición original antes de cambiar de posición nuevamente.


* Stepping Feet: Anule la selección de la casilla de verificación " Color ". Ahora se vuelve obvio que los bordes del 'pie' claro se fusionan con las barras claras y solo son visibles cuando atraviesan las barras oscuras. Así que la mitad del tiempo realmente no hay señal de movimiento, y la percepción entra por defecto, es decir, no hay movimiento. Para el pie oscuro vale lo mismo, solo que en tiempos alternos.
Con un contraste reducido de la rejilla, la equilibración de los bordes y la rejilla ya no está presente, por lo que el efecto desaparece.
El movimiento “similar a un gusano” para un número impar de barras por pie también se explica automáticamente.

# Bibliografía:
* Waterfall illusion. (s/f). The Illusions Index. Recuperado el 6 de septiembre de 2022, de https://www-illusionsindex-org.translate.goog/ir/waterfall-illusion?_x_tr_sl=auto&_x_tr_tl=es&_x_tr_hl=es-419

* Bach, M. (s/f). “Stepping feet” motion illusion. Michaelbach.de. Recuperado el 6 de septiembre de 2022, de https://michaelbach.de/ot/mot-feetLin/

* Michael's   Visual Phenomena & Optical Illusions. Recuperado el 6 de septiembre de 2022, de 
 https://michaelbach.de/ot/lum-lazyShadow/7


