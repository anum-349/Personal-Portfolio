import { useState } from 'react'

const links = [
  ['Work', '#work'],
  ['About', '#about'],
  ['Path', '#path'],
  ['Toolbox', '#toolbox'],
  ['Studio', '#studio'],
  ['Contact', '#contact'],
]

export default function Nav({ theme, onToggle }) {
  const [open, setOpen] = useState(false)
  const dark = theme === 'dark'
  return (
    <header className="nav">
      <a className="mark" href="#top" aria-label="Anum Kousar, back to top">
        <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">
          <g filter="url(#rough)" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 40L18 8l12 32M10.5 28h15" />
            <path d="M34 8v32M34 25l10-17M34 25l10 15" />
          </g>
        </svg>
      </a>
      <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary">
        {links.map(([l, h]) => (
          <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <button
          className="theme"
          onClick={onToggle}
          role="switch"
          aria-checked={dark}
          aria-label={dark ? 'Switch to white theme' : 'Switch to black theme'}
        >
          <span className="knob" aria-hidden="true">
            {dark ? (
              <svg viewBox="0 0 24 24" width="14" height="14"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" fill="currentColor" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></svg>
            )}
          </span>
        </button>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}
