# AGENTS.md — carlvs.dev

## Repo overview

Static HTML personal site at `carlvs.dev`. No build tools, no package.json, no dependencies.

## Branches & deploy

- All work on **`feature`** branch.
- **`main`** is stable; deployment is from `feature` via GitHub Actions (`.github/workflows/deploy.yml`).
- Custom domain `carlvs.dev` is set via `CNAME` file (root level).
- Push to `feature` → auto-deploys to GitHub Pages in ~2 min.

## Site structure

```
/
├── index.html          # Hero page (SRE branding, i18n)
├── about/index.html    # CV / about page (i18n)
├── 404.html            # SPA fallback — redirects to /
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── styles.css          # Shared palette (not yet used by pages)
└── CNAME               # carlvs.dev
```

## i18n system

- ES/EN via JS translations object + `data-i18n` attributes.
- Language persisted in `localStorage` (key `lang`).
- Default is ES. Set `localStorage.lang` to `en` in dev tools to debug EN.
- Both pages have a `<div class="lang-switcher">` with ES/EN buttons.
- Translations live in a `<script>` block at the bottom of each page (no shared file).

## Color system

Monokai palette defined in `styles.css` as CSS custom properties. Pages currently hardcode hex values — prefer the `var(--*)` approach for new pages.

| Token         | Hex       | Usage             |
|---------------|-----------|-------------------|
| `--bg-primary`| `#1a1a1a` | Page background   |
| `--bg-secondary`| `#222` | Container bg      |
| `--green`     | `#a6e22e` | Accents, h2       |
| `--pink`      | `#f92672` | Strong accents    |
| `--blue`      | `#66d9ef` | Links, secondary  |
| `--purple`    | `#ae81ff` | Badges            |
| `--orange`    | `#fd971f` | Highlighted text  |
| `--text-muted`| `#75715e` | Secondary text    |

## Routing

- `/about/` is a real directory with `index.html`.
- `/sobre-mi`, `/proyectos`, or any unknown path → 404 → redirects to `/`.
- To add a new page: create `pagename/index.html`.

## Key conventions

- **Site language is Spanish** by default; EN translations must mirror ES.
- Font: `JetBrains Mono` loaded from Google Fonts.
- Font Awesome 6.4 via CDN for icons (`<i class="fas ...">`).
- No external CSS/JS files linked from pages (except Google Fonts + FA CDN).
- `strong` tags get `#fd971f` (orange) color — use for tech keywords.
- Metrics placeholders `{N}` and `{X}` are left unfilled — do not invent numbers.
- Confidentiality: never include internal URLs, system names, ticket keys, or colleague names.

## No tests, no lint, no typecheck

This is a pure HTML/CSS/JS site with no toolchain. Manual verification via browser + responsive mode on mobile breakpoint (768px).
