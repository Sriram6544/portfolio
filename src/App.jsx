import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiDownload, FiMenu, FiX } from "react-icons/fi"
import { SiPython, SiFastapi, SiPostgresql, SiMongodb, SiStreamlit } from "react-icons/si"

// ── DATA ─────────────────────────────────────────────────────────────────────

const NAV = ["About", "Projects", "Skills", "Experience", "Blog", "Contact"]

const ROLES = [
  "AI Engineer",
  "LLM Systems Builder",
  "Multi-Agent Architect",
  "RAG Pipeline Engineer",
  "MSc AI Researcher",
]

const STATS = [
  { value: 2, label: "years industry experience", suffix: "+" },
  { value: 3, label: "production AI systems shipped", suffix: "" },
  { value: 5, label: "agents coordinated in SAMFO", suffix: "" },
  { value: 10, label: "projects on the roadmap", suffix: "" },
]

const PROJECTS = [
  {
    id: 1,
    featured: true,
    title: "SAMFO — Self-Adaptive Memory and Feedback Orchestrator",
    subtitle: "MSc Thesis · Munster Technological University · 2025–2026",
    description:
      "A self-adaptive multi-agent orchestration framework that solves the core reliability problem in production agentic systems — what happens when an API changes its schema mid-run. SAMFO detects schema drift in real time, triggers rule-based failover before failure cascades, and maintains full observability across 4–5 coordinated agents.",
    bullets: [
      "Real-time schema drift detection across agent-to-API communication layers",
      "Adaptive failover logic that prevents failure propagation between agents",
      "Shared memory and feedback loops across 4–5 specialised agents",
      "Validated under controlled failure injection and live API conditions",
    ],
    tags: ["Python", "CrewAI", "FastAPI", "HTTPX", "Multi-Agent", "MCP"],
    category: "Agents",
    github: "https://github.com/saisrirammarneni",
    color: "teal",
  },
  {
    id: 2,
    featured: false,
    title: "Multi-Agent RAG & Contract Lifecycle Management",
    subtitle: "Personal Project · 2024",
    description:
      "A production-ready RAG pipeline for intelligent semantic search across 50–200 legal contracts and enterprise documents. Multi-agent coordination handles retrieval, analysis, and summarisation independently.",
    bullets: [
      "Semantic search over 50–200 PDF contracts using OpenAI embeddings + ChromaDB",
      "Embedding evaluation and index tuning for improved query relevance",
      "Streamlit UI for non-technical users — zero code needed to query the corpus",
    ],
    tags: ["Python", "LangChain", "OpenAI", "CrewAI", "ChromaDB", "Streamlit"],
    category: "RAG",
    github: "https://github.com/saisrirammarneni",
    color: "purple",
  },
  {
    id: 3,
    featured: false,
    title: "5-Agent Supply Chain Management System",
    subtitle: "Mphasis · 2024",
    description:
      "Deployed a 5-agent supply chain automation system to production at Mphasis, enabling AI-driven decision workflows across multi-turn enterprise interactions with MCP integration.",
    bullets: [
      "MCP integration enabling structured tool calls between agents and SQL backend",
      "Multi-turn dialogue management — agents maintain context across interactions",
      "Synthetic dataset creation for AI-powered operational decision workflows",
    ],
    tags: ["Python", "CrewAI", "PostgreSQL", "MCP"],
    category: "Agents",
    github: "https://github.com/saisrirammarneni",
    color: "blue",
  },
  {
    id: 4,
    featured: false,
    title: "Employee Turnover Classification — 45% to 78% Accuracy",
    subtitle: "Mphasis · 2024",
    description:
      "Improved a failing employee turnover prediction model through systematic ML engineering — EDA, class balancing, cross-validation, and hyperparameter tuning.",
    bullets: [
      "SMOTE class balancing to handle severe target imbalance",
      "k-fold cross-validation for robust model evaluation",
      "Systematic hyperparameter tuning identifying the best-performing classifier",
    ],
    tags: ["Python", "Scikit-learn", "Pandas", "SMOTE"],
    category: "ML",
    github: "https://github.com/saisrirammarneni",
    color: "amber",
  },
]

const SKILLS = [
  {
    category: "AI / LLM",
    icon: "🤖",
    items: [
      { name: "Large Language Models", level: 90 },
      { name: "RAG Pipelines", level: 88 },
      { name: "Multi-Agent Systems", level: 85 },
      { name: "Prompt Engineering", level: 87 },
      { name: "Model Context Protocol", level: 80 },
    ],
  },
  {
    category: "Frameworks",
    icon: "⚙️",
    items: [
      { name: "CrewAI", level: 88 },
      { name: "LangChain", level: 85 },
      { name: "FastAPI", level: 82 },
      { name: "Streamlit", level: 80 },
      { name: "HTTPX", level: 78 },
    ],
  },
  {
    category: "Languages & Data",
    icon: "💻",
    items: [
      { name: "Python", level: 92 },
      { name: "SQL", level: 80 },
      { name: "JavaScript", level: 65 },
      { name: "PostgreSQL", level: 78 },
      { name: "MongoDB", level: 72 },
    ],
  },
  {
    category: "Cloud & APIs",
    icon: "☁️",
    items: [
      { name: "Azure OpenAI", level: 85 },
      { name: "OpenAI API", level: 88 },
      { name: "ChromaDB", level: 82 },
      { name: "Vector Databases", level: 80 },
      { name: "Git", level: 82 },
    ],
  },
]

const EXPERIENCE = [
  {
    role: "MSc AI Researcher & Thesis Engineer",
    company: "Munster Technological University",
    location: "Cork, Ireland",
    period: "Sep 2025 – Aug 2026",
    type: "education",
    points: [
      "Designing and building SAMFO — a self-adaptive multi-agent orchestration framework",
      "Research focus: runtime reliability and observability in production agentic systems",
      "Implementing schema drift detection, adaptive failover, and shared agent memory",
    ],
  },
  {
    role: "Associate Software Engineer — AI & LLM Systems",
    company: "Mphasis",
    location: "Bengaluru, India",
    period: "Aug 2023 – Aug 2025",
    type: "work",
    points: [
      "Built and deployed a 5-agent supply chain automation system using CrewAI and MCP",
      "Improved employee turnover model accuracy from ~45% to ~78% through systematic ML engineering",
      "Developed privacy-preserving content moderation using locally hosted LLMs — LLaMA 2, BERT, Mistral",
      "Engineered LLM-powered internal tooling that automated data pipeline workflows",
    ],
  },
  {
    role: "B.Tech",
    company: "QIS Institute of Technology",
    location: "Andhra Pradesh, India",
    period: "Jun 2018 – Jun 2022",
    type: "education",
    points: ["GPA: 7.44/10", "Engineering foundations: programming, data structures, mathematics"],
  },
]

const BLOG_POSTS = [
  {
    title: "My MSc thesis solves a problem that breaks most production agentic systems",
    date: "Aug 2025",
    tag: "Agents",
    excerpt:
      "When an agent calls an external API mid-run and the schema has changed — the whole pipeline fails silently. Here is how SAMFO fixes this.",
    link: "https://www.linkedin.com/in/saisriram-marneni-ai/",
  },
  {
    title: "MCP vs regular API calling — the actual difference",
    date: "Coming soon",
    tag: "MCP",
    excerpt:
      "Everyone talks about Model Context Protocol but very few explain what it actually does differently. Here is a concrete breakdown.",
    link: "#",
  },
  {
    title: "Week 1 of my AI engineering roadmap — what I built",
    date: "Coming soon",
    tag: "Learning",
    excerpt: "Started the full AI engineering roadmap this week. Here is what I covered, what surprised me, and what I shipped.",
    link: "#",
  },
]

// ── COLOUR HELPERS ────────────────────────────────────────────────────────────
const tagColors = {
  teal: "bg-teal-900/40 text-teal-300 border border-teal-700/50",
  purple: "bg-purple-900/40 text-purple-300 border border-purple-700/50",
  blue: "bg-blue-900/40 text-blue-300 border border-blue-700/50",
  amber: "bg-amber-900/40 text-amber-300 border border-amber-700/50",
}

const cardAccent = {
  teal: "border-teal-500/50 hover:border-teal-400",
  purple: "border-purple-500/50 hover:border-purple-400",
  blue: "border-blue-500/50 hover:border-blue-400",
  amber: "border-amber-500/50 hover:border-amber-400",
}

const barColor = {
  teal: "bg-teal-500",
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
}

const CATEGORY_COLORS = ["teal", "purple", "blue", "amber"]

// ── REUSABLE COMPONENTS ───────────────────────────────────────────────────────

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold text-white mb-3">{children}</h2>
      {sub && <p className="text-slate-400 text-lg max-w-xl mx-auto">{sub}</p>}
      <div className="mt-4 mx-auto w-16 h-0.5 bg-teal-500 rounded-full" />
    </div>
  )
}

function Tag({ text }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-700/60 text-slate-300 border border-slate-600/50">
      {text}
    </span>
  )
}

function AnimatedCounter({ value, suffix, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = Math.ceil(value / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-teal-400 mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  )
}

function SkillBar({ name, level, color = "teal" }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-slate-300">{name}</span>
        <span className="text-xs text-slate-500">{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor[color] || "bg-teal-500"}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  )
}

// ── SECTIONS ──────────────────────────────────────────────────────────────────

function Hero({ roleIndex }) {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-teal-900/40 border border-teal-700/50">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-teal-300 text-sm font-medium">Available for hire · Aug 2026</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Sai Sri Ram<br />
          <span className="text-teal-400">Marneni</span>
        </h1>

        <div className="h-10 mb-6 flex items-center justify-center">
          <motion.p
            key={roleIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xl md:text-2xl text-slate-300 font-light"
          >
            {ROLES[roleIndex]}
          </motion.p>
        </div>

        <p className="text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
          2 years building production AI systems at Mphasis · MSc AI researcher at MTU Cork ·
          Specialising in LLMs, multi-agent orchestration, and RAG pipelines
        </p>

        <div className="flex gap-4 justify-center flex-wrap mb-10">
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) }}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold rounded-lg transition-colors"
          >
            View my projects
          </a>
          <a
            href="/cv.pdf"
            download
            className="px-6 py-3 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <FiDownload size={16} /> Download CV
          </a>
        </div>

        <div className="flex gap-6 justify-center">
          {[
            { icon: FiGithub, href: "https://github.com/saisrirammarneni", label: "GitHub" },
            { icon: FiLinkedin, href: "https://linkedin.com/in/saisriram-marneni-ai", label: "LinkedIn" },
            { icon: FiMail, href: "mailto:marnenisriram@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-colors" aria-label={label}>
              <Icon size={22} />
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-teal-500 to-transparent mx-auto" />
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle sub="The short version">About me</SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <p className="text-slate-300 leading-relaxed mb-4">
            I build AI systems that actually work in production — not just demos.
          </p>
          <p className="text-slate-400 leading-relaxed mb-4">
            2 years at Mphasis building LLM-powered automation, multi-agent orchestration, and
            privacy-preserving AI systems. Now completing my MSc at MTU Cork, where my thesis
            (SAMFO) tackles one of the hardest unsolved problems in agentic AI — making
            agent-to-API communication fault-tolerant in real enterprise environments.
          </p>
          <p className="text-slate-400 leading-relaxed">
            I care about three things in AI systems: reliability, observability, and making them
            actually useful — not just impressive in a notebook.
          </p>
          <div className="flex gap-3 mt-6 flex-wrap">
            <Tag text="Cork, Ireland" />
            <Tag text="Open to remote" />
            <Tag text="MSc AI · MTU" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-52 h-52 rounded-2xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-6xl">
            👨‍💻
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-b border-slate-700/50">
        {STATS.map(s => <AnimatedCounter key={s.label} {...s} />)}
      </div>
    </section>
  )
}

function Projects() {
  const [filter, setFilter] = useState("All")
  const categories = ["All", "Agents", "RAG", "ML"]
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter)

  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle sub="Production systems, research, and everything in between">Projects</SectionTitle>

      <div className="flex gap-3 justify-center mb-10 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              filter === c
                ? "bg-teal-500 border-teal-500 text-slate-900"
                : "border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-300"
            }`}>
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((p, i) => (
          <motion.div key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-xl border bg-slate-800/50 p-6 transition-all duration-300 ${cardAccent[p.color]}`}
          >
            <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
              <div>
                {p.featured && (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full mr-3 ${tagColors[p.color]}`}>
                    ★ Featured — thesis
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white mt-1">{p.title}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{p.subtitle}</p>
              </div>
              <a href={p.github} target="_blank" rel="noreferrer"
                className="text-slate-400 hover:text-teal-400 transition-colors flex-shrink-0" aria-label="GitHub">
                <FiGithub size={20} />
              </a>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.description}</p>
            <ul className="space-y-1.5 mb-4">
              {p.bullets.map(b => (
                <li key={b} className="text-sm text-slate-400 flex gap-2">
                  <span className="text-teal-500 mt-0.5 flex-shrink-0">→</span>{b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {p.tags.map(t => <Tag key={t} text={t} />)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle sub="Tools I use to build production AI systems">Skills</SectionTitle>
      <div className="grid md:grid-cols-2 gap-8">
        {SKILLS.map((group, gi) => {
          const col = CATEGORY_COLORS[gi % CATEGORY_COLORS.length]
          return (
            <div key={group.category} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                <span>{group.icon}</span>{group.category}
              </h3>
              {group.items.map(s => <SkillBar key={s.name} name={s.name} level={s.level} color={col} />)}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-3xl mx-auto">
      <SectionTitle sub="Where I've worked and studied">Experience</SectionTitle>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-700" />
        <div className="space-y-10">
          {EXPERIENCE.map((e, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12"
            >
              <div className={`absolute left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${
                e.type === "education"
                  ? "bg-purple-900/60 border-purple-500 text-purple-300"
                  : "bg-teal-900/60 border-teal-500 text-teal-300"
              }`}>
                {e.type === "education" ? "🎓" : "💼"}
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
                <div className="flex justify-between flex-wrap gap-2 mb-1">
                  <h3 className="font-semibold text-white">{e.role}</h3>
                  <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded">{e.period}</span>
                </div>
                <p className="text-teal-400 text-sm mb-3">{e.company} · {e.location}</p>
                <ul className="space-y-1.5">
                  {e.points.map(pt => (
                    <li key={pt} className="text-sm text-slate-400 flex gap-2">
                      <span className="text-teal-500 mt-0.5 flex-shrink-0">→</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Blog() {
  return (
    <section id="blog" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle sub="Technical posts, learning updates, and project breakdowns">Blog</SectionTitle>
      <div className="grid md:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post, i) => (
          <motion.a key={i} href={post.link} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="block bg-slate-800/50 border border-slate-700/50 hover:border-teal-500/50 rounded-xl p-5 transition-all group"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-teal-900/40 text-teal-300 border border-teal-700/50">
                {post.tag}
              </span>
              <span className="text-xs text-slate-500">{post.date}</span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-2 leading-snug group-hover:text-teal-300 transition-colors">
              {post.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-1 text-teal-400 text-xs font-medium">
              Read more <FiExternalLink size={12} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 px-6 max-w-2xl mx-auto">
      <SectionTitle sub="Open to AI Engineer roles in Ireland and Europe">Get in touch</SectionTitle>
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
        {sent ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-white font-semibold text-lg mb-2">Message sent!</h3>
            <p className="text-slate-400 text-sm">I'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: "name", label: "Your name", type: "text", placeholder: "Jane Smith" },
              { id: "email", label: "Your email", type: "email", placeholder: "jane@company.com" },
            ].map(f => (
              <div key={f.id}>
                <label className="block text-sm text-slate-400 mb-1.5">{f.label}</label>
                <input type={f.type} required placeholder={f.placeholder}
                  value={form[f.id]}
                  onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                  className="w-full bg-slate-900/60 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Message</label>
              <textarea required rows={4} placeholder="What would you like to discuss?"
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="w-full bg-slate-900/60 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-teal-500 transition-colors resize-none"
              />
            </div>
            <button type="submit"
              className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold rounded-lg transition-colors">
              Send message
            </button>
          </form>
        )}
        <div className="mt-6 pt-6 border-t border-slate-700/50 flex justify-center gap-6">
          {[
            { icon: FiGithub, href: "https://github.com/saisrirammarneni", label: "GitHub" },
            { icon: FiLinkedin, href: "https://linkedin.com/in/saisriram-marneni-ai", label: "LinkedIn" },
            { icon: FiMail, href: "mailto:marnenisriram@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 text-sm">
              <Icon size={16} />{label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  function scrollTo(id) {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-slate-900/95 backdrop-blur border-b border-slate-700/50" : "bg-transparent"
    }`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-white text-sm tracking-wide">SSR<span className="text-teal-400">.</span>dev</span>
        <div className="hidden md:flex items-center gap-6">
          {NAV.map(n => (
            <button key={n} onClick={() => scrollTo(n)}
              className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
              {n}
            </button>
          ))}
        </div>
        <button className="md:hidden text-slate-400" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-slate-900/98 border-b border-slate-700/50 px-6 pb-4">
          {NAV.map(n => (
            <button key={n} onClick={() => scrollTo(n)}
              className="block w-full text-left py-3 text-sm text-slate-400 hover:text-teal-400 border-b border-slate-800 transition-colors">
              {n}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero roleIndex={roleIndex} />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Blog />
      <Contact />
      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-800">
        Built by Sai Sri Ram Marneni · Cork, Ireland · {new Date().getFullYear()}
      </footer>
    </div>
  )
}
