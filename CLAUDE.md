# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page showcase site for Dota 2 hero mods (each mod re-skins a hero as an
anime/other character). Built with React 18 + TypeScript + Vite and deployed to
GitHub Pages. There is no backend — every mod is static data plus static assets.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # tsc -b (typecheck all tsconfig projects) then vite build -> dist/
npm run lint     # eslint . (flat config in eslint.config.js)
npm run preview  # serve the built dist/ locally
npm run deploy   # predeploy runs build, then gh-pages publishes dist/ to GitHub Pages
```

There is no test runner configured. `tsc -b` is the typecheck gate and runs as part
of `build`; TypeScript is `noEmit` (Vite does the actual transpiling).

## Architecture

Two routes, defined in [src/App.tsx](src/App.tsx):
- `/` → `ModList` — grid of all mods
- `/mod/:mod_id` → `ModDetails` — one mod's detail page, looked up by `mod_id`

Routing uses **`HashRouter`** deliberately (URLs look like `/#/mod/Axe_Heracles`).
This is required because GitHub Pages serves static files and cannot rewrite
deep-link paths to `index.html` — switching to `BrowserRouter` breaks page refresh
on any non-root route. Do not change this without solving the SPA-fallback problem.

### Content model (the important part)

Because every mod's asset paths follow Dota's fixed Panorama layout, the data is
**generated from a single source of truth** rather than spelled out by hand:

- [src/data/mods.ts](src/data/mods.ts) — `ModDefinitions: ModDefinition[]`, one
  compact entry per mod: `mod_id`, `heroName`, `heroInternalName` (the Dota
  `npc_dota_hero_<…>` name), `abilities` (spellicon codenames), `downloadLink`,
  and optional `loadoutCount`/`ingameCount` (default 1 / 2).
- [src/data/ModSelectionInfo.ts](src/data/ModSelectionInfo.ts) — a thin builder
  that `.map`s `ModDefinitions` into `AllModsSelectionInfoData`
  (`ModSelectionInfoProps[]`, card image + hero name) — drives the `ModList` grid.
- [src/data/ModDetailedInfo.ts](src/data/ModDetailedInfo.ts) — a thin builder that
  `.map`s `ModDefinitions` into `AllModsDetailedInfoData` (`ModDetailedInfoProps[]`,
  download link + spell icons + loadout/in-game image paths). Each entry embeds the
  matching selection object via `modSelectionInfoProps`.

Types live in [src/types/](src/types). `ModDetails` finds its data with
`AllModsDetailedInfoData.find(r => r.mod_id === mod_id)`.

**To add a new mod:**
1. Add one `ModDefinition` entry to `ModDefinitions` in `mods.ts`.
2. Drop the assets under `public/mods_data/<mod_id>/` (see asset layout below),
   naming them to match the derived paths (`npc_dota_hero_<heroInternalName>*`,
   one spellicon per `abilities[]` codename, `loadout/1.jpg`, `ingame/1.jpg`, …).

The builders derive every path; you no longer edit two files or repeat `mod_id`.

### Assets

All image/video assets live in `public/mods_data/<mod_id>/` and are referenced by
**absolute root paths** (`/mods_data/<mod_id>/...`) — Vite serves `public/` at the
site root. The per-mod folder mirrors Dota's Panorama layout:

```
public/mods_data/<mod_id>/
  npc_dota_hero_<hero>_png.png        # small original-hero overlay icon
  panorama/images/heroes/             # title + selection images
  panorama/images/spellicons/         # ability icons
  loadout/ , ingame/ , video/         # screenshots / clips
```

SVGs imported in code (e.g. the Discord icon in `Header.tsx`) use
`vite-plugin-svgr`'s `?react` suffix to import them as React components; those live
in `src/assets/`.

## Styling and design system

Styling is plain CSS imported per component (`import "./Foo.css"`) — **no CSS
Modules and no Tailwind** (App.tsx once used Tailwind-looking class names that
resolved to nothing). Because there are no modules, **class names are global and
leak across files**: e.g. `.root-container` is declared in both `ModList.css` and
`ModDetails.css` and both rules apply on both pages. Keep class names
component-specific, and remember a selector you add affects every matching element
site-wide.

Design tokens live in `:root` in [src/index.css](src/index.css): the font stack,
fluid type (`--fs-*` via `clamp()`), spacing/radius, colors (`--color-*`), elevation
(`--shadow-*`) and `--transition`. Component CSS consumes `var(--…)` — **use tokens,
not literals**.

Dark theme is a `@media (prefers-color-scheme: dark)` block in index.css that
overrides **only the color/elevation tokens** (`color-scheme: light dark` is set);
everything else follows automatically. So any new color you introduce **must be a
token**, or it won't adapt to dark mode.

Responsive: the mobile breakpoint is **`max-width: 480px`** (cards shrink to ~3 per
row; the header collapses its Discord label to just the icon) — reuse it. Detail-page
gallery images are fluid (`max-width: 100%; height: auto; min-width: 0`); don't
reintroduce fixed px widths without a max, or they overflow on phones.

App shell: [src/App.tsx](src/App.tsx) renders a global `<Header />` above
`<main class="app-main">` inside `.app-shell` (a `min-height: 100vh` flex column;
styles in [src/App.css](src/App.css)). Page content gets its top gap from
`.app-main` padding-top. **There is no footer** — the Discord link lives only in the
header.

## Gotchas

- **Single entry point.** [src/main.tsx](src/main.tsx) is the entry (referenced by
  `index.html`, uses `createRoot`). Edit that one.
- **`ImageGallery` is the shared image-row primitive.**
  [src/components/ImageGallery.tsx](src/components/ImageGallery.tsx) renders a titled
  row of images; its look is driven entirely by consumer-supplied class names.
  `SpellIcons` and the loadout/in-game sections in `ModDetails` all delegate to it,
  so change gallery markup there rather than duplicating it. Pass `zoomable` to make
  images open in the full-screen [Lightbox](src/components/Lightbox.tsx) (used by the
  loadout/in-game sections, not the small spell icons).
- **`LazyClickableVideo` exists but nothing renders it yet.**
  [src/components/LazyClickableVideo.tsx](src/components/LazyClickableVideo.tsx) is a
  working lazy click-to-play video component, but no data feeds it — the video
  section isn't data-driven yet. `ModDefinition` has no video field.
