/* Lógica por Árboles — fórmulas con la notación de Priest (An Introduction to Non-Classical Logic)
   Parámetros proposicionales: p q r s t · predicados: mayúsculas · constantes: a–o · variables: x y z
   Conectivas: ¬ ∧ ∨ ⊃ ≡ (clásicas) · □ ◇ (modales) · ⥽ (estricto) · > (condicional) · → (condicional
   intensional de los capítulos 9–11) · ⊐ (condicional intuicionista) · [F] ⟨F⟩ [P] ⟨P⟩ (tiempo)
   · ∀ ∃ · = (identidad) · E (existencia, en las lógicas libres) */
(function (root) {
'use strict';

const VARS = 'xyzuvw';
const CONSTS = 'abcdefghijklmno';
const PROPS = 'pqrst';
const isVar = c => VARS.includes(c);
const isConst = c => CONSTS.includes(c);

class LErr extends Error {}
const fail = m => { throw new LErr(m); };

/* ---------- constructores ---------- */
const Atom = (p, args) => ({ t: 'atom', p, args: args || [] });
const Not = a => ({ t: 'not', a });
const Un = (t, a) => ({ t, a });
const Bin = (t, a, b) => ({ t, a, b });
const Qf = (t, v, a) => ({ t, v, a });
const Eq = (x, y) => Atom('=', [x, y]);
const Ex = x => Atom('E', [x]);

const BIN = { and: '∧', or: '∨', imp: '⊃', iff: '≡', str: '⥽', cnd: '>', arr: '→', ico: '⊐' };
const UN = { box: '□', dia: '◇', G: '[F]', F: '⟨F⟩', H: '[P]', P: '⟨P⟩' };
const BINOF = {}; Object.keys(BIN).forEach(k => { BINOF[BIN[k]] = k; });
const isBin = f => !!BIN[f.t];
const isUn = f => !!UN[f.t];

function str(f, top) {
  switch (f.t) {
    case 'atom':
      if (f.p === '=') return f.args[0] + '=' + f.args[1];
      return f.p + f.args.join('');
    case 'not': return '¬' + str(f.a, false);
    case 'all': return '∀' + f.v + str(f.a, false);
    case 'ex': return '∃' + f.v + str(f.a, false);
    default: {
      if (UN[f.t]) return UN[f.t] + str(f.a, false);
      const s = str(f.a, false) + BIN[f.t] + str(f.b, false);
      return top === false ? '(' + s + ')' : s;
    }
  }
}
const eq = (a, b) => str(a) === str(b);

/* ---------- lectura ---------- */
const TENSE = [['[F]', 'G'], ['⟨F⟩', 'F'], ['<F>', 'F'], ['[P]', 'H'], ['⟨P⟩', 'P'], ['<P>', 'P']];
function parse(src) {
  const s = String(src)
    .replace(/<->/g, '≡').replace(/->/g, '→').replace(/~/g, '¬').replace(/&/g, '∧').replace(/\|/g, '∨')
    .replace(/\s+/g, '');
  let i = 0;
  const eat = c => (s.startsWith(c, i) ? (i += c.length, true) : false);
  /* precedencia de menor a mayor: ≡ · condicionales (asocian a la derecha) · ∨ · ∧ · unarios */
  function iff() { let a = cond(); while (eat('≡')) a = Bin('iff', a, cond()); return a; }
  function cond() {
    const a = or();
    for (const c of ['⊃', '⥽', '>', '→', '⊐']) if (eat(c)) return Bin(BINOF[c], a, cond());
    return a;
  }
  function or() { let a = and(); while (eat('∨')) a = Bin('or', a, and()); return a; }
  function and() { let a = un(); while (eat('∧')) a = Bin('and', a, un()); return a; }
  function un() {
    const c = s[i];
    for (const [tok, t] of TENSE) if (s.startsWith(tok, i)) { i += tok.length; return Un(t, un()); }
    if (c === '¬') { i++; return Not(un()); }
    if (c === '□') { i++; return Un('box', un()); }
    if (c === '◇') { i++; return Un('dia', un()); }
    if (c === '∀' || c === '∃') {
      i++;
      const v = s[i];
      if (!v || !isVar(v)) fail('Después de ' + c + ' va una variable (x, y, z).');
      i++;
      return Qf(c === '∀' ? 'all' : 'ex', v, un());
    }
    if (c === '(') {
      i++;
      const a = iff();
      if (!eat(')')) fail('Falta cerrar un paréntesis.');
      return a;
    }
    if (c && c >= 'A' && c <= 'Z') {
      i++;
      const args = [];
      while (s[i] && (isConst(s[i]) || isVar(s[i]))) args.push(s[i++]);
      return Atom(c, args);
    }
    if (c && (isConst(c) || isVar(c)) && s[i + 1] === '=') {   // identidad: a=b
      const x = c; i += 2;
      const y = s[i];
      if (!y || !(isConst(y) || isVar(y))) fail('Después de = va un nombre o una variable.');
      i++;
      return Eq(x, y);
    }
    if (c && PROPS.includes(c)) { i++; return Atom(c); }
    if (c && (isConst(c) || isVar(c))) fail('«' + c + '» es un nombre o una variable: va después de un predicado (Pa) o en una identidad (a=b).');
    fail(c ? 'No esperaba «' + c + '» ahí.' : 'La fórmula está incompleta.');
  }
  if (!s) fail('Escribe una fórmula.');
  const f = iff();
  if (i < s.length) fail('No esperaba «' + s[i] + '» ahí.');
  return f;
}

/* ---------- recorridos ---------- */
function subformulas(f, out) {
  out = out || [];
  out.push(f);
  if (f.a) subformulas(f.a, out);
  if (f.b) subformulas(f.b, out);
  return out;
}
const size = f => subformulas(f).length;
function atomsOf(fs) {   // parámetros proposicionales, en orden alfabético
  const set = new Set();
  fs.forEach(f => subformulas(f).forEach(g => { if (g.t === 'atom' && !g.args.length) set.add(g.p); }));
  return [...set].sort();
}
function constsOf(f, out) {
  out = out || new Set();
  subformulas(f).forEach(g => { if (g.t === 'atom') g.args.forEach(a => { if (isConst(a)) out.add(a); }); });
  return out;
}
function freeVars(f, bound, out) {
  bound = bound || new Set(); out = out || new Set();
  if (f.t === 'atom') f.args.forEach(a => { if (isVar(a) && !bound.has(a)) out.add(a); });
  else if (f.t === 'all' || f.t === 'ex') { const b2 = new Set(bound); b2.add(f.v); freeVars(f.a, b2, out); }
  else { if (f.a) freeVars(f.a, bound, out); if (f.b) freeVars(f.b, bound, out); }
  return out;
}
const closed = f => freeVars(f).size === 0;
const isFO = f => subformulas(f).some(g => (g.t === 'atom' && g.args.length) || g.t === 'all' || g.t === 'ex');

function subst(f, v, t) {
  switch (f.t) {
    case 'atom': return Atom(f.p, f.args.map(a => (a === v ? t : a)));
    case 'not': return Not(subst(f.a, v, t));
    case 'all': case 'ex': return f.v === v ? f : Qf(f.t, f.v, subst(f.a, v, t));
    default: return UN[f.t] ? Un(f.t, subst(f.a, v, t)) : Bin(f.t, subst(f.a, v, t), subst(f.b, v, t));
  }
}
/* cambia un nombre por otro (sustitución de idénticos) */
const renameConst = (f, c, d) => {
  if (f.t === 'atom') return Atom(f.p, f.args.map(a => (a === c ? d : a)));
  if (f.t === 'not') return Not(renameConst(f.a, c, d));
  if (f.t === 'all' || f.t === 'ex') return Qf(f.t, f.v, renameConst(f.a, c, d));
  return UN[f.t] ? Un(f.t, renameConst(f.a, c, d)) : Bin(f.t, renameConst(f.a, c, d), renameConst(f.b, c, d));
};
function freshConst(used) { for (const c of CONSTS) if (!used.has(c)) return c; fail('Se acabaron los nombres.'); }

/* ---------- semántica clásica ---------- */
function evalCL(f, v) {
  switch (f.t) {
    case 'atom': return v[f.p] ? 1 : 0;
    case 'not': return 1 - evalCL(f.a, v);
    case 'and': return Math.min(evalCL(f.a, v), evalCL(f.b, v));
    case 'or': return Math.max(evalCL(f.a, v), evalCL(f.b, v));
    case 'imp': return Math.max(1 - evalCL(f.a, v), evalCL(f.b, v));
    case 'iff': return evalCL(f.a, v) === evalCL(f.b, v) ? 1 : 0;
    default: fail('Esa conectiva no es clásica.');
  }
}

root.Logic = { VARS, CONSTS, PROPS, isVar, isConst, LErr, fail, Atom, Not, Un, Bin, Qf, Eq, Ex, BIN, UN, isBin, isUn,
  str, eq, parse, subformulas, size, atomsOf, constsOf, freeVars, closed, isFO, subst, renameConst, freshConst, evalCL };
})(typeof window !== 'undefined' ? window : globalThis);
