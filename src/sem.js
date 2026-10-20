/* Lógica por Árboles — semánticas por tablas: clásica, K3, Ł3, LP, RM3, FDE (cuatro valores) y Łukasiewicz
   con cinco valores (capítulos 7, 8 y 11). Un valor es un número entre 0 y 1; en FDE, una de las cadenas
   '1', 'b', 'n', '0'. */
(function (root) {
'use strict';
const L = root.Logic;

const K3T = { not: a => 1 - a, and: Math.min, or: Math.max, imp: (a, b) => Math.max(1 - a, b) };
const r4 = x => Math.round(x * 10000) / 10000;
const LUK = Object.assign({}, K3T, { not: a => r4(1 - a), imp: (a, b) => Math.min(1, r4(1 - a + b)) });
const RM3T = Object.assign({}, K3T, { imp: (a, b) => (a <= b ? Math.max(1 - a, b) : 0) });
const MV = {
  CL: { name: 'Lógica clásica', vals: [1, 0], des: [1], ops: K3T },
  K3: { name: 'K3 (Kleene)', vals: [1, 0.5, 0], des: [1], ops: K3T },
  'Ł3': { name: 'Ł3 (Łukasiewicz)', vals: [1, 0.5, 0], des: [1], ops: LUK },
  LP: { name: 'LP (lógica de la paradoja)', vals: [1, 0.5, 0], des: [1, 0.5], ops: K3T },
  RM3: { name: 'RM3', vals: [1, 0.5, 0], des: [1, 0.5], ops: RM3T },
  'Ł5': { name: 'Łukasiewicz con cinco valores', vals: [1, 0.75, 0.5, 0.25, 0], des: [1], ops: LUK },
  /* la lógica difusa L del capítulo 11: valores en [0, 1]; es válida si el mínimo de las premisas nunca supera a la
     conclusión. El juego explora una cuadrícula de valores (de cuarto en cuarto a mano, de décimo en décimo en la máquina) */
  'Ł': { name: 'L (Łukasiewicz continua)', vals: [1, 0.75, 0.5, 0.25, 0], grid: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0], des: [1], ops: LUK, glb: true },
  FDE: { name: 'FDE (cuatro valores)', vals: ['1', 'b', 'n', '0'], des: ['1', 'b'], four: true }
};
/* FDE: cada valor es un par (verdadera, falsa) */
const TF = { '1': [1, 0], b: [1, 1], n: [0, 0], '0': [0, 1] };
const ofTF = (t, f) => (t ? (f ? 'b' : '1') : (f ? '0' : 'n'));
/* con dominio (capítulo 21): las atómicas se valoran como Pa, Rab…; ∀ y ∃ son el mínimo y el máximo sobre el dominio */
const key = f => L.str(f);
function ev4(f, v, dom) {
  switch (f.t) {
    case 'atom': return f.p === '=' ? (f.args[0] === f.args[1] ? '1' : '0') : v[key(f)];
    case 'all': case 'ex': {
      const xs = dom.map(d => TF[ev4(L.subst(f.a, f.v, d), v, dom)]);
      return f.t === 'all' ? ofTF(xs.every(x => x[0]), xs.some(x => x[1])) : ofTF(xs.some(x => x[0]), xs.every(x => x[1]));
    }
    case 'not': { const [t, fa] = TF[ev4(f.a, v, dom)]; return ofTF(fa, t); }
    case 'and': { const a = TF[ev4(f.a, v, dom)], b = TF[ev4(f.b, v, dom)]; return ofTF(a[0] && b[0], a[1] || b[1]); }
    case 'or': { const a = TF[ev4(f.a, v, dom)], b = TF[ev4(f.b, v, dom)]; return ofTF(a[0] || b[0], a[1] && b[1]); }
    case 'imp': return ev4(L.Bin('or', L.Not(f.a), f.b), v, dom);
    case 'iff': return ev4(L.Bin('and', L.Bin('imp', f.a, f.b), L.Bin('imp', f.b, f.a)), v, dom);
    default: L.fail('Esa conectiva no tiene tabla aquí.');
  }
}
function evMV(sys, f, v, dom) {
  const S = MV[sys];
  if (S.four) return ev4(f, v, dom);
  const o = S.ops, e = g => evMV(sys, g, v, dom);
  switch (f.t) {
    case 'atom': return f.p === '=' ? (f.args[0] === f.args[1] ? 1 : 0) : v[key(f)];
    case 'all': return Math.min(...dom.map(d => e(L.subst(f.a, f.v, d))));
    case 'ex': return Math.max(...dom.map(d => e(L.subst(f.a, f.v, d))));
    case 'not': return o.not(e(f.a));
    case 'and': return o.and(e(f.a), e(f.b));
    case 'or': return o.or(e(f.a), e(f.b));
    case 'imp': case 'arr': return o.imp(e(f.a), e(f.b));
    case 'iff': return Math.min(o.imp(e(f.a), e(f.b)), o.imp(e(f.b), e(f.a)));
    default: L.fail('Esa conectiva no tiene tabla aquí.');
  }
}
const designated = (sys, x) => MV[sys].des.includes(x);
/* atómicas cerradas sobre un dominio: Pa, Pb, Rab… (sin la identidad, que es clásica) */
function groundAtoms(fs, dom) {
  const preds = new Map(), props = new Set();
  fs.forEach(f => L.subformulas(f).forEach(g => { if (g.t === 'atom') { if (!g.args.length) props.add(g.p); else if (g.p !== '=') preds.set(g.p, g.args.length); } }));
  const out = [...props].sort();
  [...preds.keys()].sort().forEach(p => {
    const n = preds.get(p);
    const go = (args) => { if (args.length === n) { out.push(p + args.join('')); return; } dom.forEach(d => go([...args, d])); };
    go([]);
  });
  return out;
}
/* todas las valuaciones de unas letras */
function valuations(sys, atoms) {
  const vals = MV[sys].vals, out = [];
  const go = (i, v) => { if (i === atoms.length) { out.push(Object.assign({}, v)); return; } vals.forEach(x => { v[atoms[i]] = x; go(i + 1, v); }); };
  go(0, {});
  return out;
}
/* validez por tablas: devuelve el primer contraejemplo, si lo hay */
/* contraejemplo para L: la conclusión vale menos que alguna premisa (menos que 1 si no hay premisas) */
const glbFails = (sys, prem, concl, v, dom) => evMV(sys, concl, v, dom) < Math.min(1, ...prem.map(f => evMV(sys, f, v, dom))) - 1e-9;
function checkMV(sys, prem, concl, dom) {
  if (dom === true) {   // máquina de primer orden: prueba dominios de uno a tres objetos (incluidos los nombres usados)
    const cs = new Set(); [...prem, concl].forEach(f => L.constsOf(f, cs));
    let last = null;
    for (let n = Math.max(1, cs.size); n <= 3; n++) {
      const d = [...cs].sort(); for (const c of 'abcdefgh') { if (d.length >= n) break; if (!cs.has(c)) d.push(c); }
      const r = checkMV(sys, prem, concl, d);
      if (r.v === 'invalid' || r.v === 'unknown') return r;
      last = r;
    }
    return Object.assign({}, last, { how: 'dom' });
  }
  const atoms = dom ? groundAtoms([...prem, concl], dom) : L.atomsOf([...prem, concl]);
  const S = MV[sys];
  if (S.glb) {
    const grid = S.grid, n = Math.pow(grid.length, atoms.length);
    if (n > 15000) return { v: 'unknown', how: 'big' };
    const rows = [];
    const go = (i, v) => { if (i === atoms.length) { rows.push(Object.assign({}, v)); return; } grid.forEach(x => { v[atoms[i]] = x; go(i + 1, v); }); };
    go(0, {});
    for (const v of rows) if (glbFails(sys, prem, concl, v, dom)) return { v: 'invalid', model: { kind: 'val', atoms, vals: v, dom }, rows: rows.length };
    return { v: 'valid', how: 'grid', rows: rows.length };
  }
  if (Math.pow(S.vals.length, atoms.length) > 4000) return { v: 'unknown', how: 'big' };
  const rows = valuations(sys, atoms);
  for (const v of rows) {
    if (prem.every(f => designated(sys, evMV(sys, f, v, dom))) && !designated(sys, evMV(sys, concl, v, dom))) return { v: 'invalid', model: { kind: 'val', atoms, vals: v, dom }, rows: rows.length };
  }
  return { v: 'valid', how: 'table', rows: rows.length };
}
/* nombre visible de un valor */
function vname(sys, x) {
  if (MV[sys].four) return x === 'b' ? 'b' : x === 'n' ? 'n' : x;
  if (x === 1) return '1';
  if (x === 0) return '0';
  if (MV[sys].vals.length === 3) return 'i';
  return String(x).replace('.', ',');
}

root.Sem = { MV, evMV, ev4, designated, valuations, checkMV, vname, glbFails, groundAtoms };
})(typeof window !== 'undefined' ? window : globalThis);
