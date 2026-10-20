/* Prólogo · Prolegómeno matemático (conjuntos, inducción, relaciones de equivalencia) */
(function (C) {
const { T, Q, table } = C;
C.world({
  ord: 0, num: '0', name: 'Muelle de los Conjuntos', logic: 'Prolegómeno matemático', badge: '{}',
  intro: 'Antes de zarpar revisamos las herramientas: conjuntos, pares, relaciones, funciones e inducción. Con eso basta para leer todo el libro.',
  stages: [
    T('Bienvenida a bordo', [
      { say: '¡Hola! Soy <b>Ramón</b>, un pulpo. Tengo ocho brazos y cada uno puede seguir su propio camino: por eso me gustan tanto los <b>árboles</b>. Te voy a acompañar por todo el libro de Graham Priest, <i>An Introduction to Non-Classical Logic</i>.' },
      { say: 'Cada capítulo del libro es un lugar de este mar. En cada uno hay una lógica distinta, y en casi todos la herramienta es la misma: el <b>árbol</b> (o <i>tableau</i>), un método para buscar sistemáticamente un contraejemplo a una inferencia.' },
      { say: 'Si el árbol no encuentra contraejemplo, todas sus ramas se cierran y la inferencia es válida. Si queda una rama abierta y completa, de ella se lee el contraejemplo. Lo verás muchas veces.' },
      { say: 'Este muelle es el <b>prolegómeno</b>: un poco de matemática que el libro usa de vez en cuando. No hace falta dominarla ahora; puedes volver aquí cuando la necesites.', mood: 'neutral' }
    ]),
    T('Conjuntos', [
      { say: 'Un <b>conjunto</b> es una colección de objetos, sus <b>miembros</b>. Se escribe con llaves, {a, b, c}, o con una condición: «el conjunto de los x tales que x es par». «a ∈ X» dice que a es miembro de X.',
        fig: table(['Notación', 'Se lee'], [['a ∈ X', 'a es miembro de X'], ['a ∉ X', 'a no es miembro de X'], ['{a}', 'el conjunto cuyo único miembro es a'], ['φ', 'el conjunto vacío, sin miembros']]) },
      { say: 'Ojo: {3} no es lo mismo que 3. El primero es un conjunto con un miembro; el segundo es un número. Y el conjunto vacío no tiene ningún miembro.' },
      { say: 'X es <b>subconjunto</b> de Y (X ⊆ Y) si todo miembro de X está en Y. Dos conjuntos son <b>idénticos</b> si tienen los mismos miembros, es decir, si cada uno es subconjunto del otro. El vacío es subconjunto de cualquier conjunto.' },
      { say: 'Con dos conjuntos se arman otros: la <b>unión</b> (lo que está en uno o en otro), la <b>intersección</b> (lo que está en ambos) y la <b>diferencia</b> Y − X (lo que está en Y pero no en X).',
        fig: table(['Operación', 'Miembros'], [['X ∪ Y', 'los que están en X o en Y'], ['X ∩ Y', 'los que están en X y en Y'], ['Y − X', 'los que están en Y y no en X']]) }
    ]),
    Q('Practica con conjuntos', [
      { q: 'Sea X = {1, 2, 3} e Y = {2, 3, 4}. ¿Qué es X ∩ Y?', opts: ['{1, 2, 3, 4}', '{2, 3}', '{1}'], ok: 1, why: 'La intersección guarda lo que está en los dos conjuntos a la vez.' },
      { q: 'Con los mismos conjuntos, ¿qué es X − Y?', opts: ['{1}', '{4}', '{2, 3}'], ok: 0, why: 'Son los miembros de X que no están en Y: solo el 1.' },
      { q: '¿Es el conjunto vacío subconjunto de {1, 2}?', opts: ['Sí', 'No'], ok: 0, why: 'No tiene ningún miembro que falte en {1, 2}, así que la condición se cumple sin más.' },
      { q: '¿Cuántos miembros tiene {φ}?', opts: ['Ninguno', 'Uno', 'Infinitos'], ok: 1, why: 'Tiene un miembro: el conjunto vacío. Un conjunto que contiene al vacío no está vacío.' }
    ]),
    T('Pares, relaciones y funciones', [
      { say: 'Un <b>par ordenado</b> ⟨a, b⟩ es como un conjunto de dos cosas, pero importa el orden: ⟨2, 3⟩ y ⟨3, 2⟩ son pares distintos. Lo mismo vale para tríos ⟨a, b, c⟩ y, en general, para n-tuplas.' },
      { say: 'Una <b>relación</b> entre conjuntos es un conjunto de tuplas. Si R es binaria, en vez de ⟨x, y⟩ ∈ R se escribe xRy. Las relaciones de accesibilidad entre mundos posibles que usaremos son de este tipo.' },
      { say: 'Una <b>función</b> de X a Y es una relación que a cada x de X le asigna exactamente un y de Y; se escribe f(x) = y. Las interpretaciones de la lógica son funciones: a cada letra le asignan un valor de verdad.',
        fig: table(['Objeto', 'Ejemplo'], [['par ordenado', '⟨Ana, Luis⟩'], ['relación binaria', '{⟨1, 2⟩, ⟨2, 3⟩}: «es el anterior de»'], ['función', 'f(n) = n²: a cada número, su cuadrado'], ['relación ternaria', 'conjunto de tríos ⟨x, y, z⟩']]) }
    ]),
    Q('Relaciones y funciones', [
      { q: '¿Es ⟨1, 2⟩ el mismo par que ⟨2, 1⟩?', opts: ['Sí', 'No'], ok: 1, why: 'En un par ordenado importa qué va primero y qué va segundo.' },
      { q: '¿Cuál de estas relaciones es una función de {1, 2} a {a, b}?', opts: ['{⟨1, a⟩, ⟨1, b⟩}', '{⟨1, a⟩, ⟨2, a⟩}', '{⟨2, b⟩}'], ok: 1, why: 'A cada miembro de {1, 2} le toca exactamente un valor. La primera da dos valores al 1 y la tercera no le da ninguno.' },
      { q: 'Si R = {⟨1, 2⟩, ⟨2, 3⟩}, ¿cuál es verdad?', opts: ['1R3', '2R3', '3R2'], ok: 1, why: 'Solo los pares que están en R cuentan: ⟨2, 3⟩ está, los otros no.' }
    ]),
    T('Prueba por inducción', [
      { say: 'Para probar que <i>todas</i> las fórmulas tienen una propiedad se usa la <b>inducción sobre la complejidad</b>. Tiene dos partes. El <b>caso base</b>: las fórmulas más simples, las letras, la tienen.' },
      { say: 'El <b>paso inductivo</b>: si unas fórmulas tienen la propiedad (la <b>hipótesis de inducción</b>), también la tienen las que se arman con ellas usando una conectiva más. Hay un subcaso por conectiva: {¬A}, {A∧B}, {A∨B}, {A⊃B}…' },
      { say: 'Ejemplo: toda fórmula tiene un número par de paréntesis. Base: una letra tiene cero. Paso: {¬A} tiene tantos como A; {(A∨B)} tiene los de A, más los de B, más dos. Si A y B tienen un número par, la suma también. Listo: vale para todas.' },
      { say: 'El libro usa la inducción sobre todo en las secciones marcadas con asterisco, donde se prueba que los árboles son <b>correctos</b> y <b>completos</b>. En este juego verás los resultados más que las pruebas.', mood: 'neutral' }
    ]),
    T('Relaciones de equivalencia', [
      { say: 'Una relación ∼ es de <b>equivalencia</b> si es reflexiva (x ∼ x), simétrica (si x ∼ y, entonces y ∼ x) y transitiva (si x ∼ y e y ∼ z, entonces x ∼ z). «Tener la misma estatura que» es un ejemplo.',
        fig: table(['Propiedad', 'Condición'], [['reflexiva', 'para todo x: x ∼ x'], ['simétrica', 'si x ∼ y, entonces y ∼ x'], ['transitiva', 'si x ∼ y e y ∼ z, entonces x ∼ z']]) },
      { say: 'Una relación de equivalencia parte el dominio en <b>clases de equivalencia</b> que no se solapan: [x] es el conjunto de todo lo equivalente a x. Cada objeto está en exactamente una clase.' },
      { say: 'Cuidado al definir algo para una clase a partir de uno de sus miembros: tiene que salir lo mismo con cualquier otro miembro. Esto reaparecerá con la identidad, cuando varios nombres denoten el mismo objeto.' }
    ]),
    Q('Antes de zarpar', [
      { q: '«Tener la misma edad que» es…', opts: ['una relación de equivalencia', 'simétrica pero no reflexiva', 'una función'], ok: 0, why: 'Todo el mundo tiene su misma edad, la relación va en los dos sentidos, y se encadena.' },
      { q: '«Ser padre de» es…', opts: ['reflexiva', 'simétrica', 'ni reflexiva ni simétrica'], ok: 2, why: 'Nadie es padre de sí mismo, y si a es padre de b, b no es padre de a.' },
      { q: 'En una prueba por inducción sobre fórmulas, el caso base trata de…', opts: ['las letras proposicionales', 'las fórmulas con ⊃', 'las fórmulas más largas'], ok: 0, why: 'Se empieza por lo que no tiene conectivas, y luego se sube conectiva a conectiva.' },
      { q: 'Si ∼ es de equivalencia y a ∼ b, entonces…', opts: ['[a] y [b] son la misma clase', '[a] y [b] no se tocan', 'a = b'], ok: 0, why: 'Dos objetos equivalentes caen en la misma clase, aunque no sean el mismo objeto. ¡Ya puedes zarpar!' }
    ])
  ]
});
})(window.CONTENT);
