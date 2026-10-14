import { useEffect, useRef, useState } from 'react'
import { experience, education, certs } from '../data/site.js'

export default function Path() {
  const ref = useRef(null)
  const [drawn, setDrawn] = useState(false)

  // The one scroll moment: the path line draws itself the first time it comes into view.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="section" id="path">
      <h2 className="h2">Where I’ve built things</h2>
      <ol className={`timeline ${drawn ? 'drawn' : ''}`} ref={ref}>
        {experience.map((x) => (
          <li key={x.org} className="job">
            <span className="dot" aria-hidden="true" />
            <div className="when">{x.when}</div>
            <h3>{x.role}, {x.org}</h3>
            <p className="where">{x.place}</p>
            <ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </li>
        ))}
      </ol>

      <div className="edu">
        <div>
          <h3>{education.degree}</h3>
          <p className="where">{education.school}, {education.when}. CGPA {education.cgpa}.</p>
          <ul className="stack">{education.courses.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <div>
          <h3>Certifications</h3>
          <ul className="certs">{certs.map((c) => <li key={c}>{c}</li>)}</ul>
          <p className="where">Languages: Urdu (native), English (advanced).</p>
        </div>
      </div>
    </section>
  )
}
