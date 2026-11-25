# Frente de Acero

Juego de estrategia en tiempo real, de hexágonos, para jugar en el navegador contra la IA.

## Jugar

Abrí `frente-de-acero.html` con doble click (Chrome recomendado). No necesita instalar nada ni conexión.
`mapas-frente-de-acero.html` muestra los 20 mapas; su botón JUGAR abre el juego en ese mapa (los dos archivos tienen
que estar en la misma carpeta).

## Desarrollo

Todo el juego está en `frente-de-acero.html`. Para trabajar con Claude Code, las instrucciones del proyecto están en
`CLAUDE.md`.

```bash
bash tests/todas.sh              # pruebas rápidas (necesita Node 18 o más nuevo)
python3 tools/galeria.py         # regenera la lámina de mapas (necesita Playwright; ver el comentario del archivo)
```
