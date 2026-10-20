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
STYLE = ('pixel art background for a Game Boy Advance RPG in the style of Mario and Luigi Superstar Saga, wide scenic view, sea and ocean theme, '
         'rich saturated colors, dark moody palette, clean shapes, calm empty foreground, no characters, no people, no text, no letters, no UI')
SCENES = {
    'w0': 'a wooden pier at dawn over a calm sea, ropes, crates and a small rowing boat, lanterns, soft pink and teal sky reflected in the water',
    'w1': 'a bright tropical coral reef underwater, colorful corals and sea anemones, clear turquoise water, sun rays from the surface, small bubbles',
    'w2': 'underwater view of many large floating bubbles, each bubble containing a tiny green island with a palm tree, deep blue water, light rays',
    'w3': 'deep ocean currents drawn as glowing streams connecting rocky outcrops, long jellyfish trailing light, an hourglass-shaped rock arch, indigo water',
    'w4': 'a sunken wooden shipwreck lying on the sea floor, broken mast, barnacles, dim green water, scattered barrels and an anchor',
    'w5': 'a stone lighthouse on a cliff seen from just under the sea surface, beam of light through the water, waves above, dusk colors',
    'w6': 'an underwater cave with neat stacked stone blocks like a construction site, glowing blue crystals, a narrow opening to blue water',
    'w7': 'open sea underwater divided into three horizontal layers of colored water, warm on top, violet in the middle, dark at the bottom, fish swimming between layers',
    'w8': 'a quiet mangrove lagoon at dusk seen half above and half below the water line, roots in the water, four kinds of seaweed, fireflies',
    'w9': 'a tall kelp forest underwater with impossible floating rocks and stone stairs that loop back on themselves, green and gold light',
    'w10': 'a deep ocean abyss trench, bioluminescent creatures and glowing tube worms, dark navy water, thin threads of light connecting three rocks',
    'w11': 'a misty foggy sea surface at dawn, blurry silhouettes of small boats fading into the fog, pale lavender and grey colors',
    'w12': 'an underwater coral garden full of colorful fan corals in many shades from pink to purple, seahorses, soft blue light',
    'w13': 'the open ocean far from any coast underwater, deep blue, a large school of silver fish forming a swirl, light rays',
    'w14': 'a small sandbar island in the sea with faint ghostly outlines of animals that are not there, palm tree, calm water, moonlight',
    'w15': 'a steady underwater current flowing over long sand dunes, sea grass all bent in the same direction, teal water',
    'w16': 'rocky tide pools at low tide on a beach, starfish and crabs in the pools, some pools full and some half empty, golden afternoon light',
    'w17': 'two identical ancient stone statues facing each other on the sea floor, mosaics, ruins, blue-green water and sun rays',
    'w18': 'a perfectly still sea surface at sunset like a mirror, rocks and their reflections, pink and orange sky',
    'w19': 'inside a large sunken galleon, wooden decks, hanging lanterns, treasure chests, dim teal water and floating dust',
    'w20': 'an old sunken harbor underwater with stone docks, mooring posts, big anchors and chains, schools of small fish',
    'w21': 'a cave of large glowing crystals in purple and white, some crystals being assembled like building blocks, an underwater pool',
    'w22': 'a sea with many shimmering bands of colored water from gold to violet, bubbles and small jellyfish, dreamy light',
    'w23': 'a lagoon at night with glowing fireflies over the water and glowing plankton in the water, mangroves, dark blue',
    'w24': 'an underwater kelp forest with Escher-like impossible stone stairs and arches, floating rocks, green and violet light',
    'w25': 'the deepest ocean trench at night, an anglerfish with a glowing lure, tiny glowing particles, black-blue water',
    'w26': 'underwater sand dunes under thick fog, a heap of sand grains slowly drifting, soft beige and grey, faint sunlight',
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
