/* Capítulo 11 · Lógicas difusas */
(function (C) {
const { T, Q, M, TT, V, table } = C;
C.world({
  ord: 11, num: '11', name: 'Bruma del Sorites', logic: 'Lógica difusa: Łukasiewicz continua y vaguedad', badge: '0,7',
  intro: 'En la bruma los contornos se borran poco a poco. La verdad viene en grados, entre 0 y 1, y el modus ponens puede fallar. Aquí tampoco hay árboles: se razona con valores.',
  stages: [
    T('La paradoja del montón', [
      { say: 'María tiene cinco años: es una niña. Un segundo no convierte a nadie en adulto, así que dentro de un segundo seguirá siendo niña; y un segundo después, también… Tras suficientes segundos habrán pasado treinta años, y María seguiría siendo niña. Absurdo.' },
      { say: 'Es una <b>paradoja sorites</b> (del griego «soros», montón). Surge porque «niña» es <b>vago</b>: cambios muy pequeños no afectan a si se aplica. Casi todos los predicados son así: alto, rojo, borracho, montón… incluso muerto.' },
      { say: 'El sorites es una cadena de modus ponens. Si Mᵢ es «María es niña tras i segundos», tenemos M₀, {M₀→M₁}, {M₁→M₂}… hasta Mₖ, que es claramente falso.' }
    ]),
    T('Respuestas', [
      { say: 'Si todo es verdadero o falso, hay un último segundo de niñez, y ese condicional falla. Pero un salto brusco no cuadra con un cambio casi continuo. Los <b>epistemicistas</b> lo aceptan: el corte existe, solo que no podemos saber dónde.' },
      { say: 'Su razón: conocer exige una base de evidencia, y dos situaciones indistinguibles darían el mismo conocimiento. Pero el problema no es solo no saber dónde está el corte; es que un segundo de vida no parece poder fundar la diferencia entre niña y adulta.', mood: 'think' },
      { say: 'Otra salida: un tercer valor en la zona de penumbra, por ejemplo K3 con supervaluaciones. Pero entonces aparece un corte igual de raro entre lo verdadero y lo intermedio. Si el cambio es continuo, parece que la verdad debe cambiar de forma continua: por grados.' },
      { say: 'Aun así, la lógica difusa tiene su propio problema: en algún punto la verdad pasa de ser completa a ser menos que completa. Ningún enfoque se libra del todo.' }
    ]),
    T('La lógica L de Łukasiewicz', [
      { say: 'Los valores son todos los números reales entre 0 y 1: 1 es completamente verdadero, 0 completamente falso, 0,5 a medias. Las funciones de verdad:',
        fig: table(['Conectiva', 'Valor'], [['{¬A}', '1 − a'], ['{A∧B}', 'el mínimo de a y b'], ['{A∨B}', 'el máximo de a y b'], ['{A→B}', '1 si a ≤ b; si no, 1 − a + b']]) },
      { say: 'El condicional: si A no es más verdadera que B, vale 1. Si lo es, algo falla, y tanto más cuanto mayor la caída: pierde exactamente lo que cae. Con solo 1 y 0 todo es clásico; con 1, 0,5 y 0 es justo Ł3.' },
      { say: '¿Qué valores aceptamos? Depende del contexto: una manzana 0,95 roja sirve. Cada umbral ε da una lógica. La lógica <b>L</b> exige que la inferencia funcione para <i>todo</i> umbral, y eso equivale a esto: nunca la conclusión vale menos que la menor de las premisas.' },
      { say: 'Con finitas premisas, eso es lo mismo que la verdad lógica (valor 1) del condicional que va de la conjunción de premisas a la conclusión. La lógica con solo el 1 designado se llama Łℵ, y estudiarla basta para estudiar L.' }
    ]),
    TT('Cinco valores', 'Ł5', ['¬p', 'p∨¬p'], {
      intro: 'Una muestra de cinco valores. {¬p} vale 1 − p; la disyunción, el máximo.',
      outro: 'El tercio excluso nunca baja de 0,5, pero no siempre llega a 1.' }),
    Q('Grados de verdad', [
      { q: 'Si {p} vale 0,9 y {q} vale 0,6, ¿cuánto vale {p→q}?', opts: ['0,6', '0,7', '1'], ok: 1, why: 'p > q, así que vale 1 − 0,9 + 0,6 = 0,7.' },
      { q: 'Y si {p} vale 0,4 y {q} vale 0,8, {p→q} vale…', opts: ['1', '0,4', '0,8'], ok: 0, why: 'El antecedente no es más verdadero que el consecuente.' },
      { q: 'En L, una inferencia es válida si…', opts: ['las premisas valen 1 y la conclusión también', 'la conclusión nunca vale menos que la menor de las premisas', 'la conclusión vale al menos 0,5'], ok: 1, why: 'Es la caracterización por el mínimo (la cota inferior máxima).' }
    ]),
    M('Falla el modus ponens', 'Ł', ['p', 'p→q'], 'q', {
      intro: 'Busca valores donde {q} quede por debajo del mínimo de las premisas.',
      outro: 'Con {p} = 0,75 y {q} = 0,5, el condicional vale 0,75 y {q} solo 0,5: inválida en L.' }),
    M('Sin explosión', 'Ł', ['p∧¬p'], 'q', {
      outro: 'Con {p} = 0,5 la contradicción vale 0,5; basta {q} = 0 para refutarla. L es paraconsistente.' }),
    M('Contracción', 'Ł', [], '(p→(p→q))→(p→q)', {
      intro: 'Sin premisas, la fórmula tiene que valer menos que 1.',
      outro: 'Por ejemplo, {p} = 0,75 y {q} = 0,25. Este axioma de R falla en L: L no es una sublógica de R.' }),
    T('Axiomas y condicionales en L', [
      { say: 'No hay árboles del tipo del libro para Łℵ. Se usa un sistema axiomático con el modus ponens como única regla. Es poco transparente, y probar su completitud es difícil.' },
      { say: 'Más claro: L es casi la lógica relevante CK (B con A8, A9, A12 y A15). Le falta un axioma raro, A17: {((A→B)→B)→(A∨B)}. Y no valida A11, la contracción.' },
      { say: 'Lo más llamativo: falla el modus ponens. Vale cuando las premisas son completamente verdaderas, pero no cuando la verdad baja. Y eso explica el sorites: con valores 1, 1, 1, 0,8, 0,6, 0,4, 0,2, 0, 0, 0, cada condicional vale al menos 0,8, así que todas las premisas son aceptables y la conclusión no.',
        fig: table(['M₀', 'M₁', 'M₂', 'M₃', 'M₄', 'M₅', 'M₆', 'M₇', 'M₈', 'M₉'], [['1', '1', '1', '0,8', '0,6', '0,4', '0,2', '0', '0', '0']], { tight: true }) },
      { say: 'L es paraconsistente: {A∧¬A} no implica {B}. Pero no es relevante: conserva casi todos los vicios del condicional material, como {A ⊢ B→A} y {¬A ⊢ A→B}.', mood: 'think' }
    ]),
    M('Transitividad', 'Ł', ['p→q', 'q→r'], 'p→r', {
      outro: 'Inválida: con {p} = 1, {q} = 0,75 y {r} = 0,5, cada premisa vale 0,75 y la conclusión 0,5.' }),
    T('Lógica difusa relevante', [
      { say: 'L no es relevante, pero se puede «difuminar» una lógica relevante. En <b>FB</b> (B difusa), cada letra tiene un valor en [0, 1] en cada mundo, la negación usa la estrella, y {A→B} vale en w la menor caída sobre las tríadas Rwxy.' },
      { say: 'La validez: en todo mundo normal, la menor de las premisas no supera a la conclusión. FB es relevante, y sus verdades lógicas son las de B. Pero, como en L, el modus ponens falla, y también la transitividad de los condicionales.' },
      { say: 'Un apéndice del capítulo generaliza todo con las <b>t-normas</b>: operaciones que hacen de conjunción fuerte, y de las que sale el condicional. La de Łukasiewicz da L; la del mínimo da la lógica de Gödel; la del producto, la lógica del producto. Lo que valen todas es la lógica básica BL.' }
    ]),
    Q('Bruma', [
      { q: '¿Qué tiene que ver la falla del modus ponens con el sorites?', opts: ['nada', 'el sorites es una cadena de modus ponens; si falla, la paradoja se disuelve', 'el sorites usa el silogismo disyuntivo'], ok: 1, why: 'Las premisas pueden ser aceptables sin que lo sea la conclusión.' },
      { q: 'Con los valores 1, 0,5 y 0, la lógica L coincide con…', opts: ['K3', 'Ł3', 'LP'], ok: 1, why: 'Las tablas de Łukasiewicz continua, restringidas a esos tres valores, son las de Ł3.' },
      { q: '¿Es L una lógica relevante?', opts: ['Sí', 'No'], ok: 1, why: 'Vale, por ejemplo, {A ⊢ B→A}.' },
      { q: 'La t-norma del mínimo da…', opts: ['la lógica de Gödel', 'Łukasiewicz', 'la del producto'], ok: 0, why: 'Cada t-norma continua define una lógica con valores en [0, 1].' }
    ]),
    V('La máquina difusa', { mv: true, sys: ['Ł', 'Ł3', 'K3', 'CL'], syms: '¬∧∨→', goals: ['valid', 'invalid', 'gap'], cmp: 'CL',
      intro: 'Para L, la máquina recorre una cuadrícula de valores de décimo en décimo: si encuentra un contraejemplo, es seguro; si no, es un buen indicio.',
      outro: 'L comparte con el condicional material casi todas sus paradojas, pero no el modus ponens.',
      ex: [[['p', 'p→q'], 'q', 'invalid', 'Ł'], [[], 'p→(q→p)', 'valid', 'Ł'], [['p∧¬p'], 'q', 'invalid', 'Ł'], [[], '(p→(p→q))→(p→q)', 'invalid', 'Ł'], [['(p∧q)→r'], '(p→r)∨(q→r)', 'valid', 'Ł'], [['p', 'p→q'], 'q', 'valid', 'Ł3']] })
  ]
});
})(window.CONTENT);
