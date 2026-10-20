/* Apéndice 11a · Lógicas modales multivaluadas */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 11.5, num: '11a', name: 'Jardín de Coral', logic: 'Lógicas modales multivaluadas: K_FDE, K_K3, K_LP y los futuros contingentes', badge: '□b',
  intro: 'En el jardín de coral cada mundo tiene más de dos colores. Juntamos los mundos posibles con los cuatro valores de FDE, y volvemos a la batalla naval de Aristóteles.',
  stages: [
    T('Mundos con muchos valores', [
      { say: 'En las lógicas modales usuales, cada mundo es bivalente. Pero nada obliga: los mundos pueden tener los valores de cualquier lógica multivaluada. Una interpretación es ⟨W, R, S, ν⟩, con S una estructura multivaluada y ν dando a cada letra un valor en cada mundo.' },
      { say: 'Si los valores están ordenados, lo natural es: {□A} vale en w la <b>cota inferior máxima</b> de los valores de A en los mundos accesibles, y {◇A} la <b>cota superior mínima</b>. Es la versión multivaluada de «en todos» y «en alguno».' },
      { say: 'La validez conserva los valores designados en todo mundo. Así sale K<sub>L</sub>, el análogo de K para la lógica L; con condiciones sobre R, sus extensiones. Por ejemplo, en la versión de Łukasiewicz continua valen la necesitación y {□(A→B)→(□A→□B)}, pero no {□A→A} sin reflexividad.' }
    ]),
    T('FDE modal', [
      { say: 'Con FDE como base sale K<sub>FDE</sub>. Ignorando el valor n se obtiene K<sub>LP</sub>; ignorando b, K<sub>K3</sub>; ignorando los dos, la K clásica.' },
      { say: 'En la versión relacional, las condiciones son naturales: {□A} es verdadera si A lo es en todos los accesibles, y falsa si A es falsa en alguno; {◇A} es verdadera si A lo es en alguno, y falsa si A es falsa en todos.',
        fig: table(['', 'verdadera (ρ1) si…', 'falsa (ρ0) si…'], [['{□A}', 'A es verdadera en todo mundo accesible', 'A es falsa en algún mundo accesible'], ['{◇A}', 'A es verdadera en algún mundo accesible', 'A es falsa en todo mundo accesible']]) },
      { say: 'K<sub>FDE</sub> y K<sub>K3</sub> no tienen verdades lógicas: un solo mundo que se ve a sí mismo, con todas las letras sin valor, lo impide. Y un dato curioso: K<sub>LP</sub> valida exactamente las mismas fórmulas que K.' }
    ]),
    T('Árboles modales con signo', [
      { say: 'Se combinan los árboles de FDE con los de K. Los nodos son {A,+i}, {A,−i} o {irj}. Las reglas extensionales son las de FDE; las modales:',
        fig: rule(r(['{□A,+i}', '{irj}'], [['{A,+j}']]), r(['{□A,−i}'], [['{irj}', '{A,−j}']], 'j nuevo'), r(['{◇A,+i}'], [['{irj}', '{A,+j}']], 'j nuevo'), r(['{◇A,−i}', '{irj}'], [['{A,−j}']])) },
      { say: 'Y las reglas de conmutar: {¬□A,±i} da {◇¬A,±i}, y {¬◇A,±i} da {□¬A,±i}. Para K<sub>K3</sub> y K<sub>LP</sub> se añaden los cierres de K3 y de LP; para ρ, σ y τ, sus reglas de siempre.',
        fig: tab('KFDE', ['□p∧¬□q'], '◇(p∧¬q)') }
    ]),
    A('Necesidad y no necesidad', 'KFDE', ['□p∧¬□q'], '◇(p∧¬q)', { outro: 'Válida en K_FDE.' }),
    A('Sin modus ponens bajo la caja', 'KFDE', ['□(p⊃q)', '◇p'], '◇q', {
      outro: 'Inválida en K_FDE: en el mundo 1, {p} es verdadera y falsa, así que {p⊃q} vale sin que {q} valga.' }),
    A('Con exclusión', 'KK3', ['□(p⊃q)', '◇p'], '◇q', { outro: 'Válida en K_K3: sin excesos de verdad, el silogismo disyuntivo vuelve.' }),
    A('Transitividad con tres valores', 'KK3τ', ['□p'], '□□p', { outro: 'Válida en K_K3 con τ.' }),
    A('Reflexividad paraconsistente', 'KLPρ', ['□p'], 'p', { outro: 'Válida en K_LP con ρ.' }),
    A('Sin verdades lógicas', 'KFDE', [], '□(p∨¬p)', { outro: 'Inválida en K_FDE: en un mundo con {p} sin valor, {p∨¬p} no es verdadera.' }),
    A('Pero en K_LP sí', 'KLP', [], '□(p∨¬p)', { outro: 'Válida en K_LP: sin faltas, el tercio excluso vale en todo mundo.' }),
    T('Futuros contingentes, otra vez', [
      { say: 'Volvamos a Aristóteles (7.9). Si «mañana habrá una batalla naval» fuese verdadera hoy, sería necesaria; si fuese falsa, imposible. Como no es ni lo uno ni lo otro, no es verdadera ni falsa.' },
      { say: 'Para modelarlo: K3 con R reflexiva y transitiva (wRv: v sale de w tras más acontecimientos) y una condición de <b>persistencia</b>: lo verdadero sigue verdadero, y lo falso sigue falso. Llamemos <b>A</b> (por Aristóteles) a esa lógica.' },
      { say: 'En A, {p ⊢ □p} y {¬p ⊢ □¬p}: el argumento de Aristóteles funciona. Y {p∨¬p} puede fallar: hoy, en w0, {p} no tiene valor; mañana podría ser verdadera (w1) o falsa (w2). En los árboles, la persistencia es la regla «her.».' },
      { say: 'Pero Aristóteles también dice que es <i>necesario</i> que haya o no haya batalla, aunque ninguna de las dos cosas sea necesaria: {□(p∨¬p)}, pero no {□p∨□¬p}. En A, {□(p∨¬p)} falla. Se arregla mirando «desde el final del tiempo»: {□A} vale si A vale en todos los mundos <b>completos</b> accesibles.', mood: 'think' }
    ]),
    A('Lo verdadero es inevitable', 'A', ['p'], '□p', {
      intro: 'Usa ρ, τ y la persistencia (her.).',
      outro: 'Válida en A: lo verdadero sigue siéndolo en todo futuro.' }),
    A('El tercio excluso falla', 'A', [], 'p∨¬p', { outro: 'Inválida en A: hoy la batalla de mañana no es verdadera ni falsa.' }),
    A('Ni siquiera necesariamente', 'A', [], '□(p∨¬p)', {
      outro: 'Inválida en A. Por eso hace falta la variante con mundos completos para recoger todo lo que dice Aristóteles.' }),
    Q('Coral', [
      { q: 'En una lógica modal multivaluada ordenada, {□A} toma…', opts: ['el valor máximo de A en los accesibles', 'la cota inferior máxima de esos valores', 'siempre 1 o 0'], ok: 1, why: 'Es la generalización de «en todos los mundos accesibles».' },
      { q: '¿Qué valida exactamente las mismas fórmulas que K?', opts: ['K_FDE', 'K_K3', 'K_LP'], ok: 2, why: 'Por monotonía: se puede resolver cada exceso hacia un lado sin cambiar lo que falla.' },
      { q: 'En la lógica A, ¿qué vale?', opts: ['{p∨¬p}', '{p ⊢ □p}', '{□p∨□¬p}'], ok: 1, why: 'Por la persistencia, lo verdadero se mantiene en todo futuro.' }
    ]),
    A('Jefe del jardín', 'KLP', ['◇(p∧q)'], '◇p∧◇q', { boss: true,
      outro: '¡Válida en K_LP!' }),
    V('La máquina del coral', { sys: ['KFDE', 'KK3', 'KLP', 'A', 'K'], syms: '¬∧∨⊃□◇', goals: ['valid', 'invalid', 'split'],
      intro: 'Árboles modales con signo. Compara K_FDE, K_K3, K_LP, la lógica A y la K clásica.',
      outro: 'K_LP coincide con K en las fórmulas válidas, pero no en las inferencias.',
      ex: [[['□(p⊃q)', '◇p'], '◇q', 'invalid', 'KFDE'], [['□(p⊃q)', '◇p'], '◇q', 'valid', 'KK3'], [[], '□(p∨¬p)', 'valid', 'KLP'], [[], '□(p∨¬p)', 'invalid', 'KFDE'], [['p'], '□p', 'valid', 'A'], [['p'], '□p', 'invalid', 'K']] })
  ]
});
})(window.CONTENT);
