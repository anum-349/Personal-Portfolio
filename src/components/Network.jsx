import { useEffect, useRef } from 'react'

// A quiet field of drifting dots joined by faint lines. Dots near the cursor reach out to it.
export default function Network() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, dots = []
    let color = '#4E7D5E'
    const mouse = { x: -9999, y: -9999 }
    const LINK = 150, REACH = 190

    const readColor = () => {
      color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || color
    }
    const seed = () => {
      const n = Math.min(120, Math.round((w * h) / 15000))
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
        r: 1.2 + Math.random() * 1.6,
      }))
    }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
      if (reduce) frame(false)
    }

    const frame = (animate = true) => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = color
      ctx.strokeStyle = color
      for (const d of dots) {
        if (animate) {
          d.x += d.vx; d.y += d.vy
          if (d.x < -10) d.x = w + 10; else if (d.x > w + 10) d.x = -10
          if (d.y < -10) d.y = h + 10; else if (d.y > h + 10) d.y = -10
          const mx = mouse.x - d.x, my = mouse.y - d.y
          const md = Math.hypot(mx, my)
          if (md < REACH && md > 1) { d.x += (mx / md) * 0.25; d.y += (my / md) * 0.25 }
        }
      }
      ctx.lineWidth = 1
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.28
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < REACH) {
          ctx.globalAlpha = (1 - md / REACH) * 0.5
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
      }
      ctx.globalAlpha = 0.55
      for (const d of dots) { ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill() }
      ctx.globalAlpha = 1
    }

    const loop = () => { frame(true); raf = requestAnimationFrame(loop) }
    const move = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const leave = () => { mouse.x = mouse.y = -9999 }
    const vis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop)
    }

    readColor(); resize()
    const mo = new MutationObserver(() => { readColor(); if (reduce) frame(false) })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerleave', leave)
    document.addEventListener('visibilitychange', vis)
    vis()
    return () => {
      cancelAnimationFrame(raf); mo.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerleave', leave)
      document.removeEventListener('visibilitychange', vis)
    }
  }, [])

  return <canvas className="network" ref={ref} aria-hidden="true" />
}