/* Capítulo 25 · Lógicas difusas cuantificadas */
(function (C) {
const { T, Q, M, V, table } = C;
C.world({
  ord: 25, num: '25', name: 'Bajíos de Niebla', logic: 'Łukasiewicz continua de primer orden; identidad difusa; sorites de la identidad; objetos vagos', badge: '∀≈',
  intro: 'El último bajío, donde la niebla del capítulo 11 baja hasta el fondo y ni los objetos tienen bordes nítidos. Ramón llega al final del viaje: valores en [0, 1], cuantificadores e identidad.',
  stages: [
    T('Łukasiewicz cuantificada', [
      { say: 'El lenguaje tiene ∧, ∨, ¬ y →, y los cuantificadores ∀ y ∃. Como en el capítulo 21, una interpretación da un dominio D, un objeto para cada nombre y, a cada predicado, una función de objetos a valores en [0, 1].' },
      { say: 'Los valores se ordenan de 0 a 1, así que {∀xA} toma la <b>cota inferior máxima</b> de los valores de sus instancias y {∃xA} la <b>superior mínima</b>. Con dominios infinitos no tiene por qué haber mínimo ni máximo; por eso se habla de cotas.',
        fig: table(['Fórmula', 'Valor'], [['{∀xA}', 'la cota inferior máxima de los valores de A(d)'], ['{∃xA}', 'la cota superior mínima de los valores de A(d)']]) },
      { say: 'La validez absoluta, la que vale para cualquier umbral ε, equivale a que la menor de las premisas nunca supere a la conclusión. La lógica cuyo umbral es 1 se llama Łℵ. Sin premisas, ambas coinciden: una verdad lógica es lo que vale siempre 1.' }
    ]),
    T('Validez en Łℵ', [
      { say: 'En la proposicional, ningún sistema de axiomas es completo para inferencias con premisas cualesquiera, pero sí para las verdades lógicas. Sorprende: con cuantificadores, ni siquiera eso.' },
      { say: 'Para mostrar que algo vale, se razona con las cotas: por ejemplo, la cota inferior de las diferencias no supera la diferencia de las cotas. Para mostrar que algo no vale, se busca un contramodelo tanteando.' },
      { say: 'Toda interpretación clásica es una de Łukasiewicz en la que todo vale 1 o 0. Así que lo que es inválido en la clásica es inválido en Łℵ, y lo que vale en Łℵ vale en la clásica. Casi siempre, cuando algo clásico falla en Łℵ, la culpa es de la parte proposicional.', mood: 'think' }
    ]),
    M('Dos que no coinciden', 'Ł', [], '(∃xPx∧∃xQx)→∃x(Px∧Qx)', { dom: ['a', 'b'],
      intro: 'Sin premisas: la fórmula tiene que valer menos que 1. Dominio de dos objetos.',
      outro: 'Basta un contramodelo clásico: Pa = 1, Qa = 0, Pb = 0, Qb = 1. La fórmula vale 0.' }),
    M('Modus ponens cuantificado', 'Ł', [], '(∃xPx∧∀x(Px→Qx))→∃xQx', { dom: ['a'],
      intro: 'Un solo objeto. Recuerda que el modus ponens falla en L cuando la verdad baja.',
      outro: 'Con Pa = 0,5 y Qa = 0, el antecedente vale 0,5 y la fórmula también: inválida, por la parte proposicional, {(p∧(p→q))→q}.' }),
    T('Deducciones', [
      { say: 'Otra forma de mostrar validez: deducirla de lo ya sabido con reglas que conservan la validez, como el modus ponens. Así salen, por ejemplo, las dos formas de la contraposición.' },
      { say: 'Para los cuantificadores sirve la <b>generalización universal</b>: si a no aparece en A y {A(a)} es válida, también lo es {∀xA}. Con ella se prueban {∀x(A→B)→(∀xA→∀xB)} y, si x no está libre en B, {∀x(A→B)→(∃xA→B)}.' },
      { say: 'Y la lógica difusa relevante del capítulo 11 se extiende a primer orden del mismo modo.' }
    ]),
    T('El sorites de la identidad', [
      { say: 'En una lógica multivaluada, lo natural es que {a=b} esté designada justo cuando a y b son lo mismo. Así vale {a=b, A(a) ⊢ A(b)} con umbral 1. Para que valga con cualquier umbral hay que decidir cuánto vale {a=b} cuando a y b difieren.' },
      { say: 'Si vale 0, la identidad es un predicado nítido. Pero la vaguedad sugiere otra cosa. Tengo dos coches iguales, a y b. Cada día saco una pieza de a y pongo la de b. Al principio el coche es a; al final es b. ¿Cuándo deja de ser a? En ningún momento preciso.', mood: 'think' },
      { say: 'Si cambiar una pieza no cambia el coche, cada día es idéntico al anterior, y por la <b>transitividad</b> de la identidad, a = b. Es un sorites hecho con identidades en vez de con modus ponens. Y si el sorites clásico se resuelve negando la validez del modus ponens, este se resuelve negando la de la transitividad.' }
    ]),
    T('Identidad difusa', [
      { say: 'Una <b>métrica</b> δ mide distancias: δ(x, y) = 0 si y solo si x es y; δ(x, y) = δ(y, x); y la desigualdad triangular, δ(x, z) ≤ δ(x, y) + δ(y, z). Con la escala ajustada para que la distancia máxima sea 1, se define {a=b} como 1 − δ(a, b).' },
      { say: 'Así vale {a=a}, y {a=b} y {b=a} valen lo mismo. La desigualdad triangular impide que {a=c} se aleje demasiado de {a=b} y {b=c}, pero no impide que baje: la transitividad no es válida.',
        fig: table(['', 'a=b', 'b=c', 'a=c'], [['valor', '0,75', '0,75', '0,5'], ['distancia', '0,25', '0,25', '0,5']]) },
      { say: 'En los ejercicios que siguen, los valores van de cuarto en cuarto. Si das a {a=b} el valor 1, a y b son el mismo objeto, y los predicados no pueden distinguirlos.' }
    ]),
    M('Falla la transitividad', 'Łδ', ['a=b', 'b=c'], 'a=c', { dom: ['a', 'b', 'c'],
      intro: 'Elige los valores de las tres identidades: que {a=c} quede por debajo del mínimo de las otras, sin romper la desigualdad triangular.',
      outro: 'Por ejemplo, 0,75, 0,75 y 0,5: las distancias son 0,25, 0,25 y 0,5, y la triangular se cumple justo.' }),
    M('Falla la sustitución', 'Łδ', ['a=b', 'Pa'], 'Pb', { dom: ['a', 'b'],
      intro: 'Ahora con un predicado: que {Pb} quede por debajo de {a=b} y de {Pa}.',
      outro: 'Con {a=b} = 0,75, {Pa} = 1 y {Pb} = 0,5, por ejemplo. Si P es un predicado nítido que salta entre a y b, la caída puede ser total.' }),
    T('Caídas acotadas', [
      { say: 'Un predicado P es <b>suave</b> si sus valores no cambian más que la distancia: |P(x) − P(y)| ≤ δ(x, y). Para los predicados suaves, la sustitución puede perder verdad, pero poca: {Pb} vale al menos {Pa} + {a=b} − 1.' },
      { say: 'Lo mismo pasa con el modus ponens: {B} vale al menos {A} + {A→B} − 1. Y con la transitividad: {a=c} vale al menos {a=b} + {b=c} − 1.' },
      { say: 'Así que los dos sorites se tratan igual. Sus inferencias no son válidas, pero son <b>prácticamente correctas</b>: si las premisas son casi verdaderas, la conclusión también lo es. El problema llega al encadenar muchas: las pequeñas caídas se acumulan.', mood: 'think' }
    ]),
    T('Objetos vagos', [
      { say: 'Hay, al menos a primera vista, objetos vagos: el desierto australiano, el Everest. Se sale de ellos sin cruzar ningún borde preciso. Y con ellos la identidad se vuelve difusa: los primeros europeos llamaron «Nueva Holanda» a esa tierra, pero ¿incluía Tasmania? Que Nueva Holanda sea Australia no es del todo verdadero ni del todo falso.' },
      { say: 'La identidad por métrica da una teoría de objetos vagos: el 2 es del todo idéntico a sí mismo, bastante a 2,1, algo menos a 2,2, y nada a 3. Los objetos vagos piden identidades difusas; si estas fueran imposibles, aquellos también.' },
      { say: 'Vuelve el argumento de Evans del capítulo 21: si es indeterminado que a = b, y no lo es que a = a, entonces a ≠ b. Con un operador «es indeterminado que» que vale 1 en los valores intermedios, la premisa puede valer 1 y la conclusión, digamos, 0,3. Con un operador suave pasa lo mismo: la caída es grande. El argumento falla, y puede haber identidades indeterminadas.', mood: 'think' }
    ]),
    Q('Niebla', [
      { q: 'En Łℵ, {∃xA} toma…', opts: ['el mínimo de sus instancias', 'la cota superior mínima de sus instancias', 'siempre 0 o 1'], ok: 1, why: 'Como una disyunción de todas las instancias.' },
      { q: 'Si una fórmula es válida en Łℵ…', opts: ['es válida en la clásica', 'puede ser inválida en la clásica', 'no tiene cuantificadores'], ok: 0, why: 'Las interpretaciones clásicas son casos especiales.' },
      { q: 'Con identidad por métrica, {a=b} vale…', opts: ['δ(a, b)', '1 − δ(a, b)', '0 o 1'], ok: 1, why: 'Cuanto más lejos, menos idénticos.' },
      { q: 'En el sorites de la identidad, la inferencia que falla es…', opts: ['el modus ponens', 'la transitividad de la identidad', 'la reflexividad'], ok: 1, why: 'Cada paso pierde un poco de verdad.' },
      { q: 'Si {a=b} vale 0,9 y {b=c} vale 0,9, {a=c} vale al menos…', opts: ['0,9', '0,8', '0'], ok: 1, why: '0,9 + 0,9 − 1 = 0,8, por la desigualdad triangular.' }
    ]),
    M('Jefe de los bajíos', 'Łδ', [], '∀x∀y∀z((x=y∧y=z)→x=z)', { dom: ['a', 'b', 'c'], boss: true,
      intro: 'La transitividad como ley, sobre tres objetos. Haz que la fórmula valga menos que 1.',
      outro: '¡Inválida! Con {a=b} = {a=c} = 0,75 y {b=c} = 0,5, por ejemplo, una instancia pierde un cuarto de verdad. Fin del viaje: la lógica, como el mar, tiene más de un fondo.' }),
    V('La máquina de niebla', { mv: true, fo: true, sys: ['Ł', 'Łδ', 'Ł3', 'CL'], syms: '¬∧∨→∀∃=', goals: ['valid', 'invalid', 'gap'], cmp: 'CL',
      intro: 'Dominios de uno a tres objetos y valores en una cuadrícula. Un contraejemplo es seguro; si no lo encuentra, es un indicio. En CL la identidad es nítida; en Łδ, difusa.',
      outro: 'Lo válido en Łℵ es válido en la clásica, pero no al revés.',
      ex: [[[], '∀x(Px→Qx)→(∀xPx→∀xQx)', 'valid', 'Ł'], [[], '(∃xPx∧∀x(Px→Qx))→∃xQx', 'invalid', 'Ł'], [[], '∀x(Px∨¬Px)', 'invalid', 'Ł'], [['a=b', 'b=c'], 'a=c', 'invalid', 'Łδ'], [[], '∀x∀y(x=y→y=x)', 'valid', 'Łδ'], [['Pa'], '∃xPx', 'valid', 'Ł']] })
  ]
});
})(window.CONTENT);
