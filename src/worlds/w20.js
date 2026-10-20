/* Capítulo 20 · Lógica intuicionista de primer orden */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 20, num: '20', name: 'Cueva de Cristal', logic: 'Lógica intuicionista cuantificada: existir es construir; identidad intuicionista', badge: '∃⊐',
  intro: 'En esta cueva los cristales se arman pieza a pieza: un objeto matemático existe cuando sabemos construirlo. Volvemos a la intuicionista, ahora con cuantificadores.',
  stages: [
    T('Existencia y construcción', [
      { say: 'Para el platónico, los objetos matemáticos existen en un reino objetivo. Para el intuicionista, existir es poder <b>construir</b>: hay una receta que lo produce. Son entidades mentales, o quizá sociales.' },
      { say: 'Condiciones de prueba: {∃xA} está probado si hay una construcción que da un objeto a y una prueba de A(a). {∀xA} está probado si hay una construcción que, para <i>cualquier</i> objeto que construyamos ahora o más adelante, da una prueba de A(a).' },
      { say: 'La semántica: interpretaciones de dominio variable con R reflexiva y transitiva, herencia (lo verdadero sigue verdadero) y dominios crecientes (lo construido sigue construido). {∃xA} es verdadera en w si A vale de algo de D<sub>w</sub>; {∀xA}, si en todo mundo accesible, A vale de todo lo de su dominio.',
        fig: table(['Fórmula', 'Verdadera en w si…'], [['{∃xA}', 'A(d) es verdadera en w para algún d de D<sub>w</sub>'], ['{∀xA}', 'para todo w′ con wRw′ y todo d de D<sub>w′</sub>, A(d) es verdadera en w′']]) },
      { say: 'Hay que añadir que los nombres de las premisas y la conclusión existen en todo mundo: la intuicionista estándar no es libre. Con un solo mundo, todo es clásico: lo válido intuicionistamente es válido clásicamente, no al revés. (Y la traducción de Glivenko por doble negación ya no funciona con cuantificadores.)' }
    ]),
    T('Árboles de tipo 1', [
      { say: 'Se toman las reglas de la intuicionista proposicional (con ρ, τ y la herencia, ahora para toda atómica, también E) y se añaden las de los cuantificadores de dominio variable, con signo:',
        fig: rule(r(['{∃xA,+i}'], [['{Ec,+i}', '{A(c),+i}']], 'c nuevo'), r(['{∃xA,−i}'], [['{Ea,−i}'], ['{A(a),−i}']], 'cada a'), r(['{∀xA,−i}'], [['{irj}', '{Ec,+j}', '{A(c),−j}']], 'j y c nuevos'), r(['{∀xA,+i}', '{irj}'], [['{Ea,−j}'], ['{A(a),+j}']], 'cada a')) },
      { say: 'Y la lista inicial empieza con {Ea,+0} para cada nombre de las premisas y la conclusión, o {Ec,+0} si no hay ninguno.',
        fig: tab('IQ', [], '∃x(Px∨¬Px)') },
      { say: 'El libro presenta también árboles «de tipo 2», sin E, que llevan la cuenta de en qué mundo entra cada nombre. Dan árboles más cortos; aquí usamos los de tipo 1, que se parecen más a los del capítulo 15.' }
    ]),
    A('Del todo a uno', 'IQ', [], '∀xPx⊐Pa', { outro: 'Válida: a existe desde el principio, así que el universal lo alcanza.' }),
    A('Sin tercio excluso cuantificado', 'IQ', [], '∃x(Px∨¬Px)', { outro: 'Inválida: el único objeto construido no es P todavía, pero puede llegar a serlo.' }),
    A('Ninguno es P', 'IQ', ['∀x¬Px'], '¬∃xPx', { outro: 'Válida intuicionistamente.' }),
    A('Sin doble negación del particular', 'IQ', ['¬¬∃xPx'], '∃xPx', { outro: 'Inválida: que no pueda refutarse que algo es P no da un objeto construido que lo sea.' }),
    A('Ninguno, luego todos no', 'IQ', ['¬∃xPx'], '∀x¬Px', { outro: 'Válida intuicionistamente.' }),
    A('Doble negación del tercio excluso', 'IQ', [], '∀x¬¬(Px∨¬Px)', { outro: 'Válida: el tercio excluso nunca puede refutarse.' }),
    A('Alguno no, luego no todos', 'IQ', ['∃x¬Px'], '¬∀xPx', { outro: 'Válida: esta dirección sí vale.' }),
    A('Constantes y crecimiento', 'IQ', ['∀x(Pa∨Qx)'], 'Pa∨∀xQx', { outro: 'Inválida intuicionistamente; clásicamente sería válida.' }),
    T('Construcciones mentales', [
      { say: 'Un problema para la idea de que los objetos matemáticos son construcciones mentales. Hay cosas que sí lo son: los personajes de ficción, como Sherlock Holmes o Bilbo Bolsón.' },
      { say: 'Pero los objetos matemáticos no se comportan así. Puedo inventar hechos sobre un personaje; no sobre el número 3. Si Tolkien dice que Bilbo hizo algo, no puede equivocarse; si yo digo que 3 + 3 = 7, me equivoco. Y dos historias contradictorias sobre Bilbo pueden ser igual de buenas; dos sobre el 3, no.', mood: 'think' },
      { say: 'Aunque los objetos matemáticos no vivan en un reino abstracto, tienen una objetividad que las construcciones mentales genuinas no tienen. ¿De dónde sale?' }
    ]),
    T('Identidad intuicionista', [
      { say: 'Lo más simple sería la identidad necesaria. Pero la intuicionista no es necesaria: tomemos 1 y un número n dado por un algoritmo que va dando decimales. Salen 0,9999… ¿Es n = 1? Si salieran nueves para siempre, sí; si apareciera otra cifra, no. Mientras tanto, no se prueba ni {n=1} ni {¬n=1}.' },
      { say: 'La identidad apropiada es <b>contingente</b>, como en el capítulo 17, con herencia: una vez probado que a = b, sigue probado. En los árboles: las reglas de identidad sin la de invariancia, pero con la herencia también para {a=b}.' }
    ]),
    A('Transitividad de la identidad', 'IQ=', [], 'a=b⊐(b=c⊐a=c)', { outro: 'Válida: con la herencia, {a=b} llega al mundo donde se usa.' }),
    A('Sustitución intuicionista', 'IQ=', [], '∀x∀y(x=y⊐(Px⊐Py))', { outro: 'Válida.' }),
    A('Identidad indecidible', 'IQ=', [], '∀x∀y(x=y∨¬x=y)', { outro: 'Inválida: la identidad intuicionista no es decidible, como en el ejemplo de 0,999….' }),
    A('Ni de una ni de otra', 'IQ=', [], '(a=b∨b=c)⊐a=c', { outro: 'Inválida.' }),
    Q('Cristales', [
      { q: 'Para el intuicionista, {∃xA} está probado si…', opts: ['hay un objeto platónico que cumple A', 'se construye un objeto y se prueba que cumple A', 'no se puede refutar A'], ok: 1, why: 'Existir es poder construir.' },
      { q: '¿Qué condición sobre los dominios tiene la semántica intuicionista?', opts: ['son constantes', 'crecen a lo largo de R', 'decrecen'], ok: 1, why: 'Lo construido sigue construido.' },
      { q: '¿Cuál vale intuicionistamente?', opts: ['{¬¬∃xPx ⊢ ∃xPx}', '{∃x¬Px ⊢ ¬∀xPx}', '{⊢ ∃x(Px∨¬Px)}'], ok: 1, why: 'Las otras dos exigen construcciones que no tenemos.' },
      { q: 'La identidad intuicionista es…', opts: ['necesaria', 'contingente, con herencia', 'clásica'], ok: 1, why: 'Que n = 1 puede probarse más adelante.' }
    ]),
    A('Jefe de la cueva', 'IQ', ['∀x(Px⊐Qx)', '∃xPx'], '∃xQx', { boss: true, outro: '¡Válida en la intuicionista de primer orden!' }),
    V('La máquina de cristal', { sys: ['IQ', 'IQ=', 'FOL'], syms: '¬∧∨⊐⊃∀∃=', goals: ['valid', 'invalid', 'gap'], cmp: 'FOL',
      intro: 'Árboles intuicionistas con cuantificadores. Usa {⊐} y {¬}; para comparar con la clásica, la máquina lee {⊐} como {⊃}.',
      outro: 'Lo intuicionistamente válido es clásicamente válido, pero no al revés.',
      ex: [[['∀x¬Px'], '¬∃xPx', 'valid', 'IQ'], [['¬¬∃xPx'], '∃xPx', 'invalid', 'IQ'], [[], '∃x(Px∨¬Px)', 'invalid', 'IQ'], [['∀x(Pa∨Qx)'], 'Pa∨∀xQx', 'invalid', 'IQ'], [[], '∀x∀y(x=y∨¬x=y)', 'invalid', 'IQ='], [['∃x¬Px'], '¬∀xPx', 'valid', 'IQ']] })
  ]
});
})(window.CONTENT);
