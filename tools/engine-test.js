/* Pruebas del motor de árboles con ejemplos del libro de Priest: node tools/engine-test.js */
require('../src/logic.js');
require('../src/tableau.js');
const L = globalThis.Logic, T = globalThis.Tableau;
const P = s => L.parse(s);
let bad = 0, n = 0;
function check(sys, prem, concl, want, note) {
  n++;
  let r;
  try { r = T.solve(sys, prem.map(P), P(concl), 600); } catch (e) { console.log('ERROR', sys, prem, concl, e.stack); bad++; return; }
  const ok = r.verdict === want;
  if (!ok) bad++;
  if (!ok || process.argv.includes('-v')) console.log((ok ? 'ok  ' : 'MAL ') + sys.padEnd(6) + ' ' + prem.join(', ') + ' ⊢ ' + concl + '  → ' + r.verdict + ' (esperado ' + want + ', ' + r.t.nodes.length + ' líneas)' + (note ? '  ' + note : ''));
}
const V = 'valid', I = 'invalid';
/* capítulo 1 */
check('CL', ['p⊃q', 'q⊃r'], 'p⊃r', V);
check('CL', [], '((p⊃q)∧(p⊃r))⊃(p⊃(q∧r))', V);
check('CL', ['(p⊃q)∨(r⊃q)'], '(p∨r)⊃q', I);
check('CL', ['p⊃(q∧r)', '¬r'], '¬p', V);
check('CL', [], '((p⊃q)⊃q)⊃q', I);
check('CL', ['p≡(q≡r)'], '(p≡q)≡r', V);
check('CL', ['p∧(¬r∨s)', '¬(q⊃s)'], 'r', I);
/* capítulo 2 */
check('K', ['□(p⊃q)∧□(q⊃r)'], '□(p⊃r)', V);
check('K', [], '◇(p∧q)⊃(◇p∧◇q)', V);
check('K', [], '(◇p∧◇¬q)⊃◇□◇p', I);
check('K', [], '□p⊃p', I);
check('K', ['□p', '◇q'], '◇(p∧q)', V);
check('K', [], '□p⊃◇p', I);
check('K', [], '◇(p∨¬p)', I);
/* capítulo 3 */
check('T', [], '□p⊃p', V);
check('Kσ', [], 'p⊃□◇p', V);
check('Kτ', [], '□p⊃□□p', V);
check('D', [], '□p⊃◇p', V);
check('B', [], '□p⊃□□p', I);
check('S5', [], '◇p⊃□◇p', V);
check('Kυ', [], '◇p⊃□◇p', V);
check('S4', [], '◇□p⊃□◇p', I);
check('Kt', ['p'], '[P]⟨F⟩p', V);
check('Kt', [], 'p⊃([F]p∨[P]p)', I);
check('Kt', ['p'], '[F]⟨P⟩p', V);
/* capítulo 4 */
check('N', [], '□(p⊃q)⊃(□p⊃□q)', V);
check('N', [], '□(p⊃□(q⊃q))', I);
check('K', [], '□(p⊃□(q⊃q))', V);
check('S2', ['p', 'p⥽q'], 'q', V);
check('N', ['p', 'p⥽q'], 'q', I);
check('S2', ['□q'], 'p⥽q', V);
check('S3', [], '(p⥽q)⥽(□p⥽□q)', V);
check('S2', [], '(p⥽q)⥽(□p⥽□q)', I);
check('L', [], '□(□p∨¬□p)', V);
check('L', [], '□(□(p⊃p)∨◇(q∧¬q))', I);
/* capítulo 5 */
check('C', ['p>q'], 'p>(q∨r)', V);
check('C', ['p>r'], '(p∧q)>r', I);
check('C', ['p>q', 'q>r'], 'p>r', I);
check('C', ['p>q'], '¬q>¬p', I);
check('C', ['p', 'p>q'], 'q', I);
check('C+', ['p', 'p>q'], 'q', V);
check('C+', ['p>r'], 'p>(r∧q)', I);
check('C+', [], 'p>p', V);
/* capítulo 6 */
check('I', [], 'p⊐¬¬p', V);
check('I', ['p⊐q'], '¬p∨q', I);
check('I', [], 'p∨¬p', I);
check('I', [], '¬¬p⊐p', I);
check('I', [], '(p∧¬p)⊐q', V);
check('I', ['p∨q', '¬p'], 'q', V);
/* capítulo 8 */
check('FDE', ['¬(q∧¬r)∧p'], '(¬q∨r)∨s', V);
check('FDE', ['p∧(q∨¬q)'], 'r', I);
check('FDE', ['p∧¬p'], 'q', I);
check('K3', ['p∧¬p'], 'q', V);
check('LP', ['p'], 'q∨¬q', V);
check('FDE', ['p'], 'q∨¬q', I);
check('LP', ['p∧¬p'], 'q', I);
check('K3', ['p'], 'q∨¬q', I);
check('FDE', ['p', '¬p∨q'], 'q', I);
check('FDE*', ['¬(q∧¬r)∧p'], '(¬q∨r)∨s', V);
check('FDE*', ['p∧(q∨¬q)'], 'r', I);
check('Ł3', ['p', 'p⊃q'], 'q', V);
check('Ł3', [], 'p⊃p', V);
check('K3', [], 'p⊃p', I);
check('RM3', ['p', 'p⊃q'], 'q', V);
check('LP', ['p', 'p⊃q'], 'q', I);
/* capítulo 9 */
check('K4', ['p→q', 'q→r'], 'p→r', V);
check('K4', ['p→q'], '¬q→¬p', I);
check('K4', [], 'p→(q∨¬q)', I);
check('K4', [], 'p→(q→q)', V);
check('N4', [], '¬(p→p)→(q→q)', I);
check('N4', ['p→q', 'q→r'], 'p→r', V);
check('K*', ['p∧¬q'], '¬(p→q)', I);
check('K*', ['p→q'], '¬q→¬p', V);
check('I4', [], '¬¬p⊐p', V);
check('I4', [], '(p∧¬p)⊐q', I);
check('I3', [], '(p∧¬p)⊐q', V);
check('W', [], '¬(p⊐¬p)', V);
check('W', [], '(p⊐q)⊐¬(p⊐¬q)', V);
check('W', [], '(p∧¬p)⊐¬(p∧¬p)', V);
check('I4', [], '¬(p⊐¬p)', I);
/* capítulo 10 */
check('B', ['p→q'], '(q→r)→(p→r)', V);
check('B', [], 'p→((p→q)→q)', I);
check('B', [], 'p→p', V);
check('B', [], '(p∧q)→p', V);
check('B', [], '¬¬p→p', V);
check('B', ['p', 'p→q'], 'q', V);
check('B', ['p→¬q'], 'q→¬p', V);
check('B', [], '(p→¬q)→(q→¬p)', I);
check('DW', [], '(p→¬q)→(q→¬p)', V);
check('B', [], '((p→q)∧(p→r))→(p→(q∧r))', V);
check('B', ['p→q'], '(r→p)→(r→q)', V);
check('B', [], 'q→(p→p)', I);
check('B', [], '(p∧¬p)→q', I);
check('CB', ['p>q'], 'p>(q∨r)', V);
check('CB+', [], '(p∧¬p)>q', I);
check('CB+', ['p', 'p>q'], 'q', V);
check('CB', ['p', 'p>q'], 'q', I);
/* apéndice 11a */
check('KFDE', ['□p∧¬□q'], '◇(p∧¬q)', V);
check('KFDE', ['□(p⊃q)', '◇p'], '◇q', I);
check('KK3', ['□(p⊃q)', '◇p'], '◇q', V);
check('KK3τ', ['□p'], '□□p', V);
check('KLPρ', ['□p'], 'p', V);
check('KFDE', [], '□(p∨¬p)', I);
check('KLP', [], '□(p∨¬p)', V);
check('A', ['p'], '□p', V);
check('A', ['¬p'], '□¬p', V);
check('A', [], 'p∨¬p', I);
check('A', [], '□(p∨¬p)', I);
/* capítulo 12 */
check('FOL', ['∀x(Px⊃Qx)', '∀x(Qx⊃Sx)'], '∀x(Px⊃Sx)', V);
check('FOL', [], '∀xPx⊃∃xPx', V);
check('FOL', ['∃x(Px⊃Qx)'], '∀x¬Qx', I);
check('FOL', [], 'a=b⊃(∃xSxa⊃(a=a∧∃xSxb))', V);
check('FOL', ['a=b'], '∀x∃y(Py∧x=y)', I);
check('FOL', ['∀x∃yRxy'], '∃y∀xRxy', 'unknown', 'árbol infinito');
check('FOL', ['∃y∀xRxy'], '∀x∃yRxy', V);
check('FOL', ['a=b', 'Pa'], 'Pb', V);
check('FOL', ['a=b'], 'b=a', V);
/* capítulo 13 */
check('FREE', [], '∀xPx⊃∃xPx', I);
check('FREE', ['∀xPx'], 'Pa', I);
check('FREE', ['∀xPx', 'Ea'], 'Pa', V);
console.log(bad ? `${bad} de ${n} fallan` : `${n} pruebas del motor, todas bien`);
process.exit(bad ? 1 : 0);
