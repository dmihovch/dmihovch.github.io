# daniel mihovch

Static personal site built with SvelteKit and deployed to GitHub Pages. Routes: `/`, `/teaching`, `/teaching/<slug>`, and a stub page per section at `/<section>`.

## Requirements

- Node.js 20. `.github/workflows/deploy.yaml` pins Node 20.
- npm.
- Python 3.12. Required only to regenerate the fonts.

## Setup

```sh
npm ci
npm run fonts:setup
```

`npm ci` installs the JavaScript dependencies from `package-lock.json`. `npm run fonts:setup` creates `scripts/.venv` and installs `scripts/requirements.txt`.

The subsetted fonts in `static/fonts/` are committed. `npm run fonts:setup` is required only to regenerate them.

## Commands

| Command               | Action                                                         |
| --------------------- | -------------------------------------------------------------- |
| `npm run dev`         | Start the Vite dev server.                                     |
| `npm run build`       | Build the static site to `build/`.                             |
| `npm run preview`     | Serve the `build/` output.                                     |
| `npm run check`       | Run svelte-check.                                              |
| `npm run lint`        | Run `prettier --check .` and `eslint .`.                       |
| `npm run format`      | Run `prettier --write .`.                                      |
| `npm run fonts`       | Regenerate `static/fonts/*.woff2`. Requires `scripts/.venv`.   |
| `npm run fonts:setup` | Create `scripts/.venv` and install `scripts/requirements.txt`. |

## Project structure

```text
src/app.css                       Global stylesheet: Iosevka @font-face and base reset.
src/app.html                      HTML shell.
src/lib/site.ts                   Profile identity: name and links.
src/lib/sections.ts               Section registry: nav links, home previews, stub pages.
src/lib/SectionPreview.svelte     Home-page preview card for a section.
src/lib/SectionPage.svelte        Shared section page header (title and blurb).
src/lib/UnderConstruction.svelte  Placeholder shown on sections without content.
src/lib/Tooltip.svelte            Hover/focus popup with a blurb and an external link.
src/lib/teaching.ts               Teaching resources for the /teaching routes.
src/lib/MarkdownViewer.svelte     Renders teaching markdown.
src/routes/+layout.svelte         Loads styles, preloads the font, renders the header and main.
src/routes/+layout.ts             Sets prerender = true.
src/routes/+page.svelte           Home page.
src/routes/[section]/             Generic stub page for sections without a custom page.
src/routes/theme.css              Theme tokens and component styles.
src/routes/teaching/              Teaching index and detail pages.
static/fonts/                     Subsetted Iosevka woff2 files.
static/*.pdf                      Resume and transcript.
scripts/subset-fonts.py           Subsets Iosevka into static/fonts.
scripts/requirements.txt          Pinned Python dependencies.
scripts/setup.sh                  Creates scripts/.venv.
```

## Sections

`src/lib/sections.ts` defines the sections. Each entry adds a nav link, a home-page preview, and a stub page at `/<slug>`:

```ts
{ slug: 'talks', title: 'Talks', blurb: 'Conference and meetup talks.' }
```

Add the slug to the `SectionSlug` union in the same file.

A section with `custom: true` is skipped by the generic stub route and expects its own page at `src/routes/<slug>/`. `teaching` uses this. A custom page renders the shared header with `SectionPage` and passes its content as children:

```svelte
<SectionPage slug="blog">
	<p>...</p>
</SectionPage>
```

`src/lib/site.ts` holds the profile identity: the name and the external profile links, plus the resume and transcript paths. The tagline lives in `src/routes/+page.svelte` so it can embed `Tooltip` components.

`src/lib/teaching.ts` holds the teaching resources. Each entry has a `slug` and produces a page at `/teaching/<slug>`. `src/routes/teaching/[slug]/+page.ts` generates the prerendered entries from that list.

## Links

Internal links use `resolve()` from `$app/paths`. External links carry `rel="external"`. All links open in the same tab.

`src/lib/MarkdownViewer.svelte` renders `http(s)` links in teaching markdown as plain anchors that stay in the same tab.

`src/lib/Tooltip.svelte` is used for external references in the tagline.

## Fonts

`src/app.css` declares `@font-face` for Iosevka, served from `static/fonts/`. The files are subsetted from `@fontsource/iosevka`, a devDependency.

`scripts/subset-fonts.py` keeps printable ASCII, Latin-1, the characters `‘’“”–—…•‹›`, and the arrows `← → ↗ ↑ ↓`. `retained_codepoints()` in that script defines the set. Characters outside the set fall back to the system monospace font.

Regenerate the fonts after editing the character set:

```sh
npm run fonts:setup
npm run fonts
```

## Deployment

`.github/workflows/deploy.yaml` deploys on push to `main`:

- Checkout the repository.
- Set up Node 20.
- Run `npm ci`.
- Run `npm run build`.
- Upload `build/` and deploy to GitHub Pages.

`@sveltejs/adapter-static` writes the site to `build/` with `fallback: '404.html'` and `precompress: true`. `src/routes/+layout.ts` sets `prerender = true`, so every route is rendered at build time.

The workflow does not run `fonts:setup` or `fonts`. The committed `static/fonts/*.woff2` files are served as-is.
