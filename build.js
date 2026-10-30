/* Une src/ en un solo archivo: «Logica por Arboles.html», el juego para abrir en el PC
   (fuentes, fondos y dibujos de Ramón incrustados: funciona sin internet). */
const fs = require('fs'), path = require('path');
const src = f => fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');
const b64 = f => fs.readFileSync(f).toString('base64');

const FONTS = [['Jersey 20', 'jersey20.woff2'], ['VT323', 'vt323.woff2'], ['Press Start 2P', 'pressstart2p.woff2']];
const fontCss = FONTS.map(([name, file]) =>
  `@font-face { font-family: '${name}'; font-style: normal; font-weight: 400; font-display: block; src: url(data:font/woff2;base64,${b64(path.join(__dirname, 'src', 'fonts', file))}) format('woff2'); }`).join('\n');

/* fondos de los mundos (tools/fondos.py): src/bg/w<k>.png pasa a la variable --img-w<k> */
const bgDir = path.join(__dirname, 'src', 'bg');
const bgs = fs.existsSync(bgDir) ? fs.readdirSync(bgDir).filter(f => /^(w\d+|title)\.png$/.test(f)).sort() : [];
const bgCss = bgs.length ? ':root {\n' + bgs.map(f => `  --img-${f.slice(0, -4)}: url(data:image/png;base64,${b64(path.join(bgDir, f))});`).join('\n') + '\n}' : '';

/* color de cada capítulo (en el orden del mapa): insignia, velo del fondo y cuadros de la pantalla */
const WCOL = ['#45cfe6', '#ff8f6b', '#4d95ff', '#8f7bff', '#5cc83c', '#ffb02e', '#ad6cf5', '#ff6fa8', '#ffd54a', '#7ee081', '#3fd0c9', '#c9b8ff',
  '#ff8fc7', '#5aa9ff', '#f2c38b', '#2fd6a8', '#ffa94d', '#9fd4ff', '#ff7a7a', '#c48b5a', '#6fa0c8', '#b48cff', '#ffcf6a', '#59e0b0', '#9ad35a', '#e06aff', '#d8d0c0'];
const wCss = WCOL.map((c, k) => `:root { --w${k}: ${c}; }
.screen.w${k} { --bg: color-mix(in srgb, ${c} 38%, #141236); --bg2: color-mix(in srgb, ${c} 30%, #100e2c); --bgimg: var(--img-w${k}); }`).join('\n');

/* Ramón: src/pulpo/<expresión>.png y, si existen, <expresión>-blink.png y <expresión>-talk.png */
const MOODS = ['neutral', 'happy', 'sad', 'think', 'brave'];
const pDir = path.join(__dirname, 'src', 'pulpo');
const uri = f => (fs.existsSync(path.join(pDir, f)) ? 'data:image/png;base64,' + b64(path.join(pDir, f)) : undefined);
const pulpo = {};
MOODS.forEach(m => { const base = uri(m + '.png'); if (base) pulpo[m] = { base, blink: uri(m + '-blink.png'), talk: uri(m + '-talk.png') }; });

/* contenido: content.js (piezas comunes) y un archivo por capítulo en src/worlds/ */
const wDir = path.join(__dirname, 'src', 'worlds');
const worlds = fs.readdirSync(wDir).filter(f => /^w\w+\.js$/.test(f)).sort().map(f => fs.readFileSync(path.join(wDir, f), 'utf8'));
const js = [src('logic.js'), src('tableau.js'), src('sem.js'), src('content.js'), ...worlds, 'window.CONTENT.finish();', src('ui.js')].join('\n');
if (/<\/script/i.test(js)) throw new Error('el código contiene </script> y rompería la página');

const html = src('index.template.html')
  .replace('/*CSS*/', () => fontCss + '\n' + bgCss + '\n' + src('style.css') + '\n' + wCss)
  .replace('/*COMMON*/', () => src('music.js') + `\nwindow.LA_PULPO = ${JSON.stringify(pulpo)};`)
  .replace('/*MAIN*/', () => js);
const out = path.join(__dirname, 'Logica por Arboles.html');
fs.writeFileSync(out, html);
fs.writeFileSync(path.join(__dirname, 'index.html'), html);   // GitHub Pages
console.log(`${out} ${Math.round(html.length / 1024)} KB · ${bgs.length} fondos · ${Object.keys(pulpo).length} expresiones de Ramón`);
module.exports = { html };
