# IdoMods Recruiting Interface AI

A single-page React landing page for the SOLLUX lighting store, built with Vite and recreated 1:1 from design screenshots. It features custom animations (interactive hero lamps, an autoplay slider, hover tiles, a real-time WebGL shader) and a responsive layout from 320 px phones to 2560 px screens.

## Requirements

- Node.js 20+
- npm

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173/.

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the dev server              |
| `npm run build`   | Build for production into `dist/` |
| `npm run preview` | Preview the production build      |

## Tech stack

- React 19 (function components and hooks only)
- Vite
- Plain CSS with shared design tokens in `src/index.css`
- Raw WebGL for the shader section, with no 3D or animation libraries
- Font: Plus Jakarta Sans 500 from Google Fonts

## Page sections

The page is composed in `src/App.jsx` from top to bottom:

### 1. Header — `components/Header/`

- SOLLUX logo, navigation with dropdown toggles (Lampy, Kolory, Pomieszczenia), links, a pill-shaped search field, a "Stwórz swoją lampę" link, and account and cart icons. All icons are inline SVG.
- The header is transparent over the hero. On hover it turns white and its content turns black (250 ms, ease-in-out).
- Below 1024 px the navigation, search and "Stwórz swoją lampę" move into an accessible off-canvas menu. The menu traps focus, closes on Esc and on link click, and locks page scroll while open.

### 2. Hero slider — `components/Hero/`, `components/Lamps/`

- Two slides:
  - the lamp composition (three lamps above a rock on a warm gradient);
  - an interior photo.
- Each slide has a label, a two-line heading and a yellow CTA. Prev/next arrows, a progress bar and a "4.8 ★" rating badge are shared by both slides.
- Slider behaviour:
  - autoplay every 3 s;
  - 600 ms crossfade;
  - media scales from 1.05 to 1.0 over 800 ms;
  - the yellow progress bar fills linearly over 3 s and resets on every slide change.
- Lamps:
  - each lamp drifts with the cursor at its own depth (parallax) and floats gently;
  - clicking a lamp turns it on, with a lens glow and a light beam, and clicking again turns it off.
- On mobile the hero becomes a portrait layout with swipe navigation.

### 3. Features — `components/Features/`

Five benefits with line icons: returns up to 100 days, 5-year warranty, free delivery, Polish products and an official manufacturer store.

### 4. Promo tiles — `components/Tiles/`

- A 2×2 grid of tiles: Marka THORO, Konfigurator 3D, Katalog and SOLLUX SMART. Each tile has a label, a title, a black pill button and its own photo or product renders.
- On hover the tile's image zooms to 110% (500 ms, ease-out) and the button turns grey `#4A4A4A` (200 ms).

### 5. Shader section — `components/ShaderSection/`

- A real-time WebGL fragment shader draws blurred golden light bands on a dark background. A static heading, a "Kup teraz" button and a price note sit on top.
- The animation is a seamless 24 s loop: all motion is periodic, so the frames at t = 0 and t = 24 s are identical.
- The render loop pauses when the section is off-screen or the tab is hidden.
- When WebGL is unavailable, a CSS gradient is shown instead.

### 6. Footer — `components/Footer/`

- Logo, social icons and five link columns.
- Payment and delivery logos, award logos and eight store flags.
- A VAT note, company contact details, and IdoMods / IdoSell badges.
- On mobile the link columns become accordions.

## Responsive layout

Breakpoints are defined once in `src/media.js`:

| Range        | Layout                                                        |
| ------------ | ------------------------------------------------------------- |
| ≥ 1440 px    | Desktop design (1:1 at 1508 px), centred 1508 px column above |
| 1024–1439 px | Laptop: fluid sizes                                           |
| 768–1023 px  | Tablet: burger menu, fewer columns                            |
| < 768 px     | Mobile: stacked layout, swipe slider, accordions              |

## Animation rules

All animations follow [AGENTS.md](AGENTS.md):

- **Durations:** 200–250 ms for hover, 500–800 ms for larger movements.
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` everywhere, and `ease-out` for scaling.
- **Animated properties:** only `transform` and `opacity`. The documented exceptions are the header colours, the tile button background and the linear progress bar.
- **Reduced motion:** every animation respects `prefers-reduced-motion`.

## Project structure

```
index.html                         # HTML template, font link, SEO and Open Graph meta tags
public/favicon.svg                 # Favicon
src/main.jsx                       # Entry point
src/App.jsx                        # Page composition
src/index.css                      # Design tokens, reset, breakpoint notes
src/media.js                       # Breakpoints and useMediaQuery hook
src/components/<Name>/             # One folder per component: <Name>.jsx + <Name>.css
src/assets/                        # Images used by the page (footer logos in assets/footer)
design/components-design/          # Design screenshots used as references
design/misc/                       # Original source images
AGENTS.md                          # Rules for AI agents (stack, animations, responsive, a11y, git)
CLAUDE.md                          # Claude Code instructions (imports AGENTS.md)
.claude/agents/landing-builder.md  # Agent that builds sections from design screenshots
```

## Working with AI agents

Project rules, including animation timings and section specs, live in [AGENTS.md](AGENTS.md).

To build or change a section from a design, put the screenshot in `design/components-design/` and its source images in `design/misc/`. Then ask Claude Code to use the `landing-builder` agent, for example:

> Use landing-builder to build the newsletter section from design/components-design/newsletter.png
