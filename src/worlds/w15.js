/* Capítulo 15 · Lógicas modales de dominio variable */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 15, num: '15', name: 'Pozas de Marea', logic: 'Lógicas modales de dominio variable (VK y extensiones); existencia entre mundos', badge: '◇E',
  intro: 'En las pozas de marea, unas veces hay agua y peces, otras no. Lo que existe cambia de mundo en mundo, y la lógica se vuelve libre.',
  stages: [
    T('¿Por qué dominios variables?', [
      { say: 'Lo que existe parece variar entre mundos: yo existo aquí, pero no en un mundo donde mis padres no se conocieron; Sherlock Holmes no existe aquí, pero sí en el mundo de las novelas.' },
      { say: 'Lo mismo se ve con dos fórmulas válidas en CK: la de <b>Barcan</b>, {∀x□A⊃□∀xA}, y su <b>conversa</b>, {□∀xA⊃∀x□A}. Intuitivamente fallan: puede haber en otros mundos objetos que aquí no existen, o pueden faltar allá los de aquí.' },
      { say: 'Si el dominio varía, la instanciación universal falla: que todo lo que hay en w sea P no dice nada de un b que no existe en w. La solución más robusta: montar la lógica modal sobre la lógica <b>libre</b>, con el predicado de existencia E.' }
    ]),
    T('VK y sus árboles', [
      { say: 'Una interpretación de dominio variable asigna a cada mundo w un dominio D<sub>w</sub> ⊆ D, que es la extensión de E en w. Los cuantificadores recorren D<sub>w</sub> en cada mundo. Así sale <b>VK</b>, y sus extensiones con ρ, σ, τ.' },
      { say: 'Los árboles son los de CK con las reglas libres de los cuantificadores, mundo a mundo:',
        fig: rule(r(['{∀xA, i}'], [['{¬Ea, i}'], ['{A(a), i}']]), r(['{∃xA, i}'], [['{Ec, i}', '{A(c), i}']], 'c nuevo')) },
      { say: 'El contramodelo: D<sub>wi</sub> son los objetos con {Ea, i} en la rama. Aquí, la fórmula de Barcan falla con w0 de dominio vacío y w1 con un objeto que no es P.',
        fig: tab('VK', [], '∀x□Px⊃□∀xPx') }
    ]),
    A('Barcan falla', 'VK', [], '∀x□Px⊃□∀xPx', { outro: 'Inválida en VK: en otro mundo puede haber objetos que aquí no existen.' }),
    A('La conversa también', 'VK', [], '□∀xPx⊃∀x□Px', { outro: 'Inválida en VK: un objeto de aquí puede no existir allá.' }),
    A('La distribución sí', 'VK', ['□∀x(Px⊃Qx)'], '□∀xPx⊃□∀xQx', { outro: 'Válida en VK.' }),
    A('Barcan en VS5', 'VS5', [], '∀x□Px⊃□∀xPx', { outro: 'Inválida incluso en VS5 = VKυ.' }),
    T('Tiempo y otras extensiones', [
      { say: 'VKt es lo mismo con operadores temporales, y sus extensiones se obtienen con condiciones sobre «anterior a».' },
      { say: 'Una condición híbrida: <b>dominios crecientes</b>. Si wRw′, D<sub>w</sub> ⊆ D<sub>w′</sub>. Regla: de {irj} y {Ea, i}, {Ea, j}. Valida la conversa de Barcan, pero también que lo que existe existe necesariamente, o para siempre. Poco plausible (salvo quizá para la intuicionista, capítulo 20).' },
      { say: 'Y la versión <b>negativa</b>: nada está en la extensión de un predicado en un mundo donde no existe. Regla NCR: de {Pa₁…aₙ, i}, {Ea₁, i}…{Eaₙ, i}. Con ella vale {◇Pa ⊢ ◇∃xPx}.' }
    ]),
    A('Lo que existe ya existía', 'VKτt', ['⟨P⟩⟨P⟩∃xQx'], '⟨P⟩∃x(Qx∨Sx)', { outro: 'Válida en VKτt.' }),
    A('Pasado y futuro con dominios', 'VKt', ['∃x⟨P⟩Qx∧∃xQx'], '∃x⟨F⟩Qx', { outro: 'Inválida en VKt.' }),
    A('Dominios crecientes', 'VK+', [], '□∀xPx⊃∀x□Px', {
      intro: 'Usa la regla <b>DI</b> del panel.',
      outro: 'Válida con dominios crecientes: la conversa de Barcan vuelve.' }),
    A('Posible, luego posible que exista', 'VK−', ['◇Pa'], '◇∃xPx', {
      intro: 'En la versión negativa, usa la regla <b>NCR</b>.',
      outro: 'Válida en la VK negativa. En la positiva no.' }),
    T('¿Se existe en más de un mundo?', [
      { say: 'Hay quien dice que ningún objeto concreto existe en más de un mundo: como nada está en dos lugares, nada estaría en dos mundos. O: si a, aquí, es rojo, y b, allá, no lo es, por sustitución de idénticos a ≠ b.' },
      { say: 'Con la restricción de negatividad eso lleva a un fatalismo: si a solo existe aquí, {Pa} es falsa en todo otro mundo, y lo único posible sería lo que de hecho es. David Lewis lo evitó con <b>contrapartes</b>: lo que es posible para a lo es para algo suficientemente parecido a a en otro mundo.' },
      { say: 'Las contrapartes no tienen por qué ser únicas, ni existir, ni la relación ser simétrica o transitiva. Y hay una objeción famosa de Kripke: cuando digo que Humphrey podría haber ganado, hablo de Humphrey, no de alguien parecido a él.', mood: 'think' },
      { say: 'Otro asunto: el cuantificador particular y la existencia. Con cuantificadores exteriores, que recorren todo D, se puede decir «hay algo que no existe aquí pero existe en otro mundo», sin contradicción.' }
    ]),
    Q('Dominios variables', [
      { q: 'En VK, la fórmula de Barcan…', opts: ['vale', 'falla', 'vale solo en VS5'], ok: 1, why: 'Falla incluso en VS5.' },
      { q: 'La regla de dominios crecientes valida…', opts: ['la fórmula de Barcan', 'la conversa de Barcan', 'ninguna'], ok: 1, why: 'Los objetos de aquí siguen existiendo en los mundos accesibles.' },
      { q: 'Las contrapartes de Lewis sirven para…', opts: ['evitar que todo sea fatal si nada existe en dos mundos', 'probar la fórmula de Barcan', 'definir la identidad'], ok: 0, why: 'Lo posible para a se mide por lo que pasa a sus contrapartes.' }
    ]),
    A('Jefe de las pozas', 'VS4', ['□∀x(Px⊃Qx)', '◇∃xPx'], '◇∃xQx', { boss: true, outro: '¡Válida en VS4!' }),
    V('La máquina variable', { sys: ['VK', 'VT', 'VS4', 'VS5', 'VK+', 'VK−', 'CK'], syms: '¬∧∨⊃∀∃□◇', goals: ['valid', 'invalid', 'split'],
      intro: 'Compara dominio variable y constante. Escribe {E} para la existencia.',
      outro: 'Todo lo válido en VK lo es en CK, pero no al revés.',
      ex: [[[], '∀x□Px⊃□∀xPx', 'invalid', 'VK'], [[], '∀x□Px⊃□∀xPx', 'valid', 'CK'], [[], '□∀xPx⊃∀x□Px', 'valid', 'VK+'], [['◇Pa'], '◇∃xPx', 'valid', 'VK−'], [['◇Pa'], '◇∃xPx', 'invalid', 'VK'], [['□∀x(Px⊃Qx)'], '□∀xPx⊃□∀xQx', 'valid', 'VK']] })
  ]
});
})(window.CONTENT);
