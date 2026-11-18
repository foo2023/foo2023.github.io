# Portfolio: Architecture & Content Guide (for agents)

React 19 + Tailwind CSS v4 + Vite. Single page, no router, no backend.
**To add a project or hobby you only add files. No code changes needed.**

## Page flow

`Hero` (name, photo, bio) → `Projects` → `Hobbies` → `Contact` (GitHub, email)

## Where things live

| Path | Purpose |
|---|---|
| `projects/*.md` | One file = one project card |
| `projects/images/` | Project screenshots |
| `hobbies/*.md` | One file = one hobby card |
| `hobbies/images/` | Hobby images |
| `src/config.js` | Name, photo, bio, GitHub, email, `DESCRIPTION_LIMIT` (600), `GALLERY_INTERVAL` (5000 ms) |
| `src/lib/content.js` | Loads the `.md` files at build time (`import.meta.glob`) and parses them |
| `src/components/EntryCard.jsx` | Card layout, shared by projects and hobbies |
| `src/components/Gallery.jsx` | Square auto-sliding image frame |
| `src/components/Description.jsx` | Markdown text with the "View more" collapse |
| `src/components/Decor.jsx` | Sun, clouds, leaves, waves (inline SVG) |

Imports use the `src` alias, e.g. `import Gallery from 'src/components/Gallery'` (set in `vite.config.js` + `jsconfig.json`).

## Content file format

```md
---
title: "Project Name: Subtitle"
type: Public Project
tech: Flutter, Firebase
link: https://example.com
order: 3
---

Short description in Markdown (paragraphs, **bold**, lists, links).

![Home screen](images/project-name-home.png)
![Settings screen](images/project-name-settings.png)
```

### Rules

- **Frontmatter is optional and flat**: one `key: value` per line. No YAML lists or nesting.
  - `title`: put it in quotes if it contains a colon. If it's missing, the first `# Heading` is used, then the file name.
  - `type`: free-text badge, e.g. `Personal Project`, `Public Project`, `Private Project`. Leave it out for hobbies.
  - `tech`: comma-separated, shown as tags.
  - `link`: makes the title clickable.
  - `order`: a number; lower shows first. Files without one go last, sorted by title.
- **Images**: use Markdown image syntax anywhere in the body. All of them are **removed from the text** and shown in the gallery in the order they appear. Paths are **relative to the `.md` file**. Supported: png, jpg, jpeg, webp, gif, svg, avif. Remote `https://` URLs also work.
  - No image means a text-only card. One image shows still; two or more slide every 5 seconds.
  - Images are fitted inside a square frame (`object-contain`), so tall phone screenshots and wide desktop shots both work. Export at a reasonable size (≤ ~1600 px on the long side) to keep the page fast.
  - A missing image logs `[content] Image not found` in the browser console and is skipped.
- **Description length**: anything over 600 characters collapses at a whole word with "View more". Aim to stay under it.
- **File naming**: kebab-case, e.g. `projects/pureland.md` and `projects/images/pureland-home.png`.

## Writing style (match `projects/pureland.md`)

Plain, concise English. Short sentences. Lead with what it is and who uses it, then a few bullets on how it was built, then anything notable (lessons, changes of plan). No marketing fluff.

## After adding content

Run `npm run build` to confirm it compiles, then `npm run dev` to view it. Delete the example entries when real ones replace them: `projects/portfolio-site.md`, `hobbies/nature-walks.md`, `hobbies/quiet-reflection.md`, and their images.

## Design constraints (don't break these)

- Theme: sunny, calm nature. Sky blues, sand (`#fdf8ec`), greens, warm yellow. Rounded corners (`rounded-3xl` / `rounded-[2rem]`).
- Few buttons. Text-style controls only (the only ones are "View more" and the gallery dots).
- Light on performance: inline SVG decor, CSS transform-only animations, lazy-loaded images, and motion that respects `prefers-reduced-motion`. Don't add heavy libraries or large background images.
