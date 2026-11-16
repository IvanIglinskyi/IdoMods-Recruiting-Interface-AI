# AGENTS.md

Instructions for AI agents working in this repository.

## Project

A single-page landing page for the SOLLUX lighting store, built with React + Vite (JavaScript, no TypeScript). Every section is recreated 1:1 from design screenshots at a 1508 px page width and made responsive down to 320 px.

Page sections, top to bottom: Header, Hero slider (with interactive Lamps), Features, Tiles, ShaderSection, Footer.

## Stack

- React 19 + react-dom
- Vite with `@vitejs/plugin-react`
- ES modules (`"type": "module"`)

## Structure

```
index.html        # HTML template, loads src/main.jsx
vite.config.js    # Vite configuration
src/main.jsx      # entry point, mounts <App /> into #root
src/App.jsx       # root component, composes the page sections
src/index.css     # design tokens and reset
src/media.js      # breakpoints and useMediaQuery hook
src/assets/       # images used by the page
src/components/   # one folder per component: <Name>/<Name>.jsx + <Name>.css
public/           # static files served as-is (favicon.svg)
design/components-design/  # design screenshots — the reference for every section
design/misc/               # original source images supplied by the designer
```

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — preview the build

## Rules

- Keep the project minimal: don't add files, dependencies, or configs unless needed.
- Use only function components and hooks; component files use `.jsx`, names use PascalCase.
- Each component lives in its own folder: `src/components/<Name>/<Name>.jsx` plus `<Name>.css` (and any helper used only by that component).
- After making changes, make sure `npm run build` passes without errors or warnings.
- Don't commit `node_modules` or `dist`.
- Images used by the page go into `src/assets/` (optimised copies, about 2× their display size); originals in `design/misc/` are never modified.
- Don't invent content, colours or fonts: take them from the design; if something can't be read reliably, ask the user. Temporary placeholders must be reported to the user.

## Responsive layout

Breakpoints are defined once in `src/media.js` (CSS repeats the same values, see `src/index.css`):

- ≥ 1440 px — desktop design, 1:1 at 1508 px; wider screens keep full-bleed backgrounds with content centred in a 1508 px column.
- 1024–1439 px — laptop, fluid sizes (`clamp()`, `%`).
- 768–1023 px — tablet, burger menu, fewer columns.
- < 768 px — mobile, stacked layout; must work down to 320 px.

Rules:

- Every new or changed section must work at all breakpoints, with no horizontal page scroll.
- The desktop layout at 1508 px must not regress when changing smaller breakpoints.
- Hover effects only for hover-capable pointers (`@media (hover: hover)`); touch targets on mobile are at least 40 px.

## Accessibility

- Semantic HTML: `<button>` for actions, `<a>` for navigation, headings in order, Polish `alt` / `aria-label` texts (decorative images use `alt=""`).
- Every animation respects `prefers-reduced-motion` (no autoplay, parallax or zoom; at most a simple fade).

## Working with the dev server

The Vite dev server is usually running while you work. A half-written module can get cached by HMR and break the page ("does not provide an export named 'default'").

- Write new files completely before importing them; change existing files with single, complete edits (no partial shell writes into `src/`).
- After finishing, load the page and confirm it renders. If it is broken but the files on disk are correct, re-save the affected file or restart the dev server.
- Stop any extra servers you start (e.g. `vite preview`) and make sure their ports are freed.

## Git

- Commit author: Ivan Iglinskyi. Do not add Claude (or any AI) as a co-author and add no "Co-Authored-By" or "Generated with" lines.
- Commit messages are in English: a clear title, then a body with sections describing what changed and why.
- Commit or push only when the user asks.

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

Slow ambient loops (e.g. the lamps' 7 s idle float) are allowed outside the 200–800 ms duration ranges, which apply to interactions and transitions. They still use `--ease` and only `transform`/`opacity`.

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
