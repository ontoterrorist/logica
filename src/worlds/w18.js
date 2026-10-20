/* Capítulo 18 · Lógicas modales no normales cuantificadas */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 18, num: '18', name: 'Galeón Hundido', logic: 'Lógicas no normales cuantificadas: CL, VL, CN, VN; matrices', badge: '◇∃',
  intro: 'Un galeón más grande que el pecio del capítulo 4, con más camarotes donde la lógica no rige. Los mundos no normales vuelven, ahora con cuantificadores.',
  stages: [
    T('El problema de los mundos no normales', [
      { say: 'Las técnicas de cuantificación pasan con naturalidad a otras semánticas de mundos. Empezamos con las lógicas no normales. Este capítulo es técnico: según Priest, cuantificadores e identidad no traen aquí problemas filosóficos nuevos.' },
      { say: 'En un mundo no normal, las fórmulas {□A} y {◇A} reciben valores que no dependen de A. Hacerlo a lo bruto da problemas con los cuantificadores: {□Pa} y {□Pb} podrían tener valores distintos aunque a = b. Falla el lema de denotación.' },
      { say: 'La solución: tratar una fórmula modal con n variables libres como un predicado de n lugares. Su <b>matriz</b> se obtiene cambiando cada aparición de un nombre por una variable nueva: la matriz de {□Sab} es {□Sv₁v₂}. En un mundo no normal, cada matriz tiene una extensión, y {□Sab} es verdadera allí si ⟨a, b⟩ está en ella.' }
    ]),
    T('CL y sus árboles', [
      { say: '<b>CL</b> es la L del capítulo 4 (S0.5⁰) con dominio constante. Los árboles: los de L (las reglas modales solo en el mundo 0) más las reglas clásicas de los cuantificadores.',
        fig: tab('CL(L)', [], '□(∃x◇(Px∧Qx)⊃∃x◇Px)') },
      { say: 'El contramodelo se lee como en el caso normal, con todos los mundos salvo 0 no normales; y en cada uno de ellos, la extensión de una matriz son las tuplas cuyas instancias aparecen en la rama.' }
    ]),
    A('Instanciar bajo la caja', 'CL(L)', [], '∀x□Px⊃□Pa', { outro: 'Válida en CL(L).' }),
    A('En un mundo sin leyes', 'CL(L)', [], '□(∃x◇(Px∧Qx)⊃∃x◇Px)', { outro: 'Inválida en CL(L): el mundo 1 no es normal, y ahí ◇ no tiene reglas.' }),
    T('Cambios de tono', [
      { say: '<b>VL</b> es la versión de dominio variable: los cuantificadores siguen las reglas libres, como en el capítulo 15.' },
      { say: '<b>CN</b> y <b>VN</b> son las versiones cuantificadas de N: en los mundos no normales toda matriz {□A} tiene extensión vacía y toda {◇A} la total. En los árboles, la regla de {◇} solo se activa en 0 o en mundos □-habitados.' },
      { say: 'Y se pueden añadir condiciones sobre R: CLρ, VNρ… En N y sus extensiones, de hecho, las matrices sobran: basta con que {□A} sea falsa y {◇A} verdadera en los mundos no normales.' }
    ]),
    A('Libre y no normal', 'VL', [], '□(∃x□Px⊃∃xPx)', { outro: 'Inválida en VL.' }),
    A('Habitado o no', 'CN', [], '∀x□Px⊃∀x□(Qx∨□Qx)', { outro: 'Inválida en CN: un mundo □-habitado se vuelve normal, pero el siguiente no.' }),
    A('Cuantificar en N', 'CN', ['∀x□(Px⊃Qx)', '□Pa'], '□Qa', { outro: 'Válida en CN.' }),
    A('Con reflexividad', 'CLρ', [], '□(◇∃xPx⊃¬◇∃xQx)', { outro: 'Inválida en CLρ: un caso raro, sin nombres en todo el árbol, donde el dominio es un solo objeto sin nombre.' }),
    T('Identidad no normal', [
      { say: 'Para la identidad necesaria, su extensión es la misma en todos los mundos, normales o no. Los árboles añaden las reglas del capítulo 16, con un cambio: en un mundo no normal, la sustitución de idénticos puede aplicarse también a fórmulas modales.' },
      { say: 'Con la identidad contingente, igual, sin la regla de invariancia. Y los mundos no normales anuncian los mundos imposibles de las lógicas relevantes, que veremos cuantificadas en los capítulos 23 y 24.' }
    ]),
    Q('Galeón', [
      { q: '¿Para qué sirven las matrices?', opts: ['para que los nombres de un mismo objeto den el mismo valor a las fórmulas modales en mundos no normales', 'para definir la identidad', 'para cerrar ramas'], ok: 0, why: 'Así se recupera el lema de denotación.' },
      { q: 'En CL, las reglas modales se aplican…', opts: ['en todos los mundos', 'solo en el mundo 0', 'solo en los mundos □-habitados'], ok: 1, why: 'Como en L, la versión proposicional.' },
      { q: 'En N cuantificada, ¿hacen falta las matrices?', opts: ['sí, siempre', 'no: basta con □ falsa y ◇ verdadera en los mundos no normales'], ok: 1, why: 'El valor de las fórmulas modales ya no depende de nada arbitrario.' }
    ]),
    A('Jefe del galeón', 'CNρ', ['□∀x(Px⊃Qx)', '□Pa'], 'Qa', { boss: true, outro: '¡Válida en CNρ, la S2 cuantificada!' }),
    V('La máquina del galeón', { sys: ['CL(L)', 'VL', 'CN', 'VN', 'CLρ', 'CNρ', 'CK'], syms: '¬∧∨⊃∀∃□◇', goals: ['valid', 'invalid', 'split'],
      intro: 'Lógicas no normales con cuantificadores. Compáralas con CK.',
      outro: 'Cada lógica no normal queda por debajo de su versión normal.',
      ex: [[[], '∀x□Px⊃□Pa', 'valid', 'CL(L)'], [[], '□(∃x◇(Px∧Qx)⊃∃x◇Px)', 'invalid', 'CL(L)'], [[], '□(∃x◇(Px∧Qx)⊃∃x◇Px)', 'valid', 'CK'], [['∀x□(Px⊃Qx)', '□Pa'], '□Qa', 'valid', 'CN'], [[], '□(∃x□Px⊃∃xPx)', 'invalid', 'VL'], [['□∀x(Px⊃Qx)', '□Pa'], 'Qa', 'valid', 'CNρ']] })
  ]
});
})(window.CONTENT);
