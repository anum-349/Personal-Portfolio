import { site } from '../data/site.js'

export default function Contact() {
  const rows = [
    ['Email', site.email, `mailto:${site.email}`],
    ['LinkedIn', 'in/anum-kousar', site.linkedin],
    ['GitHub', 'anum-349', site.github],
    ['YouTube', 'explore349', site.youtube],
  ]
  return (
    <section className="section contact" id="contact">
      <h2 className="big">Let’s build something that’s been drawn carefully.</h2>
      <p className="sub">I’m open to junior software engineering roles, internships and freelance projects, especially around Python, APIs and AI.</p>
      <ul className="contact-list">
        {rows.map(([k, v, h]) => (
          <li key={k}>
            <span>{k}</span>
            <a href={h} target={h.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">{v}</a>
          </li>
        ))}
      </ul>
    </section>
  )
}
