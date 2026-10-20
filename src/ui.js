/* Lógica por Árboles — interfaz */
(function () {
'use strict';
const L = window.Logic, TB = window.Tableau, SEM = window.Sem, C = window.CONTENT;
const app = document.getElementById('app');
const modal = document.getElementById('modal');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- glifos de píxel (7 filas) ---------- */
const GLY = {
  '¬': ['......', '......', '######', '.....#', '.....#', '......', '......'],
  '∧': ['...#...', '...#...', '..#.#..', '..#.#..', '.#...#.', '.#...#.', '#.....#'],
  '∨': ['#.....#', '.#...#.', '.#...#.', '..#.#..', '..#.#..', '...#...', '...#...'],
  '⊃': ['......', '#####.', '.....#', '.....#', '.....#', '#####.', '......'],
  '⊐': ['......', '######', '.....#', '.....#', '.....#', '######', '......'],
  '≡': ['.......', '#######', '.......', '#######', '.......', '#######', '.......'],
  '⥽': ['.......', '.......', '...###.', '......#', '#######', '......#', '...###.'],
  '>': ['.....', '#....', '.##..', '...##', '.##..', '#....', '.....'],
  '→': ['.......', '....#..', '.....#.', '#######', '.....#.', '....#..', '.......'],
  '↔': ['.........', '..#...#..', '.#.....#.', '#########', '.#.....#.', '..#...#..', '.........'],
  '∀': ['#.....#', '#.....#', '.#####.', '.#...#.', '..#.#..', '..#.#..', '...#...'],
  '∃': ['######', '.....#', '.....#', '..####', '.....#', '.....#', '######'],
  '□': ['#######', '#.....#', '#.....#', '#.....#', '#.....#', '#.....#', '#######'],
  '◇': ['...#...', '..#.#..', '.#...#.', '#.....#', '.#...#.', '..#.#..', '...#...'],
  '⟨': ['...#', '..#.', '.#..', '#...', '.#..', '..#.', '...#'],
  '⟩': ['#...', '.#..', '..#.', '...#', '..#.', '.#..', '#...'],
  '⊢': ['#.....', '#.....', '#.....', '######', '#.....', '#.....', '#.....'],
  '⊬': ['#.....#', '#....#.', '#...#..', '#######', '#.#....', '##.....', '#......'],
  '⊨': ['#.....', '#.....', '######', '#.....', '######', '#.....', '#.....'],
  '↑': ['...#...', '..###..', '.#.#.#.', '#..#..#', '...#...', '...#...', '...#...'],
  '⋮': ['.#.', '...', '...', '.#.', '...', '...', '.#.'],
  star: ['...#...', '...#...', '#######', '.#####.', '..###..', '.##.##.', '.#...#.'],
  lock: ['..###..', '.#...#.', '.#...#.', '#######', '###.###', '###.###', '#######'],
  check: ['.......', '......#', '.....##', '#...##.', '##.##..', '.###...', '..#....'],
  cross: ['#.....#', '.#...#.', '..#.#..', '...#...', '..#.#..', '.#...#.', '#.....#'],
  book: ['#####..', '#...##.', '#.....#', '#.###.#', '#.....#', '#.###.#', '#######'],
  grid: ['#######', '#.#.#.#', '#######', '#.#.#.#', '#######', '#.#.#.#', '#######'],
  quiz: ['.####.', '#....#', '....#.', '...#..', '..#...', '......', '..#...'],
  tree: ['...#...', '...#...', '...#...', '..#.#..', '.#...#.', '#.....#', '#.....#'],
  spk: ['...#...', '..##.#.', '####..#', '####..#', '####..#', '..##.#.', '...#...'],
  back: ['...#', '..##', '.###', '####', '.###', '..##', '...#'],
  next: ['#...', '##..', '###.', '####', '###.', '##..', '#...'],
  undo: ['..#....', '.#.....', '######.', '.#....#', '..#...#', '......#', '..####.'],
  gear: ['..#.#..', '.#####.', '##...##', '.#...#.', '##...##', '.#####.', '..#.#..'],
  loop: ['..###.#', '.#...##', '#...###', '#......', '#.....#', '.#...#.', '..###..'],
  val: ['#....#.', '#....#.', '.#..#..', '.#..#..', '..##...', '..##...', '.......']
};
const OPS = '∧∨⊃⊐≡⥽>→↔⊢⊬⊨';
const gcache = {};
function glyph(ch) {
  if (gcache[ch]) return gcache[ch];
  const rows = GLY[ch], w = rows[0].length;
  let r = '';
  rows.forEach((row, y) => {
    for (let x = 0; x < w; x++) if (row[x] === '#') {
      let x2 = x;
      while (row[x2 + 1] === '#') x2++;
      r += `<rect x="${x}" y="${y}" width="${x2 - x + 1}" height="1"/>`;
      x = x2;
    }
  });
  const cls = OPS.includes(ch) ? 'g op' : 'g';
  return (gcache[ch] = `<svg class="${cls}" viewBox="0 0 ${w} 7" style="width:${(w / 7 * 0.6).toFixed(3)}em" aria-hidden="true" shape-rendering="crispEdges">${r}</svg>`);
}
const ico = glyph;
function raw(s) {
  let h = '';
  for (const ch of String(s)) h += GLY[ch] ? glyph(ch) : esc(ch);
  return h;
}
const fm = s => `<span class="fm" aria-label="${esc(s)}">${raw(s)}</span>`;
const fh = f => fm(L.str(f));
/* en los textos, {…} es una fórmula */
const tx = s => String(s).replace(/\{([^}]*)\}/g, (m, a) => fm(a));

/* ---------- Ramón, el pulpo (PixelLab, 48×48) ---------- */
const PULPO = window.LA_PULPO || {};
const MOODS = { neutral: 'atento', happy: 'contento', sad: 'preocupado', think: 'pensativo', brave: 'decidido' };
const pic = (href, cls) => `<image${cls ? ` class="${cls}"` : ''} width="48" height="48" href="${href}"/>`;
const pcache = {};
function pulpoBody(m) {
  if (pcache[m]) return pcache[m];
  const f = PULPO[m] || PULPO.neutral;
  if (!f) return '';
  return (pcache[m] = pic(f.base) + (f.talk ? pic(f.talk, 'bk') : '') + (f.blink ? pic(f.blink, 'blk') : ''));
}
const owl = (px, mood) => {
  const m = MOODS[mood] ? mood : 'neutral';
  return `<svg class="owl m-${m}" width="${24 * px}" height="${24 * px}" viewBox="0 0 48 48" shape-rendering="crispEdges" role="img" aria-label="Ramón, el pulpo, ${MOODS[m]}">${pulpoBody(m)}</svg>`;
};
const moodOf = text => (/¡/.test(text) ? 'happy' : /\?/.test(text) ? 'think' : 'neutral');

/* ---------- partida guardada ---------- */
const KEY = 'logica-arboles-v1';
const save = { done: {}, mv: null, sv: null, free: false, theme: '' };
try { Object.assign(save, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* sin almacenamiento */ }
if (window.LA_SAVE) Object.assign(save, window.LA_SAVE);
const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) { /* sin almacenamiento */ } };
if (save.mv == null) save.mv = 3;
if (save.sv == null) save.sv = 4;
const applyTheme = () => { if (save.theme) document.documentElement.dataset.theme = save.theme; else delete document.documentElement.dataset.theme; };
applyTheme();

const sid = (w, s) => C.worlds[w].num + '-' + s;
const isEx = s => s.t !== 'T';
function wstat(w) {
  const st = C.worlds[w].stages;
  let done = 0, stars = 0;
  st.forEach((s, i) => { const d = save.done[sid(w, i)]; if (d) { done++; if (isEx(s)) stars += d; } });
  return { done, total: st.length, stars, max: st.filter(isEx).length * 3 };
}
const worldOpen = w => w <= 1 || save.free || wstat(w - 1).done / wstat(w - 1).total >= 0.6;
const stageOpen = (w, s) => s === 0 || save.free || !!save.done[sid(w, s - 1)] || !!save.done[sid(w, s)];
const totalStars = () => C.worlds.reduce((n, W, i) => n + wstat(i).stars, 0);

/* ---------- sonido ---------- */
const AU = window.LAudio, sfx = AU.sfx;
const MVOL = [0, 0.05, 0.09, 0.15, 0.24, 0.36], SVOL = [0, 0.3, 0.55, 0.8, 1, 1.25];
const applySound = () => AU.set({ sfx: save.sv > 0, music: save.mv > 0, mv: MVOL[save.mv], sv: SVOL[save.sv] });
applySound();
function songFor() {
  if (V.scr === 'title' || V.scr === 'map') return V.scr;
  const w = 'w' + (C.worlds[V.w].k % 10);
  if (V.scr === 'world' || ST.type === 'T') return w + 'c';
  return ST.stage.boss ? 'boss' : w;
}

/* ---------- navegación ---------- */
let V = { scr: 'title', w: 0, s: 0 };
let ST = null;
let FD = null;
let PK = null;     // elección de mundo pendiente
let twTimer = null;
let lastTw = null;

function go(scr, w, s) {
  V = { scr, w: w == null ? V.w : w, s: s == null ? V.s : s };
  closeModal();
  lastTw = null;
  if (scr === 'stage') enterStage();
  render();
  app.scrollTop = 0;
}
function render() {
  clearInterval(twTimer);
  const k = C.worlds[V.w].k;
  document.documentElement.style.setProperty('--wc', `var(--w${k})`);
  app.className = 'screen scr-' + V.scr + (V.scr === 'world' || V.scr === 'stage' ? ' w' + k : '');
  app.innerHTML = '<div class="fit">' + ({ title: scrTitle, map: scrMap, world: scrWorld, stage: scrStage })[V.scr]() + '</div>';
  AU.play(songFor());
  const sayEl = app.querySelector('.say[data-tw]');
  if (sayEl) {
    const key = sayEl.dataset.tw + '|' + sayEl.textContent;
    if (key !== lastTw) { lastTw = key; typewriter(sayEl); }
  }
  fit();
  const sheet = app.querySelector('#sheet');
  if (sheet && ST && ST.flash) {
    const el = sheet.querySelector('.tn.new');
    if (el) el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  padShow(); legend();
}
const ZMIN = 0.62;
function fit() {
  const f = app.firstElementChild;
  if (!f || !f.classList.contains('fit')) return;
  const cs = getComputedStyle(app);
  const H = app.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  const W = app.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  if (H < 50 || W < 50) return;
  const sheet = f.querySelector('#sheet'), cols = f.querySelector('.proof .cols'), dlg = f.querySelector('.proof .main .dialog');
  const map = f.querySelector('.map'), opts = map && map.querySelector('.opts');
  let z = 1;
  const lay = () => {
    const w = W / z;
    f.style.width = w + 'px';
    f.style.minHeight = '0px';
    f.style.marginBottom = '0px';
    f.style.transform = z < 0.999 ? 'scale(' + z + ')' : '';
    f.classList.toggle('narrow', w < 860);
    f.classList.toggle('tiny', w < 600);
    if (opts) {
      opts.style.gridColumn = '';
      const n = getComputedStyle(map).gridTemplateColumns.split(' ').filter(t => parseFloat(t) > 0).length || 1, r = (map.children.length - 1) % n;
      opts.style.gridColumn = 'span ' + (r ? n - r : n);
    }
    if (sheet && cols) {
      sheet.style.maxHeight = '';
      const cap = f.classList.contains('narrow') ? Math.max(220, H / z * 0.5) : Math.max(220, H / z - cols.offsetTop - (dlg ? dlg.offsetHeight : 0) - 22);
      sheet.style.maxHeight = cap + 'px';
    }
    return f.scrollHeight;
  };
  let need = lay();
  if (map) {
    for (z = 1; need * z > H + 1 && z > ZMIN; ) { z = Math.max(ZMIN, z - 0.02); need = lay(); }
  } else {
    for (let i = 0; i < 6 && need * z > H + 1 && z > ZMIN; i++) {
      z = Math.max(ZMIN, Math.min(z - 0.01, H / need));
      need = lay();
    }
  }
  f.style.minHeight = (H / z) + 'px';
  const full = Math.max(need, H / z);
  f.style.marginBottom = z < 0.999 ? (-full * (1 - z)) + 'px' : '0px';
}
let fitTimer = null;
window.addEventListener('resize', () => { clearTimeout(fitTimer); fitTimer = setTimeout(() => { fit(); padShow(); }, 80); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => fit());
const meter = v => [1, 2, 3, 4, 5].map(i => `<i class="${i <= v ? 'on' : ''}"></i>`).join('');
const soundBtn = () => `<button class="btn sm snd${save.mv + save.sv === 0 ? ' off' : ''}" data-act="sound" aria-label="Volumen: música ${save.mv} de 5, efectos ${save.sv} de 5" title="Volumen">${ico('spk')}<i class="vb">${meter(save.mv)}</i></button>`;
function hud(title, back, sub) {
  return `<header class="hud">
    <button class="btn sm" data-act="${back}">${ico('back')}<span>Volver</span></button>
    <div class="hud-t"><h1>${title}</h1>${sub ? `<span class="hud-s">${sub}</span>` : ''}</div>
    <div class="hud-r"><span class="tot" title="Estrellas conseguidas">${ico('star')} ${totalStars()}</span>${soundBtn()}</div>
  </header>`;
}
const starsHTML = n => `<span class="stars" aria-label="${n} de 3 estrellas">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}">${ico('star')}</i>`).join('')}</span>`;

/* ---------- portada ---------- */
let heroTab = null;
function scrTitle() {
  const any = Object.keys(save.done).length > 0;
  if (!heroTab) heroTab = TB.solve('CL', ['p⊃q', 'p'].map(L.parse), L.parse('q')).t;
  return `<section class="title">
    <div class="tsnd">${soundBtn()}</div>
    <div class="logo"><span class="l1">L<span class="acc">O</span>GICA</span><span class="l2">POR ÁRBOLES</span></div>
    <p class="tag">Las lógicas no clásicas de Graham Priest, a punta de árboles</p>
    <div class="hero">
      <div class="hero-owl">${owl(6, 'happy')}</div>
      <div class="hero-tree panel">${treeHTML(heroTab, { still: true })}</div>
    </div>
    <button class="btn pri big" data-act="start"><span class="blink">${any ? 'CONTINUAR' : 'PULSA START'}</span></button>
    <div class="strip">${C.worlds.map(W => `<span class="wbadge" style="--wc:var(--w${W.k})" title="${esc('Capítulo ' + W.num + ': ' + W.logic)}">${raw(W.badge)}</span>`).join('')}</div>
  </section>`;
}

/* ---------- mapa ---------- */
function scrMap() {
  const themeName = { '': 'Auto', light: 'Día', dark: 'Noche' }[save.theme];
  return hud('MAPA DEL MAR', 'title') + `<div class="map">` + C.worlds.map((W, i) => {
    const s = wstat(i), open = worldOpen(i);
    return `<button class="wcard${open ? '' : ' locked'}" style="--wc:var(--w${W.k});--bgimg:var(--img-w${W.k})" data-act="world" data-w="${i}">
      <span class="wbadge">${raw(W.badge)}</span>
      <span class="winfo"><span class="wnum">${W.num === '0' ? 'PRÓLOGO' : 'CAPÍTULO ' + W.num}</span><b>${W.name}</b><span class="wlogic">${W.logic}</span></span>
      <span class="wprog">${open
        ? `<span class="pbar"><i style="width:${Math.round(100 * s.done / s.total)}%"></i></span><span class="cnt">${s.done}/${s.total} · ${ico('star')} ${s.stars}</span>`
        : `<span class="cnt lockmsg">${ico('lock')} Completa el 60 % del capítulo anterior</span>`}</span>
    </button>`;
  }).join('') + `
  <div class="opts panel">
    <span class="mlabel">OPCIONES</span>
    <div class="optgrid">
    <button class="btn sm" data-act="free" aria-pressed="${save.free}">Modo libre: ${save.free ? 'sí' : 'no'}</button>
    <button class="btn sm" data-act="theme">Tema: ${themeName}</button>
    <button class="btn sm" data-act="wipe">Borrar progreso</button>
    </div>
    <span class="optnote">El modo libre abre todos los capítulos y etapas.</span>
  </div></div>`;
}

/* ---------- mundo ---------- */
const TYPE = { T: ['book', 'Teoría'], A: ['tree', 'Árbol'], M: ['val', 'Valores'], Q: ['quiz', 'Preguntas'], TT: ['grid', 'Tabla'], V: ['gear', 'Máquina'] };
function scrWorld() {
  const W = C.worlds[V.w];
  return hud(W.name, 'map', (W.num === '0' ? 'Prólogo' : 'Capítulo ' + W.num) + ' · ' + W.logic) + `
  <div class="dialog small slim" data-act="twskip"><div class="who">${owl(2, 'neutral')}</div><div class="say" data-tw="W${V.w}">${tx(W.intro)}</div></div>
  <ol class="stages">` + W.stages.map((s, i) => {
    const d = save.done[sid(V.w, i)], open = stageOpen(V.w, i);
    const res = !open ? ico('lock') : isEx(s) ? starsHTML(d || 0) : d ? `<span class="done">${ico('check')}</span>` : '';
    const tag = s.t === 'A' ? sysName(s.sys, true) : s.t === 'M' || s.t === 'TT' ? s.sys : '';
    return `<li><button class="srow t${s.t}${open ? '' : ' locked'}${d ? ' isdone' : ''}" data-act="stage" data-s="${i}">
      <span class="snum">${i + 1}</span>
      <span class="stype" title="${TYPE[s.t][1]}">${ico(TYPE[s.t][0])}</span>
      <span class="stitle">${esc(s.title)}${s.boss ? ' <em class="boss">JEFE</em>' : ''}${tag ? '<small>' + esc(tag) + '</small>' : ''}</span>
      <span class="sres">${res}</span></button></li>`;
  }).join('') + `</ol>`;
}
const sysName = (id, short) => { const S = TB.SYS[id] || SEM.MV[id]; return S ? (short ? id : (S.nm || S.name)) : id; };

/* ---------- etapas ---------- */
function enterStage() {
  const s = C.worlds[V.w].stages[V.s];
  if (s.t === 'T') ST = { type: 'T', stage: s, page: 0 };
  if (s.t === 'Q') ST = { type: 'Q', stage: s, i: 0, wrong: 0, picked: -1, bad: [] };
  if (s.t === 'TT') {
    const cols = s.cols.map(L.parse), atoms = L.atomsOf(cols), rows = SEM.valuations(s.sys, atoms);
    ST = { type: 'TT', stage: s, cols, atoms, rows, cells: cols.map(() => rows.map(() => null)), mark: null, checks: 0, solved: false, msg: { k: 'info', h: tx(s.intro) } };
  }
  if (s.t === 'M') {
    const prem = s.prem.map(L.parse), goal = s.concl ? L.parse(s.concl) : null, val = {};
    const atoms = s.dom ? SEM.groundAtoms(goal ? [...prem, goal] : prem, s.dom, SEM.MV[s.sys].fid) : L.atomsOf(goal ? [...prem, goal] : prem);
    atoms.forEach(a => { val[a] = SEM.MV[s.sys].vals[0]; });
    ST = { type: 'M', stage: s, prem, goal, atoms, val, moves: 0, msg: { k: 'info', h: tx(s.intro) } };
  }
  if (s.t === 'V') {
    ST = { type: 'V', stage: s, prem: [], concl: null, sys: s.sys[0], res: null, busy: false, got: {}, seen: {}, solved: false, msg: { k: 'info', h: tx(s.intro) } };
  }
  if (s.t === 'A') {
    const prem = s.prem.map(L.parse), concl = L.parse(s.concl);
    const tab = new TB.Tab(s.sys, prem, concl);
    ST = { type: 'A', stage: s, prem, concl, tab, hist: [], sel: [], hints: 0, errs: 0, flash: null, solved: false, usedSol: false, playing: false, model: null,
      msg: { k: 'info', h: tx(s.intro || IDLE) } };
  }
}
function scrStage() {
  const s = ST.stage, W = C.worlds[V.w];
  const head = hud(esc(s.title), 'toWorld', `${W.num === '0' ? 'Prólogo' : 'Capítulo ' + W.num} · etapa ${V.s + 1} de ${W.stages.length}`);
  return head + ({ T: scrTheory, A: scrTree, M: scrModel, Q: scrQuiz, TT: scrTable, V: scrLab })[ST.type]();
}
const KMOOD = { err: 'sad', hint: 'think', ok: 'happy' };
const sayBox = (m, small) => {
  const mood = KMOOD[m.k] || (ST.stage.boss ? 'brave' : 'neutral');
  return `<div class="dialog ${m.k}${small ? ' small' : ''}" data-act="twskip" aria-live="polite"><div class="who">${owl(3, mood)}</div><div class="say" data-tw="S${V.w}-${V.s}-${m.k}">${m.h}</div></div>`;
};

/* ----- teoría ----- */
function figHTML(f) {
  if (Array.isArray(f)) return `<div class="figrow">${f.map(figHTML).join('')}</div>`;
  if (f.k === 'table') return `<div class="tw"><table class="tbl${f.tight ? ' tight' : ''}"><thead><tr>${f.head.map(h => `<th>${tx(h)}</th>`).join('')}</tr></thead><tbody>${f.rows.map(r => `<tr>${r.map(c => `<td>${tx(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if (f.k === 'tab') {   // un árbol del libro, hecho por el motor
    if (!f.cache) f.cache = TB.solve(f.sys, f.prem.map(L.parse), L.parse(f.concl), 300);
    const r = f.cache;
    return `<div class="figtree">${treeHTML(r.t, { still: true, openLeaf: r.open && r.open.id })}${f.cap ? `<p class="cap">${tx(f.cap)}</p>` : ''}</div>`;
  }
  if (f.k === 'rule') {   // una regla de árbol dibujada: arriba lo que hay, abajo lo que se añade
    return `<div class="rulefig">${f.rules.map(r => `<div class="rf"><div class="rf-top">${r.top.map(t => `<span>${tx(t)}</span>`).join('')}</div><div class="rf-mid">${r.alts.length > 1 ? '↙ ↘' : '↓'}</div><div class="rf-alts">${r.alts.map(a => `<div class="rf-alt">${a.map(t => `<span>${tx(t)}</span>`).join('')}</div>`).join('')}</div>${r.note ? `<small>${tx(r.note)}</small>` : ''}</div>`).join('')}</div>`;
  }
  if (f.k === 'kripke') return modelDiagram({ W: f.w.map(w => w.id), R: f.e, lits: Object.fromEntries(f.w.map(w => [w.id, w.t ? w.t.split(',').map(x => x.trim()) : []])), nn: f.nn || [], root: f.root || f.w[0].id, names: Object.fromEntries(f.w.map(w => [w.id, w.id])) }) + (f.cap ? `<p class="cap">${tx(f.cap)}</p>` : '');
  return '';
}
function scrTheory() {
  const s = ST.stage, p = s.pages[ST.page], n = s.pages.length, last = ST.page === n - 1;
  const mood = p.mood || moodOf(p.say);
  return `<div class="theory">
    <div class="scene panel${p.fig ? '' : ' empty'}">${p.fig ? figHTML(p.fig) : `<div class="scene-owl">${owl(7, mood)}</div>`}</div>
    <div class="dialog big" data-act="twskip"><div class="who">${owl(4, mood)}<span>RAMÓN</span></div><div class="say" data-tw="T${V.w}-${V.s}-${ST.page}">${tx(p.say)}</div></div>
    <div class="tnav">
      <button class="btn" data-act="tprev" ${ST.page ? '' : 'disabled'}>${ico('back')}<span>Atrás</span></button>
      <span class="pg">${s.pages.map((x, i) => `<i class="${i === ST.page ? 'on' : ''}"></i>`).join('')}</span>
      <button class="btn pri" data-act="tnext"><span>${last ? 'Terminar' : 'Siguiente'}</span>${ico('next')}</button>
    </div>
  </div>`;
}
/* Ramón escribe letra a letra, con voz de pitidos, y mueve la boca mientras habla */
function typewriter(el) {
  const box = el.closest('.dialog');
  const bird = box && box.querySelector('.owl');
  if (bird) bird.classList.add('fresh');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const units = [];
  const walk = node => {
    [...node.childNodes].forEach(ch => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach(tok => {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
          const word = document.createElement('span');
          word.className = 'tww';
          for (const c of tok) { const sp = document.createElement('span'); sp.className = 'twh'; sp.textContent = c; word.appendChild(sp); units.push(sp); }
          frag.appendChild(word);
        });
        ch.replaceWith(frag);
      } else if (ch.nodeName.toLowerCase() === 'svg') { ch.classList.add('twh'); units.push(ch); }
      else if (ch.nodeName.toLowerCase() === 'button') { ch.classList.add('twh'); units.push(ch); }
      else walk(ch);
    });
  };
  walk(el);
  if (bird) bird.classList.add('talk');
  let i = 0, n = 0;
  twTimer = setInterval(() => {
    for (let k = 0; k < 2 && i < units.length; k++) units[i++].classList.remove('twh');
    if (n++ % 2 === 0) AU.blip();
    if (i >= units.length) { clearInterval(twTimer); if (bird) bird.classList.remove('talk'); }
  }, 30);
}
function twDone() {
  const hidden = app.querySelectorAll('.twh');
  if (!hidden.length) return true;
  clearInterval(twTimer);
  hidden.forEach(e => e.classList.remove('twh'));
  app.querySelectorAll('.owl.talk').forEach(o => o.classList.remove('talk'));
  return false;
}

/* ----- el árbol ----- */
const IDLE = 'Toca una línea y pulsa <b>Aplicar regla</b>. Para cerrar una rama, toca dos líneas que choquen y pulsa <b>Cerrar</b>.';
const wl = w => (w == null ? '' : w.endsWith('#') ? w.slice(0, -1) + '#' : w);
function nodeText(n) {
  if (n.k === 'r3') return `<span class="trel"><i>r</i>${[n.a, n.b, n.c].map(x => esc(wl(x))).join(' ')}</span>`;
  if (n.k === 'r') return `<span class="trel">${esc(n.a)}<i>r</i>${n.A ? `<sub>${fh(n.A)}</sub>` : ''}${esc(n.b)}</span>`;
  const lab = n.s ? (n.s === '-' ? '−' : '+') + (n.w == null ? '' : wl(n.w)) : (n.w == null ? '' : wl(n.w));
  return fh(n.f) + (lab !== '' ? `<span class="tl">, ${esc(lab)}</span>` : '');
}
/* una línea queda marcada ✓ cuando su regla ya dejó todo lo que tenía que dejar (las de □ y ∀ nunca, como en el libro) */
const REUSE = new Set(['□', '∀', '[F]', '[P]', '>', '→+', '¬→−', '⊐+', '¬+']);
function ticked(t, n) {
  if (n.k !== 'f') return false;
  const kid = t.nodes.find(m => m.src === n.id);
  if (!kid || REUSE.has(kid.rule)) return false;
  return !t.pending(n).length;
}
function treeHTML(t, o) {
  o = o || {};
  const sel = new Set(o.sel || []), still = o.still;
  const seg = start => {
    const chain = [start];
    let cur = start;
    while (cur.kids.length === 1) { cur = t.node(cur.kids[0]); chain.push(cur); }
    const rows = chain.map(n => {
      const cls = ['tn'];
      if (sel.has(n.id)) cls.push('sel');
      if (o.flash && n.id >= o.flash) cls.push('new');
      if (n.rule === 'ini') cls.push('ini');
      if (!still && ticked(t, n)) cls.push('used');
      const just = n.rule && n.rule !== 'ini' ? `<span class="tj">${raw(n.rule)}${n.src ? ' ' + n.src : ''}</span>` : '';
      return still
        ? `<div class="${cls.join(' ')}"><span class="tnum">${n.id}</span><span class="tf">${nodeText(n)}</span>${just}</div>`
        : `<button class="${cls.join(' ')}" data-act="tnode" data-i="${n.id}"><span class="tnum">${n.id}</span><span class="tf">${nodeText(n)}</span>${just}${cls.includes('used') ? `<span class="tick">${ico('check')}</span>` : ''}</button>`;
    }).join('');
    let tail = '';
    if (cur.kids.length > 1) tail = `<div class="tkids">${cur.kids.map(k => `<div class="tbr">${seg(t.node(k))}</div>`).join('')}</div>`;
    else if (cur.close) tail = `<div class="ttip closed" title="Rama cerrada">×<small>${cur.close.by.join(', ')}</small></div>`;
    else if (cur.decl || (still && o.openLeaf === cur.id)) tail = `<div class="ttip openb" title="Rama abierta">${ico('↑')}</div>`;
    else if (!still) tail = `<button class="ttip ${sel.has(-cur.id) ? 'sel' : ''}" data-act="ttip" data-i="${cur.id}" title="Final de la rama">○</button>`;
    return `<div class="tseg">${rows}${tail}</div>`;
  };
  return `<div class="tree${still ? ' still' : ''}">${seg(t.root)}</div>`;
}
function selNodes() { return ST.sel.filter(x => x > 0).map(id => ST.tab.node(id)); }
function paletteTree() {
  const t = ST.tab, off = ST.solved || ST.playing ? 'disabled' : '';
  const ns = selNodes(), tip = ST.sel.find(x => x < 0);
  let ruleLab = 'Aplicar regla', canRule = false;
  if (ns.length === 1 && !tip) {
    const p = t.pending(ns[0]);
    if (p.length) { canRule = true; ruleLab = `Aplicar ${raw(p[0].I.r)}`; }
  }
  let canClose = false;
  if (ns.length === 2) canClose = TB.clash(t.sys, ns[0], ns[1]);
  if (ns.length === 1 && ns[0].k === 'f' && !t.sys.sg && ns[0].f.t === 'not' && ns[0].f.a.t === 'atom' && ns[0].f.a.p === '=' && ns[0].f.a.args[0] === ns[0].f.a.args[1]) canClose = true;
  const structs = TB.structOf(t.sys);
  return `<div class="panel pal">
    <div class="mlabel">REGLAS</div>
    <div class="acts">
      <button class="btn${canRule && !off ? ' lit' : ''}" data-act="trule" ${off}>${ruleLab}</button>
      <button class="btn${canClose && !off ? ' lit' : ''}" data-act="tclose" ${off}>Cerrar ×</button>
      <button class="btn${tip && !off ? ' lit' : ''}" data-act="topen" ${off}>Abierta ${ico('↑')}</button>
    </div>
    ${structs.length ? `<div class="mlabel">${t.sys.fo && !t.sys.W ? 'IDENTIDAD Y EXISTENCIA' : 'RELACIÓN Y OTRAS'}</div><div class="rules">${structs.map(rid => {
      const lit = !off && t.structPending(rid).length > 0;
      return `<button class="rbtn${lit ? ' lit' : ''}" data-act="tstruct" data-r="${rid}" title="${esc(TB.STRUCT[rid].name + ': ' + TB.STRUCT[rid].desc)}" ${off}>${raw(rid === 'her' ? 'her.' : rid)}</button>`;
    }).join('')}</div>` : ''}
    <div class="acts tools">
      <button class="btn sm" data-act="undo" ${off || (ST.hist.length ? '' : 'disabled')}>${ico('undo')}<span>Deshacer</span></button>
      <button class="btn sm" data-act="reset" ${off || (ST.hist.length ? '' : 'disabled')}>Reiniciar</button>
      <button class="btn sm" data-act="hint" ${off}>Pista</button>
      <button class="btn sm" data-act="book">Reglas</button>
    </div>
  </div>`;
}
function goalHTML(tag, prem, goal, sym, sys) {
  return `<div class="goal panel"><span class="gtag">${tag}</span><span class="seq">${prem.map(fh).join('<span class="comma">,</span> ')} ${glyph(sym)} ${fh(goal)}</span>${sys ? `<span class="sys">${esc(sys)}</span>` : ''}</div>`;
}
function scrTree() {
  const s = ST.stage;
  return `<div class="proof">
    ${goalHTML('¿VÁLIDA?', ST.prem, ST.concl, '⊢', sysName(s.sys))}
    <div class="cols">
      <div class="main"><div class="sheet panel treebox" id="sheet">${treeHTML(ST.tab, { sel: ST.sel, flash: ST.flash })}</div>
        ${ST.model ? `<div class="panel cmodel">${modelHTML(ST.tab.sys, ST.model, ST.prem, ST.concl)}</div>` : ''}
        ${sayBox(ST.msg, true)}</div>
      <div class="side">${paletteTree()}</div>
    </div>
  </div>`;
}
function say(k, h) { ST.msg = { k, h }; }
function snapshot() { ST.hist.push(ST.tab.clone()); }
function after(r, okMsg) {
  if (r.error) { ST.hist.pop(); ST.errs++; sfx.err(); say('err', raw(r.error)); render(); return false; }
  ST.sel = [];
  sfx.ok();
  if (okMsg) say('info', okMsg); else if (ST.msg.k === 'err' || ST.msg.k === 'hint') say('info', IDLE);
  checkTree();
  render();
  return true;
}
function checkTree() {
  const st = ST.tab.status();
  if (st === 'busy' || ST.solved) return;
  ST.solved = true;
  const stars = ST.usedSol ? 1 : (ST.hints || ST.errs > 2) ? 2 : 3;
  finish(stars);
  const mine = ST;
  if (st === 'closed') {
    say('ok', '¡Todas las ramas se cerraron! No hay manera de que las premisas sean verdaderas y la conclusión no: la inferencia es <b>válida</b>.');
    setTimeout(() => { if (ST === mine && V.scr === 'stage') winModal(stars, 'VÁLIDA', detailOf()); }, 700);
  } else {
    say('ok', '¡Una rama abierta y completa! De ella sale un <b>contramodelo</b>: la inferencia <b>no es válida</b>.');
    setTimeout(() => { if (ST === mine && V.scr === 'stage') winModal(stars, 'INVÁLIDA', detailOf()); }, 1400);
  }
}
const detailOf = () => `${ST.tab.nodes.length} líneas` + (ST.usedSol ? ' · con la solución' : ST.hints ? ` · ${ST.hints} ${ST.hints === 1 ? 'pista' : 'pistas'}` : ST.errs > 2 ? ` · ${ST.errs} intentos fallidos` : ' · sin pistas');
function finish(stars) {
  const id = sid(V.w, V.s);
  save.done[id] = Math.max(save.done[id] || 0, stars);
  persist();
  sfx.win();
}
/* aplica la regla de una línea; si hay que elegir mundo o nombre, pregunta */
function applyRule(id, pick) {
  const probe = ST.tab.choices(ST.tab.node(id));
  if (pick == null && probe.length > 1) {
    const lab = alt => alt.map(nodeText).join(', ');
    showModal(`<h3>¿Con qué mundo o nombre aplicas la regla de la línea ${id}?</h3><p class="cap">La regla abre dos ramas para cada uno; elige uno por vez.</p>
      <div class="choices">${probe.map((o, i) => `<button class="btn chopt" data-act="tpick" data-i="${i}">${o.I.alts.map(lab).join(' <b class="bar">|</b> ')}</button>`).join('')}</div>
      <div class="mrow"><button class="btn" data-act="mcancel">Cancelar</button></div>`);
    PK = { picks: probe.map(o => o.key), id };
    return;
  }
  closeModal();
  snapshot();
  const before = ST.tab.nodes.length;
  const r = ST.tab.apply(id, pick);
  ST.flash = r.ok ? before + 1 : null;
  after(r);
}
function hintText(t) {
  const m = TB.nextMove(t);
  if (!m) {
    const leaf = t.openLeaves().find(l => !l.decl && !t.findClash(l));
    return leaf ? `Ya no queda ninguna regla por aplicar en la rama que termina en la línea ${leaf.id}. Toca su final (○) y pulsa <b>Abierta</b>.` : 'Revisa las ramas que quedan abiertas.';
  }
  if (m.kind === 'close') return `Mira las líneas ${m.ids.join(' y ')}: ${m.ids.length === 1 ? 'esa línea sola cierra la rama' : 'chocan'}. Tócalas y pulsa <b>Cerrar</b>.`;
  if (m.kind === 'struct') return `Toca la regla <b>${raw(m.rid)}</b> (${TB.STRUCT[m.rid].name.toLowerCase()}): ${raw(TB.STRUCT[m.rid].desc)}`;
  const n = t.node(m.id), r = t.pending(n)[0].I.r;
  const branchy = t.pending(n)[0].I.alts && t.pending(n)[0].I.alts.length > 1;
  return `Prueba con la línea ${m.id}, regla ${raw(r)}.${branchy ? ' Abre ramas, así que conviene dejarla para cuando no quede nada que no ramifique.' : ''}`;
}
function playSolution() {
  const mine = ST;
  ST.usedSol = true; ST.playing = true; ST.tab = new TB.Tab(ST.stage.sys, ST.prem, ST.concl); ST.hist = []; ST.sel = []; ST.flash = null; ST.model = null;
  say('hint', 'Mira cómo se construye, paso a paso.');
  render();
  const tick = () => {
    if (ST !== mine || V.scr !== 'stage') return;
    const before = ST.tab.nodes.length;
    const m = TB.nextMove(ST.tab);
    if (!m || ST.tab.nodes.length > 300) { finishPlay(); return; }
    TB.doMove(ST.tab, m);
    ST.flash = ST.tab.nodes.length > before ? before + 1 : null;
    sfx.sel();
    if (ST.tab.status() === 'closed') { ST.playing = false; checkTree(); render(); return; }
    render();
    setTimeout(tick, 650);
  };
  const finishPlay = () => {
    ST.playing = false;
    const leaf = ST.tab.openLeaves().find(l => !ST.tab.findClash(l));
    if (leaf) { const r = ST.tab.declare(leaf.id); if (r.ok) ST.model = TB.readModel(ST.tab, leaf); }
    checkTree(); render();
  };
  setTimeout(tick, 600);
}

/* ----- contramodelos ----- */
const VN = { 1: '1', 0: '0', b: 'b', n: 'n', '1': '1', '0': '0' };
const vcls = v => (v === 1 || v === '1' ? 'v2' : v === 'b' || v === 'n' || v === 0.5 ? 'v1' : 'v0');
const vchip = v => `<span class="vchip ${vcls(v)}">${esc(VN[v] != null ? VN[v] : v)}</span>`;
function worldName(w) { return w == null ? '' : w.endsWith('#') ? 'w' + w.slice(0, -1) + '*' : 'w' + w; }
function modelHTML(sys, M, prem, concl) {
  let body = '';
  const atoms = L.atomsOf([...prem, concl]);
  if (!sys.W) {
    if (sys.fo) {
      const preds = {};
      M.pos[null].forEach(a => { const p = a[0]; if (p !== '=' && p !== 'E') (preds[p] = preds[p] || []).push(a.slice(1)); });
      const ps = [...new Set(L.subformulas(L.Bin('and', concl, prem.length ? prem.reduce((x, y) => L.Bin('and', x, y)) : concl)).filter(g => g.t === 'atom' && g.args.length && g.p !== '=' && g.p !== 'E').map(g => g.p))].sort();
      body = `<p class="cap">Dominio: un objeto por cada nombre de la rama${M.dom.some(d => M.dom.length && d) ? '' : ''}: <b>{${M.dom.join(', ')}}</b>${sys.fo === 'free' ? ` · existen: <b>{${[...M.E[null]].join(', ')}}</b>` : ''}</p>
        <div class="gats">${ps.map(p => `<span class="gat">${fm(p)} = {${(preds[p] || []).map(t => t.length > 1 ? '⟨' + t.split('').join(',') + '⟩' : t).join(', ')}}</span>`).join('')}</div>`;
    } else {
      body = `<div class="gats">${atoms.map(p => {
        let v;
        if (sys.sg) { const t = M.pos[null].has(p), f = M.neg[null].has(p); v = t ? (f ? 'b' : '1') : (f ? '0' : 'n'); }
        else v = M.pos[null].has(p) ? 1 : 0;
        return `<span class="gat">${fm(p)} ${vchip(v)}</span>`;
      }).join('')}</div>${sys.sg ? '<p class="cap">1: solo verdadera · 0: solo falsa · b: ambas · n: ninguna</p>' : ''}`;
    }
  } else {
    const lits = {};
    M.W.forEach(w => {
      const l = [];
      M.pos[w].forEach(p => l.push(sys.sg && !sys.int && sys.neg !== 'star' ? '+' + p : p));
      if (sys.sg && !sys.int && sys.neg !== 'star') M.neg[w].forEach(p => l.push('+¬' + p));
      else if (!sys.sg) M.neg[w].forEach(p => l.push('¬' + p));
      Object.keys(M.fixed[w] || {}).forEach(k => {
        if (!sys.sg) l.push((M.fixed[w][k] ? '' : '¬') + k);
        else if (k[0] === '1') l.push('+' + k.slice(1));
        else if (k[0] === '0') l.push('+¬' + k.slice(1));
      });
      lits[w] = l;
    });
    const R = sys.md === 'U' || sys.cond ? [] : M.R;
    body = modelDiagram({ W: M.W, R, RA: M.RA, lits, nn: M.W.filter(w => !M.normal.includes(w)), root: '0', names: Object.fromEntries(M.W.map(w => [w, worldName(w)])), star: sys.neg === 'star' })
      + (sys.fo ? `<p class="cap">Dominio: un objeto por nombre, <b>{${M.dom.join(', ')}}</b>.${sys.fo === 'var' ? ' Lo que existe en cada mundo está marcado con E.' : ' Es el mismo en todos los mundos.'}</p>` : '')
      + (M.R3 && M.R3.length ? `<p class="cap">Relación ternaria: ${M.R3.map(t => 'R(' + t.map(worldName).join(', ') + ')').join(' · ')}; además, R(w0, x, x) para todo x.</p>` : '')
      + `<p class="cap">${(sys.md === 'U' || sys.cond) && !sys.tern ? 'Todos los mundos se ven entre sí. ' : ''}${M.W.some(w => !M.normal.includes(w)) ? 'Con borde punteado: mundos no normales. ' : ''}${sys.neg === 'star' ? 'w0* es el mundo estrella de w0. ' : ''}Lo que no figura en un mundo es falso allí${sys.sg && !sys.int ? ' (o «no verdadero»)' : ''}.</p>`;
  }
  const val = f => vchip(TB.valueAt(sys, M, f));
  return `<div class="mlabel">CONTRAMODELO</div>${body}
    <div class="tw"><table class="tbl vt"><tbody>${prem.map(f => `<tr><td class="lab">Premisa</td><td>${fh(f)}</td><td>${val(f)}</td></tr>`).join('')}
    <tr><td class="lab">Conclusión</td><td>${fh(concl)}</td><td>${val(concl)}</td></tr></tbody></table></div>`;
}
/* dibujo de un modelo de mundos: columnas por distancia a la raíz */
function modelDiagram(D) {
  const ids = D.W, n = ids.length, idx = {};
  ids.forEach((w, i) => { idx[w] = i; });
  const E = [];
  (D.R || []).forEach(([a, b]) => { if (a !== b && idx[a] != null && idx[b] != null) E.push([idx[a], idx[b], '']); });
  (D.RA || []).forEach(([a, b, A]) => { if (idx[a] != null && idx[b] != null) E.push([idx[a], idx[b], A]); });
  const loops = new Set((D.R || []).filter(([a, b]) => a === b).map(([a]) => a));
  const loopsA = {};
  (D.RA || []).forEach(([a, b, A]) => { if (a === b) (loopsA[a] = loopsA[a] || []).push(A); });
  const lev = new Array(n).fill(-1);
  const r0 = idx[D.root] != null ? idx[D.root] : 0;
  lev[r0] = 0;
  for (let q = [r0]; q.length;) { const a = q.shift(); E.forEach(([x, y]) => { if (x === a && lev[y] < 0) { lev[y] = lev[a] + 1; q.push(y); } }); }
  lev.forEach((l, i) => { if (l < 0) lev[i] = D.star && ids[i].endsWith('#') ? lev[idx[ids[i].slice(0, -1)]] : 1; });
  if (D.star) ids.forEach((w, i) => { if (w.endsWith('#') && idx[w.slice(0, -1)] != null) lev[i] = lev[idx[w.slice(0, -1)]]; });
  const cols = [];
  lev.forEach((l, i) => { (cols[l] = cols[l] || []).push(i); });
  const BW = 136, GX = 70, GY = 18;
  const BH = Math.max(54, ...ids.map(w => 32 + Math.ceil((D.lits[w] || []).join(', ').length / 16) * 18));
  const rows = Math.max(1, ...cols.filter(Boolean).map(c => c.length));
  const nc = cols.length;
  const Wd = nc * (BW + GX) - GX, H = rows * (BH + GY) - GY, pos = [];
  cols.forEach((c, l) => { if (c) c.forEach((i, k) => { pos[i] = { x: l * (BW + GX), y: (H - (c.length * (BH + GY) - GY)) / 2 + k * (BH + GY) }; }); });
  const tip = (x, y, ux, uy) => `<path d="M${x} ${y} L${x - 11 * ux + 6 * uy} ${y - 11 * uy - 6 * ux} L${x - 11 * ux - 6 * uy} ${y - 11 * uy + 6 * ux} z"/>`;
  const seen = new Set();
  let svg = '', labs = '';
  E.forEach(([a, b, A]) => {
    const k = Math.min(a, b) + '-' + Math.max(a, b) + A;
    if (seen.has(k)) return;
    seen.add(k);
    const both = E.some(([x, y, B]) => x === b && y === a && B === A);
    const P = pos[a], Q = pos[b];
    if (!P || !Q) return;
    const ax = P.x + BW / 2, ay = P.y + BH / 2, bx = Q.x + BW / 2, by = Q.y + BH / 2;
    const dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
    const t = Math.min((BW / 2 + 6) / (Math.abs(dx) || 1e-9), (BH / 2 + 6) / (Math.abs(dy) || 1e-9)) * d;
    const x1 = ax + ux * t, y1 = ay + uy * t, x2 = bx - ux * t, y2 = by - uy * t;
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>` + tip(x2, y2, ux, uy) + (both ? tip(x1, y1, -ux, -uy) : '');
    if (A) labs += `<span class="elab" style="left:${(x1 + x2) / 2}px;top:${(y1 + y2) / 2}px">${fm(A)}</span>`;
  });
  const boxes = ids.map((w, i) => {
    const t = D.lits[w] || [];
    const loop = loops.has(w) ? `<em>${ico('loop')}</em>` : '';
    const la = loopsA[w] ? `<em class="la">${ico('loop')}<sub>${loopsA[w].map(fm).join(',')}</sub></em>` : '';
    const cls = ['world', w === D.root ? 'root' : '', (D.nn || []).includes(w) ? 'nn' : ''].join(' ');
    return `<div class="${cls}" style="left:${pos[i].x}px;top:${pos[i].y}px;width:${BW}px;height:${BH}px"><b>${esc(D.names[w])}${loop}${la}</b><span>${t.length ? t.map(fm).join(', ') : '–'}</span></div>`;
  }).join('');
  return `<div class="kr-wrap"><div class="kmodel" style="width:${Wd}px;height:${H}px"><svg viewBox="0 0 ${Wd} ${H}" width="${Wd}" height="${H}" aria-hidden="true">${svg}</svg>${boxes}${labs}</div></div>`;
}

/* ----- valores: contraejemplo a mano (lógicas de tablas) ----- */
function scrModel() {
  const s = ST.stage, S = SEM.MV[s.sys];
  const sat = !ST.goal;
  const des = v => S.des.includes(v);
  const rowsF = sat ? ST.prem.map(f => ['Fórmula', f, true]) : [...ST.prem.map(f => ['Premisa', f, true]), ['Conclusión', ST.goal, false]];
  let all = true;
  const rows = rowsF.map(([lab, f, want]) => {
    const v = SEM.evMV(s.sys, f, ST.val, s.dom), good = des(v) === want;
    if (!good) all = false;
    return `<tr><td class="lab">${lab}</td><td>${fh(f)}</td><td>${vchip2(s.sys, v)}</td>
      <td class="want ${good ? 'good' : 'no'}">${ico(good ? 'check' : 'cross')}<span>${want ? 'debe ser designada' : 'no debe ser designada'}</span></td></tr>`;
  }).join('');
  ST.all = all;
  if (S.glb) {   // L: no hay designados fijos; la conclusión tiene que quedar por debajo del mínimo de las premisas
    const mins = Math.min(1, ...ST.prem.map(f => SEM.evMV(s.sys, f, ST.val, s.dom))), cv = SEM.evMV(s.sys, ST.goal, ST.val, s.dom);
    const fb = SEM.fidBad(s.sys, ST.val, s.dom, ST.atoms);
    ST.all = !fb && SEM.glbFails(s.sys, ST.prem, ST.goal, ST.val, s.dom);
    const rows2 = [...ST.prem.map(f => ['Premisa', f]), ['Conclusión', ST.goal]].map(([lab, f]) => `<tr><td class="lab">${lab}</td><td>${fh(f)}</td><td>${vchip2(s.sys, SEM.evMV(s.sys, f, ST.val, s.dom))}</td></tr>`).join('');
    return `<div class="proof">${goalHTML('CONTRAEJEMPLO', ST.prem, ST.goal, '⊬', S.name)}
      <div class="cols"><div class="panel model">
        <div class="mlabel">VALORES</div>
        <div class="vals">${ST.atoms.map(a => `<div class="vrow"><span class="fm">${esc(a)}</span><span class="seg">${S.vals.map(v => `<button class="vbtn ${vcls(v)}${ST.val[a] === v ? ' on' : ''}" data-act="val" data-a="${a}" data-v="${v}" aria-pressed="${ST.val[a] === v}">${esc(SEM.vname(s.sys, v))}</button>`).join('')}</span></div>`).join('')}</div>
        <div class="mlabel">RESULTADO</div>
        <div class="tw"><table class="tbl vt"><tbody>${rows2}</tbody></table></div>
        <p class="cap">${ST.prem.length ? 'Mínimo de las premisas' : 'Sin premisas, el listón es'}: <b>${SEM.vname(s.sys, mins)}</b> · conclusión: <b>${SEM.vname(s.sys, cv)}</b> · ${ST.all ? '<b class="good">¡la conclusión queda por debajo!</b>' : 'la conclusión tiene que quedar por debajo'}</p>${fb ? `<p class="cap"><b>Cuidado:</b> ${esc(fb)}.</p>` : ''}
      </div><div class="side">${sayBox(ST.msg, true)}</div></div></div>`;
  }
  return `<div class="proof">
    ${sat ? `<div class="goal panel"><span class="gtag">QUE VALGAN</span><span class="seq">${ST.prem.map(fh).join('<span class="comma">,</span> ')}</span><span class="sys">${esc(S.name)}</span></div>` : goalHTML('CONTRAEJEMPLO', ST.prem, ST.goal, '⊬', S.name)}
    <div class="cols">
      <div class="panel model">
        <div class="mlabel">VALORES</div>
        <div class="vals">${ST.atoms.map(a => `<div class="vrow"><span class="fm">${esc(a)}</span><span class="seg">${S.vals.map(v => `<button class="vbtn ${vcls(v)}${ST.val[a] === v ? ' on' : ''}" data-act="val" data-a="${a}" data-v="${v}" aria-pressed="${ST.val[a] === v}">${esc(SEM.vname(s.sys, v))}</button>`).join('')}</span></div>`).join('')}</div>
        <div class="mlabel">RESULTADO</div>
        <div class="tw"><table class="tbl vt"><tbody>${rows}</tbody></table></div>
        <p class="cap">${s.dom ? `Dominio: {${s.dom.join(', ')}}; ∀ toma el mínimo y ∃ el máximo. ` : ''}Valores designados: ${S.des.map(v => SEM.vname(s.sys, v)).join(' y ')}.</p>
      </div>
      <div class="side">${sayBox(ST.msg, true)}</div>
    </div>
  </div>`;
}
const vchip2 = (sys, v) => `<span class="vchip ${vcls(v)}">${esc(SEM.vname(sys, v))}</span>`;

/* ----- tablas de verdad (de dos, tres o cuatro valores) ----- */
function scrTable() {
  const S = SEM.MV[ST.stage.sys];
  const head = ST.atoms.map(a => `<th>${fm(a)}</th>`).join('') + ST.cols.map(f => `<th class="fc">${fh(f)}</th>`).join('');
  const body = ST.rows.map((v, r) => `<tr>${ST.atoms.map(a => `<td><span class="tv ${vcls(v[a])}">${esc(SEM.vname(ST.stage.sys, v[a]))}</span></td>`).join('')}${ST.cols.map((f, c) => {
    const x = ST.cells[c][r], mk = ST.mark ? ST.mark[c][r] : '';
    return `<td class="fc"><button class="tcell${x == null ? ' empty' : ''}${mk ? ' ' + mk : ''}" data-act="tcell" data-c="${c}" data-r="${r}" ${ST.solved || mk === 'good' ? 'disabled' : ''}>${x == null ? '?' : esc(SEM.vname(ST.stage.sys, x))}</button></td>`;
  }).join('')}</tr>`).join('');
  const filled = ST.cells.every(col => col.every(x => x != null));
  return `<div class="proof">
    <div class="goal panel"><span class="gtag">TABLA</span><span class="seq">${ST.cols.map(fh).join('<span class="comma">,</span> ')}</span><span class="sys">${esc(S.name)} · ${ST.rows.length} filas</span></div>
    <div class="cols">
      <div class="panel model"><div class="tw"><table class="tbl tt"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div></div>
      <div class="side">${sayBox(ST.msg, true)}
        <div class="panel pal"><div class="acts">
          <button class="btn pri" data-act="tcheck" ${filled && !ST.solved ? '' : 'disabled'}>Comprobar</button>
          <button class="btn sm" data-act="tclear" ${ST.solved ? 'disabled' : ''}>Borrar todo</button></div>
          <p class="cap">Toca una casilla para ir cambiando su valor: ${S.vals.map(v => SEM.vname(ST.stage.sys, v)).join(', ')}.</p></div>
      </div>
    </div>
  </div>`;
}

/* ----- la máquina de árboles ----- */
const GOALTXT = {
  valid: 'Pon a prueba una inferencia válida.',
  invalid: 'Encuentra una inferencia inválida y mira su contramodelo.',
  own: 'Escribe tú una inferencia que no esté entre los ejemplos.',
  split: 'Haz que una misma inferencia sea válida en un sistema e inválida en otro.',
  gap: 'Encuentra una inferencia válida en la lógica clásica que aquí no lo sea.'
};
const argKey = (prem, concl) => prem.map(L.str).sort().join(',') + '⊢' + L.str(concl);
const labEx = e => ({ prem: e[0].map(L.parse), concl: L.parse(e[1]), sys: e[3] });
/* en la máquina de un capítulo de tablas (mv: true) se usan las tablas aunque el sistema también tenga árboles */
const isMV = id => !!SEM.MV[id] && (!TB.SYS[id] || !!(ST && ST.stage && ST.stage.mv));
function scrLab() {
  const s = ST.stage, off = ST.busy ? 'disabled' : '';
  const sysSel = `<span class="sysset">${s.sys.map(x => `<button class="btn sm${x === ST.sys ? ' on' : ''}" data-act="vsys" data-x="${esc(x)}" aria-pressed="${x === ST.sys}" title="${esc(sysName(x))}" ${off}>${esc(x)}</button>`).join('')}</span>`;
  const seq = `${ST.prem.map(fh).join('<span class="comma">,</span> ')} ${glyph('⊢')} ${ST.concl ? fh(ST.concl) : '<span class="qm">?</span>'}`;
  const prem = ST.prem.map((f, i) => `<button class="chip vc" data-act="vdel" data-i="${i}" title="Quitar" ${off}>${fh(f)}<i>${ico('cross')}</i></button>`).join('');
  const concl = ST.concl ? `<button class="chip vc" data-act="vdelc" title="Quitar" ${off}>${fh(ST.concl)}<i>${ico('cross')}</i></button>` : `<button class="chip add" data-act="vconc" ${off}>Escribir conclusión</button>`;
  const ex = s.ex.map((e, i) => { const x = labEx(e); return `<button class="chip ex" data-act="vex" data-i="${i}" ${off}>${x.prem.map(fh).join(', ')} ${glyph('⊢')} ${fh(x.concl)}${x.sys && s.sys.length > 1 ? `<small>${esc(x.sys)}</small>` : ''}</button>`; }).join('');
  const goals = s.goals.map(g => `<li class="${ST.got[g] ? 'on' : ''}">${ico(ST.got[g] ? 'check' : '□')}<span>${GOALTXT[g]}</span></li>`).join('');
  return `<div class="proof vlab">
    <div class="goal panel"><span class="gtag">MÁQUINA</span><span class="seq">${seq}</span>${sysSel}</div>
    <div class="cols">
      <div class="main">
        <div class="panel vbuild">
          <div class="mlabel">PREMISAS</div>
          <div class="chips">${prem}<button class="chip add" data-act="vadd" ${off}>+ Premisa</button></div>
          <div class="mlabel">CONCLUSIÓN</div>
          <div class="chips">${concl}</div>
          <div class="acts"><button class="btn pri" data-act="vrun" ${ST.concl && !ST.busy ? '' : 'disabled'}>${isMV(ST.sys) ? 'Calcular valores' : 'Construir árbol'}</button>
            <button class="btn sm" data-act="vclear" ${off}>Vaciar</button></div>
        </div>
        ${labResult()}
        <div class="panel vexs"><div class="mlabel">EJEMPLOS</div><div class="chips">${ex}</div></div>
      </div>
      <div class="side">${sayBox(ST.msg, true)}
        <div class="panel mis"><div class="mlabel">MISIONES</div><ul>${goals}</ul></div>
      </div>
    </div>
  </div>`;
}
function labResult() {
  const r = ST.res;
  if (!r) return '';
  const [cls, icon, word] = r.v === 'valid' ? ['good', 'check', 'VÁLIDA'] : r.v === 'invalid' ? ['no', 'cross', 'INVÁLIDA'] : ['unk', 'quiz', 'SIN DECIDIR'];
  const cmp = r.cmp ? `<p class="vcmp">En la lógica clásica: <b class="${r.cmp === 'valid' ? 'good' : 'no'}">${r.cmp === 'valid' ? 'válida' : r.cmp === 'invalid' ? 'inválida' : 'sin decidir'}</b></p>` : '';
  let body = '';
  if (r.tab) body = `<div class="sheet treebox small">${treeHTML(r.tab, { still: true, openLeaf: r.open && r.open.id })}</div>` + (r.model ? modelHTML(r.tab.sys, r.model, ST.prem, ST.concl) : '');
  else if (r.mv && r.mv.model) body = `<div class="mlabel">CONTRAEJEMPLO${r.mv.model.dom ? ' · DOMINIO {' + r.mv.model.dom.join(', ') + '}' : ''}</div><div class="gats">${r.mv.model.atoms.map(a => `<span class="gat">${fm(a)} ${vchip2(ST.sys, r.mv.model.vals[a])}</span>`).join('')}</div>`;
  return `<div class="panel vres ${cls}"><div class="vverd">${ico(icon)}<span>${word}</span><small>${esc(sysName(ST.sys))}</small></div>${cmp}${body}</div>`;
}
function labSay(r) {
  if (isMV(ST.sys)) {
    if (r.v === 'valid' && r.how === 'dom') return `${r.upto === 1 ? 'Un dominio de un objeto no da' : 'Ningún dominio de uno a ' + (r.upto === 2 ? 'dos' : 'tres') + ' objetos da'} un contraejemplo (revisé ${r.rows} valuaciones en el último). Es un buen indicio, no una prueba: los dominios pueden ser infinitos.`;
    if (r.v === 'valid' && r.how === 'grid') return `Ninguna de las ${r.rows} valuaciones de la cuadrícula (de décimo en décimo) la refuta. Es un buen indicio de validez, aunque no una prueba: en L los valores son infinitos.`;
    if (r.v === 'valid') return `¡Válida! Revisé las ${r.rows} valuaciones: en ninguna las premisas son designadas y la conclusión no.`;
    if (r.v === 'invalid') return 'Inválida. Con estos valores las premisas son designadas y la conclusión no.';
    return 'Son demasiadas letras para revisar la tabla entera.';
  }
  if (r.v === 'valid') return `¡Válida! Todas las ramas del árbol se cerraron (${r.tab.nodes.length} líneas).`;
  if (r.v === 'invalid') return 'Inválida. Quedó una rama abierta y completa, y de ella sale este contramodelo.';
  return 'No pude decidirlo: el árbol crece sin cerrarse y no encontré una rama terminada. Con cuantificadores, o con reglas como η, los árboles pueden ser infinitos.';
}
function labGoals(r) {
  const s = ST.stage, got = ST.got, key = argKey(ST.prem, ST.concl);
  const ex = s.ex.some(e => { const x = labEx(e); return argKey(x.prem, x.concl) === key; });
  if (r.v === 'valid') got.valid = 1;
  if (r.v === 'invalid') got.invalid = 1;
  if (!ex && r.v !== 'unknown') got.own = 1;
  if (r.v !== 'unknown') { const seen = ST.seen[key] = ST.seen[key] || {}; seen[r.v] = 1; if (seen.valid && seen.invalid) got.split = 1; }
  if (r.v === 'invalid' && r.cmp === 'valid') got.gap = 1;
  if (!ST.solved && s.goals.every(g => got[g])) {
    ST.solved = true;
    finish(3);
    const mine = ST;
    setTimeout(() => { if (ST === mine && V.scr === 'stage') winModal(3, '¡BIEN!', 'Misiones cumplidas'); }, 1400);
  }
}
function runCheck(sys, prem, concl) {
  if (isMV(sys)) { const m = SEM.checkMV(sys, prem, concl, ST.stage.fo ? true : undefined); return { v: m.v, rows: m.rows, mv: m, how: m.how, upto: m.upto }; }
  const r = TB.solve(sys, prem, concl, 500);
  const out = { v: r.verdict, tab: r.t, open: r.open };
  if (r.open) out.model = TB.readModel(r.t, r.open);
  return out;
}
function labRun() {
  if (!ST.concl || ST.busy) return;
  ST.busy = true; ST.res = null;
  say('hint', 'Construyendo el árbol…');
  render();
  const mine = ST;
  setTimeout(() => {
    if (ST !== mine) return;
    const s = ST.stage;
    let r;
    try { r = runCheck(ST.sys, ST.prem, ST.concl); } catch (e) { r = { v: 'unknown' }; }
    /* para comparar con la clásica, ⊐ y → se leen como ⊃ */
    const toCl = f => (f.t === 'ico' || f.t === 'arr' ? L.Bin('imp', toCl(f.a), toCl(f.b)) : f.b ? L.Bin(f.t, toCl(f.a), toCl(f.b)) : f.a ? (f.t === 'all' || f.t === 'ex' ? L.Qf(f.t, f.v, toCl(f.a)) : L.Un(f.t, toCl(f.a))) : f);
    if (s.cmp) { try { r.cmp = runCheck(s.cmp, ST.prem.map(toCl), toCl(ST.concl)).v; } catch (e) { r.cmp = 'unknown'; } }
    ST.busy = false; ST.res = r;
    say(r.v === 'valid' ? 'ok' : 'hint', labSay(r));
    if (r.v === 'valid') sfx.ok(); else sfx.page();
    labGoals(r);
    render();
  }, 60);
}
function labSug() {
  const out = [], seen = new Set();
  ST.stage.ex.forEach(e => [...e[0], e[1]].forEach(x => { const f = L.parse(x), k = L.str(f); if (!seen.has(k)) { seen.add(k); out.push(f); } }));
  return out.slice(0, 10);
}
const labEdit = (title, put) => openFormula(title, labSug(), f => { closeModal(); put(f); ST.res = null; say('info', tx(ST.stage.intro)); sfx.ok(); render(); });

/* ----- preguntas ----- */
function scrQuiz() {
  const s = ST.stage, q = s.qs[ST.i], solved = ST.picked === q.ok;
  return `<div class="quiz">
    <div class="pg">${s.qs.map((x, i) => `<i class="${i === ST.i ? 'on' : i < ST.i ? 'past' : ''}"></i>`).join('')}</div>
    <div class="dialog big" data-act="twskip"><div class="who">${owl(4, solved ? 'happy' : ST.bad.length ? 'sad' : 'think')}<span>RAMÓN</span></div><div class="say" data-tw="Q${V.w}-${V.s}-${ST.i}">${tx(q.q)}</div></div>
    <div class="qopts">${q.opts.map((o, i) => `<button class="btn qopt${solved && i === q.ok ? ' right' : ''}${ST.bad.includes(i) ? ' wrong' : ''}" data-act="qpick" data-i="${i}" ${solved || ST.bad.includes(i) ? 'disabled' : ''}>${tx(o)}</button>`).join('')}</div>
    ${solved ? `<div class="panel why"><b>${ico('check')} Correcto.</b> ${tx(q.why)}</div>
      <div class="tnav"><span></span><span></span><button class="btn pri" data-act="qnext"><span>${ST.i === s.qs.length - 1 ? 'Terminar' : 'Siguiente'}</span>${ico('next')}</button></div>`
      : ST.bad.length ? `<div class="panel why bad"><b>${ico('cross')} No es esa.</b> Piénsalo otra vez.</div>` : ''}
  </div>`;
}

/* ---------- ventanas ---------- */
function closeModal() {
  if (!modal.hidden) padKey = padKeyApp;
  modal.hidden = true; modal.innerHTML = ''; FD = null;
  padShow(); legend();
}
function showModal(html, cls) { modal.innerHTML = `<div class="mbox panel ${cls || ''}" role="dialog" aria-modal="true">${html}</div>`; if (modal.hidden) padKeyApp = padKey; modal.hidden = false; if (padOn) padSet(padDefault()); legend(); }

/* teclado de fórmulas: las letras y conectivas de la etapa */
function alphabet() {
  const s = ST.stage, preds = new Set(), nm = new Set();
  const fs = [...ST.prem, ...(ST.concl ? [ST.concl] : []), ...labSug()];
  let fo = false;
  fs.forEach(f => L.subformulas(f).forEach(g => {
    if (g.t !== 'atom') return;
    if (g.args.length) { fo = true; if (g.p !== '=') preds.add(g.p); g.args.forEach(a => { if (L.isTerm(a)) nm.add(a); }); }
    else preds.add(g.p);
  }));
  const syms = [...(s.syms || '¬∧∨⊃')];
  if (syms.includes('∀')) fo = true;
  (fo ? 'PQ' : 'pqr').split('').forEach(c => preds.add(c));
  const terms = fo ? [...new Set([...nm, 'a', 'b'])].sort().concat(['x', 'y']) : [];
  return { preds: [...preds].sort(), terms, syms, fo };
}
const KEYOF = { '¬': '~', '∧': '&', '∨': '|', '⊃': '>', '≡': '%', '□': '[', '◇': '<', '∀': '@', '∃': '?', '→': '-', '⊐': '}', '⥽': '$', '>': '¿', '=': '=' };
const KEYMAP = { '~': '¬', '!': '¬', '&': '∧', '^': '∧', '|': '∨', '>': '⊃', '%': '≡', '[': '□', '<': '◇', '@': '∀', '?': '∃', '-': '→', '}': '⊐', '$': '⥽', '=': '=', '(': '(', ')': ')' };
function openFormula(title, sug, onOK) {
  const al = alphabet();
  FD = { buf: '', onOK, sug, al };
  const key = (k, lab, cls) => `<button class="key ${cls || ''}" data-act="fkey" data-k="${esc(k)}">${lab || raw(k)}</button>`;
  showModal(`<h3>${tx(title)}</h3>
    ${sug.length ? `<div class="mlabel">SUGERENCIAS</div><div class="chips">${sug.map((f, i) => `<button class="chip" data-act="fsug" data-i="${i}">${fh(f)}</button>`).join('')}</div>` : ''}
    <div class="mlabel">O ESCRIBE OTRA</div>
    <div class="fdisp" id="fdisp"></div>
    <div class="fstat" id="fstat"></div>
    <div class="keys">
      <div class="krow">${al.preds.map(p => key(p)).join('')}${al.terms.map(t => key(t, null, 'term')).join('')}</div>
      <div class="krow">${al.syms.map(c => key(c)).join('')}${key('(')}${key(')')}${key('bs', ico('back') + ' Borrar', 'wide')}</div>
    </div>
    <div class="mrow"><button class="btn" data-act="mcancel">Cancelar</button><button class="btn pri" data-act="fok">Aceptar</button></div>
    <p class="cap kbd">Con teclado: ${al.syms.filter(c => KEYOF[c]).map(c => `<span><kbd>${esc(KEYOF[c])}</kbd>${raw(c)}</span>`).join('')}<span><kbd>Intro</kbd>aceptar</span></p>`, 'fdlg');
  fdRefresh();
}
function fdCheck() {
  try {
    const f = L.parse(FD.buf);
    if (!L.closed(f)) throw new L.LErr('Hay una variable suelta. Usa un nombre (a, b, c) o un cuantificador.');
    return { f };
  } catch (e) { if (e instanceof L.LErr) return { err: e.message }; throw e; }
}
function fdRefresh() {
  const d = document.getElementById('fdisp'), s = document.getElementById('fstat');
  if (!d) return;
  d.innerHTML = `<span class="fm">${raw(FD.buf)}</span><span class="caret"></span>`;
  if (!FD.buf) { s.className = 'fstat'; s.textContent = ''; return; }
  const r = fdCheck();
  s.className = 'fstat ' + (r.f ? 'good' : 'no');
  s.innerHTML = r.f ? ico('check') + ' Fórmula bien formada' : esc(r.err);
}
function fdKey(k) {
  if (k === 'bs') FD.buf = [...FD.buf].slice(0, -1).join('');
  else if ([...FD.buf].length < 48) FD.buf += k;
  sfx.sel();
  fdRefresh();
}
function fdOK() { const r = fdCheck(); if (r.err) { sfx.err(); fdRefresh(); return; } FD.onOK(r.f); }
function openSound() {
  const row = (lab, k) => `<div class="vol"><b>${lab}</b>
    <button class="btn sm" data-act="vol" data-k="${k}" data-d="-1" aria-label="Bajar ${lab.toLowerCase()}" ${save[k] <= 0 ? 'disabled' : ''}>-</button>
    <span class="vmeter" role="img" aria-label="${lab}: ${save[k]} de 5">${meter(save[k])}</span>
    <button class="btn sm" data-act="vol" data-k="${k}" data-d="1" aria-label="Subir ${lab.toLowerCase()}" ${save[k] >= 5 ? 'disabled' : ''}>+</button></div>`;
  showModal(`<h3>Volumen</h3>${row('Música', 'mv')}${row('Efectos', 'sv')}
    <div class="mrow"><button class="btn pri" data-act="mcancel">Listo</button></div>`, 'snddlg');
}
/* libro de reglas: las reglas del sistema de la etapa, dibujadas por el motor a partir de ejemplos */
function openBook() {
  const sys = ST.tab.sys;
  const rows = C.RULEBOOK(sys).map(r => `<div class="brow"><span class="rbtn static">${raw(r.id)}</span><div><b>${tx(r.name)}</b><p>${tx(r.desc)}</p></div></div>`).join('');
  const st = TB.structOf(sys).map(rid => `<div class="brow"><span class="rbtn static">${raw(rid === 'her' ? 'her.' : rid)}</span><div><b>${TB.STRUCT[rid].name}</b><p>${tx(TB.STRUCT[rid].desc)}</p></div></div>`).join('');
  showModal(`<h3>Reglas de ${esc(sysName(sys.id))}</h3><div class="book">${rows}${st}<div class="brow"><span class="rbtn static">×</span><div><b>Cierre</b><p>${tx(C.CLOSURE(sys))}</p></div></div></div>
    <div class="mrow"><button class="btn pri" data-act="mcancel">Cerrar</button></div>`, 'bookdlg');
}
function winModal(stars, word, detail) {
  const W = C.worlds[V.w], last = V.s === W.stages.length - 1;
  const outro = ST.stage.outro ? `<p class="outro">${tx(ST.stage.outro)}</p>` : '';
  showModal(`<div class="winowl">${owl(4, 'happy')}</div><div class="qed">${word}</div>
    <div class="bigstars">${starsHTML(stars)}</div>
    <p class="detail">${detail}</p>${outro}
    <div class="mrow"><button class="btn" data-act="again">Repetir</button><button class="btn" data-act="mcancel">Ver el árbol</button><button class="btn" data-act="toWorld">Etapas</button>
    <button class="btn pri" data-act="next"><span>${last ? 'Al mapa' : 'Siguiente'}</span>${ico('next')}</button></div>`, 'win');
}
function nextStage() {
  const W = C.worlds[V.w];
  if (V.s < W.stages.length - 1) go('stage', V.w, V.s + 1); else go('map');
}

/* ---------- acciones ---------- */
const ACT = {
  start() { sfx.ok(); go('map'); },
  title() { go('title'); },
  map() { go('map'); },
  toWorld() { go('world'); },
  sound() { openSound(); },
  vol(d) { save[d.k] = Math.max(0, Math.min(5, save[d.k] + (+d.d))); persist(); applySound(); sfx.sel(); render(); openSound(); },
  free() { save.free = !save.free; persist(); sfx.sel(); render(); },
  theme() { save.theme = { '': 'light', light: 'dark', dark: '' }[save.theme]; persist(); applyTheme(); sfx.sel(); render(); },
  wipe() {
    showModal(`<h3>¿Borrar todo el progreso?</h3><p>Se perderán las etapas completadas y las estrellas.</p>
      <div class="mrow"><button class="btn pri" data-act="mcancel">No, volver</button><button class="btn" data-act="wipeYes">Sí, borrar</button></div>`);
  },
  wipeYes() { save.done = {}; persist(); closeModal(); render(); },
  world(d) { if (!worldOpen(+d.w)) { sfx.err(); return; } sfx.sel(); go('world', +d.w); },
  stage(d) { if (!stageOpen(V.w, +d.s)) { sfx.err(); return; } sfx.sel(); go('stage', V.w, +d.s); },
  again() { go('stage'); },
  next() { nextStage(); },

  twskip() { twDone(); },
  tprev() { if (ST.page) { ST.page--; sfx.page(); render(); } },
  tnext() {
    if (!twDone()) return;
    if (ST.page < ST.stage.pages.length - 1) { ST.page++; sfx.page(); render(); return; }
    save.done[sid(V.w, V.s)] = 1; persist(); sfx.ok();
    nextStage();
  },

  tnode(d) {
    if (ST.type !== 'A' || ST.solved || ST.playing) return;
    const id = +d.i;
    ST.sel = ST.sel.filter(x => x > 0);
    const at = ST.sel.indexOf(id);
    if (at >= 0) ST.sel.splice(at, 1); else { ST.sel.push(id); if (ST.sel.length > 2) ST.sel.shift(); }
    ST.flash = null;
    sfx.sel(); render();
  },
  ttip(d) {
    if (ST.type !== 'A' || ST.solved || ST.playing) return;
    const id = -(+d.i);
    ST.sel = ST.sel.includes(id) ? [] : [id];
    ST.flash = null;
    sfx.sel(); render();
  },
  trule() {
    const ns = selNodes();
    if (ns.length !== 1) { sfx.err(); say('err', 'Toca primero una sola línea: la que quieres desarrollar.'); render(); return; }
    applyRule(ns[0].id, null);
  },
  tclose() {
    const ns = selNodes();
    if (!ns.length) { sfx.err(); say('err', 'Toca dos líneas de la misma rama que se contradigan.'); render(); return; }
    snapshot();
    ST.flash = null;
    after(ST.tab.tryClose(ns[0].id, ns[1] ? ns[1].id : null), 'Rama cerrada. ' + (ST.tab.status() === 'busy' ? 'Sigue con las demás.' : ''));
  },
  topen() {
    const tip = ST.sel.find(x => x < 0);
    if (!tip) { sfx.err(); say('err', 'Toca el final de una rama (○) para declararla abierta.'); render(); return; }
    snapshot();
    const r = ST.tab.declare(-tip);
    if (r.ok) ST.model = TB.readModel(ST.tab, ST.tab.node(-tip));
    after(r);
  },
  tstruct(d) {
    snapshot();
    const before = ST.tab.nodes.length;
    const r = ST.tab.applyStruct(d.r);
    ST.flash = r.ok ? before + 1 : null;
    after(r);
  },
  tpick(d) { applyRule(PK.id, PK.picks[+d.i]); },
  undo() { if (!ST.hist.length) return; ST.tab = ST.hist.pop(); ST.sel = []; ST.flash = null; ST.model = null; say('info', IDLE); sfx.page(); render(); },
  reset() { ST.tab = new TB.Tab(ST.stage.sys, ST.prem, ST.concl); ST.hist = []; ST.sel = []; ST.flash = null; ST.model = null; say('info', tx(ST.stage.intro || IDLE)); sfx.page(); render(); },
  hint() {
    ST.hints++;
    const extra = ST.stage.hints && ST.stage.hints[ST.hints - 1] ? tx(ST.stage.hints[ST.hints - 1]) + ' ' : '';
    say('hint', `<b>Pista ${ST.hints}.</b> ${extra}${hintText(ST.tab)}${ST.hints >= 3 ? ' <button class="btn sm" data-act="solve">Ver la solución</button>' : ''}`);
    sfx.page(); render();
  },
  solve() { playSolution(); },
  book() { openBook(); },

  fkey(d) { fdKey(d.k); },
  fsug(d) { FD.onOK(FD.sug[+d.i]); },
  fok() { fdOK(); },
  mcancel() { closeModal(); },

  tcell(d) {
    const c = +d.c, r = +d.r, vals = SEM.MV[ST.stage.sys].vals, x = ST.cells[c][r];
    ST.cells[c][r] = x == null ? vals[0] : vals[(vals.indexOf(x) + 1) % vals.length];
    if (ST.mark) ST.mark[c][r] = '';
    sfx.sel(); render();
  },
  tclear() { ST.cells = ST.cols.map(() => ST.rows.map(() => null)); ST.mark = null; say('info', tx(ST.stage.intro)); sfx.page(); render(); },
  tcheck() {
    ST.checks++;
    let bad = 0;
    ST.mark = ST.cols.map((f, c) => ST.rows.map((v, r) => { const ok = SEM.evMV(ST.stage.sys, f, v) === ST.cells[c][r]; if (!ok) bad++; return ok ? 'good' : 'bad'; }));
    if (bad) { sfx.err(); say('err', `Hay ${bad} ${bad === 1 ? 'casilla que no cuadra' : 'casillas que no cuadran'}, en rojo. Revisa el conector principal de esa columna.`); render(); return; }
    ST.solved = true;
    const stars = ST.checks === 1 ? 3 : ST.checks === 2 ? 2 : 1;
    finish(stars);
    say('ok', '¡Tabla correcta!');
    render();
    const mine = ST;
    setTimeout(() => { if (ST === mine && V.scr === 'stage') winModal(stars, '¡BIEN!', mine.checks === 1 ? 'Correcta a la primera' : mine.checks + ' comprobaciones'); }, 600);
  },
  val(d) {
    const vals = SEM.MV[ST.stage.sys].vals;
    ST.val[d.a] = vals.find(v => String(v) === d.v); ST.moves++;
    sfx.sel(); render();
    if (ST.all && !ST.solved) {
      ST.solved = true;
      const stars = ST.moves <= ST.atoms.length + 1 ? 3 : 2;
      finish(stars);
      const mine = ST;
      setTimeout(() => { if (ST === mine) winModal(stars, '¡BIEN!', mine.goal ? (SEM.MV[mine.stage.sys].glb ? 'La conclusión queda por debajo de las premisas: la inferencia es inválida.' : 'Premisas designadas y conclusión no: la inferencia es inválida.') : 'Todas designadas a la vez.'); }, 500);
    }
  },
  qpick(d) {
    const q = ST.stage.qs[ST.i], i = +d.i;
    if (i === q.ok) { ST.picked = i; sfx.ok(); } else { ST.bad.push(i); ST.wrong++; sfx.err(); }
    render();
  },
  vadd() { labEdit('Escribe una premisa', f => { ST.prem.push(f); }); },
  vconc() { labEdit('Escribe la conclusión', f => { ST.concl = f; }); },
  vdel(d) { ST.prem.splice(+d.i, 1); ST.res = null; sfx.page(); render(); },
  vdelc() { ST.concl = null; ST.res = null; sfx.page(); render(); },
  vclear() { ST.prem = []; ST.concl = null; ST.res = null; say('info', tx(ST.stage.intro)); sfx.page(); render(); },
  vex(d) {
    const x = labEx(ST.stage.ex[+d.i]);
    ST.prem = x.prem; ST.concl = x.concl;
    if (x.sys && ST.stage.sys.includes(x.sys)) ST.sys = x.sys;
    sfx.sel(); labRun();
  },
  vsys(d) { ST.sys = d.x; sfx.sel(); if (ST.concl) labRun(); else render(); },
  vrun() { labRun(); },
  qnext() {
    if (ST.i < ST.stage.qs.length - 1) { ST.i++; ST.picked = -1; ST.bad = []; sfx.page(); render(); return; }
    const stars = ST.wrong === 0 ? 3 : ST.wrong <= 2 ? 2 : 1;
    finish(stars);
    winModal(stars, '¡BIEN!', ST.wrong ? `${ST.wrong} ${ST.wrong === 1 ? 'fallo' : 'fallos'}` : 'Sin fallos');
  }
};
/* ---------- mando: cruceta, A, B, L, R, START y SELECT ---------- */
let padOn = false;
let padKey = null, padKeyApp = null, padClick = false;
const keyOf = e => Object.keys(e.dataset).sort().map(k => k + '=' + e.dataset[k]).join('&');
function padCands() {
  const rootEl = modal.hidden ? app : modal;
  return [...rootEl.querySelectorAll('button:not(:disabled)')].filter(e => e.offsetParent !== null && !e.classList.contains('locked'));
}
function padCur() { return padOn && padKey ? padCands().find(e => keyOf(e) === padKey) || null : null; }
function padShow() {
  document.querySelectorAll('.padf').forEach(e => e.classList.remove('padf'));
  const e = padCur();
  if (e) { e.classList.add('padf'); e.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
  return e;
}
function padDefault() {
  const c = padCands();
  return c.find(e => e.classList.contains('pri')) || c.find(e => !e.closest('.hud') && !e.closest('.tsnd')) || c[0] || null;
}
function padSet(e) { padOn = true; padKey = e ? keyOf(e) : null; padShow(); }
function padMove(dir) {
  const cur = padCur();
  if (!cur) { padSet(padDefault()); return; }
  const r0 = cur.getBoundingClientRect(), x0 = r0.left + r0.width / 2, y0 = r0.top + r0.height / 2;
  let best = null, bs = Infinity;
  padCands().forEach(e => {
    if (e === cur) return;
    const r = e.getBoundingClientRect(), dx = r.left + r.width / 2 - x0, dy = r.top + r.height / 2 - y0;
    const horiz = dir === 'left' || dir === 'right';
    const along = dir === 'left' ? -dx : dir === 'right' ? dx : dir === 'up' ? -dy : dy;
    if (along < 6) return;
    const overlap = horiz ? Math.min(r0.bottom, r.bottom) - Math.max(r0.top, r.top) : Math.min(r0.right, r.right) - Math.max(r0.left, r.left);
    const across = Math.abs(horiz ? dy : dx);
    const score = along + across * (overlap > 4 ? 0.4 : 2.6);
    if (score < bs) { bs = score; best = e; }
  });
  if (best) { padSet(best); sfx.sel(); }
}
function padPress(k) {
  AU.unlock();
  const inModal = !modal.hidden, T = V.scr === 'stage' && ST ? ST.type : '';
  if (k === 'up' || k === 'down' || k === 'left' || k === 'right') {
    if (!inModal && T === 'T' && (k === 'left' || k === 'right')) { ACT[k === 'left' ? 'tprev' : 'tnext'](); return; }
    padMove(k); return;
  }
  if (k === 'A') {
    if (!inModal && app.querySelector('.twh')) { twDone(); return; }
    const cur = padCur();
    if (cur) { padClick = true; try { cur.click(); } finally { padClick = false; } return; }
    if (!inModal && V.scr === 'title') { ACT.start(); return; }
    if (!inModal && T === 'T') { ACT.tnext(); return; }
    padSet(padDefault()); return;
  }
  if (k === 'B') {
    if (inModal) { if (modal.querySelector('.win')) ACT.toWorld(); else closeModal(); sfx.page(); return; }
    const back = app.querySelector('.hud [data-act]');
    if (back) { sfx.page(); back.click(); }
    return;
  }
  if (k === 'start') {
    if (inModal) { if (modal.querySelector('.snddlg')) closeModal(); return; }
    if (V.scr === 'title') ACT.start(); else if (T === 'A' && !ST.solved && !ST.playing) ACT.trule(); else openSound();
    return;
  }
  if (inModal) return;
  if (V.scr === 'map' || V.scr === 'world') {
    if (k === 'L' || k === 'R') {
      const w = V.w + (k === 'L' ? -1 : 1);
      if (V.scr === 'world' && w >= 0 && w < C.worlds.length && worldOpen(w)) { sfx.sel(); go('world', w); }
    }
    return;
  }
  if (T === 'T') { if (k === 'L') ACT.tprev(); if (k === 'R') ACT.tnext(); return; }
  if (T === 'A' && !ST.solved && !ST.playing) {
    if (k === 'L') ACT.undo();
    if (k === 'R') ACT.hint();
    if (k === 'select') openBook();
    return;
  }
  if (T === 'TT' && !ST.solved) {
    if (k === 'R' && ST.cells.every(col => col.every(x => x != null))) ACT.tcheck();
    if (k === 'select') ACT.tclear();
    return;
  }
  if (T === 'V' && !ST.busy) {
    if (k === 'R') labRun();
    if (k === 'select') ACT.vclear();
    if (k === 'L' && ST.stage.sys.length > 1) { const ss = ST.stage.sys; ACT.vsys({ x: ss[(ss.indexOf(ST.sys) + 1) % ss.length] }); }
    return;
  }
  if (T === 'Q' && k === 'R') { const n = app.querySelector('[data-act=qnext]'); if (n) n.click(); }
}
function legend() {
  const el = document.getElementById('legend');
  if (!el) return;
  const T = V.scr === 'stage' && ST ? ST.type : '';
  let items;
  if (!modal.hidden) items = [['A', 'elegir'], ['B', modal.querySelector('.win') ? 'etapas' : 'cerrar']];
  else if (V.scr === 'title') items = [['A', 'jugar'], ['START', 'jugar']];
  else if (V.scr === 'map') items = [['A', 'entrar'], ['B', 'portada'], ['START', 'volumen']];
  else if (V.scr === 'world') items = [['A', 'entrar'], ['B', 'mapa'], ['L R', 'otro capítulo']];
  else if (T === 'T') items = [['A', 'seguir'], ['B', 'salir'], ['L R', 'página']];
  else if (T === 'A') items = [['A', 'elegir'], ['START', 'aplicar'], ['B', 'salir'], ['L', 'deshacer'], ['R', 'pista'], ['SELECT', 'reglas']];
  else if (T === 'TT') items = [['A', 'cambiar'], ['B', 'salir'], ['R', 'comprobar'], ['SELECT', 'borrar']];
  else if (T === 'V') items = [['A', 'elegir'], ['B', 'salir'], ['R', 'construir'], ...(ST.stage.sys.length > 1 ? [['L', 'sistema']] : []), ['SELECT', 'vaciar']];
  else if (T === 'Q') items = [['A', 'elegir'], ['B', 'salir'], ['R', 'siguiente']];
  else items = [['A', 'elegir'], ['B', 'salir'], ['START', 'volumen']];
  el.innerHTML = items.map(([k, t]) => `<b>${k}</b> ${t}`).join(' · ');
}
document.querySelector('.pad').addEventListener('click', e => {
  const b = e.target.closest('[data-pad]');
  if (b) { padPress(b.dataset.pad); b.blur(); }
});
['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'].forEach(ev => document.addEventListener(ev, () => AU.unlock(), true));
document.addEventListener('click', e => {
  if (e.target.closest('.pad')) return;
  if (!padClick && e.isTrusted && padOn) { padOn = false; padShow(); }
  const b = e.target.closest('[data-act]');
  if (!b || b.disabled) { if (e.target === modal && !modal.querySelector('.win')) closeModal(); return; }
  const fn = ACT[b.dataset.act];
  if (fn) fn(b.dataset, b);
});
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key.toLowerCase() === 'z' && V.scr === 'stage' && ST.type === 'A' && modal.hidden) { e.preventDefault(); ACT.undo(); return; }
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const DIR = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }[e.key];
  if (DIR) { e.preventDefault(); padPress(DIR); return; }
  if (!modal.hidden && FD) {
    if (e.key === 'Escape') { closeModal(); return; }
    const al = FD.al;
    if (e.key === 'Enter') { e.preventDefault(); const cur = padCur(); if (cur) padPress('A'); else fdOK(); return; }
    if (e.key === 'Backspace') { e.preventDefault(); fdKey('bs'); return; }
    let k = KEYMAP[e.key];
    if (k && k !== '(' && k !== ')' && !al.syms.includes(k)) k = null;
    if (!k && /^[a-zA-Z]$/.test(e.key)) {
      if (al.preds.includes(e.key)) k = e.key;
      else if (al.terms.includes(e.key)) k = e.key;
    }
    if (k) { e.preventDefault(); fdKey(k); }
    return;
  }
  const onCtl = e.target.matches && e.target.matches('button');
  if ((e.key === 'Enter' || e.key === ' ') && onCtl) return;
  const PADKEY = { z: 'A', x: 'B', a: 'L', s: 'R', enter: 'start', backspace: 'select', escape: 'B' }[e.key.toLowerCase()];
  if (PADKEY) { e.preventDefault(); padPress(PADKEY); }
});

/* icono de pestaña */
try {
  if (PULPO.neutral) {
    const link = document.createElement('link');
    link.rel = 'icon'; link.href = PULPO.neutral.base;
    document.head.appendChild(link);
  }
} catch (e) { /* sin icono */ }

window.LogicaArboles = { go, render, state: () => ST, owl, save, act: ACT };
render();
})();
