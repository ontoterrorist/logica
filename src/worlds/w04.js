/* Capítulo 4 · Lógicas modales no normales; condicionales estrictos */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 4, num: '4', name: 'Pecio No Normal', logic: 'Lógicas no normales (N, S2, S3, S0.5) y condicional estricto', badge: '⥽',
  intro: 'En este barco hundido hay camarotes donde las leyes de la lógica no rigen: los mundos no normales. Con ellos se modelan los sistemas de C. I. Lewis y su condicional estricto.',
  stages: [
    T('Mundos no normales', [
      { say: 'Una interpretación no normal es ⟨W, N, R, ν⟩: lo de siempre más un conjunto N ⊆ W de mundos <b>normales</b>. Los demás son <b>no normales</b>, y en ellos los operadores modales se comportan distinto.' },
      { say: 'En un mundo no normal, todo {□A} es falso y todo {◇A} es verdadero: «todo es posible y nada es necesario». Las conectivas de siempre funcionan igual, y {¬□A} sigue valiendo lo mismo que {◇¬A}.' },
      { say: 'La validez se define solo con los mundos <b>normales</b>: una inferencia es válida si en todo mundo normal donde valen las premisas vale la conclusión. Si R puede ser cualquiera, la lógica se llama <b>N</b>.',
        fig: table(['Sistema', 'Condiciones', 'Nombre histórico'], [['N', 'ninguna', '—'], ['Nρ', 'reflexiva', 'S2 de Lewis'], ['Nρτ', 'reflexiva y transitiva', 'S3 de Lewis'], ['Nρστ', 'las tres', 'S3.5']]) },
      { say: 'Los mundos no normales se inventaron como truco técnico, para dar semántica a los sistemas de Lewis más débiles que S4 (Lewis creía que S2 era la lógica correcta de la necesidad lógica). Pero tienen un sentido filosófico, como veremos.' }
    ]),
    T('Árboles para N', [
      { say: 'Los árboles de N son los de K con un cambio en la regla de {◇}. Decimos que un mundo i está <b>□-habitado</b> si hay en la rama algo de la forma {□B, i}. La regla de {◇A, i} solo se activa si i es 0 o está □-habitado.' },
      { say: 'La razón: el árbol busca un mundo <i>normal</i> donde fallen premisas y conclusión, así que 0 es normal. Cualquier otro mundo puede suponerse no normal (donde {◇A} es verdad sin más), salvo que tenga algo de la forma {□B}: eso es falso en los no normales.',
        fig: tab('N', [], '□(p⊃q)⊃(□p⊃□q)', 'La regla de {◇} se aplica en 0, que siempre es normal.') },
      { say: 'Aquí, en cambio, el mundo 1 no está □-habitado, así que {◇¬(q⊃q), 1} se queda sin desarrollar y el árbol termina abierto. En el contramodelo, w1 es no normal: lo dibujamos con borde punteado.',
        fig: tab('N', [], '□(p⊃□(q⊃q))') }
    ]),
    A('La ley K, sin normalidad', 'N', ['□(p⊃q)'], '□p⊃□q', {
      outro: 'Válida en N: todo ocurre en el mundo 0 y en los mundos que ve.' }),
    A('Necesidad de una ley lógica', 'N', [], '□(p⊃□(q⊃q))', {
      intro: 'Cuando llegues a una línea con {◇} en el mundo 1, fíjate en si ese mundo está □-habitado.',
      outro: 'Inválida en N: en un mundo no normal, ni siquiera {□(q⊃q)} es verdadera.' }),
    A('Lo mismo en K', 'K', [], '□(p⊃□(q⊃q))', {
      outro: 'En K es válida. K extiende propiamente a N.' }),
    T('Lo que falla sin normalidad', [
      { say: 'Un modelo de K es un modelo de N donde todos los mundos son normales; por eso K extiende a N, y cada lógica normal a su versión no normal. N es la más débil de todas las que hemos visto; S5, la más fuerte.' },
      { say: 'Lo más característico de las lógicas no normales: falla la <b>regla de necesitación</b>. En toda lógica normal, si A es válida, {□A} también. En N, {p∨¬p} vale en todo mundo y {□(p∨¬p)} en todo mundo normal, pero {□□(p∨¬p)} no es válida.' },
      { say: '¿Por qué? Porque en un mundo no normal puede fallar {□(p∨¬p)}: allí la lógica <b>no está garantizada</b>. Esa es la lectura de los mundos no normales: mundos donde las leyes lógicas pueden no valer. La retomaremos en el capítulo 9.', mood: 'think' }
    ]),
    A('Lo necesario en N', 'N', ['□p'], 'p', {
      outro: 'Inválida en N: sin reflexividad, nada obliga a que lo necesario sea verdad.' }),
    A('Lo necesario en S2', 'S2', ['□p'], 'p', {
      outro: 'Válida en S2 = Nρ.' }),
    A('Necesitación doble', 'S2', [], '□□(p∨¬p)', {
      outro: 'Inválida incluso en S2: el mundo 1 puede ser no normal y ahí {□(p∨¬p)} falla.' }),
    A('Un principio de S3', 'S3', [], '(p⥽q)⥽(□p⥽□q)', {
      intro: 'Recuerda: {A⥽B} es {□(A⊃B)}. Necesitarás ρ y τ.',
      outro: 'Válida en S3. En S2 no lo es: falta la transitividad.' }),
    A('El mismo principio en S2', 'S2', [], '(p⥽q)⥽(□p⥽□q)', {
      outro: 'Inválida en S2. Es lo que distingue a S3 de S2.' }),
    T('S0.5', [
      { say: 'Hay una familia todavía más débil. En la lógica <b>L</b> (por Lemmon), las fórmulas modales, {□A} y {◇A}, reciben valores <b>arbitrarios</b> en los mundos no normales: no tienen por qué seguir ninguna regla.' },
      { say: 'Los árboles de L son los de N, pero las cuatro reglas modales solo se aplican en el mundo 0. Lo que pase con {□} o {◇} en otros mundos queda tal cual, y el contramodelo toma esos valores de la rama.',
        fig: tab('L', [], '□(□p∨¬□p)', 'Se cierra: {□p∨¬□p} es verdadera por su forma, sea cual sea el valor de {□p}.') },
      { say: 'L se llama también S0.5⁰, y Lρ es S0.5. Un dato curioso: en L, {□A} es válida exactamente cuando A es una tautología por su forma veritativo-funcional.' }
    ]),
    A('Nada obliga en un mundo no normal', 'L', [], '□(□(p⊃p)∨◇(q∧¬q))', {
      outro: 'Inválida en L: en el mundo 1 no se aplica ninguna regla modal, así que {□(p⊃p)} puede ser falsa ahí.' }),
    T('El condicional estricto', [
      { say: 'Volvamos al condicional. Un condicional material verdadero como «el sol brilla ⊃ Santiago es la capital de Chile» parece demasiado casual. Lewis propuso el <b>condicional estricto</b>: {A⥽B} es {□(A⊃B)}, A implica B en todo mundo posible.' },
      { say: 'El estricto evita todas las objeciones del capítulo 1: no se sigue de B, ni de ¬A, ni valen las formas de los interruptores o de las plegarias. Eso pasa en todas las lógicas modales que hemos visto, incluso en S5.',
        fig: table(['Inferencia', '¿Vale para ⥽?'], [['{q ⊢ p⥽q}', 'no'], ['{¬p ⊢ p⥽q}', 'no'], ['{¬(p⥽q) ⊢ p}', 'no']]) },
      { say: 'Para que valga el modus ponens hace falta al menos ρ: sin reflexividad, {A} y {A⥽B} no dan {B}. Por eso, si el estricto ha de ser el condicional, la necesidad debe ser al menos como la de T (o S0.5 en lo no normal).' }
    ]),
    A('Modus ponens estricto', 'S2', ['p', 'p⥽q'], 'q', {
      outro: 'Válida en S2: con {0r0}, la necesidad de {p⊃q} vale en el propio 0.' }),
    A('Sin reflexividad', 'N', ['p', 'p⥽q'], 'q', {
      outro: 'Inválida en N: hace falta que el mundo real sea uno de los que cuenta {□}.' }),
    A('Sin paradoja material', 'S5', ['q'], 'p⥽q', {
      outro: 'Inválida incluso en S5: que {q} sea verdad no basta para que {p} la implique estrictamente.' }),
    T('Paradojas del estricto', [
      { say: 'Pero el estricto tiene sus propias paradojas, en <i>todos</i> los sistemas modales: si B es necesaria, cualquier cosa la implica; si A es imposible, implica cualquier cosa. En particular, {(A∧¬A)⥽B} y {A⥽(B∨¬B)} son válidas.' },
      { say: '«Si Brisbane está en Australia, hay infinitos primos» y «si no hay infinitos primos, Brisbane está en Alemania» no parecen verdaderas. Se puede intentar la defensa de la implicatura, pero no sirve para los subjuntivos.' },
      { say: 'Cuadrar el círculo con regla y compás es imposible. Aun así, es verdad que si Hobbes lo hubiese logrado se habría hecho famoso, y es falso que si tú lo lograras yo te daría mis ahorros. Hay condicionales con antecedente imposible que son falsos.', mood: 'think' }
    ]),
    A('Lo necesario lo implica todo', 'S2', ['□q'], 'p⥽q', {
      outro: 'Válida: es una de las paradojas de la implicación estricta.' }),
    A('Lo imposible implica cualquier cosa', 'N', [], '(p∧¬p)⥽q', {
      outro: 'Válida hasta en N: la contradicción no es verdadera en ningún mundo accesible.' }),
    T('La explosión', [
      { say: 'La objeción más dura: si {(A∧¬A)⥽B} y vale el modus ponens, de una contradicción se sigue cualquier cosa. Es la <b>explosión</b>. Y hay situaciones inconsistentes donde claramente no se sigue todo.' },
      { say: 'El modelo atómico de Bohr usaba a la vez las ecuaciones de Maxwell y la cuantización de la energía, que se contradicen; sus predicciones fueron un éxito, y Bohr no concluyó que las órbitas fueran rectangulares.' },
      { say: 'Una ley de tránsito con dos cláusulas («las mujeres tienen preferencia sobre los hombres» y «los mayores sobre los menores») se contradice cuando llegan a la vez una mujer de 30 y un hombre de 40. Nadie diría que de ahí se sigue cualquier cosa.' },
      { say: 'Lewis defendió la explosión con un argumento: de {A∧¬A} sale {A}, de {A} sale {A∨B}, de {A∧¬A} sale {¬A}, y por <b>silogismo disyuntivo</b>, de {A∨B} y {¬A}, sale {B}. Si la explosión falla, falla alguno de esos pasos. Lo veremos en el capítulo 8.', mood: 'think' }
    ]),
    Q('Estricto y explosivo', [
      { q: 'En las lógicas no normales, ¿qué regla falla?', opts: ['el modus ponens', 'la necesitación', 'la doble negación'], ok: 1, why: 'Una verdad lógica no tiene por qué ser necesaria en los mundos no normales.' },
      { q: 'El condicional estricto {A⥽B} se define como…', opts: ['{◇(A∧B)}', '{□(A⊃B)}', '{□A⊃□B}'], ok: 1, why: 'Que el condicional material valga en todo mundo accesible.' },
      { q: '¿Cuál es una paradoja de la implicación estricta?', opts: ['{q ⊢ p⥽q}', '{□q ⊢ p⥽q}', '{p⥽q ⊢ q}'], ok: 1, why: 'Lo necesario es implicado por cualquier cosa.' },
      { q: 'El argumento de Lewis a favor de la explosión usa…', opts: ['el silogismo disyuntivo', 'la contraposición', 'el modus tollens'], ok: 0, why: 'De {A∨B} y {¬A} infiere {B}. En FDE ese paso no vale.' }
    ]),
    A('Jefe del pecio', 'N', [], '((p⥽q)∧(q⥽r))⥽(p⥽r)', { boss: true,
      intro: 'La transitividad del estricto, en la lógica no normal más débil.',
      outro: '¡Válida en N!' }),
    V('La máquina del pecio', { sys: ['N', 'S2', 'S3', 'S3.5', 'L', 'K'], syms: '¬∧∨⊃≡□◇⥽', goals: ['valid', 'invalid', 'split'],
      intro: 'Compara las lógicas no normales entre sí y con K.',
      outro: 'Cada lógica no normal queda por debajo de su versión normal.',
      ex: [[[], '□(p⊃□(q⊃q))', 'invalid', 'N'], [[], '□(p⊃□(q⊃q))', 'valid', 'K'], [['p', 'p⥽q'], 'q', 'valid', 'S2'], [['p', 'p⥽q'], 'q', 'invalid', 'N'], [[], '(p⥽q)⥽(□p⥽□q)', 'valid', 'S3'], [[], '(p∧¬p)⥽q', 'valid', 'N']] })
  ]
});
})(window.CONTENT);
