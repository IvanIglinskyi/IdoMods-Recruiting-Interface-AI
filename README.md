# IdoMods Recruiting Interface AI

A single-page React landing page built with Vite, recreated 1:1 from design screenshots, with custom animations (header hover, interactive hero lamps, autoplay slider, hover tiles, WebGL shader section).

## Requirements

- Node.js 20+
- npm

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the dev server              |
| `npm run build`   | Build for production into `dist/` |
| `npm run preview` | Preview the production build      |

## Project structure

```
index.html                       # HTML template
vite.config.js                   # Vite configuration
src/main.jsx                     # Entry point
src/App.jsx                      # Root component
AGENTS.md                        # Rules for AI agents (stack, animations, sections)
CLAUDE.md                        # Claude Code instructions (imports AGENTS.md)
.claude/agents/landing-builder.md  # Agent that builds the page from design screenshots
```

## Working with AI agents

Project rules — including animation timings and section specs — live in [AGENTS.md](AGENTS.md).

To build a section from a design, put the screenshot in `design/` and ask Claude Code to use the `landing-builder` agent, e.g.:

> Use landing-builder to build the header from design/header.png
