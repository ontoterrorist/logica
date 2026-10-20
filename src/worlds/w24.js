/* Capítulo 24 · Lógicas relevantes cuantificadas */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 24, num: '24', name: 'Abismo Relevante', logic: 'B y sus extensiones con cuantificadores; cuantificación restringida; semántica y prueba; identidad relevante', badge: '∀↦',
  intro: 'Bajo la fosa del capítulo 10 hay otra más honda. Los mundos de tres en tres vuelven, ahora con objetos y con identidad. Ramón baja con la linterna.',
  stages: [
    T('B cuantificada', [
      { say: 'Una interpretación de B cuantificada es ⟨D, W, N, R, *, ν⟩: un dominio D, no vacío, que es el mismo en todos los mundos, y lo demás como en el capítulo 10. Cada nombre denota un objeto de D; cada predicado tiene una extensión en cada mundo.' },
      { say: 'Los cuantificadores se evalúan en cada mundo sobre todo D, y la validez sigue siendo conservar la verdad en los mundos <b>normales</b>. Los árboles: los de B más cuatro reglas de cuantificadores con signo, como en FDE pero con el número del mundo.',
        fig: rule(r(['{∀xA,+i}'], [['{A(a),+i}']], 'cada a'), r(['{∀xA,−i}'], [['{A(c),−i}']], 'c nuevo'), r(['{∃xA,+i}'], [['{A(c),+i}']], 'c nuevo'), r(['{∃xA,−i}'], [['{A(a),−i}']], 'cada a')) },
      { say: 'El contramodelo: un objeto por nombre, y en cada mundo, la extensión de P es lo que dicen las líneas {Pa,+i}. Las estrellas se leen como en el capítulo 10.',
        fig: tab('QB', ['∀x(Px→Qx)'], '∃xPx→∃xQx') }
    ]),
    A('Del universal al particular', 'QB', ['∀x(Px→Qx)'], '∃xPx→∃xQx', { outro: 'Válida en B de primer orden.' }),
    A('Material no es relevante', 'QB', [], '∀x(Px⊃Qx)→∀x(Px→Qx)', { outro: 'Inválida en B: que cada objeto cumpla el condicional material no da una conexión entre P y Q.' }),
    A('Modus ponens con universal', 'QB', ['Pa', '∀x(Px→Qx)'], 'Qa', { outro: 'Válida: el universal da {Pa→Qa,+0}, y en 0 vale r000.' }),
    T('Extensiones', [
      { say: 'Las lógicas más fuertes salen igual que en el capítulo 10: se añaden las condiciones C8 a C11 sobre R, con sus reglas en los árboles. Con el orden de contenido ⊑ del capítulo 10 (la herencia, ahora para las atómicas) se llega hasta C16.' },
      { say: 'Esos árboles suelen ser enormes y, si quedan abiertos, infinitos. Un atajo: si algo vale en B, vale en todas sus extensiones. Para lo demás, se razona directamente con la semántica, o se busca un contramodelo tanteando con inteligencia.', mood: 'think' },
      { say: 'Aquí tenemos DW de primer orden: B más C8 (de rxyz pasa a rxz*y*), que valida la contraposición como ley.' }
    ]),
    A('Contraponer con objetos', 'QDW', [], '(Pa→∃x¬Qx)→(∀xQx→¬Pa)', { outro: 'Válida en DW de primer orden: C8 lleva la información de una pareja estrella a la otra.' }),
    A('…que en B no vale', 'QB', [], '(Pa→∃x¬Qx)→(∀xQx→¬Pa)', { outro: 'Inválida en B: sin C8, la contraposición no es ley.' }),
    T('Cuantificación restringida', [
      { say: '«Algún P es Q» se puede leer como {∃x(Px∧Qx)}, igual que en la clásica. Pero «Todo P es Q» da problemas. Si se lee {∀x(Px⊃Qx)}, falla «a es P, todo P es Q, luego a es Q»: es un silogismo disyuntivo disfrazado, y las relevantes no lo aceptan.' },
      { say: 'Si se lee {∀x(Px→Qx)}, esa inferencia vale, pero falla otra igual de natural: «todo es Q, luego todo P es Q». El → pide una conexión entre P y Q demasiado fuerte para una simple generalización.' },
      { say: 'La propuesta: un condicional nuevo que usa el orden de contenido. Se evalúa como →, pero solo con las ternas Rww₁w₂ en las que w ⊑ w₂, es decir, en las que lo que es verdadero en w sigue siéndolo en w₂. Así valen las dos inferencias. Pero ojo: «nada es P, luego todo P es Q» sigue sin valer.', mood: 'think' }
    ]),
    A('Silogismo con ⊃', 'QB', ['Pa', '∀x(Px⊃Qx)'], 'Qa', { outro: 'Inválida en B: en el mundo 0 pueden ser verdaderas Pa y ¬Pa a la vez (basta que Pa falle en 0#), y entonces Qa queda libre.' }),
    A('Todo es Q', 'QB', ['∀xQx'], '∀x(Px→Qx)', { outro: 'Inválida en B: el → exige más que la verdad de Q en el mundo actual.' }),
    T('Semántica contra teoría de la prueba', [
      { say: 'Anderson y Belnap formularon las relevantes con axiomas, antes de que hubiera semántica. Para los cuantificadores añadieron lo que lleva de la clásica proposicional a la de primer orden: instanciar el universal, generalizar, y principios para mover ∀ a través de → y de ∨.' },
      { say: 'Cuando llegó la semántica ternaria, la extensión de dominio constante era obvia. Los axiomas resultaron correctos, y para B también completos. Pero para las lógicas fuertes no: Kit Fine encontró una fórmula larga, válida en la semántica, que los axiomas no prueban.' },
      { say: '¿Qué hacer? Se buscó una semántica nueva para los axiomas; Fine la dio, pero es complicada y poco natural. Priest sostiene lo contrario: si no coinciden, manda la semántica, porque las inferencias son válidas en virtud del significado, y la semántica es lo que da el significado. Los axiomas no tienen privilegio.', mood: 'think' },
      { say: 'Quien da prioridad a la prueba tampoco acepta cualquier regla: hay conectivas absurdas, que se introducen como una disyunción y se eliminan como una conjunción, y lo trivializan todo. Por eso se piden reglas de introducción y eliminación en armonía. Y no está claro que las relevantes tengan pruebas de ese tipo.' },
      { say: 'Con dominios variables, la fórmula de Fine deja de ser válida. Pero entonces también falla uno de los axiomas, por la misma razón que en la intuicionista. Cambiar de dominio no resuelve el desajuste.' }
    ]),
    T('Identidad relevante', [
      { say: 'Identidad necesaria, como en el capítulo 23: en los mundos normales la extensión de = es {⟨d, d⟩}; en los no normales, cualquiera. Las reglas: {a=a,+0} en el mundo 0, y la sustitución, que toma identidades del mundo 0 y cambia nombres en atómicas con + de <i>cualquier</i> mundo.',
        fig: rule(r(['{a=b,+0}', '{A(a),+α}'], [['{A(b),+α}']], 'A atómica'), r([], [['{a=a,+0}']])) },
      { say: 'Si la información sobre la identidad está en otro mundo, no se sustituye. El contramodelo: los nombres iguales en el mundo 0 denotan un mismo objeto; en los demás mundos, = es un predicado más.',
        fig: tab('QB=', [], 'Pa→(a=b→Pb)') },
      { say: 'Se puede pedir más: la <b>restricción de subconjunto</b>, que en los mundos no normales = sea a lo sumo la diagonal. Su regla lleva {a=b,+α} de vuelta al mundo 0. Los mundos imposibles pueden seguir negando {a=a}, y no se cuelan {a=b ⊢ Pc→a=b} ni {a=b ⊢ a=b→Pc}.' }
    ]),
    A('Sustituir bajo la flecha', 'QB=', ['a=b'], 'Pa→Pb', { outro: 'Válida en B con identidad: a=b está en el mundo 0 y sirve en el mundo 1.' }),
    A('La identidad en otro mundo', 'QB=', [], 'Pa→(a=b→Pb)', { outro: 'Inválida: a=b aparece en el mundo 2, no en el 0, así que no hay sustitución.' }),
    A('Conjunción sin restricción', 'QB=', [], '(a=b∧Pa)→Pb', { outro: 'Inválida sin la restricción de subconjunto.' }),
    A('…y con ella', 'QB=⊆', [], '(a=b∧Pa)→Pb', { intro: 'Usa la regla SC del panel para llevar a=b al mundo 0.', outro: 'Válida con la restricción de subconjunto.' }),
    A('Ni siquiera así', 'QB=⊆', [], 'a=b→(Pa→Pb)', { outro: 'Inválida aun con la restricción: a=b llega al mundo 0, pero Pa y Pb viven en mundos distintos, y la sustitución no salta de uno a otro.' }),
    T('Versiones de la sustitución', [
      { say: 'Hay cuatro formas de la sustitución de idénticos: (1) {⊢ a=b→(A(a)→A(b))}; (2) {⊢ (a=b∧A(a))→A(b)}; (3) {a=b ⊢ A(a)→A(b)}; (4) {a=b, A(a) ⊢ A(b)}. La 3 y la 4 equivalen, incluso en B.',
        fig: table(['Versión', 'B', 'B con restricción'], [['1', 'falla', 'falla'], ['2', 'falla', 'vale'], ['3 y 4', 'valen', 'valen']]) },
      { say: 'La 1 falla en todas las relevantes, y debe fallar: si A no tiene x libre, daría {a=b→(A→A)}, y una identidad cualquiera no tiene nada que ver con A→A. La 2 es plausible: que {(a=b∧A)→A} sea ley no ofende a la relevancia.' },
      { say: 'Una objeción con helados: a es «el de almendra», b «el de plátano», m «mi favorito». Si mi favorito es el de almendra, la 4 daría «si el de plátano es mi favorito, el de plátano es el de almendra». Suena mal.', mood: 'think' },
      { say: 'La respuesta: «mi favorito» no es un designador rígido, y la sustitución entre mundos solo vale con rígidos (capítulo 16). Con tres nombres propios de una misma estafadora, «si b es m, b es a» solo dice de ella que es idéntica a sí misma, y eso es perfectamente relevante.' },
      { say: 'Sin la restricción valen {⊢ a=a}, {a=b ⊢ b=a} y {a=b∧b=c ⊢ a=c}, pero no {⊢ a=b→b=a} ni {⊢ (a=b∧b=c)→a=c}. La restricción da también estas dos.' }
    ]),
    A('Simetría como regla', 'QB=', ['a=b'], 'b=a', { outro: 'Válida: se sustituye a por b en a=a, +0.' }),
    A('Simetría como ley', 'QB=', [], 'a=b→b=a', { outro: 'Inválida sin la restricción: en el mundo 1, a=b es un predicado cualquiera.' }),
    Q('Abismo', [
      { q: 'En B cuantificada, el dominio…', opts: ['cambia de mundo en mundo', 'es el mismo en todos los mundos', 'es vacío en los no normales'], ok: 1, why: 'Dominio constante.' },
      { q: '¿Por qué «Todo P es Q» no se lee bien como {∀x(Px⊃Qx)} en una relevante?', opts: ['porque falla el silogismo «a es P, todo P es Q, luego a es Q»', 'porque ⊃ no existe', 'porque el dominio es constante'], ok: 0, why: 'Sería un silogismo disyuntivo.' },
      { q: 'La fórmula de Fine muestra que…', opts: ['B es incompleta', 'los axiomas de las relevantes fuertes no capturan su semántica', 'la semántica es incorrecta'], ok: 1, why: 'Es válida en la semántica pero no se prueba con los axiomas.' },
      { q: 'En B con identidad, la sustitución usa identidades…', opts: ['de cualquier mundo', 'del mundo 0', 'de los mundos estrella'], ok: 1, why: 'Solo en los normales la identidad es la diagonal.' },
      { q: '¿Cuál falla en todas las relevantes?', opts: ['{a=b, Pa ⊢ Pb}', '{a=b ⊢ Pa→Pb}', '{⊢ a=b→(Pa→Pb)}'], ok: 2, why: 'Haría a cualquier identidad relevante para A→A.' }
    ]),
    A('Jefe del abismo', 'QB=⊆', [], 'a=b→b=a', { boss: true, outro: '¡Válida con la restricción de subconjunto! La identidad del mundo 1 baja al 0, y allí vale la sustitución.' }),
    V('La máquina del abismo', { sys: ['QB', 'QDW', 'QB=', 'QB=⊆', 'FOL'], syms: '¬∧∨⊃→∀∃=', goals: ['valid', 'invalid', 'split'], cmp: 'FOL',
      intro: 'Relevantes cuantificadas, con y sin identidad. Para comparar con la clásica, la máquina lee → como ⊃.',
      outro: 'La identidad relevante es tan necesaria como la modal, pero solo en los mundos posibles.',
      ex: [[['∀x(Px→Qx)'], '∃xPx→∃xQx', 'valid', 'QB'], [[], '∀x(Px⊃Qx)→∀x(Px→Qx)', 'invalid', 'QB'], [[], '(Pa→∃x¬Qx)→(∀xQx→¬Pa)', 'valid', 'QDW'], [[], '(a=b∧Pa)→Pb', 'invalid', 'QB='], [[], '(a=b∧Pa)→Pb', 'valid', 'QB=⊆'], [[], 'a=b→(Pa→Pb)', 'invalid', 'QB=⊆']] })
  ]
});
})(window.CONTENT);
