# AGENTS.md — carlvs.dev

## Repo overview

Single-page scroll HTML personal site at `carlvs.dev`. No build tools, no package.json, no dependencies.

## Branches & deploy

- All work on **`feature`** branch.
- **`main`** is stable; auto-deploys from `feature` via GitHub Actions (`.github/workflows/deploy.yml`).
- Custom domain `carlvs.dev` via `CNAME` (root level).
- Push to `feature` → deploy ~2 min.

## Site structure

```
/                   # Single-page scroll (hero + about + timeline + AIOps + stack + education + contact)
/assets/css/         # Shared CSS (common.css — reset, navbar, lang-btn, theme-btn, scroll-progress, reveal, toast, footer, light theme)
/assets/img/         # Images (favicon, avatar)
/assets/js/          # Shared JS (common.js — particles, scroll progress, theme toggle, section reveal; translations.js)
/pages/tools/       # Micro-applications grid (tools page, own CSS/JS for tool functionality)
/about/             # Redirects to /#experience
/tools/             # Legacy redirect → /pages/tools/
404.html            # SPA fallback → redirects to /
robots.txt          # SEO: crawl instructions
sitemap.xml         # SEO: URL index
CNAME               # Custom domain carlvs.dev
```

## Shared assets

- `assets/css/common.css` — loaded by both `index.html` and `pages/tools/index.html`. Contains: reset/base, navbar, nav-logo, nav-links, nav-toggle, lang-btn, theme-btn, scroll-progress, reveal animation, toast, footer, light theme variants for all shared elements.
- `assets/js/common.js` — loaded by both pages (before page-specific script in tools, after in index). Contains: theme init from localStorage, particle canvas (80 particles, mouse repel, lines), scroll progress handler, section reveal IntersectionObserver, theme toggle event listener.

When creating a new page, link common.css and common.js to get consistent navbar/theme/reveal/particles.

## Single-page sections (all in `index.html`)

| Section       | ID            | Content |
|---------------|---------------|---------|
| Hero          | —             | Identity, stats, CTA, social |
| Sobre mí      | `#about`      | 3-paragraph bio |
| Experiencia   | `#experience` | Vertical timeline with reveal animation |
| Terminal      | `#terminal`   | Fake terminal with auto-typing demo |
| AIOps         | `#aiops`      | Highlight box with orange border |
| Stack         | `#stack`      | Categorized badges (6 categories) |
| Formación     | `#education`  | Grid: uni, erasmus, awards |
| Contacto      | `#contact`    | Cards: email, LinkedIn, GitHub, CV |

## Sticky navbar

- Desktop: horizontal links + ES/EN toggle.
- Mobile: hamburger (☰) opens dropdown.
- Active link highlights via `IntersectionObserver` (threshold 0.3).
- Glassmorphism: `rgba(26,26,26,0.85)` + `backdrop-filter: blur(12px)`.

## Timeline animation

Each `.timeline-item` uses `IntersectionObserver` (threshold 0.15) to fade+slide in when scrolled into view. Current role (Roche) has a green dot.

## i18n system

- ES/EN/Ñ/J via JS translations object + `data-i18n` attributes.
- Translations in `assets/js/translations.js`, loaded via `<script>` tag before main inline script.
- `t(k)` helper function resolves keys; Ñ/J fall back to ES for missing keys.
- Language persisted in `localStorage` (key `lang`). Default: ES.
- Add new keys to ES and EN for full translation; Ñ and J fall back to ES if not provided.

## Color system (Monokai)

| Token         | Hex       | Usage            |
|---------------|-----------|------------------|
| `--bg-primary`| `#1a1a1a` | Page background  |
| `--bg-secondary`| `#222`  | Container bg     |
| `--green`     | `#a6e22e` | Titles, accents  |
| `--pink`      | `#f92672` | Strong accents   |
| `--blue`      | `#66d9ef` | Links, timeline dot |
| `--purple`    | `#ae81ff` | Badges           |
| `--orange`    | `#fd971f` | AIOps box border, `strong` |
| `--text-muted`| `#75715e` | Secondary text   |

All colors hardcoded as hex across files (no CSS custom properties).

## Logo & favicon

- Navbar logo: inline "CVs" gradient SVG + "Carlos Villén Villar" with gradient text (pink→purple→blue), reverses on hover.
- Hero avatar: large circular beard avatar (`/cvslogo-face.svg`, 269x269 face crop, light fill) with gradient ring + glow above greeting.
- Favicon: gradient "CVs" text + green dot (`/assets/img/favicon.svg`).

## Key conventions

- **Site language is Spanish** by default; EN translations must mirror ES.
- Font: `JetBrains Mono` loaded from Google Fonts.
- Font Awesome 6.4 via CDN (`<i class="fas ...">`).
- `strong` = orange (`#fd971f`) — use for tech keywords.
- Metrics placeholders `{N}` and `{X}` are unfilled — do not invent numbers.
- New page? Create `pagename/index.html` and add redirect if desired.
- Confidentiality: never include internal URLs, system names, ticket keys, or colleague names.

## CV page (`cv.html`)

- Printable HTML CV with Monokai dark theme, font: JetBrains Mono.
- Default language: EN (unlike `index.html` which defaults to ES).
- ES/EN toggle via `data-i18n` + translations object + `localStorage` (key `cv_lang`).
- "PDF" button calls `window.print()` which opens the browser print dialog → select "Save as PDF".
- `@page { margin: 0; size: letter; }` — no white borders, selectable text (ATS-friendly).
- Background colors preserved via `-webkit-print-color-adjust: exact`.
- Toolbar (lang toggle + PDF button) hidden during `@media print`.

## Extra features (all in `index.html`)

- **Particle canvas**: 80 particles with Monokai colors connected by lines, mouse interaction (repel), behind all content.
- **Glitch effect**: `CarlVs` hero name glitches (cyan/magenta offset) every 6s.
- **Typewriter effect**: hero title types itself character by character on load and language switch.
- **Text reveal**: each section title reveals with `clip-path` inset animation on scroll.
- **SRE-ready badge**: fixed badge bottom-right with pulsing green dot, appears 2s after load.
- **Ñiñosaurio mode**: press `ñ` → all text turns into Ñ-speak (pseudo-language in i18n). A floating "Ñiñosaurio" button appears at bottom-left; click it or press ES/EN to go back.
- **Jiennense mode**: press `j` → all text turns into exaggerated Jaén accent (pseudo-language in i18n). Drops final -s, -r, -d; el→er, para→pa, etc. Floating "Modo Jiennense" button appears; click it to go back.
- **Scroll progress**: thin gradient bar at top, fills as you scroll.
- **Back to top**: button bottom-right, appears after scrolling past hero.
- **Animated counter**: years of experience calculated from 2020, animates on scroll.
- **Tooltips**: each stack badge has `data-tip` with description, shown on hover via CSS `::after`.
- **Light/dark toggle**: ☀️/🌙 in navbar, persisted in `localStorage`. Full light theme CSS under `html.light`.
- **Stack filter**: category buttons above stack grid, hide/show columns via JS.
- **Toast + copy email**: click email → clipboard copy → "¡Copiado!" toast (2s).
- **Dynamic font-size**: mobile hero scales via viewport units.

## No tests, no lint, no typecheck

Pure HTML/CSS/JS. Manual verification via browser + responsive mode (768px breakpoint).
