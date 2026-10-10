import { useEffect, useMemo, useRef, useState } from "react";
import { profile, about, skills, projects, timeline } from "./data.js";
import { useActiveSection, useCountUp, useInView, useTheme, useTyping } from "./hooks.js";
import portrait from "./assets/anum.png";

const SECTIONS = ["home", "about", "skills", "projects", "journey", "contact"];

/* ---------- small building blocks ---------- */

function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const [ref, seen] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function SectionHeading({ index, title }) {
  return (
    <Reveal className="section-heading">
      <span className="mono accent">0{index}</span>
      <h2>{title}</h2>
      <span className="rule" />
    </Reveal>
  );
}

/* ---------- background: particle field ---------- */

function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, raf;
    const mouse = { x: -9999, y: -9999 };
    let dots = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 18000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const color = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--particle").trim() || "255,255,255";

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const c = color();
      for (const d of dots) {
        if (!reduce) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0 || d.x > w) d.vx *= -1;
          if (d.y < 0 || d.y > h) d.vy *= -1;
        }
        const dm = Math.hypot(d.x - mouse.x, d.y - mouse.y);
        if (dm < 140 && !reduce) {
          // gentle repel from the cursor
          d.x += ((d.x - mouse.x) / dm) * 0.8;
          d.y += ((d.y - mouse.y) / dm) * 0.8;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c},0.55)`;
        ctx.fill();
      }
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(${c},${0.14 * (1 - dist / 110)})`;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles" aria-hidden />;
}

/* ---------- navigation ---------- */

function Nav({ theme, toggleTheme }) {
  const active = useActiveSection(SECTIONS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a href="#home" className="logo mono">
      </a>
      <nav className={`links ${open ? "open" : ""}`}>
        {SECTIONS.slice(1).map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {id}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
          {theme === "dark" ? "☀" : "☾"}
        </button>
        <button className="icon-btn burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}

/* ---------- sections ---------- */

function Hero() {
  const typed = useTyping(profile.roles);
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <Reveal>
          <p className="mono accent">Hi, my name is</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="hero-name">{profile.name}</h1>
        </Reveal>
        <Reveal delay={160}>
          <h2 className="hero-role">
            I'm a <span className="typed">{typed}</span>
            <span className="caret" />
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="lead">{profile.tagline}</p>
        </Reveal>
        <Reveal delay={320} className="cta-row">
          <a className="btn btn--primary" href="#projects">
            View my work
          </a>
          <a className="btn" href="#contact">
            Get in touch
          </a>
          {profile.resumeUrl && profile.resumeUrl !== "#" && (
            <a className="btn btn--ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              Resume ↗
            </a>
          )}
        </Reveal>
      </div>
      <Reveal delay={200} className="hero-photo">
        <div className="photo-frame">
          <img src={portrait} alt={`Portrait of ${profile.name}`} width="340" height="340" />
        </div>
      </Reveal>
    </section>
  );
}

function Stat({ value, suffix, label }) {
  const [ref, seen] = useInView();
  const n = useCountUp(value, seen);
  return (
    <div ref={ref} className="stat">
      <strong>
        {n}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <SectionHeading index={1} title="About me" />
      <div className="about-grid">
        <div>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 100} as="p" className="body">
              {p}
            </Reveal>
          ))}
        </div>
        <Reveal delay={150} className="stats">
          {about.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading index={2} title="Skills" />
      <div className="skills-grid">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 90} className="card">
            <h3 className="mono">{g.group}</h3>
            <ul className="chips">
              {g.items.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, delay }) {
  const ref = useRef(null);

  // 3D tilt + spotlight following the pointer
  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
    el.style.setProperty("--sx", `${x * 100}%`);
    el.style.setProperty("--sy", `${y * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Reveal delay={delay} className="project-wrap">
      <article ref={ref} className="project" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="project-top">
          <span className="folder" aria-hidden>
            ▢
          </span>
          <div className="project-links">
            {p.status && <span className="badge">{p.status}</span>}
            {p.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" aria-label={`${p.title} ${l.label}`}>
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <ul className="stack mono">
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const tags = useMemo(() => ["All", ...new Set(projects.flatMap((p) => p.tags))], []);
  const visible = projects.filter((p) => filter === "All" || p.tags.includes(filter));

  return (
    <section id="projects" className="section">
      <SectionHeading index={3} title="Projects" />
      <div className="filters" role="tablist" aria-label="Filter projects">
        {tags.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={filter === t}
            className={`pill ${filter === t ? "pill--on" : ""}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {visible.map((p, i) => (
          // key includes filter so cards re-animate on change
          <ProjectCard key={p.title + filter} p={p} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="section">
      <SectionHeading index={4} title="Journey" />
      <ol className="timeline">
        {timeline.map((t, i) => (
          <Reveal key={t.title} as="li" delay={i * 100} className="tl-item">
            <span className="tl-dot" />
            <span className="mono accent">{t.period}</span>
            <h3>{t.title}</h3>
            <span className="tl-place">{t.place}</span>
            <p>{t.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // No backend: build a mailto: link so the user's mail client sends it.

  const onSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio message from ${form.name}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `${form.message}`
    );

    const mailtoUrl =
      `mailto:${profile.email}?subject=${subject}&body=${body}`;

    window.location.assign(mailtoUrl);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { }
  };

  return (
    <section id="contact" className="section contact">
      <SectionHeading index={5} title="Get in touch" />
      <div className="contact-grid">
        <Reveal>
          <p className="body">
            I'm open to junior software engineering roles, internships and interesting collaborations. My inbox is
            always open.
          </p>
          <button className="email-copy mono" onClick={copy}>
            {profile.email} <span>{copied ? "✓ copied" : "copy"}</span>
          </button>
          <ul className="socials">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <form className="form card" onSubmit={onSubmit}>
            <label>
              Name
              <input required value={form.name} onChange={set("name")} placeholder="Ada Lovelace" />
            </label>
            <label>
              Email
              <input required type="email" value={form.email} onChange={set("email")} placeholder="ada@example.com" />
            </label>
            <label>
              Message
              <textarea required rows="5" value={form.message} onChange={set("message")} placeholder="Say hello…" />
            </label>
            <button className="btn btn--primary" type="submit">
              Send message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer mono">
      Designed &amp; built by {profile.name} · {new Date().getFullYear()}
    </footer>
  );
}

/* ---------- root ---------- */

export default function App() {
  const [theme, toggleTheme] = useTheme();
  return (
    <>
      <Background />
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
