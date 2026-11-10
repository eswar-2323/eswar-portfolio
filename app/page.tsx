'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Phone, MessageCircle, Menu, Pause, Play, RotateCcw, X } from 'lucide-react';

const projects = [
  {
    number: '01', type: 'CLOUD ENGINEERING', title: 'Serverless Asynchronous Processing System',
    description: 'A decoupled, API-driven job processing workflow built with managed AWS services to handle background tasks and track execution status.',
    points: ['Designed job submission through API Gateway and AWS Lambda.', 'Used Amazon SQS to decouple background processing.', 'Stored job details and processing status in DynamoDB.', 'Built around scalable AWS-managed components.'],
    stack: ['AWS Lambda', 'API Gateway', 'Amazon SQS', 'DynamoDB'],
  },
  {
    number: '02', type: 'DATA ANALYTICS', title: 'GitHub Developer Analyzer',
    description: 'An interactive analytics tool that turns GitHub profile and repository activity into clear visual insights.',
    points: ['Integrated GitHub REST API to retrieve profile and repository data.', 'Processed developer activity and repository metadata with Python.', 'Visualized language distribution, contribution trends and repository growth.', 'Built an interactive dashboard for profile-level exploration.'],
    stack: ['Python', 'Streamlit', 'Plotly', 'GitHub REST API'],
  },
];

const skills = ['Python', 'SQL', 'C · Basic', 'MySQL', 'PostgreSQL', 'AWS', 'EC2', 'S3', 'Route 53', 'CloudWatch', 'Power BI', 'Tableau', 'Git', 'GitHub', 'DBMS', 'OOP', 'Data Structures'];
const agents = [
  { name: 'SCOUT', color: '#ff4b42', x: 11, y: 17 }, { name: 'LAYOUT', color: '#65a9ff', x: 82, y: 24 },
  { name: 'TYPESET', color: '#d7a4ff', x: 18, y: 74 }, { name: 'MOTION', color: '#ffc36a', x: 78, y: 72 },
  { name: 'QA', color: '#79d9ae', x: 49, y: 13 }, { name: 'DEPLOY', color: '#ff7fa8', x: 52, y: 84 },
];

export default function Home() {
  const [agentsOn, setAgentsOn] = useState(true);
  const [paused, setPaused] = useState(false);
  const [touring, setTouring] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [built, setBuilt] = useState(false);
  const [cursorPositions, setCursorPositions] = useState(agents.map((a) => ({ x: a.x, y: a.y })));
  const tourTimer = useRef<number | null>(null);
  const replay = useCallback(() => {
    setBuilt(false); setPaused(false); setAgentsOn(true); setTouring(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.setTimeout(() => setBuilt(true), 450);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const force = new URLSearchParams(window.location.search).get('agents');
    if (force === 'off' || (reduced && force !== 'on')) setAgentsOn(false);
    const saved = localStorage.getItem('eswar-agents');
    if (saved && force === null) setAgentsOn(saved === 'on');
    const boot = window.setTimeout(() => setBuilt(true), 900);
    return () => window.clearTimeout(boot);
  }, []);

  useEffect(() => {
    if (!built) return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-build]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-built');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [built]);

  useEffect(() => {
    if (!agentsOn || paused) return;
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      if (frame % 5 === 0) {
        setCursorPositions(agents.map((a, i) => ({
          x: 10 + ((a.x + Math.sin(frame / (48 + i * 8) + i) * 9 + i * 7) % 80),
          y: 12 + ((a.y + Math.cos(frame / (58 + i * 9) + i) * 12 + i * 5) % 76),
        })));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [agentsOn, paused]);

  useEffect(() => {
    if (!touring) return;
    let last = performance.now();
    let elapsed = 0;
    const step = (now: number) => {
      if (!touring) return;
      elapsed += Math.min(now - last, 40); last = now;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(elapsed / 24000, 1);
      const eased = progress < .5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, max * eased);
      if (progress >= 1) setTouring(false);
      else tourTimer.current = window.setTimeout(() => requestAnimationFrame(step), 16);
    };
    const stop = () => setTouring(false);
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') stop(); });
    requestAnimationFrame(step);
    return () => { if (tourTimer.current) clearTimeout(tourTimer.current); window.removeEventListener('wheel', stop); window.removeEventListener('touchstart', stop); };
  }, [touring]);

  const toggleAgents = () => setAgentsOn((v) => { localStorage.setItem('eswar-agents', v ? 'off' : 'on'); return !v; });
  const startTour = () => { if (window.scrollY > 10) window.scrollTo({ top: 0, behavior: 'smooth' }); setBuilt(true); setTouring(true); };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const key = event.key.toLowerCase();
      if (key === 'escape') setTouring(false);
      if (key === 't') { window.scrollTo({ top: 0, behavior: 'smooth' }); setTouring(true); }
      if (key === 'a') setAgentsOn((v) => { localStorage.setItem('eswar-agents', v ? 'off' : 'on'); return !v; });
      if (key === 'p') setPaused((v) => !v);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="wordmark" href="#home">ER<span>®</span></a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <a href="#work" onClick={() => setMenuOpen(false)}>WORK <i>01</i></a>
          <a href="#stack" onClick={() => setMenuOpen(false)}>STACK <i>02</i></a>
          <a href="#record" onClick={() => setMenuOpen(false)}>RECORD <i>03</i></a>
          <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT <i>04</i></a>
          <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>LET&apos;S TALK <ArrowUpRight size={14}/></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      {agentsOn && built && agents.map((agent, i) => <div key={agent.name} className="agent" style={{ left: `${cursorPositions[i].x}%`, top: `${cursorPositions[i].y}%`, ['--agent' as string]: agent.color }}><span className="agent-arrow">➤</span><span className="agent-tag"><b>◉</b> {agent.name}</span></div>)}

      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-kicker"><span className="status-dot"/> PORTFOLIO / 2026 <span className="kicker-line"/> INDEPENDENT BUILDER</div>
        <div className="giant-word" aria-hidden="true">PORTFOLIO</div>
        <div className="hero-glow" />
        <div className="hero-person"><Image src="/headshot.png" alt="Black and white portrait of Eswar Rao" fill priority sizes="(max-width: 700px) 90vw, 48vw" /></div>
        <div className="hero-copy build-in" data-build="type">
          <p className="handwritten">Hello, I&apos;m</p>
          <h1>MAMIDIPAKA<br/><span>ESWARA RAO</span><em>.</em></h1>
          <p className="role">AI &amp; DATA SCIENCE STUDENT</p>
          <p className="hero-bio">Building practical solutions at the intersection of data, cloud and intelligent systems.</p>
          <a className="button-primary" href="#work">EXPLORE MY WORK <ArrowDownRight size={16}/></a>
          <p className="based">BASED IN <strong>ANDHRA PRADESH, INDIA</strong></p>
        </div>
        <div className="hero-stats build-in" data-build="pop">
          <div><strong>9.28<span>/10</span></strong><small>ACADEMIC CGPA</small></div>
          <div><strong>02</strong><small>FEATURED PROJECTS</small></div>
          <div><strong>2027</strong><small>GRADUATION YEAR</small></div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-line"/><span>01 — 05</span></div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Work that<br/><span>moves things.</span></h2></div><p className="section-aside">A selection of projects where I turn technical ideas into useful, working systems.</p></div>
        <div className="work-list">{projects.map((p) => <article className="project-card" key={p.number} data-build="pop"><div className="project-top"><span>{p.number} / {p.type}</span><ArrowUpRight size={20}/></div><h3>{p.title}</h3><p className="project-desc">{p.description}</p><ul>{p.points.map((point) => <li key={point}>{point}</li>)}</ul><div className="chips">{p.stack.map((s) => <span key={s}>{s}</span>)}</div></article>)}</div>
      </section>

      <section className="stack-section" id="stack"><div className="section-heading compact"><div><p className="eyebrow">02 / TOOLKIT</p><h2>My working <span>stack.</span></h2></div><p className="section-aside">Tools I use to query, build, analyze and ship.</p></div><div className="marquee"><div className="marquee-track">{[...skills, ...skills].map((s, i) => <span key={`${s}-${i}`}>{s}<b>✳</b></span>)}</div></div><div className="skill-grid">{[{t:'LANGUAGES',v:'Python · SQL · C (Basic)'},{t:'DATABASES',v:'MySQL · PostgreSQL · DBMS'},{t:'CLOUD',v:'AWS · EC2 · S3 · Route 53 · CloudWatch'},{t:'ANALYTICS & TOOLS',v:'Power BI · Tableau · Git · GitHub'},{t:'FOUNDATIONS',v:'OOP · Data Structures · Problem Solving'}].map((s) => <div className="skill-row" key={s.t}><span>{s.t}</span><strong>{s.v}</strong></div>)}</div></section>

      <section className="section record-section" id="record"><div className="section-heading compact"><div><p className="eyebrow">03 / THE RECORD</p><h2>Learning in <span>motion.</span></h2></div><p className="section-aside">The foundations, milestones and learning that shape how I work.</p></div><div className="timeline"><div className="timeline-item"><span className="timeline-date">JUL 2023 — MAY 2027</span><div><h3>B.Tech · Artificial Intelligence &amp; Data Science</h3><p>KL University · Guntur</p><strong className="highlight">CGPA 9.28 / 10</strong></div><span className="timeline-mark"/></div><div className="timeline-item"><span className="timeline-date">JUL 2021 — MAY 2023</span><div><h3>Intermediate</h3><p>Narayana Junior College</p><strong className="highlight">965 / 1000</strong></div><span className="timeline-mark"/></div><div className="timeline-item"><span className="timeline-date">JUN 2020 — MAY 2021</span><div><h3>Secondary School Certificate</h3><p>Narayana EM School</p><strong className="highlight">581 / 600</strong></div><span className="timeline-mark"/></div></div><div className="cert-row"><span className="eyebrow">CERTIFICATIONS</span><div><span>AWS Cloud Practitioner Certification</span><span>Cambridge English · CEFR B2</span></div></div></section>

      <section className="about-section" id="about"><div className="about-label"><p className="eyebrow">04 / A LITTLE ABOUT ME</p><span>THE PERSON BEHIND THE BUILDS</span></div><div className="about-content"><h2>Curious by nature.<br/><span>Practical by design.</span></h2><p>I&apos;m Mamidipaka Eswara Rao, an Artificial Intelligence and Data Science student at KL University, specializing in Cloud and Edge Computing.</p><p>I enjoy building real-world solutions—from serverless cloud workflows to interactive analytics tools. I&apos;m interested in how data, cloud infrastructure and intelligent systems can work together to solve meaningful problems.</p><div className="principles"><div><b>01</b><span>Stay curious</span></div><div><b>02</b><span>Build with purpose</span></div><div><b>03</b><span>Keep it clear</span></div><div><b>04</b><span>Learn by doing</span></div></div></div></section>

      <section className="contact-section" id="contact">
        <p className="eyebrow">05 / HAVE A GOOD ONE IN MIND?</p>
        <h2>Let&apos;s make<br/><span>it happen.</span></h2>
        <a className="contact-card" href="mailto:2300080363aids@gmail.com">
          <div><small>PRIMARY EMAIL · OPPORTUNITIES &amp; COLLABORATIONS</small><strong>2300080363aids@gmail.com</strong></div>
          <span className="contact-arrow"><ArrowUpRight/></span>
        </a>
        <div className="contact-details">
          <a href="mailto:mamidipakaeswar@gmail.com"><Mail size={16}/><span><small>ALTERNATE EMAIL</small>mamidipakaeswar@gmail.com</span><ArrowUpRight size={15}/></a>
          <a href="tel:+919014197893"><Phone size={16}/><span><small>PHONE</small>+91 90141 97893</span><ArrowUpRight size={15}/></a>
          <a href="https://wa.me/919014197893" target="_blank" rel="noreferrer"><MessageCircle size={16}/><span><small>WHATSAPP</small>Message me</span><ArrowUpRight size={15}/></a>
        </div>
        <div className="social-row">
          <div className="social-links">
            <a href="https://www.linkedin.com/in/mamidipaka-eswara-rao-364541285/" target="_blank" rel="noreferrer"><Linkedin size={16}/> LINKEDIN <ArrowUpRight size={12}/></a>
            <a href="https://github.com/eswar-2323" target="_blank" rel="noreferrer"><Github size={16}/> GITHUB <ArrowUpRight size={12}/></a>
            <a href="mailto:2300080363aids@gmail.com"><Mail size={16}/> EMAIL <ArrowUpRight size={12}/></a>
          </div>
          <span className="social-note">OPEN TO OPPORTUNITIES &amp; COLLABORATIONS</span>
        </div>
      </section>

      <footer><a className="wordmark" href="#home">ER<span>®</span></a><span>DESIGNED &amp; BUILT WITH INTENTION.</span><a href="#home">BACK TO TOP ↑</a><span>© 2026 ESWAR RAO</span></footer>

      <div className="agent-dock"><button onClick={() => setPaused(!paused)} title={paused ? 'Resume agents' : 'Pause agents'}>{paused ? <Play size={14}/> : <Pause size={14}/>}<span>{paused ? 'RESUME' : 'PAUSE'}</span></button><button onClick={toggleAgents} title="Toggle animated agents"><span className={agentsOn ? 'mini-dot active' : 'mini-dot'}/><span>AGENTS {agentsOn ? 'ON' : 'OFF'}</span></button><button onClick={startTour} title="Play portfolio tour"><Play size={14}/><span>TOUR</span></button><button onClick={replay} title="Replay build animation"><RotateCcw size={14}/><span>REPLAY</span></button></div>
    </main>
  );
}
