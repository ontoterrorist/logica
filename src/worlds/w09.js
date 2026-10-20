/* Capítulo 9 · Lógicas con faltas, excesos y mundos */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 9, num: '9', name: 'Bosque de Algas Imposibles', logic: 'K4, N4, K*, N*, mundos imposibles, negación construible y conexividad', badge: '→',
  intro: 'Entre las algas flotan rocas que no deberían flotar: mundos donde la lógica cambia. Aquí se combinan los mundos posibles con los cuatro valores de FDE para obtener condicionales nuevos.',
  stages: [
    T('Un condicional para FDE', [
      { say: 'FDE no tiene un buen condicional: {⊃} ni siquiera cumple el modus ponens. Lo natural es montar mundos posibles sobre la semántica relacional. Una interpretación es ⟨W, ρ⟩: un conjunto de mundos y, en cada mundo w, una relación ρ<sub>w</sub> entre letras y valores.' },
      { say: 'Las conectivas extensionales funcionan como en FDE, mundo a mundo. Para el nuevo condicional {→} generalizamos el estricto de S5:',
        fig: table(['{A→B} es…', 'en w si…'], [['verdadera', 'en todo mundo donde A es verdadera, B es verdadera'], ['falsa', 'en algún mundo, A es verdadera y B es falsa']]) },
      { say: 'La validez conserva la verdad en todo mundo de toda interpretación. Esta lógica se llamaría Kυ4; el libro la llama <b>K4</b> (no confundir con la modal K4 = Kτ).' }
    ]),
    T('Árboles para K4', [
      { say: 'Los nodos son {A,+i} o {A,−i}. Las reglas extensionales son las de FDE con el número del mundo. Las del condicional:',
        fig: rule(r(['{A→B,+i}'], [['{A,−j}'], ['{B,+j}']], 'para cada j de la rama'), r(['{A→B,−i}'], [['{A,+j}', '{B,−j}']], 'j nuevo'), r(['{¬(A→B),+i}'], [['{A,+j}', '{¬B,+j}']], 'j nuevo'), r(['{¬(A→B),−i}'], [['{A,−j}'], ['{¬B,−j}']], 'para cada j')) },
      { say: 'No hay relación de accesibilidad: como en S5, todos los mundos cuentan. El contramodelo se lee como en FDE, mundo a mundo: {p,+i} da pρ<sub>i</sub>1 y {¬p,+i} da pρ<sub>i</sub>0.',
        fig: tab('K4', ['p→q', 'q→r'], 'p→r') }
    ]),
    A('Transitividad de →', 'K4', ['p→q', 'q→r'], 'p→r', { outro: 'Válida en K4.' }),
    A('Contraposición de →', 'K4', ['p→q'], '¬q→¬p', {
      outro: 'Inválida en K4: que {q} no sea verdadera no dice nada de la falsedad de {q}.' }),
    A('Sin paradojas del estricto', 'K4', [], 'p→(q∨¬q)', {
      outro: 'Inválida en K4: en un mundo con faltas, {q∨¬q} no es verdadera.' }),
    A('Pero la identidad lo implica todo', 'K4', [], 'p→(q→q)', {
      outro: 'Válida en K4: como {q→q} vale en todo mundo, cualquier cosa la implica.' }),
    T('Otra vez los mundos no normales', [
      { say: 'Si A es válida en K4, también lo es {B→A}. Así, «si todas las instancias de la ley de identidad fallaran, si las vacas fueran negras, serían negras» resulta verdadero. Suena mal: si la ley fallara, precisamente no sería así.' },
      { say: 'Para hacerle justicia hay que considerar mundos donde las leyes de la lógica son otras: los <b>mundos no normales</b> del capítulo 4. Y las leyes de la lógica las expresan los condicionales. Así que en un mundo no normal, {A→B} puede tomar cualquier valor, como las fórmulas modales en L.' },
      { say: 'En <b>N4</b>, una interpretación es ⟨W, N, ρ⟩, y en los mundos no normales ρ decide directamente los valores de {A→B}. La validez conserva la verdad en los mundos normales. En los árboles, las reglas del condicional solo se aplican en el mundo 0.',
        fig: tab('N4', [], '¬(p→p)→(q→q)', 'El árbol termina enseguida: en el mundo 1, que no es normal, no hay reglas para →.') }
    ]),
    A('La identidad, sin garantía', 'N4', [], '¬(p→p)→(q→q)', {
      outro: 'Inválida en N4: en un mundo no normal puede fallar {q→q}.' }),
    A('La transitividad sigue', 'N4', ['p→q', 'q→r'], 'p→r', { outro: 'Válida en N4: todo ocurre en el mundo 0.' }),
    T('Con estrella', [
      { say: 'Lo mismo se hace con la semántica de la estrella: {A→B} es verdadera en w si en todo mundo donde vale A, vale B. La lógica es <b>K*</b>. No hacen falta reglas para el condicional negado: la estrella se encarga.' },
      { say: 'En los árboles, {A→B,+x} abre {A,−y} | {B,+y} para cada y de la forma j o j#, y {A→B,−x} crea un j nuevo con {A,+j} y {B,−j}. Si en la rama está j o j#, hay que aplicarlo a los dos.' },
      { say: 'Con mundos no normales se obtiene <b>N*</b>, con las reglas de → solo en 0. Ya no hay equivalencia entre las dos semánticas: K* valida la contraposición y la relacional no; la relacional valida {p∧¬q ⊢ ¬(p→q)} y K* no.' }
    ]),
    A('Contraposición con estrella', 'K*', ['p→q'], '¬q→¬p', { outro: 'Válida en K*: la estrella hace que la contraposición funcione.' }),
    A('Un condicional negado', 'K*', ['p∧¬q'], '¬(p→q)', {
      outro: 'Inválida en K*. En la semántica relacional, en cambio, sería válida.' }),
    T('Mundos imposibles y relevancia', [
      { say: 'Los mundos no normales de este capítulo son mundos donde las leyes lógicas son otras: <b>mundos lógicamente imposibles</b>. Si hay mundos físicamente imposibles, con otras leyes físicas, ¿por qué no lógicamente imposibles?' },
      { say: 'Los usamos al evaluar «si la lógica intuicionista fuera correcta, la doble negación fallaría» (verdadero) o «…, la ley de identidad fallaría» (falso). Y en ellos puede pasar lo imposible: que valgan A y {A→C} sin que valga C.' },
      { say: 'Una lógica es <b>relevante</b> si, cuando {A→B} es válida, A y B comparten alguna letra. El material, el estricto y el intuicionista no lo son, ni K4 ni K*. Pero <b>N4 y N* sí</b>: la relevancia cae sola, por tener en cuenta suficientes situaciones.', mood: 'think' },
      { say: 'Otras lógicas «filtro» exigen la validez clásica más algo, como compartir letras. Pero entonces vale {(p∧(¬p∨q))→q}, que aquí no vale, y suele fallar la transitividad de la consecuencia. Aquí la relevancia no es un añadido: sale de la semántica.' }
    ]),
    Q('Relevancia', [
      { q: 'Una lógica es relevante si toda {A→B} válida…', opts: ['tiene A verdadera', 'tiene A y B con alguna letra en común', 'es una tautología clásica'], ok: 1, why: 'Es el criterio de compartir variables.' },
      { q: '¿Cuál de estas es relevante?', opts: ['K4', 'N4', 'el condicional estricto de S5'], ok: 1, why: 'Los mundos no normales impiden que una verdad lógica sea implicada por cualquier cosa.' },
      { q: 'En un mundo lógicamente imposible…', opts: ['nada es verdadero', 'puede fallar el modus ponens', 'todo es verdadero'], ok: 1, why: 'A y {A→C} pueden valer allí sin que valga C.' }
    ]),
    T('Negación construible', [
      { say: 'Última familia: tomar la lógica intuicionista sin negación y añadirle otra negación, que trate verdad y falsedad por igual. Las interpretaciones son ⟨W, R, ρ⟩ con R reflexiva y transitiva y <b>herencia</b> para la verdad y para la falsedad de las letras.' },
      { say: 'El condicional {A⊐B} es verdadero en w si en todo mundo accesible donde A es verdadera, B también. Y es falso en w si A es verdadera y B falsa <i>en w</i>: hay que poder <b>construir</b> el contraejemplo. La lógica es <b>I4</b>; con la exclusión de K3, <b>I3</b> (de Nelson).',
        fig: tab('I4', [], '¬¬p⊐p') },
      { say: 'Sin negación, I4 e I3 coinciden con la intuicionista. Con negación difieren: en I4 vale {¬¬A⊐A}, que en la intuicionista no vale.' }
    ]),
    A('Doble negación construible', 'I4', [], '¬¬p⊐p', { outro: 'Válida en I4: la negación construible es involutiva.' }),
    A('Sin explosión', 'I4', [], '(p∧¬p)⊐q', { outro: 'Inválida en I4.' }),
    A('Con exclusión', 'I3', [], '(p∧¬p)⊐q', { outro: 'Válida en I3: el cierre de K3 la recupera.' }),
    T('Lógicas conexivas', [
      { say: 'Cambiemos en I4 la falsedad del condicional: {A⊐B} es falso si {A⊐¬B} es verdadero. En los árboles, {¬(A⊐B),±i} da {A⊐¬B,±i}. La lógica es <b>W</b>, de Wansing.' },
      { say: 'W valida dos principios clásicamente inválidos. <b>Aristóteles</b>: {¬(A⊐¬A)}, nada implica su propia negación. <b>Boecio</b>: {(A⊐B)⊐¬(A⊐¬B)}. Quien los valida es una lógica <b>conexiva</b>.' },
      { say: 'Las conexivas son las únicas del libro que no son sublógicas de la clásica: hay instancias de esos principios que son contradicciones clásicas. Y W tiene una rareza: sus verdades lógicas son inconsistentes, porque también vale {(p∧¬p)⊐¬(p∧¬p)}.', mood: 'think' }
    ]),
    A('El principio de Aristóteles', 'W', [], '¬(p⊐¬p)', { outro: 'Válida en W: nada implica su propia negación.' }),
    A('El principio de Boecio', 'W', [], '(p⊐q)⊐¬(p⊐¬q)', { outro: 'Válida en W.' }),
    A('Aristóteles en I4', 'I4', [], '¬(p⊐¬p)', { outro: 'Inválida en I4: hace falta el cambio de Wansing.' }),
    A('Jefe del bosque', 'W', [], '(p∧¬p)⊐¬(p∧¬p)', { boss: true,
      intro: 'Una verdad lógica de W que contradice el principio de Aristóteles.',
      outro: '¡Válida en W! Sus verdades lógicas son inconsistentes.' }),
    V('La máquina de algas', { sys: ['K4', 'N4', 'K*', 'N*', 'I4', 'I3', 'W'], syms: '¬∧∨→⊐', goals: ['valid', 'invalid', 'split'],
      intro: 'Prueba condicionales en las lógicas de este capítulo. Usa {→} en K4, N4, K* y N*, y {⊐} en I4, I3 y W.',
      outro: 'Las de mundos no normales son relevantes.',
      ex: [[[], 'p→(q→q)', 'valid', 'K4'], [[], 'p→(q→q)', 'invalid', 'N4'], [['p→q'], '¬q→¬p', 'valid', 'K*'], [['p→q'], '¬q→¬p', 'invalid', 'K4'], [[], '¬(p⊐¬p)', 'valid', 'W'], [[], '(p∧¬p)⊐q', 'invalid', 'I4']] })
  ]
});
})(window.CONTENT);
