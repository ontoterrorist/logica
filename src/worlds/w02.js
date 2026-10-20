/* Capítulo 2 · Lógica modal básica (K) */
(function (C) {
const { T, Q, A, V, table, tab, rule, r, kripke } = C;
const M1 = kripke([{ id: 'w1', t: '¬p, ¬q' }, { id: 'w2', t: 'p, q' }, { id: 'w3', t: 'p, ¬q' }], [['w1', 'w2'], ['w1', 'w3'], ['w3', 'w3']],
  'Tres mundos: w1 ve a w2 y a w3, y w3 se ve a sí mismo.');
C.world({
  ord: 2, num: '2', name: 'Islas Posibles', logic: 'Lógica modal básica K', badge: '□',
  intro: 'Cada isla es un mundo posible y las corrientes dicen desde qué isla se ve cuál. Aquí aprenderás la semántica de mundos posibles y los árboles con números de mundo.',
  stages: [
    T('Necesidad y posibilidad', [
      { say: 'La <b>lógica modal</b> estudia los <i>modos</i> de la verdad: lo posible, lo necesario, lo imposible. Esas palabras son muy ambiguas; en el próximo capítulo distinguiremos varios sentidos.' },
      { say: 'La herramienta es la idea de <b>mundo posible</b>. Puedes imaginar que las cosas fueran distintas: que midieras un centímetro más, que hubieras nacido en otro país. Cada una de esas maneras de ser es un mundo posible. El mundo real es uno más.' },
      { say: 'La otra idea es la <b>posibilidad relativa</b>. Hoy es posible que yo esté en Valparaíso dentro de una semana; dentro de seis días y veintitrés horas, si no me he movido, ya no lo será. Lo posible depende de dónde se mire.' },
      { say: 'Al lenguaje le añadimos dos operadores: {□A}, «es necesario que A», y {◇A}, «es posible que A». Desde ahora los árboles llevarán un número de mundo junto a cada fórmula.' }
    ]),
    T('Semántica de mundos', [
      { say: 'Una interpretación es un trío ⟨W, R, ν⟩. W es un conjunto de mundos; R es una relación entre ellos (wRv: v es <b>accesible</b> desde w, posible en relación con w); ν da a cada letra un valor en cada mundo.' },
      { say: 'Las conectivas de siempre se evalúan mundo a mundo. Lo nuevo: {◇A} es verdadera en w si A es verdadera en <b>algún</b> mundo accesible desde w; {□A}, si A es verdadera en <b>todos</b> los mundos accesibles desde w.', fig: M1 },
      { say: 'En el dibujo: {p∧q} es verdadera en w2, así que {◇(p∧q)} es verdadera en w1. El único mundo que ve w3 es él mismo, y ahí vale {p}: así que {□p} vale en w3. Y w2 no ve ningún mundo, de modo que {◇q} es falsa en w2.', fig: M1 },
      { say: 'Ojo con los mundos que no ven nada: en ellos todo {◇A} es falso y todo {□A} es verdadero, «vacuamente». Si no hay mundos accesibles, no hay ninguno donde A falle.', mood: 'think' },
      { say: 'Dos equivalencias útiles: {¬◇A} vale lo mismo que {□¬A}, y {¬□A} lo mismo que {◇¬A}. Una inferencia es válida si en todo mundo de toda interpretación donde las premisas son verdaderas, la conclusión también lo es. Esta lógica se llama <b>K</b>, por Kripke.' }
    ]),
    Q('Lee el modelo', [
      { q: 'En el modelo de tres mundos (w1 ve a w2 y w3; w3 se ve a sí mismo), ¿vale {◇p} en w1?', opts: ['Sí', 'No'], ok: 0, why: 'w1 ve a w2, y {p} es verdadera en w2.' },
      { q: '¿Vale {□p} en w1?', opts: ['Sí', 'No'], ok: 0, why: 'Los dos mundos que ve w1, w2 y w3, hacen verdadera {p}.' },
      { q: '¿Vale {□q} en w1?', opts: ['Sí', 'No'], ok: 1, why: 'w1 ve a w3, y allí {q} es falsa.' },
      { q: '¿Vale {□(p∧¬p)} en w2?', opts: ['Sí, vacuamente', 'No, nunca'], ok: 0, why: 'w2 no ve ningún mundo, así que todo lo que empieza por {□} es verdadero allí, incluso esto.' },
      { q: '{¬◇A} es verdadera en un mundo exactamente cuando lo es…', opts: ['{◇¬A}', '{□¬A}', '{¬□A}'], ok: 1, why: 'No hay mundo accesible donde valga A, es decir, en todos los accesibles vale {¬A}.' }
    ]),
    T('Árboles modales', [
      { say: 'Los árboles de K son como los clásicos con dos novedades. Cada nodo es o bien {A, i} (A es verdadera en el mundo i) o bien {irj} (el mundo i ve al mundo j). La lista inicial pone todo en el mundo 0.' },
      { say: 'Las reglas de las conectivas son las de siempre, llevando el número del mundo. Y hay cuatro reglas modales:',
        fig: rule(r(['{□A, i}', '{irj}'], [['{A, j}']], 'para cada j que i vea'), r(['{◇A, i}'], [['{irj}', '{A, j}']], 'j es un mundo nuevo'), r(['{¬□A, i}'], [['{◇¬A, i}']]), r(['{¬◇A, i}'], [['{□¬A, i}']])) },
      { say: 'Una rama se cierra si tiene {A, i} y {¬A, i} con el <b>mismo</b> número. {p, 0} y {¬p, 1} no chocan: dicen que p es verdadera en un mundo y falsa en otro.' },
      { say: 'Cuidado con {□}: se aplica a cada mundo accesible, y si más tarde aparece otro, hay que volver. Por eso una línea con {□} nunca se marca como terminada. En el juego, la regla de {□} añade de una vez {A, j} para todos los j que haya.',
        fig: tab('K', ['□(p⊃q)∧□(q⊃r)'], '□(p⊃r)') }
    ]),
    A('Necesidad que se encadena', 'K', ['□(p⊃q)∧□(q⊃r)'], '□(p⊃r)', {
      intro: 'Empieza por la conclusión negada: {¬□(p⊃r), 0} da {◇¬(p⊃r), 0}, y {◇} crea el mundo 1.',
      hints: ['Aplica primero las reglas que crean mundos; luego vuelve a las líneas con {□}.'],
      outro: 'Válida en K. En el mundo nuevo, las dos necesidades obligan a que {p⊃r} se cumpla.' }),
    A('Lo necesario de una conjunción', 'K', ['□p∧□q'], '□(p∧q)', {
      outro: 'Válida: si en todo mundo accesible valen {p} y {q}, vale {p∧q}.' }),
    A('Posibilidad de una conjunción', 'K', [], '◇(p∧q)⊃(◇p∧◇q)', {
      outro: 'Válida: un mismo mundo accesible sirve de testigo para {◇p} y para {◇q}.' }),
    A('Una necesidad y una posibilidad', 'K', ['□p', '◇q'], '◇(p∧q)', {
      intro: 'Necesitas un mundo para {◇q}; luego {□p} llega hasta él.',
      outro: 'Válida. El mundo donde vale {q} también hace verdadera {p}.' }),
    T('Contramodelos modales', [
      { say: 'De una rama abierta se lee un modelo de Kripke: un mundo w<sub>i</sub> por cada número i de la rama; w<sub>i</sub>Rw<sub>j</sub> si en la rama está {irj}; {p} es verdadera en w<sub>i</sub> si está {p, i}, y falsa si está {¬p, i}.' },
      { say: 'Mira este árbol. La rama abierta da cinco mundos: 0 ve a 1 y a 3; 1 ve a 2; 3 ve a 4. En w1 vale {p}, en w3 vale {¬q}.',
        fig: tab('K', [], '(◇p∧◇¬q)⊃◇□◇p') },
      { say: 'Se comprueba a mano: {◇p} y {◇¬q} son verdaderas en w0. Pero w2 no ve nada, así que {◇p} es falsa allí y {□◇p} es falsa en w1; lo mismo en w3. Ningún mundo accesible desde w0 hace verdadera {□◇p}.' },
      { say: 'En el juego el contramodelo aparece dibujado: cada caja es un mundo, cada flecha es la relación, y dentro de cada caja están las letras que valen ahí.' }
    ]),
    A('Lo necesario no basta', 'K', ['□p'], 'p', {
      intro: 'En K, ¿lo necesario es verdadero? Construye el árbol y mira.',
      outro: 'Inválida en K. El contramodelo tiene un solo mundo que no se ve a sí mismo: ahí {□p} es vacuamente verdadera y {p} falsa.' }),
    A('Necesidad de una disyunción', 'K', ['□(p∨q)'], '□p∨□q', {
      outro: 'Inválida: puede que cada mundo accesible tenga una disyunta distinta.' }),
    A('Dos posibilidades', 'K', ['◇p', '◇q'], '◇(p∧q)', {
      outro: 'Inválida: {p} y {q} pueden ser posibles en mundos distintos.' }),
    A('¿Lo necesario es posible?', 'K', [], '□p⊃◇p', {
      outro: 'Inválida en K. Un mundo que no ve ninguno hace verdadera {□p} y falsa {◇p}. En el próximo capítulo veremos sistemas donde eso no pasa.' }),
    A('¿Algo es posible?', 'K', [], '◇(p∨¬p)', {
      outro: 'Inválida: ni siquiera {◇(p∨¬p)} es una verdad de K, porque basta un mundo sin mundos accesibles.' }),
    A('Necesidad sobre un condicional', 'K', ['□(p⊃q)'], '◇p⊃◇q', {
      outro: 'Válida: el mundo donde vale {p} es accesible, así que ahí vale {p⊃q} y por tanto {q}.' }),
    T('¿Qué son los mundos posibles?', [
      { say: 'Hasta aquí, los mundos son objetos de un modelo matemático. Pero si la maquinaria funciona, algo debe <b>representar</b>. Igual que el número 1 representa la verdad sin ser la verdad, los mundos representan… mundos posibles. ¿Y qué son?' },
      { say: 'El <b>realismo modal</b> (David Lewis) dice que son cosas como el nuestro: gente, sillas y estrellas, cada uno con su propio espacio y tiempo, tan reales como tú. Una objeción: ¿por qué lo que pasa en otro lugar, aislado, haría posible algo <i>aquí</i>?', mood: 'think' },
      { say: 'El <b>actualismo</b> dice que existen, pero son entidades abstractas, por ejemplo conjuntos de proposiciones. Problema: para que un conjunto sea un mundo debe estar cerrado bajo consecuencia, y entonces usamos la validez para explicar los mundos, cuando los mundos debían explicar la validez.' },
      { say: 'El <b>combinatorialismo</b>, una variante, toma los mundos como recombinaciones de las cosas de este mundo. Pero parece posible que exista algo que no está hecho de nada de lo que hay aquí, y ninguna recombinación lo daría.' },
      { say: 'El <b>meinongianismo</b> dice que los mundos, como Sherlock Holmes o el flogisto, son objetos que no existen. ¿Cómo conocerlos? A veces basta estipularlo: Holmes vivía en Baker Street porque Conan Doyle lo decidió. El debate sigue abierto.' }
    ]),
    Q('Filosofía de los mundos', [
      { q: 'Según el realismo modal, los mundos posibles son…', opts: ['conjuntos de proposiciones', 'cosas concretas como nuestro mundo, aisladas de él', 'objetos que no existen'], ok: 1, why: 'Es la tesis de David Lewis: tan concretos como el nuestro, pero sin conexión espacial, temporal ni causal con él.' },
      { q: '¿Qué problema tiene tomar los mundos como conjuntos de proposiciones cerrados bajo consecuencia?', opts: ['Que son demasiados', 'Que presupone la validez que querían explicar', 'Que no pueden ser infinitos'], ok: 1, why: 'Los mundos debían explicar qué se sigue de qué, no al revés.' },
      { q: 'Para el combinatorialismo, un mundo posible es…', opts: ['un reordenamiento de las cosas de este mundo', 'un objeto inexistente', 'otro universo físico'], ok: 0, why: 'Por eso le cuesta admitir la posibilidad de cosas que no están hechas de nada de lo que hay aquí.' },
      { q: 'En un modelo, un mundo que no ve ningún otro hace verdadera…', opts: ['toda fórmula {◇A}', 'toda fórmula {□A}', 'ninguna fórmula modal'], ok: 1, why: 'Vacuamente: no hay mundo accesible donde A falle.' }
    ]),
    A('Jefe de las islas', 'K', ['□(p⊃q)', '◇(p∧r)'], '◇(q∧r)', { boss: true,
      intro: 'Un reto para terminar el capítulo: la posibilidad crea el mundo; la necesidad lo alcanza.',
      outro: '¡Válida en K!' }),
    V('La máquina modal', { sys: ['K'], syms: '¬∧∨⊃≡□◇', goals: ['valid', 'invalid', 'own'],
      intro: 'La máquina hace árboles de K: crea mundos con {◇}, los recorre con {□} y, si queda una rama abierta, dibuja el contramodelo.',
      outro: 'Los árboles de K también terminan siempre: K es decidible.',
      ex: [[['□(p⊃q)'], '□p⊃□q', 'valid'], [['□p'], 'p', 'invalid'], [['◇p', '◇q'], '◇(p∧q)', 'invalid'], [['□p', '◇q'], '◇(p∧q)', 'valid'], [[], '□p⊃◇p', 'invalid'], [['¬◇p'], '□¬p', 'valid']] })
  ]
});
})(window.CONTENT);
