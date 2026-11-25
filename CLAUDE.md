# Frente de Acero

Juego de estrategia en tiempo real para navegador, de un solo jugador contra la IA. Tablero de hexágonos, estética de
Segunda Guerra. Todo el juego vive en **un único archivo**: `frente-de-acero.html` (HTML + CSS + JS, sin librerías ni
build). Se juega abriendo ese archivo en Chrome.

## Con quién trabajás

- Cristian escribe en español rioplatense informal. **Respondé siempre en español.**
- Primero el resultado, después el detalle. Sé preciso: decí qué probaste y qué no; si algo no se pudo verificar, decilo.
- Pide cambios chicos y seguidos, y prueba enseguida recargando el archivo (F5). No rompas lo que ya funciona.
- Si un pedido es ambiguo o contradice uno anterior, explicá el conflicto en dos líneas y proponé una opción; no adivines
  en cambios grandes. Para cambios grandes le gusta que le cuentes el plan antes de empezar.
- Cuando descubre un desequilibrio jugando, quiere el ajuste más una explicación corta de por qué pasaba.

## Reglas de trabajo en el código

- **Un solo archivo.** No separar en módulos, no agregar dependencias, no agregar build. El juego debe seguir
  abriéndose con doble click.
- Estilo actual: una IIFE con `'use strict'`, `var` y funciones clásicas (ES5), comentarios en español que explican el
  porqué. Mantenelo.
- Sin código muerto: si sacás una función, sacá también sus restos (variables, CSS, botones, comentarios viejos).
- Después de cada cambio: `bash tests/todas.sh` y leer la salida. Para cambios visuales, mirar el juego en un navegador
  (ver "Pruebas").
- La IA juega con las mismas reglas que el jugador y **no recibe oro de más** en ningún nivel (pedido explícito).
- Los mapas salen de un sorteo con semilla (`seedMap`, `MR()`): el mismo número de mapa tiene que dar siempre el mismo
  mapa. Cualquier cambio en `buildGrid`/`genTerrain` cambia los 20 mapas: avisarlo y regenerar la lámina.

## Cómo es el juego (estado actual)

- **Tablero:** hexágonos de punta arriba, unas 76 x 48 celdas en una pantalla apaisada (toma la forma de la ventana al
  empezar la partida; `fitGrid`, `MAP_WIDE`, `MAP_TALL`). Hasta 3 fichas propias por hexágono (`STACK`). Las fichas
  siempre terminan paradas en el centro de un hexágono y avanzan de hexágono en hexágono.
- **Terreno:** pasto, bosques (frenan vehículos, dan cobertura), caminos (más rápido; 4 esquemas de trazado), río
  (vadeable, lento; puentes donde lo cruza un camino), lagunas (no se pasan), 3 pueblos (10 de oro, cobertura),
  10 banderas libres (6 de oro). 20 mapas; casi la mitad con el frente en diagonal (`diag`, `symK`, `sideD`).
- **Edificios por bando:** 4 fábricas (tanque, antitanque, artillería) y 1 cuartel, la carpa con la estrella
  (infantería, médico, comandante). `PROD` dice qué sale de cada uno. Cola de hasta 5 encargos por edificio, se paga
  al encargar, se puede cancelar con reembolso; punto de reunión opcional. Un edificio capturado fabrica al doble de
  tiempo y rinde la mitad de oro.
- **Fichas** (`TYPES`, `MULT`, `COST`, `BUILD`): infantería, tanque, antitanque (triángulo: antitanque > tanque >
  infantería > antitanque), médico (cura de a una ficha, la más dañada, a su lado; no se cura solo), artillería
  (alcance largo, no tira a lo que tiene pegado, ignora coberturas; ficha cuadrada) y comandante (+25% de daño a las
  fichas propias a 2 hexágonos; no se acumula).
- **Economía:** oro por lugar cada 10 s (no hace falta ficha encima), más un extra por minuto según el territorio
  (`TERR_GOLD`). Tope de fichas: 5 por lugar propio (`SUPPLY`).
- **Victoria:** dejar al otro sin fábricas ni cuartel, o controlar el 90% del territorio.
- **IA** (`aiThink`, `aiPick`, `LEVELS`): 3 niveles. Sortea una "doctrina" por partida, compra por pesos según lo que
  tenga el jugador, deja guarnición en sus edificios, manda fichas sueltas a tomar lugares sin defensa y ataca en
  oleadas. Nivel 3 además retira las fichas malheridas hacia sus médicos y mezcla tipos en la oleada.
- **Controles** (estilo Age of Empires): click izquierdo selecciona, arrastre izquierdo recuadro, Shift suma, doble
  click todas las de ese tipo en pantalla, click derecho orden (mover / atacar / menú del edificio / punto de reunión),
  Ctrl+1..9 grupos, Espacio centra en la selección, H cuartel, F fábricas, coma u O ficha ociosa, A todas, X atacar,
  P pausa, M panel. La vista se mueve con los bordes de la ventana, las flechas, el botón del medio o el minimapa;
  rueda = zoom. El botón de pantalla completa además captura el mouse (Pointer Lock) y dibuja una flecha propia
  (`lockFix`, `#fakeCur`), para que no se escape a un segundo monitor.
- **Interfaz:** panel inferior ocultable con minimapa, territorio, oro, reloj, pausa, atacar, pantalla completa y menú
  (velocidad, dificultad, elegir mapa 1 a 20, reiniciar). Los recuadros flotantes (pila de fichas, menú del edificio)
  tienen tamaño fijo en pantalla (`uiU`).

## Mapa del código (`frente-de-acero.html`)

En orden aproximado de aparición dentro del `<script>`:

- Constantes de balance: `TYPES`, `MULT`, `PROD`, `COST`, `BUILD`, `LEVELS`, `DOCTRINES`, `SUPPLY`, `FORT`, coberturas.
- Geometría y mapa: `buildGrid` (grilla, caminos con `meander`/`link`, pueblos, fábricas, banderas, río con
  `traceRiver`/`riverFaults`, lagunas), `fitGrid`, `genTerrain` (bosques), `paintTerrain` (pinta el terreno una vez en
  `terrCv`).
- Partida: `init` (arma la partida; `init(true)` repite el mapa), `spawn`, colas (`canBuy`, `buy`, `cancelBuild`,
  `tickBuild`), movimiento (`order`, `setDest`, `advance`, `cellsFor`, `canEnter`), rutas (`stepCost`, `getField`:
  Dijkstra desde el destino con caché), `update` (combate, capturas, economía), `claim` (territorio), `aiThink`.
- Dibujo: `rebuildBoardCache` (línea de frente y lienzo `veilCv` = terreno + velo de territorio, repintado solo en los
  hexágonos que cambian), `drawBoard`, `drawBuilding`/`drawHQ`/`drawFactory`, `drawCity`, `drawUnit`, `icon`,
  `drawMenu`, `drawStackPanel`, `drawMinimap`, `draw`.
- Entrada: eventos de puntero sobre el lienzo, teclado, minimapa, pantalla completa y captura del mouse, `frame`.

Datos por celda en arreglos tipados indexados por `k = fila*GX + columna`: `hx/hy` (centro), `nb` (6 vecinos),
`own` (dueño: 1 azul, -1 rojo), `terr`, `road`, `river`, `water`, `lake`, `town`.

## Pruebas

Sin navegador (rápidas), desde la raíz:

```bash
bash tests/todas.sh
```

- `tests/run.js` es el arnés: simula el DOM y el canvas, carga el `<script>` del juego y expone ganchos (`__u` fichas,
  `__c` lugares, `__g` oro, `__t` terreno, `__map(n)`, etc.). `node tests/run.js frente-de-acero.html def|play|idle`
  juega una partida entera contra un jugador simulado y avisa de fichas superpuestas, pilas de más de 3 o fichas a
  mitad de camino.
- `tests/mapas.js` valida los 20 mapas en 3 proporciones de pantalla (caminos conectados, río con puentes, nada sobre
  agua, cantidades). Las demás (`cola`, `reunion`, `artilleria`, `comandante`, `medico`, `doble-click`, `lagunas`,
  `salida`) prueban una regla cada una.
- `tests/duelo.js <semilla>` (con `LV=1|2|3`): la IA contra un bot que usa la táctica vieja. Sirve para detectar
  errores en partidas largas (tarda 1 a 3 minutos), no para medir dificultad real.
- Las pruebas imprimen resultados; no fallan con código de error. Hay que leerlas. Si cambiás una regla, actualizá la
  prueba y su texto.

Con navegador (visual): no hay ganchos dentro de la página (todo está en una IIFE), así que se prueba con capturas.
`tools/galeria.py` usa Playwright; sirve de ejemplo para automatizar Chrome. `python3 tools/galeria.py` regenera
`mapas-frente-de-acero.html` (la lámina con los 20 mapas y un botón JUGAR que abre `frente-de-acero.html#N`).

## Pendientes y cosas sabidas

- Soporte táctil: postergado a pedido de Cristian.
- Ideas que mencionó y no se hicieron: niebla de guerra, ingenieros, municiones (esta última no la recomendamos).
- La dificultad real de los niveles 2 y 3 no está medida: contra el bot el nivel 3 quedó parecido al 2.
- En mapas en diagonal los caminos siguen dibujados en espejo izquierda-derecha, así que no son idénticos para los dos
  bandos.
- La IA no busca cobertura y sus rutas no esquivan hexágonos ocupados.
- Con el mapa grande las partidas duran 25 a 40 minutos.
