#!/usr/bin/env bash
# Corre las pruebas rápidas del juego (sin navegador). Uso, desde la raíz del proyecto:  bash tests/todas.sh
# Cada prueba imprime sus resultados; hay que leerlos (no devuelven código de error por sí solas).
set -u
cd "$(dirname "$0")/.."
echo "== sintaxis";  node -e "const s=require('fs').readFileSync('frente-de-acero.html','utf8');require('fs').writeFileSync('/tmp/_fda.js',s.split('<script>')[1].split('</script>')[0])" && node --check /tmp/_fda.js && echo OK
echo "== mapas (20 mapas x 3 proporciones)"; node tests/mapas.js | tail -6
echo "== salida";      node tests/salida.js | tail -1
echo "== cola";        node tests/cola.js | tail -7
echo "== reunión";     node tests/reunion.js | tail -3
echo "== artillería";  node tests/artilleria.js | tail -5
echo "== comandante";  node tests/comandante.js | tail -5
echo "== médico";      node tests/medico.js | tail -2
echo "== doble click"; node tests/doble-click.js | tail -3
echo "== lagunas";     node tests/lagunas.js | tail -1
echo "== partida contra jugador que solo defiende"; timeout 150 node tests/run.js frente-de-acero.html def | tail -1
