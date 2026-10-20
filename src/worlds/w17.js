/* Capítulo 17 · Identidad contingente en lógica modal */
(function (C) {
const { T, Q, A, V, table, tab, rule, r } = C;
C.world({
  ord: 17, num: '17', name: 'Mar Espejo', logic: 'Identidad contingente: avatares, amebas y la estrella de la mañana', badge: '◇≠',
  intro: 'El mar quieto refleja todo: lo que aquí es uno, en el reflejo puede ser dos. Con la identidad contingente, que dos nombres nombren lo mismo puede ser cosa de este mundo.',
  stages: [
    T('La estrella de la mañana', [
      { say: 'La Estrella de la Mañana es Venus, y la Estrella de la Tarde también: m = v = e. Si esos nombres son rígidos, por NI sería necesario que m = e. Pero parece contingente: la que brilla al anochecer pudo haber resultado ser Mercurio.' },
      { say: 'Para que NI falle, la semántica cambia. Una interpretación es ⟨D, H, W, R, ν⟩, con un conjunto H de <b>avatares</b>. Los objetos de D son funciones de mundos a avatares: |d|<sub>w</sub> es el avatar de d en w. Los predicados se aplican a avatares, y la identidad relaciona cada avatar consigo mismo.' },
      { say: 'Así, {a=b} es verdad en w si a y b tienen el mismo avatar en w; en otro mundo pueden tener avatares distintos. Los cuantificadores siguen recorriendo D (o D<sub>w</sub>).' }
    ]),
    T('Árboles con identidad contingente', [
      { say: 'Los árboles son los de la identidad necesaria <b>sin</b> la regla de invariancia (IIR). La sustitución de idénticos funciona solo dentro de un mismo mundo.',
        fig: tab('CS5≈', [], '∀x∀y(x=y⊃□x=y)') },
      { say: 'El contramodelo: un objeto por nombre; en cada mundo, los nombres unidos por identidades de ese mundo comparten avatar, y los demás tienen avatares propios. Así NI falla incluso en CS5(CI), la lógica normal más fuerte.' }
    ]),
    A('La sustitución sigue valiendo dentro de un mundo', 'CK≈', [], '∀x∀y□(x=y⊃(Px⊃Py))', { outro: 'Válida en CK(CI).' }),
    A('NI falla', 'CS5≈', [], '∀x∀y(x=y⊃□x=y)', { outro: 'Inválida en CS5(CI): son idénticos aquí, pero no en el otro mundo.' }),
    A('Posible identidad', 'CK≈', [], '∀x∀y((◇x=y∧Px)⊃Py)', { outro: 'Inválida: que pudieran ser lo mismo no hace que compartan propiedades aquí.' }),
    A('Sustituir bajo la caja', 'CK≈', ['a=b', '□a=a'], '□a=b', { outro: 'Inválida en CK(CI): la sustitución no entra en contextos modales. En CK(NI) sí sería válida.' }),
    T('Avatares y contrapartes', [
      { say: 'Con contrapartes à la Lewis, NI también falla: a puede tener dos contrapartes en otro mundo. ¿Son los avatares contrapartes? No: la relación entre los avatares de un objeto es de equivalencia, y no estropea la lógica modal proposicional.' },
      { say: 'Si D tuviera que contener todas las funciones de mundos a avatares, valdría {□∃xPx⊃∃x□Px}: de que necesariamente alguien gane el juego se seguiría que alguien gana necesariamente. Por eso D no tiene por qué contenerlas todas.' },
      { say: 'Los descriptores se añaden igual que en el capítulo 16. La diferencia con los nombres rígidos está en los cuantificadores: en CK(CI), de {□Pa} se sigue {∃x□Px}, pero de {□Pα} no.' }
    ]),
    A('Rígido, de re', 'CK≈', ['□Pa'], '∃x□Px', { outro: 'Válida en CK(CI): a es uno de los objetos del dominio.' }),
    T('¿Hay identidades contingentes?', [
      { say: 'Si «Estrella de la Mañana» y «Estrella de la Tarde» son rígidos, decir que son la misma es decir de Venus que es idéntica a sí misma: necesario. Pero hay otros ejemplos.' },
      { say: 'Tiempo: la ameba Alf se divide en Ben y Con. Antes de la fisión, Ben y Con eran Alf: eran idénticos, y ahora son distintos. Y su análogo modal: si el cigoto que fui se hubiera dividido, en ese mundo yo sería dos personas.' },
      { say: 'Un trozo de arcilla l se convierte en una estatua del Buda b y luego se aplasta. Mientras dura la estatua, l = b; antes y después, no, porque b no existía. Y lo más difícil de discutir: la necesidad <b>epistémica</b>. Para los antiguos, la Estrella de la Mañana y la de la Tarde podían ser distintas.', mood: 'think' },
      { say: 'Eso resuelve el caso de George Eliot: «sabía que George Eliot era novelista» no da «sabía que Mary Anne Evans lo era», porque la sustitución no entra en el contexto epistémico. Pero no resuelve «pensaba en George Eliot»: la sustitución sigue fuera de los operadores modales. Quizá sí pensaba en Mary Anne Evans, sin saberlo.' }
    ]),
    T('¿Qué son los avatares?', [
      { say: 'Si los mundos son tiempos, los avatares pueden ser <b>partes temporales</b>: un objeto es la suma ordenada de sus partes en cada momento, unidas por continuidad causal.' },
      { say: 'Si son mundos de verdad, ¿qué une las «partes modales» de un objeto? No hay continuidad causal entre mundos. Tomar como objeto cualquier combinación de partes da una lógica demasiado fuerte. Haría falta un «pegamento metafísico» que nadie sabe describir.' },
      { say: 'Otra lectura: los avatares son <b>identidades</b>. Un objeto puede tener colores distintos en mundos distintos, y también identidades distintas. George Eliot y Mary Anne Evans tienen la misma identidad aquí, pero no en algunos mundos de lo que yo sabía.', mood: 'think' }
    ]),
    Q('Espejo', [
      { q: 'La diferencia entre los árboles de identidad necesaria y contingente es…', opts: ['la regla IIR', 'la sustitución de idénticos', 'las reglas de los cuantificadores'], ok: 0, why: 'Sin IIR, la identidad no pasa de un mundo a otro.' },
      { q: 'En la identidad contingente, los objetos de D son…', opts: ['avatares', 'funciones de mundos a avatares', 'nombres'], ok: 1, why: 'Cada objeto tiene un avatar en cada mundo.' },
      { q: '¿Qué ejemplo de identidad contingente usa el tiempo?', opts: ['la ameba que se divide', 'la Estrella de la Mañana', 'Madagascar'], ok: 0, why: 'Ben y Con eran idénticos antes de la fisión.' },
      { q: 'La identidad contingente resuelve…', opts: ['el caso epistémico de George Eliot', 'el caso de pensar en George Eliot', 'los dos'], ok: 0, why: 'La sustitución falla dentro de operadores modales, como «sé que», pero no fuera.' }
    ]),
    A('Jefe del espejo', 'CK≈', ['□∀x(Px⊃Qx)', 'Pa'], '◇Qa', { boss: true, outro: '¡Inválida! Sin reflexividad, nada garantiza que algún mundo sea accesible. Ni siquiera en el espejo.' }),
    V('La máquina del espejo', { sys: ['CK≈', 'CS5≈', 'VK≈', 'CK=', 'CS5='], syms: '¬∧∨⊃∀∃□◇=', goals: ['valid', 'invalid', 'split'],
      intro: 'Compara identidad contingente (≈) y necesaria (=).',
      outro: 'Todo lo válido con identidad contingente lo es con identidad necesaria, no al revés.',
      ex: [[[], '∀x∀y(x=y⊃□x=y)', 'invalid', 'CS5≈'], [[], '∀x∀y(x=y⊃□x=y)', 'valid', 'CS5='], [['a=b', '□a=a'], '□a=b', 'invalid', 'CK≈'], [['a=b', '□a=a'], '□a=b', 'valid', 'CK='], [['□Pa'], '∃x□Px', 'valid', 'CK≈'], [[], '∀x∀y□(x=y⊃(Px⊃Py))', 'valid', 'CK≈']] })
  ]
});
})(window.CONTENT);
