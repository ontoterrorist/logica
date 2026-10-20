/* Capítulo 16 · Identidad necesaria en lógica modal */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 16, num: '16', name: 'Estatuas Gemelas', logic: 'Identidad necesaria; designadores rígidos y no rígidos', badge: '□=',
  intro: 'Dos estatuas idénticas miran al mismo punto. Si dos nombres nombran lo mismo, ¿lo nombran en todo mundo? Aquí la identidad es necesaria, y aparecen los descriptores.',
  stages: [
    T('Identidad necesaria', [
      { say: 'Hay dos semánticas para la identidad en lógica modal: la <b>necesaria</b> y la <b>contingente</b> (capítulo 17). La diferencia: si los enunciados de identidad pueden cambiar de valor de un mundo a otro.' },
      { say: 'Con identidad necesaria, la extensión de = es la misma en todos los mundos: los pares ⟨d, d⟩. Los árboles tienen las reglas clásicas, con el mundo, y una tercera, la <b>invariancia de la identidad</b> (IIR):',
        fig: rule(r(['·'], [['{a=a, i}']]), r(['{a=b, i}', '{A(a), i}'], [['{A(b), i}']], 'A atómica; mismo mundo'), r(['{a=b, i}'], [['{a=b, j}']], 'j: cualquier otro mundo de la rama')) },
      { say: 'Con ellas valen, incluso en VK, las identidades y diferencias necesarias: {∀x∀y(x=y⊃□x=y)} (llamémosla NI) y {∀x∀y(¬x=y⊃□¬x=y)}.',
        fig: tab('VK=', [], '∀x∀y(x=y⊃□x=y)') }
    ]),
    A('La identidad es necesaria', 'VK=', [], '∀x∀y(x=y⊃□x=y)', { intro: 'Usa la regla <b>IIR</b> cuando aparezca el mundo nuevo.', outro: 'Válida en VK(NI): es NI.' }),
    A('La diferencia también', 'VK=', [], '∀x∀y(¬x=y⊃□¬x=y)', { outro: 'Válida en VK(NI).' }),
    A('Un nombre, otro nombre', 'CK=', ['a=b'], '□a=b', { outro: 'Válida en CK(NI).' }),
    A('No todo es único', 'CK=', [], '□∀x∀y((Sax∧Say)⊃x=y)', { outro: 'Inválida: en el mundo 1, a puede estar en S con dos cosas distintas.' }),
    T('Con negatividad', [
      { say: 'Si la restricción de negatividad está en juego, la identidad solo relaciona objetos existentes en cada mundo. Las reglas cambian: de {Ea, i} sale {a=a, i}, y la IIR solo lleva {a=b} a un mundo j si en j existe a (o b).' },
      { say: 'Entonces NI deja de valer: si a y b no existen en el mundo 1, {a=b} es falsa allí. Pero sigue valiendo {a=b⊃□(Ea⊃a=b)}: en todo mundo donde exista, a es idéntico a b.' }
    ]),
    A('Identidad de lo existente', 'VK=−', [], 'a=b⊃□(Ea⊃a=b)', { outro: 'Válida en la VK(NI) negativa.' }),
    A('NI con negatividad', 'VK=−', [], '∀x∀y(x=y⊃□x=y)', { outro: 'Inválida: sin existencia en el mundo 1, la identidad no viaja hasta allí.' }),
    T('Designadores rígidos', [
      { say: 'Una objeción clásica. Beethoven compuso nueve sinfonías, así que 9 = β, con β: «el número de sinfonías de Beethoven». Por NI, necesariamente 9 = β. Falso: Beethoven pudo morir tras la octava.' },
      { say: 'La negatividad no salva: con un platónico para quien 9 existe necesariamente, saldría igual el absurdo. El problema es otro: β cambia de denotación de un mundo a otro. Es un <b>designador no rígido</b>. Nuestras constantes, que denotan lo mismo en todo mundo, son <b>rígidas</b>.' },
      { say: 'Añadimos <b>descriptores</b> α, β, γ…, que denotan algo en cada mundo. En los árboles: las reglas de identidad valen para todo término, pero la IIR solo para nombres rígidos, y los cuantificadores (y la NCR) se instancian solo con nombres rígidos. Y una regla nueva: para cada descriptor α y cada mundo i, {c=α, i} con c nuevo.',
        fig: rule(r(['·'], [['{c=α, i}']], 'c nuevo; para cada α y cada i')) },
      { say: 'En el contramodelo, α denota en el mundo i lo que denota c si {c=α, i} está en la rama. Varias inferencias que valen para nombres rígidos fallan para descriptores.',
        fig: tab('CK=', [], 'a=α⊃□a=α') }
    ]),
    A('Lo necesario de todo, para α', 'CK=', ['∀x□Px'], '□Pα', { intro: 'Usa la regla de <b>descriptores</b> (DSC) para darle a α un nombre en cada mundo.', outro: 'Válida: en cada mundo, α es algún objeto, y todo objeto es necesariamente P.' }),
    A('Beethoven', 'CK=', [], 'a=α⊃□a=α', { outro: 'Inválida: 9 es el número de sinfonías de Beethoven, pero no necesariamente.' }),
    T('Nombres y descripciones', [
      { say: 'Las descripciones definidas («el tal y cual») parecen no rígidas, como la de Beethoven (aunque «el menor número natural» quizás sea rígida). ¿Y los nombres propios, como «Aristóteles»?' },
      { say: 'Si fueran descripciones encubiertas, como «el maestro de Alejandro Magno», «Aristóteles fue el maestro de Alejandro» sería necesaria. Pero en un mundo donde Aristóteles fue un funcionario de Estagira y otro educó a Alejandro, es falsa. Así que los nombres parecen rígidos.' },
      { say: 'Kripke propuso un mecanismo: alguien <b>bautiza</b> un objeto con un nombre, que lo designa rígidamente en todos los mundos, y el uso pasa de hablante en hablante. Es la <b>teoría causal de la referencia</b>. Problema: dicen que unos africanos llamaban «Madagascar» a parte del continente, y por un malentendido el nombre pasó a la isla.', mood: 'think' }
    ]),
    Q('Estatuas', [
      { q: 'La regla IIR permite pasar de {a=b, i} a…', opts: ['{a=b, j} en otro mundo', '{b=a, i}', '{Ea, i}'], ok: 0, why: 'La identidad no cambia de mundo a mundo.' },
      { q: 'Un designador rígido…', opts: ['denota lo mismo en todo mundo', 'cambia de denotación', 'no denota'], ok: 0, why: 'Como los nombres propios, según Kripke.' },
      { q: '¿Qué falla en el argumento de las sinfonías?', opts: ['«el número de sinfonías de Beethoven» no es rígido', '9 no existe', 'la identidad no es transitiva'], ok: 0, why: 'NI vale para designadores rígidos.' },
      { q: 'El caso de «Madagascar» complica…', opts: ['la teoría causal de la referencia', 'la regla IIR', 'la fórmula de Barcan'], ok: 0, why: 'La referencia no siempre se transmite de hablante en hablante.' }
    ]),
    A('Jefe de las estatuas', 'CK=', ['a=b', '□Pa'], '□Pb', { boss: true, outro: '¡Válida en CK(NI)!' }),
    V('La máquina de las estatuas', { sys: ['CK=', 'VK=', 'VK=−', 'CS5='], syms: '¬∧∨⊃∀∃□◇=', goals: ['valid', 'invalid', 'split'],
      intro: 'Identidad necesaria con nombres (a, b) y descriptores (α, β).',
      outro: 'Las identidades entre nombres rígidos son necesarias; con descriptores, no.',
      ex: [[['a=b'], '□a=b', 'valid', 'CK='], [[], 'a=α⊃□a=α', 'invalid', 'CK='], [[], '∀x∀y(x=y⊃□x=y)', 'valid', 'VK='], [[], '∀x∀y(x=y⊃□x=y)', 'invalid', 'VK=−'], [['∀x□Px'], '□Pα', 'valid', 'CK='], [[], 'a=b⊃□(Ea⊃a=b)', 'valid', 'VK=−']] })
  ]
});
})(window.CONTENT);
