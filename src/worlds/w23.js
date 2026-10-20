/* Capítulo 23 · Lógicas con faltas, excesos y mundos, cuantificadas */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 23, num: '23', name: 'Escaleras Imposibles', logic: 'N4, N*, K4, K* de primer orden; identidad relevante; I4 y W cuantificadas', badge: '∀→',
  intro: 'Entre las algas, escaleras que suben y bajan a la vez: los mundos imposibles vuelven, ahora con cuantificadores e identidad. Es el puente hacia las relevantes cuantificadas.',
  stages: [
    T('Matrices, otra vez', [
      { say: 'A estas alturas tenemos muchas técnicas que combinar: mundos normales y no normales, dominios constantes y variables, varios valores, negación con estrella, identidad necesaria y contingente. Las combinaciones son demasiadas; vemos las más notables.' },
      { say: 'En N4 y N*, los condicionales reciben valores arbitrarios en los mundos no normales. Con cuantificadores, eso rompe el lema de denotación, como en el capítulo 18. La solución es la misma: las <b>matrices</b> de los condicionales se comportan como predicados en los mundos imposibles.' },
      { say: 'Los árboles de N4 y N* de primer orden son los proposicionales (con las reglas de → solo en el mundo 0) más las reglas de los cuantificadores de FDE, con el número del mundo. Los de K4 y K*, sin mundos no normales: las reglas de → en todos los mundos.',
        fig: tab('QN4', ['∀x(Px→Qx)'], '∃xPx→∃xQx') }
    ]),
    A('Del universal al particular', 'QN4', ['∀x(Px→Qx)'], '∃xPx→∃xQx', { outro: 'Válida en N4 de primer orden.' }),
    A('Sin distribución como ley', 'QN4', [], '∀x(Px→Qx)→(∀xPx→∀xQx)', { outro: 'Inválida en N4: en el mundo 1, no normal, nada obliga a los condicionales.' }),
    A('Contraposición con estrella', 'QN*', ['∀x(Px→Qx)'], '∃x¬Qx→∃x¬Px', { outro: 'Válida en N* de primer orden.' }),
    A('Sin mundos imposibles', 'QK4', [], '∀x(Px→Qx)→(∀xPx→∀xQx)', { outro: 'Válida en K4: sin mundos no normales, la ley vale.' }),
    A('Un existencial con estrella', 'QK*', ['∃x(Px→Qx)'], '∃xPx→¬∃xQx', { outro: 'Inválida en K*.' }),
    T('Identidad relevante', [
      { say: 'Lo directo sería dar a = la extensión {⟨d, d⟩} en todo mundo. Pero en N4 y N*, que son relevantes, eso daría {a=b ⊢ A→a=b}, y en particular {⊢ A→a=a}: una fórmula cualquiera implicaría una ley de identidad. Es un caso de la inferencia de B a A→B, que las relevantes rechazan.' },
      { say: 'El fallo es claro: en los mundos imposibles pueden fallar las verdades lógicas, y {a=a} es una. Así que en los mundos no normales la extensión de = es arbitraria; solo en los normales es {⟨d, d⟩}.' },
      { say: 'En los árboles, la sustitución parte de identidades en el mundo 0 y puede usarse en cualquier mundo (en los no normales, también sobre condicionales). En K4 y K* hace falta además la invariancia de la identidad.' }
    ]),
    T('Predicación relevante', [
      { say: 'En la lógica clásica, {Pa} equivale a {∀x(x=a⊃Px)}. En las relevantes, {∀x(x=a→Px)} implica {Pa} pero no al revés. Escribamos [Px](a) para {∀x(x=a→Px)}: P es <b>relevantemente predicable</b> de a.' },
      { say: 'Sirve para algo que la filosofía busca: propiedades inherentes. Si Alberto piensa en la Luna, eso es inherente a Alberto, no a la Luna: si dejara de pensar, él cambiaría, la Luna no. «Tam» trata a los dos por igual; la predicación relevante distingue.' },
      { say: 'Igual con las relaciones: que a esté en Londres y b en St Andrews no es una relación real entre ellos; estar casados sí. La relevante permite decir que [Mxy](a, b) es verdadera y [Sxy](a, b) no.', mood: 'think' }
    ]),
    T('Negación construible cuantificada', [
      { say: 'Por último, I4 con cuantificadores: la estructura de mundos de la intuicionista (R reflexiva y transitiva, dominios crecientes, herencia para extensión y antiextensión) y los valores de K4.' },
      { say: '{∃xA} es verdadera en w si A lo es de algo de D<sub>w</sub>; falsa, si en todo mundo posterior A es falsa de todo. {∀xA} es verdadera si en todo mundo posterior A es verdadera de todo; falsa, si es falsa de algo de D<sub>w</sub>: la falsedad hay que construirla.',
        fig: table(['', 'verdadera en w si…', 'falsa en w si…'], [['{∃xA}', 'algún d de D<sub>w</sub> la cumple', 'en todo w′ ≥ w, es falsa de todo'], ['{∀xA}', 'en todo w′ ≥ w, es verdadera de todo', 'algún d de D<sub>w</sub> la falsa']]) },
      { say: 'Los árboles combinan los de la intuicionista cuantificada con la negación de I4. I3 añade la exclusión; W, el cambio de Wansing. Sin negación, todo coincide con la intuicionista. La identidad es contingente, con herencia.' }
    ]),
    A('Construir una refutación', 'QI4', ['∃x(¬Px∧¬Qx)'], '¬∀x(Px∨Qx)', { outro: 'Válida en I4 de primer orden: el objeto que falsa a los dos falsa la disyunción.' }),
    A('Sin tercio excluso cuantificado', 'QI4', ['∀x(Px⊐Qx)'], '¬∀xPx∨∀xQx', { outro: 'Inválida en I4.' }),
    A('Explosión con exclusión', 'QI3', ['∃x(Px∧¬Px)'], 'q', { outro: 'Válida en I3: nada puede ser P y no P.' }),
    A('…y sin ella', 'QI4', ['∃x(Px∧¬Px)'], 'Qa', { outro: 'Inválida en I4.' }),
    Q('Escaleras', [
      { q: '¿Por qué en N4 la identidad no puede tener la extensión {⟨d, d⟩} en los mundos no normales?', opts: ['porque entonces {A→a=a} sería válida', 'porque no hay objetos', 'porque falla la transitividad'], ok: 0, why: 'En los mundos imposibles pueden fallar las verdades lógicas, también las de la identidad.' },
      { q: '[Px](a) significa…', opts: ['{Pa}', '{∀x(x=a→Px)}', '{∃x(x=a∧Px)}'], ok: 1, why: 'Es la predicación relevante.' },
      { q: 'En I4, {∀xA} es falsa en w si…', opts: ['en algún mundo posterior falla', 'A es falsa de algún objeto de D<sub>w</sub>', 'nunca'], ok: 1, why: 'La falsedad se construye ahí mismo, como en la negación construible.' }
    ]),
    A('Jefe de las escaleras', 'QN*', [], '∀x(Px→Qx)→(∃x¬Qx→∃x¬Px)', { boss: true, outro: '¡Inválida en N*! La contraposición vale como regla, pero no como ley.' }),
    V('La máquina imposible', { sys: ['QN4', 'QN*', 'QK4', 'QK*', 'QI4', 'QI3'], syms: '¬∧∨→⊐∀∃', goals: ['valid', 'invalid', 'split'],
      intro: 'Lógicas de mundos imposibles y de negación construible, con cuantificadores.',
      outro: 'Lo que vale en N4 vale en K4; no al revés.',
      ex: [[[], '∀x(Px→Qx)→(∀xPx→∀xQx)', 'invalid', 'QN4'], [[], '∀x(Px→Qx)→(∀xPx→∀xQx)', 'valid', 'QK4'], [['∀x(Px→Qx)'], '∃x¬Qx→∃x¬Px', 'valid', 'QN*'], [['∀x(Px→Qx)'], '∃x¬Qx→∃x¬Px', 'invalid', 'QN4'], [['∃x(Px∧¬Px)'], 'q', 'valid', 'QI3'], [['∃x(Px∧¬Px)'], 'Qa', 'invalid', 'QI4']] })
  ]
});
})(window.CONTENT);
