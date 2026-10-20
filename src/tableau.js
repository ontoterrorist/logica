/* Lógica por Árboles — motor de árboles (tableaux) al estilo de Priest.
   Un solo motor para todas las lógicas del libro: cada sistema es un conjunto de banderas (SYS) y las reglas
   salen de expand() (reglas de una línea) y de STRUCT (reglas sobre la relación de accesibilidad, la herencia,
   la identidad…). La jugadora elige a qué línea aplicar cada regla; el motor la aplica a todas las ramas
   abiertas que pasan por esa línea, como en el libro. */
(function (root) {
'use strict';
const L = root.Logic;
const { str, Not, Un, Bin, Qf, Atom, Eq, Ex, subst } = L;

/* ================= sistemas ================= */
/* sg: nodos con signo (A,+ / A,−) · W: mundos · md: 'K' (relación r) | 'U' (todos ven a todos)
   nn: mundos no normales 'N' | 'L' · R: reglas de la relación (ρ σ τ η) · tense · cond: 'C' | 'C+'
   fo: 'cl' (dominio constante) | 'free' | 'var' (dominio variable) · id: identidad
   neg: 'fde' | 'star' · cl: cierre extra 'k3' | 'lp' · imp (⊃ con signo): 'def' | 'L3' | 'RM3'
   arr (→): 'K4' | 'N4' | 'K*' | 'N*' | 'I4' · int: intuicionista */
const SYS = {};
const def = (id, nm, o) => { SYS[id] = Object.assign({ id, nm, R: '' }, o); };
def('CL', 'Lógica clásica', {});
def('K', 'K', { W: 1, md: 'K' });
def('D', 'D = Kη', { W: 1, md: 'K', R: 'η' });
def('T', 'T = Kρ', { W: 1, md: 'K', R: 'ρ' });
def('Kσ', 'Kσ', { W: 1, md: 'K', R: 'σ' });
def('Kτ', 'Kτ', { W: 1, md: 'K', R: 'τ' });
def('B', 'B = Kρσ', { W: 1, md: 'K', R: 'ρσ' });
def('S4', 'S4 = Kρτ', { W: 1, md: 'K', R: 'ρτ' });
def('S5', 'S5 = Kρστ', { W: 1, md: 'K', R: 'ρστ' });
def('Kυ', 'S5 = Kυ', { W: 1, md: 'U' });
def('Kt', 'Kt', { W: 1, md: 'K', tense: 1 });
def('Kτt', 'Kτt', { W: 1, md: 'K', tense: 1, R: 'τ' });
def('N', 'N', { W: 1, md: 'K', nn: 'N' });
def('S2', 'S2 = Nρ', { W: 1, md: 'K', nn: 'N', R: 'ρ' });
def('S3', 'S3 = Nρτ', { W: 1, md: 'K', nn: 'N', R: 'ρτ' });
def('S3.5', 'S3.5 = Nρστ', { W: 1, md: 'K', nn: 'N', R: 'ρστ' });
def('S0.5', 'S0.5 = Lρ', { W: 1, md: 'K', nn: 'L', R: 'ρ' });
def('L', 'L = S0.5⁰', { W: 1, md: 'K', nn: 'L' });
def('C', 'C', { W: 1, md: 'U', cond: 'C' });
def('C+', 'C⁺', { W: 1, md: 'U', cond: 'C+' });
def('I', 'Intuicionista', { W: 1, sg: 1, int: 1, R: 'ρτ' });
def('FDE', 'FDE', { sg: 1, neg: 'fde', imp: 'def' });
def('K3', 'K3', { sg: 1, neg: 'fde', imp: 'def', cl: 'k3' });
def('LP', 'LP', { sg: 1, neg: 'fde', imp: 'def', cl: 'lp' });
def('FDE2', 'FDE + cierres de K3 y LP', { sg: 1, neg: 'fde', imp: 'def', cl: 'both' });
def('Ł3', 'Ł3', { sg: 1, neg: 'fde', imp: 'L3', cl: 'k3' });
def('RM3', 'RM3', { sg: 1, neg: 'fde', imp: 'RM3', cl: 'lp' });
def('FDE*', 'FDE con estrella', { W: 1, sg: 1, neg: 'star', imp: 'def' });
def('K4', 'K4', { W: 1, sg: 1, neg: 'fde', imp: 'def', arr: 'K4' });
def('N4', 'N4', { W: 1, sg: 1, neg: 'fde', imp: 'def', arr: 'N4' });
def('K*', 'K*', { W: 1, sg: 1, neg: 'star', imp: 'def', arr: 'K*' });
def('N*', 'N*', { W: 1, sg: 1, neg: 'star', imp: 'def', arr: 'N*' });
def('I4', 'I4', { W: 1, sg: 1, neg: 'fde', imp: 'def', cn: 1, R: 'ρτ' });
def('I3', 'I3', { W: 1, sg: 1, neg: 'fde', imp: 'def', cn: 1, cl: 'k3', R: 'ρτ' });
def('W', 'W (conexiva)', { W: 1, sg: 1, neg: 'fde', imp: 'def', cn: 'W', R: 'ρτ' });
def('KFDE', 'K_FDE (modal de cuatro valores)', { W: 1, sg: 1, neg: 'fde', imp: 'def', md: 'K' });
def('KK3', 'K_K3', { W: 1, sg: 1, neg: 'fde', imp: 'def', md: 'K', cl: 'k3' });
def('KLP', 'K_LP', { W: 1, sg: 1, neg: 'fde', imp: 'def', md: 'K', cl: 'lp' });
def('KFDEρ', 'K_FDE ρ', { W: 1, sg: 1, neg: 'fde', imp: 'def', md: 'K', R: 'ρ' });
def('KK3τ', 'K_K3 τ', { W: 1, sg: 1, neg: 'fde', imp: 'def', md: 'K', cl: 'k3', R: 'τ' });
def('KLPρ', 'K_LP ρ', { W: 1, sg: 1, neg: 'fde', imp: 'def', md: 'K', cl: 'lp', R: 'ρ' });
def('A', 'A (Aristóteles): K3ρτ con persistencia', { W: 1, sg: 1, neg: 'fde', imp: 'def', md: 'K', cl: 'k3', R: 'ρτ', pers: 1 });
def('B', 'B (relevante básica)', { W: 1, sg: 1, neg: 'star', imp: 'def', arr: 'B', tern: 1 });
def('DW', 'DW = B + C8', { W: 1, sg: 1, neg: 'star', imp: 'def', arr: 'B', tern: 1, R: 'C8' });
def('CB', 'CB', { W: 1, sg: 1, neg: 'star', imp: 'def', arr: 'B', tern: 1, cond: 'C' });
def('CB+', 'CB⁺', { W: 1, sg: 1, neg: 'star', imp: 'def', arr: 'B', tern: 1, cond: 'C+' });
def('FOL', 'Primer orden clásica', { fo: 'cl', id: 1 });
def('CK', 'CK (dominio constante)', { W: 1, md: 'K', fo: 'cl' });
def('CT', 'CT = CKρ', { W: 1, md: 'K', fo: 'cl', R: 'ρ' });
def('CS4', 'CS4 = CKρτ', { W: 1, md: 'K', fo: 'cl', R: 'ρτ' });
def('CS5', 'CS5 = CKυ', { W: 1, md: 'U', fo: 'cl' });
def('CKt', 'CKt (tiempo, dominio constante)', { W: 1, md: 'K', fo: 'cl', tense: 1 });
def('VK', 'VK (dominio variable)', { W: 1, md: 'K', fo: 'var' });
def('VT', 'VT = VKρ', { W: 1, md: 'K', fo: 'var', R: 'ρ' });
def('VKσ', 'VKσ', { W: 1, md: 'K', fo: 'var', R: 'σ' });
def('VS4', 'VS4 = VKρτ', { W: 1, md: 'K', fo: 'var', R: 'ρτ' });
def('VS5', 'VS5 = VKυ', { W: 1, md: 'U', fo: 'var' });
def('VKt', 'VKt (tiempo, dominio variable)', { W: 1, md: 'K', fo: 'var', tense: 1 });
def('VKτt', 'VKτt', { W: 1, md: 'K', fo: 'var', tense: 1, R: 'τ' });
def('VK+', 'VK con dominios crecientes', { W: 1, md: 'K', fo: 'var', di: 1 });
def('VK−', 'VK negativa', { W: 1, md: 'K', fo: 'var', nfree: 1 });
def('FREE', 'Lógica libre positiva', { fo: 'free', id: 1 });
def('NFREE', 'Lógica libre negativa', { fo: 'free', id: 1, nfree: 1 });

/* ================= nodos ================= */
const F = (f, w, s) => ({ k: 'f', f, w: w == null ? null : String(w), s: s || '' });
const Rl = (a, b, A) => ({ k: 'r', a: String(a), b: String(b), A: A || null });
const R3 = (a, b, c) => ({ k: 'r3', a: String(a), b: String(b), c: String(c) });
function keyOf(n) {
  if (n.k === 'r') return 'r|' + n.a + '|' + n.b + '|' + (n.A ? str(n.A) : '');
  if (n.k === 'r3') return 't|' + n.a + '|' + n.b + '|' + n.c;
  return 'f|' + n.s + '|' + (n.w == null ? '' : n.w) + '|' + str(n.f);
}
const star = x => (x.endsWith('#') ? x.slice(0, -1) : x + '#');
const base = x => (x.endsWith('#') ? x.slice(0, -1) : x);

/* ================= contexto de una rama ================= */
function ctxOf(path, sys) {
  const keys = new Set(), worlds = [], ws = new Set(), consts = new Set(), rel = [], rel3 = [];
  const addW = w => { if (w != null && !ws.has(w)) { ws.add(w); worlds.push(w); } };
  path.forEach(n => {
    keys.add(n.key);
    if (n.k === 'r') { addW(n.a); addW(n.b); rel.push(n); }
    else if (n.k === 'r3') { addW(n.a); addW(n.b); addW(n.c); rel3.push(n); }
    else { addW(n.w); L.constsOf(n.f, consts); }
  });
  if (sys.W && !ws.has('0')) addW('0');
  return {
    path, keys, worlds, consts, rel, rel3,
    has: spec => keys.has(keyOf(spec)),
    next() { let m = -1; worlds.forEach(w => { const k = parseInt(w, 10); if (k > m) m = k; }); return String(m + 1); },
    fresh() { return L.freshConst(consts); },
    boxed: w => path.some(n => n.k === 'f' && n.w === w && !n.s && n.f.t === 'box')
  };
}

/* ================= reglas de una línea ================= */
/* cada instancia: { r: nombre, alts: [[nodos]] } o, si crea un mundo o un nombre nuevo,
   { r, fresh: true, make: B => alts, sat: B => ¿ya hay testigo? } */
const one = (r, ...ns) => ({ r, alts: [ns] });
const two = (r, a, b) => ({ r, alts: [a, b] });
function expand(sys, n, B) {
  if (n.k !== 'f') return [];
  return sys.sg ? expandS(sys, n, B) : expandU(sys, n, B);
}
const inst = (A, v, c) => subst(A, v, c);

function quantU(sys, n, B, f, w, neg) {
  const out = [];
  if (f.t === 'all') {   // ∀xA: un ejemplar por cada nombre de la rama (o uno nuevo si no hay)
    if (sys.fo === 'free' || sys.fo === 'var') {   // libre (13.3.1) y dominio variable (15.4.1): o bien ¬Ea, o bien A(a)
      if (B.consts.size) [...B.consts].sort().forEach(c => out.push(two('∀', [F(Not(Ex(c)), w)], [F(inst(f.a, f.v, c), w)])));
      else out.push({ r: '∀', fresh: true, make: X => { const c = X.fresh(); return [[F(Not(Ex(c)), w)], [F(inst(f.a, f.v, c), w)]]; }, sat: X => X.consts.size > 0 });
    } else if (B.consts.size) [...B.consts].sort().forEach(c => out.push(one('∀', F(inst(f.a, f.v, c), w))));
    else out.push({ r: '∀', fresh: true, make: X => [[F(inst(f.a, f.v, X.fresh()), w)]], sat: X => X.consts.size > 0 });
  }
  if (f.t === 'ex') {
    const ex = sys.fo === 'free' || sys.fo === 'var';
    out.push({ r: '∃', fresh: true, make: X => { const c = X.fresh(); return [ex ? [F(Ex(c), w), F(inst(f.a, f.v, c), w)] : [F(inst(f.a, f.v, c), w)]]; },
      sat: X => [...X.consts].some(c => X.has(F(inst(f.a, f.v, c), w)) && (!ex || X.has(F(Ex(c), w)))) });
  }
  return out;
}

function expandU(sys, n, B) {
  const f = n.f, w = n.w;
  const at0 = w == null || w === '0';
  const modOK = sys.nn !== 'L' || at0;     // en L las reglas modales solo valen en el mundo 0
  const rel = (a, A) => B.rel.filter(r => r.a === a && (A ? r.A && L.eq(r.A, A) : !r.A));
  const relTo = b => B.rel.filter(r => r.b === b && !r.A);
  if (f.t === 'not') {
    const g = f.a;
    switch (g.t) {
      case 'not': return [one('¬¬', F(g.a, w))];
      case 'and': return [two('¬∧', [F(Not(g.a), w)], [F(Not(g.b), w)])];
      case 'or': return [one('¬∨', F(Not(g.a), w), F(Not(g.b), w))];
      case 'imp': return [one('¬⊃', F(g.a, w), F(Not(g.b), w))];
      case 'iff': return [two('¬≡', [F(g.a, w), F(Not(g.b), w)], [F(Not(g.a), w), F(g.b, w)])];
      case 'str': return [one('¬⥽', F(Not(Un('box', Bin('imp', g.a, g.b))), w))];
      case 'box': return modOK ? [one('¬□', F(Un('dia', Not(g.a)), w))] : [];
      case 'dia': return modOK ? [one('¬◇', F(Un('box', Not(g.a)), w))] : [];
      case 'G': return [one('¬[F]', F(Un('F', Not(g.a)), w))];
      case 'F': return [one('¬⟨F⟩', F(Un('G', Not(g.a)), w))];
      case 'H': return [one('¬[P]', F(Un('P', Not(g.a)), w))];
      case 'P': return [one('¬⟨P⟩', F(Un('H', Not(g.a)), w))];
      case 'all': return [one('¬∀', F(Qf('ex', g.v, Not(g.a)), w))];
      case 'ex': return [one('¬∃', F(Qf('all', g.v, Not(g.a)), w))];
      case 'cnd': {
        const plus = sys.cond === 'C+';
        return [{ r: '¬>', fresh: true,
          make: X => { const j = X.next(); return [[Rl(w, j, g.a), ...(plus ? [F(g.a, j)] : []), F(Not(g.b), j)]]; },
          sat: X => rel(w, g.a).some(r => X.has(F(Not(g.b), r.b))) }];
      }
      default: return [];
    }
  }
  switch (f.t) {
    case 'and': return [one('∧', F(f.a, w), F(f.b, w))];
    case 'or': return [two('∨', [F(f.a, w)], [F(f.b, w)])];
    case 'imp': return [two('⊃', [F(Not(f.a), w)], [F(f.b, w)])];
    case 'iff': return [two('≡', [F(f.a, w), F(f.b, w)], [F(Not(f.a), w), F(Not(f.b), w)])];
    case 'str': return [one('⥽', F(Un('box', Bin('imp', f.a, f.b)), w))];
    case 'box':
      if (!modOK) return [];
      if (sys.md === 'U') return B.worlds.map(j => one('□', F(f.a, j)));
      return rel(w).map(r => one('□', F(f.a, r.b)));
    case 'dia': {
      if (!modOK) return [];
      if (sys.nn === 'N' && !at0 && !B.boxed(w)) return [];   // mundo no normal mientras nada lo obligue a ser normal
      if (sys.md === 'U') return [{ r: '◇', fresh: true, make: X => [[F(f.a, X.next())]], sat: X => X.worlds.some(j => X.has(F(f.a, j))) }];
      return [{ r: '◇', fresh: true, make: X => { const j = X.next(); return [[Rl(w, j), F(f.a, j)]]; }, sat: X => rel(w).some(r => X.has(F(f.a, r.b))) }];
    }
    case 'G': return rel(w).map(r => one('[F]', F(f.a, r.b)));
    case 'H': return relTo(w).map(r => one('[P]', F(f.a, r.a)));
    case 'F': return [{ r: '⟨F⟩', fresh: true, make: X => { const j = X.next(); return [[Rl(w, j), F(f.a, j)]]; }, sat: X => rel(w).some(r => X.has(F(f.a, r.b))) }];
    case 'P': return [{ r: '⟨P⟩', fresh: true, make: X => { const j = X.next(); return [[Rl(j, w), F(f.a, j)]]; }, sat: X => relTo(w).some(r => X.has(F(f.a, r.a))) }];
    case 'cnd': return rel(w, f.a).map(r => one('>', F(f.b, r.b)));
    case 'all': case 'ex': return sys.fo ? quantU(sys, n, B, f, w) : [];
    default: return [];
  }
}

/* nodos con signo: FDE y compañía (capítulos 6–11) */
function expandS(sys, n, B) {
  const f = n.f, x = n.w, s = n.s, P = '+', M = '-';
  const S = (g, sg, w) => F(g, w === undefined ? x : w, sg);
  const pos = s === P;
  const worldsAll = () => {   // en las lógicas con estrella, cada j viene con su j#
    if (sys.neg !== 'star') return B.worlds;
    const out = new Set();
    B.worlds.forEach(w => { out.add(base(w)); out.add(base(w) + '#'); });
    return [...out];
  };
  const normalHere = !(sys.arr === 'N4' || sys.arr === 'N*') || x === '0';
  if (f.t === 'not') {
    const g = f.a;
    if (sys.int) {   // negación intuicionista: ¬A,+i obliga en todo mundo accesible; ¬A,−i abre uno
      if (pos) return B.rel.filter(r => r.a === x && !r.A).map(r => one('¬+', S(g, M, r.b)));
      return [{ r: '¬−', fresh: true, make: X => { const j = X.next(); return [[Rl(x, j), S(g, P, j)]]; }, sat: X => B.rel.some(r => r.a === x && X.has(S(g, P, r.b))) }];
    }
    if (sys.neg === 'star') return [one(pos ? '¬+' : '¬−', S(g, pos ? M : P, x == null ? null : star(x)))];
    switch (g.t) {
      case 'not': return [one('¬¬', S(g.a, s))];
      case 'and': return [one('¬∧', S(Bin('or', Not(g.a), Not(g.b)), s))];
      case 'or': return [one('¬∨', S(Bin('and', Not(g.a), Not(g.b)), s))];
      case 'imp':
        if (sys.imp === 'def') return [one('¬⊃', S(Not(Bin('or', Not(g.a), g.b)), s))];
        return pos ? [one('¬⊃+', S(g.a, P), S(Not(g.b), P))] : [two('¬⊃−', [S(g.a, M)], [S(Not(g.b), M)])];
      case 'iff': return [one('¬≡', S(Not(Bin('and', Bin('imp', g.a, g.b), Bin('imp', g.b, g.a))), s))];
      case 'box': return [one('¬□', S(Un('dia', Not(g.a)), s))];
      case 'dia': return [one('¬◇', S(Un('box', Not(g.a)), s))];
      case 'ico':
        if (sys.cn === 'W') return [one(pos ? '¬⊐+' : '¬⊐−', S(Bin('ico', g.a, Not(g.b)), s))];
        return pos ? [one('¬⊐+', S(g.a, P), S(Not(g.b), P))] : [two('¬⊐−', [S(g.a, M)], [S(Not(g.b), M)])];
      case 'arr':
        if (!normalHere) return [];
        if (pos) return [{ r: '¬→+', fresh: true, make: X => { const j = X.next(); return [[S(g.a, P, j), S(Not(g.b), P, j)]]; }, sat: X => X.worlds.some(j => X.has(S(g.a, P, j)) && X.has(S(Not(g.b), P, j))) }];
        return B.worlds.map(j => two('¬→−', [S(g.a, M, j)], [S(Not(g.b), M, j)]));
      default: return [];
    }
  }
  switch (f.t) {
    case 'and': return pos ? [one('∧+', S(f.a, P), S(f.b, P))] : [two('∧−', [S(f.a, M)], [S(f.b, M)])];
    case 'or': return pos ? [two('∨+', [S(f.a, P)], [S(f.b, P)])] : [one('∨−', S(f.a, M), S(f.b, M))];
    case 'iff': return [one('≡', S(Bin('and', Bin('imp', f.a, f.b), Bin('imp', f.b, f.a)), s))];
    case 'imp':
      if (sys.imp === 'def') return [one('⊃', S(Bin('or', Not(f.a), f.b), s))];
      if (sys.imp === 'L3') return pos
        ? [{ r: '⊃+', alts: [[S(Not(f.a), P)], [S(f.b, P)], [S(Bin('or', f.a, Not(f.a)), M), S(Bin('or', f.b, Not(f.b)), M)]] }]
        : [two('⊃−', [S(Not(f.a), M), S(f.b, M), S(f.a, P)], [S(Not(f.a), M), S(f.b, M), S(Not(f.b), P)])];
      return pos   // RM3
        ? [{ r: '⊃+', alts: [[S(f.a, M)], [S(Not(f.b), M)], [S(Bin('and', f.a, Not(f.a)), P), S(Bin('and', f.b, Not(f.b)), P)]] }]
        : [two('⊃−', [S(f.a, P), S(Not(f.b), P), S(Not(f.a), M)], [S(f.a, P), S(Not(f.b), P), S(f.b, M)])];
    case 'ico':   // condicional intuicionista
      if (pos) return B.rel.filter(r => r.a === x && !r.A).map(r => two('⊐+', [S(f.a, M, r.b)], [S(f.b, P, r.b)]));
      return [{ r: '⊐−', fresh: true, make: X => { const j = X.next(); return [[Rl(x, j), S(f.a, P, j), S(f.b, M, j)]]; },
        sat: X => B.rel.some(r => r.a === x && X.has(S(f.a, P, r.b)) && X.has(S(f.b, M, r.b))) }];
    case 'arr':
      if (sys.tern) {   // relevantes: relación ternaria; en 0 vale r0xx para todo x (regla de normalidad, implícita)
        if (pos) {
          if (x === '0') return worldsAll().map(j => two('→+', [S(f.a, M, j)], [S(f.b, P, j)]));
          return B.rel3.filter(t => t.a === x).map(t => two('→+', [S(f.a, M, t.b)], [S(f.b, P, t.c)]));
        }
        if (x === '0') return [{ r: '→−', fresh: true, make: X => { const j = X.next(); return [[S(f.a, P, j), S(f.b, M, j)]]; },
          sat: X => worldsAll().some(j => X.has(S(f.a, P, j)) && X.has(S(f.b, M, j))) }];
        return [{ r: '→−', fresh: true, make: X => { const j = X.next(), k = String(+j + 1); return [[R3(x, j, k), S(f.a, P, j), S(f.b, M, k)]]; },
          sat: X => X.rel3.some(t => t.a === x && X.has(S(f.a, P, t.b)) && X.has(S(f.b, M, t.c))) }];
      }
      if (!normalHere) return [];
      if (pos) return worldsAll().map(j => two('→+', [S(f.a, M, j)], [S(f.b, P, j)]));
      return [{ r: '→−', fresh: true, make: X => { const j = X.next(); return [[S(f.a, P, j), S(f.b, M, j)]]; },
        sat: X => X.worlds.some(j => X.has(S(f.a, P, j)) && X.has(S(f.b, M, j))) }];
    case 'box': case 'dia': {   // modales de muchos valores (11a): + y − como □/◇ y sus duales
      const rel = B.rel.filter(t => t.a === x && !t.A);
      const every = (f.t === 'box') === pos;   // □A,+ y ◇A,− miran a todos los mundos accesibles
      const sg = pos ? P : M, name = (f.t === 'box' ? '□' : '◇') + (pos ? '+' : '−');
      if (every) return rel.map(t => one(name, S(f.a, sg, t.b)));
      return [{ r: name, fresh: true, make: X => { const j = X.next(); return [[Rl(x, j), S(f.a, sg, j)]]; }, sat: X => rel.some(t => X.has(S(f.a, sg, t.b))) }];
    }
    case 'cnd': {   // > sobre una lógica relevante (CB, CB⁺)
      const rel = B.rel.filter(t => t.a === x && t.A && L.eq(t.A, f.a));
      if (pos) return rel.map(t => one('>+', S(f.b, P, t.b)));
      const plus = sys.cond === 'C+' && x === '0';
      return [{ r: '>−', fresh: true, make: X => { const j = X.next(); return [[Rl(x, j, f.a), ...(plus ? [S(f.a, P, j)] : []), S(f.b, M, j)]]; },
        sat: X => rel.some(t => X.has(S(f.b, M, t.b))) }];
    }
    default: return [];
  }
}

const instKey = I => I.alts.map(a => a.map(keyOf).join('&')).join('||');

/* ================= reglas estructurales ================= */
const STRUCT = {
  'ρ': { name: 'Reflexividad', desc: 'Para cada mundo i de la rama, añade iri.',
    inst: (sys, B) => B.worlds.filter(w => !w.endsWith('#')).map(i => one('ρ', Rl(i, i))) },
  'σ': { name: 'Simetría', desc: 'De irj pasa a jri.',
    inst: (sys, B) => B.rel.filter(r => !r.A).map(r => one('σ', Rl(r.b, r.a))) },
  'τ': { name: 'Transitividad', desc: 'De irj y jrk pasa a irk.',
    inst: (sys, B) => { const out = []; B.rel.forEach(r => { if (!r.A) B.rel.forEach(q => { if (!q.A && q.a === r.b) out.push(one('τ', Rl(r.a, q.b))); }); }); return out; } },
  'η': { name: 'Extensibilidad', desc: 'Si el mundo i no ve a ninguno, crea un mundo nuevo j con irj.', fresh: 1,
    inst: (sys, B) => B.worlds.map(i => ({ r: 'η', fresh: true, make: X => [[Rl(i, X.next())]], sat: X => X.rel.some(r => r.a === i && !r.A) })) },
  'her': { name: 'Herencia', desc: 'Lo que vale en un mundo sigue valiendo en los que ve: de p,+i e irj pasa a p,+j (solo letras).',
    inst: (sys, B) => {
      const out = [];
      B.path.forEach(n => {
        if (n.k !== 'f' || n.s !== '+') return;
        const lit = n.f.t === 'atom' || ((sys.cn || sys.pers) && n.f.t === 'not' && n.f.a.t === 'atom');
        if (lit) B.rel.forEach(r => { if (r.a === n.w && r.b !== n.w) out.push(one('her', F(n.f, r.b, '+'))); });
      });
      return out;
    } },
  'C8': { name: 'Condición C8', desc: 'De rxyz pasa a rxz̄ȳ (x̄ es la pareja estrella de x).',
    inst: (sys, B) => B.rel3.map(t => one('C8', R3(t.a, star(t.c), star(t.b)))) },
  'CB+': { name: 'Centrado en 0', desc: 'Para cada antecedente A de un condicional {>}: o bien A,−0, o bien A,+0 y 0 r_A 0.',
    inst: (sys, B) => {
      const ants = new Map();
      B.path.forEach(n => { if (n.k === 'f') { const g = n.f.t === 'not' ? n.f.a : n.f; if (g.t === 'cnd') ants.set(str(g.a), g.a); } });
      const out = [];
      ants.forEach(A => out.push(two('CB+', [F(A, '0', '-')], [F(A, '0', '+'), Rl('0', '0', A)])));
      return out;
    } },
  'NCR': { name: 'Restricción de negatividad', desc: 'De una atómica Pa₁…aₙ (también a=b) pasa a Ea₁, …, Eaₙ: lo que no existe no tiene propiedades positivas.',
    inst: (sys, B) => {
      const out = [];
      B.path.forEach(n => { if (n.k === 'f' && !n.s && n.f.t === 'atom' && n.f.args.length && n.f.p !== 'E') n.f.args.forEach(a => { if (L.isConst(a)) out.push(one('NCR', F(Ex(a), n.w))); }); });
      return out;
    } },
  'SIE': { name: 'Autoidentidad de lo existente', desc: 'De Ea pasa a a=a.',
    inst: (sys, B) => B.path.filter(n => n.k === 'f' && !n.s && n.f.t === 'atom' && n.f.p === 'E').map(n => one('SIE', F(Eq(n.f.args[0], n.f.args[0]), n.w))) },
  'DI': { name: 'Dominios crecientes', desc: 'De irj y Ea,i pasa a Ea,j: lo que existe en un mundo existe en los que ve.',
    inst: (sys, B) => {
      const out = [];
      B.path.forEach(n => { if (n.k === 'f' && !n.s && n.f.t === 'atom' && n.f.p === 'E') B.rel.forEach(r => { if (!r.A && r.a === n.w && r.b !== n.w) out.push(one('DI', F(n.f, r.b))); }); });
      return out;
    } },
  'C+': { name: 'Centrado', desc: 'Para cada mundo i y cada antecedente A de un condicional: o bien ¬A,i, o bien A,i e i r_A i.',
    inst: (sys, B) => {
      const ants = new Map();
      B.path.forEach(n => { if (n.k === 'f') { const g = n.f.t === 'not' ? n.f.a : n.f; if (g.t === 'cnd') ants.set(str(g.a), g.a); } });
      const out = [];
      B.worlds.forEach(i => ants.forEach(A => out.push(two('C+', [F(Not(A), i)], [F(A, i), Rl(i, i, A)]))));
      return out;
    } },
  'SI': { name: 'Sustitución de idénticos', desc: 'Con a=b, cambia a por b (o b por a) en una fórmula atómica.',
    inst: (sys, B) => {
      const out = [];
      const ids = B.path.filter(n => n.k === 'f' && !n.s && n.f.t === 'atom' && n.f.p === '=' && n.f.args[0] !== n.f.args[1]);
      const ats = B.path.filter(n => n.k === 'f' && !n.s && n.f.t === 'atom' && n.f.args.length);
      ids.forEach(e => {
        const [a, b] = e.f.args;
        ats.forEach(m => {
          if (m === e || m.w !== e.w) return;
          [[a, b], [b, a]].forEach(([x, y]) => {
            const pos = m.f.args.map((t, i) => (t === x ? i : -1)).filter(i => i >= 0);
            for (let mask = 1; mask < (1 << pos.length); mask++) {
              const args = m.f.args.slice();
              pos.forEach((p, k) => { if (mask & (1 << k)) args[p] = y; });
              out.push(one('SI', F(Atom(m.f.p, args), m.w)));
            }
          });
        });
      });
      return out;
    } }
};
function structOf(sys) {
  const ids = [...sys.R.replace('C8', '')];
  if (sys.R.includes('C8')) ids.push('C8');
  if (sys.int || sys.cn || sys.pers) ids.push('her');
  if (sys.cond === 'C+') ids.push(sys.sg ? 'CB+' : 'C+');
  if (sys.id && sys.fo) ids.push('SI');
  if (sys.nfree) ids.push('NCR');
  if (sys.nfree && sys.id) ids.push('SIE');
  if (sys.di) ids.push('DI');
  return ids;
}

/* ================= cierre ================= */
function clash(sys, a, b) {
  if (a.k !== 'f' || b.k !== 'f' || a.w !== b.w) return false;
  if (!sys.sg) {
    if ((a.f.t === 'not' && L.eq(a.f.a, b.f)) || (b.f.t === 'not' && L.eq(b.f.a, a.f))) return true;
    /* a=b y ¬b=a también cierran (12.5.5) */
    const flip = (u, v) => u.f.t === 'atom' && u.f.p === '=' && v.f.t === 'not' && v.f.a.t === 'atom' && v.f.a.p === '=' && u.f.args[0] === v.f.a.args[1] && u.f.args[1] === v.f.a.args[0];
    return flip(a, b) || flip(b, a);
  }
  if (a.s !== b.s && L.eq(a.f, b.f)) return true;
  const negOf = (u, v) => u.f.t === 'not' && L.eq(u.f.a, v.f);
  if ((sys.cl === 'k3' || sys.cl === 'both') && a.s === '+' && b.s === '+' && (negOf(a, b) || negOf(b, a))) return true;
  if ((sys.cl === 'lp' || sys.cl === 'both') && a.s === '-' && b.s === '-' && (negOf(a, b) || negOf(b, a))) return true;
  return false;
}
const selfClash = (sys, a) => a.k === 'f' && !sys.sg && !sys.nfree && a.f.t === 'not' && a.f.a.t === 'atom' && a.f.a.p === '=' && a.f.a.args[0] === a.f.a.args[1];

/* ================= el árbol ================= */
class Tab {
  constructor(sysId, prem, concl) {
    this.sys = SYS[sysId];
    if (!this.sys) throw new Error('sistema desconocido: ' + sysId);
    this.prem = prem; this.concl = concl;
    this.nodes = []; this.root = null;
    const w = this.sys.W ? '0' : null;
    const init = this.sys.sg ? [...prem.map(f => F(f, w, '+')), F(concl, w, '-')] : [...prem.map(f => F(f, w)), F(Not(concl), w)];
    let at = null;
    init.forEach(spec => { at = this.add(spec, at, null, 'ini'); });
  }
  add(spec, parent, src, rule) {
    const n = Object.assign({}, spec, { id: this.nodes.length + 1, key: keyOf(spec), parent: parent ? parent.id : null, kids: [], src, rule, close: null, decl: false });
    this.nodes.push(n);
    if (parent) parent.kids.push(n.id); else this.root = n;
    return n;
  }
  node(id) { return this.nodes[id - 1]; }
  path(n) { const out = []; for (let m = n; m; m = m.parent ? this.node(m.parent) : null) out.unshift(m); return out; }
  leaves(from) {
    const out = [], go = n => { if (!n.kids.length) out.push(n); else n.kids.forEach(k => go(this.node(k))); };
    go(from || this.root);
    return out;
  }
  openLeaves(from) { return this.leaves(from).filter(l => !l.close); }
  ctx(leaf) { return ctxOf(this.path(leaf), this.sys); }
  status() {
    const ls = this.leaves();
    if (ls.every(l => l.close)) return 'closed';
    if (ls.some(l => l.decl)) return 'open';
    return 'busy';
  }
  /* ¿la instancia ya está cumplida en la rama? */
  sat(I, B, srcId) {
    if (I.fresh) return I.sat(B) || (srcId != null && B.path.some(m => m.src === srcId && m.rule === I.r));
    return I.alts.some(alt => alt.every(sp => B.has(sp)));
  }
  /* alarga la hoja con las alternativas (sin repetir líneas que ya están) */
  extend(leaf, alts, srcId, rule) {
    const B = this.ctx(leaf);
    const made = [];
    if (alts.length === 1) {
      let at = leaf;
      alts[0].forEach(sp => { if (!B.has(sp)) { at = this.add(sp, at, srcId, rule); made.push(at); } });
      return made.length ? [at] : [];
    }
    return alts.map(alt => {
      let at = leaf;
      const todo = alt.filter(sp => !B.has(sp));
      (todo.length ? todo : alt.slice(0, 1)).forEach(sp => { at = this.add(sp, at, srcId, rule); made.push(at); });
      return at;
    });
  }
  /* instancias de la regla de una línea en cada hoja abierta que pasa por ella */
  pending(n) {
    const out = [];
    this.openLeaves(n).forEach(leaf => {
      if (leaf.decl) return;
      const B = this.ctx(leaf);
      expand(this.sys, n, B).forEach(I => { if (!this.sat(I, B, n.id)) out.push({ leaf, I }); });
    });
    return out;
  }
  /* aplica la regla de la línea n en todas las ramas abiertas que pasan por ella */
  /* aplica la regla de la línea n en todas las ramas abiertas que pasan por ella. Si la regla ramifica y hay
     varios mundos (o nombres) a los que aplicarla, se aplica a uno solo, el elegido (pick): así el árbol no se
     multiplica de golpe y se puede ir cerrando rama a rama, como en el libro */
  choices(n) {
    const seen = new Map();
    this.pending(n).forEach(({ I }) => { if (!I.fresh && I.alts.length > 1) { const k = instKey(I); if (!seen.has(k)) seen.set(k, I); } });
    return [...seen.entries()].map(([key, I]) => ({ key, I }));
  }
  apply(id, pick) {
    const n = this.node(id);
    if (!n) return { error: 'Esa línea no existe.' };
    if (n.k !== 'f') return { error: 'Las líneas de la forma irj no tienen regla propia: las usan □, las reglas de la relación y otras.' };
    const todo = this.pending(n);
    if (!todo.length) return { error: this.whyNot(n) };
    const ch = this.choices(n);
    if (pick == null && ch.length > 1) return { need: 'choice', options: ch };
    if (pick == null && ch.length === 1) pick = ch[0].key;
    let added = 0, rule = todo[0].I.r;
    const leaves = [...new Set(todo.map(t => t.leaf))];
    leaves.forEach(leaf => {
      let tips = [leaf];
      const B0 = this.ctx(leaf);
      expand(this.sys, n, B0).forEach(I => {
        if (pick != null && !I.fresh && I.alts.length > 1 && instKey(I) !== pick) return;
        const next = [];
        tips.forEach(tip => {
          const B = this.ctx(tip);
          if (tip.close || this.sat(I, B, n.id)) { next.push(tip); return; }
          const alts = I.fresh ? I.make(B) : I.alts;
          const before = this.nodes.length;
          const t2 = this.extend(tip, alts, n.id, I.r);
          added += this.nodes.length - before;
          next.push(...(t2.length ? t2 : [tip]));
        });
        tips = next;
      });
    });
    return added ? { ok: true, rule, added } : { error: this.whyNot(n) };
  }
  whyNot(n) {
    const f = n.f, g = f.t === 'not' ? f.a : f;
    const lit = f.t === 'atom' || (f.t === 'not' && f.a.t === 'atom');
    if (!this.openLeaves(n).length) return 'Todas las ramas que pasan por esa línea ya están cerradas.';
    if (lit && !(this.sys.sg && this.sys.neg === 'star' && f.t === 'not') && !(this.sys.int && f.t === 'not')) return 'Es una línea atómica (o la negación de una): no hay regla que aplicarle. Sirve para cerrar ramas.';
    if (this.sys.sg) {
      if ((f.t === 'arr' || g.t === 'arr') && (this.sys.arr === 'N4' || this.sys.arr === 'N*') && n.w !== '0') return 'En esta lógica el mundo ' + n.w + ' no es normal: ahí → no tiene regla y su valor queda libre.';
      if ((f.t === 'ico' || (this.sys.int && f.t === 'not')) && n.s === '+') return 'Esta regla se aplica a cada mundo j con ' + n.w + 'rj. Por ahora no hay ninguno nuevo: añade la relación primero.';
    }
    if (g.t === 'box' && this.sys.nn === 'L' && n.w !== '0') return 'En L (S0.5) las reglas modales solo se aplican en el mundo 0.';
    if (f.t === 'dia' && this.sys.nn === 'N') return 'El mundo ' + n.w + ' puede ser no normal: ahí ◇A es verdad sin más. La regla de ◇ solo se activa si el mundo tiene algo de la forma □B.';
    if (f.t === 'box' || f.t === 'G' || f.t === 'H' || f.t === 'cnd') return 'Ya está aplicada a todos los mundos accesibles de la rama. Si aparece uno nuevo, vuelve a esta línea.';
    if (f.t === 'all') return 'Ya está aplicada a todos los nombres de la rama. Si aparece uno nuevo, vuelve a esta línea.';
    return 'Esa regla ya está aplicada en todas las ramas que pasan por aquí.';
  }
  /* reglas estructurales: se aplican todas las instancias pendientes de una vez */
  structPending(rid) {
    const R = STRUCT[rid], out = [];
    this.openLeaves().forEach(leaf => {
      if (leaf.decl) return;
      const B = this.ctx(leaf);
      R.inst(this.sys, B).forEach(I => { if (!this.sat(I, B, null)) out.push({ leaf, I }); });
    });
    return out;
  }
  applyStruct(rid) {
    const R = STRUCT[rid];
    const todo = this.structPending(rid);
    if (!todo.length) return { error: 'La regla ' + rid + ' no añade nada nuevo ahora.' };
    let added = 0;
    const leaves = [...new Set(todo.map(t => t.leaf))];
    leaves.forEach(leaf => {
      let rounds = 0, tips = [leaf];
      /* σ, τ, herencia y SI se repiten hasta que no añaden nada; η y C+ dan una sola vuelta */
      do {
        let grew = false;
        const next = [];
        tips.forEach(tip => {
          if (tip.close) { next.push(tip); return; }
          let cur = [tip];
          const insts = R.inst(this.sys, this.ctx(tip));
          insts.forEach(I => {
            const nx = [];
            cur.forEach(t => {
              const B = this.ctx(t);
              if (this.sat(I, B, null)) { nx.push(t); return; }
              const before = this.nodes.length;
              const t2 = this.extend(t, I.fresh ? I.make(B) : I.alts, null, I.r);
              if (this.nodes.length > before) { grew = true; added += this.nodes.length - before; }
              nx.push(...(t2.length ? t2 : [t]));
            });
            cur = nx;
          });
          next.push(...cur);
        });
        tips = next;
        if (!grew || R.fresh || rid === 'C+') break;
      } while (++rounds < 12);
    });
    return added ? { ok: true, rule: rid, added } : { error: 'La regla ' + rid + ' no añade nada nuevo ahora.' };
  }
  /* cierre de ramas: dos líneas contradictorias de la misma rama (o una, como ¬a=a) */
  tryClose(id1, id2) {
    const a = this.node(id1), b = id2 ? this.node(id2) : null;
    if (!b) {
      if (!selfClash(this.sys, a)) return { error: 'Para cerrar una rama elige dos líneas que se contradigan.' };
    } else if (!clash(this.sys, a, b)) return { error: this.sys.sg ? 'Esas dos líneas no chocan: hace falta la misma fórmula con + y con − en el mismo mundo.' : 'Esas dos líneas no se contradicen: hace falta A y ¬A en el mismo mundo.' };
    const pa = this.path(a), deep = b && this.path(b).length > pa.length ? b : a, other = deep === a ? b : a;
    if (other && !this.path(deep).includes(other)) return { error: 'Esas líneas están en ramas distintas.' };
    const ls = this.openLeaves(deep).filter(l => !l.decl);
    if (!ls.length) return { error: 'Las ramas que pasan por ahí ya están cerradas.' };
    ls.forEach(l => { l.close = { by: b ? [a.id, b.id].sort((x, y) => x - y) : [a.id] }; });
    return { ok: true, n: ls.length };
  }
  /* primera contradicción a la vista en una rama */
  findClash(leaf) {
    const p = this.path(leaf);
    for (let i = 0; i < p.length; i++) {
      if (selfClash(this.sys, p[i])) return [p[i].id];
      for (let j = 0; j < i; j++) if (clash(this.sys, p[i], p[j])) return [p[j].id, p[i].id];
    }
    return null;
  }
  /* ¿la rama está completa? (toda regla aplicable ya dejó su huella) */
  incomplete(leaf) {
    const B = this.ctx(leaf);
    for (const n of B.path) for (const I of expand(this.sys, n, B)) if (!this.sat(I, B, n.id)) return { node: n, I };
    for (const rid of structOf(this.sys)) for (const I of STRUCT[rid].inst(this.sys, B)) if (!this.sat(I, B, null)) return { struct: rid, I };
    return null;
  }
  declare(leafId) {
    const leaf = this.node(leafId);
    if (!leaf || leaf.kids.length) return { error: 'Elige el final de una rama.' };
    if (leaf.close) return { error: 'Esa rama ya está cerrada.' };
    if (this.findClash(leaf)) return { error: 'Esa rama tiene una contradicción: ciérrala.' };
    const inc = this.incomplete(leaf);
    if (inc) {
      const M = readModel(this, leaf);
      if (!(M && checkModel(this.sys, M, this.prem, this.concl))) {
        const what = inc.node ? 'la línea ' + inc.node.id : 'la regla ' + inc.struct;
        return { error: 'Todavía no está completa: falta aplicar ' + what + ' en esta rama.', inc };
      }
    }
    leaf.decl = true;
    return { ok: true };
  }
  clone() {
    const t = Object.create(Tab.prototype);
    Object.assign(t, this);
    t.nodes = this.nodes.map(n => Object.assign({}, n, { kids: n.kids.slice(), close: n.close ? { by: n.close.by.slice() } : null }));
    t.root = t.nodes[0];
    return t;
  }
}

/* ================= estrategia automática (pistas, solución y la máquina) ================= */
function nextMove(t) {
  for (const leaf of t.openLeaves()) {
    if (leaf.decl) continue;
    const c = t.findClash(leaf);
    if (c) return { kind: 'close', ids: c, leaf: leaf.id };
  }
  const cands = [];
  t.openLeaves().forEach(leaf => {
    if (leaf.decl) return;
    const B = t.ctx(leaf);
    /* una alternativa «cierra ya» si alguna de sus líneas choca con algo de la rama */
    const closes = alt => alt.some(sp => sp.k === 'f' && B.path.some(m => clash(t.sys, Object.assign({}, sp), m)));
    B.path.forEach(n => expand(t.sys, n, B).forEach(I => {
      if (t.sat(I, B, n.id)) return;
      const reuse = ['□', '∀', '[F]', '[P]', '>', '>+', '→+', '¬→−', '⊐+', '¬+'].includes(I.r);
      const br = !I.fresh && I.alts.length > 1;
      let pr = I.fresh ? 3 : br ? (reuse ? 5 : 4) : (reuse ? 2 : 0);
      if (br) { const c = I.alts.filter(closes).length; if (c === I.alts.length) pr = -1; else if (c) pr -= 2.5; }
      cands.push({ pr, kind: 'rule', id: n.id, depth: B.path.indexOf(n), pick: br ? instKey(I) : null });
    }));
    structOf(t.sys).forEach(rid => STRUCT[rid].inst(t.sys, B).forEach(I => {
      if (t.sat(I, B, null)) return;
      const pr = STRUCT[rid].fresh ? 6 : rid === 'C+' ? 5 : 1;
      cands.push({ pr, kind: 'struct', rid, depth: 0 });
    }));
  });
  if (!cands.length) return null;
  cands.sort((a, b) => a.pr - b.pr || a.depth - b.depth);
  return cands[0];
}
function doMove(t, m) {
  if (m.kind === 'close') return t.tryClose(m.ids[0], m.ids[1]);
  if (m.kind === 'rule') return t.apply(m.id, m.pick);
  return t.applyStruct(m.rid);
}
/* construye el árbol entero; budget = máximo de líneas */
function solve(sysId, prem, concl, budget) {
  const t = new Tab(sysId, prem, concl);
  const moves = [];
  budget = budget || 400;
  for (let k = 0; k < 2000 && t.nodes.length < budget; k++) {
    const m = nextMove(t);
    if (!m) break;
    let r;
    try { r = doMove(t, m); } catch (e) { if (e instanceof L.LErr) break; throw e; }
    if (r.error) break;
    moves.push(m);
    if (t.status() === 'closed') break;
  }
  let verdict = t.status() === 'closed' ? 'valid' : 'unknown', open = null;
  if (verdict !== 'valid') {
    for (const leaf of t.openLeaves()) {
      if (t.findClash(leaf)) continue;
      if (!t.incomplete(leaf)) { open = leaf; break; }
      const M = readModel(t, leaf);
      if (M && checkModel(t.sys, M, prem, concl)) { open = leaf; break; }
    }
    if (open) { verdict = 'invalid'; }
  }
  return { t, verdict, open, moves };
}

/* ================= contramodelos ================= */
/* lee la interpretación que induce una rama abierta, como en el libro */
function readModel(t, leaf) {
  const sys = t.sys, B = t.ctx(leaf), path = B.path;
  const lits = path.filter(n => n.k === 'f');
  const M = { sys: sys.id, W: sys.W ? B.worlds.slice() : [null], R: [], RA: [], pos: {}, neg: {}, fixed: {}, normal: [] };
  if (sys.neg === 'star') {
    const all = new Set();
    M.W.forEach(w => { all.add(base(w)); all.add(base(w) + '#'); });
    M.W = [...all].sort((a, b) => parseInt(a, 10) - parseInt(b, 10) || (a.endsWith('#') ? 1 : -1));
  }
  M.W.forEach(w => { M.pos[w] = new Set(); M.neg[w] = new Set(); M.fixed[w] = {}; });
  /* identidad: cada nombre se representa por el primero de su clase */
  const repOf = {};
  const consts = [...B.consts].sort();
  consts.forEach(c => { repOf[c] = c; });
  const find = c => (repOf[c] === c ? c : (repOf[c] = find(repOf[c])));
  lits.forEach(n => { if (!n.s && n.f.t === 'atom' && n.f.p === '=') { const a = find(n.f.args[0]), b = find(n.f.args[1]); if (a !== b) repOf[a > b ? a : b] = a < b ? a : b; } });
  M.rep = c => find(c);
  M.dom = [...new Set(consts.map(find))];
  if (sys.fo && !M.dom.length) M.dom = ['a'];
  const g = f => (f.t === 'atom' && f.args.length ? Atom(f.p, f.args.map(a => (L.isConst(a) ? find(a) : a))) : f);
  lits.forEach(n => {
    const w = n.w, f = n.f;
    if (!sys.sg) {
      if (f.t === 'atom') M.pos[w].add(str(g(f)));
      if (f.t === 'not' && f.a.t === 'atom') M.neg[w].add(str(g(f.a)));
      if (sys.nn === 'L' && w !== '0') {   // en L los valores de □A y ◇A en mundos no normales vienen de la rama
        if (f.t === 'box' || f.t === 'dia') M.fixed[w][str(f)] = 1;
        if (f.t === 'not' && (f.a.t === 'box' || f.a.t === 'dia')) M.fixed[w][str(f.a)] = 0;
      }
    } else {
      const atomic = f.t === 'atom', negAt = f.t === 'not' && f.a.t === 'atom';
      if (n.s === '+' && atomic) M.pos[w].add(str(f));
      if (n.s === '+' && negAt) M.neg[w].add(str(f.a));
      if (n.s === '-' && atomic) (M.notpos = M.notpos || new Set()).add(w + '|' + str(f));
      if (n.s === '-' && negAt) (M.notneg = M.notneg || new Set()).add(w + '|' + str(f.a));
      if ((sys.arr === 'N4' || sys.arr === 'N*') && w !== '0') {
        const isA = f.t === 'arr', isNA = f.t === 'not' && f.a.t === 'arr';
        if (isA) M.fixed[w][(n.s === '+' ? '1' : '!1') + str(f)] = 1;
        if (isNA) M.fixed[w][(n.s === '+' ? '0' : '!0') + str(f.a)] = 1;
      }
    }
  });
  if (sys.cl === 'lp') {   // en LP lo que no se niega explícitamente vale (8.4.11)
    const atoms = L.atomsOf([...t.prem, t.concl]);
    M.W.forEach(w => atoms.forEach(p => {
      if (!(M.notpos && M.notpos.has(w + '|' + p))) M.pos[w].add(p); else M.pos[w].delete(p);
      if (!(M.notneg && M.notneg.has(w + '|' + p))) M.neg[w].add(p); else M.neg[w].delete(p);
    }));
  }
  path.forEach(n => { if (n.k === 'r') (n.A ? M.RA : M.R).push(n.A ? [n.a, n.b, str(n.A)] : [n.a, n.b]); });
  M.R3 = path.filter(n => n.k === 'r3').map(n => [n.a, n.b, n.c]);
  if (sys.md === 'U' && !sys.cond) M.W.forEach(a => M.W.forEach(b => M.R.push([a, b])));
  if (sys.cond) M.W.forEach(a => M.W.forEach(b => M.R.push([a, b])));
  if (sys.int || sys.cn || sys.pers) {   // la relación de un modelo intuicionista es reflexiva y transitiva, y hay herencia
    const has = (a, b) => M.R.some(r => r[0] === a && r[1] === b);
    M.W.forEach(w => { if (!has(w, w)) M.R.push([w, w]); });
    for (let ch = true; ch;) { ch = false; M.R.slice().forEach(([a, b]) => M.R.slice().forEach(([c, d]) => { if (b === c && !has(a, d)) { M.R.push([a, d]); ch = true; } })); }
    M.R.forEach(([a, b]) => { M.pos[a].forEach(p => M.pos[b].add(p)); if (sys.cn || sys.pers) M.neg[a].forEach(p => M.neg[b].add(p)); });
  }
  M.normal = M.W.filter(w => {
    if (sys.nn === 'L') return w === '0';
    if (sys.nn === 'N') return w === '0' || B.boxed(w);
    if (sys.arr === 'N4' || sys.arr === 'N*' || sys.tern) return w === '0';
    return true;
  });
  M.E = {};
  M.W.forEach(w => { M.E[w] = new Set(); });
  lits.forEach(n => { if (!n.s && n.f.t === 'atom' && n.f.p === 'E') M.E[n.w].add(find(n.f.args[0])); });
  return M;
}

/* ================= semántica, para comprobar contramodelos ================= */
const relOK = (M, a, b) => M.R.some(r => r[0] === a && r[1] === b);
/* lógicas sin signo: clásica, modales, tiempo, condicionales y primer orden */
function evU(sys, M, f, w) {
  const normal = M.normal.includes(w);
  switch (f.t) {
    case 'atom':
      if (f.p === '=') return M.rep(f.args[0]) === M.rep(f.args[1]) && (!sys.nfree || M.E[w].has(M.rep(f.args[0])));
      return M.pos[w].has(str(f.args.length ? Atom(f.p, f.args.map(M.rep)) : f));
    case 'not': return !evU(sys, M, f.a, w);
    case 'and': return evU(sys, M, f.a, w) && evU(sys, M, f.b, w);
    case 'or': return evU(sys, M, f.a, w) || evU(sys, M, f.b, w);
    case 'imp': return !evU(sys, M, f.a, w) || evU(sys, M, f.b, w);
    case 'iff': return evU(sys, M, f.a, w) === evU(sys, M, f.b, w);
    case 'str': return evU(sys, M, Un('box', Bin('imp', f.a, f.b)), w);
    case 'box': case 'dia': {
      if (sys.nn === 'L' && w !== '0') { const v = M.fixed[w][str(f)]; return v == null ? false : !!v; }
      if (!normal) return f.t === 'dia';
      const acc = M.W.filter(v => relOK(M, w, v));
      return f.t === 'box' ? acc.every(v => evU(sys, M, f.a, v)) : acc.some(v => evU(sys, M, f.a, v));
    }
    case 'G': return M.W.filter(v => relOK(M, w, v)).every(v => evU(sys, M, f.a, v));
    case 'F': return M.W.filter(v => relOK(M, w, v)).some(v => evU(sys, M, f.a, v));
    case 'H': return M.W.filter(v => relOK(M, v, w)).every(v => evU(sys, M, f.a, v));
    case 'P': return M.W.filter(v => relOK(M, v, w)).some(v => evU(sys, M, f.a, v));
    case 'cnd': {
      const A = str(f.a), mentioned = M.RA.some(r => r[2] === A);
      /* f_A(w): lo que dice la rama; si A no es antecedente de nada en ella, en C⁺ se toma [A] (5.5.6) */
      const sel = mentioned ? M.W.filter(v => M.RA.some(r => r[0] === w && r[1] === v && r[2] === A))
        : sys.cond === 'C+' ? M.W.filter(v => evU(sys, M, f.a, v)) : [];
      return sel.every(v => evU(sys, M, f.b, v));
    }
    case 'all': case 'ex': {
      const D = sys.fo === 'free' || sys.fo === 'var' ? [...M.E[w]] : M.dom;
      const vals = D.map(d => evU(sys, M, subst(f.a, f.v, d), w));
      return f.t === 'all' ? vals.every(Boolean) : vals.some(Boolean);
    }
    default: throw new Error('sin semántica: ' + f.t);
  }
}
/* lógicas con signo: verdad (t) y falsedad (fa) por separado */
function evS(sys, M, f, w) {
  if (sys.neg === 'star' || sys.int) return evStar(sys, M, f, w);
  const normal = M.normal.includes(w);
  const T = g => evS(sys, M, g, w);
  switch (f.t) {
    case 'atom': return { t: M.pos[w].has(str(f)), fa: M.neg[w].has(str(f)) };
    case 'not': { const v = T(f.a); return { t: v.fa, fa: v.t }; }
    case 'and': { const a = T(f.a), b = T(f.b); return { t: a.t && b.t, fa: a.fa || b.fa }; }
    case 'or': { const a = T(f.a), b = T(f.b); return { t: a.t || b.t, fa: a.fa && b.fa }; }
    case 'imp': {
      const a = T(f.a), b = T(f.b);
      if (sys.imp === 'L3') return { t: a.fa || b.t || (!a.t && !a.fa && !b.t && !b.fa), fa: a.t && b.fa };
      if (sys.imp === 'RM3') return { t: !a.t || !b.fa || (a.t && a.fa && b.t && b.fa), fa: a.t && b.fa };
      return { t: a.fa || b.t, fa: a.t && b.fa };
    }
    case 'iff': return T(Bin('and', Bin('imp', f.a, f.b), Bin('imp', f.b, f.a)));
    case 'box': case 'dia': {
      const acc = M.W.filter(v => relOK(M, w, v)).map(v => evS(sys, M, f.a, v));
      return f.t === 'box' ? { t: acc.every(v => v.t), fa: acc.some(v => v.fa) } : { t: acc.some(v => v.t), fa: acc.every(v => v.fa) };
    }
    case 'ico': {   // negación construible (I4, I3) y la conexiva W
      const acc = M.W.filter(v => relOK(M, w, v));
      const a = T(f.a), b = T(f.b);
      const t = acc.every(v => !evS(sys, M, f.a, v).t || evS(sys, M, f.b, v).t);
      const fa = sys.cn === 'W' ? acc.every(v => !evS(sys, M, f.a, v).t || evS(sys, M, f.b, v).fa) : a.t && b.fa;
      return { t, fa };
    }
    case 'arr': {
      if (!normal) { const k = str(f); return { t: !!M.fixed[w]['1' + k], fa: !!M.fixed[w]['0' + k] }; }
      return { t: M.W.every(v => !evS(sys, M, f.a, v).t || evS(sys, M, f.b, v).t), fa: M.W.some(v => evS(sys, M, f.a, v).t && evS(sys, M, f.b, v).fa) };
    }
    default: throw new Error('sin semántica: ' + f.t);
  }
}
/* estrella de Routley (bivalente en cada mundo) e intuicionista */
function evStar(sys, M, f, w) {
  const val = g => evStar(sys, M, g, w).t;
  const tv = b => ({ t: b, fa: !b });
  const normal = M.normal.includes(w);
  switch (f.t) {
    case 'atom': return tv(M.pos[w].has(str(f)));
    case 'not':
      if (sys.int) return tv(M.W.filter(v => relOK(M, w, v)).every(v => !evStar(sys, M, f.a, v).t));
      return tv(!evStar(sys, M, f.a, star(w)).t);
    case 'and': return tv(val(f.a) && val(f.b));
    case 'or': return tv(val(f.a) || val(f.b));
    case 'imp': return tv(!val(f.a) || val(f.b));   // ⊃ definido como ¬A ∨ B solo fuera de la intuicionista
    case 'ico': return tv(M.W.filter(v => relOK(M, w, v)).every(v => !evStar(sys, M, f.a, v).t || evStar(sys, M, f.b, v).t));
    case 'arr':
      if (sys.tern && w !== '0') return tv(M.R3.filter(t => t[0] === w).every(t => !evStar(sys, M, f.a, t[1]).t || evStar(sys, M, f.b, t[2]).t));
      if (!normal) return tv(!!M.fixed[w]['1' + str(f)]);
      return tv(M.W.every(v => !evStar(sys, M, f.a, v).t || evStar(sys, M, f.b, v).t));
    case 'cnd': {
      const A = str(f.a), mentioned = M.RA.some(t => t[2] === A);
      const sel = mentioned ? M.W.filter(v => M.RA.some(t => t[0] === w && t[1] === v && t[2] === A))
        : sys.cond === 'C+' && w === '0' ? M.W.filter(v => evStar(sys, M, f.a, v).t) : [];
      return tv(sel.every(v => evStar(sys, M, f.b, v).t));
    }
    default: throw new Error('sin semántica: ' + f.t);
  }
}
/* el modelo refuta el argumento: premisas verdaderas y conclusión no verdadera en el mundo de partida */
function checkModel(sys, M, prem, concl) {
  try {
    const w0 = sys.W ? '0' : null;
    if (sys.sg) {
      if (sys.neg === 'star' && prem.concat(concl).some(f => L.subformulas(f).some(g => g.t === 'imp'))) {
        prem = prem.map(defImp); concl = defImp(concl);
      }
      return prem.every(f => evS(sys, M, f, w0).t) && !evS(sys, M, concl, w0).t;
    }
    return prem.every(f => evU(sys, M, f, w0)) && !evU(sys, M, concl, w0);
  } catch (e) { return false; }
}
function defImp(f) {
  if (f.t === 'imp') return Bin('or', Not(defImp(f.a)), defImp(f.b));
  if (f.t === 'atom') return f;
  if (f.t === 'not') return Not(defImp(f.a));
  if (f.t === 'all' || f.t === 'ex') return Qf(f.t, f.v, defImp(f.a));
  return f.b ? Bin(f.t, defImp(f.a), defImp(f.b)) : Un(f.t, defImp(f.a));
}

/* valor de una fórmula en el mundo de partida de un contramodelo: 1/0, o '1' 'b' 'n' '0' con signo */
function valueAt(sys, M, f, w) {
  w = w === undefined ? (sys.W ? '0' : null) : w;
  if (!sys.sg) return evU(sys, M, f, w) ? 1 : 0;
  const v = evS(sys, M, sys.neg === 'star' ? defImp(f) : f, w);
  if (sys.neg === 'star' || sys.int) return v.t ? 1 : 0;
  return v.t ? (v.fa ? 'b' : '1') : (v.fa ? '0' : 'n');
}

/* nombre visible de una línea: «A, 0», «A, +», «A, −1#», «0r1», «0 r_A 1» */
function label(n) {
  if (n.k === 'r') return { rel: true, a: n.a, b: n.b, A: n.A ? str(n.A) : null };
  return { f: str(n.f), s: n.s === '-' ? '−' : n.s, w: n.w };
}

root.Tableau = { SYS, STRUCT, Tab, expand, structOf, clash, nextMove, doMove, solve, readModel, checkModel, valueAt, label, keyOf, star };
})(typeof window !== 'undefined' ? window : globalThis);
