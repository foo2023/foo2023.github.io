// Loads every Markdown file from /projects and /hobbies at build time.
//
// Markdown format (frontmatter is optional):
//
//   ---
//   title: My Project
//   type: Personal          # any label, e.g. Personal / Public / Private
//   tech: React, Tailwind
//   link: https://...
//   order: 1                # lower numbers show first
//   ---
//   Description text in Markdown...
//
//   ![Home screen](images/my-project-1.png)
//   ![Settings](images/my-project-2.png)
//
// Every image in the file is pulled out into the gallery (in order) and
// removed from the description text. Image paths are relative to the .md file.

const projectFiles = import.meta.glob('/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})
const projectImages = import.meta.glob('/projects/**/*.{png,jpg,jpeg,webp,gif,svg,avif}', {
  query: '?url',
  import: 'default',
  eager: true,
})

const hobbyFiles = import.meta.glob('/hobbies/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})
const hobbyImages = import.meta.glob('/hobbies/**/*.{png,jpg,jpeg,webp,gif,svg,avif}', {
  query: '?url',
  import: 'default',
  eager: true,
})

function parseFrontmatter(raw) {
  const text = raw.replace(/\r\n?/g, '\n')
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) return { data: {}, body: text }

  const data = {}
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    const value = line
      .slice(i + 1)
      .replace(/\s+#.*$/, '')
      .trim()
      .replace(/^["']|["']$/g, '')
    if (key) data[key] = value
  }
  return { data, body: text.slice(match[0].length) }
}

function resolvePath(mdPath, src) {
  if (/^([a-z]+:)?\/\//i.test(src) || src.startsWith('data:')) return src
  if (src.startsWith('/')) return src

  const parts = mdPath.split('/').slice(0, -1)
  for (const seg of src.split('/')) {
    if (seg === '..') parts.pop()
    else if (seg !== '.' && seg !== '') parts.push(seg)
  }
  return parts.join('/')
}

function parseEntry(mdPath, raw, imageMap) {
  const { data, body } = parseFrontmatter(raw)
  const images = []

  let text = body.replace(/!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g, (_, alt, src) => {
    const resolved = resolvePath(mdPath, src)
    const url = imageMap[resolved] ?? (/^([a-z]+:)?\/\//i.test(resolved) ? resolved : null)
    if (url) images.push({ src: url, alt })
    else console.warn(`[content] Image not found: ${src} (in ${mdPath})`)
    return ''
  })

  let title = data.title
  if (!title) {
    const h1 = text.match(/^#\s+(.+)$/m)
    if (h1) {
      title = h1[1].trim()
      text = text.replace(h1[0], '')
    }
  }
  if (!title) title = mdPath.split('/').pop().replace(/\.md$/, '')

  return {
    id: mdPath,
    title,
    type: data.type || '',
    tech: data.tech ? data.tech.split(',').map((t) => t.trim()).filter(Boolean) : [],
    link: data.link || '',
    order: Number.isFinite(Number(data.order)) && data.order !== undefined ? Number(data.order) : 999,
    images,
    description: text.replace(/\n{3,}/g, '\n\n').trim(),
  }
}

function load(files, imageMap) {
  return Object.entries(files)
    .map(([path, raw]) => parseEntry(path, raw, imageMap))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}

export const projects = load(projectFiles, projectImages)
export const hobbies = load(hobbyFiles, hobbyImages)

// Cuts text to `limit` characters, ending on a whole word.
export function truncateByWord(text, limit) {
  if (text.length <= limit) return null
  const cut = text.slice(0, limit)
  const lastSpace = cut.search(/\s\S*$/)
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…'
}
