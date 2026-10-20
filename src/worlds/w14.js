/* Capítulo 14 · Lógicas modales de dominio constante */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 14, num: '14', name: 'Corriente Constante', logic: 'Lógicas modales cuantificadas de dominio constante (CK y extensiones); de re y de dicto', badge: '□∀',
  intro: 'La corriente lleva siempre los mismos peces de un mundo a otro: el dominio es el mismo en todos. Juntamos cuantificadores y modalidades.',
  stages: [
    T('CK', [
      { say: 'Lógica modal cuantificada: el lenguaje de primer orden más {□} y {◇}. Hay dos variantes: de <b>dominio constante</b> (los mismos objetos en todos los mundos) y de <b>dominio variable</b>. Si S es una lógica modal, CS es su versión constante y VS la variable.' },
      { say: 'Una interpretación de CK es ⟨D, W, R, ν⟩: un dominio D, mundos, accesibilidad, y ν da a cada nombre un objeto (el mismo en todos los mundos) y a cada predicado una extensión <b>en cada mundo</b>. ⟨César, Bruto⟩ está en «fue asesinado por» aquí, pero no en un mundo donde Bruto no se unió a la conjura.' },
      { say: 'Las condiciones: las de K para las conectivas y los modales, las clásicas para los cuantificadores, mundo a mundo, sobre el mismo D. Válida: conserva la verdad en todo mundo de toda interpretación.' }
    ]),
    T('Árboles de CK', [
      { say: 'Los de K más las reglas clásicas de los cuantificadores, con el número del mundo. Como el dominio es constante, un nombre de la rama sirve en cualquier mundo.',
        fig: rule(r(['{∀xA, i}'], [['{A(a), i}']], 'a: cualquier nombre de la rama'), r(['{∃xA, i}'], [['{A(c), i}']], 'c nuevo')) },
      { say: 'Los contramodelos combinan las dos técnicas: mundos y relación, como en K; dominio y extensiones, como en primer orden, ahora una extensión por mundo.',
        fig: tab('CK', ['◇∃xPx'], '◇∃x(Px∧Qb)') },
      { say: 'Con cuantificadores, los árboles de CK pueden ser infinitos: cada mundo nuevo puede pedir un nombre nuevo, que pide otro mundo… Y si en una rama no aparece ningún nombre, el contramodelo usa un dominio de un objeto que no está en ninguna extensión.' }
    ]),
    A('Lo posible de alguien', 'CK', [], '∃x◇Px⊃◇∃xPx', { outro: 'Válida en CK.' }),
    A('La fórmula de Barcan', 'CK', [], '∀x□Px⊃□∀xPx', {
      intro: 'Con dominio constante, lo que vale de cada objeto en todos los mundos…',
      outro: 'Válida en CK: es la fórmula de Barcan.' }),
    A('La conversa de Barcan', 'CK', [], '□∀xPx⊃∀x□Px', { outro: 'Válida en CK.' }),
    A('Un nombre que no alcanza', 'CK', ['◇∃xPx'], '◇∃x(Px∧Qb)', { outro: 'Inválida en CK.' }),
    A('Necesidad de re en CK', 'CK', [], '∃x□Px⊃∃xPx', { outro: 'Inválida en CK: sin reflexividad, lo necesario de algo no lo hace verdadero.' }),
    A('…y en CT', 'CT', [], '∃x□Px⊃∃xPx', { outro: 'Válida en CT = CKρ.' }),
    T('De re y de dicto', [
      { say: '{□Pa} puede leerse de dos maneras. <b>De dicto</b>: la proposición «Pa» es necesaria. <b>De re</b>: el objeto a tiene la propiedad de ser necesariamente P. Sin cuantificadores no se distinguen; con ellos, sí: {∃x□Px} es de re, {□∃xPx} de dicto.' },
      { say: 'Quine desconfió de la modalidad de re: la necesidad no está en las cosas, sino en cómo las describimos. Su argumento: un poeta tiene necesariamente sentido de la metáfora y no necesariamente pensamiento analítico; un matemático, al revés. Alicia es ambas cosas: ¿tiene necesariamente sentido de la metáfora o no?' },
      { say: 'Pero «los A son necesariamente B» es triplemente ambiguo: {□∀x(Ax⊃Bx)}, {∀x□(Ax⊃Bx)} o {∀x(Ax⊃□Bx)}. Con las dos primeras lecturas las premisas son plausibles pero el argumento no es válido, ni en S5. Con la tercera es válido, pero sus premisas no son creíbles. Es una falacia de ambigüedad.', mood: 'think' },
      { say: 'La semántica sí da un <b>esencialismo</b> mínimo: hay verdades lógicas como {□(Pa∨¬Pa)}. Pero sin nombres en A, si {□A(a)} es válida, también {□A(b)}: las propiedades esenciales que da la lógica las tienen todas las cosas. ¿Hay otras, como el origen o la constitución genética? Las intuiciones tiran hacia lados distintos.' }
    ]),
    A('El poeta matemático', 'CS5', ['□∀x(Px⊃Mx)', '¬□∀x(Px⊃Ax)', 'Pa'], '□Ma∧¬□Aa', {
      intro: 'La primera lectura, de dicto, en el sistema más fuerte.',
      outro: 'Inválida incluso en S5: que todo poeta sea necesariamente metafórico no hace a Alicia metafórica en todo mundo, porque podría no ser poeta en él.' }),
    A('La lectura válida', 'CK', ['∀x(Px⊃□Mx)', '∀x(Px⊃¬□Ax)', 'Pa'], '□Ma∧¬□Aa', {
      outro: 'Válida, pero ¿quién cree que todo poeta es necesariamente metafórico, de re?' }),
    T('Tiempo con dominio constante', [
      { say: 'Todo se traslada al tiempo: CKt es CK con [F], ⟨F⟩, [P] y ⟨P⟩, y los árboles añaden a las reglas temporales las de los cuantificadores. Las extensiones salen de poner condiciones a la relación, como en 3.6b.',
        fig: tab('CKt', [], '∃xQx⊃[P]∃x⟨F⟩Qx') }
    ]),
    A('Lo que es, siempre fue futuro', 'CKt', [], '∃xQx⊃[P]∃x⟨F⟩Qx', { outro: 'Válida en CKt.' }),
    Q('Dominio constante', [
      { q: 'En CK, el dominio de cuantificación…', opts: ['cambia de mundo en mundo', 'es el mismo en todos los mundos', 'puede estar vacío'], ok: 1, why: 'Es lo que significa «constante».' },
      { q: '{∃x□Px} expresa una modalidad…', opts: ['de dicto', 'de re', 'temporal'], ok: 1, why: 'Dice de algún objeto que tiene necesariamente P.' },
      { q: 'Según el libro, el argumento de Quine sobre Alicia es…', opts: ['válido y sólido', 'una falacia de ambigüedad', 'una prueba contra la lógica modal'], ok: 1, why: 'Ninguna lectura tiene a la vez premisas creíbles y validez.' },
      { q: 'La fórmula de Barcan {∀x□Px⊃□∀xPx} en CK es…', opts: ['válida', 'inválida'], ok: 0, why: 'Con dominio constante, no hay objetos nuevos en otros mundos.' }
    ]),
    A('Jefe de la corriente', 'CS4', ['∀x□(Px⊃Qx)', '□∃xPx'], '□∃xQx', { boss: true, outro: '¡Válida en CS4!' }),
    V('La máquina constante', { sys: ['CK', 'CT', 'CS4', 'CS5', 'CKt'], syms: '¬∧∨⊃∀∃□◇', goals: ['valid', 'invalid', 'split'],
      intro: 'Árboles de lógica modal con dominio constante.',
      outro: 'En todas valen la fórmula de Barcan y su conversa.',
      ex: [[[], '∀x□Px⊃□∀xPx', 'valid', 'CK'], [[], '∃x□Px⊃∃xPx', 'invalid', 'CK'], [[], '∃x□Px⊃∃xPx', 'valid', 'CT'], [['∃xSxb'], '∀x□◇Sxb', 'invalid', 'CS5'], [[], '∃x◇Px⊃◇∃xPx', 'valid', 'CK'], [['◇∃xPx'], '◇∃x(Px∧Qb)', 'invalid', 'CK']] })
  ]
});
})(window.CONTENT);
