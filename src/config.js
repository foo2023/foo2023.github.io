// ─────────────────────────────────────────────
//  Edit this file to personalise the portfolio.
// ─────────────────────────────────────────────
import photo from 'src/assets/my-photo.jpg' // replace with your own, e.g. 'src/assets/photo.jpg'

export const profile = {
  name: 'Foo Wei Shien Aloysius',
  photo,
  greeting: 'Hello, I am',
  tagline: 'Builder · Explorer · Nature lover',
  about: [
    'I enjoy exploring inner abilities and finding out what I am capable of. Nature keeps me calm, whether it is a walk among green plants or a quiet moment by the sea.',
    'I focus on the responsibilities in front of me right now. I am detail oriented, and I judge how much detail a task deserves within a reasonable time, so the work is careful but still gets finished.',
  ],
}

export const contact = {
  github: 'https://github.com/foo2023',
  email: 'fooshien541@gmail.com',
}

// Descriptions longer than this (in characters) collapse with a "View more" toggle.
export const DESCRIPTION_LIMIT = 600

// Milliseconds each image stays before the gallery slides to the next one.
export const GALLERY_INTERVAL = 5000
