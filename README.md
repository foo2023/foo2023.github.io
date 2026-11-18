# Portfolio

React + Tailwind CSS v4 + Vite.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Personalise

- **Name, bio, GitHub, email**: `src/config.js`
- **Photo**: put your photo in `src/assets/` (e.g. `photo.jpg`) and change the import at the top of `src/config.js`

## Add a project or hobby

Create a `.md` file in `projects/` or `hobbies/`, and put its images in `projects/images/` or `hobbies/images/`.

```md
---
title: My Project
type: Public Project        # optional badge (Personal / Public / Private ...)
tech: React, Tailwind       # optional, comma separated
link: https://example.com   # optional, makes the title a link
order: 3                    # optional, lower shows first
---

A short description written in Markdown.

![Home screen](images/my-project-1.png)
![Settings screen](images/my-project-2.png)
```

- Every image in the file goes into the square gallery (in order) and is removed from the text. One image shows still; several slide every 5 seconds.
- Descriptions over 600 characters collapse at a whole word with a "View more" toggle. Change `DESCRIPTION_LIMIT` / `GALLERY_INTERVAL` in `src/config.js`.
- If there's no `title`, the first `# Heading` is used, then the file name.

## Absolute imports

`vite.config.js` defines a `src` alias (and `jsconfig.json` tells your editor about it), so you can write:

```js
import Gallery from 'src/components/Gallery'
```
