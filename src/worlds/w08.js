/* Capítulo 8 · Implicación de primer grado (FDE) */
(function (C) {
const { T, Q, A, TT, V, table, tab, rule, r } = C;
C.world({
  ord: 8, num: '8', name: 'Laguna de Belnap', logic: 'Implicación de primer grado (FDE), K3 y LP con árboles; la estrella de Routley', badge: 'b n',
  intro: 'En la laguna una fórmula puede ser verdadera, falsa, ambas cosas o ninguna. Aquí vuelven los árboles, ahora con signos + y −, y con ellos K3 y LP.',
  stages: [
    T('Verdad y falsedad por separado', [
      { say: 'En la lógica clásica una interpretación es una <b>función</b>: cada fórmula recibe 1 o 0. Eso esconde un supuesto: que nada es a la vez verdadero y falso, ni ninguna de las dos cosas.' },
      { say: 'Si dudamos del supuesto, es natural usar una <b>relación</b>. En <b>FDE</b> (implicación de primer grado), una interpretación ρ relaciona cada letra con 1, con 0, con ambos o con ninguno. pρ1: p es verdadera; pρ0: p es falsa.',
        fig: table(['Fórmula', 'es verdadera (ρ1) si…', 'es falsa (ρ0) si…'], [['{A∧B}', 'A y B son verdaderas', 'A o B es falsa'], ['{A∨B}', 'A o B es verdadera', 'A y B son falsas'], ['{¬A}', 'A es falsa', 'A es verdadera']]) },
      { say: 'Son las condiciones clásicas, sin suponer que verdad y falsedad se excluyen y se agotan. Ahora importa distinguir <b>falsa</b> de <b>no verdadera</b>: algo puede ser falso y también verdadero, o no ser verdadero sin ser falso.', mood: 'think' },
      { say: 'La validez conserva la verdad: Σ ⊨ A si toda interpretación que hace verdaderas las premisas hace verdadera la conclusión. FDE no tiene más conectivas que ∧, ∨ y ¬; {A⊃B} abrevia {¬A∨B}.' }
    ]),
    Q('Verdadera, falsa, ambas, ninguna', [
      { q: 'Si {p} es verdadera y falsa, y {q} es solo verdadera, ¿qué es {¬p∧q}?', opts: ['solo verdadera', 'verdadera y falsa', 'ninguna'], ok: 1, why: '{¬p} es verdadera y falsa; {q} es verdadera; la conjunción es verdadera, y es falsa porque {¬p} lo es.' },
      { q: 'Si {p} no es ni verdadera ni falsa, ¿qué es {p∨¬p}?', opts: ['verdadera', 'ninguna de las dos', 'falsa'], ok: 1, why: 'Ninguna disyunta es verdadera ni falsa.' },
      { q: 'En FDE, ¿«falsa» equivale a «no verdadera»?', opts: ['Sí', 'No'], ok: 1, why: 'Es la gran diferencia con la lógica clásica.' }
    ]),
    T('Árboles para FDE', [
      { say: 'Cada nodo es {A,+} (A es verdadera) o {A,−} (A no es verdadera). Como en la intuicionista, {¬A,+} ya no significa lo mismo que {A,−}. La lista inicial: premisas con +, conclusión con −.' },
      { say: 'Las reglas de ∧ y ∨ son las obvias, para + y para −. Las de la negación usan De Morgan y la doble negación, que valen en FDE:',
        fig: rule(r(['{A∧B,+}'], [['{A,+}', '{B,+}']]), r(['{A∧B,−}'], [['{A,−}'], ['{B,−}']]), r(['{¬(A∧B),±}'], [['{¬A∨¬B,±}']]), r(['{¬¬A,±}'], [['{A,±}']])) },
      { say: 'Una rama se cierra con {A,+} y {A,−}: la misma fórmula, verdadera y no verdadera. Ojo: {p,+} y {¬p,+} <b>no</b> cierran: es una contradicción verdadera, y FDE la permite.',
        fig: tab('FDE', ['¬(q∧¬r)∧p'], '(¬q∨r)∨s') }
    ]),
    A('Lo primero de una conjunción', 'FDE', ['p∧q'], 'p', { outro: 'Válida en FDE.' }),
    A('Añadir una disyunta', 'FDE', ['p'], 'p∨q', { outro: 'Válida en FDE.' }),
    A('El ejemplo del libro', 'FDE', ['¬(q∧¬r)∧p'], '(¬q∨r)∨s', {
      intro: 'Desarrolla primero la conclusión (con −) y luego la premisa.',
      outro: 'Válida en FDE.' }),
    A('Una premisa que no ayuda', 'FDE', ['p∧(q∨¬q)'], 'r', {
      outro: 'Inválida en FDE, y también en la clásica: {r} no aparece en la premisa.' }),
    T('Contramodelos relacionales', [
      { say: 'De una rama abierta se lee ρ así: si {p,+} está en la rama, pρ1; si {¬p,+} está en la rama, pρ0. Nada más.' },
      { say: 'Con esa ρ, cada letra tiene uno de cuatro estados: 1 (solo verdadera), 0 (solo falsa), b (ambas) y n (ninguna). En el juego, el contramodelo muestra esas letras.',
        fig: tab('FDE', ['p∧¬p'], 'q', 'La rama abierta da {p} = b y {q} = n: la premisa es verdadera y la conclusión no.') }
    ]),
    A('Una contradicción no explota', 'FDE', ['p∧¬p'], 'q', {
      outro: 'Inválida en FDE: {p} puede ser verdadera y falsa sin que {q} sea verdadera.' }),
    A('El tercio excluso no se sigue', 'FDE', ['p'], 'q∨¬q', {
      outro: 'Inválida en FDE: {q} puede no ser ni verdadera ni falsa.' }),
    A('Doble negación', 'FDE', ['¬¬p'], 'p', { outro: 'Válida: en FDE la doble negación vale en los dos sentidos.' }),
    A('Contraposición material', 'FDE', ['(p∧q)⊃r'], '(p∧¬r)⊃¬q', {
      intro: 'Recuerda: {A⊃B} se trata como {¬A∨B}.',
      outro: 'Válida en FDE.' }),
    T('Cuatro valores', [
      { say: 'Los cuatro estados se pueden ver como cuatro valores: 1, b, n y 0. Las tablas salen de las condiciones relacionales. Se recuerdan con el «diamante»: 1 arriba, 0 abajo, b y n a los lados. La conjunción es el mayor valor por debajo de los dos; la disyunción, el menor por encima.',
        fig: table(['{∧}', '1', 'b', 'n', '0'], [['1', '1', 'b', 'n', '0'], ['b', 'b', 'b', '0', '0'], ['n', 'n', '0', 'n', '0'], ['0', '0', '0', '0', '0']], { tight: true }) },
      { say: 'La negación cambia 1 por 0 y deja b y n en su sitio. Los designados son 1 y b, los que son verdaderos.' },
      { say: 'Si prohibimos los excesos (<b>exclusión</b>: nada es verdadero y falso), sale <b>K3</b>. En los árboles basta otra regla de cierre: {A,+} con {¬A,+}. Si prohibimos las faltas (<b>exhaustividad</b>: todo es verdadero o falso), sale <b>LP</b>, que cierra con {A,−} y {¬A,−}.' },
      { say: 'Ojo al leer contramodelos de LP: se pone pρ1 si {p,−} <i>no</i> está en la rama, y pρ0 si {¬p,−} no está. Con las dos reglas de cierre a la vez se obtiene, otra vez, la lógica clásica.' }
    ]),
    TT('El diamante en tabla', 'FDE', ['¬p', 'p∨q'], {
      intro: 'Dieciséis filas: cuatro valores por letra. Toca para recorrer 1, b, n, 0.',
      outro: 'La disyunción toma el menor valor por encima de los dos: por ejemplo, b ∨ n = 1.' }),
    A('Explosión en K3', 'K3', ['p∧¬p'], 'q', {
      intro: 'En K3 se cierra también con {A,+} y {¬A,+}.',
      outro: 'Válida en K3: sin excesos, una contradicción no puede ser verdadera.' }),
    A('Tercio excluso en LP', 'LP', ['p'], 'q∨¬q', {
      intro: 'En LP se cierra también con {A,−} y {¬A,−}.',
      outro: 'Válida en LP: sin faltas, {q∨¬q} siempre es verdadera.' }),
    A('Explosión en LP', 'LP', ['p∧¬p'], 'q', {
      outro: 'Inválida en LP: es una lógica paraconsistente.' }),
    A('Todo junto: la clásica', 'FDE2', ['p', '¬p∨q'], 'q', {
      intro: 'Con las dos reglas de cierre adicionales, los árboles de FDE son árboles clásicos.',
      outro: 'Válida: con los dos cierres vuelve el silogismo disyuntivo.' }),
    T('Ł3 y RM3 con árboles', [
      { say: 'Las condicionales de Ł3 y RM3 también se pueden describir de forma relacional, y eso da reglas de árbol. Para Ł3, {A⊃B} es verdadera si A es falsa, o B verdadera, o las cuatro cosas fallan (A y B sin valor).' },
      { say: 'En los árboles de Ł3 (con el cierre de K3), {A⊃B,+} abre tres ramas: {¬A,+}, {B,+}, o bien {A∨¬A,−} y {B∨¬B,−}. Los de RM3 se construyen sobre LP de modo análogo. Puedes consultarlas en el libro de reglas de cada etapa.' }
    ]),
    A('La identidad en Ł3', 'Ł3', [], 'p⊃p', { outro: 'Válida en Ł3: la tercera rama, con {p∨¬p} no verdadera, es justo el caso i ⊃ i.' }),
    A('Modus ponens en RM3', 'RM3', ['p', 'p⊃q'], 'q', { outro: 'Válida en RM3.' }),
    A('Modus ponens en LP', 'LP', ['p', 'p⊃q'], 'q', { outro: 'Inválida en LP, como ya vimos con tablas.' }),
    T('La estrella de Routley', [
      { say: 'Una tercera semántica para FDE, con mundos y solo dos valores. Cada mundo w tiene una pareja, su <b>mundo estrella</b> w*, con w** = w. La negación mira a la pareja: {¬A} es verdadera en w si A es falsa en w*.' },
      { say: 'Si w = w*, es la negación clásica. Si no, A y ¬A pueden ser ambas verdaderas en w (A verdadera en w y falsa en w*), o ambas falsas. Es difícil darle a la estrella una lectura intuitiva; se la suele llamar «inversión».', mood: 'think' },
      { say: 'En los árboles, los nodos son {A,+x} o {A,−x}, con x igual a 0 o a 0#, la estrella. Las reglas de ∧ y ∨ son las de siempre; la de la negación salta a la pareja:',
        fig: rule(r(['{¬A,+x}'], [['{A,−x̄}']], 'x̄ es la pareja de x'), r(['{¬A,−x}'], [['{A,+x̄}']])) },
      { say: 'El contramodelo tiene siempre dos mundos, w0 y w0*. La equivalencia con la semántica relacional es que ρ1 corresponde a la verdad en w y ρ0 a la falsedad en w*.',
        fig: tab('FDE*', ['p∧(q∨¬q)'], 'r') }
    ]),
    A('Con estrella', 'FDE*', ['p∧(q∨¬q)'], 'r', { outro: 'Inválida: el mismo resultado que con signos.' }),
    A('El ejemplo, con estrella', 'FDE*', ['¬(q∧¬r)∧p'], '(¬q∨r)∨s', { outro: 'Válida, también con la estrella.' }),
    T('El silogismo disyuntivo', [
      { say: 'FDE y LP son <b>paraconsistentes</b>: de {p} y {¬p} no se sigue cualquier cosa. Y también falla el <b>silogismo disyuntivo</b>: de {p} y {¬p∨q} no se sigue {q}. Contramodelo: {p} verdadera y falsa, {q} solo falsa.' },
      { say: 'Eso es una ventaja: el argumento del capítulo 1 a favor de {⊃} y el de Lewis a favor de la explosión usaban ese paso. Ahora sabemos por qué no funcionan. Además, el silogismo disyuntivo es el modus ponens del {⊃}: otra razón contra el condicional material.' },
      { say: '¿No es intuitivo el silogismo? «Si vale {¬p∨q}, vale una; {p} descarta {¬p}; así que vale {q}». Pero si hay excesos, la verdad de {p} no descarta la de {¬p}. Desde aquí, el argumento falla.', mood: 'think' },
      { say: 'Objeción más seria: lo usamos a diario y acierta. «Estás en casa o en el trabajo; no estás en casa; luego estás en el trabajo». Respuesta: falla solo cuando la premisa es un exceso. Si la situación es consistente, como casi siempre, es legítimo usarlo, aunque no sea válido en general.' }
    ]),
    A('Sin silogismo disyuntivo', 'FDE', ['p', '¬p∨q'], 'q', { outro: 'Inválida en FDE.' }),
    Q('Paraconsistencia', [
      { q: 'Una lógica es paraconsistente si…', opts: ['tiene contradicciones verdaderas', 'de {p} y {¬p} no se sigue cualquier cosa', 'no tiene negación'], ok: 1, why: 'Paraconsistente quiere decir que la explosión no vale.' },
      { q: '¿Qué regla de cierre añade K3 a FDE?', opts: ['{A,+} con {¬A,+}', '{A,−} con {¬A,−}', 'ninguna'], ok: 0, why: 'Prohíbe que algo y su negación sean verdaderos a la vez.' },
      { q: 'En la semántica de la estrella, {¬A} es verdadera en w si…', opts: ['A es falsa en w', 'A es falsa en w*', 'A es verdadera en w*'], ok: 1, why: 'La negación mira al mundo pareja.' },
      { q: 'Según el libro, ¿cuándo es legítimo usar el silogismo disyuntivo?', opts: ['nunca', 'cuando la situación es consistente', 'solo en matemáticas'], ok: 1, why: 'Solo falla con premisas que son excesos de verdad.' }
    ]),
    A('Jefe de la laguna', 'FDE', ['p∨(q∧r)'], '(p∨q)∧(p∨r)', { boss: true,
      intro: 'La distributividad. Con signos + y −, varias ramas.',
      outro: '¡Válida en FDE!' }),
    V('La máquina de la laguna', { sys: ['FDE', 'K3', 'LP', 'FDE*', 'Ł3', 'RM3'], syms: '¬∧∨⊃', goals: ['valid', 'invalid', 'gap'], cmp: 'CL',
      intro: 'Árboles con signos para FDE y sus parientes. Busca una inferencia clásica que aquí falle.',
      outro: 'FDE es una sublógica de K3 y de LP, y las tres lo son de la clásica.',
      ex: [[['p∧¬p'], 'q', 'invalid', 'FDE'], [['p∧¬p'], 'q', 'valid', 'K3'], [['p'], 'q∨¬q', 'valid', 'LP'], [['p', '¬p∨q'], 'q', 'invalid', 'FDE'], [['¬¬p'], 'p', 'valid', 'FDE'], [['p', 'p⊃q'], 'q', 'valid', 'RM3']] })
  ]
});
})(window.CONTENT);
