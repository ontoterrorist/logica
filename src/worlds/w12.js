/* Capítulo 12 · Lógica clásica de primer orden */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 12, num: '12', name: 'Alta Mar', logic: 'Lógica clásica de primer orden e identidad', badge: '∀',
  intro: 'Comienza la segunda parte del libro: cuantificadores e identidad. En alta mar repasamos la lógica de primer orden clásica y sus árboles, que pueden no terminar nunca.',
  stages: [
    T('El lenguaje de primer orden', [
      { say: 'El vocabulario: variables (x, y, z), constantes o nombres (a, b, c), predicados de n lugares (P, Q, S…), las conectivas de siempre y los cuantificadores {∀} (universal) y {∃} (particular).' },
      { say: 'Una fórmula atómica es un predicado seguido de términos: {Pa}, {Sxy}. Si A es fórmula, también lo son {∀xA} y {∃xA}. Una variable está <b>ligada</b> si cae bajo un cuantificador con ella; si no, está libre. Las oraciones no tienen variables libres.' },
      { say: 'Una interpretación es ⟨D, ν⟩: un dominio no vacío D y una función que da a cada nombre un objeto de D y a cada predicado de n lugares un conjunto de n-tuplas. {∀xA} es verdadera si A vale para todo objeto del dominio; {∃xA}, si vale para alguno.',
        fig: table(['Fórmula', 'Verdadera si…'], [['{Pa}', 'el objeto que nombra a está en la extensión de P'], ['{∀xPx}', 'todo objeto está en la extensión de P'], ['{∃xPx}', 'algún objeto está en la extensión de P']]) },
      { say: 'Cuatro equivalencias para recordar: {¬∃xA} con {∀x¬A}; {¬∀xA} con {∃x¬A}; {¬∃x(Px∧A)} con {∀x(Px⊃¬A)}; {¬∀x(Px⊃A)} con {∃x(Px∧¬A)}.' }
    ]),
    Q('Cuantificar', [
      { q: '«Todos los peces nadan», con F: pez y N: nada, es…', opts: ['{∀x(Fx∧Nx)}', '{∀x(Fx⊃Nx)}', '{∃x(Fx⊃Nx)}'], ok: 1, why: 'El universal va con el condicional: de todo lo que sea pez, se dice que nada.' },
      { q: '«Algún pez vuela» es…', opts: ['{∃x(Fx∧Vx)}', '{∃x(Fx⊃Vx)}', '{∀x(Fx∧Vx)}'], ok: 0, why: 'El particular va con la conjunción.' },
      { q: '{¬∀xPx} equivale a…', opts: ['{∀x¬Px}', '{∃x¬Px}', '{¬∃xPx}'], ok: 1, why: 'No todo es P si y solo si algo no es P.' }
    ]),
    T('Árboles con cuantificadores', [
      { say: 'Los árboles de primer orden son los clásicos con cuatro reglas nuevas. Las de las negaciones convierten un cuantificador en el otro. Las de <b>instanciación</b> universal (IU) y particular (IP):',
        fig: rule(r(['{¬∀xA}'], [['{∃x¬A}']]), r(['{¬∃xA}'], [['{∀x¬A}']]), r(['{∀xA}'], [['{A(a)}']], 'a: cualquier nombre de la rama'), r(['{∃xA}'], [['{A(c)}']], 'c: un nombre nuevo')) },
      { say: 'Para {∃xA} hace falta un nombre <b>nuevo</b>: no sabemos qué objeto es, así que no podemos suponer que es uno de los ya nombrados. Para {∀xA}, en cambio, se usa cada nombre de la rama (si no hay ninguno, se inventa uno). Una línea con {∀} nunca se da por terminada: puede aparecer otro nombre.' },
      { say: 'Las reglas se aplican a líneas enteras, no a trozos. Y conviene instanciar primero los particulares (que traen nombres nuevos) y después los universales.',
        fig: tab('FOL', ['∀x(Px⊃Qx)', '∀x(Qx⊃Sx)'], '∀x(Px⊃Sx)') }
    ]),
    A('Silogismo', 'FOL', ['∀x(Px⊃Qx)', '∀x(Qx⊃Sx)'], '∀x(Px⊃Sx)', {
      intro: 'Empieza por la conclusión negada: {¬∀x} se vuelve {∃x¬}, y el particular trae un nombre nuevo.',
      outro: 'Válida: el silogismo clásico en Barbara.' }),
    A('Del todo a la parte', 'FOL', [], '∀xPx⊃∃xPx', {
      outro: 'Válida en la lógica clásica, porque el dominio nunca está vacío. Lo discutiremos en el capítulo 13.' }),
    A('Un particular que no basta', 'FOL', ['∃x(Px⊃Qx)'], '∀x¬Qx', {
      outro: 'Inválida. En el contramodelo hay dos objetos, y uno es Q.' }),
    T('Contramodelos de primer orden', [
      { say: 'De una rama abierta se lee una interpretación: un objeto por cada nombre de la rama; {Pa} en la rama pone ese objeto en la extensión de P; lo que no aparece, fuera. Cada objeto tiene nombre, así que para comprobar {∃xA} basta mirar los nombres de la rama.' },
      { say: 'Pero los árboles de primer orden pueden ser <b>infinitos</b>. Con {∃x∀ySxy} negado, cada nombre nuevo obliga a volver a la universal, que trae otro particular, que trae otro nombre… El contramodelo leído sería infinito.', mood: 'think' },
      { say: 'Muchas veces hay un contramodelo finito que se encuentra a ojo. Pero no siempre: la validez de primer orden no es <b>decidible</b> (es el teorema de Church). Los árboles siempre se cierran si la inferencia es válida, pero si no lo es pueden no terminar.' },
      { say: 'En el juego: si una rama nunca termina pero el modelo que se lee de ella ya refuta la inferencia, puedes declararla abierta y lo acepto.' }
    ]),
    A('Intercambiar cuantificadores', 'FOL', ['∃y∀xSxy'], '∀x∃ySxy', { outro: 'Válida: si alguien es amado por todos, todos aman a alguien.' }),
    A('Disyunción de universales', 'FOL', ['∀xPx∨∀xQx'], '∀x(Px∨Qx)', { outro: 'Válida en este sentido.' }),
    A('La disyunción no se distribuye', 'FOL', ['∀x(Px∨Qx)'], '∀xPx∨∀xQx', {
      outro: 'Inválida: basta un objeto que sea solo P y otro que sea solo Q.' }),
    T('Identidad', [
      { say: 'La identidad es un predicado de dos lugares que se escribe en medio: {a=b}. En toda interpretación, su extensión son los pares ⟨d, d⟩: cada objeto es idéntico a sí mismo y a nada más.' },
      { say: 'Reglas: siempre se puede añadir {a=a}; y la <b>sustitución de idénticos</b> (SI): de {a=b} y una atómica con a, pasa a la misma con b en algunas de las apariciones. En la práctica: se cierra con {¬a=a}, o con {a=b} y {¬b=a}, y se aplica SI en los dos sentidos.',
        fig: rule(r(['·'], [['{a=a}']]), r(['{a=b}', '{A(a)}'], [['{A(b)}']], 'A atómica')) },
      { say: 'En el juego, SI está en el panel de la derecha. Al leer un contramodelo, los nombres unidos por identidades denotan el mismo objeto.',
        fig: tab('FOL', [], 'a=b⊃(∃xSxa⊃(a=a∧∃xSxb))') }
    ]),
    A('Sustituir idénticos', 'FOL', ['a=b', 'Pa'], 'Pb', { outro: 'Válida: es la sustitución de idénticos.' }),
    A('Simetría', 'FOL', ['a=b'], 'b=a', { outro: 'Válida.' }),
    A('Con un particular', 'FOL', [], 'a=b⊃(∃xSxa⊃(a=a∧∃xSxb))', { outro: 'Válida: el ejemplo del libro.' }),
    A('Alguien igual a cada uno', 'FOL', ['a=b'], '∀x∃y(Py∧x=y)', {
      outro: 'Inválida: nada obliga a que algo sea P.' }),
    T('Problemas filosóficos', [
      { say: 'Se suele leer {∃x} como «existe un x tal que». Como el dominio no puede estar vacío, {∃x(A∨¬A)} es una verdad lógica: que algo existe sería verdad de lógica. No lo parece: podría no haber habido nada.' },
      { say: 'Además, todo nombre denota, así que vale {A(a) ⊢ ∃xA}. Pero «Pegaso no existe» parece verdadero, y «existe algo que no existe» es falso. Y hay casos sin «existe»: «Sherlock Holmes es un personaje de ficción», «estoy pensando en Sherlock Holmes».' },
      { say: 'También vale la sustitución de idénticos en general. Contraejemplos aparentes: «a» es la primera letra del alfabeto (pero ahí se habla de la letra, no de a). Más duro: un bebé en una foto y una adulta en otra son la misma persona; la adulta no es un bebé. Habría que añadir el tiempo.' },
      { say: 'Y los contextos intencionales: sé que George Eliot fue novelista, pero no sabía que Mary Anne Evans lo fuera, aunque son la misma persona. Volveremos a todo esto en los próximos capítulos.', mood: 'think' }
    ]),
    Q('Primer orden', [
      { q: '¿Por qué {∃x(Px∨¬Px)} es válida en la lógica clásica?', opts: ['porque todo es P', 'porque el dominio no puede estar vacío', 'por la identidad'], ok: 1, why: 'Siempre hay al menos un objeto, y cumple {Px∨¬Px}.' },
      { q: 'En la regla del particular, el nombre debe ser…', opts: ['cualquiera de la rama', 'nuevo en la rama', 'a'], ok: 1, why: 'No sabemos qué objeto es: no podemos suponer que ya tiene nombre.' },
      { q: 'Que los árboles de primer orden puedan no terminar se relaciona con…', opts: ['el teorema de Church', 'la compacidad', 'el teorema de Gödel sobre la completitud'], ok: 0, why: 'La validez de primer orden no es decidible.' },
      { q: 'El caso de George Eliot y Mary Anne Evans pone en duda…', opts: ['la sustitución de idénticos', 'la universal', 'el tercio excluso'], ok: 0, why: 'En contextos de conocimiento o pensamiento, sustituir nombres de lo mismo puede cambiar el valor de verdad.' }
    ]),
    A('Jefe de alta mar', 'FOL', ['∀x(Px⊃∃yQxy)', '∀x∀y(Qxy⊃Sy)', 'Pa'], '∃xSx', { boss: true,
      intro: 'Tres premisas y un particular escondido.',
      outro: '¡Válida!' }),
    V('La máquina de primer orden', { sys: ['FOL'], syms: '¬∧∨⊃≡∀∃=', goals: ['valid', 'invalid', 'own'],
      intro: 'La máquina instancia cuantificadores y aplica la identidad. Si el árbol crece sin fin, te avisará.',
      outro: 'Los árboles de primer orden son completos, pero no deciden: la validez de primer orden es indecidible.',
      ex: [[['∀x(Px⊃Qx)', 'Pa'], 'Qa', 'valid'], [['∃xPx', '∃xQx'], '∃x(Px∧Qx)', 'invalid'], [['∀x∃yRxy'], '∃y∀xRxy', 'unknown'], [['a=b', 'Pa'], 'Pb', 'valid'], [[], '∃x(Px∨¬Px)', 'valid'], [['∀x(Px∨Qx)'], '∀xPx∨∀xQx', 'invalid']] })
  ]
});
})(window.CONTENT);
