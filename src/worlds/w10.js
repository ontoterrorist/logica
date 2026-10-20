/* Capítulo 10 · Lógicas relevantes (B, DW, R…; CB) */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 10, num: '10', name: 'Fosa Relevante', logic: 'Lógicas relevantes con relación ternaria: B, sus extensiones y R', badge: 'R',
  intro: 'En la fosa, la información viaja de tres en tres: un mundo lleva lo que vale en otro hasta un tercero. Con esa relación ternaria se construyen las lógicas relevantes más conocidas.',
  stages: [
    T('Una relación de tres lugares', [
      { say: 'N4 y N* son relevantes, pero débiles: no validan principios del condicional que muchos consideran correctos. La idea de este capítulo: dar las condiciones del {→} en los mundos no normales con una relación <b>ternaria</b>, Rxyz.' },
      { say: 'Intuitivamente, Rxyz dice: si {A→B} vale en x y A vale en y, entonces B vale en z. (Con una relación binaria se perdería la relevancia: {p→p} valdría en todo mundo y {q→(p→p)} sería válida.)' },
      { say: 'Una interpretación ternaria es ⟨W, N, R, *, ν⟩, como las de N* más R. En los mundos normales, {A→B} es verdadera si en todo mundo donde vale A vale B. En los no normales: si para todos x, y con Rwxy, cuando vale A en x vale B en y. La validez se mide en los normales. Esta lógica es <b>B</b> (por «básica»).' },
      { say: 'Truco: si en un mundo normal w ponemos Rwxy exactamente cuando x = y (la <b>condición de normalidad</b>), la condición ternaria vale en todos los mundos. En los árboles eso da líneas {r0xx} para todo x.' }
    ]),
    T('Árboles para B', [
      { say: 'Los árboles de B son los de N*, con nodos {A,±x} (x es i o i#) y nodos {rxyz}. Las reglas del condicional:',
        fig: rule(r(['{A→B,+x}', 'rxyz'], [['{A,−y}'], ['{B,+z}']]), r(['{A→B,−x}'], [['rxjk', '{A,+j}', '{B,−k}']], 'j y k nuevos; si x es 0, j = k')) },
      { say: 'Y la regla de normalidad: {r0xx} para cada x de la rama. El libro aconseja no escribir esas líneas, que llenan todo, y recordar que están al aplicar {A→B,+0}. En el juego son implícitas: en el mundo 0, {A→B,+0} se aplica a cada mundo x, uno por vez, eligiéndolo tú.',
        fig: tab('B', ['p→q'], '(q→r)→(p→r)', 'El sufijo: la regla de {p→q,+0} sirve con el mundo 2, y la de {q→r,+1} con r123.') },
      { say: 'Del mundo 0 solo sale {r0xx}; de los demás mundos, solo lo que diga la rama. En el contramodelo, solo w0 es normal, y las tríadas de R se muestran debajo del dibujo.' }
    ]),
    A('El sufijo', 'B', ['p→q'], '(q→r)→(p→r)', {
      intro: 'Al aplicar una línea {→,+0} te preguntaré a qué mundo. Elige el que permita cerrar.',
      outro: 'Válida en B: es el sufijo, R4.' }),
    A('El prefijo', 'B', ['p→q'], '(r→p)→(r→q)', { outro: 'Válida en B: es el prefijo, R3.' }),
    A('Modus ponens relevante', 'B', ['p', 'p→q'], 'q', { outro: 'Válida en B: es la regla R1.' }),
    A('Identidad', 'B', [], 'p→p', { outro: 'Válida en B: el axioma A1.' }),
    A('Doble negación', 'B', [], '¬¬p→p', { outro: 'Válida en B: el axioma A7, gracias a la estrella.' }),
    A('Contraposición como regla', 'B', ['p→¬q'], 'q→¬p', { outro: 'Válida en B: la regla R5.' }),
    A('Sin aserción', 'B', [], 'p→((p→q)→q)', {
      outro: 'Inválida en B: el mundo 2 hace verdadera {p→q} porque no ve nada, y aun así {q} falla en 3.' }),
    A('Sin paradojas', 'B', [], 'q→(p→p)', {
      outro: 'Inválida en B: la relevancia exige que antecedente y consecuente compartan letras, y aquí además {p→p} puede fallar en un mundo no normal.' }),
    A('Ni explosión', 'B', [], '(p∧¬p)→q', { outro: 'Inválida en B.' }),
    T('Axiomas y reglas de B', [
      { say: 'B se suele presentar con axiomas. Todas estas formas son válidas en B, y estas reglas conservan la validez:',
        fig: table(['Axioma', 'Forma'], [['A1', '{A→A}'], ['A2', '{A→(A∨B)}'], ['A3', '{(A∧B)→A}'], ['A4', '{A∧(B∨C)→((A∧B)∨(A∧C))}'], ['A5', '{((A→B)∧(A→C))→(A→(B∧C))}'], ['A6', '{((A→C)∧(B→C))→((A∨B)→C)}'], ['A7', '{¬¬A→A}']], { tight: true }) },
      { say: 'Reglas: R1 (de {A} y {A→B}, {B}), R2 (de {A} y {B}, {A∧B}), R3 el prefijo, R4 el sufijo y R5 la contraposición. Todo, salvo A5, A6, R3 y R4, vale ya en N*. Lo típico de B es el <b>afijo</b> (prefijo y sufijo).' },
      { say: 'En un sistema axiomático, una <b>deducción</b> es una lista de fórmulas, cada una axioma, premisa o consecuencia de las anteriores por una regla. Por ejemplo, {C→¬¬C} sale de A1, {¬C→¬C}, aplicando R5.' }
    ]),
    A('El axioma A5', 'B', [], '((p→q)∧(p→r))→(p→(q∧r))', { outro: 'Válida en B, aunque no en N*.' }),
    T('Extensiones de B', [
      { say: 'Como con K, se obtienen lógicas más fuertes poniendo condiciones a R (a veces con la estrella). Cada condición valida un axioma nuevo:',
        fig: table(['Condición', 'Axioma que valida'], [['C8: si Rabc, entonces Rac*b*', 'A8 {(A→¬B)→(B→¬A)}'], ['C9', 'A9 {(A→B)→((B→C)→(A→C))}'], ['C10', 'A10 {(A→B)→((C→A)→(C→B))}'], ['C11', 'A11 {(A→(A→B))→(A→B)}'], ['C12 (con orden de contenido)', 'A12 {A→((A→B)→B)}'], ['C13', 'A13 {A∨¬A}']], { tight: true }) },
      { say: 'Los sistemas tienen nombres poco sistemáticos: DW = B + A8; TW = DW + A9 + A10; RW = TW + A12; <b>R</b> = RW + A11; RM = R + A16. Para la mayoría, los árboles son correctos y completos, pero enormes e infinitos en cuanto hay mundos nuevos. En el juego tienes B y <b>DW</b>, con la regla C8: de {rxyz} pasa a {rx z̄ ȳ}.' }
    ]),
    A('Contraposición en B', 'B', [], '(p→¬q)→(q→¬p)', { outro: 'Inválida en B: como axioma, A8 no vale.' }),
    A('Contraposición en DW', 'DW', [], '(p→¬q)→(q→¬p)', {
      intro: 'Usa la regla <b>C8</b> del panel cuando aparezca una línea {rxyz}.',
      outro: 'Válida en DW: la condición C8 la hace válida.' }),
    T('El sistema R', [
      { say: '<b>R</b> es la más conocida de las relevantes, y no tiene procedimiento de decisión. A veces un argumento semántico basta: así se prueba la <b>permutación</b>, de {A→(B→C)} a {B→(A→C)}.' },
      { say: 'Otras veces conviene deducir. En R valen la <i>consequentia mirabilis</i>, {(A→¬A)→¬A}, y el tercio excluso, {A∨¬A}. De hecho, en R vale toda tautología clásica escrita con ∧, ∨, ¬ y ⊃.' },
      { say: 'Para mostrar que algo <b>no</b> vale en R se usan lógicas multivaluadas: todo lo válido en R lo es en RM3, así que lo que falla en RM3 falla en R. Y con una lógica de ocho valores se prueba que R es relevante: si A y B no comparten letras, {A→B} puede tomar el valor 0.' }
    ]),
    Q('Relevantes', [
      { q: 'En B, ¿cómo se evalúa {A→B} en un mundo no normal w?', opts: ['como en S5', 'con la relación ternaria: para todo Rwxy, si A en x, B en y', 'se le da un valor arbitrario'], ok: 1, why: 'Esa es la novedad respecto de N*, donde el valor era arbitrario.' },
      { q: 'El principio distintivo de B frente a N* es…', opts: ['el afijo (prefijo y sufijo)', 'el tercio excluso', 'la explosión'], ok: 0, why: 'R3 y R4 valen en B y no en N*.' },
      { q: '¿Qué condición añade DW a B?', opts: ['C8', 'C11', 'C13'], ok: 0, why: 'Y con ella vale la contraposición como axioma, A8.' },
      { q: 'Para mostrar que algo no vale en R, conviene…', opts: ['un árbol de B', 'una lógica multivaluada como RM3', 'la lógica clásica'], ok: 1, why: 'R es una sublógica de RM3.' }
    ]),
    T('¿Qué es la relación ternaria?', [
      { say: '¿Qué significa Rxyz? La respuesta más prometedora habla de <b>información</b>. Si los mundos son estados de información, Rxyz podría decir que z contiene lo que se obtiene juntando x e y. Eso explica bien las condiciones del {→}.' },
      { say: 'Pero justifica demasiado: si juntar información conserva lo que había en y, cualquier A verdadera en y lo sería en z, {A→A} valdría en todos los mundos y {B→(A→A)} sería válida. Adiós relevancia.', mood: 'think' },
      { say: 'Otra idea: los mundos son <b>conductos</b> de información. Una huella fósil lleva información de la situación donde se hizo a aquella donde se encuentra. Rxyz: x lleva la información de y a z. Pero la metáfora no es transparente, y puede volver a romper la relevancia.' }
    ]),
    T('Entimemas relevantes', [
      { say: 'Las lógicas relevantes evitan las paradojas del material y del estricto, y las inferencias de 1.9: son buenas candidatas para el condicional. ¿Y el condicional ceteris paribus? El {>} del capítulo 5 no es relevante: valida {p>(q∨¬q)}.' },
      { say: 'Basta reproducir el capítulo 5 sobre B: se añaden las relaciones R<sub>A</sub> y la condición f<sub>A</sub>(w) ⊆ [B]. La lógica es <b>CB</b>; con las condiciones de C⁺ solo en los mundos normales, <b>CB⁺</b>.' },
      { say: 'Si la condición (1) valiera en todos los mundos, {A>A} sería verdad en todos y {B>(A>A)} sería válida: otra vez irrelevancia. CB⁺ no tiene las paradojas del estricto, y su {>} es relevante.' },
      { say: 'Esto da otra respuesta al uso del silogismo disyuntivo: en contexto, se puede aceptar {(p∧¬(p∨q))>q}, si los mundos que importan para ese antecedente son todos consistentes.', mood: 'think' }
    ]),
    A('Debilitar el consecuente', 'CB', ['p>q'], 'p>(q∨r)', { outro: 'Válida en CB.' }),
    A('Sin explosión ceteris paribus', 'CB+', [], '(p∧¬p)>q', { outro: 'Inválida en CB⁺: hay mundos de {p∧¬p} donde {q} no es verdadera.' }),
    A('Jefe de la fosa', 'CB+', ['p', 'p>q'], 'q', { boss: true,
      intro: 'Modus ponens para el entimema relevante. Usa el centrado en 0 (el botón CB+).',
      outro: '¡Válida en CB⁺!' }),
    V('La máquina relevante', { sys: ['B', 'DW', 'N*', 'K*', 'CB', 'CB+'], syms: '¬∧∨→>', goals: ['valid', 'invalid', 'split'],
      intro: 'Árboles con relación ternaria y estrella. Compara B con DW, N* y K*.',
      outro: 'B extiende propiamente a N*, y K* extiende a B.',
      ex: [[['p→q'], '(q→r)→(p→r)', 'valid', 'B'], [['p→q'], '(q→r)→(p→r)', 'invalid', 'N*'], [[], '(p→¬q)→(q→¬p)', 'valid', 'DW'], [[], 'p→((p→q)→q)', 'invalid', 'B'], [[], 'q→(p→p)', 'valid', 'K*'], [[], 'q→(p→p)', 'invalid', 'B']] })
  ]
});
})(window.CONTENT);
