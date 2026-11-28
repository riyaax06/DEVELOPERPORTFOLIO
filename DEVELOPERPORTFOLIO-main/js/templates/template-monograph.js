/**
 * template-monograph.js — Monograph Template
 * High-end editorial design studio aesthetic: black, ivory, and burnt orange.
 * Oversized typography, asymmetrical index columns, and full case studies.
 * Scoped with .mg-* classes and --mg-* CSS custom properties.
 */
window.TemplateMonograph = {
  name: 'Monograph',
  id: 'monograph',
  description: 'High-end editorial portfolio — black, ivory & burnt orange with oversized typography',

  render(profile, projects, config = {}) {
    const esc = (str) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };
    const safeColor = (v, fb) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v || '') ? v : fb;
    const primary   = safeColor(config.primaryColor, '#d9532f');
    const secondary = safeColor(config.secondaryColor, '#141414');
    const font      = String(config.fontFamily || 'Manrope').replace(/['"\\<>]/g, '') || 'Manrope';
    const show      = config.showSections || {};
    const on        = (k) => show[k] !== false;
    const customCss = config.customCss || '';
    const resumeUrl = profile.resumeUrl || '';

    const skillName  = (s) => (typeof s === 'object' && s !== null) ? (s.name || '') : String(s || '');
    const skillLevel = (s) => {
      if (typeof s !== 'object' || !s || s.level == null || s.level === '') return null;
      const n = Number(s.level);
      return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : null;
    };

    const skills       = (profile.skills || []).filter(s => skillName(s));
    const orderedProjs = [...(projects || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const experience   = profile.experience || [];
    const education    = profile.education || [];
    const achievements = profile.achievements || [];
    const initial      = esc(((profile.name || '?').trim().charAt(0) || '?').toUpperCase());
    const year         = new Date().getFullYear();

    const socials = [
      profile.social?.github   && { href: profile.social.github,   label: 'GitHub' },
      profile.social?.linkedin && { href: profile.social.linkedin, label: 'LinkedIn' },
      profile.social?.twitter  && { href: profile.social.twitter,  label: 'Twitter' },
      (profile.website || profile.social?.website) && { href: profile.website || profile.social.website, label: 'Website' },
    ].filter(Boolean);

    const featItem = (f) => {
      if (typeof f === 'object' && f !== null) {
        const t = f.title ? `<strong>${esc(f.title)}:</strong> ` : '';
        return `<li>${t}${esc(f.desc || '')}</li>`;
      }
      return `<li>${esc(f)}</li>`;
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${esc(profile.name || 'Portfolio')} — Monograph</title>
  <meta name="description" content="${esc((profile.bio || 'Developer Monograph').slice(0, 160))}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --mg-accent: ${primary};
      --mg-ink: ${secondary};
      --mg-ivory: #f6f2ea;
      --mg-paper: #fbf9f5;
      --mg-muted: #57534e;
      --mg-rule: rgba(20, 20, 20, 0.15);
      --mg-font: '${font}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --mg-serif: 'Playfair Display', Georgia, serif;
      --mg-mono: 'JetBrains Mono', monospace;
      --mg-nav-h: 72px;
    }
    html { scroll-behavior: smooth; }
    body.mg-body {
      font-family: var(--mg-font);
      background-color: var(--mg-ivory);
      color: var(--mg-ink);
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    .mg-body * { overflow-wrap: break-word; word-wrap: break-word; }
    .mg-body a { color: inherit; text-decoration: none; }
    .mg-body ul { list-style: none; }
    .mg-body img { display: block; max-width: 100%; }

    /* ── Header ── */
    .mg-header {
      position: sticky; top: 0; z-index: 200; height: var(--mg-nav-h);
      background: rgba(246, 242, 234, 0.94);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--mg-ink);
    }
    .mg-header-inner {
      max-width: 1240px; margin: 0 auto; height: 100%; padding: 0 2.5rem;
      display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    }
    .mg-wordmark {
      font-family: var(--mg-serif); font-size: 1.25rem; font-weight: 700;
      letter-spacing: -0.01em; display: flex; align-items: center; gap: 0.75rem;
    }
    .mg-issue {
      font-family: var(--mg-mono); font-size: 0.68rem; text-transform: uppercase;
      letter-spacing: 0.14em; color: var(--mg-accent);
      border: 1px solid var(--mg-accent); padding: 2px 8px; border-radius: 999px;
    }
    .mg-nav { display: flex; align-items: center; gap: 1.75rem; }
    .mg-nav a {
      font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.12em; color: var(--mg-muted); transition: color 160ms ease;
    }
    .mg-nav a:hover { color: var(--mg-accent); }
    .mg-nav-resume {
      padding: 8px 16px; background: var(--mg-ink); color: var(--mg-ivory) !important;
      border-radius: 4px; transition: background 160ms ease !important;
    }
    .mg-nav-resume:hover { background: var(--mg-accent) !important; }

    .mg-ham {
      display: none; background: none; border: 1px solid var(--mg-ink);
      color: var(--mg-ink); padding: 6px 11px; font-size: 1.1rem; cursor: pointer;
    }
    .mg-drawer {
      display: none; position: fixed; top: var(--mg-nav-h); left: 0; right: 0;
      background: var(--mg-ivory); border-bottom: 1px solid var(--mg-ink);
      padding: 1.25rem 2rem; flex-direction: column; gap: 0.9rem; z-index: 199;
    }
    .mg-drawer.open { display: flex; }
    .mg-drawer a {
      font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
    }

    /* ── Layout ── */
    .mg-wrap { max-width: 1240px; margin: 0 auto; padding: 0 2.5rem; }
    .mg-band { padding: 5rem 0; border-bottom: 1px solid var(--mg-rule); scroll-margin-top: calc(var(--mg-nav-h) + 12px); }

    /* ── Hero ── */
    .mg-hero { padding: 4.5rem 0 5rem; border-bottom: 1px solid var(--mg-ink); }
    .mg-hero-kicker {
      font-family: var(--mg-mono); font-size: 0.78rem; text-transform: uppercase;
      letter-spacing: 0.16em; color: var(--mg-accent); margin-bottom: 1.25rem;
    }
    .mg-hero-headline {
      font-family: var(--mg-serif);
      font-size: clamp(2.8rem, 7.2vw, 5.75rem);
      font-weight: 700; line-height: 0.98; letter-spacing: -0.03em;
      margin-bottom: 2.75rem; color: var(--mg-ink);
    }
    .mg-hero-headline em { font-style: italic; color: var(--mg-accent); font-weight: 600; }
    .mg-hero-split {
      display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 3.5rem; align-items: end;
      padding-top: 2.5rem; border-top: 1px solid var(--mg-rule);
    }
    .mg-hero-role { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.85rem; }
    .mg-hero-bio { font-size: 1.05rem; color: var(--mg-muted); line-height: 1.8; max-width: 600px; margin-bottom: 2rem; }
    .mg-cta-row { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; }
    .mg-btn {
      padding: 13px 26px; background: var(--mg-ink); color: var(--mg-ivory);
      font-size: 0.84rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
      transition: background 180ms ease;
    }
    .mg-btn:hover { background: var(--mg-accent); }
    .mg-btn-outline {
      padding: 13px 26px; border: 1px solid var(--mg-ink); color: var(--mg-ink);
      font-size: 0.84rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
      transition: all 180ms ease;
    }
    .mg-btn-outline:hover { background: var(--mg-ink); color: var(--mg-ivory); }
    .mg-socials { display: flex; flex-wrap: wrap; gap: 1.25rem; }
    .mg-socials a {
      font-family: var(--mg-mono); font-size: 0.78rem; text-transform: uppercase;
      letter-spacing: 0.08em; border-bottom: 1px solid transparent;
    }
    .mg-socials a:hover { color: var(--mg-accent); border-bottom-color: var(--mg-accent); }

    .mg-portrait-box {
      aspect-ratio: 4 / 4.6; background: var(--mg-ink); position: relative; overflow: hidden;
    }
    .mg-portrait-box img { width: 100%; height: 100%; object-fit: cover; }
    .mg-portrait-fallback {
      width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
      font-family: var(--mg-serif); font-size: 6rem; color: var(--mg-ivory); font-style: italic;
    }
    .mg-portrait-caption {
      font-family: var(--mg-mono); font-size: 0.72rem; color: var(--mg-muted);
      margin-top: 0.65rem; display: flex; justify-content: space-between;
    }

    /* ── Asymmetrical Editorial Grid ── */
    .mg-asym { display: grid; grid-template-columns: 3.5fr 8.5fr; gap: 3rem; align-items: start; }
    .mg-aside-label {
      font-family: var(--mg-mono); font-size: 0.74rem; text-transform: uppercase;
      letter-spacing: 0.14em; color: var(--mg-accent); margin-bottom: 0.5rem;
    }
    .mg-aside-title {
      font-family: var(--mg-serif); font-size: clamp(1.8rem, 3vw, 2.4rem);
      font-weight: 700; line-height: 1.12;
    }

    /* Skills */
    .mg-skills-list { display: flex; flex-wrap: wrap; gap: 0.65rem; }
    .mg-skill-tag {
      padding: 9px 16px; border: 1px solid var(--mg-ink); background: var(--mg-paper);
      font-size: 0.86rem; font-weight: 600; transition: all 160ms ease;
    }
    .mg-skill-tag:hover { background: var(--mg-ink); color: var(--mg-ivory); }
    .mg-skill-tag span { color: var(--mg-accent); font-family: var(--mg-mono); font-size: 0.75rem; margin-left: 0.4rem; }

    /* Projects */
    .mg-projects-stack { display: flex; flex-direction: column; gap: 4.5rem; }
    .mg-proj-spread {
      display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 2.75rem; align-items: start;
      padding-bottom: 4rem; border-bottom: 1px solid var(--mg-rule);
    }
    .mg-proj-spread:last-child { border-bottom: none; padding-bottom: 0; }
    .mg-proj-img {
      width: 100%; aspect-ratio: 16 / 10; background: #1c1917; overflow: hidden;
      border: 1px solid var(--mg-ink);
      display: flex; align-items: center; justify-content: center;
    }
    .mg-proj-img img { width: 100%; height: 100%; object-fit: cover; }
    .mg-proj-num {
      font-family: var(--mg-serif); font-size: 3.5rem; font-style: italic;
      color: rgba(251, 249, 245, 0.25);
    }
    .mg-proj-index {
      font-family: var(--mg-mono); font-size: 0.74rem; text-transform: uppercase;
      letter-spacing: 0.12em; color: var(--mg-accent); margin-bottom: 0.5rem;
    }
    .mg-proj-title {
      font-family: var(--mg-serif); font-size: clamp(1.6rem, 2.8vw, 2.2rem);
      font-weight: 700; line-height: 1.15; margin-bottom: 0.65rem;
    }
    .mg-proj-tagline { font-size: 0.98rem; color: var(--mg-muted); margin-bottom: 1.15rem; }
    .mg-tech-inline {
      font-family: var(--mg-mono); font-size: 0.76rem; color: var(--mg-ink);
      padding: 0.5rem 0; border-top: 1px solid var(--mg-rule); border-bottom: 1px solid var(--mg-rule);
      margin-bottom: 1.25rem;
    }
    .mg-case-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; margin-bottom: 1.1rem; }
    .mg-case-item h4 {
      font-family: var(--mg-mono); font-size: 0.7rem; text-transform: uppercase;
      letter-spacing: 0.1em; color: var(--mg-accent); margin-bottom: 0.3rem;
    }
    .mg-case-item p, .mg-case-item li { font-size: 0.86rem; color: var(--mg-muted); line-height: 1.6; }
    .mg-case-item li { padding-left: 0.9rem; position: relative; }
    .mg-case-item li::before { content: '—'; position: absolute; left: 0; color: var(--mg-accent); }
    .mg-proj-links { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1.25rem; }

    /* Experience / Education rows */
    .mg-table-list { display: flex; flex-direction: column; }
    .mg-table-row {
      display: grid; grid-template-columns: 180px 1fr; gap: 1.5rem;
      padding: 1.5rem 0; border-top: 1px solid var(--mg-rule);
    }
    .mg-table-row:first-child { border-top: none; padding-top: 0; }
    .mg-row-period { font-family: var(--mg-mono); font-size: 0.78rem; color: var(--mg-accent); font-weight: 500; }
    .mg-row-title { font-family: var(--mg-serif); font-size: 1.25rem; font-weight: 700; margin-bottom: 0.2rem; }
    .mg-row-org { font-size: 0.92rem; font-weight: 600; color: var(--mg-ink); margin-bottom: 0.45rem; }
    .mg-row-desc { font-size: 0.9rem; color: var(--mg-muted); }

    /* Contact Band */
    .mg-contact-band {
      background: var(--mg-ink); color: var(--mg-ivory);
      padding: 5.5rem 0; scroll-margin-top: calc(var(--mg-nav-h) + 12px);
    }
    .mg-contact-band .mg-aside-label { color: var(--mg-accent); }
    .mg-contact-band .mg-aside-title { color: var(--mg-ivory); }
    .mg-contact-mail {
      display: inline-block; font-family: var(--mg-serif);
      font-size: clamp(1.4rem, 3.2vw, 2.4rem); font-style: italic;
      color: var(--mg-ivory); border-bottom: 2px solid var(--mg-accent);
      margin-bottom: 2rem; transition: color 180ms ease;
    }
    .mg-contact-mail:hover { color: var(--mg-accent); }
    .mg-form { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 680px; }
    .mg-form-full { grid-column: span 2; }
    .mg-input, .mg-textarea {
      width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.2); color: #fff;
      font-family: inherit; font-size: 0.9rem; outline: none;
    }
    .mg-input:focus, .mg-textarea:focus { border-color: var(--mg-accent); }
    .mg-textarea { min-height: 110px; resize: vertical; }
    .mg-submit {
      padding: 13px 28px; background: var(--mg-accent); color: #fff;
      border: none; font-family: inherit; font-weight: 700; font-size: 0.84rem;
      text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer;
    }
    .mg-submit:hover { opacity: 0.9; }

    .mg-footer {
      background: var(--mg-ink); color: rgba(246,242,234,0.55);
      border-top: 1px solid rgba(255,255,255,0.12);
      padding: 2rem 2.5rem; font-family: var(--mg-mono); font-size: 0.74rem;
      display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
    }

    @media (max-width: 960px) {
      .mg-hero-split, .mg-asym, .mg-proj-spread { grid-template-columns: 1fr; gap: 2rem; }
      .mg-table-row { grid-template-columns: 1fr; gap: 0.4rem; }
    }
    @media (max-width: 768px) {
      .mg-nav { display: none; }
      .mg-ham { display: block; }
      .mg-header-inner, .mg-wrap { padding-left: 1.25rem; padding-right: 1.25rem; }
      .mg-band { padding: 3.75rem 0; }
      .mg-case-cols, .mg-form { grid-template-columns: 1fr; }
      .mg-form-full { grid-column: span 1; }
    }
    @media (max-width: 420px) {
      .mg-cta-row { flex-direction: column; }
      .mg-btn, .mg-btn-outline { width: 100%; text-align: center; }
    }

    ${customCss}
  </style>
</head>
<body class="mg-body">
  <header class="mg-header">
    <div class="mg-header-inner">
      <a href="#top" class="mg-wordmark">
        <span>${esc(profile.name || 'Monograph')}</span>
        <span class="mg-issue">Vol. ${year}</span>
      </a>
      <nav class="mg-nav">
        ${on('about')      ? '<a href="#about">Profile</a>' : ''}
        ${on('skills')     && skills.length ? '<a href="#skills">Index</a>' : ''}
        ${on('projects')   && orderedProjs.length ? '<a href="#projects">Case Studies</a>' : ''}
        ${on('experience') && experience.length ? '<a href="#experience">Career</a>' : ''}
        ${on('contact')    ? '<a href="#contact">Contact</a>' : ''}
        ${resumeUrl        ? `<a href="${esc(resumeUrl)}" class="mg-nav-resume" target="_blank" rel="noopener">CV / Resume ↗</a>` : ''}
      </nav>
      <button class="mg-ham" aria-label="Menu" onclick="document.getElementById('mg-drawer').classList.toggle('open')">☰</button>
    </div>
  </header>

  <div class="mg-drawer" id="mg-drawer">
    ${on('about')      ? '<a href="#about" onclick="this.parentElement.classList.remove(\'open\')">Profile</a>' : ''}
    ${on('skills')     && skills.length ? '<a href="#skills" onclick="this.parentElement.classList.remove(\'open\')">Index</a>' : ''}
    ${on('projects')   && orderedProjs.length ? '<a href="#projects" onclick="this.parentElement.classList.remove(\'open\')">Case Studies</a>' : ''}
    ${on('experience') && experience.length ? '<a href="#experience" onclick="this.parentElement.classList.remove(\'open\')">Career</a>' : ''}
    ${on('education')  && education.length ? '<a href="#education" onclick="this.parentElement.classList.remove(\'open\')">Education</a>' : ''}
    ${on('contact')    ? '<a href="#contact" onclick="this.parentElement.classList.remove(\'open\')">Contact</a>' : ''}
    ${resumeUrl        ? `<a href="${esc(resumeUrl)}" target="_blank" rel="noopener">Download CV ↗</a>` : ''}
  </div>

  <main class="mg-wrap" id="top">
    ${on('hero') ? `
    <section class="mg-hero">
      <div class="mg-hero-kicker">Software Engineering Monograph · ${esc(profile.location || 'Worldwide')}</div>
      <h1 class="mg-hero-headline">${esc(profile.name || 'Developer Name')} — <em>${esc(profile.title || 'Systems & Product Engineer')}</em></h1>
      <div class="mg-hero-split">
        <div>
          <div class="mg-hero-role">Editorial Statement</div>
          <p class="mg-hero-bio">${esc(profile.bio || 'Architecting deliberate software systems, refined interfaces, and resilient infrastructure.')}</p>
          <div class="mg-cta-row">
            ${on('projects') && orderedProjs.length ? `<a href="#projects" class="mg-btn">Read Case Studies →</a>` : ''}
            ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="mg-btn-outline" target="_blank" rel="noopener">Download Resume ↗</a>` : ''}
            ${on('contact') ? `<a href="#contact" class="mg-btn-outline">Inquiries</a>` : ''}
          </div>
          ${socials.length ? `
          <div class="mg-socials">
            ${socials.map(s => `<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}
          </div>` : ''}
        </div>
        <div>
          <div class="mg-portrait-box">
            ${profile.avatar
              ? `<img src="${esc(profile.avatar)}" alt="${esc(profile.name || 'Portrait')}" onerror="this.parentElement.innerHTML='<div class=\\'mg-portrait-fallback\\'>${initial}</div>'"/>`
              : `<div class="mg-portrait-fallback">${initial}</div>`}
          </div>
          <div class="mg-portrait-caption">
            <span>FIG. 01 — PORTRAIT</span>
            <span>${orderedProjs.length} WORKS ARCHIVED</span>
          </div>
        </div>
      </div>
    </section>` : ''}

    ${on('about') ? `
    <section class="mg-band" id="about">
      <div class="mg-asym">
        <div>
          <div class="mg-aside-label">Section 01</div>
          <h2 class="mg-aside-title">Practice &amp; Focus</h2>
        </div>
        <div>
          <p class="mg-hero-bio" style="max-width:100%;margin-bottom:1.25rem">${esc(profile.bio || 'Crafting software with precision, clarity, and enduring architectural discipline.')}</p>
          ${profile.email ? `<p style="font-family:var(--mg-mono);font-size:0.85rem">Correspondence: <a href="mailto:${esc(profile.email)}" style="color:var(--mg-accent);text-decoration:underline">${esc(profile.email)}</a></p>` : ''}
        </div>
      </div>
    </section>` : ''}

    ${on('skills') && skills.length ? `
    <section class="mg-band" id="skills">
      <div class="mg-asym">
        <div>
          <div class="mg-aside-label">Section 02</div>
          <h2 class="mg-aside-title">Technical Index</h2>
        </div>
        <div class="mg-skills-list">
          ${skills.map(s => {
            const lvl = skillLevel(s);
            return `<span class="mg-skill-tag">${esc(skillName(s))}${lvl !== null ? `<span>${lvl}%</span>` : ''}</span>`;
          }).join('')}
        </div>
      </div>
    </section>` : ''}

    ${on('projects') && orderedProjs.length ? `
    <section class="mg-band" id="projects">
      <div class="mg-asym" style="margin-bottom:3rem">
        <div>
          <div class="mg-aside-label">Section 03</div>
          <h2 class="mg-aside-title">Selected Case Studies</h2>
        </div>
        <p class="mg-hero-bio" style="margin-bottom:0">In-depth technical breakdowns examining constraints, architecture, and measurable outcomes.</p>
      </div>
      <div class="mg-projects-stack">
        ${orderedProjs.map((p, idx) => `
        <article class="mg-proj-spread">
          <div>
            <div class="mg-proj-img">
              ${p.thumbnail
                ? `<img src="${esc(p.thumbnail)}" alt="${esc(p.title || 'Project')}"/>`
                : `<span class="mg-proj-num">No. 0${idx + 1}</span>`}
            </div>
          </div>
          <div>
            <div class="mg-proj-index">Case Study 0${idx + 1}${p.featured ? ' · Featured' : ''}</div>
            <h3 class="mg-proj-title">${esc(p.title || 'Untitled Project')}</h3>
            ${p.tagline ? `<p class="mg-proj-tagline">${esc(p.tagline)}</p>` : ''}
            ${(p.technologies || []).length ? `<div class="mg-tech-inline">${p.technologies.map(esc).join(' / ')}</div>` : ''}
            <div class="mg-case-cols">
              ${p.problem ? `<div class="mg-case-item"><h4>The Brief / Problem</h4><p>${esc(p.problem)}</p></div>` : ''}
              ${p.solution ? `<div class="mg-case-item"><h4>Architecture</h4><p>${esc(p.solution)}</p></div>` : ''}
            </div>
            ${p.features?.filter(Boolean).length ? `
            <div class="mg-case-item" style="margin-bottom:1rem">
              <h4>Key Capabilities</h4>
              <ul>${p.features.filter(Boolean).map(featItem).join('')}</ul>
            </div>` : ''}
            ${p.challenges ? `<div class="mg-case-item" style="margin-bottom:1rem"><h4>Challenges</h4><p>${esc(p.challenges)}</p></div>` : ''}
            ${p.outcomes ? `<div class="mg-case-item"><h4>Verified Outcomes</h4><p style="color:var(--mg-ink);font-weight:600">${esc(p.outcomes)}</p></div>` : ''}
            <div class="mg-proj-links">
              ${p.liveUrl ? `<a href="${esc(p.liveUrl)}" class="mg-btn" target="_blank" rel="noopener">Live Project ↗</a>` : ''}
              ${p.githubUrl ? `<a href="${esc(p.githubUrl)}" class="mg-btn-outline" target="_blank" rel="noopener">Source ↗</a>` : ''}
            </div>
          </div>
        </article>`).join('')}
      </div>
    </section>` : ''}

    ${on('experience') && experience.length ? `
    <section class="mg-band" id="experience">
      <div class="mg-asym">
        <div>
          <div class="mg-aside-label">Section 04</div>
          <h2 class="mg-aside-title">Experience</h2>
        </div>
        <div class="mg-table-list">
          ${experience.map(e => `
          <div class="mg-table-row">
            <div class="mg-row-period">${esc(e.period || 'Career')}</div>
            <div>
              <div class="mg-row-title">${esc(e.role || e.title || 'Engineer')}</div>
              ${e.company ? `<div class="mg-row-org">${esc(e.company)}</div>` : ''}
              ${e.description ? `<p class="mg-row-desc">${esc(e.description)}</p>` : ''}
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>` : ''}

    ${on('education') && education.length ? `
    <section class="mg-band" id="education">
      <div class="mg-asym">
        <div>
          <div class="mg-aside-label">Section 05</div>
          <h2 class="mg-aside-title">Education</h2>
        </div>
        <div class="mg-table-list">
          ${education.map(e => `
          <div class="mg-table-row">
            <div class="mg-row-period">${esc(e.year || e.period || 'Academic')}</div>
            <div>
              <div class="mg-row-title">${esc(e.degree || 'Degree')}</div>
              ${e.school ? `<div class="mg-row-org">${esc(e.school)}</div>` : ''}
              ${e.description ? `<p class="mg-row-desc">${esc(e.description)}</p>` : ''}
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>` : ''}

    ${achievements.length ? `
    <section class="mg-band" id="achievements">
      <div class="mg-asym">
        <div>
          <div class="mg-aside-label">Section 06</div>
          <h2 class="mg-aside-title">Achievements</h2>
        </div>
        <div class="mg-table-list">
          ${achievements.map((a, i) => `
          <div class="mg-table-row">
            <div class="mg-row-period">HONOR 0${i + 1}</div>
            <div>
              <div class="mg-row-title">${esc(typeof a === 'object' ? (a.title || a.name || '') : a)}</div>
              ${typeof a === 'object' && a.description ? `<p class="mg-row-desc">${esc(a.description)}</p>` : ''}
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>` : ''}
  </main>

  ${on('contact') ? `
  <section class="mg-contact-band" id="contact">
    <div class="mg-wrap">
      <div class="mg-asym">
        <div>
          <div class="mg-aside-label">Colophon &amp; Contact</div>
          <h2 class="mg-aside-title">Let's Discuss Your Next System</h2>
        </div>
        <div>
          ${profile.email ? `<a href="mailto:${esc(profile.email)}" class="mg-contact-mail">${esc(profile.email)}</a>` : ''}
          <form class="mg-form" onsubmit="event.preventDefault(); alert('Inquiry submitted!'); this.reset();">
            <input type="text" class="mg-input" required placeholder="Your Name"/>
            <input type="email" class="mg-input" required placeholder="Email Address"/>
            <textarea class="mg-textarea mg-form-full" required placeholder="Project or role details..."></textarea>
            <div class="mg-form-full">
              <button type="submit" class="mg-submit">Send Inquiry →</button>
            </div>
          </form>
          ${socials.length || resumeUrl ? `
          <div class="mg-socials" style="margin-top:2rem">
            ${resumeUrl ? `<a href="${esc(resumeUrl)}" target="_blank" rel="noopener">Resume ↗</a>` : ''}
            ${socials.map(s => `<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}
          </div>` : ''}
        </div>
      </div>
    </div>
  </section>` : ''}

  <footer class="mg-footer">
    <span>${esc(profile.name || 'Developer')} — Monograph Edition</span>
    <span>© ${year} · Built with DevPortfolio Builder</span>
  </footer>
</body>
</html>`;
  },
};
