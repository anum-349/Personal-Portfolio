import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Path from './components/Path.jsx'
import Toolbox from './components/Toolbox.jsx'
import Contact from './components/Contact.jsx'
import { RoughFilter } from './components/Thumbs.jsx'
import Network  from './components/Network.jsx'

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('ak-theme', theme) } catch (e) { /* storage can be unavailable */ }
  }, [theme])

  return (
    <>
      <RoughFilter />
      <Network />
      <a className="skip" href="#main">Skip to content</a>
      <Nav theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Path />
        <Toolbox />
        <Contact />
      </main>
      <footer className="foot">
        <p>Drawn and built by Anum Kousar, 2026. React, a few SVG filters and a lot of pencil.</p>
      </footer>
    </>
  )
}
