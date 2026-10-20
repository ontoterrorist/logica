/* Capítulo 21 · Lógicas multivaluadas cuantificadas */
(function (C) {
const { T, Q, M, V, table } = C;
C.world({
  ord: 21, num: '21', name: 'Mar de Bandas', logic: 'Lógicas multivaluadas de primer orden: K3, Ł3, LP, RM3; libres, neutras e identidad', badge: '∀½',
  intro: 'El mar se divide en bandas de colores que cambian de un pez a otro. Volvemos a los tres valores, ahora con cuantificadores. Como en el capítulo 7, sin árboles: se razona con valores.',
  stages: [
    T('Cuantificar con muchos valores', [
      { say: 'Una lógica multivaluada cuantificada añade un dominio D y una función f<sub>q</sub> para cada cuantificador, que toma el conjunto de valores de las instancias y da un valor. Los predicados son funciones de objetos a valores.' },
      { say: 'En la clásica, {∀xA} es como una conjunción de todas sus instancias, y {∃xA} como una disyunción. Lo natural es mantenerlo: si los valores están ordenados, ∀ da la cota inferior máxima y ∃ la superior mínima.' },
      { say: 'En K3, Ł3, LP y RM3 el orden es 0 < i < 1, así que ∀ es el <b>mínimo</b> de los valores de las instancias y ∃ el <b>máximo</b>. La validez, como siempre, conserva los designados. Para mostrar validez se argumenta; para mostrar invalidez, se construye un contramodelo.',
        fig: table(['Fórmula', 'Valor'], [['{∀xPx}', 'el menor de los valores de Pa, Pb, …'], ['{∃xPx}', 'el mayor de los valores de Pa, Pb, …']]) }
    ]),
    M('Dos que no coinciden', 'K3', ['∃xPx∧∃xQx'], '∃x(Px∧Qx)', { dom: ['a', 'b'],
      intro: 'Dominio de dos objetos, a y b. Da valores a Pa, Pb, Qa y Qb para que la premisa valga 1 y la conclusión no.',
      outro: 'Inválida: con Pa = 1, Qa = 0, Pb = 0, Qb = 1, la premisa vale 1 y la conclusión 0. Funciona en las cuatro lógicas.' }),
    M('Modus ponens cuantificado en LP', 'LP', ['∀x(Px⊃Qx)', 'Pa'], 'Qa', { dom: ['a'],
      outro: 'Inválida en LP: con Pa = i y Qa = 0, las premisas están designadas y la conclusión no.' }),
    M('En Ł3', 'Ł3', ['∀x(Px⊃Qx)'], '∀x(Qx⊃Px)', { dom: ['a'],
      outro: 'Inválida: con un solo objeto, Pa = 0 y Qa = 1.' }),
    T('Versiones libres', [
      { say: 'En las cuatro lógicas valen {Pa ⊢ ∃xPx} y {∀xPx ⊢ Pa}, que la lógica libre discutía. Hay versiones libres: un dominio interior E ⊆ D de lo existente, un predicado E designado justo para los de E, y cuantificadores que recorren E.' },
      { say: 'Con cuantificadores exteriores sobre D, ¿se definen los interiores como {∃x(Ex∧A)} y {∀x(Ex⊃A)}? Solo si E es clásico. Si «a existe» puede tomar el valor i, la definición falla, y los cuantificadores interiores tienen que ser primitivos.' },
      { say: '¿Puede «a existe» no tener valor clásico? Si i es «ni verdadero ni falso»: quizá para un verificacionista («Laozi existió») o con la vaguedad (morir es gradual). Si i es «ambas cosas»: casos límite vistos como excesos, o la paradoja de Berry, que habla de la existencia del menor número no definible en menos de cien palabras.', mood: 'think' }
    ]),
    T('Lógicas libres neutras', [
      { say: 'En el capítulo 13 vimos las libres positivas y negativas. Ahora se pueden definir las <b>neutras</b>: aplicar un predicado a algo inexistente da siempre i, «ni verdadero ni falso». Equivale a dejar sin denotación a los nombres vacíos.' },
      { say: 'Así valen {Pa ⊢ Ea} y también {¬Pa ⊢ Ea}. Se motivan con «el mayor número primo es par» o «el rey de Francia es calvo». Pero «el rey de Francia existe» parece falso, no sin valor. Y si se exceptúa E, parece arbitrario no exceptuar más. La mejor opción, sugiere Priest, es una positiva.' }
    ]),
    T('Identidad con tres valores', [
      { say: 'La identidad: {a=b} designada si y solo si a y b denotan lo mismo. Valen {⊢ a=a} y la sustitución de idénticos, aunque las identidades tomen valores no clásicos (en LP y RM3 pueden valer i).' },
      { say: '¿Puede una identidad ser indeterminada? Desmonto mi moto a y voy poniendo sus piezas en la moto b. A mitad de camino, c: ¿es c = a? Parece un caso límite. Gareth Evans argumentó que no: si es indeterminado que a = b, y es determinado que a = a, entonces a y b difieren en una propiedad, y a ≠ b.' },
      { say: 'El argumento es una forma contrapuesta de la sustitución. Con faltas (K3, Ł3), esa forma no es válida. Con excesos (LP, RM3) es válida, pero no excluye las identidades indeterminadas: a = b puede valer i y a la vez «a ≠ b» estar designada. En ningún caso prueba lo que quería.', mood: 'think' },
      { say: 'Las supervaluaciones también se extienden al primer orden: las resoluciones dan valores clásicos a las atómicas que valían i. La validez por supervaluación vuelve a coincidir con la clásica, salvo con varias conclusiones.' }
    ]),
    Q('Bandas', [
      { q: 'En K3 cuantificada, {∀xPx} toma…', opts: ['el máximo de los valores de sus instancias', 'el mínimo', 'siempre 1 o 0'], ok: 1, why: 'Como una conjunción de todas las instancias.' },
      { q: 'En una lógica libre neutra, si a no existe, {Pa} vale…', opts: ['0', 'i', '1'], ok: 1, why: 'Ni verdadero ni falso.' },
      { q: '¿Por qué los cuantificadores interiores pueden no definirse con los exteriores?', opts: ['porque E puede tomar el valor i', 'porque el dominio es vacío', 'porque no hay identidad'], ok: 0, why: 'La definición funciona solo si E es clásico.' },
      { q: 'El argumento de Evans contra la identidad indeterminada…', opts: ['es concluyente', 'no funciona en ninguna de estas lógicas', 'solo falla en LP'], ok: 1, why: 'Con faltas es inválido; con excesos, válido pero inofensivo.' }
    ]),
    M('Libre de existencia', 'K3', ['Pa'], 'Pb', { dom: ['a', 'b'],
      outro: 'Inválida, por supuesto: nada une a con b. En la máquina puedes buscar inferencias más interesantes.' }),
    V('La máquina de bandas', { mv: true, fo: true, sys: ['K3', 'Ł3', 'LP', 'RM3', 'CL'], syms: '¬∧∨⊃∀∃', goals: ['valid', 'invalid', 'gap'], cmp: 'CL',
      intro: 'Esta máquina prueba dominios de uno a tres objetos con todas sus valuaciones. Un contraejemplo es seguro; si no lo encuentra, es un indicio.',
      outro: 'Con cuantificadores, ni las tablas deciden: los dominios pueden ser tan grandes como se quiera.',
      ex: [[['∃xPx∧∃xQx'], '∃x(Px∧Qx)', 'invalid', 'K3'], [['∀x(Px⊃Qx)'], '∃xPx⊃∃xQx', 'valid', 'LP'], [['∀x(Px⊃Qx)', 'Pa'], 'Qa', 'invalid', 'LP'], [['∀x(Px⊃Qx)', 'Pa'], 'Qa', 'valid', 'K3'], [[], '∀x(Px∨¬Px)', 'invalid', 'K3'], [[], '∀x(Px∨¬Px)', 'valid', 'LP']] })
  ]
});
})(window.CONTENT);
