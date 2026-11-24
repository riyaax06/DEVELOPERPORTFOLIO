/**
 * template-neon.js — Neon/Cyberpunk Template (v2)
 * Terminal aesthetic with vivid glowing accents.
 * Fixed: scroll-margin-top, z-index scanline, skill object handling,
 *        feature object handling, customCss injection, overflow-wrap,
 *        mobile nav, responsive breakpoints.
 */
window.TemplateNeon = {
  name: 'Neon',
  id: 'neon',
  description: 'Cyberpunk neon — terminal aesthetic with glowing accents & deep case studies',

  render(profile, projects, config = {}) {
    const primary    = config.primaryColor   || '#00ff88';
    const secondary  = config.secondaryColor || '#00d4ff';
    const font       = config.fontFamily     || 'JetBrains Mono';
    const show       = config.showSections   || {};
    const customCss  = config.customCss      || '';
    const resumeUrl  = profile.resumeUrl     || '';

    // Skill can be string or {name, level}
    const skillName = s => (typeof s === 'object' && s !== null) ? (s.name || '') : String(s || '');
    // Feature can be string or {title, desc}
    const featHtml  = f => typeof f === 'object' && f !== null
      ? `<li class="neon-feat-li"><strong style="color:${primary}">${esc(f.title || '')}:</strong> ${esc(f.desc || '')}</li>`
      : `<li class="neon-feat-li">${esc(f)}</li>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${esc(profile.name || 'Portfolio')} :: ROOT_TERMINAL</title>
  <meta name="description" content="${esc(profile.bio?.slice(0,160) || 'Developer Portfolio and Case Studies')}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --neon: ${primary};
      --neon2: ${secondary};
      --font: '${font}', 'JetBrains Mono', 'Courier New', monospace;
      --nav-h: 64px;
      --bg: #020817;
      --bg2: #060d1f;
      --surface: rgba(11,16,32,0.75);
    }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--font);
      background: var(--bg);
      color: #e2e8f0;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      cursor: default;
      overflow-x: hidden;
    }
    a { color: var(--neon); text-decoration: none; }
    a:hover { color: var(--neon2); }
    ul { list-style: none; }
    img { display: block; max-width: 100%; }

    /* ── Global text safety ── */
    * { overflow-wrap: break-word; word-break: break-word; }

    /* Scanline overlay — z-index 999, pointer-events: none so it never blocks clicks */
    body::before {
      content: '';
      position: fixed; inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0,255,136,0.013) 2px,
        rgba(0,255,136,0.013) 4px
      );
      pointer-events: none;
      z-index: 999;
    }

    /* ── Nav ── */
    nav#site-nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 200;
      background: rgba(2,8,23,0.94);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0,255,136,0.18);
      height: var(--nav-h);
    }
    .nav-inner {
      max-width: 1200px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      height: 100%; padding: 0 2rem;
    }
    .nav-logo {
      font-weight: 900; font-size: 1.1rem;
      color: var(--neon);
      text-shadow: 0 0 18px rgba(0,255,136,0.5);
      letter-spacing: 0.05em; flex-shrink: 0;
    }
    .nav-logo::before { content: '> '; color: var(--neon2); }
    .nav-right-group { display: flex; align-items: center; gap: 1.75rem; }

    /* Desktop nav links */
    .nav-links { display: flex; gap: 1.5rem; }
    .nav-links a {
      font-size: 0.8rem; font-weight: 600; color: #64748b;
      letter-spacing: 0.06em; transition: all 200ms;
      text-transform: uppercase; white-space: nowrap;
    }
    .nav-links a:hover {
      color: var(--neon);
      text-shadow: 0 0 8px rgba(0,255,136,0.5);
    }
    .nav-resume-neon {
      padding: 6px 14px; border: 1px solid var(--neon);
      border-radius: 3px; color: var(--neon);
      font-size: 0.75rem; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase;
      transition: all 200ms;
      box-shadow: 0 0 10px rgba(0,255,136,0.18);
      white-space: nowrap;
    }
    .nav-resume-neon:hover {
      background: rgba(0,255,136,0.12);
      box-shadow: 0 0 20px rgba(0,255,136,0.45);
      color: var(--neon);
    }

    /* Mobile hamburger */
    .ham-neon {
      display: none;
      background: none; border: 1px solid rgba(0,255,136,0.3);
      border-radius: 3px; color: var(--neon);
      font-size: 1.1rem; padding: 6px 10px;
      cursor: pointer; letter-spacing: 0.05em;
    }
    .mobile-nav-neon {
      display: none; flex-direction: column;
      position: fixed; top: var(--nav-h); left: 0; right: 0;
      background: rgba(2,8,23,0.98);
      border-bottom: 1px solid rgba(0,255,136,0.2);
      padding: 1.25rem 2rem 1.75rem;
      gap: 1rem; z-index: 198;
    }
    .mobile-nav-neon.open { display: flex; }
    .mobile-nav-neon a {
      font-size: 0.9rem; color: #94a3b8;
      font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 0.35rem 0;
      transition: color 150ms;
    }
    .mobile-nav-neon a:hover { color: var(--neon); }

    /* ── Sections — scroll margin for fixed nav ── */
    section.neon-section {
      scroll-margin-top: calc(var(--nav-h) + 16px);
    }

    /* ── Hero ── */
    .hero-section {
      min-height: calc(100vh - var(--nav-h));
      display: flex; align-items: center;
      padding: calc(var(--nav-h) + 3rem) 2rem 5rem;
      max-width: 1200px; margin: 0 auto;
      scroll-margin-top: 0;
    }
    .hero-content { position: relative; z-index: 1; max-width: 760px; }
    .hero-prompt {
      font-size: 0.8rem; font-weight: 700;
      letter-spacing: 0.15em; text-transform: uppercase;
      color: var(--neon2); margin-bottom: 1.25rem;
      display: flex; align-items: center; gap: 0.5rem;
    }
    .hero-prompt::before { content: '//'; color: #475569; }
    .hero-name {
      font-size: clamp(2.6rem, 7vw, 5rem);
      font-weight: 900; line-height: 1;
      color: #f8fafc;
      text-shadow: 0 0 40px rgba(0,255,136,0.12);
      margin-bottom: 0.75rem; letter-spacing: -0.02em;
    }
    .hero-name span { color: var(--neon); text-shadow: 0 0 40px rgba(0,255,136,0.55); }
    .hero-role {
      font-size: clamp(1rem, 2.5vw, 1.4rem);
      color: #64748b; margin-bottom: 1.5rem; font-weight: 500;
    }
    .hero-role strong { color: var(--neon2); text-shadow: 0 0 18px rgba(0,212,255,0.4); }
    .hero-bio {
      font-size: 1rem; color: #94a3b8;
      line-height: 1.8; max-width: 620px; margin-bottom: 2rem;
    }
    .hero-actions {
      display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.5rem;
    }
    .btn-neon {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 26px; border-radius: 4px;
      background: transparent;
      border: 1px solid var(--neon); color: var(--neon);
      font-size: 0.875rem; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; transition: all 200ms; white-space: nowrap;
      box-shadow: 0 0 14px rgba(0,255,136,0.22), inset 0 0 10px rgba(0,255,136,0.04);
      font-family: inherit;
    }
    .btn-neon:hover {
      background: rgba(0,255,136,0.13);
      box-shadow: 0 0 28px rgba(0,255,136,0.5), inset 0 0 18px rgba(0,255,136,0.12);
      color: var(--neon);
    }
    .btn-neon2 {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 26px; border-radius: 4px;
      background: transparent; border: 1px solid #1e293b; color: #94a3b8;
      font-size: 0.875rem; font-weight: 600; letter-spacing: 0.06em;
      text-transform: uppercase; transition: all 200ms; white-space: nowrap;
      font-family: inherit;
    }
    .btn-neon2:hover { border-color: var(--neon2); color: var(--neon2); box-shadow: 0 0 14px rgba(0,212,255,0.3); }

    .hero-stats { display: flex; gap: 2.5rem; flex-wrap: wrap; }
    .hero-stat-val {
      font-size: 1.75rem; font-weight: 900; color: var(--neon);
      text-shadow: 0 0 18px rgba(0,255,136,0.45);
      display: block; line-height: 1;
    }
    .hero-stat-lbl {
      font-size: 0.65rem; color: #475569;
      text-transform: uppercase; letter-spacing: 0.12em; margin-top: 6px;
    }

    /* ── Sections ── */
    .neon-section { padding: 5.5rem 2rem; max-width: 1200px; margin: 0 auto; }
    .neon-section-border { border-top: 1px solid rgba(0,255,136,0.1); }
    .sec-tag {
      font-size: 0.72rem; font-weight: 700;
      letter-spacing: 0.15em; text-transform: uppercase;
      color: var(--neon); margin-bottom: 0.5rem;
    }
    .sec-tag::before { content: '[ '; }
    .sec-tag::after  { content: ' ]'; }
    .sec-h2 {
      font-size: clamp(1.6rem, 4vw, 2.5rem); font-weight: 900;
      color: #f8fafc; margin-bottom: 0.6rem; letter-spacing: -0.02em;
    }
    .sec-desc { font-size: 0.95rem; color: #64748b; line-height: 1.7; margin-bottom: 3rem; max-width: 600px; }

    /* ── Skills ── */
    .skills-neon { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .skill-neon {
      padding: 8px 18px; border-radius: 3px;
      border: 1px solid rgba(0,255,136,0.22);
      background: rgba(0,255,136,0.03);
      color: #94a3b8; font-size: 0.85rem; font-weight: 600;
      letter-spacing: 0.04em; transition: all 150ms;
    }
    .skill-neon:hover {
      border-color: var(--neon); color: var(--neon);
      box-shadow: 0 0 14px rgba(0,255,136,0.28);
      background: rgba(0,255,136,0.08);
    }

    /* ── Projects & Case Studies ── */
    .proj-neon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr));
      gap: 2rem;
    }
    .proj-neon-card {
      background: var(--surface);
      border: 1px solid rgba(0,255,136,0.13);
      border-radius: 10px; overflow: hidden;
      display: flex; flex-direction: column;
      position: relative; transition: all 300ms;
    }
    .proj-neon-card:hover {
      border-color: rgba(0,255,136,0.5);
      box-shadow: 0 0 32px rgba(0,255,136,0.13), 0 20px 40px rgba(0,0,0,0.6);
      transform: translateY(-4px);
    }
    .proj-neon-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, var(--neon), var(--neon2));
      opacity: 0; transition: opacity 300ms;
    }
    .proj-neon-card:hover::before { opacity: 1; }

    .proj-neon-thumb {
      height: 200px; overflow: hidden;
      background: var(--bg2);
      display: flex; align-items: center; justify-content: center;
      font-size: 3rem; color: rgba(0,255,136,0.18);
    }
    .proj-neon-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .proj-neon-body { padding: 1.75rem; flex: 1; display: flex; flex-direction: column; }
    .proj-neon-num {
      font-size: 0.65rem; color: var(--neon); font-weight: 700;
      letter-spacing: 0.1em; margin-bottom: 0.5rem;
    }
    .proj-neon-title { font-size: 1.2rem; font-weight: 800; color: #f8fafc; margin-bottom: 0.4rem; }
    .proj-neon-tagline { font-size: 0.875rem; color: #94a3b8; line-height: 1.6; margin-bottom: 1.25rem; }
    .proj-neon-tech { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }
    .neon-tech-badge {
      padding: 4px 10px; border-radius: 2px;
      border: 1px solid rgba(0,212,255,0.22);
      background: rgba(0,212,255,0.05); color: #38bdf8;
      font-size: 0.7rem; font-weight: 600;
      letter-spacing: 0.05em; text-transform: uppercase;
    }

    .proj-neon-case { border-top: 1px solid rgba(0,255,136,0.1); padding-top: 1rem; margin-bottom: 1.25rem; }
    .neon-case-h4 {
      font-size: 0.7rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.1em;
      color: var(--neon2); margin-bottom: 0.4rem;
    }
    .neon-case-p { font-size: 0.8rem; color: #94a3b8; line-height: 1.6; margin-bottom: 0.75rem; }
    .neon-feat-li { font-size: 0.8rem; color: #cbd5e1; padding: 2px 0 2px 1.25rem; position: relative; }
    .neon-feat-li::before { content: '>> '; position: absolute; left: 0; color: var(--neon); font-weight: bold; }

    .neon-impact-box {
      background: rgba(0,255,136,0.05); border: 1px solid rgba(0,255,136,0.18);
      border-radius: 4px; padding: 0.75rem; margin-top: 0.75rem;
    }
    .neon-impact-box h4 {
      font-size: 0.65rem; font-weight: 700; color: var(--neon);
      text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.25rem;
    }
    .neon-impact-box p { font-size: 0.8rem; color: #a7f3d0; line-height: 1.5; }

    .proj-neon-links { display: flex; gap: 0.75rem; margin-top: auto; padding-top: 1rem; flex-wrap: wrap; }
    .neon-link-primary {
      padding: 9px 18px; border: 1px solid var(--neon);
      color: var(--neon); font-size: 0.72rem; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase;
      border-radius: 3px; transition: all 150ms;
    }
    .neon-link-primary:hover {
      background: rgba(0,255,136,0.13);
      box-shadow: 0 0 14px rgba(0,255,136,0.4); color: var(--neon);
    }
    .neon-link-ghost {
      padding: 9px 18px; border: 1px solid #1e293b;
      color: #64748b; font-size: 0.72rem; font-weight: 600;
      letter-spacing: 0.05em; border-radius: 3px; transition: all 150ms;
    }
    .neon-link-ghost:hover { border-color: #475569; color: #cbd5e1; }

    /* ── Experience & Education ── */
    .edu-neon { display: flex; flex-direction: column; gap: 1.25rem; }
    .edu-neon-item {
      border: 1px solid rgba(0,255,136,0.1); border-radius: 6px;
      padding: 1.5rem; display: flex; align-items: flex-start;
      gap: 1.5rem; background: rgba(11,16,32,0.55);
      transition: border-color 200ms;
    }
    .edu-neon-item:hover { border-color: rgba(0,255,136,0.32); }
    .edu-neon-num {
      font-size: 1.3rem; font-weight: 900; color: var(--neon);
      text-shadow: 0 0 10px rgba(0,255,136,0.38);
      min-width: 44px; flex-shrink: 0;
    }
    .edu-neon-school { font-weight: 800; color: #f8fafc; font-size: 1rem; }
    .edu-neon-degree { font-size: 0.875rem; color: #94a3b8; margin-top: 0.25rem; }
    .edu-neon-desc { font-size: 0.8rem; color: #64748b; margin-top: 0.4rem; line-height: 1.5; }

    /* ── Contact ── */
    .contact-neon {
      border: 1px solid rgba(0,255,136,0.22); border-radius: 12px;
      padding: 4rem 2rem; text-align: center;
      background: rgba(0,255,136,0.015); position: relative; overflow: hidden;
    }
    .contact-neon::before {
      content: ''; position: absolute; top: -50%; left: 50%;
      transform: translateX(-50%); width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(0,255,136,0.07) 0%, transparent 60%);
      pointer-events: none;
    }
    .contact-neon-email {
      display: inline-flex; align-items: center; gap: 8px;
      margin-top: 2rem; padding: 13px 30px;
      border: 1px solid var(--neon); color: var(--neon);
      font-weight: 700; font-size: 0.95rem; letter-spacing: 0.06em;
      border-radius: 4px; transition: all 200ms; word-break: break-all;
    }
    .contact-neon-email:hover {
      background: rgba(0,255,136,0.12);
      box-shadow: 0 0 24px rgba(0,255,136,0.4); color: var(--neon);
    }
    .neon-social-links {
      display: flex; justify-content: center;
      gap: 1.25rem; margin-top: 1.5rem; flex-wrap: wrap;
    }
    .neon-soc-link {
      font-size: 0.8rem; color: #64748b; letter-spacing: 0.06em;
      transition: color 150ms; text-transform: uppercase;
    }
    .neon-soc-link:hover { color: var(--neon); text-shadow: 0 0 10px rgba(0,255,136,0.5); }

    /* Contact form */
    .neon-form-wrap {
      max-width: 480px; margin: 2rem auto;
      text-align: left;
      background: #050d24;
      border: 1px solid rgba(0,255,136,0.18);
      border-radius: 8px; padding: 1.75rem;
    }
    .neon-form-group { margin-bottom: 14px; }
    .neon-form-label {
      font-size: 11px; color: var(--neon);
      display: block; margin-bottom: 5px; letter-spacing: 0.06em;
    }
    .neon-form-label::before { content: '> '; color: var(--neon2); }
    .neon-form-input, .neon-form-textarea {
      width: 100%; padding: 10px 12px;
      background: var(--bg); border: 1px solid rgba(0,255,136,0.25);
      color: #e2e8f0; font-family: inherit; font-size: 13px;
      outline: none; border-radius: 2px;
      transition: border-color 150ms;
    }
    .neon-form-input:focus, .neon-form-textarea:focus {
      border-color: var(--neon);
      box-shadow: 0 0 10px rgba(0,255,136,0.2);
    }
    .neon-form-textarea { min-height: 100px; resize: vertical; }
    .neon-form-submit {
      width: 100%; padding: 12px; background: transparent;
      border: 1px solid var(--neon); color: var(--neon);
      font-family: inherit; font-size: 0.85rem; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase;
      cursor: pointer; border-radius: 3px; transition: all 200ms;
    }
    .neon-form-submit:hover {
      background: rgba(0,255,136,0.12);
      box-shadow: 0 0 20px rgba(0,255,136,0.4);
    }

    /* ── Footer ── */
    footer {
      text-align: center; padding: 2.5rem;
      font-size: 0.72rem; color: #334155;
      border-top: 1px solid rgba(0,255,136,0.07);
      letter-spacing: 0.05em;
    }
    footer span { color: var(--neon); }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .nav-links { display: none; }
      .ham-neon { display: block; }
      .neon-section { padding: 4rem 1.5rem; }
    }

    @media (max-width: 640px) {
      .hero-section { padding: calc(var(--nav-h) + 2.5rem) 1.25rem 4rem; }
      .hero-name { font-size: 2.4rem; }
      .hero-actions { flex-direction: column; }
      .btn-neon, .btn-neon2 { width: 100%; justify-content: center; }
      .hero-stats { gap: 1.5rem; }
      .proj-neon-grid { grid-template-columns: 1fr; }
      .neon-section { padding: 3.5rem 1.25rem; }
    }

    @media (max-width: 380px) {
      .hero-name { font-size: 2rem; }
      .nav-inner { padding: 0 1rem; }
      .neon-section { padding: 3rem 1rem; }
    }

    /* ── Custom CSS override (live editor) ── */
    ${customCss}
  </style>
</head>
<body>

<nav id="site-nav">
  <div class="nav-inner">
    <div class="nav-logo">${esc(profile.name?.split(' ')[0] || 'DEV_SYS')}</div>
    <div class="nav-right-group">
      <div class="nav-links" id="desktop-nav">
        ${show.about    !== false ? '<a href="#about">// About</a>'           : ''}
        ${show.skills   !== false ? '<a href="#skills">// Skills</a>'         : ''}
        ${show.projects !== false ? '<a href="#projects">// Projects</a>'     : ''}
        ${show.experience !== false && profile.experience?.length ? '<a href="#experience">// Experience</a>' : ''}
        ${show.education  !== false && profile.education?.length  ? '<a href="#education">// Education</a>'   : ''}
        ${show.contact  !== false ? '<a href="#contact">// Contact</a>'       : ''}
      </div>
      ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="nav-resume-neon" target="_blank" rel="noopener">[ RESUME ]</a>` : ''}
      <button class="ham-neon" id="ham-neon" onclick="toggleNeonNav()">[ ☰ ]</button>
    </div>
  </div>
</nav>

<div class="mobile-nav-neon" id="mobile-nav-neon">
  ${show.about    !== false ? '<a href="#about" onclick="closeNeonNav()">// About</a>'           : ''}
  ${show.skills   !== false ? '<a href="#skills" onclick="closeNeonNav()">// Skills</a>'         : ''}
  ${show.projects !== false ? '<a href="#projects" onclick="closeNeonNav()">// Projects</a>'     : ''}
  ${show.experience !== false && profile.experience?.length ? '<a href="#experience" onclick="closeNeonNav()">// Experience</a>' : ''}
  ${show.education  !== false && profile.education?.length  ? '<a href="#education" onclick="closeNeonNav()">// Education</a>'   : ''}
  ${show.contact  !== false ? '<a href="#contact" onclick="closeNeonNav()">// Contact</a>'       : ''}
  ${resumeUrl ? `<a href="${esc(resumeUrl)}" target="_blank" rel="noopener" onclick="closeNeonNav()">[ RESUME ]</a>` : ''}
</div>

${show.hero !== false ? `
<div class="hero-section" id="about">
  <div class="hero-content">
    <div class="hero-prompt">STATUS: AVAILABLE_FOR_DEPLOYMENT</div>
    <h1 class="hero-name"><span>${esc(profile.name?.split(' ')[0] || 'Your')}</span> ${esc(profile.name?.split(' ').slice(1).join(' ') || 'Name')}</h1>
    <div class="hero-role">&gt; ROLE: <strong>${esc(profile.title || 'Systems & Full-Stack Architect')}</strong></div>
    <p class="hero-bio">${esc(profile.bio || 'Designing high-scale distributed systems and developer tooling.')}</p>

    <div class="hero-actions">
      ${profile.email ? `<a href="mailto:${esc(profile.email)}" class="btn-neon">[ TRANSMIT_MESSAGE ]</a>` : `<a href="#contact" class="btn-neon">[ CONTACT_ME ]</a>`}
      ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="btn-neon" target="_blank" rel="noopener">[ DOWNLOAD_RESUME ]</a>` : ''}
      ${profile.social?.github ? `<a href="${esc(profile.social.github)}" class="btn-neon2" target="_blank" rel="noopener">SOURCE_CODE ↗</a>` : ''}
    </div>

    <div class="hero-stats">
      <div>
        <span class="hero-stat-val">${projects.length}</span>
        <span class="hero-stat-lbl">Projects Built</span>
      </div>
      <div>
        <span class="hero-stat-val">${profile.skills?.length || 0}</span>
        <span class="hero-stat-lbl">Technologies</span>
      </div>
      ${profile.location ? `
      <div>
        <span class="hero-stat-val" style="font-size:1.1rem">${esc(profile.location.split(',')[0] || '')}</span>
        <span class="hero-stat-lbl">Base Location</span>
      </div>` : ''}
    </div>
  </div>
</div>` : ''}

${show.skills !== false && profile.skills?.length ? `
<section class="neon-section neon-section-border" id="skills">
  <div class="sec-tag">CAPABILITIES</div>
  <h2 class="sec-h2">Skills &amp; Technologies</h2>
  <p class="sec-desc">Core technology stack verified for production execution.</p>
  <div class="skills-neon">
    ${profile.skills.map(s => `<span class="skill-neon">${esc(skillName(s))}</span>`).join('')}
  </div>
</section>` : ''}

${show.projects !== false && projects.length ? `
<section class="neon-section neon-section-border" id="projects">
  <div class="sec-tag">CASE_STUDIES</div>
  <h2 class="sec-h2">Engineered Systems</h2>
  <p class="sec-desc">Production architectures, problem breakdowns, and measurable impact.</p>

  <div class="proj-neon-grid">
    ${projects.map((p, idx) => `
    <div class="proj-neon-card">
      <div class="proj-neon-thumb">
        ${p.thumbnail ? `<img src="${esc(p.thumbnail)}" alt="${esc(p.title)}" />` : `[0${idx + 1}]`}
      </div>
      <div class="proj-neon-body">
        <div class="proj-neon-num">>> PROJECT_0${idx + 1}${p.featured ? ' [FEATURED]' : ''}</div>
        <h3 class="proj-neon-title">${esc(p.title || 'Untitled')}</h3>
        <p class="proj-neon-tagline">${esc(p.tagline || '')}</p>

        <div class="proj-neon-tech">
          ${(p.technologies || []).map(t => `<span class="neon-tech-badge">${esc(t)}</span>`).join('')}
        </div>

        ${(p.problem || p.solution || (p.features && p.features.length) || p.challenges || p.outcomes) ? `
        <div class="proj-neon-case">
          ${p.problem ? `
          <div style="margin-bottom:0.75rem">
            <div class="neon-case-h4">// PROBLEM</div>
            <p class="neon-case-p">${esc(p.problem)}</p>
          </div>` : ''}

          ${p.solution ? `
          <div style="margin-bottom:0.75rem">
            <div class="neon-case-h4">// ARCHITECTURE &amp; SOLUTION</div>
            <p class="neon-case-p">${esc(p.solution)}</p>
          </div>` : ''}

          ${p.features && p.features.filter(Boolean).length ? `
          <div style="margin-bottom:0.75rem">
            <div class="neon-case-h4">// CORE_CAPABILITIES</div>
            <ul style="list-style:none">
              ${p.features.filter(Boolean).map(f => featHtml(f)).join('')}
            </ul>
          </div>` : ''}

          ${p.challenges ? `
          <div style="margin-bottom:0.75rem">
            <div class="neon-case-h4">// TRADEOFFS &amp; CHALLENGES</div>
            <p class="neon-case-p">${esc(p.challenges)}</p>
          </div>` : ''}

          ${p.outcomes ? `
          <div class="neon-impact-box">
            <h4>// VERIFIED_OUTCOMES</h4>
            <p>${esc(p.outcomes)}</p>
          </div>` : ''}
        </div>` : ''}

        <div class="proj-neon-links">
          ${p.liveUrl   ? `<a href="${esc(p.liveUrl)}"   class="neon-link-primary" target="_blank" rel="noopener">LAUNCH ↗</a>` : ''}
          ${p.githubUrl ? `<a href="${esc(p.githubUrl)}" class="neon-link-ghost"   target="_blank" rel="noopener">SOURCE ↗</a>` : ''}
        </div>
      </div>
    </div>`).join('')}
  </div>
</section>` : ''}

${show.experience !== false && profile.experience?.length ? `
<section class="neon-section neon-section-border" id="experience">
  <div class="sec-tag">HISTORY</div>
  <h2 class="sec-h2">Career Trajectory</h2>
  <div class="edu-neon">
    ${profile.experience.map((e, idx) => `
    <div class="edu-neon-item">
      <div class="edu-neon-num">0${idx + 1}</div>
      <div>
        <div class="edu-neon-school">${esc(e.role || e.title || 'Engineer')} @ ${esc(e.company || '')}</div>
        <div class="edu-neon-degree">${esc(e.period || '')}</div>
        <div class="edu-neon-desc">${esc(e.description || '')}</div>
      </div>
    </div>`).join('')}
  </div>
</section>` : ''}

${show.education !== false && profile.education?.length ? `
<section class="neon-section neon-section-border" id="education">
  <div class="sec-tag">CREDENTIALS</div>
  <h2 class="sec-h2">Education</h2>
  <div class="edu-neon">
    ${profile.education.map((e, idx) => `
    <div class="edu-neon-item">
      <div class="edu-neon-num">E0${idx + 1}</div>
      <div>
        <div class="edu-neon-school">${esc(e.school)}</div>
        <div class="edu-neon-degree">${esc(e.degree)} // ${esc(e.year || '')}</div>
        <div class="edu-neon-desc">${esc(e.description || '')}</div>
      </div>
    </div>`).join('')}
  </div>
</section>` : ''}

${show.contact !== false ? `
<section class="neon-section neon-section-border" id="contact">
  <div class="contact-neon">
    <div class="sec-tag">PING // CONNECT</div>
    <h2 class="sec-h2" style="margin-top:0.5rem">Initialize Transmission</h2>
    <p style="color:#64748b;max-width:540px;margin:0 auto 0.5rem;line-height:1.7">
      ${esc(profile.bio || 'Open to technical roles, infrastructure consulting, and architecture reviews.')}
    </p>

    <div class="neon-form-wrap">
      <form onsubmit="event.preventDefault(); alert('[SYSTEM]: Transmission received. Response queued.'); this.reset();">
        <div class="neon-form-group">
          <label class="neon-form-label">SENDER_NAME</label>
          <input type="text" class="neon-form-input" required placeholder="User_Identity" />
        </div>
        <div class="neon-form-group">
          <label class="neon-form-label">SENDER_EMAIL</label>
          <input type="email" class="neon-form-input" required placeholder="user@domain.dev" />
        </div>
        <div class="neon-form-group">
          <label class="neon-form-label">PAYLOAD_MESSAGE</label>
          <textarea class="neon-form-textarea" required placeholder="Enter transmission packet..."></textarea>
        </div>
        <button type="submit" class="neon-form-submit">[ TRANSMIT_PACKET ]</button>
      </form>
    </div>

    ${profile.email ? `<a href="mailto:${esc(profile.email)}" class="contact-neon-email">&gt;&gt; DIRECT_MAIL: ${esc(profile.email)}</a>` : ''}

    <div class="neon-social-links">
      ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="neon-soc-link" target="_blank" rel="noopener">[ DOWNLOAD_RESUME ]</a>` : ''}
      ${profile.social?.github   ? `<a href="${esc(profile.social.github)}"   class="neon-soc-link" target="_blank" rel="noopener">GITHUB</a>` : ''}
      ${profile.social?.linkedin ? `<a href="${esc(profile.social.linkedin)}" class="neon-soc-link" target="_blank" rel="noopener">LINKEDIN</a>` : ''}
      ${profile.website          ? `<a href="${esc(profile.website)}"         class="neon-soc-link" target="_blank" rel="noopener">TERMINAL_WEB</a>` : ''}
    </div>
  </div>
</section>` : ''}

<footer>
  <p>TERMINAL HOSTED · <span>${esc(profile.name || 'DEV')}</span> © ${new Date().getFullYear()} // ALL PROTOCOLS VERIFIED</p>
</footer>

<script>
  function toggleNeonNav() {
    document.getElementById('mobile-nav-neon').classList.toggle('open');
  }
  function closeNeonNav() {
    document.getElementById('mobile-nav-neon').classList.remove('open');
  }
  document.addEventListener('click', function(e) {
    var nav = document.getElementById('mobile-nav-neon');
    var btn = document.getElementById('ham-neon');
    if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== btn) {
      nav.classList.remove('open');
    }
  });
</script>

</body>
</html>`;
  },
};

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}
