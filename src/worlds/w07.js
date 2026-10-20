/* Capítulo 7 · Lógicas multivaluadas (K3, Ł3, LP, RM3) */
(function (C) {
const { T, Q, M, TT, V, table } = C;
const TAB3 = (op, rows) => table([op, '1', 'i', '0'], rows, { tight: true });
C.world({
  ord: 7, num: '7', name: 'Mar de Tres Colores', logic: 'Lógicas multivaluadas: K3, Ł3, LP y RM3', badge: '½',
  intro: 'En este mar el agua tiene tres capas: lo verdadero, lo falso y lo de en medio. Aquí no hay árboles: el libro trata estas lógicas con tablas. Los árboles llegarán en el capítulo 8.',
  stages: [
    T('La estructura general', [
      { say: 'La lógica clásica puede verse como un trío ⟨V, D, {f<sub>c</sub>}⟩: V es el conjunto de valores {1, 0}; D, los valores <b>designados</b>, {1}, los que la validez conserva; y cada conectiva c denota una función de verdad f<sub>c</sub>.' },
      { say: 'Una lógica <b>multivaluada</b> generaliza eso: V puede tener más valores, D es un subconjunto de V, y cada conectiva tiene su tabla. Una inferencia es válida si ninguna interpretación da a las premisas valores designados y a la conclusión uno no designado.' },
      { say: 'Si V es finito, la validez se decide revisando todos los casos. Pero crecen rápido: con m letras y n valores hay nᵐ casos. Con cuatro valores y cuatro letras ya son 256. Por eso a veces conviene razonar hacia atrás, desde la conclusión no designada.', mood: 'think' }
    ]),
    T('Kleene y Łukasiewicz', [
      { say: 'Primer ejemplo: V = {1, i, 0}, donde i es <b>ni verdadero ni falso</b>, y D = {1}. Las tablas se calculan así: si con lo que se sabe ya se decide el valor clásico, se pone ese; si no, i. Esta lógica es <b>K3</b>, la de Kleene (la fuerte).',
        fig: [TAB3('{¬}', [['', '0', 'i', '1']]), TAB3('{∧}', [['1', '1', 'i', '0'], ['i', 'i', 'i', '0'], ['0', '0', '0', '0']]), TAB3('{∨}', [['1', '1', '1', '1'], ['i', '1', 'i', 'i'], ['0', '1', 'i', '0']]), TAB3('{⊃} K3', [['1', '1', 'i', '0'], ['i', '1', 'i', 'i'], ['0', '1', '1', '1']])] },
      { say: 'Con valores clásicos, las tablas dan lo clásico. Lo distintivo de K3: falla el tercio excluso, {p∨¬p} (basta {p} = i). De hecho, K3 no tiene ninguna verdad lógica: ni siquiera {p⊃p}.' },
      { say: 'Łukasiewicz cambió una sola casilla: i ⊃ i vale 1. Así {A⊃A} siempre vale 1. La lógica resultante es <b>Ł3</b>.',
        fig: TAB3('{⊃} Ł3', [['1', '1', 'i', '0'], ['i', '1', '1', 'i'], ['0', '1', '1', '1']]) }
    ]),
    TT('Contraposición en K3', 'K3', ['p⊃q', '¬q⊃¬p'], {
      intro: 'Nueve filas: tres valores para cada letra. Toca cada casilla para recorrer 1, i y 0.',
      outro: 'Las columnas coinciden, así que donde la premisa vale 1, la conclusión también: {p⊃q ⊢ ¬q⊃¬p} es válida en K3.' }),
    M('Sin tercio excluso', 'K3', [], 'p∨¬p', {
      intro: 'Encuentra un valor de {p} que deje {p∨¬p} sin designar.',
      outro: 'Con {p} = i, {p∨¬p} vale i: no está designada.' }),
    M('Ni la identidad', 'K3', [], 'p⊃p', {
      intro: 'En K3, ¿también falla {p⊃p}?',
      outro: 'Sí: con {p} = i, {p⊃p} vale i. K3 no tiene verdades lógicas.' }),
    TT('El condicional de Łukasiewicz', 'Ł3', ['p⊃p', 'p⊃q'], {
      intro: 'Calcula con la tabla de Ł3: la única diferencia está en i ⊃ i.',
      outro: 'La columna de {p⊃p} es todo 1: en Ł3 la ley de identidad vale.' }),
    M('Un consecuente tautológico', 'Ł3', [], 'p⊃(q∨¬q)', {
      outro: 'Con {p} = 1 y {q} = i, el consecuente vale i y el condicional también. Inválida en Ł3.' }),
    T('LP y RM3', [
      { say: '<b>LP</b> (la lógica de la paradoja) tiene las mismas tablas que K3, pero D = {1, i}. Ahora i se lee <b>verdadero y falso a la vez</b>: un exceso, no una falta. Y 1 y 0 son «solo verdadero» y «solo falso».' },
      { say: 'El cambio de designados lo cambia todo. En LP vale {p∨¬p}: siempre toma 1 o i. Pero falla la explosión: {p∧¬p ⊢ q} (con {p} = i y {q} = 0). Por eso LP es <b>paraconsistente</b>.' },
      { say: 'El precio: en LP falla el modus ponens. Con {p} = i y {q} = 0, {p} y {p⊃q} están designadas y {q} no. <b>RM3</b> lo arregla cambiando la tabla del condicional:',
        fig: TAB3('{⊃} RM3', [['1', '1', '0', '0'], ['i', '1', 'i', '0'], ['0', '1', '1', '1']]) }
    ]),
    M('Explosión en LP', 'LP', ['p∧¬p'], 'q', {
      intro: 'Haz que la contradicción quede designada y la conclusión no.',
      outro: 'Con {p} = i y {q} = 0: inválida. Una contradicción no lo implica todo.' }),
    M('Modus ponens en LP', 'LP', ['p', 'p⊃q'], 'q', {
      outro: 'Inválida en LP: es el silogismo disyuntivo disfrazado, porque {p⊃q} es {¬p∨q}.' }),
    TT('La tabla de RM3', 'RM3', ['p⊃q', '¬p∨q'], {
      intro: 'En RM3, {p⊃q} ya no es lo mismo que {¬p∨q}. Compara las columnas.',
      outro: 'Difieren en dos filas: cuando {p} = 1 y {q} = i, y cuando {p} = i y {q} = 0. Ahora, si {p} y {p⊃q} están designadas, {q} también.' }),
    M('Transitividad en LP', 'LP', ['p⊃q', 'q⊃r'], 'p⊃r', {
      outro: 'Inválida en LP: con {q} = i hay un puente que no conduce. Pista para la próxima: razona hacia atrás, con la conclusión en 0.' }),
    T('Condicionales con tres valores', [
      { say: 'Hagamos balance con las inferencias problemáticas de los capítulos anteriores. Las cuatro lógicas comparten casi todas las del condicional material. K3 y Ł3 sufren además problemas del estricto: aunque {(p∧¬p)⊃q} no sea válida, una contradicción no puede estar designada, así que lo implica todo.',
        fig: table(['Inferencia', 'K3', 'Ł3', 'LP', 'RM3'], [['{q ⊢ p⊃q}', 'sí', 'sí', 'sí', 'no'], ['{¬(p⊃q) ⊢ p}', 'sí', 'sí', 'sí', 'sí'], ['{p⊃q, q⊃r ⊢ p⊃r}', 'sí', 'sí', 'no', 'sí'], ['{⊢ p⊃(q∨¬q)}', 'no', 'no', 'sí', 'no'], ['{⊢ (p∧¬p)⊃q}', 'no', 'no', 'sí', 'no']], { tight: true }) },
      { say: 'Hay una razón general para que el condicional de toda lógica con finitos valores falle. Pidamos dos cosas razonables: que si A está designada también lo esté {A∨B}, y que si A y B tienen el mismo valor, {A≡B} esté designada.' },
      { say: 'Con n valores, toma n+1 letras. Dos tienen que coincidir, así que algún {pⱼ≡pₖ} está designado, y la disyunción de todos esos bicondicionales es válida. Pero «Juan tiene 1 pelo», «Juan tiene 2 pelos»… no son equivalentes entre sí: esa disyunción debería ser falsa.', mood: 'think' }
    ]),
    Q('Tres valores', [
      { q: '¿Qué diferencia a LP de K3?', opts: ['las tablas', 'los valores designados', 'el número de valores'], ok: 1, why: 'Las tablas son las mismas; en LP también i está designado.' },
      { q: '¿En cuál vale {p∨¬p}?', opts: ['K3', 'Ł3', 'LP'], ok: 2, why: 'En LP, {p∨¬p} siempre vale 1 o i, y ambos están designados.' },
      { q: '¿Qué casilla cambia Ł3 respecto de K3?', opts: ['1 ⊃ i', 'i ⊃ i', 'i ⊃ 0'], ok: 1, why: 'Pasa de i a 1, y con eso {A⊃A} vale siempre 1.' },
      { q: '¿Por qué en K3 una contradicción lo implica todo?', opts: ['porque {(p∧¬p)⊃q} es válida', 'porque {p∧¬p} nunca vale 1', 'porque vale el silogismo disyuntivo'], ok: 1, why: 'Nunca está designada, así que no hay contraejemplo.' }
    ]),
    T('Excesos: leyes y paradojas', [
      { say: '¿Por qué creer en excesos de verdad, cosas verdaderas y falsas a la vez? Primero, las <b>leyes inconsistentes</b>. Imagina una constitución con dos cláusulas: «ningún aborigen votará» y «todo propietario votará». Cuando un aborigen llega a ser propietario, tiene y no tiene derecho a voto.' },
      { say: 'Se dirá que el derecho tiene principios para resolver contradicciones: la ley posterior prima, la de mayor rango prima. Pero puede que ninguno se aplique: ambas cláusulas del mismo día y del mismo rango. Mientras la ley no cambie, la contradicción es verdadera.' },
      { say: 'Segundo, las <b>paradojas de autorreferencia</b>. El mentiroso: «esta oración es falsa». Si es verdadera, es falsa; si es falsa, es verdadera. Russell: el conjunto de los conjuntos que no se pertenecen se pertenece si y solo si no se pertenece.' },
      { say: '¿Y si el mentiroso no es ni verdadero ni falso? Eso rompe el razonamiento, que usaba el tercio excluso. Pero vuelve la <b>paradoja reforzada</b>: «esta oración es falsa o ni verdadera ni falsa». Si es verdadera, no lo es; y si no lo es, lo es.', mood: 'think' }
    ]),
    T('Faltas: lo que no denota y el futuro', [
      { say: '¿Y las faltas, oraciones ni verdaderas ni falsas? Un motivo son los nombres que no denotan. Frege pensó que toda oración con ellos carecía de valor, pero «Sherlock Holmes no existe» parece verdadera.' },
      { say: 'Algunos casos sí convencen: «Holmes tenía tres tías solteras» no es verdadera ni falsa en la ficción, porque Conan Doyle no dice nada. Aunque se puede leer todo como «en las novelas, es el caso que…», y entonces son simplemente falsas. Esa fue, en esencia, la idea de Russell.' },
      { say: 'Otro motivo son los <b>futuros contingentes</b>: «el primer papa del siglo XXII será chino» no tendría hoy valor, porque el futuro no existe. Aristóteles argumentó: si fuera verdadera ya, ocurriría necesariamente; pero lo futuro es contingente.' },
      { say: 'La respuesta habitual: el argumento juega con una ambigüedad. «Si A, necesariamente B» puede ser {□(A⊃B)} o {A⊃□B}. Con la primera, que es verdadera, el argumento no es válido; con la segunda es válido, pero no hay razón para creer la premisa.', mood: 'think' }
    ]),
    Q('Excesos y faltas', [
      { q: 'La paradoja reforzada del mentiroso muestra que…', opts: ['las faltas de valor no evitan la contradicción', 'el mentiroso no tiene sentido', 'K3 es inconsistente'], ok: 0, why: '«Esta oración es falsa o ni verdadera ni falsa» lleva a que es y no es verdadera.' },
      { q: 'Para Russell, «el mayor número entero es par» es…', opts: ['ni verdadera ni falsa', 'falsa', 'verdadera y falsa'], ok: 1, why: 'Las descripciones que no denotan hacen falsas las oraciones simples que las contienen.' },
      { q: 'El argumento de Aristóteles sobre el futuro confunde…', opts: ['{□(A⊃B)} con {A⊃□B}', '{A∨¬A} con {A∧¬A}', 'pasado con presente'], ok: 0, why: 'Es una ambigüedad de alcance del operador de necesidad.' }
    ]),
    T('Supervaluaciones', [
      { say: 'Una técnica mejor para las faltas: la <b>supervaluación</b>. Dada una interpretación de K3, una <b>resolución</b> rellena cada i con 1 o con 0. A es verdadera en la supervaluación si es verdadera en todas las resoluciones; falsa si lo es en todas; i si no.' },
      { say: 'Con esto, {p∨¬p} es «supervaliosa» aunque {p} no sea verdadera ni falsa: se resuelva como se resuelva, sale 1. De hecho, la validez por supervaluación coincide exactamente con la clásica.' },
      { say: 'Pero no del todo: con varias conclusiones, de {A∨B} no se sigue que valga A o valga B: {p∨¬p} es superverdadera y ni {p} ni {¬p} lo son. Para LP hay una técnica gemela, la <b>subvaluación</b>, donde falla {A, B ⊢ A∧B}.' },
      { say: 'Łukasiewicz construyó Ł3 pensando en los futuros contingentes: lo verdadero o falso ahora sería necesario o imposible, y el valor i sería «meramente posible». Le dio a {◇} una tabla: 1 ↦ 1, i ↦ 1, 0 ↦ 0.', mood: 'think' }
    ]),
    Q('Rellenar los huecos', [
      { q: 'La validez por supervaluación coincide con…', opts: ['K3', 'la lógica clásica', 'LP'], ok: 1, why: 'Toda resolución es una valuación clásica.' },
      { q: 'Si {p} vale i, ¿cuánto vale {p∨¬p} en la supervaluación?', opts: ['1', 'i', '0'], ok: 0, why: 'En cada resolución, una de las dos disyuntas es verdadera.' },
      { q: 'En la supervaluación, ¿qué deja de valer con varias conclusiones?', opts: ['{A∨B ⊢ A, B}', '{A ⊢ A∨B}', '{A∧B ⊢ A}'], ok: 0, why: 'La disyunción puede ser superverdadera sin que lo sea ninguna disyunta.' }
    ]),
    V('La máquina de tablas', { mv: true, sys: ['K3', 'Ł3', 'LP', 'RM3', 'CL'], syms: '¬∧∨⊃≡', goals: ['valid', 'invalid', 'gap'], cmp: 'CL',
      intro: 'Esta máquina no hace árboles: revisa todas las valuaciones con tres valores. Busca una inferencia clásica que falle en alguna de estas lógicas.',
      outro: 'Con finitos valores, la validez siempre es decidible por tablas.',
      ex: [[[], 'p∨¬p', 'invalid', 'K3'], [[], 'p∨¬p', 'valid', 'LP'], [['p∧¬p'], 'q', 'valid', 'K3'], [['p∧¬p'], 'q', 'invalid', 'LP'], [['p', 'p⊃q'], 'q', 'valid', 'RM3'], [[], 'p⊃p', 'valid', 'Ł3']] })
  ]
});
})(window.CONTENT);
