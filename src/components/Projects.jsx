import { useRef, useState } from 'react'
import { projects } from '../data/projects.js'
import { site } from '../data/site.js'
import Thumb from './Thumbs.jsx'

function youtubeId(url) {
  if (!url) return null
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)
  return m ? m[1] : null
}

function Panel({ p, autoplay }) {
  const [video, setVideo] = useState(autoplay)
  const id = youtubeId(p.demo)
  return (
    <article className="panel" aria-live="polite">
      {video ? (
        <div className="video">
          {id ? (
            <iframe src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`} title={`${p.title} demo video`} allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen />
          ) : (
            <div className="video-empty">
              <Thumb kind={p.thumb} tone={p.tone} />
              <p>The demo video for {p.title} is still being edited. More screen recordings live on my YouTube channel.</p>
              <a className="btn primary" href={site.youtube} target="_blank" rel="noreferrer">Open YouTube channel</a>
            </div>
          )}
        </div>
      ) : (
        <div className="panel-art"><Thumb kind={p.thumb} tone={p.tone} /></div>
      )}
      <div className="panel-body">
        <span className="kind">{p.kind}</span>
        <h3>{p.title}</h3>
        <p>{p.blurb}</p>
        <ul className="points">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        <ul className="stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
        <div className="panel-actions">
          <button className="btn primary" onClick={() => setVideo(!video)}>{video ? 'Back to drawing' : 'Watch demo'}</button>
          {p.links.map((l) => <a key={l.url} className="btn" href={l.url} target="_blank" rel="noreferrer">{l.label}</a>)}
        </div>
      </div>
    </article>
  )
}

function Row({ p, on, onPick }) {
  return (
    <li>
      <button className={`row ${on ? 'on' : ''}`} onClick={() => onPick(p)} aria-current={on ? 'true' : undefined}>
        <span className="mini"><Thumb kind={p.thumb} tone={p.tone} /></span>
        <span className="row-text">
          <strong>{p.title}</strong>
          <em>{p.kind}</em>
        </span>
      </button>
    </li>
  )
}

export default function Projects() {
  const [all, setAll] = useState(false)
  const [sel, setSel] = useState(projects[0])
  const [tick, setTick] = useState(0)
  const panelRef = useRef(null)
  const featured = projects.filter((p) => p.featured)
  const more = projects.filter((p) => !p.featured)

  const pick = (p) => {
    setSel(p); setTick((t) => t + 1)
    if (window.matchMedia('(max-width: 900px)').matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }

  return (
    <section className="section" id="work">
      <h2 className="h2">Selected work</h2>
      <p className="sub">Pick a project from the list to see its drawing, the details, the demo video and the code.</p>

      <div className="table">
        <div className="list">
          <ul>{featured.map((p) => <Row key={p.id} p={p} on={sel.id === p.id} onPick={pick} />)}</ul>
          <div className={`more ${all ? 'open' : ''}`} id="more-projects" aria-hidden={!all}>
            <div className="more-inner">
              <ul>{more.map((p) => <Row key={p.id} p={p} on={sel.id === p.id} onPick={pick} />)}</ul>
            </div>
          </div>
          <div className="more-btn">
            <button className="btn" onClick={() => setAll(!all)} aria-expanded={all} aria-controls="more-projects">
              {all ? 'Show fewer projects' : `Read more projects (${more.length})`}
            </button>
            <a className="btn ghost" href="https://github.com/anum-349?tab=repositories" target="_blank" rel="noreferrer">All repositories</a>
          </div>
        </div>
        <div className="panel-slot" ref={panelRef}>
          <Panel key={sel.id + tick} p={sel} autoplay={false} />
        </div>
      </div>
    </section>
  )
}
