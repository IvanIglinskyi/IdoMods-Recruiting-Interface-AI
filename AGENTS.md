# AGENTS.md

Instructions for AI agents working in this repository.

## Project

A minimal React app built with Vite (JavaScript, no TypeScript).

## Stack

- React 19 + react-dom
- Vite with `@vitejs/plugin-react`
- ES modules (`"type": "module"`)

## Structure

```
index.html        # HTML template, loads src/main.jsx
vite.config.js    # Vite configuration
src/main.jsx      # entry point, mounts <App /> into #root
src/App.jsx       # root component
```

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — preview the build

## Rules

- Keep the project minimal: don't add files, dependencies, or configs unless needed.
- Use only function components and hooks; component files use `.jsx`, names use PascalCase.
- After making changes, make sure `npm run build` passes without errors.
- Don't commit `node_modules` or `dist`.

## Animations

- Duration: short interactions (hover) — 200–250 ms; larger movements — 500–800 ms.
- Easing: use one consistent ease-in-out everywhere — `cubic-bezier(0.4, 0, 0.2, 1)`; use ease-out for scaling/enlargement.
- Animate only `transform` and `opacity`.

### Menu (header)

On hover, the menu background changes to solid white, and the colors of the elements change to black to maintain contrast.

- Header background: transparent → `#FFFFFF`, 250 ms, ease-in-out.
- Color of text, icons, and logo: white → black, 250 ms, ease-in-out (same timing as the background so the change happens simultaneously).
- Reversion when the cursor moves away: 250 ms, ease-in-out.
- This is an intentional exception to the "only `transform` and `opacity`" rule: `background-color` and `color` may be animated here.

### Hero section — lamps

Lamps in the hero section are a place to show creativity through animation, e.g.:

- turning a lamp on when it's clicked;
- lamps moving/reacting as the cursor moves.

### Slider

Automatic slider with image transitions.

- Autoplay every 3 seconds.
- Crossfade between slides: 600 ms, ease-in-out.
- Subtle image scaling from 1.05 → 1.0 during the transition: 800 ms, ease-out.
- Progress bar (yellow) fills linearly over 3 seconds and resets on every slide change (linear easing is intentional here).

### Tiles

On hover over an individual tile:

- Image zoom-in: scale 1 → 1.1, 500 ms, ease-out (tile has `overflow: hidden`).
- Black button background: black → gray `#4A4A4A`, 200 ms, ease-in-out (intentional exception to the "only `transform` and `opacity`" rule).

### Shader section

Background animation implemented as a real-time WebGL shader — not a GIF or video — to avoid stuttering at the loop point.

- The reference example is a GIF where the animation cuts off; the final version must run seamlessly, with continuous, fluid motion.
- Smooth, seamless infinite loop with no visible start or end point.
- Slow pace: roughly 20–30 seconds per cycle, wave-like motion (ease-in-out or noise-based movement).
- Static text and button positioned over the animation.
