# Procedural texturing
En gráficos por computadora , una textura de procedimiento es una textura creada
utilizando una descripción matemática (es decir, un algoritmo ) en lugar de datos
almacenados directamente. La ventaja de este enfoque es el bajo costo de
almacenamiento, la resolución ilimitada de texturas y el fácil mapeo de texturas . [2]
Este tipo de texturas se utilizan a menudo para modelar superficies o
representaciones volumétricas de elementos naturales como madera , mármol ,
granito , metal , piedra y otros.



<a href="https://imgur.com/e2vK7JH"><img src="https://i.imgur.com/e2vK7JH.jpg" title="source: imgur.com" /></a>




# frame buffer object

La arquitectura de objeto de búfer de fotogramas (FBO) es una extensión de
OpenGL para realizar una representación flexible fuera de la pantalla, incluida la
representación en una textura . Al capturar imágenes que normalmente se dibujarán
en la pantalla, se puede usar para implementar una gran variedad de filtros de
imagen y efectos de procesamiento posterior. El FBO es análogo al modelo de
destinos de representación en DirectX . Se utiliza en OpenGL por su eficiencia y
facilidad de uso. El uso de FBO no sufre la sobrecarga asociada con el cambio de
contexto de dibujo de OpenGL y ha reemplazado en gran medida al buffer y otros
métodos que implican cambios de contexto.

El FBO tiene dos usos principales: el procesamiento posterior de imágenes
renderizadas y la composición entre diferentes escenas. Algunos ejemplos son:
1. La imagen renderizada se captura y se somete a Fragment Shaders u otras
manipulaciones. Esto permite que se lleven a cabo muchos de los efectos de
gráficos por computadora populares de hoy en día, incluida la adición de un
efecto de desenfoque o floración.
2. Se puede usar para crear vistas de otras escenas, por ejemplo: un televisor
en una casa que muestra la vista desde una cámara secundaria. Una escena
se puede renderizar a través de un FBO a una textura, luego esa textura se
puede aplicar a la superficie de un televisor. Esto a veces se llama
"Renderizar la textura" o RTT.

## Ventajas sobre otros métodos

Los métodos que involucran al FBO se consideran superiores porque:
* Es más fácil de configurar que la mayoría de los otros métodos.
* No requiere cambio de contexto.
* Es más eficiente porque los recursos se comparten dentro del mismo
contexto.
* Es más flexible porque se puede adquirir todo el búfer de profundidad , el
búfer de plantilla , etc.

## The Book of Shaders

Patrones:
Dado que los programas de sombreado se ejecutan píxel por píxel, no importa
cuánto repita una forma, el número de cálculos permanece constante. Esto significa
que los sombreadores de fragmentos son particularmente adecuados para patrones
de mosaico.

## Trabajo Realizado y a futuro:

Como trabajo realizado tenemos por resumen la implementación de frags, los cuales
sé encontraron en su mayoría en él libro guía, no obstante se adecuo de tal manera
que sé puedan ver los distintos patrones acompañados de una interfaz más amena
al público en general.
Por último un trabajo a futuro es la implementación de los shaders aplicados a
proyectos orientados a objetos donde son de suma importancia estos patrones.




{{< p5-global-iframe id="breath" width="520" height="420" >}}

<!DOCTYPE html>
<html lang="en">

<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.js"></script>
    <script src="p5.sound.js"></script>
    <script src=https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js"></script>
</head>

<body>
    <main>
    </main>
    <script>
        let pg;
        let colt;
        let truchetShader;
        let colorShader;
        let moving;
        let Hexagram;
        let textura;
        const opcionesS  = {'truchet':0, 'color':1, 'moving':3, 'Hexagram':4,};

        function preload() {
        // shader adapted from here: https://thebookofshaders.com/09/
        truchetShader = readShader('/RGB/docs/Talleres/texturing_truchet.frag',
                                    { matrices: Tree.NONE, varyings: Tree.NONE });
        colorShader = readShader('/RGB/docs/Talleres/texturing_color.frag',
                                    { matrices: Tree.NONE, varyings: Tree.NONE }); 
        moving = readShader('/RGB/docs/Talleres/texturing_mobile.frag',
                                    { matrices: Tree.NONE, varyings: Tree.NONE });
        Hexagram = readShader('/RGB/docs/Talleres/texturing_Hexagram.frag',
                                    { matrices: Tree.NONE, varyings: Tree.NONE });

        }

        function setup() {
        createCanvas(400, 400, WEBGL);
        // create frame buffer object to render the procedural texture
        pg = createGraphics(400, 400, WEBGL);
        textureMode(NORMAL);
        textureMode(NORMAL);
        noStroke();
        texturaD = 'None'
        textura = createSelect();
        textura.position(15, 15);
        textura.style('width', '90px');
        textura.option('None'); 
        textura.option('color'); 
        textura.option('truchet');
        textura.option('moving');
        textura.option('Hexagram');
        }

        function draw() {
        background(33);
        orbitControl();
        rotateX(millis() / 10000);
        rotateY(millis() / 10000);
        rotateZ(millis() / 10000);
        cylinder(100, 200);
        console.log(opcionesS[textura.value()]);  
        
        if (opcionesS[textura.value()] == 1){
            pg.textureMode(NORMAL);
            pg.noStroke();
            pg.shader(colorShader);
            pg.emitResolution(colorShader);
            //colorShader.setUniform('u_zoom', 3);
            pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
            texture(pg);
        }
        else if(opcionesS[textura.value()] == 0){
            pg.textureMode(NORMAL);
            pg.noStroke();
            pg.shader(truchetShader);
            // emitResolution, see:
            // https://github.com/VisualComputing/p5.treegl#macros
            pg.emitResolution(truchetShader);
            // https://p5js.org/reference/#/p5.Shader/setUniform
            truchetShader.setUniform('u_zoom', 3);
            // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
            pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
            // set pg as texture
            texture(pg);
        }
        
        else if (opcionesS[textura.value()] == 3){
            pg.textureMode(NORMAL);
            pg.noStroke();
            pg.shader(moving);
            pg.emitResolution(moving);
            //colorShader.setUniform('u_zoom', 3);
            pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
            texture(pg);
        }
        else if (opcionesS[textura.value()] == 4){
            pg.textureMode(NORMAL);
            pg.noStroke();
            pg.shader(Hexagram);
            pg.emitResolution(Hexagram);
            //colorShader.setUniform('u_zoom', 3);
            pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
            texture(pg);
        }
        }

        function mouseMoved() {
        // https://p5js.org/reference/#/p5.Shader/setUniform
        truchetShader.setUniform('_zoom', int(map(mouseX, 0, width, 1, 30)));
        // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
        pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
        }

    </script>
</body>
</html>
{{< /p5-global-iframe >}}


# Conclusiones:
1. Permiten trabajar diferentes patrones, los cuales manejan un .Frag
2. Además de programas especializados, otros, como Blender , CorelDRAW
,contienen subsistemas de texturas procedimentales que se pueden utilizar
para generar texturas.
3. De acuerdo al libro de los shaders, tenemos una buena cantidad de patrones
de mosaicos, los cuales podemos crear o implementar de acuerdo a material
proveniente de otros trabajos, dando a entender que es una comunidad la
que trabaja este estilo de gráficos.

# Bibliografía:
* Procedural Texturing. (s/f). Github.io. Recuperado el 25 de noviembre de 2022, de
https://visualcomputing.github.io/docs/shaders/procedural_texturing/
* The book of shaders. (s/f). The Book of Shaders. Recuperado el 25 de noviembre de
2022, de https://thebookofshaders.com/09/
* Wikipedia contributors. (s/f). Procedural texture. Wikipedia, The Free Encyclopedia.
https://en-m-wikipedia-org.translate.goog/wiki/Procedural_texture?_x_tr_sl=auto&_x_
tr_tl=es&_x_tr_hl=es-419
* Wikipedia contributors. (s/f-a). Framebuffer object. Wikipedia, The Free
Encyclopedia.
https://en-m-wikipedia-org.translate.goog/wiki/Framebuffer_object?_x_tr_sl=auto&_x
_tr_tl=es&_x_tr_hl=es-419
* home. (s/f). P5js.org. Recuperado el 25 de noviembre de 2022, de
https://p5js.org/es/