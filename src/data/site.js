// Everything personal lives here, so the components stay clean.
export const site = {
  name: 'Anum Kousar',
  role: 'Junior Software Engineer',
  location: 'Rawalpindi, Pakistan',
  email: 'anumkousar552@gmail.com',
  github: 'https://github.com/anum-349',
  linkedin: 'https://www.linkedin.com/in/anum-kousar',
  youtube: 'https://www.youtube.com/c/explore349',
  // Put the PDF in /public. Set to null to hide the button.
  resume: import.meta.env.VITE_RESUME === 'off' ? null : '/Anum_Kousar_Resume.pdf',
}

export const experience = [
  {
    role: 'Full-Stack Developer',
    org: 'Digiwaz',
    place: 'Remote',
    when: 'May 2026 – Jul 2026',
    points: [
      'Delivered 3 client web apps (Roomero, AutoSter, UrduPress): React interfaces and Python REST APIs on PostgreSQL and Supabase, live on Cloudflare.',
      'Shipped an AI Email Copilot that summarises mail, drafts replies and manages tasks and reminders.',
    ],
  },
  {
    role: 'MERN Stack Intern',
    org: 'HH Tech Hub',
    place: 'Rawalpindi',
    when: 'Oct 2025 – Jan 2026',
    points: [
      'Built full-stack modules for a real client’s LMS and ERP system, with Express.js APIs consumed by a Next.js frontend.',
      'Worked in sprints and code reviews, shipping production-ready features.',
    ],
  },
  {
    role: 'Python & JavaScript Intern',
    org: 'Freelance client project',
    place: 'Remote',
    when: 'Oct 2024 – Dec 2024',
    points: [
      'Built Flask REST APIs for authentication and data endpoints, fixed recurring bugs in a Django app, and deployed it on AWS EC2.',
    ],
  },
]

export const skills = [
  { group: 'Backend', items: ['Python', 'FastAPI', 'Django / DRF', 'Flask', 'Node.js', 'Express.js', 'TypeScript', 'REST design', 'JWT / OAuth', 'RBAC'] },
  { group: 'AI and ML', items: ['RAG', 'LangChain', 'FAISS', 'SBERT', 'NLP', 'NER', 'Machine Learning'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Supabase'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { group: 'Cloud and workflow', items: ['AWS EC2', 'Cloudflare', 'Docker', 'Git', 'pytest', 'Postman', 'Agile / Scrum'] },
]

export const education = {
  degree: 'Bachelor of Software Engineering',
  school: 'International Islamic University, Islamabad',
  when: '2022 – 2026',
  cgpa: '3.57 / 4.0',
  courses: ['Data Structures', 'Databases', 'Operating Systems', 'Computer Networks', 'Machine Learning', 'Human-Computer Interaction', 'Mobile Application Development', 'Artificial Intelligence'],
}

export const certs = ['Machine Learning · NextGenLearners', 'Build with AI · Google Workshop', 'Python · HackerRank']
