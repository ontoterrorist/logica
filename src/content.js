/* Lógica por Árboles — piezas comunes del contenido. Cada capítulo del libro de Priest es un mundo y vive en
   src/worlds/w<NN>.js. En los textos, {…} marca una fórmula.
   Etapas: T teoría · Q preguntas · A árbol (la jugadora lo construye) · M valores (contraejemplo a mano)
           TT tabla de verdad · V la máquina de árboles (escribe una inferencia y el motor hace el árbol) */
(function (root) {
'use strict';
const list = [];
const T = (title, pages) => ({ t: 'T', title, pages });
const Q = (title, qs) => ({ t: 'Q', title, qs });
const A = (title, sys, prem, concl, o) => Object.assign({ t: 'A', title, sys, prem, concl }, o);
const M = (title, sys, prem, concl, o) => Object.assign({ t: 'M', title, sys, prem, concl }, o);
const TT = (title, sys, cols, o) => Object.assign({ t: 'TT', title, sys, cols }, o);
const V = (title, o) => Object.assign({ t: 'V', title }, o);
const table = (head, rows, o) => Object.assign({ k: 'table', head, rows }, o);
const tab = (sys, prem, concl, cap) => ({ k: 'tab', sys, prem, concl, cap });
const rule = (...rules) => ({ k: 'rule', rules });
const r = (top, alts, note) => ({ top, alts, note });
const kripke = (w, e, cap, o) => Object.assign({ k: 'kripke', w, e, cap }, o);

/* libro de reglas: lo que vale en cada sistema */
function RULEBOOK(sys) {
  const out = [];
  const add = (id, name, desc) => out.push({ id, name, desc });
  const at = sys.W ? ', i' : '';
  if (!sys.sg) {
    add('¬¬', 'Doble negación', `De {¬¬A${at}} se pasa a {A${at}}.`);
    add('∧', 'Conjunción', `{A∧B${at}} da {A${at}} y {B${at}} en la misma rama.`);
    add('¬∧', 'Conjunción negada', `{¬(A∧B)${at}} abre dos ramas: {¬A${at}} | {¬B${at}}.`);
    add('∨', 'Disyunción', `{A∨B${at}} abre dos ramas: {A${at}} | {B${at}}.`);
    add('¬∨', 'Disyunción negada', `{¬(A∨B)${at}} da {¬A${at}} y {¬B${at}}.`);
    add('⊃', 'Condicional material', `{A⊃B${at}} abre dos ramas: {¬A${at}} | {B${at}}.`);
    add('¬⊃', 'Condicional negado', `{¬(A⊃B)${at}} da {A${at}} y {¬B${at}}.`);
    add('≡', 'Bicondicional', `{A≡B${at}} abre dos ramas: {A${at}}, {B${at}} | {¬A${at}}, {¬B${at}}.`);
    add('¬≡', 'Bicondicional negado', `{¬(A≡B)${at}} abre dos ramas: {A${at}}, {¬B${at}} | {¬A${at}}, {B${at}}.`);
    if (sys.md === 'K') {
      add('□', 'Necesidad', '{□A, i} junto a {irj} da {A, j}, para cada j que i vea. Nunca se marca como usada: si aparece otro j, se vuelve a aplicar.');
      add('◇', 'Posibilidad', '{◇A, i} da {irj} y {A, j} con un mundo j nuevo.' + (sys.nn === 'N' ? ' En los mundos distintos de 0 solo se activa si hay algo de la forma {□B, i}: si no, el mundo puede ser no normal.' : ''));
      add('¬□', 'Necesidad negada', '{¬□A, i} da {◇¬A, i}.');
      add('¬◇', 'Posibilidad negada', '{¬◇A, i} da {□¬A, i}.');
      if (sys.nn === 'L') add('0', 'Solo en 0', 'En L las cuatro reglas modales se aplican únicamente en el mundo 0.');
      add('⥽', 'Condicional estricto', '{A⥽B, i} es {□(A⊃B), i}; {¬(A⥽B), i} es {¬□(A⊃B), i}.');
    }
    if (sys.md === 'U') {
      add('□', 'Necesidad (S5 sin relación)', '{□A, i} da {A, j} para todo mundo j de la rama.');
      add('◇', 'Posibilidad (S5 sin relación)', '{◇A, i} da {A, j} con un mundo j nuevo.');
      add('¬□', 'Necesidad negada', '{¬□A, i} da {◇¬A, i}.');
      add('¬◇', 'Posibilidad negada', '{¬◇A, i} da {□¬A, i}.');
    }
    if (sys.tense) {
      add('[F]', 'Siempre en el futuro', '{[F]A, i} junto a {irj} da {A, j}.');
      add('⟨F⟩', 'Alguna vez en el futuro', '{⟨F⟩A, i} da {irj} y {A, j}, con j nuevo.');
      add('[P]', 'Siempre en el pasado', '{[P]A, i} junto a {jri} da {A, j}.');
      add('⟨P⟩', 'Alguna vez en el pasado', '{⟨P⟩A, i} da {jri} y {A, j}, con j nuevo.');
      add('¬[F]', 'Negaciones', '{¬[F]A} da {⟨F⟩¬A}; {¬⟨F⟩A} da {[F]¬A}; lo mismo con P.');
    }
    if (sys.cond) {
      add('>', 'Condicional', '{A>B, i} junto a {irₐj} (con el subíndice A) da {B, j}.');
      add('¬>', 'Condicional negado', sys.cond === 'C+' ? '{¬(A>B), i} da {irₐj}, {A, j} y {¬B, j}, con j nuevo.' : '{¬(A>B), i} da {irₐj} y {¬B, j}, con j nuevo.');
    }
    if (sys.fo) {
      add('∀', 'Universal', sys.fo === 'cl' ? '{∀xA} da {A(a)} para cada nombre a de la rama (si no hay ninguno, se inventa uno).' : sys.fo === 'free' ? '{∀xA} abre {¬Ea} | {A(a)}, para cada nombre a de la rama (uno nuevo si no hay ninguno).' : '{∀xA, i} abre {¬Ea, i} | {A(a), i}, para cada nombre a de la rama.');
      add('∃', 'Particular', sys.fo === 'cl' ? '{∃xA} da {A(c)} con un nombre c nuevo.' : '{∃xA} da {Ec} y {A(c)} (en el mismo mundo), con c nuevo.');
      add('¬∀', 'Universal negado', '{¬∀xA} da {∃x¬A}.');
      add('¬∃', 'Particular negado', '{¬∃xA} da {∀x¬A}.');
    }
  } else {
    const x = sys.W ? 'x' : '';
    if (sys.int) {
      add('∧', 'Conjunción', '{A∧B,+i} da {A,+i} y {B,+i}; {A∧B,−i} abre {A,−i} | {B,−i}.');
      add('∨', 'Disyunción', '{A∨B,+i} abre {A,+i} | {B,+i}; {A∨B,−i} da {A,−i} y {B,−i}.');
      add('⊐+', 'Condicional verdadero', '{A⊐B,+i} junto a {irj} abre {A,−j} | {B,+j}, para cada j.');
      add('⊐−', 'Condicional no verdadero', '{A⊐B,−i} da {irj}, {A,+j} y {B,−j}, con j nuevo.');
      add('¬+', 'Negación verdadera', '{¬A,+i} junto a {irj} da {A,−j}, para cada j.');
      add('¬−', 'Negación no verdadera', '{¬A,−i} da {irj} y {A,+j}, con j nuevo.');
      if (sys.fo === 'int') {
        add('∃+', 'Particular verdadero', '{∃xA,+i} da {Ec,+i} y {A(c),+i}, con c nuevo.');
        add('∃−', 'Particular no verdadero', '{∃xA,−i} abre {Ea,−i} | {A(a),−i}, para cada nombre a.');
        add('∀−', 'Universal no verdadero', '{∀xA,−i} da {irj}, {Ec,+j} y {A(c),−j}, con j y c nuevos.');
        add('∀+', 'Universal verdadero', '{∀xA,+i} junto a {irj} abre {Ea,−j} | {A(a),+j}, para cada nombre a.');
        add('ini', 'Lista inicial', 'Empieza con {Ea,+0} para cada nombre de las premisas y la conclusión (o {Ec,+0} si no hay ninguno).');
      }
    } else {
      add('∧+', 'Conjunción', `{A∧B,+${x}} da {A,+${x}} y {B,+${x}}.`);
      add('∧−', 'Conjunción no verdadera', `{A∧B,−${x}} abre {A,−${x}} | {B,−${x}}.`);
      add('∨+', 'Disyunción', `{A∨B,+${x}} abre {A,+${x}} | {B,+${x}}.`);
      add('∨−', 'Disyunción no verdadera', `{A∨B,−${x}} da {A,−${x}} y {B,−${x}}.`);
      if (sys.neg === 'fde') {
        add('¬¬', 'Doble negación', `{¬¬A,±${x}} da {A,±${x}} (con el mismo signo).`);
        add('¬∧', 'De Morgan', `{¬(A∧B),±${x}} da {¬A∨¬B,±${x}}.`);
        add('¬∨', 'De Morgan', `{¬(A∨B),±${x}} da {¬A∧¬B,±${x}}.`);
      } else {
        add('¬', 'Negación con estrella', '{¬A,+x} da {A,−x̄}; {¬A,−x} da {A,+x̄}. Si x es i, x̄ es i#, y al revés.');
      }
      if (sys.imp === 'def') add('⊃', 'Condicional material', `{A⊃B} se trata como {¬A∨B}.`);
      if (sys.fo === 'cl' || sys.fo === 'free') {
        const fr = sys.fo === 'free';
        add('∀+', 'Universal verdadero', fr ? '{∀xA,+} abre {Ea,−} | {A(a),+}, para cada nombre a.' : '{∀xA,+} da {A(a),+} para cada nombre a (uno nuevo si no hay).');
        add('∀−', 'Universal no verdadero', fr ? '{∀xA,−} da {Ec,+} y {A(c),−}, con c nuevo.' : '{∀xA,−} da {A(c),−}, con c nuevo.');
        add('∃+', 'Particular verdadero', fr ? '{∃xA,+} da {Ec,+} y {A(c),+}, con c nuevo.' : '{∃xA,+} da {A(c),+}, con c nuevo.');
        add('∃−', 'Particular no verdadero', fr ? '{∃xA,−} abre {Ea,−} | {A(a),−}, para cada nombre a.' : '{∃xA,−} da {A(a),−} para cada nombre a.');
        add('¬∀', 'Cuantificadores negados', '{¬∀xA,±} da {∃x¬A,±}; {¬∃xA,±} da {∀x¬A,±}.');
      }
      if (sys.md === 'K') {
        add('□+', 'Necesidad verdadera', '{□A,+i} junto a {irj} da {A,+j}, para cada j.');
        add('□−', 'Necesidad no verdadera', '{□A,−i} da {irj} y {A,−j}, con j nuevo.');
        add('◇+', 'Posibilidad verdadera', '{◇A,+i} da {irj} y {A,+j}, con j nuevo.');
        add('◇−', 'Posibilidad no verdadera', '{◇A,−i} junto a {irj} da {A,−j}, para cada j.');
        add('¬□', 'Conmutar', '{¬□A,±i} da {◇¬A,±i}; {¬◇A,±i} da {□¬A,±i}.');
        if (sys.pers) add('her.', 'Persistencia', 'De {p,+i} o {¬p,+i}, junto a {irj}, pasa a lo mismo en j.');
      }
      if (sys.imp === 'L3') add('⊃', 'Condicional de Ł3', '{A⊃B,+} abre tres ramas: {¬A,+} | {B,+} | {A∨¬A,−} y {B∨¬B,−}. {A⊃B,−} da {¬A,−} y {B,−}, y abre {A,+} | {¬B,+}.');
      if (sys.imp === 'RM3') add('⊃', 'Condicional de RM3', '{A⊃B,+} abre tres ramas: {A,−} | {¬B,−} | {A∧¬A,+} y {B∧¬B,+}. {A⊃B,−} da {A,+} y {¬B,+}, y abre {¬A,−} | {B,−}.');
      if (sys.arr === 'K4' || sys.arr === 'N4' || sys.arr === 'K*' || sys.arr === 'N*') {
        add('→+', 'Condicional verdadero', '{A→B,+i} abre {A,−j} | {B,+j} para cada mundo j de la rama.' + (sys.arr[0] === 'N' ? ' Solo en el mundo 0.' : ''));
        add('→−', 'Condicional no verdadero', '{A→B,−i} da {A,+j} y {B,−j}, con j nuevo.' + (sys.arr[0] === 'N' ? ' Solo en el mundo 0.' : ''));
        if (sys.neg === 'fde') {
          add('¬→+', 'Condicional falso', '{¬(A→B),+i} da {A,+j} y {¬B,+j}, con j nuevo.');
          add('¬→−', 'Condicional no falso', '{¬(A→B),−i} abre {A,−j} | {¬B,−j} para cada j.');
        }
      }
      if (sys.cn) {
        add('⊐+', 'Condicional verdadero', '{A⊐B,+i} junto a {irj} abre {A,−j} | {B,+j}.');
        add('⊐−', 'Condicional no verdadero', '{A⊐B,−i} da {irj}, {A,+j} y {B,−j}, con j nuevo.');
        if (sys.cn === 'W') add('¬⊐', 'Condicional falso (W)', '{¬(A⊐B),±i} da {A⊐¬B,±i}, con el mismo signo.');
        else add('¬⊐', 'Condicional falso', '{¬(A⊐B),+i} da {A,+i} y {¬B,+i}; {¬(A⊐B),−i} abre {A,−i} | {¬B,−i}.');
        add('her.', 'Herencia', 'De {p,+i} o {¬p,+i}, junto a {irj}, pasa a lo mismo en j.');
      }
    }
  }
  return out;
}
function CLOSURE(sys) {
  if (!sys.sg) return 'Una rama se cierra cuando tiene {A} y {¬A}' + (sys.W ? ' en el mismo mundo' : '') + '.' + (sys.id ? ' También con {¬a=a}, o con {a=b} y {¬b=a}.' : '');
  let s = 'Una rama se cierra cuando tiene {A,+} y {A,−}' + (sys.W ? ' en el mismo mundo' : '') + '.';
  if (sys.cl === 'k3' || sys.cl === 'both') s += ' Además (K3) con {A,+} y {¬A,+}.';
  if (sys.cl === 'lp' || sys.cl === 'both') s += ' Además (LP) con {A,−} y {¬A,−}.';
  return s;
}

root.CONTENT = {
  worlds: list,
  world(w) { list.push(w); },
  finish() { list.sort((a, b) => a.ord - b.ord); list.forEach((w, i) => { w.k = i; }); },
  T, Q, A, M, TT, V, table, tab, rule, r, kripke, RULEBOOK, CLOSURE
};
})(typeof window !== 'undefined' ? window : globalThis);
