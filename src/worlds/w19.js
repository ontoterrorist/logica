/* Capítulo 19 · Lógicas condicionales cuantificadas */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 19, num: '19', name: 'Puerto Sumergido', logic: 'Lógicas condicionales cuantificadas: CC, VC, CC⁺, VC⁺', badge: '∀>',
  intro: 'En el puerto hundido los barcos ya no zarpan, pero se puede pensar adónde irían si zarparan. Juntamos los condicionales ceteris paribus del capítulo 5 con los cuantificadores.',
  stages: [
    T('CC y VC', [
      { say: 'El lenguaje de primer orden con {>}. Una interpretación de <b>CC</b> (C de dominio constante) tiene un dominio D, mundos, una relación R<sub>A</sub> por cada fórmula A y extensiones mundo a mundo; los modales van como en S5.' },
      { say: 'Hace falta una condición: si a y b denotan lo mismo, R<sub>A(a)</sub> = R<sub>A(b)</sub> (la condición de accesibilidad y denotación). Sin ella, {Pa>A} y {Pb>A} podrían diferir aunque a = b, y el lema de denotación fallaría.' },
      { say: 'Los árboles de CC son los de C más las reglas de los cuantificadores con dominio constante; los de <b>VC</b>, con las reglas libres. El contramodelo se lee como en el capítulo 5, con dominio y extensiones como en el 14 o el 15.',
        fig: tab('CC', ['∀x(Px>Qx)'], '∀xPx>∀xQx') }
    ]),
    A('Generalizar en el consecuente', 'CC', ['p>Pa'], 'p>∃xPx', { outro: 'Válida en CC.' }),
    A('Repartir el universal', 'CC', ['∀x(Px>Qx)'], '∀xPx>∀xQx', { outro: 'Inválida en CC: la relación de {∀xPx} no tiene por qué ser la de {Pa}.' }),
    A('Debilitar dentro del universal', 'VC', ['∀x(p>Px)'], '∀x(p>(Px∨Qx))', { outro: 'Válida en VC.' }),
    A('Fortalecer dentro del universal', 'VC', ['∀x(Px>Sx)'], '∀x((Px∧Qx)>Sx)', { outro: 'Inválida en VC, como fortalecer el antecedente en el capítulo 5.' }),
    T('Extensiones', [
      { say: 'Las lógicas cuantificadas básicas son muy débiles: no valen {∀xPx>Pa}, ni {(∀xPx∧∀xQx)>∀x(Px∧Qx)}, ni {Pa, ∀x(Px>Qx) ⊢ Qa}, ni {∀x□(Px⊃Qx) ⊢ ∀x(Px>Qx)}.' },
      { say: 'Con las condiciones (1) y (2) del capítulo 5 salen <b>CC⁺</b> y <b>VC⁺</b>, y todas esas valen (en VC⁺, añadiendo que a existe). La regla de centrado solo hace falta para antecedentes cerrados de condicionales de la rama.' },
      { say: 'Con esferas salen las versiones cuantificadas de S, C1 y C2. Allí la condición de accesibilidad y denotación se cumple sola. No hay árboles del tipo del libro: se argumenta directamente o se buscan contramodelos a ojo.' }
    ]),
    A('Del todo a uno, ceteris paribus', 'CC', [], '∀xPx>Pa', { outro: 'Inválida en CC.' }),
    A('…y en CC⁺', 'CC+', [], '∀xPx>Pa', { intro: 'Usa la regla de centrado (C+).', outro: 'Válida en CC⁺: en los mundos de ∀xPx vale ∀xPx.' }),
    A('Modus ponens cuantificado', 'VC+', ['Ea', 'Pa', '∀x(Px>Qx)'], 'Qa', { outro: 'Válida en VC⁺, con la premisa de que a existe.' }),
    A('Lo estricto implica lo ceteris paribus', 'CC+', ['∀x□(Px⊃Qx)'], '∀x(Px>Qx)', { outro: 'Válida en CC⁺.' }),
    A('Pero no lo que vale de todos', 'CC+', ['∀xQx'], '∀x(Px>Qx)', { outro: 'Inválida en CC⁺: los mundos de Pa pueden ser otros, donde Qa falla.' }),
    T('Identidad y condicionales', [
      { say: 'La identidad se añade como antes. Con identidad necesaria hace falta una regla más: de {a=b} e {i r_A(a) j}, pasar a {i r_A(b) j}. Con identidad contingente, en cambio, {a=b, Pa>Pa ⊢ Pa>Pb} puede fallar.' },
      { say: '¿Dominio constante o variable para los condicionales? «Si Papá Noel existiera, no tendríamos que comprar regalos» parece verdadero, y para evaluarlo hay que mirar mundos donde existe algo que aquí no existe. Variable, o constante con un predicado de existencia que varíe.' },
      { say: 'Pero «para todo x inexistente, si x existiera habría menos cosas» parece falso, y si solo cuantificamos sobre lo existente sale vacuamente verdadero. Así que hace falta cuantificar sobre lo que no existe aquí: dominio constante con E.', mood: 'think' },
      { say: '«Si la Estrella de la Mañana no fuera la de la Tarde, la astronomía moderna estaría muy equivocada» parece verdadero, y pide mundos donde no lo son: identidad contingente. Igual «si yo fuera Rupert Murdoch, tendría más de un millón de dólares», y también, en otro contexto, «si Murdoch fuera yo, tendría menos». La cláusula ceteris paribus depende del contexto.' }
    ]),
    Q('Puerto', [
      { q: '¿Para qué sirve la condición de accesibilidad y denotación?', opts: ['para que {Pa>A} y {Pb>A} coincidan si a = b', 'para cerrar ramas', 'para que el dominio sea constante'], ok: 0, why: 'Sin ella, el lema de denotación falla.' },
      { q: '«Si Papá Noel existiera, no compraríamos regalos» sugiere que…', opts: ['lo que existe varía entre mundos', 'el dominio es vacío', 'la identidad es necesaria'], ok: 0, why: 'Hay que mirar mundos donde existe algo que aquí no.' },
      { q: 'El ejemplo de Rupert Murdoch muestra que…', opts: ['la cláusula ceteris paribus depende del contexto', 'la identidad es necesaria', 'los condicionales son materiales'], ok: 0, why: 'Los dos condicionales parecen verdaderos en contextos distintos.' }
    ]),
    A('Jefe del puerto', 'CC+', ['∃xPx', '∀x(Px>Qx)'], '∃xQx', { boss: true, outro: '¡Válida en CC⁺! Y por tanto también en la S cuantificada.' }),
    V('La máquina del puerto', { sys: ['CC', 'VC', 'CC+', 'VC+'], syms: '¬∧∨⊃>∀∃□◇', goals: ['valid', 'invalid', 'split'],
      intro: 'Condicionales con cuantificadores.',
      outro: 'Las lógicas cuantificadas básicas son débiles; las de centrado, bastante más fuertes.',
      ex: [[[], '∀xPx>Pa', 'invalid', 'CC'], [[], '∀xPx>Pa', 'valid', 'CC+'], [['∀x(Px>Qx)'], '∀xPx>∀xQx', 'invalid', 'CC'], [['∃xPx', '∀x(Px>Qx)'], '∃xQx', 'valid', 'CC+'], [['∀xQx'], '∀x(Px>Qx)', 'invalid', 'CC+'], [['p>Pa'], 'p>∃xPx', 'valid', 'CC']] })
  ]
});
})(window.CONTENT);
