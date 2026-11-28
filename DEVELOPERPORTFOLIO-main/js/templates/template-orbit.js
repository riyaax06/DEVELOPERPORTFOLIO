/**
 * template-orbit.js — Orbit Template
 * Futuristic next-gen portfolio: midnight blue & deep violet backdrop,
 * orbital geometric rings, layered glass floating cards, and cosmic accents.
 * Distinct from Neon (no terminal monospace/green scanlines).
 * Scoped with .ob-* classes and --ob-* CSS custom properties.
 */
window.TemplateOrbit = {
  name: 'Orbit',
  id: 'orbit',
  description: 'Futuristic cosmic aesthetic — midnight blue & deep violet with orbital rings and layered glass',

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
    const primary   = safeColor(config.primaryColor, '#38bdf8');
    const secondary = safeColor(config.secondaryColor, '#9333ea');
    const font      = String(config.fontFamily || 'Space Grotesk').replace(/['"\\<>]/g, '') || 'Space Grotesk';
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
  <title>${esc(profile.name || 'Portfolio')} — Orbit</title>
  <meta name="description" content="${esc((profile.bio || 'Next-Gen Developer Portfolio').slice(0, 160))}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --ob-blue: ${primary};
      --ob-violet: ${secondary};
      --ob-bg: #070b1a;
      --ob-deep: #120b29;
      --ob-glass: rgba(16, 21, 46, 0.56);
      --ob-border: rgba(147, 51, 234, 0.24);
      --ob-border-blue: rgba(56, 189, 248, 0.24);
      --ob-text: #f8fafc;
      --ob-muted: #94a3b8;
      --ob-font: '${font}', 'Inter', sans-serif;
      --ob-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --ob-nav-h: 70px;
    }
    html { scroll-behavior: smooth; }
    body.ob-body {
      font-family: var(--ob-body);
      background:
        radial-gradient(ellipse 70% 55% at 80% 10%, rgba(147, 51, 234, 0.22), transparent 60%),
        radial-gradient(ellipse 65% 50% at 15% 40%, rgba(56, 189, 248, 0.14), transparent 60%),
        linear-gradient(180deg, var(--ob-bg) 0%, var(--ob-deep) 55%, var(--ob-bg) 100%);
      color: var(--ob-text);
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    .ob-body * { overflow-wrap: break-word; word-wrap: break-word; }
    .ob-body a { color: inherit; text-decoration: none; }
    .ob-body ul { list-style: none; }
    .ob-body img { display: block; max-width: 100%; }

    @keyframes ob-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @media (prefers-reduced-motion: reduce) {
      .ob-ring-spin { animation: none !important; }
    }

    /* ── Nav ── */
    .ob-nav-outer { position: fixed; top: 14px; left: 0; right: 0; z-index: 200; padding: 0 1.5rem; }
    .ob-nav {
      max-width: 1120px; margin: 0 auto; height: 58px;
      background: rgba(10, 14, 34, 0.78);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 999px;
      padding: 0 1.35rem;
      display: flex; align-items: center; justify-content: space-between; gap: 1rem;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
    }
    .ob-brand {
      font-family: var(--ob-font); font-weight: 700; font-size: 1rem;
      display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0;
    }
    .ob-orbit-dot {
      width: 12px; height: 12px; border-radius: 50%;
      background: linear-gradient(135deg, var(--ob-blue), var(--ob-violet));
      box-shadow: 0 0 14px var(--ob-blue);
    }
    .ob-links { display: flex; align-items: center; gap: 1.4rem; }
    .ob-links a { font-size: 0.85rem; font-weight: 500; color: var(--ob-muted); transition: color 160ms ease; }
    .ob-links a:hover { color: var(--ob-blue); }
    .ob-nav-pill {
      padding: 7px 15px; border-radius: 999px;
      background: linear-gradient(135deg, var(--ob-blue), var(--ob-violet));
      color: #fff !important; font-size: 0.8rem !important; font-weight: 600 !important;
    }
    .ob-ham {
      display: none; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
      color: #fff; border-radius: 999px; padding: 6px 12px; cursor: pointer; font-size: 1rem;
    }
    .ob-drawer {
      display: none; max-width: 1120px; margin: 0.6rem auto 0;
      background: rgba(12, 16, 38, 0.97); backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.14); border-radius: 20px;
      padding: 1rem 1.5rem; flex-direction: column; gap: 0.8rem;
    }
    .ob-drawer.open { display: flex; }
    .ob-drawer a { font-size: 0.92rem; color: var(--ob-muted); font-weight: 500; }

    /* ── Container ── */
    .ob-wrap { max-width: 1160px; margin: 0 auto; padding: 0 2rem; }
    .ob-section { padding: 5.5rem 0; scroll-margin-top: 96px; }

    /* ── Cosmic Hero ── */
    .ob-hero {
      min-height: 100vh;
      padding: 7.5rem 0 4.5rem;
      display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3.5rem; align-items: center;
    }
    .ob-eyebrow {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 6px 14px; border-radius: 999px;
      background: rgba(56, 189, 248, 0.1); border: 1px solid var(--ob-border-blue);
      color: var(--ob-blue); font-size: 0.78rem; font-weight: 600; margin-bottom: 1.25rem;
    }
    .ob-h1 {
      font-family: var(--ob-font); font-size: clamp(2.5rem, 5.2vw, 4.3rem);
      font-weight: 700; line-height: 1.07; letter-spacing: -0.03em; margin-bottom: 1rem;
    }
    .ob-h1 span {
      background: linear-gradient(125deg, var(--ob-blue), #c084fc);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .ob-role { font-size: 1.2rem; font-weight: 600; color: #cbd5e1; margin-bottom: 1.1rem; }
    .ob-bio { font-size: 1rem; color: var(--ob-muted); max-width: 560px; line-height: 1.78; margin-bottom: 2rem; }
    .ob-actions { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-bottom: 1.75rem; }
    .ob-btn-primary {
      padding: 13px 26px; border-radius: 14px;
      background: linear-gradient(135deg, var(--ob-blue), var(--ob-violet));
      color: #fff; font-weight: 600; font-size: 0.9rem;
      box-shadow: 0 10px 30px rgba(56, 189, 248, 0.25);
      transition: transform 200ms ease;
    }
    .ob-btn-primary:hover { transform: translateY(-2px); }
    .ob-btn-glass {
      padding: 13px 24px; border-radius: 14px;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.16);
      color: #fff; font-weight: 600; font-size: 0.9rem;
      transition: border-color 200ms ease;
    }
    .ob-btn-glass:hover { border-color: var(--ob-blue); }
    .ob-social-row { display: flex; flex-wrap: wrap; gap: 1.15rem; }
    .ob-social-row a { font-size: 0.85rem; color: var(--ob-muted); font-weight: 500; }
    .ob-social-row a:hover { color: var(--ob-blue); }

    /* Orbital Profile Composition */
    .ob-stage {
      display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
    }
    .ob-orbit-system {
      position: relative; width: 320px; height: 320px;
      display: flex; align-items: center; justify-content: center;
    }
    .ob-ring-outer {
      position: absolute; inset: 0; border-radius: 50%;
      border: 1px dashed rgba(56, 189, 248, 0.28);
      animation: ob-spin 36s linear infinite;
    }
    .ob-ring-outer::after {
      content: ''; position: absolute; top: -5px; left: 50%;
      width: 10px; height: 10px; border-radius: 50%;
      background: var(--ob-blue); box-shadow: 0 0 14px var(--ob-blue);
    }
    .ob-ring-inner {
      position: absolute; inset: 30px; border-radius: 50%;
      border: 1px solid rgba(147, 51, 234, 0.35);
      animation: ob-spin 24s linear infinite reverse;
    }
    .ob-ring-inner::after {
      content: ''; position: absolute; bottom: -4px; left: 50%;
      width: 8px; height: 8px; border-radius: 50%;
      background: #c084fc; box-shadow: 0 0 12px #c084fc;
    }
    .ob-avatar-core {
      width: 196px; height: 196px; border-radius: 50%; overflow: hidden;
      border: 3px solid rgba(255,255,255,0.22);
      background: linear-gradient(135deg, var(--ob-deep), #1e1b4b);
      box-shadow: 0 0 50px rgba(147, 51, 234, 0.35);
      display: flex; align-items: center; justify-content: center;
      position: relative; z-index: 2;
    }
    .ob-avatar-core img { width: 100%; height: 100%; object-fit: cover; }
    .ob-avatar-init {
      font-family: var(--ob-font); font-size: 4rem; font-weight: 700;
      background: linear-gradient(135deg, var(--ob-blue), #c084fc);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .ob-floating-cards {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.85rem; width: 100%; max-width: 340px;
    }
    .ob-float-chip {
      background: var(--ob-glass); backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.12); border-radius: 16px;
      padding: 0.85rem 1rem; text-align: center;
    }
    .ob-float-val { font-family: var(--ob-font); font-size: 1.35rem; font-weight: 700; color: #fff; }
    .ob-float-lbl { font-size: 0.72rem; color: var(--ob-muted); }

    /* ── Headings ── */
    .ob-kicker {
      font-family: var(--ob-font); font-size: 0.78rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.14em; color: var(--ob-blue);
      margin-bottom: 0.45rem;
    }
    .ob-h2 {
      font-family: var(--ob-font); font-size: clamp(1.75rem, 3.2vw, 2.5rem);
      font-weight: 700; letter-spacing: -0.025em; margin-bottom: 0.6rem;
    }
    .ob-sub { font-size: 0.98rem; color: var(--ob-muted); max-width: 600px; margin-bottom: 2.5rem; }

    /* ── Glass Panels ── */
    .ob-glass-panel {
      background: var(--ob-glass); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(255,255,255,0.12); border-radius: 22px; padding: 2rem;
    }

    /* Skills */
    .ob-tech-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
      gap: 1rem;
    }
    .ob-tech-node {
      background: rgba(16, 21, 46, 0.72);
      border: 1px solid var(--ob-border-blue); border-radius: 16px;
      padding: 1.15rem; transition: transform 180ms ease, border-color 180ms ease;
    }
    .ob-tech-node:hover { transform: translateY(-3px); border-color: var(--ob-blue); }
    .ob-tech-head { display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 0.92rem; }
    .ob-tech-lvl { font-size: 0.78rem; color: var(--ob-blue); font-weight: 700; }
    .ob-tech-track { height: 4px; background: rgba(255,255,255,0.08); border-radius: 999px; margin-top: 0.7rem; overflow: hidden; }
    .ob-tech-fill { height: 100%; background: linear-gradient(90deg, var(--ob-blue), var(--ob-violet)); }

    /* Projects */
    .ob-proj-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 490px), 1fr));
      gap: 2rem;
    }
    .ob-proj-card {
      background: var(--ob-glass); backdrop-filter: blur(18px);
      border: 1px solid var(--ob-border); border-radius: 24px;
      overflow: hidden; display: flex; flex-direction: column;
      transition: transform 240ms ease, border-color 240ms ease, box-shadow 240ms ease;
    }
    .ob-proj-card:hover {
      transform: translateY(-5px);
      border-color: var(--ob-blue);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    }
    .ob-proj-banner {
      height: 205px; background: linear-gradient(135deg, #0f172a, #2e1065);
      position: relative; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
    }
    .ob-proj-banner img { width: 100%; height: 100%; object-fit: cover; }
    .ob-proj-num { font-family: var(--ob-font); font-size: 2.8rem; font-weight: 700; color: rgba(255,255,255,0.18); }
    .ob-proj-tag {
      position: absolute; top: 14px; left: 14px;
      padding: 4px 12px; border-radius: 999px;
      background: rgba(7, 11, 26, 0.78); backdrop-filter: blur(8px);
      border: 1px solid var(--ob-border-blue); font-size: 0.7rem; font-weight: 700; color: var(--ob-blue);
    }
    .ob-proj-body { padding: 1.85rem; flex: 1; display: flex; flex-direction: column; }
    .ob-proj-title { font-family: var(--ob-font); font-size: 1.32rem; font-weight: 700; margin-bottom: 0.4rem; }
    .ob-proj-tagline { font-size: 0.92rem; color: var(--ob-muted); margin-bottom: 1.1rem; }
    .ob-chips { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.25rem; }
    .ob-chip {
      padding: 4px 10px; border-radius: 999px;
      background: rgba(147, 51, 234, 0.14); border: 1px solid rgba(192, 132, 252, 0.28);
      font-size: 0.74rem; color: #e9d5ff; font-weight: 500;
    }
    .ob-case-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem; }
    .ob-case-block {
      padding: 0.9rem 1rem; border-radius: 14px;
      background: rgba(7, 11, 26, 0.55); border: 1px solid rgba(255,255,255,0.08);
    }
    .ob-case-block h4 { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ob-blue); margin-bottom: 0.3rem; }
    .ob-case-block p, .ob-case-block li { font-size: 0.84rem; color: #cbd5e1; }
    .ob-case-block li { padding-left: 1rem; position: relative; margin-top: 0.2rem; }
    .ob-case-block li::before { content: '◈'; position: absolute; left: 0; color: #c084fc; font-size: 0.7rem; top: 2px; }
    .ob-proj-links { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: auto; }

    /* Experience / Education */
    .ob-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .ob-card-item {
      padding: 1.35rem; border-radius: 18px;
      background: rgba(16, 21, 46, 0.65); border: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 1rem;
    }
    .ob-card-item:last-child { margin-bottom: 0; }
    .ob-item-top { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.5rem; }
    .ob-item-role { font-family: var(--ob-font); font-size: 1.05rem; font-weight: 700; }
    .ob-item-period { font-size: 0.76rem; color: var(--ob-blue); font-weight: 600; }
    .ob-item-org { font-size: 0.88rem; color: #c084fc; font-weight: 600; margin: 0.2rem 0 0.45rem; }
    .ob-item-desc { font-size: 0.86rem; color: var(--ob-muted); }

    /* Contact */
    .ob-contact-wrap { display: grid; grid-template-columns: 1fr 1.1fr; gap: 2rem; align-items: start; }
    .ob-input, .ob-textarea {
      width: 100%; padding: 11px 14px; border-radius: 12px;
      background: rgba(7, 11, 26, 0.75); border: 1px solid rgba(255,255,255,0.14);
      color: #fff; font-family: inherit; font-size: 0.9rem; margin-bottom: 0.9rem; outline: none;
    }
    .ob-input:focus, .ob-textarea:focus { border-color: var(--ob-blue); }
    .ob-textarea { min-height: 110px; resize: vertical; }
    .ob-submit {
      width: 100%; padding: 13px; border: none; border-radius: 12px;
      background: linear-gradient(135deg, var(--ob-blue), var(--ob-violet));
      color: #fff; font-weight: 700; font-size: 0.92rem; cursor: pointer;
    }

    .ob-footer {
      border-top: 1px solid rgba(255,255,255,0.1); padding: 2.25rem 2rem;
      text-align: center; font-size: 0.84rem; color: var(--ob-muted);
    }

    @media (max-width: 960px) {
      .ob-hero { grid-template-columns: 1fr; padding-top: 6.5rem; gap: 2.5rem; }
      .ob-two-col, .ob-contact-wrap { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .ob-links { display: none; }
      .ob-ham { display: block; }
      .ob-wrap { padding: 0 1.25rem; }
      .ob-section { padding: 4rem 0; }
      .ob-proj-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 400px) {
      .ob-orbit-system { width: 250px; height: 250px; }
      .ob-avatar-core { width: 155px; height: 155px; }
      .ob-actions { flex-direction: column; }
      .ob-btn-primary, .ob-btn-glass { width: 100%; text-align: center; }
    }

    ${customCss}
  </style>
</head>
<body class="ob-body">
  <div class="ob-nav-outer">
    <nav class="ob-nav">
      <a href="#top" class="ob-brand">
        <span class="ob-orbit-dot"></span>
        <span>${esc(profile.name || 'Orbit')}</span>
      </a>
      <div class="ob-links">
        ${on('about')      ? '<a href="#about">About</a>' : ''}
        ${on('skills')     && skills.length ? '<a href="#skills">Tech</a>' : ''}
        ${on('projects')   && orderedProjs.length ? '<a href="#projects">Projects</a>' : ''}
        ${on('experience') && experience.length ? '<a href="#experience">Trajectory</a>' : ''}
        ${on('contact')    ? '<a href="#contact">Contact</a>' : ''}
        ${resumeUrl        ? `<a href="${esc(resumeUrl)}" class="ob-nav-pill" target="_blank" rel="noopener">Resume ↗</a>` : ''}
      </div>
      <button class="ob-ham" aria-label="Menu" onclick="document.getElementById('ob-drawer').classList.toggle('open')">☰</button>
    </nav>
    <div class="ob-drawer" id="ob-drawer">
      ${on('about')      ? '<a href="#about" onclick="this.parentElement.classList.remove(\'open\')">About</a>' : ''}
      ${on('skills')     && skills.length ? '<a href="#skills" onclick="this.parentElement.classList.remove(\'open\')">Tech</a>' : ''}
      ${on('projects')   && orderedProjs.length ? '<a href="#projects" onclick="this.parentElement.classList.remove(\'open\')">Projects</a>' : ''}
      ${on('experience') && experience.length ? '<a href="#experience" onclick="this.parentElement.classList.remove(\'open\')">Trajectory</a>' : ''}
      ${on('education')  && education.length ? '<a href="#education" onclick="this.parentElement.classList.remove(\'open\')">Education</a>' : ''}
      ${on('contact')    ? '<a href="#contact" onclick="this.parentElement.classList.remove(\'open\')">Contact</a>' : ''}
      ${resumeUrl        ? `<a href="${esc(resumeUrl)}" target="_blank" rel="noopener">Download Resume ↗</a>` : ''}
    </div>
  </div>

  <main class="ob-wrap" id="top">
    ${on('hero') ? `
    <section class="ob-hero">
      <div>
        <div class="ob-eyebrow">◈ ${esc(profile.location || 'Next-Gen Software Engineering')}</div>
        <h1 class="ob-h1">Designing <span>${esc(profile.name || 'Your Name')}</span>'s Digital Orbit</h1>
        <div class="ob-role">${esc(profile.title || 'Full-Stack & Distributed Systems Engineer')}</div>
        <p class="ob-bio">${esc(profile.bio || 'Exploring modern architectures, real-time systems, and expressive developer tools.')}</p>
        <div class="ob-actions">
          ${on('projects') && orderedProjs.length ? `<a href="#projects" class="ob-btn-primary">Launch Projects →</a>` : ''}
          ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="ob-btn-glass" target="_blank" rel="noopener">Resume ↗</a>` : ''}
          ${on('contact') ? `<a href="#contact" class="ob-btn-glass">Connect</a>` : ''}
        </div>
        ${socials.length ? `
        <div class="ob-social-row">
          ${socials.map(s => `<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}
        </div>` : ''}
      </div>

      <div class="ob-stage">
        <div class="ob-orbit-system">
          <div class="ob-ring-outer ob-ring-spin"></div>
          <div class="ob-ring-inner ob-ring-spin"></div>
          <div class="ob-avatar-core">
            ${profile.avatar
              ? `<img src="${esc(profile.avatar)}" alt="${esc(profile.name || 'Avatar')}" onerror="this.parentElement.innerHTML='<span class=\\'ob-avatar-init\\'>${initial}</span>'"/>`
              : `<span class="ob-avatar-init">${initial}</span>`}
          </div>
        </div>
        <div class="ob-floating-cards">
          <div class="ob-float-chip">
            <div class="ob-float-val">${orderedProjs.length}</div>
            <div class="ob-float-lbl">Projects Built</div>
          </div>
          <div class="ob-float-chip">
            <div class="ob-float-val">${skills.length}</div>
            <div class="ob-float-lbl">Technologies</div>
          </div>
        </div>
      </div>
    </section>` : ''}

    ${on('about') ? `
    <section class="ob-section" id="about">
      <div class="ob-kicker">Mission Profile</div>
      <h2 class="ob-h2">About Me</h2>
      <div class="ob-glass-panel">
        <p style="font-size:1.05rem;color:#cbd5e1;line-height:1.85">${esc(profile.bio || 'Building forward-looking web platforms and cloud systems.')}</p>
        ${profile.email ? `<p style="margin-top:1rem;color:var(--ob-blue);font-weight:600">Contact: ${esc(profile.email)}</p>` : ''}
      </div>
    </section>` : ''}

    ${on('skills') && skills.length ? `
    <section class="ob-section" id="skills">
      <div class="ob-kicker">Technology Matrix</div>
      <h2 class="ob-h2">Technical Stack</h2>
      <p class="ob-sub">Systems, frameworks, and tools powering production builds.</p>
      <div class="ob-tech-grid">
        ${skills.map(s => {
          const lvl = skillLevel(s);
          return `
          <div class="ob-tech-node">
            <div class="ob-tech-head">
              <span>${esc(skillName(s))}</span>
              ${lvl !== null ? `<span class="ob-tech-lvl">${lvl}%</span>` : ''}
            </div>
            ${lvl !== null ? `<div class="ob-tech-track"><div class="ob-tech-fill" style="width:${lvl}%"></div></div>` : ''}
          </div>`;
        }).join('')}
      </div>
    </section>` : ''}

    ${on('projects') && orderedProjs.length ? `
    <section class="ob-section" id="projects">
      <div class="ob-kicker">Deployed Systems</div>
      <h2 class="ob-h2">Featured Projects</h2>
      <p class="ob-sub">Case studies engineered for performance, reliability, and scale.</p>
      <div class="ob-proj-grid">
        ${orderedProjs.map((p, idx) => `
        <article class="ob-proj-card">
          <div class="ob-proj-banner">
            ${p.thumbnail
              ? `<img src="${esc(p.thumbnail)}" alt="${esc(p.title || 'Project')}"/>`
              : `<span class="ob-proj-num">0${idx + 1}</span>`}
            <span class="ob-proj-tag">${p.featured ? '★ Featured' : `Build 0${idx + 1}`}</span>
          </div>
          <div class="ob-proj-body">
            <h3 class="ob-proj-title">${esc(p.title || 'Untitled Project')}</h3>
            ${p.tagline ? `<p class="ob-proj-tagline">${esc(p.tagline)}</p>` : ''}
            ${(p.technologies || []).length ? `
            <div class="ob-chips">
              ${p.technologies.map(t => `<span class="ob-chip">${esc(t)}</span>`).join('')}
            </div>` : ''}
            <div class="ob-case-list">
              ${p.problem ? `<div class="ob-case-block"><h4>Problem</h4><p>${esc(p.problem)}</p></div>` : ''}
              ${p.solution ? `<div class="ob-case-block"><h4>Solution</h4><p>${esc(p.solution)}</p></div>` : ''}
              ${p.features?.filter(Boolean).length ? `
              <div class="ob-case-block">
                <h4>Key Features</h4>
                <ul>${p.features.filter(Boolean).map(featItem).join('')}</ul>
              </div>` : ''}
              ${p.challenges ? `<div class="ob-case-block"><h4>Challenges</h4><p>${esc(p.challenges)}</p></div>` : ''}
              ${p.outcomes ? `<div class="ob-case-block" style="border-color:var(--ob-border-blue)"><h4>Outcomes</h4><p>${esc(p.outcomes)}</p></div>` : ''}
            </div>
            <div class="ob-proj-links">
              ${p.liveUrl ? `<a href="${esc(p.liveUrl)}" class="ob-btn-primary" style="padding:9px 18px;font-size:0.82rem" target="_blank" rel="noopener">Live Demo ↗</a>` : ''}
              ${p.githubUrl ? `<a href="${esc(p.githubUrl)}" class="ob-btn-glass" style="padding:9px 18px;font-size:0.82rem" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
            </div>
          </div>
        </article>`).join('')}
      </div>
    </section>` : ''}

    ${(on('experience') && experience.length) || (on('education') && education.length) ? `
    <section class="ob-section" id="experience">
      <div class="ob-kicker">Trajectory</div>
      <h2 class="ob-h2">Experience &amp; Education</h2>
      <div class="ob-two-col">
        ${on('experience') && experience.length ? `
        <div class="ob-glass-panel">
          <h3 style="font-family:var(--ob-font);margin-bottom:1.25rem;color:var(--ob-blue)">Experience</h3>
          ${experience.map(e => `
          <div class="ob-card-item">
            <div class="ob-item-top">
              <div class="ob-item-role">${esc(e.role || e.title || 'Engineer')}</div>
              ${e.period ? `<span class="ob-item-period">${esc(e.period)}</span>` : ''}
            </div>
            ${e.company ? `<div class="ob-item-org">${esc(e.company)}</div>` : ''}
            ${e.description ? `<p class="ob-item-desc">${esc(e.description)}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        ${on('education') && education.length ? `
        <div class="ob-glass-panel" id="education">
          <h3 style="font-family:var(--ob-font);margin-bottom:1.25rem;color:#c084fc">Education</h3>
          ${education.map(e => `
          <div class="ob-card-item">
            <div class="ob-item-top">
              <div class="ob-item-role">${esc(e.degree || 'Degree')}</div>
              ${(e.year || e.period) ? `<span class="ob-item-period">${esc(e.year || e.period)}</span>` : ''}
            </div>
            ${e.school ? `<div class="ob-item-org">${esc(e.school)}</div>` : ''}
            ${e.description ? `<p class="ob-item-desc">${esc(e.description)}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}
      </div>
    </section>` : ''}

    ${achievements.length ? `
    <section class="ob-section" id="achievements">
      <div class="ob-kicker">Milestones</div>
      <h2 class="ob-h2">Achievements</h2>
      <div class="ob-two-col">
        ${achievements.map(a => `
        <div class="ob-glass-panel">
          <div class="ob-item-role">${esc(typeof a === 'object' ? (a.title || a.name || '') : a)}</div>
          ${typeof a === 'object' && a.description ? `<p class="ob-item-desc" style="margin-top:0.5rem">${esc(a.description)}</p>` : ''}
        </div>`).join('')}
      </div>
    </section>` : ''}

    ${on('contact') ? `
    <section class="ob-section" id="contact">
      <div class="ob-glass-panel ob-contact-wrap">
        <div>
          <div class="ob-kicker">Signal</div>
          <h2 class="ob-h2">Establish Contact</h2>
          <p style="color:var(--ob-muted);margin-bottom:1.5rem">Available for engineering roles, product collaborations, and system design discussions.</p>
          <div class="ob-social-row" style="flex-direction:column;gap:0.7rem">
            ${profile.email ? `<a href="mailto:${esc(profile.email)}">✉ ${esc(profile.email)}</a>` : ''}
            ${resumeUrl ? `<a href="${esc(resumeUrl)}" target="_blank" rel="noopener">📄 Download Resume ↗</a>` : ''}
            ${socials.map(s => `<a href="${esc(s.href)}" target="_blank" rel="noopener">◈ ${esc(s.label)} ↗</a>`).join('')}
          </div>
        </div>
        <form onsubmit="event.preventDefault(); alert('Message transmitted!'); this.reset();">
          <input type="text" class="ob-input" required placeholder="Your Name"/>
          <input type="email" class="ob-input" required placeholder="Your Email"/>
          <textarea class="ob-textarea" required placeholder="Your message..."></textarea>
          <button type="submit" class="ob-submit">Send Transmission →</button>
        </form>
      </div>
    </section>` : ''}
  </main>

  <footer class="ob-footer">
    <p>${esc(profile.name || 'Developer')} · Orbit Portfolio · © ${year}</p>
  </footer>
</body>
</html>`;
  },
};
