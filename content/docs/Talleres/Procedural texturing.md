# Procedural texturing
En gráficos por computadora , una textura de procedimiento es una textura creada
utilizando una descripción matemática (es decir, un algoritmo ) en lugar de datos
almacenados directamente. La ventaja de este enfoque es el bajo costo de
almacenamiento, la resolución ilimitada de texturas y el fácil mapeo de texturas . [2]
Este tipo de texturas se utilizan a menudo para modelar superficies o
representaciones volumétricas de elementos naturales como madera , mármol ,
granito , metal , piedra y otros.








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