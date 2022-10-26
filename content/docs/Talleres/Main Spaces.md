# Taller 2 :  3D Webgl Application
## Planteamiento del problema 
Implementación de  una aplicación webgl 3d. a través de la utilización de p5.treegl o otra librería.

## Main spaces  
## Sistema Tierra-Luna : 

<a href="https://commons.wikimedia.org/wiki/File:Moon_Earth_Comparison.png"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Moon_Earth_Comparison.png" title="source: From Wikimedia Commons, the free media repository" /></a>

La luna es para el planeta tierra eje fundamental de estaciones y mareas, los científicos creen que un objeto del tamaño de Marte colisionó con la Tierra hace 4.500 millones de años. La fuerza de esta colisión fue tan impresionante que desprendió materiales de la Tierra y del objeto con el que colisionó y los envió hacia el espacio. Parte de estos escombros se juntó para formar la Luna.

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
Nos permite cargar nuestras imágenes a utilizar, como se observa en las líneas de código son especificas que imagenes utiliza nuestro proyecto.<br>
<img src="https://imgur.com/IPEeysZ.png" title="Función Preload" />

### Create Canvas
la cual en estas líneas está representada la luz con el respectivo eje de rotación permitiendo una visualización de sombra que se ve reflejada en el planeta tierra.<br>
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
{{< p5-global-iframe id="breath" width="720" height="450" >}}

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


## Proyecto Laberinto

{{<details title="Laberinto" open=false >}}

```js
const TILE_SIZE = 64;
const MAP_NUM_ROWS = 10;
const MAP_NUM_COLS = 16;
const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE;
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;
const MINIMAP_SCALE_FACTOR = 0.2;
// const VISION_ANGLE = 2*Math.PI ;
const VISION_ANGLE = Math.PI / 3;
const RAY_WIDTH = 2; // can be increased for optimization
const NUM_RAYS = WINDOW_WIDTH / RAY_WIDTH;
class Map {
    constructor() {
        this.grid = [
            [1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 1],
            [2, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1]
        ];
        this.width = WINDOW_WIDTH;
        this.height = WINDOW_HEIGHT;
    }
    hasWallAt(x, y) {
        if (x <= 0 || y <= 0 || x > WINDOW_WIDTH || y > WINDOW_HEIGHT) return true;
        var i = Math.floor(x / TILE_SIZE)
        var j = Math.floor(y / TILE_SIZE)
        return this.grid[j][i];
    }

    render() {
        for (var i = 0; i < MAP_NUM_ROWS; i++) {
            for (var j = 0; j < MAP_NUM_COLS; j++) {
                var tileX = j * TILE_SIZE;
                var tileY = i * TILE_SIZE;
                var tileColor = this.grid[i][j] == 0 ? "#fff" : "#000"; // colores minimapa
                stroke("#222");
                fill(tileColor);
                rect(
                    MINIMAP_SCALE_FACTOR * tileX,
                    MINIMAP_SCALE_FACTOR * tileY,
                    MINIMAP_SCALE_FACTOR * TILE_SIZE,
                    MINIMAP_SCALE_FACTOR * TILE_SIZE
                );
            }
        }
    }
}

class Player {
    constructor() {
        this.x = 100;
        this.y = 570;
        this.radius = 4;
        this.turnDirection = 0;      //-1 for left , 1 for right
        this.walkDirection = 0;      //-1 for back , 1 for front
        this.strafeDirection = 0;      //-1 for back , 1 for front
        this.rotationAngle =  -Math.PI / 2;
        this.moveSpeed = 5.0;
        this.rotationSpeed = 3 * (Math.PI / 180)

    }
    update() {
        this.rotationAngle += this.turnDirection * this.rotationSpeed;
        // this.rotationAngle = normalizeAngle(this.rotationAngle)
        var moveStep = this.walkDirection * this.moveSpeed;

        var newPlayerX = this.x + Math.cos(this.rotationAngle) * moveStep;
        var newPlayerY = this.y + Math.sin(this.rotationAngle) * moveStep;

        if (grid.hasWallAt(newPlayerX, newPlayerY) == 0) {
            this.x = newPlayerX;
            this.y = newPlayerY;
            // console.log(this);
        }
        if (this.strafeDirection) {

            var newX = this.x + this.strafeDirection * this.moveSpeed * Math.sin(this.rotationAngle);
            var newY = this.y + this.strafeDirection * this.moveSpeed * Math.cos(this.rotationAngle);
            if (grid.hasWallAt(newX, newY) !== 0) {
                this.x = newX;
                this.y = newY;
            }
        }
    }
    render() {
        noStroke();
        fill("blue");
        circle(
            MINIMAP_SCALE_FACTOR * this.x,
            MINIMAP_SCALE_FACTOR * this.y,
            MINIMAP_SCALE_FACTOR * this.radius
        );
        stroke("blue");
        line(
            MINIMAP_SCALE_FACTOR * this.x,
            MINIMAP_SCALE_FACTOR * this.y,
            MINIMAP_SCALE_FACTOR * (this.x + Math.cos(this.rotationAngle) * 30),
            MINIMAP_SCALE_FACTOR * (this.y + Math.sin(this.rotationAngle) * 30)
        );
    }
}

class Ray {
    constructor(rayAngle) {
        this.rayAngle = normalizeAngle(rayAngle);
        this.wallHitX = 0;
        this.wallHitY = 0;
        this.distance = 0;
        this.wasHitVertical = false;
        this.wallColor = 0;
        this.isRayFacingDown = this.rayAngle > 0 && this.rayAngle < Math.PI;
        this.isRayFacingUp = !this.isRayFacingDown;

        this.isRayFacingRight = this.rayAngle < 0.5 * Math.PI || this.rayAngle > 1.5 * Math.PI;
        this.isRayFacingLeft = !this.isRayFacingRight;
    }
    cast() {
        var xintercept, yintercept;
        var xstep, ystep;

        ///////////////////////////////////////////
        // HORIZONTAL RAY-GRID INTERSECTION CODE
        ///////////////////////////////////////////
        var foundHorzWallHit = false;
        var horzWallHitX = 0;
        var horzWallHitY = 0;
        var horWallColor = 0

        // Find the y-coordinate of the closest horizontal grid intersenction
        yintercept = Math.floor(player.y / TILE_SIZE) * TILE_SIZE;
        yintercept += this.isRayFacingDown ? TILE_SIZE : 0;

        // Find the x-coordinate of the closest horizontal grid intersection
        xintercept = player.x + (yintercept - player.y) / Math.tan(this.rayAngle);

        // Calculate the increment xstep and ystep
        ystep = TILE_SIZE;
        ystep *= this.isRayFacingUp ? -1 : 1;

        xstep = TILE_SIZE / Math.tan(this.rayAngle);
        xstep *= (this.isRayFacingLeft && xstep > 0) ? -1 : 1;
        xstep *= (this.isRayFacingRight && xstep < 0) ? -1 : 1;

        var nextHorzTouchX = xintercept;
        var nextHorzTouchY = yintercept;

        // Increment xstep and ystep until we find a wall
        while (nextHorzTouchX >= 0 && nextHorzTouchX <= WINDOW_WIDTH && nextHorzTouchY >= 0 && nextHorzTouchY <= WINDOW_HEIGHT) {
            if (grid.hasWallAt(nextHorzTouchX, nextHorzTouchY - (this.isRayFacingUp ? 1 : 0)) !== 0) {
                foundHorzWallHit = true;
                horzWallHitX = nextHorzTouchX;
                horzWallHitY = nextHorzTouchY;
                horWallColor = grid.hasWallAt(nextHorzTouchX, nextHorzTouchY - (this.isRayFacingUp ? 1 : 0))
                break;
            } else {
                nextHorzTouchX += xstep;
                nextHorzTouchY += ystep;
            }
        }

        ///////////////////////////////////////////
        // VERTICAL RAY-GRID INTERSECTION CODE
        ///////////////////////////////////////////
        var foundVertWallHit = false;
        var vertWallHitX = 0;
        var vertWallHitY = 0;
        var verWallColor = 0

        // Find the x-coordinate of the closest vertical grid intersenction
        xintercept = Math.floor(player.x / TILE_SIZE) * TILE_SIZE;
        xintercept += this.isRayFacingRight ? TILE_SIZE : 0;

        // Find the y-coordinate of the closest vertical grid intersection
        yintercept = player.y + (xintercept - player.x) * Math.tan(this.rayAngle);

        // Calculate the increment xstep and ystep
        xstep = TILE_SIZE;
        xstep *= this.isRayFacingLeft ? -1 : 1;

        ystep = TILE_SIZE * Math.tan(this.rayAngle);
        ystep *= (this.isRayFacingUp && ystep > 0) ? -1 : 1;
        ystep *= (this.isRayFacingDown && ystep < 0) ? -1 : 1;

        var nextVertTouchX = xintercept;
        var nextVertTouchY = yintercept;

        // Increment xstep and ystep until we find a wall
        while (nextVertTouchX >= 0 && nextVertTouchX <= WINDOW_WIDTH && nextVertTouchY >= 0 && nextVertTouchY <= WINDOW_HEIGHT) {
            if (grid.hasWallAt(nextVertTouchX - (this.isRayFacingLeft ? 1 : 0), nextVertTouchY) !== 0) {
                foundVertWallHit = true;
                vertWallHitX = nextVertTouchX;
                vertWallHitY = nextVertTouchY;
                verWallColor = grid.hasWallAt(nextVertTouchX - (this.isRayFacingLeft ? 1 : 0), nextVertTouchY)
                break;
            } else {
                nextVertTouchX += xstep;
                nextVertTouchY += ystep;
            }
        }

        // Calculate both horizontal and vertical distances and choose the smallest value
        var horzHitDistance = (foundHorzWallHit)
            ? calculateDistance(player.x, player.y, horzWallHitX, horzWallHitY)
            : Number.MAX_VALUE;
        var vertHitDistance = (foundVertWallHit)
            ? calculateDistance(player.x, player.y, vertWallHitX, vertWallHitY)
            : Number.MAX_VALUE;

        // only store the smallest of the distances
        if (vertHitDistance < horzHitDistance) {
            this.wallHitX = vertWallHitX;
            this.wallHitY = vertWallHitY;
            this.distance = vertHitDistance;
            this.wallColor = verWallColor
            this.wasHitVertical = true;
        } else {
            this.wallHitX = horzWallHitX;
            this.wallHitY = horzWallHitY;
            this.distance = horzHitDistance;
            this.wallColor = horWallColor
            this.wasHitVertical = false;
        }
    }
    render() {
        stroke("rgba(255, 0, 0, 1.0)");//visor
        line(
            MINIMAP_SCALE_FACTOR * player.x,
            MINIMAP_SCALE_FACTOR * player.y,
            MINIMAP_SCALE_FACTOR * this.wallHitX,
            MINIMAP_SCALE_FACTOR * this.wallHitY
        );
    }
}

var player = new Player()
var grid = new Map()
var rays = []

function normalizeAngle(angle) {
    angle = angle % (2 * Math.PI);
    if (angle < 0) {
        angle = (2 * Math.PI) + angle;
    }
    return angle;
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

}
function castAllRays() {

    var rayAngle = player.rotationAngle - (VISION_ANGLE / 2);

    rays = [];
    for (var i = 0; i < NUM_RAYS; i++) {
        var ray = new Ray(rayAngle);
        ray.cast()
        rays.push(ray);
        rayAngle += VISION_ANGLE / NUM_RAYS;
    }

}

function render3DProjectedWalls() {
    // loop every ray in the array of rays
    for (var i = 0; i < NUM_RAYS; i++) {
        var ray = rays[i];

        // get the perpendicular distance to the wall to fix fishbowl distortion
        var correctWallDistance = ray.distance
            * Math.cos(ray.rayAngle - player.rotationAngle);

        // calculate the distance to the projection plane
        var distanceProjectionPlane = (WINDOW_WIDTH / 2) / Math.tan(VISION_ANGLE / 2);

        // projected wall height
        var rayHeight = (TILE_SIZE / correctWallDistance) * distanceProjectionPlane;

        // compute the transparency based on the wall distance
        var alpha = 1.0; //170 / correctWallDistance;

        var alpha = 180 / correctWallDistance

        var alpha = ray.wasHitVertical ? 1 : 0.8;

        // render a rectangle with the calculated wall height
        // fill("rgba(" + color + "," + color/3 + "," + color/.3 + "," + alpha + ")");

        var colorR = ray.wallColor == 1 ? 108 : ray.wallColor == 2 ? 39 : ray.wallColor == 3 ? 60 : 255;
        var colorG = ray.wallColor == 1 ? 145 : ray.wallColor == 2 ? 145 : ray.wallColor == 3 ? 160 : 255;
        var colorB = ray.wallColor == 1 ? 70 : ray.wallColor == 2 ? 190 : ray.wallColor == 3 ? 100 : 255;
        noStroke();
        fill('#C2F9E9')//cielo
        rect(i * RAY_WIDTH,
            0,
            RAY_WIDTH,
            (WINDOW_HEIGHT / 2) - (rayHeight / 2))
        fill("rgba(" + colorR + ", " + colorG + ", " + colorB + ", " + alpha + ")"); //paredes
        rect(
            i * RAY_WIDTH,
            (WINDOW_HEIGHT / 2) - (rayHeight / 2),
            RAY_WIDTH,
            rayHeight
        );
        fill('#FFE689')//s
        rect(i * RAY_WIDTH,
            (WINDOW_HEIGHT - rayHeight) / 2 + rayHeight,
            RAY_WIDTH,
            WINDOW_HEIGHT /2)
    }
}


function setup(WEBGL) {
    // initialize all objects
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function update() {
    // update game objects
    player.update()
    castAllRays()

}

function draw() {
    // render objects
    clear("#111");
    update();

    render3DProjectedWalls();
    // fill('#eee')

    grid.render()
    for (const ray of rays) {
        ray.render()
    }
    player.render()
}

// actions

function keyPressed() {
    // console.log(keyCode);
    switch (keyCode) {
        case UP_ARROW:
            player.walkDirection = +1
            break;
        case DOWN_ARROW:
            player.walkDirection = -1
            break;
        case RIGHT_ARROW:
            player.turnDirection = +1
            break;
        case LEFT_ARROW:
            player.turnDirection = -1
            break;
        case 33:
            player.strafeDirection = +1
            break;
        case 34:
            player.strafeDirection = -1
            break;

        default:
            break;
    }
}
function keyReleased() {
    switch (keyCode) {
        case UP_ARROW:
            player.walkDirection = 0;
            break;
        case DOWN_ARROW:
            player.walkDirection = 0;
            break;
        case RIGHT_ARROW:
            player.turnDirection = 0;
            break;
        case LEFT_ARROW:
            player.turnDirection = 0;
            break;
        case 33:
            player.strafeDirection = 0;
            break;
        case 34:
            player.strafeDirection = 0;
            break;


        default:
            break;
    }
}


// setup()





```

{{</details>}}


{{</details>}}
{{< p5-global-iframe id="breath" width="720" height="450" >}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raycasting</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
    <script src="./sketch.js"></script>
   
</body>
</html>



{{< /p5-global-iframe >}}

## Aplicaciones
Esta herramienta desarrollada permite aplicaciones en el ambito escolar y científico dando una imagen más clara de cómo es el comportamiento de nuestro satelite.

De manera general el modelado 3D tiene funciones que van más allá del diseño de una figura de acción para una película de animación. Con esta técnica también se ha beneficiado el campo de la medicina, representando modelos tridimensionales de la anatomía humana.

## Conclusiones y trabajo a futuro
WebGL es una tecnología diseñada para trabajar directamente con la GPU  y puede resultar demasiado tedioso y difícil de usar directamente sin algunas librerías de utilidad, La carga de escenas gráficas y objetos 3D en los formatos convencionales también es tedioso por lo que se han creado las bibliotecas JavaScript o algunas importadas a WebGL, para aportar esta funcionalidad adicional.

# Bibliografía

* [Getting started with WebGL in p5 · processing/p5.js Wiki. (n.d.). GitHub. Retrieved October 12, 2022, from ](https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5) por Processing Foundation
* [Centro de vuelo espacial Goddard de la NASA (Goddard Space Flight Center, & inglés), E. (2019, febrero 25). 10 Cosas: Lo que aprendemos sobre la Tierra estudiando la Luna. NASA Solar System Exploration. ](https://solarsystem.nasa.gov/news/959/10-cosas-lo-que-aprendemos-sobre-la-tierra-estudiando-la-luna/), Por Isabelle Yan
* [P5.Js web editor. (s/f). P5js.org. Recuperado el 10 de octubre de 2022, de](https://editor.p5js.org
), Por P5.js Org
* [P3D. Processing. Recuperado el 12 de octubre de 2022, de ](https://processing.org/tutorials/p3d), Por Shiffman, D.