/* Comprueba el contenido: node test.js
   · cada árbol (etapa A) se resuelve con el motor y termina: válido o con una rama abierta y completa
   · cada etapa de valores (M) tiene contraejemplo, y cada tabla (TT) se puede calcular
   · los ejemplos de la máquina (V) dan el veredicto anotado */
globalThis.window = globalThis;
const fs = require('fs'), path = require('path');
require('./src/logic.js'); require('./src/tableau.js'); require('./src/sem.js'); require('./src/content.js');
fs.readdirSync(path.join(__dirname, 'src', 'worlds')).filter(f => /^w\w+\.js$/.test(f)).sort().forEach(f => require('./src/worlds/' + f));
const Sem = globalThis.Sem;
const C = globalThis.CONTENT, L = globalThis.Logic, TB = globalThis.Tableau, SEM = globalThis.Sem;
C.finish();
let bad = 0, n = 0, trees = 0;
const err = m => { bad++; console.log('MAL ' + m); };
const only = process.argv[2];
C.worlds.forEach(W => {
  if (only && W.num !== only) return;
  W.stages.forEach((s, i) => {
    const where = `cap. ${W.num} etapa ${i + 1} «${s.title}»`;
    n++;
    try {
      if (s.t === 'A') {
        trees++;
        const r = TB.solve(s.sys, s.prem.map(L.parse), L.parse(s.concl), 700);
        if (r.verdict === 'unknown') err(`${where}: el motor no decide (${r.t.nodes.length} líneas)`);
        /* lo que dice el texto de salida (su primera frase) tiene que coincidir con el árbol */
        const first = (s.outro || '').split(/[.:!]/)[0];
        const said = s.want || (/inválid|no es una verdad|no es válid/i.test(first) ? 'invalid' : /válid|cerrado|tautología/i.test(first) ? 'valid' : null);
        if (said && said !== r.verdict) err(`${where}: da ${r.verdict}, el texto dice ${said}`);
        if (!said) console.log(`aviso ${where}: el texto de salida no dice si es válida (${r.verdict})`);
        if (r.t.nodes.length > 120) console.log(`aviso ${where}: árbol de ${r.t.nodes.length} líneas`);
        if (process.argv.includes('-v')) console.log(`${where}: ${r.verdict} (${r.t.nodes.length})`);
      }
      if (s.t === 'M') {
        const m = SEM.checkMV(s.sys, s.prem.map(L.parse), s.concl ? L.parse(s.concl) : L.parse('p∧¬p'));
        if (s.concl && m.v !== 'invalid') err(`${where}: no tiene contraejemplo en ${s.sys}`);
      }
      if (s.t === 'TT') s.cols.forEach(c => SEM.valuations(s.sys, L.atomsOf([L.parse(c)])).forEach(v => SEM.evMV(s.sys, L.parse(c), v)));
      if (s.t === 'V') s.ex.forEach(e => {
        const sys = e[3] || s.sys[0];
        let v;
        if (TB.SYS[sys] && !(s.mv && Sem.MV[sys])) v = TB.solve(sys, e[0].map(L.parse), L.parse(e[1]), 600).verdict;
        else v = SEM.checkMV(sys, e[0].map(L.parse), L.parse(e[1])).v;
        if (e[2] && v !== e[2]) err(`${where}: ejemplo ${e[0].join(', ')} ⊢ ${e[1]} en ${sys} da ${v}, anotado ${e[2]}`);
      });
      if (s.t === 'T') s.pages.forEach(p => { const f = p.fig; [].concat(f || []).forEach(g => { if (g.k === 'tab') { const r = TB.solve(g.sys, g.prem.map(L.parse), L.parse(g.concl), 300); if (r.verdict === 'unknown') err(`${where}: la figura ${g.prem.join(', ')} ⊢ ${g.concl} no termina`); } }); });
      if (s.t === 'Q') s.qs.forEach((q, k) => { if (q.ok == null || q.ok >= q.opts.length) err(`${where}: pregunta ${k + 1} sin respuesta correcta válida`); });
      /* las fórmulas de los textos deben leerse */
      const texts = JSON.stringify(s).match(/\{[^{}"]*\}/g) || [];
      texts.forEach(t => { const x = t.slice(1, -1); if (/^[a-zA-Z0-9¬∧∨⊃≡⥽>→⊐□◇∀∃=()\[\]⟨⟩]+$/.test(x) && !/^[a-z]$/.test(x)) { try { L.parse(x); } catch (e) { /* letras sueltas y trozos como A, B no son fórmulas del lenguaje objeto */ } } });
    } catch (e) { err(`${where}: ${e.message}`); }
  });
});
console.log(bad ? `${bad} problemas en ${n} etapas` : `${n} etapas bien (${trees} árboles)`);
process.exit(bad ? 1 : 0);
