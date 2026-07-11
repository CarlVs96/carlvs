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
/               # Single-page scroll (hero + about + timeline + AIOps + stack + education + contact)
/about/         # Redirects to /#experience
404.html        # SPA fallback → redirects to /
favicon.svg
robots.txt
sitemap.xml
CNAME
```

## Single-page sections (all in `index.html`)

| Section       | ID            | Content |
|---------------|---------------|---------|
| Hero          | —             | Identity, stats, CTA, social |
| Sobre mí      | `#about`      | 3-paragraph bio |
| Experiencia   | `#experience` | Vertical timeline with reveal animation |
| AIOps         | `#aiops`      | Highlight box with orange border |
| Stack         | `#stack`      | Categorized badges (6 categories) |
| Formación     | `#education`  | Grid: uni, erasmus, awards, certs |
| Contacto      | `#contact`    | Cards: email, LinkedIn, GitHub, CV |

## Sticky navbar

- Desktop: horizontal links + ES/EN toggle.
- Mobile: hamburger (☰) opens dropdown.
- Active link highlights via `IntersectionObserver` (threshold 0.3).
- Glassmorphism: `rgba(26,26,26,0.85)` + `backdrop-filter: blur(12px)`.

## Timeline animation

Each `.timeline-item` uses `IntersectionObserver` (threshold 0.15) to fade+slide in when scrolled into view. Current role (Roche) has a green dot.

## i18n system

- ES/EN via JS translations object + `data-i18n` attributes in `<script>` at bottom of `index.html`.
- Language persisted in `localStorage` (key `lang`). Default: ES.
- Add new keys to both ES and EN objects.

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

Palette defined in `styles.css` as custom properties (pages currently hardcode hex).

## Key conventions

- **Site language is Spanish** by default; EN translations must mirror ES.
- Font: `JetBrains Mono` loaded from Google Fonts.
- Font Awesome 6.4 via CDN (`<i class="fas ...">`).
- `strong` = orange (`#fd971f`) — use for tech keywords.
- Metrics placeholders `{N}` and `{X}` are unfilled — do not invent numbers.
- New page? Create `pagename/index.html` and add redirect if desired.
- Confidentiality: never include internal URLs, system names, ticket keys, or colleague names.

## No tests, no lint, no typecheck

Pure HTML/CSS/JS. Manual verification via browser + responsive mode (768px breakpoint).
