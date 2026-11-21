# NEDLSALAH — Portfolio (Magic UI rebuild)

React 19 + Vite + Tailwind CSS v4 + [Magic UI](https://magicui.design/) components, bilingual EN/AR (RTL), dark/light, motion toggle.
Same content, URLs, legal pages, 404 and SEO metadata as Web-v7. Deploys to GitHub Pages at `/Web-v1/`.

```bash
npm install
npm run dev       # local dev
npm run build     # outputs dist/
```

Push to `main` and `.github/workflows/deploy.yml` builds and publishes (Settings → Pages → Source: GitHub Actions).

## Magic UI components used (src/components/ui, copied from github.com/magicuidesign/magicui)
BlurFade, TextAnimate, WordRotate, NumberTicker, Marquee, OrbitingCircles, ShimmerButton, MagicCard,
BorderBeam, DotPattern, AnimatedShinyText, ScrollProgress. Keyframes live in `src/index.css`.
Add more with `npx shadcn@latest add @magicui/<name>` (needs a `components.json`) or copy from the repo.

## Content
All copy lives in `src/data/i18n.json` (EN + AR), exported unchanged from the old `js/i18n.js`.
