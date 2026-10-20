/* Capítulo 22 · FDE de primer orden */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 22, num: '22', name: 'Laguna de las Luciérnagas', logic: 'FDE, K3 y LP de primer orden; versiones libres; estrella e identidad', badge: '∀b',
  intro: 'De noche la laguna brilla con luciérnagas arriba y plancton abajo: verdad y falsedad por separado, ahora con cuantificadores. Vuelven los árboles con signo.',
  stages: [
    T('FDE con cuantificadores', [
      { say: 'Una interpretación de FDE de primer orden es ⟨D, ν⟩. Cada predicado tiene una <b>extensión</b> (aquello de lo que es verdadero) y una <b>antiextensión</b> (aquello de lo que es falso), sin que se excluyan ni se agoten.' },
      { say: 'Las condiciones: {∀xA} es verdadera si A lo es de todo; falsa si lo es de algo. {∃xA} es verdadera si A lo es de algo; falsa si lo es de todo. Valen {¬∃xA} = {∀x¬A} y {¬∀xA} = {∃x¬A}, en verdad y en falsedad.',
        fig: table(['', 'verdadera si…', 'falsa si…'], [['{∀xA}', 'A(d) es verdadera para todo d', 'A(d) es falsa para algún d'], ['{∃xA}', 'A(d) es verdadera para algún d', 'A(d) es falsa para todo d']]) },
      { say: 'Con cuatro valores, {∀} toma la cota inferior máxima en el diamante y {∃} la superior mínima. Con exclusión sale K3 cuantificada; con exhaustividad, LP. Las dos juntas, la clásica.' }
    ]),
    T('Árboles para FDE de primer orden', [
      { say: 'Se añaden a los árboles de FDE (capítulo 8) reglas para los cuantificadores con signo:',
        fig: rule(r(['{∀xA,+}'], [['{A(a),+}']], 'cada a'), r(['{∀xA,−}'], [['{A(c),−}']], 'c nuevo'), r(['{∃xA,+}'], [['{A(c),+}']], 'c nuevo'), r(['{∃xA,−}'], [['{A(a),−}']], 'cada a'), r(['{¬∀xA,±}'], [['{∃x¬A,±}']]), r(['{¬∃xA,±}'], [['{∀x¬A,±}']])) },
      { say: 'El contramodelo: un objeto por nombre; la extensión de P, lo que dicen los {Pa…,+}; la antiextensión, lo que dicen los {¬Pa…,+}. (Se miran los más, no los menos.) Para K3 y LP se añaden sus cierres.',
        fig: tab('QFDE', ['∀xPx', '∀x(Px⊃Qx)'], '∀xQx') }
    ]),
    A('Repartir el universal', 'QFDE', ['∀x(Px∧Qx)'], '∀xPx∧∀xQx', { outro: 'Válida en FDE de primer orden.' }),
    A('Sin modus ponens universal', 'QFDE', ['∀xPx', '∀x(Px⊃Qx)'], '∀xQx', { outro: 'Inválida en FDE: Pc es verdadera y falsa, y Qc ni una cosa ni la otra.' }),
    A('Con exclusión', 'QK3', ['∀xPx', '∀x(Px⊃Qx)'], '∀xQx', { outro: 'Válida en K3: sin excesos de verdad, el silogismo disyuntivo vuelve.' }),
    A('Tercio excluso universal', 'QLP', [], '∀x(Px∨¬Px)', { outro: 'Válida en LP.' }),
    A('Dos que no coinciden', 'QFDE', ['∃xPx∧∃xQx'], '∃x(Px∧Qx)', { outro: 'Inválida, como en todas las del capítulo 21.' }),
    T('Versiones libres', [
      { say: 'FDE libre: un dominio interior E, la extensión de E igual a E (su antiextensión puede ser cualquiera), y cuantificadores sobre E. Las reglas del universal verdadero y el particular no verdadero ramifican con {Ea,−}; las otras dos traen {Ec,+}.' },
      { say: 'Las restricciones de neutralidad y negatividad se escriben así: negatividad, si algo está en la extensión de un predicado, existe (regla: de {Pa,+} a {Ea,+}); neutralidad, si está en la extensión o en la antiextensión (además: de {¬Pa,+} a {Ea,+}). Los cuantificadores interiores, de nuevo, no se definen con E.' }
    ]),
    A('Repartir, en libre', 'FFDE', ['∀x(Px∧Qx)'], '∀xPx∧∀xQx', { outro: 'Válida en FDE libre.' }),
    A('Lo que tiene propiedades existe', 'FFDE−', ['Pa'], '∃xPx', { intro: 'Usa la regla de negatividad (NCR) del panel.', outro: 'Válida en la FDE libre negativa.' }),
    A('Neutralidad', 'FFDE0', ['¬Pa'], 'Ea', { outro: 'Válida en la neutra: también lo que es falso de algo, existe.' }),
    A('…pero no en la negativa', 'FFDE−', ['¬Pa'], 'Ea', { outro: 'Inválida en la negativa: solo la verdad compromete con la existencia.' }),
    T('Identidad', [
      { say: 'En la semántica relacional, la extensión de = es {⟨d, d⟩}; su antiextensión puede ser cualquier conjunto. Las reglas: {a=a,+}, y la sustitución, que aquí vale también para atómicas negadas: de {a=b,+} y {¬Pa,+}, {¬Pb,+}.' },
      { say: 'Con la estrella, identidad necesaria: la misma extensión en todos los mundos, y la regla de invariancia entre 0 y 0#. Ahora las dos semánticas dejan de ser equivalentes: con estrella vale {a=b∨¬a=b}; con la relacional, no.',
        fig: tab('QFDE*', [], 'a=b∨¬a=b') }
    ]),
    A('Sustitución en FDE', 'QFDE', ['a=b', 'b=c', 'Pa'], 'Pc', { outro: 'Válida.' }),
    A('Todo es idéntico a sí mismo', 'QFDE', [], '∀x x=x', { outro: 'Válida en FDE.' }),
    A('Pero no se sigue la diferencia', 'QFDE', ['a=b', 'b=c', 'Pa', '¬Pc'], '¬a=c', { outro: 'Inválida: la antiextensión de la identidad puede estar vacía.' }),
    A('Con estrella', 'QFDE*', ['a=b∧¬Pa'], '¬Pb', { intro: 'Necesitarás la regla de invariancia (IIR) para llevar a=b al mundo 0#.', outro: 'Válida con la estrella.' }),
    A('Identidad decidida', 'QFDE*', [], 'a=b∨¬a=b', { outro: 'Válida con la estrella.' }),
    A('…e indecisa', 'QFDE', [], 'a=b∨¬a=b', { outro: 'Inválida con la semántica relacional: a=b puede ser ni verdadera ni falsa.' }),
    Q('Luciérnagas', [
      { q: 'En FDE de primer orden, cada predicado tiene…', opts: ['solo una extensión', 'una extensión y una antiextensión', 'un valor por mundo'], ok: 1, why: 'Lo que es verdadero de algo y lo que es falso de algo, por separado.' },
      { q: 'Para leer el contramodelo de un árbol de FDE se miran…', opts: ['las líneas con +', 'las líneas con −', 'todas'], ok: 0, why: '{Pa,+} pone a a en la extensión; {¬Pa,+}, en la antiextensión.' },
      { q: '¿En qué semántica vale {a=b∨¬a=b}?', opts: ['relacional', 'con estrella', 'en ambas'], ok: 1, why: 'Con identidad, las dos semánticas dejan de coincidir.' }
    ]),
    A('Jefe de la laguna', 'QLP', ['∀x(Px∨Qx)', '∀x¬Px'], '∀xQx', { boss: true, outro: '¡Inválida en LP! El silogismo disyuntivo cuantificado tampoco vale.' }),
    V('La máquina de las luciérnagas', { sys: ['QFDE', 'QK3', 'QLP', 'FFDE', 'QFDE*', 'FOL'], syms: '¬∧∨⊃∀∃=', goals: ['valid', 'invalid', 'gap'], cmp: 'FOL',
      intro: 'Árboles con signo y cuantificadores. Busca una inferencia clásica que falle aquí.',
      outro: 'FDE es una sublógica de K3 y de LP, y las tres de la clásica.',
      ex: [[['∀xPx', '∀x(Px⊃Qx)'], '∀xQx', 'invalid', 'QFDE'], [['∀xPx', '∀x(Px⊃Qx)'], '∀xQx', 'valid', 'QK3'], [[], '∀x(Px∨¬Px)', 'valid', 'QLP'], [[], 'a=b∨¬a=b', 'invalid', 'QFDE'], [[], 'a=b∨¬a=b', 'valid', 'QFDE*'], [['∀x(Px∧Qx)'], '∀xPx∧∀xQx', 'valid', 'FFDE']] })
  ]
});
})(window.CONTENT);
