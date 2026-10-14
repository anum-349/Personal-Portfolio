export default function About() {
  return (
    <section className="section about" id="about">
      <h2 className="h2">Two benches, one habit of mind</h2>
      <p className="note-hand">I sketch before I code, and I code before I polish.</p>
      <div className="benches">
        <article className="bench">
          <h3>At the keyboard</h3>
          <p>
            I'm a Software Engineering graduate from IIU Islamabad (CGPA 3.57/4.0) who enjoys the part of engineering where things actually go live. Over three internships I've built REST APIs in FastAPI, Django, Flask and Node.js/TypeScript, and deployed them on AWS EC2 and Cloudflare.
          </p>
          <p>
            My favorite work sits where backend meets AI: RAG search, NLP pipelines and an AI email copilot, with React or Next.js frontends on top so people can really use them.
          </p>
        </article>
        <svg className="divider" viewBox="0 0 24 320" preserveAspectRatio="none" aria-hidden="true">
          <path d="M12 2C2 40 22 70 12 110S2 190 12 230s6 60 0 88" />
        </svg>
        <article className="bench">
          <h3>At the easel</h3>
          <p>
            Outside the editor I sketch, paint and make things by hand. It trains the same muscles
            as engineering: noticing proportion, cutting what doesn’t belong, and finishing the
            small details nobody asks about but everybody feels.
          </p>
          <p>
            That’s why this page looks the way it does. Interfaces are drawings people can use, and
            I’d like mine to feel made by a person.
          </p>
        </article>
      </div>
    </section>
  )
}
