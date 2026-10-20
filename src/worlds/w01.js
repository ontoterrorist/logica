/* Capítulo 1 · Lógica clásica y condicional material */
(function (C) {
const { T, Q, A, TT, V, table, tab, rule, r } = C;
C.world({
  ord: 1, num: '1', name: 'Arrecife Clásico', logic: 'Lógica clásica y condicional material', badge: '⊃',
  intro: 'Aquí aprendes el oficio: las reglas de los árboles para la lógica clásica, cómo se cierran las ramas y cómo se lee un contramodelo. Luego miramos con lupa el condicional material.',
  stages: [
    T('Validez de dos maneras', [
      { say: 'La lógica estudia la <b>validez</b>: qué se sigue de qué. Se trabaja con un lenguaje formal, el <b>lenguaje objeto</b>, y se habla de él en otro, el <b>metalenguaje</b> (para nosotros, castellano con un poco de matemática).' },
      { say: 'Hay dos nociones de validez. La <b>semántica</b> (⊨): una inferencia es válida si toda interpretación que hace verdaderas las premisas hace verdadera la conclusión. La <b>de prueba</b> (⊢): se define con un procedimiento puramente formal. El nuestro serán los árboles.' },
      { say: 'Lo ideal es que coincidan. Si todo lo que se prueba es semánticamente válido, el método es <b>correcto</b>. Si todo lo semánticamente válido se prueba, es <b>completo</b>. Los árboles de este libro son ambas cosas.',
        fig: table(['Propiedad', 'Dice que…'], [['correcto', 'si Σ ⊢ A, entonces Σ ⊨ A'], ['completo', 'si Σ ⊨ A, entonces Σ ⊢ A']]) },
      { say: 'El lenguaje: letras {p}, {q}, {r}… y las conectivas {¬} (negación), {∧} (conjunción), {∨} (disyunción), {⊃} (condicional material) y {≡} (equivalencia material). Una <b>interpretación</b> le da a cada letra el valor 1 (verdadero) o 0 (falso).',
        fig: table(['{A}', '{B}', '{¬A}', '{A∧B}', '{A∨B}', '{A⊃B}', '{A≡B}'], [['1', '1', '0', '1', '1', '1', '1'], ['1', '0', '0', '0', '1', '0', '0'], ['0', '1', '1', '0', '1', '1', '0'], ['0', '0', '1', '0', '0', '1', '1']], { tight: true }) }
    ]),
    TT('Repaso de tablas', 'CL', ['p⊃q', '¬p∨q'], {
      intro: 'Llena las dos columnas. Toca cada casilla para alternar entre 1 y 0.',
      outro: 'Son idénticas: {A⊃B} es verdadera exactamente cuando {A} es falsa o {B} es verdadera. Es la misma condición que la de {¬A∨B}.' }),
    T('Cómo crece un árbol', [
      { say: 'Para poner a prueba una inferencia, empezamos un árbol con una sola rama: las premisas y la <b>negación de la conclusión</b>. Es la <b>lista inicial</b>. La idea: buscamos una interpretación que haga todo eso verdadero, es decir, un contraejemplo.' },
      { say: 'Luego aplicamos reglas que alargan las ramas. Algunas añaden líneas a la misma rama; otras la <b>parten en dos</b>. Mira las del condicional: {¬(A⊃B)} solo puede ser verdadera de una manera; {A⊃B}, de dos.',
        fig: rule(r(['{A⊃B}'], [['{¬A}'], ['{B}']]), r(['{¬(A⊃B)}'], [['{A}', '{¬B}']])) },
      { say: 'Una regla aplicada a una línea alarga <b>todas</b> las ramas que pasan por esa línea. Una rama está <b>cerrada</b> si contiene una fórmula y su negación: se marca con ×. Si todas las ramas se cierran, no hay contraejemplo y la inferencia es válida.',
        fig: tab('CL', ['p⊃q', 'q⊃r'], 'p⊃r', 'El árbol de {p⊃q, q⊃r ⊢ p⊃r}: se cierra entero.') },
      { say: 'Dos consejos del libro. Aplica primero las reglas que no ramifican: el árbol queda más pequeño. Y no sigas una rama ya cerrada: lo que se añada no la va a abrir. En el juego, una línea ya usada queda marcada con una palomita.' },
      { say: 'Cómo se juega: toca una línea y pulsa <b>Aplicar regla</b>. Cuando veas dos líneas que se contradicen en la misma rama, tócalas y pulsa <b>Cerrar</b>. Si te atascas, pide una <b>pista</b>.' }
    ]),
    A('Tu primer árbol', 'CL', ['p⊃q', 'p'], 'q', {
      intro: 'La lista inicial ya está: las premisas y {¬q}. Toca la línea 1 y pulsa <b>Aplicar regla</b>. Después busca las contradicciones.',
      outro: 'Modus ponens es válido: en una rama aparecen {p} y {¬p}; en la otra, {q} y {¬q}.' }),
    A('Cadena de condicionales', 'CL', ['p⊃q', 'q⊃r'], 'p⊃r', {
      intro: 'Empieza por la conclusión negada: {¬(p⊃r)} no ramifica.',
      outro: 'Las cuatro ramas se cierran. El condicional material es transitivo.' }),
    T('Las demás reglas', [
      { say: 'Cada conectiva tiene dos reglas: una para la fórmula y otra para su negación. Se recuerdan pensando en cuándo la fórmula es verdadera: si lo es, también lo son las líneas de al menos una de las ramas que se abren.',
        fig: rule(r(['{¬¬A}'], [['{A}']]), r(['{A∧B}'], [['{A}', '{B}']]), r(['{¬(A∧B)}'], [['{¬A}'], ['{¬B}']])) },
      { say: 'La disyunción es la imagen especular de la conjunción.',
        fig: rule(r(['{A∨B}'], [['{A}'], ['{B}']]), r(['{¬(A∨B)}'], [['{¬A}', '{¬B}']])) },
      { say: 'Y la equivalencia material: {A≡B} es verdadera cuando ambas son verdaderas o ambas falsas; su negación, cuando difieren.',
        fig: rule(r(['{A≡B}'], [['{A}', '{B}'], ['{¬A}', '{¬B}']]), r(['{¬(A≡B)}'], [['{A}', '{¬B}'], ['{¬A}', '{B}']])) },
      { say: 'Un árbol está <b>completo</b> cuando ya se aplicó toda regla aplicable. En lógica proposicional clásica los árboles siempre terminan, así que el método decide siempre.' }
    ]),
    A('Una ley lógica', 'CL', [], '((p⊃q)∧(p⊃r))⊃(p⊃(q∧r))', {
      intro: 'Sin premisas: la lista inicial es solo la negación de la fórmula. Si el árbol se cierra, la fórmula es una <b>verdad lógica</b>.',
      outro: 'Cerrado: la fórmula es una tautología, verdadera en toda interpretación.' }),
    A('Modus tollens', 'CL', ['p⊃(q∧r)', '¬r'], '¬p', {
      intro: 'La conclusión negada es {¬¬p}. Empieza por ahí.',
      outro: 'Válida. Si {p} implicara {q∧r} y {r} fuese falsa, {p} tendría que serlo.' }),
    T('Contramodelos', [
      { say: 'Un árbol es, en el fondo, una búsqueda sistemática de una interpretación que haga verdadera toda la lista inicial. Si una rama queda abierta y completa, esa interpretación se puede <b>leer</b> de la rama.' },
      { say: 'La receta: si la letra {p} está en la rama, {p} vale 1; si está {¬p}, vale 0. Si no aparece ninguna de las dos, da igual el valor (aquí le daremos 0).',
        fig: tab('CL', ['(p⊃q)∨(r⊃q)'], '(p∨r)⊃q', 'Dos ramas quedan abiertas. La marcada con la flecha da {r}=1, {p}=0, {q}=0.') },
      { say: 'Conviene comprobarlo a mano: con {p} falsa, {p⊃q} es verdadera y la premisa también. Con {r} verdadera, {p∨r} es verdadera, pero {q} es falsa, así que la conclusión es falsa.' },
      { say: 'Un detalle: un árbol con letras esquemáticas como A y B muestra que <i>toda</i> inferencia de esa forma es válida. Para mostrar que una no lo es hace falta una instancia concreta, con letras {p}, {q}. Por eso los contraejemplos usan letras.' },
      { say: 'En el juego, cuando una rama no tenga nada más que hacer, toca su final (○) y pulsa <b>Abierta</b>. Te mostraré el contramodelo.' }
    ]),
    A('Una rama que no cierra', 'CL', ['(p⊃q)∨(r⊃q)'], '(p∨r)⊃q', {
      intro: 'Construye el árbol completo. Alguna rama no se va a cerrar: decláralo abierta.',
      outro: 'Inválida. El contramodelo hace verdadera la premisa y falsa la conclusión.' }),
    A('¿Es válida?', 'CL', [], '((p⊃q)⊃q)⊃q', {
      intro: 'Decide tú. Si queda una rama abierta y completa, la fórmula no es una verdad lógica.',
      outro: 'No es una verdad lógica: con {p} verdadera y {q} falsa, {p⊃q} es falsa, así que {(p⊃q)⊃q} es verdadera y el condicional entero es falso.' }),
    A('Equivalencias anidadas', 'CL', ['p≡(q≡r)'], '(p≡q)≡r', {
      intro: 'Un árbol con muchas ramas. Paciencia: cada {≡} abre dos.',
      outro: 'Válida: la equivalencia material es asociativa.' }),
    A('Conjunción y disyunción', 'CL', ['p∧(¬r∨s)', '¬(q⊃s)'], 'r', {
      intro: 'Aplica primero lo que no ramifica.',
      outro: 'Inválida. Fíjate en que {s} tiene que ser falsa, y entonces {¬r} es verdadera.' }),
    T('¿Qué es un condicional?', [
      { say: 'Un <b>condicional</b> relaciona un <b>consecuente</b> con un <b>antecedente</b> del que, en algún sentido, depende: «si la rama se rompe, la cuna caerá». En castellano se expresa con «si», «solo si», «siempre que»…' },
      { say: 'No todo «si» es condicional: «si quieres un plátano, hay uno en la cocina» no dice que el plátano dependa de tu deseo. Una prueba casera: «si A, B» es condicional si equivale a «que A implica que B».' },
      { say: 'El {⊃} es el <b>condicional material</b>: {A⊃B} equivale a {¬A∨B}. Así que basta con que B sea verdadera, o con que A sea falsa, para que {A⊃B} sea verdadera. Son las llamadas <b>paradojas de la implicación material</b>.',
        fig: table(['Inferencia', '¿Válida para ⊃?'], [['{q ⊢ p⊃q}', 'sí'], ['{¬p ⊢ p⊃q}', 'sí']]) },
      { say: 'Si el «si» del castellano fuera {⊃}, serían verdaderas cosas como «si Nueva York está en Nueva Zelanda, entonces 2 + 2 = 4». Suenan mal.' },
      { say: 'Una defensa, inspirada en Grice: son verdaderas, pero no se dicen porque violan reglas de la conversación, como «di lo más fuerte que sepas». Quien sabe que 2 + 2 = 4 no debería decir un condicional, sino eso. Es la <b>implicatura conversacional</b>.', mood: 'think' }
    ]),
    A('Paradoja de la implicación', 'CL', ['q'], 'p⊃q', {
      intro: 'Comprueba la primera paradoja: si {q} es verdadera, cualquier condicional con consecuente {q} lo es.',
      outro: 'Válida. Para {⊃} basta la verdad del consecuente.' }),
    A('La otra paradoja', 'CL', ['¬p'], 'p⊃q', {
      outro: 'Válida también: un antecedente falso basta.' }),
    T('Más contraejemplos', [
      { say: 'Otra objeción: «Si Oswald no mató a Kennedy, otro lo hizo» es verdadera; «Si Oswald no hubiese matado a Kennedy, otro lo habría hecho» parece falsa. Mismo antecedente y consecuente, distinto valor: no pueden ser los dos materiales.' },
      { say: 'Hay quien distingue condicionales <b>indicativos</b> (que serían materiales) y <b>subjuntivos</b> o contrafácticos (que no). Pero la diferencia gramatical está en el tiempo y el modo de los verbos, no en el «si»; parece más bien que se evalúan desde momentos distintos.' },
      { say: 'Peor todavía: hay inferencias válidas para {⊃} cuyas instancias en castellano son claramente inválidas, todas con condicionales indicativos.',
        fig: table(['Forma válida para ⊃', 'Instancia'], [['{(p∧q)⊃r ⊢ (p⊃r)∨(q⊃r)}', 'Si cierras los dos interruptores, se enciende la luz; luego, o con uno basta, o con el otro.'], ['{¬(p⊃q) ⊢ p}', 'No es cierto que si hay un dios bueno, se escuchen las plegarias de los malvados; luego hay un dios.']]) },
      { say: 'Aquí la conversación no ayuda: en el caso de los interruptores, las dos disyuntas de la conclusión parecen falsas. Lo más honesto es reconocer que el «si» del castellano no es {⊃}.' },
      { say: 'Un argumento clásico a favor de {⊃} usa el <b>silogismo disyuntivo</b>: de {¬A∨B} y {A} se sigue {B}. Recuérdalo: en capítulos posteriores veremos lógicas donde ese paso falla.', mood: 'think' }
    ]),
    A('Los interruptores', 'CL', ['(p∧q)⊃r'], '(p⊃r)∨(q⊃r)', {
      intro: 'Comprueba que, para {⊃}, la inferencia de los interruptores es válida.',
      outro: 'Válida para {⊃}. Pero con dos interruptores en serie, la conclusión en castellano es falsa: el «si» no es material.' }),
    A('Plegarias y dioses', 'CL', ['¬(p⊃q)'], 'p', {
      outro: 'Válida para {⊃}: si el condicional material es falso, su antecedente es verdadero.' }),
    Q('¿Es material el condicional?', [
      { q: '¿Cuál de estas es una paradoja de la implicación material?', opts: ['{p, p⊃q ⊢ q}', '{¬p ⊢ p⊃q}', '{p⊃q ⊢ ¬q⊃¬p}'], ok: 1, why: 'Que un antecedente falso baste para la verdad del condicional choca con el uso ordinario de «si».' },
      { q: 'La defensa del condicional material por la implicatura conversacional dice que esos condicionales…', opts: ['son falsos', 'son verdaderos pero no se afirman', 'no tienen valor de verdad'], ok: 1, why: 'Serían verdaderos, pero quien los dice viola la regla de afirmar lo más fuerte que sabe.' },
      { q: '¿Por qué la conversación no salva el ejemplo de los interruptores?', opts: ['Porque ahí las dos disyuntas de la conclusión parecen falsas', 'Porque la premisa es falsa', 'Porque usa subjuntivos'], ok: 0, why: 'No es que sepamos cuál disyunta es verdadera: ninguna parece serlo.' },
      { q: 'El argumento de 1.10 a favor de {⊃} usa…', opts: ['el modus tollens', 'el silogismo disyuntivo', 'la contraposición'], ok: 1, why: 'De {¬A∨B} y {A} infiere {B}. Volverá a aparecer cuando ese paso deje de ser válido.' }
    ]),
    A('Jefe del arrecife', 'CL', ['p≡¬¬q', '¬q⊃(r∧¬s)', 's⊃(p∨q)'], '(s∧q)⊃p', { boss: true,
      intro: 'El último reto del capítulo 1. Hay tres premisas: elige bien el orden.',
      outro: '¡Válida! Ya dominas los árboles clásicos.' }),
    V('La máquina de árboles', { sys: ['CL'], syms: '¬∧∨⊃≡', goals: ['valid', 'invalid', 'own'],
      intro: 'Al fondo del arrecife hay una máquina que construye árboles sola. Escribe premisas y conclusión y pulsa <b>Construir árbol</b>.',
      outro: 'Los árboles clásicos siempre terminan: la validez proposicional clásica es decidible.',
      ex: [[['p⊃q', 'p'], 'q', 'valid'], [['p⊃q', 'q'], 'p', 'invalid'], [['p⊃q'], '¬q⊃¬p', 'valid'], [['p∨q', '¬p'], 'q', 'valid'], [['p⊃q', '¬p'], '¬q', 'invalid'], [[], '(p⊃q)∨(q⊃p)', 'valid']] })
  ]
});
})(window.CONTENT);
