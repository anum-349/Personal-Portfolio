import { skills } from '../data/site.js'

export default function Toolbox() {
  return (
    <section className="section" id="toolbox">
      <h2 className="h2">The toolbox</h2>
      <p className="sub">What’s in reach when I sit down to build.</p>
      <div className="tools">
        {skills.map((g) => (
          <div className="tool-row" key={g.group}>
            <h3>{g.group}</h3>
            <ul>
              {g.items.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
