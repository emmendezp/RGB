# Taller 2 :  3D Webgl Application
## Planteamiento del problema 
Implementación de  una aplicación webgl 3d. a través de la utilización de p5.treegl o otra librería.

## Main spaces  
## Sistema Tierra-Luna : 

<a href="https://commons.wikimedia.org/wiki/File:Moon_Earth_Comparison.png"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Moon_Earth_Comparison.png" title="source: From Wikimedia Commons, the free media repository" /></a>

La luna es para él planeta tierra eje fundamental de estaciones y mareas pero como sé formo está Los científicos creen que un objeto del tamaño de Marte colisionó con la Tierra hace 4.500 millones de años. La fuerza de esta colisión fue tan impresionante que desprendió materiales de la Tierra y del objeto con el que colisionó y los envió hacia el espacio. Parte de estos escombros se juntó para formar la Luna.

La Luna no solo se formó principalmente con materiales de la Tierra, sino que probablemente una gran cantidad de escombros de la Tierra aterrizaron en la Luna en el período posterior a su formación. Podría haber más indicios sobre la composición de la Tierra primordial ocultos entre las capas de polvo lunar.

Sin la gravedad de la Luna, la Tierra se tambalearía más violentamente sobre su eje, alterando así drásticamente el clima. Además de mantener la estabilidad del clima, la Luna marca el ritmo de la Tierra (las subidas y las bajadas de las mareas), lo que afecta la variedad de maneras en que usamos el océano para alimentarnos, viajar y recrearnos.

El modelado 3D consiste en utilizar software para crear una representación matemática de un objeto o forma tridimensional. El objeto creado se denomina modelo 3D y se utiliza en distintas industrias. Se puede visualizar como una imagen bidimensional mediante un proceso llamado renderizado 3D o utilizar en una simulación por computadora de fenómenos físicos.

## Herramientas a utilizar:

Uno de los dos modos de renderizado en p5.js: P2D (renderizador predeterminado) y WEBGL Habilita el renderizado 3D introduciendo la tercera dimensión: Z. Ambos modos de representación utilizan el elemento de lienzo html; sin embargo, al habilitar el "contexto" WEBGL en el lienzo, ahora podemos dibujar tanto en 2D como en 3D. 

## WEBGL (Web Graphics Library)

Es una especificación estándar que define una API implementada en JavaScript para la renderización de gráficos en 3D dentro de cualquier navegador web. No precisa del uso de plug-ins adicionales en cualquier plataforma que soporte OpenGL 2.0 u OpenGL ES 2.0. WebGL está integrada completamente en todos los estándares web del navegador, permitiendo la aceleración hardware (física) de la GPU y el procesamiento de imágenes y efectos como parte del lienzo o "canvas" de la página web. Los elementos de WebGL se pueden combinar con otros elementos HTML y estar compuestos con otras partes de la página o del fondo (background) de la página.

sintaxis WEBGL:<br>
<a href=#><img src="https://imgur.com/2KlDlVU.png" title="source: From imgur" /></a>

## Sistema de coordenadas 3D

La coordenada cartesiana 0,0 (x,y) se encuentra en la esquina superior izquierda del lienzo de dibujo. En el modo WEBGL introducimos una tercera dimensión: Z. La dimensión z es el eje que apunta hacia usted desde la pantalla. 

<a href="https://commons.wikimedia.org/wiki/File:3D_coordinate_system.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/3D_coordinate_system.svg" title="source: From Wikimedia Commons, the free media repository" /></a>

<a href="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Euler2.gif/300px-Euler2.gif"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Euler2.gif/300px-Euler2.gif" title="source: From Wikimedia Commons, the free media repository" /></a>


## Código y Resultado:

### Inicialización del script<br>
<img src="https://imgur.com/21UNy3u.png" title="Inicialización del script" />

### Función Preload
Nos permite cargar nuestras imágenes a utilizar, como sé observa en las líneas de código son especificas que imagenes utiliza nuestro proyecto.<br>
<img src="https://imgur.com/IPEeysZ.png" title="Función Preload" />

### Create Canvas
la cual en estas líneas está representada la luz con él respectivo eje de rotación permitiendo una visualización de sombra que sé ve reflejada en él planeta tierra.<br>
<img src="https://imgur.com/YRqWe2N.png" title="Create Canvas" />

### Rotate
Esta función nos permite utilizar la rotación y dar una perspectiva de movimiento donde la tierra gira en su propio eje y la luna alrededor de la tierra, aun así la luna gira gira en su propio eje, no obstante cabe aclarar que utilizamos push y pop como funciones.<br>
<img src="https://imgur.com/mutxY4g.png" title="Rotate" />

## Resultado
Se puede observar una imagen, la cual representa la implementación en 3D de la tierra y la luna con un fondo de estrellas, la cual simula la respectiva rotación.<br>
<img src="https://imgur.com/eW3Ipti.png" title="Resultado" />

{{<details title="CODE" open=false >}}

```js
Code Earth and Moon
<!DOCTYPE html>
<html lang="en">

<head>
     <title>Tierra y Luna</title>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
</head>

<body>

     <script>

          function preload() {
               textura_tierra = loadImage('https://i.ibb.co/PD4LyP5/planeta.jpg');
               textura_luna = loadImage('https://i.ibb.co/WPvVybx/luna.jpg');
               textura_fondo_estrellas = loadImage("https://i.ibb.co/NNTFKmL/nocheHD.jpg")
          }

          function setup() {
               createCanvas(800, 450, WEBGL);
          }

          function draw() {
               background("black")
               
               noStroke() //No dibujar la malla de las esferas
               
               texture(textura_fondo_estrellas)
               sphere(800)

               for (let i = 0; i < 3; i++) {
                    directionalLight(
                         255, 255, 255 - i * 25,//Color
                         -1, 1, -1 //Dirección
                    );
               }

               orbitControl() //Controlar con el mouse la cámara

               rotateZ(-0.3) //Inclinación de la tierra

               push()
               rotateY(frameCount * 0.01); //rotación de la tierra sobre su propio eje
               texture(textura_tierra); 
               sphere(100);
               pop()

               push()
               rotateY(-frameCount * 0.05 / 10);//Traslación de la luna alrededor de la tierra
               translate(0, 0, 170)//Distancia del centro de la luna al centro de la tierra
               rotateY(-frameCount * 0.05);//Rotación de la luna sobre su propio eje
               texture(textura_luna);
               sphere(25);
               pop()
          }

     </script>

</body>

</html>


```

{{</details>}}
{{< p5-global-iframe id="breath" width="750" height="550" >}}

Code Earth and Moon
<!DOCTYPE html>
<html lang="en">

<head>
     <title>Tierra y Luna</title>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
</head>

<body>

     <script>

          function preload() {
               textura_tierra = loadImage('https://i.ibb.co/PD4LyP5/planeta.jpg');
               textura_luna = loadImage('https://i.ibb.co/WPvVybx/luna.jpg');
               textura_fondo_estrellas = loadImage("https://i.ibb.co/NNTFKmL/nocheHD.jpg")
          }

          function setup() {
               createCanvas(800, 450, WEBGL);
          }

          function draw() {
               background("black")
               
               noStroke() //No dibujar la malla de las esferas
               
               texture(textura_fondo_estrellas)
               sphere(800)

               for (let i = 0; i < 3; i++) {
                    directionalLight(
                         255, 255, 255 - i * 25,//Color
                         -1, 1, -1 //Dirección
                    );
               }

               orbitControl() //Controlar con el mouse la cámara

               rotateZ(-0.3) //Inclinación de la tierra

               push()
               rotateY(frameCount * 0.01); //rotación de la tierra sobre su propio eje
               texture(textura_tierra); 
               sphere(100);
               pop()

               push()
               rotateY(-frameCount * 0.05 / 10);//Traslación de la luna alrededor de la tierra
               translate(0, 0, 170)//Distancia del centro de la luna al centro de la tierra
               rotateY(-frameCount * 0.05);//Rotación de la luna sobre su propio eje
               texture(textura_luna);
               sphere(25);
               pop()
          }

     </script>

</body>

</html>


{{< /p5-global-iframe >}}


## Aplicaciones
Está herramienta desarrollada permite aplicaciones en él ambito escolar y científico dando una imagen más clara de cómo es él comportamiento de nuestro satélite.

De manera general el modelado 3D tiene funciones que van más allá del diseño de una figura de acción para una película de animación. Con esta técnica también se ha beneficiado el campo de la medicina, representando modelos tridimensionales de la anatomía humana.

## Conclusiones y trabajo a futuro
WebGL es una tecnología diseñada para trabajar directamente con la GPU  y puede resultar demasiado tedioso y difícil de usar directamente sin algunas librerías de utilidad, La carga de escenas gráficas y objetos 3D en los formatos convencionales también es tedioso por lo que se han creado las bibliotecas JavaScript o algunas importadas a WebGL, para aportar esta funcionalidad adicional.

# Bibliografía

* [Getting started with WebGL in p5 · processing/p5.js Wiki. (n.d.). GitHub. Retrieved October 12, 2022, from ](https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5) por Processing Foundation
* [Centro de vuelo espacial Goddard de la NASA (Goddard Space Flight Center, & inglés), E. (2019, febrero 25). 10 Cosas: Lo que aprendemos sobre la Tierra estudiando la Luna. NASA Solar System Exploration. ](https://solarsystem.nasa.gov/news/959/10-cosas-lo-que-aprendemos-sobre-la-tierra-estudiando-la-luna/), Por Isabelle Yan
* [P5.Js web editor. (s/f). P5js.org. Recuperado el 10 de octubre de 2022, de](https://editor.p5js.org
), Por P5.js Org
* [P3D. Processing. Recuperado el 12 de octubre de 2022, de ](https://processing.org/tutorials/p3d), Por Shiffman, D.