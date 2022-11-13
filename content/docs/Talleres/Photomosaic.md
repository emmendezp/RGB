# Photomosaic

{{< hint info >}}
**Ejercicio 1**  
1. Implement a mosaic (or/and ascii art) visual application.
{{< /hint >}}


# Background

## Fotomosaico

En el campo de las imágenes y la fotografía, un fotomosaico es una imagen usualmente una fotografía que ha sido dividida en secciones rectangulares (usualmente del mismo tamaño), tal como es compuesto un mosaico tradicional, con la característica de que cada elemento del mosaico es reemplazado por otra fotografía con colores promedios apropiados al elemento de la imagen original. Cuando es vista en detalle, los píxeles individuales se ven como la imagen principal, sin embargo al verla como un todo, es posible apreciar que la imagen está compuesta por cientos de miles de imágenes.

<img src="https://img.unocero.com/2019/07/unocero-photomosaic.jpg" alt="Fotomosaico" style="width: 50%;"/>

## Implementación

En el tipo más avanzado de mosaico fotográfico, la imagen de destino no se reduce, y la coincidencia se realiza comparando cada píxel del rectángulo con el píxel correspondiente de cada imagen de la biblioteca. El rectángulo del objetivo se sustituye por la imagen de la biblioteca que minimiza la diferencia total. Esto requiere muchos más cálculos que el tipo simple, pero los resultados pueden ser mucho mejores, ya que la comparación píxel a píxel puede conservar la resolución de la imagen de destino.

{{< hint info >}}
**Markdown content**  
Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
{{< /hint >}}

**¿Cómo crear fotomosaicos?**  
1. Lee las imagenes del dataset, que sustituirán los recuadros de la imagen original.
2. Leer la imagen original y dividirla en recuadros M x N formando el mosaico.
3. Para cada recuadro, encuentra la mejor coincidencia de las imagenes del dataset.
4. Crea el fotomosaico final disponiendo de las imagenes del dataset  seleccionadas.
{{< /hint >}}

## División de la imagen original en partes más pequeñas

<img src="https://media.geeksforgeeks.org/wp-content/uploads/Capture_2-1.jpg" alt="División" style="width: 50%;"/>

## Promediando los valores de los colores
Cada píxel de una imagen tiene un color que puede ser representado por sus valores de rojo, verde y azul. En este caso, se están utilizando imágenes de 8 bits, por lo que cada uno de estos componentes tiene un valor de 8 bits en el rango [0, 255]. Dada una imagen con un total de N píxeles, el promedio RGB se calcula de la siguiente manera:

<img src="https://www.geeksforgeeks.org/wp-content/ql-cache/quicklatex.com-34611203bc6570718be7cb97960bd09b_l3.svg" alt="Promedio colores">


## Eligiendo la mejor imagen para un recuadro

Para el fotomosaico, hay que encontrar una imagen coincidente entre las imágenes del dataset. Para determinar si la imágen coincide con el recuadro seleccionado, utilice los valores RGB medios. La coincidencia más cercana es la imagen con el valor RGB medio más próximo.

<img src="https://www.geeksforgeeks.org/wp-content/ql-cache/quicklatex.com-4bfef269686704233f1e9efbbd7b94f9_l3.svg" alt="eligiendo la mejor imagen">


# Código


{{< p5-global-iframe id="breath" width="500" height="500" >}}



{{< /p5-global-iframe >}}




# Bibliografía:
* Waterfall illusion. (s/f). The Illusions Index. Recuperado el 6 de septiembre de 2022, de https://www-illusionsindex-org.translate.goog/ir/waterfall-illusion?_x_tr_sl=auto&_x_tr_tl=es&_x_tr_hl=es-419

* Bach, M. (s/f). “Stepping feet” motion illusion. Michaelbach.de. Recuperado el 6 de septiembre de 2022, de https://michaelbach.de/ot/mot-feetLin/

* Michael's   Visual Phenomena & Optical Illusions. Recuperado el 6 de septiembre de 2022, de 
 https://michaelbach.de/ot/lum-lazyShadow/7


