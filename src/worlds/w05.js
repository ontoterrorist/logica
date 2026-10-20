/* Capítulo 5 · Lógicas condicionales */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 5, num: '5', name: 'Faro Condicional', logic: 'Lógicas condicionales C y C⁺; esferas de semejanza', badge: '>',
  intro: 'Desde el faro se ven las costas parecidas a la nuestra. Un condicional «si A, B» mira los mundos donde vale A y todo lo demás sigue igual. Aquí aprenderás sus árboles.',
  stages: [
    T('Más inferencias problemáticas', [
      { say: 'Estas tres formas son válidas para {⊃} y para {⥽} (de hecho, en todo sistema modal):',
        fig: table(['Nombre', 'Forma'], [['Fortalecer el antecedente', '{A⊃B ⊢ (A∧C)⊃B}'], ['Transitividad', '{A⊃B, B⊃C ⊢ A⊃C}'], ['Contraposición', '{A⊃B ⊢ ¬B⊃¬A}']]) },
      { say: 'Ahora mira estas instancias. «Si mañana no llueve, iremos al partido; luego, si mañana no llueve y esta noche muero en un accidente, iremos al partido.» La premisa puede ser verdadera y la conclusión falsa.' },
      { say: '«Si los demás candidatos se retiran, Juan obtendrá el puesto. Si Juan obtiene el puesto, los demás quedarán decepcionados. Luego, si los demás se retiran, quedarán decepcionados.» Y la contraposición: «si vamos en auto, no se averiará; luego, si se avería, no fuimos en auto».', mood: 'think' },
      { say: 'Si el condicional fuera material o estricto, estas inferencias serían válidas. No parecen serlo: tenemos otro grupo de objeciones contra ambos.' }
    ]),
    A('Fortalecer, con ⊃', 'CL', ['p⊃q'], '(p∧r)⊃q', { outro: 'Válida para el condicional material.' }),
    A('Fortalecer, con ⥽', 'S5', ['p⥽q'], '(p∧r)⥽q', { outro: 'Válida también para el estricto, incluso en S5.' }),
    T('Ceteris paribus', [
      { say: 'Una salida: cuando damos un argumento, solemos callar premisas obvias. «Este avión aterriza en Roma, luego aterriza en Italia» calla que Roma está en Italia. Son <b>entimemas</b>. Los condicionales también pueden serlo.' },
      { say: 'Lo que aceptamos al decir «si no llueve iremos al partido» es, en rigor, «si no llueve <i>y no muero esta noche</i>, iremos». Pero la lista de condiciones (otro accidente, una invasión marciana…) no tiene fin.' },
      { say: 'Se capturan todas con una cláusula comodín: «si A, y todo lo demás sigue igual, entonces B». En latín, <b>ceteris paribus</b>. La cláusula depende de A y del contexto: escribiremos el condicional así como {A>B}.' },
      { say: 'Si un estricto es verdadero cuando B vale en todos los mundos accesibles donde vale A, entonces {A>B} es verdadero cuando B vale en todos los mundos accesibles donde valen A <i>y la cláusula</i>. Falta precisar eso.' }
    ]),
    T('La semántica de C', [
      { say: 'Una interpretación tiene, además de mundos y valores, una relación R<sub>A</sub> por cada fórmula A. wR<sub>A</sub>v significa: v es un mundo donde vale A y que, ceteris paribus, es como w. Los operadores □ y ◇ se toman como en S5 (Kυ).' },
      { say: 'La condición de verdad: {A>B} es verdadera en w si B es verdadera en todos los v con wR<sub>A</sub>v. Cada fórmula A da su propio operador de necesidad, y {A>B} es esa necesidad aplicada a B.' },
      { say: 'Si llamamos f<sub>A</sub>(w) al conjunto de mundos que w ve por R<sub>A</sub> y [A] al conjunto donde vale A, todo se resume así: {A>B} es verdad en w si f<sub>A</sub>(w) ⊆ [B]. Sin más condiciones sobre f, la lógica se llama <b>C</b>: es el análogo condicional de K.',
        fig: table(['Condicional', 'Verdadero en w si…'], [['{A⊃B}', 'A es falsa en w o B es verdadera en w'], ['{A⥽B}', 'todo mundo donde vale A hace verdadera B'], ['{A>B}', 'todo mundo de f<sub>A</sub>(w) hace verdadera B']]) }
    ]),
    T('Árboles para C', [
      { say: 'Los árboles de C son los de K con nodos de la forma {i r_A j}: el mundo i ve a j por la relación de A. Las reglas de {>} son como las de {□} y {◇}:',
        fig: rule(r(['{A>B, i}', '{i rₐ j}'], [['{B, j}']], 'para cada j'), r(['{¬(A>B), i}'], [['{i rₐ j}', '{¬B, j}']], 'j nuevo')) },
      { say: 'La regla de {A>B} solo se dispara con una relación del <b>mismo</b> antecedente A. Por eso de {p>r} no se pasa a {(p∧q)>r}: el árbol tiene {0 r_(p∧q) 1}, pero no {0 r_p 1}.',
        fig: tab('C', ['p>r'], '(p∧q)>r') },
      { say: 'En el contramodelo, R<sub>A</sub> es lo que diga la rama para los antecedentes que aparecen; para los demás, da igual. Las flechas del dibujo llevan su fórmula.' }
    ]),
    A('Un condicional que se debilita', 'C', ['p>q'], 'p>(q∨r)', {
      outro: 'Válida en C: lo que vale en los mundos de p vale con una disyunción.' }),
    A('Fortalecer el antecedente', 'C', ['p>r'], '(p∧q)>r', {
      outro: 'Inválida en C: los mundos donde vale {p∧q}, ceteris paribus, no tienen por qué ser los de {p}.' }),
    A('Transitividad', 'C', ['p>q', 'q>r'], 'p>r', {
      outro: 'Inválida en C, como el ejemplo de Juan y los candidatos.' }),
    A('Contraposición', 'C', ['p>q'], '¬q>¬p', {
      outro: 'Inválida en C, como el ejemplo del auto.' }),
    T('C⁺: dos condiciones naturales', [
      { say: 'En C nada exige que A sea verdadera en los mundos de f<sub>A</sub>(w). Pero es lo que queríamos decir. Primera condición: (1) f<sub>A</sub>(w) ⊆ [A].' },
      { say: 'Segunda: si A ya es verdadera en w, entre los mundos parecidos a w donde vale A debe estar w mismo. (2) Si w ∈ [A], entonces w ∈ f<sub>A</sub>(w). Con las dos, la lógica se llama <b>C⁺</b>.' },
      { say: 'En los árboles, (1) se logra añadiendo {A, j} en la regla de {¬(A>B)}. Para (2) hay una regla que ramifica: para cada mundo i y cada antecedente A de la rama, o bien {¬A, i}, o bien {A, i} e {i r_A i}. En el juego es el botón <b>C+</b> del panel.',
        fig: rule(r(['{¬(A>B), i}'], [['{i rₐ j}', '{A, j}', '{¬B, j}']], 'j nuevo'), r(['·'], [['{¬A, i}'], ['{A, i}', '{i rₐ i}']], 'para cada i y cada antecedente A')) }
    ]),
    A('Modus ponens en C', 'C', ['p', 'p>q'], 'q', {
      outro: 'Inválida en C: nada dice que el mundo 0 esté entre sus propios mundos de p.' }),
    A('Modus ponens en C⁺', 'C+', ['p', 'p>q'], 'q', {
      intro: 'Usa el botón <b>C+</b>: en la rama donde {p, 0} es verdadera, obtienes {0 r_p 0}.',
      outro: 'Válida en C⁺: C⁺ extiende propiamente a C.' }),
    A('Si A, entonces A', 'C+', [], 'p>p', {
      outro: 'Válida en C⁺: en los mundos de p vale p, por la condición (1).' }),
    A('Un hecho no basta', 'C+', ['p>r'], 'p>(r∧q)', {
      intro: 'Este árbol ramifica bastante. Aplica primero lo que no ramifica.',
      outro: 'Inválida en C⁺.' }),
    T('Esferas de semejanza', [
      { say: 'Stalnaker y David Lewis propusieron pensar f<sub>A</sub>(w) como los mundos <b>más parecidos</b> a w donde vale A. Cada mundo viene rodeado de <b>esferas</b> concéntricas: lo de dentro se parece más a w que lo de fuera.' },
      { say: 'f<sub>A</sub>(w) es la intersección de [A] con la esfera más pequeña que toca a [A] (o vacío si A no vale en ningún mundo). Así se cumplen (1) y (2) y otras más; el sistema resultante se llama <b>S</b>.' },
      { say: '<b>C2</b> (Stalnaker) añade que siempre hay un único mundo más parecido: valida el <b>tercio excluso condicional</b>, {(A>B)∨(A>¬B)}. Lewis lo rechazó: no hay un único mundo más parecido donde Bizet y Verdi sean compatriotas; en unos son franceses, en otros italianos.' },
      { say: '<b>C1</b> (Lewis) solo exige que, si A ya vale en w, el único mundo más parecido sea w. Valida {A∧B ⊢ A>B}, y eso también se discute: el adivino tramposo acierta por casualidad, y «si lo predice, ocurrirá» sigue pareciendo falso.', mood: 'think' },
      { say: 'Para S, C1 y C2 no hay árboles del tipo del libro: la validez se muestra directamente y la invalidez se muestra dibujando esferas. La cadena es C ⊂ C⁺ ⊂ S ⊂ C1 ⊂ C2.' }
    ]),
    Q('Esferas', [
      { q: 'En la semántica de esferas, f<sub>A</sub>(w) es…', opts: ['todo [A]', '[A] dentro de la esfera más pequeña que lo toca', 'la esfera más grande'], ok: 1, why: 'Los mundos de A más parecidos a w.' },
      { q: 'El tercio excluso condicional {(A>B)∨(A>¬B)} vale en…', opts: ['C', 'C1', 'C2'], ok: 2, why: 'Porque en C2 hay un único mundo de A más parecido, y en él vale B o vale ¬B.' },
      { q: '¿Qué ejemplo usa Lewis contra la unicidad del mundo más parecido?', opts: ['Bizet y Verdi', 'Oswald y Kennedy', 'Hobbes y el círculo'], ok: 0, why: 'Hay mundos simétricos: unos donde ambos son franceses y otros donde son italianos.' },
      { q: 'La cadena de sistemas, de más débil a más fuerte, es…', opts: ['C, C⁺, S, C1, C2', 'C2, C1, S, C⁺, C', 'S, C, C⁺, C1, C2'], ok: 0, why: 'Cada uno añade condiciones al anterior.' }
    ]),
    T('¿Funciona la semejanza?', [
      { say: '¿Hay una buena noción de semejanza entre mundos? No se mide contando diferencias: si dos mundos difieren en algo, difieren en infinitas fórmulas. Algunas diferencias pesan más que otras, pero ¿cómo se mide eso?' },
      { say: 'Peor: imagina mundos donde Kennedy apretó el botón durante la crisis de los misiles. En unos hubo holocausto nuclear; en otros, un cortocircuito lo evitó. Los segundos se parecen más al nuestro, así que saldría verdadero «si Kennedy hubiese apretado el botón, algo lo habría evitado». Parece falso.', mood: 'think' },
      { say: 'C⁺ no depende de la semejanza. Pero tampoco escapa de los problemas del estricto: si f<sub>A</sub>(w) = [A], el {>} de C⁺ es justo el {⥽} de S5. Y valen {□B ⊢ A>B} y {(A∧¬A)>B}: la explosión sigue ahí.' }
    ]),
    A('La paradoja sigue ahí', 'C+', ['□q'], 'p>q', {
      outro: 'Válida en C⁺: lo necesario es implicado por cualquier cosa, como con el estricto.' }),
    A('Y la explosión', 'C+', [], '(p∧¬p)>q', {
      outro: 'Válida en C⁺: los mundos donde vale una contradicción no existen, así que cualquier cosa vale en todos ellos.' }),
    A('Jefe del faro', 'C+', ['p∧¬q'], '¬(p>q)', { boss: true,
      intro: 'Si {p} es verdad y {q} no, ¿puede ser verdad «si p, q»? En C⁺, piensa en la regla de centrado.',
      outro: '¡Válida en C⁺! El mundo real es uno de sus propios mundos de p.' }),
    V('La máquina condicional', { sys: ['C', 'C+'], syms: '¬∧∨⊃>□◇', goals: ['valid', 'invalid', 'split'],
      intro: 'Prueba inferencias con {>} en C y en C⁺. Busca una que cambie de veredicto.',
      outro: 'Fortalecer el antecedente, la transitividad y la contraposición fallan en ambas.',
      ex: [[['p>q'], 'p>(q∨r)', 'valid', 'C'], [['p>r'], '(p∧q)>r', 'invalid', 'C'], [['p', 'p>q'], 'q', 'invalid', 'C'], [['p', 'p>q'], 'q', 'valid', 'C+'], [[], 'p>p', 'valid', 'C+'], [['p>q'], '¬q>¬p', 'invalid', 'C+']] })
  ]
});
})(window.CONTENT);
