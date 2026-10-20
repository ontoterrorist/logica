"""Fondos de los mundos: una escena por mundo (256×192), hecha con PixelLab, detrás de las etapas y de la lista de etapas.

   python tools/fondos.py hacer [claves]   genera los que falten (o las claves dadas, aunque existan) y los pule
   python tools/fondos.py pulir            vuelve a pasar gen/bg/<clave>-0.png a src/bg/<clave>.png
   python tools/fondos.py hoja             gen/fondos.png con todos, para revisarlos

   Claves: w<k>, con k el número del mundo (la clave k de content.js). El dibujo original queda en gen/bg/; a src/bg/
   llega «pulido»: con pocos colores y un poco más oscuro, para que no compita con los paneles. build.js lo incrusta.
   Usa el cliente de PixelLab de Metaphysics Advance (../metaphysics-advance/tools/pixellab.py)."""
import io, json, os, subprocess, sys, time
from PIL import Image, ImageDraw, ImageEnhance

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN, ART = os.path.join(HERE, 'gen', 'bg'), os.path.join(HERE, 'src', 'bg')
CLIENT = os.path.join(HERE, '..', 'metaphysics-advance', 'tools', 'pixellab.py')
W, H = 256, 192
STYLE = ('pixel art background for a Game Boy Advance RPG in the style of Mario and Luigi Superstar Saga, wide scenic view, '
         'rich saturated colors, dark moody palette, clean shapes, calm empty foreground, no characters, no people, no animals, no text, no letters, no UI')
SCENES = {
    'w0': 'a cozy mountain base camp at dusk: a canvas tent and a small campfire with a lantern in the foreground, backpacks and a map by the fire, '
          'dark pine trees, tall snowy mountains behind, deep teal and indigo twilight sky with the first stars',
    'w1': 'a wide rolling green prairie with soft hills, patches of yellow and white wildflowers, a winding dirt path, a few round trees, '
          'warm late afternoon light, deep blue sky with big puffy clouds',
    'w2': 'inside a deep enchanted forest: tall dark tree trunks in rows, teal moss, ferns, glowing fireflies, beams of pale light, '
          'misty teal and emerald greens',
    'w3': 'a night archipelago: many small round islands scattered on a calm dark blue sea, each island with a palm tree or a tiny lighthouse '
          'shining, starry sky, reflections on the water',
    'w4': 'a tall stone citadel with towers, banners and a gate on a hill, stone walls and a bridge, violet and purple dusk sky, '
          'lit windows, distant mountains',
    'w5': 'interior of a warm craftsman workshop: wooden workbench with tools, gears, cogs, wooden planks and a hanging oil lamp, '
          'shelves with jars, orange and amber light, brick wall',
    'w6': 'a dark underground cave full of large glowing pink and crimson crystals, stalactites, a still underground pool reflecting the crystals, '
          'deep magenta shadows',
    'w7': 'a quiet garden at twilight: trimmed hedges, a small stone fountain, cherry blossom trees with pink petals, '
          'a gravel path and paper lanterns, soft pink and violet sky',
    'w8': 'an immense dark abyss: floating broken rock platforms over a bottomless chasm, impossible stone stairs that loop back on themselves, '
          'cold grey-lavender mist, faint distant lights in the depths',
    'w9': 'a very tall ancient stone tower rising into a starry night sky with a mint green aurora, glowing mint windows spiraling up the tower, '
          'rocky ground, distant hills',
}
PY = sys.executable

def request(key, seed=7):
    return dict(description=SCENES[key] + ', ' + STYLE, width=W, height=H, no_background=False, view='side', outline='lineless', detail='medium detail', seed=seed)

def polish(key):
    """pocos colores y un velo oscuro: el fondo queda detrás de los paneles"""
    im = Image.open(os.path.join(GEN, key + '-0.png')).convert('RGB')
    if im.size != (W, H): sys.exit('%s mide %dx%d' % (key, im.width, im.height))
    im = ImageEnhance.Color(im).enhance(1.05)
    im = Image.blend(im, Image.new('RGB', im.size, (18, 14, 40)), .18)
    im = im.quantize(colors=40, method=Image.MEDIANCUT, dither=Image.NONE).convert('RGB')
    os.makedirs(ART, exist_ok=True)
    im.save(os.path.join(ART, key + '.png'), optimize=True)

a = sys.argv[1:]
if a[:1] == ['hacer']:
    os.makedirs(GEN, exist_ok=True)
    seed = int(a[a.index('--seed') + 1]) if '--seed' in a else 7
    keys = [k for k in a[1:] if k in SCENES]
    todo = keys or [k for k in SCENES if not os.path.exists(os.path.join(GEN, k + '-0.png'))]
    bad = []
    for key in todo:
        req, png = os.path.join(GEN, key + '.json'), os.path.join(GEN, key + '-0.png')
        with io.open(req, 'w', encoding='utf-8') as fh: fh.write(json.dumps(request(key, seed), indent=1))
        if os.path.exists(png): os.replace(png, os.path.join(GEN, key + '-anterior.png'))
        for intento in range(3):   # la red se corta a ratos: se espera y se reintenta
            r = subprocess.run([PY, CLIENT, 'gen', 'create_image_pixen', '@' + req, '--out', GEN, '--name', key], cwd=HERE,
                               capture_output=True, text=True, encoding='utf-8', errors='replace', env=dict(os.environ, PYTHONIOENCODING='utf-8'))
            if os.path.exists(png) or 'getaddrinfo' not in r.stdout + r.stderr: break
            time.sleep(30)
        if not os.path.exists(png): bad.append(key); print(key, 'falló:', (r.stdout + r.stderr)[-400:], flush=True); continue
        polish(key); print(key, flush=True)
    print(('fallaron: ' + ', '.join(bad)) if bad else 'todos hechos')
elif a[:1] == ['pulir']:
    ks = [k for k in SCENES if os.path.exists(os.path.join(GEN, k + '-0.png'))]
    for k in ks: polish(k)
    print(len(ks), 'pulidos')
elif a[:1] == ['hoja']:
    fs = sorted(f for f in os.listdir(ART) if f.endswith('.png')) if os.path.isdir(ART) else []
    N, S2 = 4, 2
    S = Image.new('RGB', (N * (W * S2 + 8) + 8, ((len(fs) + N - 1) // N) * (H * S2 + 24) + 8), (20, 18, 40)); D = ImageDraw.Draw(S)
    for i, f in enumerate(fs):
        x, y = 8 + (i % N) * (W * S2 + 8), 8 + (i // N) * (H * S2 + 24)
        S.paste(Image.open(os.path.join(ART, f)).convert('RGB').resize((W * S2, H * S2), Image.NEAREST), (x, y)); D.text((x + 4, y + H * S2 + 4), f[:-4], fill=(255, 244, 214))
    S.save(os.path.join(HERE, 'gen', 'fondos.png')); print('gen/fondos.png', len(fs))
else: sys.exit(__doc__)
