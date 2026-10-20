/* Capítulo 3 · Lógicas modales normales y lógica temporal */
(function (C) {
const { T, Q, A, V, table, tab, rule, r, kripke } = C;
C.world({
  ord: 3, num: '3', name: 'Corrientes Normales', logic: 'Lógicas modales normales (T, D, B, S4, S5) y temporal Kt', badge: 'S5',
  intro: 'Las corrientes que unen las islas pueden tener forma: volver a la misma isla, ir y volver, encadenarse. Cada forma da una lógica modal distinta, y al final el tiempo mismo.',
  stages: [
    T('Condiciones sobre la relación', [
      { say: 'K es la lógica <b>normal</b> más básica. Las demás se obtienen exigiendo algo a la relación de accesibilidad R. Las cuatro condiciones más importantes:',
        fig: table(['Nombre', 'Condición', 'Se lee'], [['ρ (rho)', 'wRw para todo w', 'reflexiva'], ['σ (sigma)', 'si w₁Rw₂, entonces w₂Rw₁', 'simétrica'], ['τ (tau)', 'si w₁Rw₂ y w₂Rw₃, entonces w₁Rw₃', 'transitiva'], ['η (eta)', 'para todo w₁ hay un w₂ con w₁Rw₂', 'extensible']]) },
      { say: 'Combinándolas salen los sistemas clásicos de la lógica modal. Kρ se llama T; Kη, D; Kρσ, B; Kρτ, S4; y Kρστ, S5. Si R es reflexiva, también es extensible: cada mundo se ve al menos a sí mismo.',
        fig: table(['Sistema', 'Condiciones', 'Principio característico'], [['T', 'ρ', '{□A⊃A}'], ['D', 'η', '{□A⊃◇A}'], ['Kσ', 'σ', '{A⊃□◇A}'], ['Kτ', 'τ', '{□A⊃□□A}'], ['B', 'ρσ', ''], ['S4', 'ρτ', ''], ['S5', 'ρστ', '']]) },
      { say: 'Una idea que volverá muchas veces: <b>menos interpretaciones, más inferencias válidas</b>. Si la verdad se conserva en todos los modelos de K, se conserva en particular en los reflexivos. Por eso toda lógica normal extiende a K, y S5 extiende a todas estas.', mood: 'think' }
    ]),
    Q('Relaciones con forma', [
      { q: 'Una relación donde cada mundo se ve a sí mismo es…', opts: ['simétrica', 'reflexiva', 'transitiva'], ok: 1, why: 'Es la condición ρ.' },
      { q: 'S4 es…', opts: ['Kρσ', 'Kρτ', 'Kστ'], ok: 1, why: 'Reflexiva y transitiva.' },
      { q: 'Si una relación es reflexiva, ¿es extensible?', opts: ['Sí, siempre', 'No necesariamente'], ok: 0, why: 'Cada mundo ve al menos a uno: a sí mismo.' },
      { q: 'Si restringimos las interpretaciones a una clase más pequeña, el conjunto de inferencias válidas…', opts: ['crece o queda igual', 'se achica', 'no cambia nunca'], ok: 0, why: 'Hay menos lugares donde buscar contraejemplos.' }
    ]),
    T('Árboles para las lógicas normales', [
      { say: 'Para estas lógicas se añaden a los árboles de K reglas que solo hablan de r. Su efecto es dar más mundos accesibles, y por tanto más trabajo a la regla de {□}.',
        fig: rule(r(['·'], [['{iri}']], 'para cada i de la rama'), r(['{irj}'], [['{jri}']]), r(['{irj}', '{jrk}'], [['{irk}']])) },
      { say: 'En el juego, estas reglas están en el panel <b>Relación</b>: ρ, σ, τ. Cada botón añade de una vez todo lo que su regla pide en las ramas abiertas. No se repite lo que ya está.' },
      { say: 'El procedimiento que recomienda el libro: primero la regla de {◇}, que crea mundos; luego todo lo que haya que añadir sobre r; y al final, volver a las líneas con {□} para los mundos nuevos.',
        fig: tab('Kτ', [], '□p⊃□□p', 'Con τ, de 0r1 y 1r2 sale 0r2, y {□p, 0} llega hasta el mundo 2.') }
    ]),
    A('Lo necesario es verdad (T)', 'T', ['□p'], 'p', {
      intro: 'En T la relación es reflexiva. Aplica <b>ρ</b> para tener {0r0}.',
      outro: 'Válida en T: con {0r0}, la necesidad de {p} en 0 alcanza al propio 0. En K esto fallaba, así que T extiende propiamente a K.' }),
    A('Ir y volver (Kσ)', 'Kσ', ['p'], '□◇p', {
      intro: 'Con σ, si 0 ve a 1, también 1 ve a 0.',
      outro: 'Válida en Kσ: desde el mundo 1 se vuelve a 0, donde vale {p}.' }),
    A('Encadenar (Kτ)', 'Kτ', ['□p'], '□□p', {
      outro: 'Válida en Kτ: lo que 0 ve en dos pasos, lo ve en uno.' }),
    A('Lo posible es necesariamente posible (S5)', 'S5', ['◇p'], '□◇p', {
      intro: 'S5 tiene las tres reglas. Tras cada mundo nuevo, aplica σ y τ y vuelve a las líneas con {□}.',
      outro: 'Válida en S5.' }),
    T('Contramodelos con forma', [
      { say: 'Los contramodelos se leen como en K, ahora con toda la información sobre r. Este árbol de B (reflexiva y simétrica) muestra que {□p⊃□□p} falla en B.',
        fig: tab('Kρσ', [], '□p⊃□□p') },
      { say: 'El modelo: w0 y w1 se ven entre sí, w1 y w2 también, y cada uno se ve a sí mismo. {p} vale en w0 y en w1, pero no en w2. Desde w0, {□p} vale; pero w1 ve a w2, así que {□p} falla en w1 y {□□p} falla en w0. Falta la transitividad.' }
    ]),
    A('Sin transitividad (B)', 'Kρσ', ['□p'], '□□p', {
      outro: 'Inválida en B. Sin τ, la necesidad no se hereda dos pasos más allá.' }),
    A('Simétrica pero no reflexiva', 'Kσ', ['□p'], 'p', {
      outro: 'Inválida en Kσ: la simetría sola no da la reflexividad.' }),
    T('Árboles infinitos', [
      { say: 'La regla de η es especial: si un mundo i no ve a ninguno, crea uno nuevo j con {irj}. Aplicada sin pausa, nunca termina: el mundo nuevo tampoco ve a nadie, y así hasta el infinito.',
        fig: rule(r(['·'], [['{irj}']], 'si i no ve a ninguno; j nuevo')) },
      { say: 'Por eso hay que aplicarla con calma, cuando no queda nada más que hacer. En D (Kη) se valida {□p⊃◇p}: el mundo nuevo hace verdadera {p} por la necesidad y falsa por {¬◇p}.',
        fig: tab('D', [], '□p⊃◇p') },
      { say: 'Si un árbol de D no se cierra, es infinito, y su contramodelo también. Pero suele haber uno finito, que se encuentra mejor por ensayo y error: un solo mundo que se ve a sí mismo, con {p} falsa, refuta {□p} en D.' },
      { say: 'Kτ también puede dar árboles infinitos: cada mundo nuevo lo ve el 0 por transitividad, y una línea {□◇p, 0} exige otro mundo, y otro… Leer el modelo infinito es posible en casos simples, pero en general cuesta mucho.', mood: 'think' }
    ]),
    A('Deber implica poder (D)', 'D', ['□p'], '◇p', {
      intro: 'En D hay que darle al mundo 0 un sucesor con la regla <b>η</b>.',
      outro: 'Válida en D. Es el principio de la lógica deóntica: lo obligatorio es permitido.' }),
    T('S5 sin relación', [
      { say: 'S5 es especial. Si cada mundo ve a todos (una relación <b>universal</b>, υ), la relación sobra: {□A} es verdadera si A lo es en todos los mundos, y {◇A} si lo es en alguno.' },
      { say: 'Kυ y Kρστ dan exactamente las mismas inferencias válidas, aunque las interpretaciones de Kυ sean menos. La razón: en un modelo de Kρστ, la relación parte los mundos en clases que se ven entre sí, y basta quedarse con la clase del mundo que interesa.' },
      { say: 'Los árboles de Kυ no mencionan r: {◇A, i} da {A, j} con j nuevo, y {□A, i} da {A, j} para cada j de la rama.',
        fig: tab('Kυ', [], '◇p⊃□◇p') }
    ]),
    A('S5 a la manera breve', 'Kυ', ['◇p'], '□◇p', {
      outro: 'Válida. Mucho más corto que con ρ, σ y τ.' }),
    A('Lo posiblemente necesario', 'Kυ', ['◇□p'], '□p', {
      outro: 'Válida en S5: si en algún mundo vale {□p}, vale {p} en todos, y en todos vale {□p}.' }),
    A('¿Y en S4?', 'S4', ['◇□p'], '□◇p', {
      outro: 'Inválida en S4: hacen falta más condiciones (la convergencia de S4.2).' }),
    A('Una ley de T', 'T', [], '(□p∧□q)⊃(p≡q)', {
      outro: 'Válida en T: lo necesario es verdadero, así que {p} y {q} lo son las dos.' }),
    T('¿Qué sistema es la necesidad?', [
      { say: 'No hay una sola respuesta, porque hay muchas necesidades. La <b>lógica</b> (verdad por el significado de las palabras) parece cumplir T, Kτ y Kσ: muchos le dan S5.' },
      { say: 'La necesidad <b>física</b> (lo que fijan las leyes naturales) y la <b>metafísica</b> (la esencia de las cosas) cumplen al menos T. Pero ¿por qué que yo no supere la velocidad de la luz sería, a su vez, una ley de la física, como pide τ?', mood: 'think' },
      { say: 'La necesidad <b>epistémica</b> (lo que se sabe) cumple {□A⊃A}: lo sabido es verdad. Pero se puede saber algo sin saber que se sabe, así que τ falla. Y todas las lógicas normales cierran el conocimiento bajo consecuencia, lo que tampoco parece cierto.' },
      { say: 'La necesidad <b>alética</b>, «es definitivamente verdad que», parece S5; pero con predicados vagos se discute. Y la necesidad <b>moral</b> (lo obligatorio) no cumple {□A⊃A}: la gente no siempre hace lo que debe. Se le suele dar D, aunque los dilemas morales la ponen en duda.' }
    ]),
    Q('Necesidades', [
      { q: '¿Qué principio falla para la necesidad moral?', opts: ['{□A⊃A}', '{□(A∧B)⊃□A}', 'ninguno'], ok: 0, why: 'Lo obligatorio no siempre se cumple.' },
      { q: 'Un dilema moral, donde se debe A y se debe ¬A, pone en duda…', opts: ['{□A⊃◇A}', '{□A⊃¬□¬A}, el principio de D', '{A⊃□◇A}'], ok: 1, why: 'Si debo A y debo ¬A, falla que lo obligatorio excluya lo contrario.' },
      { q: '¿Por qué se duda de τ para el conocimiento?', opts: ['Porque se puede saber sin saber que se sabe', 'Porque lo sabido puede ser falso', 'Porque no hay mundos epistémicos'], ok: 0, why: 'Es el ejemplo del examen: sabías más de lo que creías.' }
    ]),
    T('La lógica temporal Kt', [
      { say: 'La misma semántica puede hablar del tiempo. Los mundos son instantes y wRv significa «w es anterior a v». Entonces {□} se lee «siempre en el futuro» y se escribe {[F]A}; {◇} es «alguna vez en el futuro», {⟨F⟩A}.' },
      { say: 'La novedad es otro par de operadores, para el pasado: {[P]A} y {⟨P⟩A}. Usan la relación al revés: {⟨P⟩A} es verdadera en w si A lo es en algún v con vRw.',
        fig: rule(r(['{[F]A, i}', '{irj}'], [['{A, j}']]), r(['{⟨F⟩A, i}'], [['{irj}', '{A, j}']]), r(['{[P]A, i}', '{jri}'], [['{A, j}']]), r(['{⟨P⟩A, i}'], [['{jri}', '{A, j}']])) },
      { say: 'Las negaciones van como en K: {¬[F]A} da {⟨F⟩¬A}, y así. Lo interesante es cómo se cruzan pasado y futuro: lo que es, siempre habrá sido futuro. Y cada inferencia válida tiene su <b>imagen especular</b>, cambiando P por F.' }
    ]),
    A('Lo que es, fue futuro', 'Kt', ['p'], '[P]⟨F⟩p', {
      outro: 'Válida en Kt: en todo instante anterior, {p} estaba en el futuro.' }),
    A('La imagen especular', 'Kt', ['p'], '[F]⟨P⟩p', {
      outro: 'Válida también: en todo instante posterior, {p} habrá estado en el pasado.' }),
    A('¿Siempre antes o siempre después?', 'Kt', [], 'p⊃([F]p∨[P]p)', {
      outro: 'Inválida: puede que {p} falle una vez en el futuro y otra en el pasado.' }),
    T('Extensiones de Kt', [
      { say: 'Como en lo modal, se añaden condiciones sobre «anterior a». τ (la anterioridad es transitiva) es la más natural. η dice que no hay último instante, y su espejo η′ que no hay primero. En cambio ρ y σ no tienen sentido para el tiempo.' },
      { say: 'Otras condiciones propias del tiempo: la <b>densidad</b> δ (entre dos instantes siempre hay otro) y la <b>convergencia</b> hacia adelante φ o hacia atrás β (el tiempo no se ramifica). Para φ y β hacen falta líneas de la forma {i=j} en los árboles.' },
      { say: '¿Hay futuros distintos y un solo pasado? Que haya dos futuros <i>posibles</i> no implica dos futuros <i>reales</i>: {◇⟨F⟩p∧◇⟨F⟩¬p} no es lo mismo que {⟨F⟩p∧⟨F⟩¬p}. Distinguirlos exige mezclar operadores modales y temporales.', mood: 'think' }
    ]),
    A('El tiempo transitivo', 'Kτt', ['[F]p'], '[F][F]p', {
      outro: 'Válida en Kτt: lo que vale siempre en el futuro vale siempre en el futuro del futuro.' }),
    A('Jefe de las corrientes', 'S5', ['◇□p'], 'p', { boss: true,
      intro: 'Con ρ, σ y τ juntas. Organízate: mundo nuevo, relación, necesidades.',
      outro: '¡Válida en S5!' }),
    V('La máquina de sistemas', { sys: ['K', 'D', 'T', 'Kρσ', 'S4', 'S5', 'Kt'], syms: '¬∧∨⊃≡□◇', goals: ['valid', 'invalid', 'split'],
      intro: 'Elige el sistema arriba. Prueba la misma inferencia en varios: busca una que sea válida en uno e inválida en otro.',
      outro: 'Cuantas más condiciones sobre R, más inferencias válidas.',
      ex: [[['□p'], 'p', 'invalid', 'K'], [['□p'], 'p', 'valid', 'T'], [['□p'], '□□p', 'valid', 'S4'], [['□p'], '□□p', 'invalid', 'Kρσ'], [['◇p'], '□◇p', 'valid', 'S5'], [['□p'], '◇p', 'valid', 'D']] })
  ]
});
})(window.CONTENT);
