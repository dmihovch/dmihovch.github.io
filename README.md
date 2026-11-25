# daniel mihovch

Static personal site built with SvelteKit and deployed to GitHub Pages. Routes: `/`, `/projects`, `/research`, `/research/dgx-spark-llm-inference`, `/teaching`, `/teaching/<slug>`, `/blog`, `/blog/<slug>`, and a stub page per section at `/<section>`.

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
src/lib/projects.ts               Selected repositories and project descriptions.
src/lib/research.ts               Paper metadata, abstract, contribution, and ordered posters.
src/lib/github.ts                 GitHub repository metadata, languages, and session cache.
src/lib/MarkdownViewer.svelte     Renders teaching markdown.
src/lib/blog.ts                   Discovers and validates blog post metadata.
src/content/blog/                 Markdown blog posts with frontmatter.
src/routes/+layout.svelte         Loads styles, preloads the font, renders the header and main.
src/routes/+layout.ts             Sets prerender = true.
src/routes/+page.svelte           Home page.
src/routes/[section]/             Generic stub page for sections without a custom page.
src/routes/theme.css              Theme tokens and component styles.
src/routes/teaching/              Teaching index and detail pages.
src/routes/projects/              GitHub-backed project showcase.
src/routes/blog/                  Blog index and Markdown post pages.
static/fonts/                     Subsetted Iosevka woff2 files.
static/*.pdf                      Resume and transcript.
static/research/                   Paper, posters, preview images, citation, and slides.
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

The CISC 210 page groups materials by lecture topic. `src/lib/lectures.ts` reads the repository's default branch and recursive Git tree through the public GitHub REST API. An uncached visit makes two requests. Successful results are cached in `sessionStorage` for 30 minutes, and requests time out after eight seconds. Source files, notes, Makefiles, and subfolders link directly to GitHub. Compiled binaries are omitted.

`src/lib/lecture-snapshot.json` supplies the prerendered topic list and material links when JavaScript is disabled or GitHub is unavailable. It records the repository's top-level folders and their immediate children. Refresh this snapshot when adding lecture content so the fallback remains current. The page also discovers new topic folders and materials through the API.

## Projects

`src/lib/projects.ts` selects the public repositories shown on `/projects`. Descriptions, focus tags, and primary languages are prerendered with the page.

The browser fetches repository metadata and language byte counts from the public GitHub REST API. Successful results are cached in `sessionStorage` for 30 minutes. Requests time out after eight seconds. No token or server is required. GitHub applies a [60-request hourly limit to unauthenticated requests per IP address](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api). An uncached visit makes up to eight requests for the four projects.

Stars, forks, default branches, last-push dates, and language percentages come from the API. Project descriptions and source links remain available when JavaScript is disabled, the API is unavailable, or a request is rate-limited. A failed language request preserves the other repository metadata.

## Research

`src/lib/research.ts` supplies the research index and paper detail page. The poster array controls display order: LLM Spark, ML profiling, then drone swarming. Each poster records its event and presentation date.

`static/research/posters/` contains the original poster PDFs and WebP previews. Previews preserve each poster's aspect ratio; the PDF links open the original files. The paper PDF, extracted Figure 1, and downloadable BibTeX live in `static/research/dgx-spark-llm-inference/`. Keep `citation.bib` and the BibTeX in `research.ts` consistent when updating the citation.

The paper page identifies the work as an arXiv preprint, credits equal contributions, and includes scholarly citation metadata. Research routes use trailing slashes to produce directory index files for static hosting. The paper's canonical URL uses `dmihovch.github.io`; update the canonical and PDF metadata URLs if the domain changes.

## Blog

Blog posts live in `src/content/blog/`. Each Markdown filename becomes its URL:
`hello-world.md` produces `/blog/hello-world/`. The `/blog/` index discovers posts
automatically and sorts them by date, newest first. mdsvex compiles the Markdown
into Svelte components at build time. Posts use the site's shared theme.

Create a post by copying `src/content/blog/hello-world.md` to a new lowercase,
hyphen-separated filename and replacing the frontmatter and body:

```markdown
---
title: "My next post"
date: "2026-11-25"
description: "A short description for the blog index."
draft: false
---

Write the post here using Markdown.
```

`title`, `date`, and `description` are required. Dates use quoted `YYYY-MM-DD`
strings. Invalid metadata fails the build with the source filename.
`draft: true` shows the post during `npm run dev` and excludes it from the
production index and prerendered routes. Omit `draft` or set it to `false` to publish.
Draft files remain visible in the repository.

Run `npm run dev` to preview posts. Push to `main` to trigger the existing GitHub
Pages deployment. Blog routes use trailing slashes to produce directory index files.

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
