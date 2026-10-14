import { useRef } from 'react'
import photo from '../assets/anum.png'
import { site } from '../data/site.js'

// The memorable thing: move the pointer across the hero and it leaves charcoal strokes that fade like smudged graphite.
function useCharcoal(sectionRef, canvasRef) {
  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    let w = 0, h = 0, raf = 0
    const strokes = []
    let last = null

    const resize = () => {
      const r = section.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(section)

    const move = (e) => {
      const r = section.getBoundingClientRect()
      const p = { x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() }
      if (last) {
        const dx = p.x - last.x, dy = p.y - last.y
        const speed = Math.hypot(dx, dy)
        if (speed > 2) strokes.push({ a: last, b: p, w: Math.max(1, 5 - speed * 0.08), seed: Math.random() })
      }
      last = p
    }
    const leave = () => { last = null }
    section.addEventListener('pointermove', move)
    section.addEventListener('pointerleave', leave)

    const life = 3200
    const tick = (now) => {
      ctx.clearRect(0, 0, w, h)
      const ink = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#111'
      ctx.strokeStyle = ink
      ctx.lineCap = 'round'
      while (strokes.length && now - strokes[0].b.t > life) strokes.shift()
      for (const s of strokes) {
        const age = (now - s.b.t) / life
        ctx.globalAlpha = Math.max(0, 0.55 * (1 - age) * (1 - age))
        ctx.lineWidth = s.w
        // two slightly offset passes give a grainy, pencil-on-paper edge
        for (let k = 0; k < 2; k++) {
          const o = (k ? 1.4 : -1.2) * s.seed
          ctx.beginPath()
          ctx.moveTo(s.a.x + o, s.a.y - o)
          ctx.lineTo(s.b.x - o, s.b.y + o)
          ctx.stroke()
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      section.removeEventListener('pointermove', move)
      section.removeEventListener('pointerleave', leave)
    }
  }, [sectionRef, canvasRef])
}

export default function Hero() {
  const sec = useRef(null)

  return (
    <section className="hero" id="top" ref={sec}>
      <div className="hero-copy">
        <h1 className="name">
          <span>Anum</span> <span>Kousar</span>
        </h1>
        <svg className="underline" viewBox="0 0 520 28" preserveAspectRatio="none" aria-hidden="true">
          <path d="M4 18C70 6 120 24 190 14S330 6 400 16s90 2 116-4" pathLength="1" />
        </svg>
        <p className="role">Software engineer. I design the system on paper first, then build it in Python, TypeScript and React.</p>
        <p className="lede">
          I build backends that ship and the AI layer on top of them: REST APIs, retrieval systems and full-stack products, from first commit to live deployment. <br /> Based in {site.location}.
        </p>
        <div className="cta">
          <a className="btn primary" href="#work">See the work</a>
          <a className="btn" href="#contact">Say hello</a>
          {site.resume && <a className="btn ghost" href={site.resume} download>Résumé (PDF)</a>}
        </div>
        <p className="hint" aria-hidden="true">psst: move your cursor, the network reaches for it</p>
      </div>

      <figure className="desk">
        <div className="bloom" aria-hidden="true" />
        <img src={photo} alt="Anum at her desk, typing on a laptop covered in stickers, with a plant, a mug and a stack of books on clean code, web development and Python." width="612" height="408" />
        <span className="note n1">build, ship, repeat</span>
        <svg className="arrow a1" viewBox="0 0 80 60" aria-hidden="true"><path d="M70 6C40 6 20 22 12 46M12 46l-2-12M12 46l12-6" /></svg>
        <span className="note n2">better code, bigger dreams</span>
        <svg className="arrow a2" viewBox="0 0 80 60" aria-hidden="true"><path d="M10 6C40 6 62 22 68 46M68 46l-12-6M68 46l2-12" /></svg>
      </figure>
    </section>
  )
}
