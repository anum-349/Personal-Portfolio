import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`            -> normal multi-file build for Netlify / Vercel / GitHub Pages
// `SINGLE=1 npm run build`   -> everything inlined into one index.html
export default defineConfig({
  plugins: [react(), ...(process.env.SINGLE ? [viteSingleFile()] : [])],
  build: { assetsInlineLimit: process.env.SINGLE ? 100000000 : 4096 },
})
