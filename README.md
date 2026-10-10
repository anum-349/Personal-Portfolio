# Portfolio (React + Vite, frontend only)

No backend, no database. Static site.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run preview    # serve the production build locally
```

## Customize

Everything is in `src/data.js`: name, roles, bio, skills, projects, timeline, socials, email.
Put a `resume.pdf` in a `public/` folder and set `resumeUrl: "/resume.pdf"`.
Colors and fonts are CSS variables at the top of `src/styles.css`.

## Deploy (free)

- **Vercel / Netlify**: import the repo, build command `npm run build`, output `dist`.
- **GitHub Pages**: push `dist/` to a `gh-pages` branch (the Vite `base` is already `./`).

## Notes

- The contact form opens the visitor's mail client via `mailto:` (the only backend-free option).
- Theme preference is saved in `localStorage`; respects `prefers-color-scheme` and `prefers-reduced-motion`.
