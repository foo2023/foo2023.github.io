import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// The "src" alias lets you write absolute imports like:
//   import Hero from 'src/components/Hero'
// instead of long relative paths like '../../components/Hero'.
export default defineConfig({
  // Relative paths so the site works at any GitHub Pages URL.
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
