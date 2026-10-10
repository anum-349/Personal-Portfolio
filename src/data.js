// ✏️ EDIT THIS FILE ONLY — everything on the site is driven from here.

export const profile = {
  name: "Anum Kousar",
  roles: ["Junior Software Engineer", "Python & AI Backend Engineer", "Full-Stack Developer", "RAG & NLP Builder"],
  tagline:
    "I build backends that ship and the AI layer on top of them: REST APIs, retrieval systems and full-stack products, from first commit to live deployment.",
  location: "Rawalpindi, Pakistan",
  email: "anumkousar552@gmail.com",
  // BASE_URL keeps the link working when deployed under a subpath (e.g. GitHub Pages)
  resumeUrl: `${import.meta.env.BASE_URL}Anum_Kousar_Resume.pdf`,
  socials: [
    { label: "GitHub", url: "https://github.com/anum-349" },
    { label: "LinkedIn", url: "https://linkedin.com/in/anum-kousar" },
  ],
};

export const about = {
  paragraphs: [
    "I'm a Software Engineering graduate from IIU Islamabad (CGPA 3.57/4.0) who enjoys the part of engineering where things actually go live. Over three internships I've built REST APIs in FastAPI, Django, Flask and Node.js/TypeScript, and deployed them on AWS EC2 and Cloudflare.",
    "My favorite work sits where backend meets AI: RAG search, NLP pipelines and an AI email copilot, with React or Next.js frontends on top so people can really use them.",
    "Certified in Machine Learning (NextGenLearners), Build with AI (Google) and Python (HackerRank). I work comfortably in Urdu and English, and I'm open to junior roles.",
  ],
  stats: [
    { value: 3, suffix: "", label: "Internships completed" },
    { value: 3, suffix: "", label: "Client web apps delivered" },
    { value: 35, suffix: "%", label: "Better retrieval accuracy than keyword search" },
  ],
};

export const skills = [
  { group: "Backend", items: ["Python", "FastAPI", "Django / DRF", "Flask", "Node.js", "Express", "TypeScript", "REST design", "JWT / OAuth", "RBAC"] },
  { group: "AI / ML", items: ["RAG", "LangChain", "FAISS", "SBERT", "NLP", "NER", "Machine Learning"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Supabase"] },
  { group: "Cloud & Workflow", items: ["AWS EC2", "Cloudflare", "Docker", "Git", "pytest", "Postman", "Agile / Scrum"] },
];

const gh = (repo) => `https://github.com/anum-349/${repo}`;

export const projects = [
  {
    title: "AI Criminal Investigation Assistant",
    description:
      "Final-year project: a bilingual desktop platform that analyzes FIRs and turns them into investigative leads and crime forecasts. Case linking reached 89.2% MAP, entity extraction 84.7% F1, and usability testing scored 81/100.",
    tags: ["AI", "Backend"],
    stack: ["Python", "FastAPI", "Electron.js", "SBERT", "NER"],
    links: [
      { label: "Backend", url: gh("Criminal-Investigation-Assistant-Backend") },
      { label: "Frontend", url: gh("Criminal-Investigation-Assistant") },
    ],
  },
  {
    title: "SmartDoc Retriever",
    description:
      "A retrieval-augmented document search system. Tuning the embeddings lifted query accuracy by 35% over plain keyword search.",
    tags: ["AI"],
    stack: ["Python", "FAISS", "RAG", "LangChain"],
    links: [{ label: "Code", url: gh("SmartDoc-Retriever") }],
  },
  {
    title: "Smart Learning Management System",
    description:
      "A full-stack LMS with separate role-based dashboards, built on a Next.js frontend and a Node.js + PostgreSQL backend.",
    tags: ["Full-Stack"],
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    links: [{ label: "Code", url: gh("Smart-Learning-Management-System") }],
  },
  {
    title: "Career Guidance Chatbot",
    description:
      "Classifies a student's questions into career roles, retrieves the closest answers, and falls back to a RoBERTa model for questions it hasn't seen.",
    tags: ["AI"],
    stack: ["Python", "scikit-learn", "RoBERTa", "Streamlit"],
    links: [{ label: "Code", url: gh("Career-Guidance-Chatbot") }],
  },
  {
    title: "Stock Screener",
    description:
      "Scans U.S. sector stocks for breakouts using SMA crossovers, RSI and volume surges, then ranks the results on a web dashboard.",
    tags: ["Backend"],
    stack: ["Flask", "yfinance", "Python"],
    links: [{ label: "Code", url: gh("StockScreenerProject") }],
  },
  {
    title: "Car Mechanic Platform",
    description:
      "In progress: a platform to manage repair jobs and service history with role-based access, with AI-powered diagnostics and maintenance advice planned next.",
    tags: ["Full-Stack"],
    stack: ["React", "Django", "PostgreSQL", "REST"],
    links: [],
    status: "In progress",
  },
];

export const timeline = [
  {
    period: "May – Jul 2026",
    title: "Full-Stack Developer",
    place: "Digiwiz · Remote",
    text: "Delivered three client web apps (Roomero, AutoSter, UrduPress) with React frontends and Python REST APIs on PostgreSQL and Supabase, live on Cloudflare. Also shipped an AI email copilot that summarizes threads, drafts replies and manages tasks and reminders.",
  },
  {
    period: "Oct 2025 – Jan 2026",
    title: "MERN Stack Intern",
    place: "HH Tech Hub · Rawalpindi",
    text: "Built full-stack modules for a real client's LMS and ERP system, with Express.js APIs feeding a Next.js frontend, working in sprints and code reviews.",
  },
  {
    period: "Oct – Dec 2024",
    title: "Python & JavaScript Intern",
    place: "Freelance client project · Remote",
    text: "Built Flask REST APIs for authentication and data endpoints, fixed recurring bugs in a Django app to make it more stable, and deployed it on AWS EC2.",
  },
  {
    period: "2022 – 2026",
    title: "B.S. Software Engineering",
    place: "International Islamic University, Islamabad",
    text: "Graduated with a 3.57 CGPA. Focus areas: data structures, databases, operating systems, networks, machine learning and AI.",
  },
];
