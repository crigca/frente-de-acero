# Estado actual — Frente de Acero

_Última actualización: 2026-11-24_

## Visión final

Juego web de Frente de Acero con **registro, puntos (ranking) y multijugador en tiempo real
sincronizado** (dos jugadores viendo el frente moverse en vivo, uno contra otro por internet).

## Roadmap por etapas (en orden, una por vez)

- **Etapa 0 — Publicar lo que ya hay** _(EN CURSO)_
  Subir el juego actual (single-player vs IA) a GitHub y deployarlo en Vercel, tal cual está.
  Victoria rápida, no cierra ninguna puerta.

- **Etapa 1 — Separar el "cerebro" del juego**
  Extraer las reglas (combate, oro, movimiento) a un módulo **TypeScript puro**, sin DOM ni canvas,
  reutilizable en cliente y servidor. Ordena lo que ya existe, sin cambiar el gameplay.
  Es el paso que habilita el multijugador.

- **Etapa 2 — Cuentas y puntos**
  Backend NestJS + PostgreSQL/TypeORM: registro con Google (OAuth2+JWT), login, guardar puntos/ranking.
  Todavía single-player. Riesgo bajo (stack conocido).

- **Etapa 3 — Multijugador en tiempo real**
  Servidor "árbitro" (server-authoritative) + sincronización de las dos pantallas (WebSockets,
  simulación determinista). La etapa más dura; se llega a ella con la 1 y la 2 ya hechas.

## Decisiones tomadas

- **Lenguaje: TypeScript de punta a punta.** Sin dudas (coincide con el stack de Cristian).
- Multijugador: **tiempo real sincronizado** (no por turnos).
- El código actual **no se tira**: se publica ya (Etapa 0) y se le separa el cerebro reusando las
  reglas que ya funcionan (Etapa 1).
- El deploy va a **Vercel**.
- No se toca la Etapa 3 hasta tener la 1 y la 2 listas.

## Próximo paso concreto (Etapa 0)

1. Correr `bash tests/todas.sh` y leer la salida.
2. `git init` + primer commit. **Lo ejecuta Cristian**; Claude deja los comandos.
3. Crear el repo en GitHub y push (git puro, sin PRs ni gh CLI).
4. Conectar Vercel al repo para el deploy.
