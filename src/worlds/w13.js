/* Capítulo 13 · Lógicas libres */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 13, num: '13', name: 'Islote de lo Inexistente', logic: 'Lógicas libres: positiva, negativa; existencia e identidad', badge: 'E',
  intro: 'En el islote se ven siluetas de animales que no están. Las lógicas libres admiten nombres sin un objeto existente detrás, y cuantifican solo sobre lo que existe.',
  stages: [
    T('Libres de supuestos existenciales', [
      { say: 'Las <b>lógicas libres</b> se libran de dos supuestos de la clásica: que algo existe y que todo nombre nombra algo existente. Se añade un predicado de existencia, {E}: {Ea} se lee «a existe».' },
      { say: 'Una interpretación es ⟨D, E, ν⟩: D es el conjunto de todos los objetos (Sherlock Holmes, Pegaso, Julio César) y E ⊆ D, el <b>dominio interior</b>, el de los que existen (solo César). E puede estar vacío. Los nombres denotan en D.' },
      { say: 'Los cuantificadores recorren solo E: {∀xA} es verdadera si A vale para todo objeto existente; {∃xA}, si vale para alguno. Lo demás, como en la clásica.' }
    ]),
    T('Árboles libres', [
      { say: 'Cambian las dos reglas de instanciación. El universal ya no da directamente A(a): o bien a no existe, o bien vale A(a). El particular trae un nombre nuevo <b>y</b> su existencia.',
        fig: rule(r(['{∀xA}'], [['{¬Ea}'], ['{A(a)}']], 'a: cualquier nombre de la rama'), r(['{∃xA}'], [['{Ec}', '{A(c)}']], 'c nuevo')) },
      { say: 'El contramodelo se lee como en la clásica, con E igual a los nombres a para los que {Ea} está en la rama.',
        fig: tab('FREE', ['∀xPx', '∃xQx'], '∃x(Px∧Qx)') }
    ]),
    A('Lo que existe, cuenta', 'FREE', ['∀xPx', '∃xQx'], '∃x(Px∧Qx)', {
      intro: 'Cada aplicación del universal abre dos ramas: elige el nombre {c} que trajo el particular.',
      outro: 'Válida en la lógica libre.' }),
    A('Sin generalización', 'FREE', ['Pa'], '∃xPx', {
      outro: 'Inválida: a puede no existir. Pegaso tiene alas, pero no existe nada con alas que sea Pegaso.' }),
    A('Nada obliga a existir', 'FREE', [], '∃x(Px∨¬Px)', { outro: 'Inválida: el dominio interior puede estar vacío.' }),
    A('Del todo a lo existente', 'FREE', ['∀xPx', 'Ea'], 'Pa', { outro: 'Válida: si a existe, el universal lo alcanza.' }),
    A('Del todo a la parte', 'FREE', [], '∀xPx⊃∃xPx', { outro: 'Inválida en la lógica libre, a diferencia de la clásica.' }),
    T('Positivas y negativas', [
      { say: 'Con estas reglas, un objeto inexistente puede tener propiedades positivas: {¬Ea∧Pa} es satisfacible. Son las lógicas libres <b>positivas</b>. A algunos les parece raro: no se puede patear ni ver lo que no existe.' },
      { say: 'Las <b>negativas</b> imponen la <b>restricción de negatividad</b>: si ⟨d₁…dₙ⟩ está en la extensión de un predicado, todos esos objetos existen. En los árboles es la regla NCR: de {Pa₁…aₙ} pasa a {Ea₁}, …, {Eaₙ}.' },
      { say: 'Con ella vuelve una forma de generalización: {Pa ⊢ ∃xPx}. Pero hay contraejemplos aparentes: «estoy pensando en Sherlock Holmes», «Homero adoraba a Zeus». Y las <b>neutras</b>, que dejan sin valor las atómicas con nombres vacíos, necesitan faltas de valor (capítulo 21).', mood: 'think' }
    ]),
    A('Generalizar en la negativa', 'NFREE', ['Pa'], '∃xPx', {
      intro: 'Aplica la regla <b>NCR</b> del panel.',
      outro: 'Válida en la lógica libre negativa: lo que tiene propiedades existe.' }),
    A('Lo que no se exige', 'NFREE', [], '(Qab∧¬Sac)⊃Ec', {
      outro: 'Inválida: la NCR da {Ea} y {Eb}, pero nada dice de c, que solo aparece negado.' }),
    T('Existir y ser', [
      { say: 'Estas lógicas tienen nombres de inexistentes pero no dejan cuantificar sobre ellos. Se pueden añadir <b>cuantificadores exteriores</b>, que recorren todo D, como los clásicos, y leerlos «algo es tal que…», no «existe algo tal que…».' },
      { say: 'Frege y Russell leían {∃} como «existe», y Quine lo hizo definición: «ser es ser el valor de una variable». Pero el castellano no siempre carga existencia: si soñé con un monstruo la semana pasada y anoche, «soñé dos veces con algo» es verdad.' },
      { say: 'Un argumento clásico dice que «existe» no es un predicado genuino. Tomado en serio, también afectaría a las lógicas libres. Y los cuantificadores interiores se definen con los exteriores: {∃ᴱxA} es {∃x(Ex∧A)}.' }
    ]),
    T('Identidad en la lógica libre', [
      { say: 'Lo más simple: la identidad como en la clásica, para todo D. Pero en una lógica negativa hay que aplicarle la restricción: {a=b} es falsa si a o b no existen, incluso {a=a}.' },
      { say: 'Entonces la primera regla de identidad cambia: de {Ea} se pasa a {a=a} (autoidentidad de lo existente, SIE). La sustitución SI sigue igual. Ya no se cierra con {¬a=a} sola: hace falta también {Ea}.' },
      { say: 'Más contraejemplos: parece falso que Sherlock Holmes = Pegaso, pero verdadero que Papá Noel = Santa Claus. Y la sustitución de idénticos sigue valiendo, así que la lógica libre no resuelve los problemas de George Eliot.' }
    ]),
    A('Lo inexistente no es idéntico', 'NFREE', ['¬Ea'], '¬a=b', { outro: 'Válida en la lógica libre negativa.' }),
    A('Ni a sí mismo', 'NFREE', [], '(Ea∨a=a)∧(¬Ea∨a=a)', {
      outro: 'Inválida en la negativa: si a no existe, {a=a} es falsa y falla la primera conjunta.' }),
    A('En la positiva sí', 'FREE', [], '(Ea∨a=a)∧(¬Ea∨a=a)', { outro: 'Válida en la positiva: {a=a} vale siempre.' }),
    Q('Inexistentes', [
      { q: 'En la lógica libre, los cuantificadores recorren…', opts: ['todo D', 'solo los objetos existentes', 'solo los nombrados'], ok: 1, why: 'El dominio interior, E.' },
      { q: '¿Cuál es la regla característica de las libres negativas?', opts: ['NCR: de {Pa} pasa a {Ea}', 'SI', 'la del particular'], ok: 0, why: 'Lo que tiene propiedades positivas existe.' },
      { q: 'Con cuantificadores exteriores, {∃xA} se lee mejor…', opts: ['«existe un x tal que A»', '«algo es tal que A»', '«todo es A»'], ok: 1, why: 'Recorren también lo que no existe.' },
      { q: 'En una lógica libre negativa con identidad, {a=a} es falsa cuando…', opts: ['nunca', 'a no existe', 'a=b'], ok: 1, why: 'La restricción de negatividad se aplica también a la identidad.' }
    ]),
    A('Jefe del islote', 'FREE', ['∀x(Px⊃Qx)', '∃xPx'], '∃xQx', { boss: true, outro: '¡Válida en la lógica libre!' }),
    V('La máquina libre', { sys: ['FREE', 'NFREE', 'FOL'], syms: '¬∧∨⊃∀∃=', goals: ['valid', 'invalid', 'gap'], cmp: 'FOL',
      intro: 'Escribe {E} para la existencia. Busca una inferencia clásica que falle en la lógica libre.',
      outro: 'Sin E en las fórmulas, todo lo válido en la libre es válido en la clásica.',
      ex: [[['Pa'], '∃xPx', 'invalid', 'FREE'], [['Pa'], '∃xPx', 'valid', 'NFREE'], [[], '∃x(Px∨¬Px)', 'invalid', 'FREE'], [['∀xPx', 'Ea'], 'Pa', 'valid', 'FREE'], [[], '∀xPx⊃∃xPx', 'invalid', 'FREE'], [['¬Ea'], '¬a=b', 'valid', 'NFREE']] })
  ]
});
})(window.CONTENT);
