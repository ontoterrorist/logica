# Lógica por Árboles

Juego de estilo Game Boy Advance para aprender **árboles (tableaux)** de lógicas no clásicas, siguiendo capítulo a capítulo *An Introduction to Non-Classical Logic: From If to Is* de Graham Priest (2.ª ed.). Te acompaña Ramón, un pulpo.

**Jugar:** https://positiveric.github.io/logica/

- 27 mundos: de la lógica clásica y las modales a la intuicionista, FDE, las relevantes, las difusas, las lógicas libres y sus versiones cuantificadas.
- Construyes árboles regla a regla, cierras ramas y lees contramodelos; en los capítulos multivaluados, buscas valores que refuten.
- Cada mundo termina con una máquina para probar tus propias inferencias.

Los textos son paráfrasis propias en español; no reproducen el libro.

## Desarrollo

```
node build.js            # genera index.html y «Logica por Arboles.html»
node test.js             # comprueba todas las etapas
node tools/engine-test.js
```
