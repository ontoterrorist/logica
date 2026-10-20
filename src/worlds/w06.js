/* Capítulo 6 · Lógica intuicionista */
(function (C) {
const { T, Q, A, V, table, tab, rule, r, kripke } = C;
C.world({
  ord: 6, num: '6', name: 'Gruta de los Constructores', logic: 'Lógica intuicionista', badge: '⊐',
  intro: 'En esta gruta nada vale hasta que alguien lo construye. La verdad es demostración, y lo demostrado no se pierde: la lógica intuicionista, con sus propios árboles de signo + y −.',
  stages: [
    T('Por qué intuicionismo', [
      { say: 'Entendemos oraciones que nunca hemos oído porque entendemos sus partes y cómo se combinan: el significado es <b>composicional</b>. La visión ortodoxa, de Frege, dice que el significado de una oración son sus <b>condiciones de verdad</b>.' },
      { say: 'Pero la verdad, así entendida, es una relación con una realidad exterior al lenguaje. ¿Qué realidad hace verdadero «2 + 3 = 5»? Los realistas matemáticos hablan de objetos que existen por sí mismos; a los <b>intuicionistas</b> eso les pareció misticismo.' },
      { say: 'Su propuesta: el significado lo dan las <b>condiciones de prueba</b>, donde una prueba es una construcción mental. Para no confundir, escribimos la negación y el condicional intuicionistas como {¬} y {⊐}.',
        fig: table(['Una prueba de…', 'es…'], [['{A∧B}', 'una prueba de A y una prueba de B'], ['{A∨B}', 'una prueba de A o una prueba de B'], ['{¬A}', 'una prueba de que no hay prueba de A'], ['{A⊐B}', 'una construcción que convierte cualquier prueba de A en una de B']]) },
      { say: 'Con estas condiciones falla el <b>tercio excluso</b>. La conjetura de los primos gemelos (hay infinitos pares de primos separados por dos) no está probada, ni se ha probado que no se pueda probar. Así que no tenemos prueba de {A∨¬A}.', mood: 'think' }
    ]),
    T('Mundos que crecen', [
      { say: 'La semántica intuicionista usa interpretaciones como las de S4 (R reflexiva y transitiva) con una condición más, la <b>herencia</b>: si {p} vale en w y wRv, vale en v. Los mundos son estados de información y v es una posible ampliación de w.' },
      { say: 'Las condiciones: ∧ y ∨ como siempre, en cada mundo. {¬A} vale en w si A falla en todo mundo accesible. {A⊐B} vale en w si en todo mundo accesible, o falla A, o vale B. Es decir, {¬A} es como {□¬A} y {A⊐B} como {□(A⊃B)}.' },
      { say: 'Lo probado sigue probado: la herencia vale para todas las fórmulas, no solo para las letras. Y si {¬A} está probado, no hay ampliación donde se pruebe A. Una inferencia es válida si conserva la verdad en todo mundo de toda interpretación.' },
      { say: 'Con un solo mundo, las condiciones son las clásicas: la lógica intuicionista es una <b>sublógica</b> de la clásica. Restringiendo R se obtienen lógicas <b>intermedias</b>; la más conocida, LC, pide que R sea lineal.' }
    ]),
    T('Árboles intuicionistas', [
      { say: 'Ahora no basta con {¬A, i} para decir que A es falsa en i: puede fallar A sin que se haya probado {¬A}. Por eso los nodos llevan signo: {A, +i} (A vale en i) y {A, −i} (A no vale en i). La lista inicial: premisas con {+0}, conclusión con {−0}.' },
      { say: 'Una rama se cierra con {A, +i} y {A, −i}. Las reglas de ∧ y ∨ son las obvias. Las de {⊐} y {¬} miran a los mundos accesibles:',
        fig: rule(r(['{A⊐B, +i}', '{irj}'], [['{A, −j}'], ['{B, +j}']]), r(['{A⊐B, −i}'], [['{irj}', '{A, +j}', '{B, −j}']], 'j nuevo'), r(['{¬A, +i}', '{irj}'], [['{A, −j}']]), r(['{¬A, −i}'], [['{irj}', '{A, +j}']], 'j nuevo')) },
      { say: 'Además están ρ y τ, como en S4, y la regla de <b>herencia</b>: de {p, +i} e {irj}, {p, +j}, solo para letras. En el juego, ρ, τ y «her.» están en el panel de la relación.',
        fig: tab('I', [], 'p⊐¬¬p') },
      { say: 'Los contramodelos se leen así: un mundo por número, la relación de la rama, y {p} vale en w<sub>i</sub> si está {p, +i}. Lo demás es falso.' }
    ]),
    A('Doble negación, hacia adentro', 'I', [], 'p⊐¬¬p', {
      intro: 'Empieza con {⊐−}, luego ρ, τ y la herencia cuando haga falta.',
      outro: 'Válida: lo que se prueba no puede llegar a refutarse.' }),
    A('El tercio excluso', 'I', [], 'p∨¬p', {
      outro: 'Inválida: en un mundo donde {p} todavía no se prueba, pero puede probarse más adelante, no vale {p} ni {¬p}.' }),
    A('Del condicional a la disyunción', 'I', ['p⊐q'], '¬p∨q', {
      outro: 'Inválida intuicionistamente, aunque sí lo es en la lógica clásica.' }),
    A('Silogismo disyuntivo', 'I', ['p∨q', '¬p'], 'q', {
      outro: 'Válida: el silogismo disyuntivo se mantiene.' }),
    A('Doble negación, hacia afuera', 'I', [], '¬¬p⊐p', {
      intro: 'Este árbol no termina nunca: cada mundo nuevo pide otro. Cuando veas que la rama se repite, decláralo abierta: si el modelo que sale ya sirve, lo acepto.',
      outro: 'Inválida: basta un mundo w0 donde {p} no vale que vea a w1, donde sí vale. Ahí {¬p} falla en w0 y en w1, así que {¬¬p} vale en w0, y {p} no.' }),
    T('Los fundamentos', [
      { say: 'El argumento de 6.2 no es muy fuerte: aunque no haya objetos matemáticos, podríamos decir que una oración atómica es verdadera si es demostrable, y luego seguir con las condiciones clásicas para las conectivas. La lógica clásica quedaría intacta.' },
      { say: 'Michael Dummett dio un argumento más radical. Quien entiende una oración debe poder <b>manifestar</b> que la entiende, asintiendo justo cuando se dan sus condiciones. Pero las condiciones clásicas permiten que algo sea verdad sin que podamos reconocerlo nunca.' },
      { say: 'Si Dummett tiene razón, la lógica intuicionista sería la correcta para todo el lenguaje, no solo para la matemática. Pero se puede dudar: quizá parte del significado es innato, como piensa Chomsky de la gramática; o basta con asentir cuando el hecho es manifiesto y estar dispuesto a extender el uso a casos nuevos.', mood: 'think' }
    ]),
    T('El condicional intuicionista', [
      { say: 'El {⊐} tiene una mezcla curiosa de propiedades. Valida las paradojas del condicional material: {q ⊢ p⊐q} y {¬p ⊢ p⊐q}. Pero no las formas más dañinas del capítulo 1.9.',
        fig: table(['Inferencia', '¿Vale para ⊐?'], [['{q ⊢ p⊐q}', 'sí'], ['{(p∧q)⊐s ⊢ (p⊐s)∨(q⊐s)}', 'no'], ['{¬(p⊐q) ⊢ p}', 'no']]) },
      { say: 'Vale la contraposición, la transitividad y fortalecer el antecedente, así que no sirve para el condicional ceteris paribus del capítulo 5. Y vale {(p∧¬p)⊐q}: la explosión. Tampoco sirve como condicional ordinario.' },
      { say: 'Pero no vale {p⊐(q∨¬q)}, porque {q∨¬q} no es una verdad lógica: hay situaciones donde algo de esa forma falla. Esa idea, que una situación pueda ser <b>incompleta</b>, nos lleva al capítulo siguiente.', mood: 'think' }
    ]),
    A('La paradoja, otra vez', 'I', ['q'], 'p⊐q', {
      outro: 'Válida: por herencia, {q} vale en todo mundo accesible.' }),
    A('Los interruptores', 'I', ['(p∧q)⊐s'], '(p⊐s)∨(q⊐s)', {
      outro: 'Inválida: el {⊐} no cae en esta trampa del condicional material.' }),
    A('Contraposición', 'I', ['p⊐q'], '¬q⊐¬p', {
      outro: 'Válida en la lógica intuicionista.' }),
    A('Sin tercio excluso en el consecuente', 'I', [], 'p⊐(q∨¬q)', {
      outro: 'Inválida: {q∨¬q} puede fallar en un mundo.' }),
    A('Explosión intuicionista', 'I', [], '(p∧¬p)⊐q', {
      outro: 'Válida: ningún mundo accesible hace verdadera una contradicción.' }),
    Q('Construcciones', [
      { q: 'Para el intuicionismo, el significado de una oración lo dan sus…', opts: ['condiciones de verdad', 'condiciones de prueba', 'consecuencias prácticas'], ok: 1, why: 'Una prueba es una construcción mental; la verdad como correspondencia queda de lado.' },
      { q: '¿Qué condición tienen los modelos intuicionistas además de las de S4?', opts: ['la herencia', 'la simetría', 'la universalidad'], ok: 0, why: 'Lo que vale en un estado de información sigue valiendo en sus ampliaciones.' },
      { q: '¿Cuál de estas es válida intuicionistamente?', opts: ['{¬¬p⊐p}', '{p⊐¬¬p}', '{p∨¬p}'], ok: 1, why: 'La doble negación se introduce, pero no se elimina.' },
      { q: 'El argumento de Dummett se basa en que…', opts: ['los números no existen', 'quien entiende una oración debe poder manifestarlo', 'la lógica clásica es inconsistente'], ok: 1, why: 'Por eso, si funciona, vale para todo el lenguaje.' }
    ]),
    A('Jefe de la gruta', 'I', ['¬(p∨q)'], '¬p∧¬q', { boss: true,
      intro: 'Una ley de De Morgan. ¿Sobrevive en la gruta?',
      outro: '¡Válida! Esta mitad de De Morgan vale intuicionistamente; la otra, {¬(p∧q) ⊢ ¬p∨¬q}, no.' }),
    V('La máquina constructora', { sys: ['I', 'S4'], syms: '¬∧∨⊐⊃□◇', goals: ['valid', 'invalid', 'own'],
      intro: 'Prueba inferencias intuicionistas. Usa {⊐} y {¬}. Para comparar, también está S4.',
      outro: 'Cada inferencia intuicionista válida lo es también clásicamente, pero no al revés.',
      ex: [[[], 'p⊐¬¬p', 'valid', 'I'], [[], '¬¬p⊐p', 'invalid', 'I'], [[], 'p∨¬p', 'invalid', 'I'], [['¬(p∧q)'], '¬p∨¬q', 'invalid', 'I'], [['p∨q', '¬p'], 'q', 'valid', 'I'], [[], '¬¬(p∨¬p)', 'valid', 'I']] })
  ]
});
})(window.CONTENT);
