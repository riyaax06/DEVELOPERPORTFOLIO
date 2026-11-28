/**
 * template-pixel-grid.js — Pixel Grid Template
 * Asymmetrical bento-grid portfolio in light lavender, off-white, and soft blue.
 * Scoped with .pg-* classes and --pg-* CSS custom properties.
 */
window.TemplatePixelGrid = {
  name: 'Pixel Grid',
  id: 'pixel-grid',
  description: 'Asymmetrical bento-grid developer website in light lavender, off-white & soft blue',

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
    const primary   = safeColor(config.primaryColor, '#6366f1');
    const secondary = safeColor(config.secondaryColor, '#3b82f6');
    const font      = String(config.fontFamily || 'DM Sans').replace(/['"\\<>]/g, '') || 'DM Sans';
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
  <title>${esc(profile.name || 'Portfolio')} — Pixel Grid</title>
  <meta name="description" content="${esc((profile.bio || 'Developer Portfolio').slice(0, 160))}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --pg-primary: ${primary};
      --pg-secondary: ${secondary};
      --pg-bg: #f6f5ff;
      --pg-card: #ffffff;
      --pg-lavender: #ede9fe;
      --pg-blue-soft: #e0f2fe;
      --pg-ink: #1e1b4b;
      --pg-muted: #5b5978;
      --pg-border: rgba(99, 102, 241, 0.14);
      --pg-shadow: 0 10px 30px rgba(79, 70, 229, 0.06);
      --pg-font: '${font}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --pg-display: 'Space Grotesk', '${font}', sans-serif;
      --pg-mono: 'JetBrains Mono', monospace;
      --pg-nav-h: 66px;
    }
    html { scroll-behavior: smooth; }
    body.pg-body {
      font-family: var(--pg-font);
      background:
        radial-gradient(circle at 12% 8%, rgba(196, 181, 253, 0.35), transparent 40%),
        radial-gradient(circle at 88% 15%, rgba(191, 219, 254, 0.42), transparent 42%),
        var(--pg-bg);
      color: var(--pg-ink);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    .pg-body * { overflow-wrap: break-word; word-wrap: break-word; }
    .pg-body a { color: inherit; text-decoration: none; }
    .pg-body ul { list-style: none; }
    .pg-body img { display: block; max-width: 100%; }

    /* ── Navbar ── */
    .pg-nav-wrap {
      position: sticky; top: 0; z-index: 200;
      padding: 0.75rem 1.5rem 0;
    }
    .pg-nav {
      max-width: 1200px; margin: 0 auto; height: var(--pg-nav-h);
      background: rgba(255, 255, 255, 0.86);
      backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--pg-border);
      border-radius: 20px;
      padding: 0 1.5rem;
      display: flex; align-items: center; justify-content: space-between; gap: 1rem;
      box-shadow: var(--pg-shadow);
    }
    .pg-brand {
      display: flex; align-items: center; gap: 0.6rem;
      font-family: var(--pg-display); font-weight: 700; font-size: 1.05rem;
      color: var(--pg-ink); flex-shrink: 0;
    }
    .pg-brand-dot {
      width: 12px; height: 12px; border-radius: 4px;
      background: linear-gradient(135deg, var(--pg-primary), var(--pg-secondary));
    }
    .pg-nav-links { display: flex; align-items: center; gap: 1.35rem; }
    .pg-nav-links a {
      font-size: 0.86rem; font-weight: 600; color: var(--pg-muted);
      transition: color 160ms ease; white-space: nowrap;
    }
    .pg-nav-links a:hover { color: var(--pg-primary); }
    .pg-nav-btn {
      padding: 8px 16px; border-radius: 12px;
      background: var(--pg-ink); color: #fff !important;
      font-size: 0.8rem !important; font-weight: 600 !important;
      transition: transform 160ms ease, background 160ms ease !important;
    }
    .pg-nav-btn:hover { background: var(--pg-primary); transform: translateY(-1px); }

    .pg-ham {
      display: none; background: var(--pg-lavender); border: none;
      color: var(--pg-ink); border-radius: 10px; padding: 7px 11px;
      font-size: 1.1rem; cursor: pointer;
    }
    .pg-mobile-menu {
      display: none; max-width: 1200px; margin: 0.5rem auto 0;
      background: #fff; border: 1px solid var(--pg-border); border-radius: 18px;
      padding: 1rem 1.5rem; flex-direction: column; gap: 0.75rem;
      box-shadow: var(--pg-shadow);
    }
    .pg-mobile-menu.open { display: flex; }
    .pg-mobile-menu a { font-size: 0.92rem; font-weight: 600; color: var(--pg-muted); padding: 0.25rem 0; }

    /* ── Container & Bento System ── */
    .pg-container { max-width: 1200px; margin: 0 auto; padding: 1.75rem 1.5rem 4rem; }
    .pg-bento-grid {
      display: grid; grid-template-columns: repeat(12, 1fr); gap: 1.25rem;
    }
    .pg-card {
      background: var(--pg-card);
      border: 1px solid var(--pg-border);
      border-radius: 24px;
      padding: 1.85rem;
      box-shadow: var(--pg-shadow);
      transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
    }
    .pg-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 18px 40px rgba(79, 70, 229, 0.1);
      border-color: rgba(99, 102, 241, 0.3);
    }
    .pg-anchor { scroll-margin-top: calc(var(--pg-nav-h) + 28px); }

    /* Hero Bento Tiles */
    .pg-hero-intro {
      grid-column: span 8;
      background: linear-gradient(145deg, #ffffff 0%, #f5f3ff 100%);
      display: flex; flex-direction: column; justify-content: space-between; gap: 1.5rem;
    }
    .pg-hero-profile {
      grid-column: span 4;
      background: linear-gradient(155deg, #eef2ff 0%, #e0f2fe 100%);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; gap: 1rem;
    }
    .pg-pill-tag {
      display: inline-flex; align-items: center; gap: 0.45rem; width: fit-content;
      padding: 6px 13px; border-radius: 999px;
      background: var(--pg-lavender); color: var(--pg-primary);
      font-size: 0.78rem; font-weight: 700;
    }
    .pg-pill-dot { width: 7px; height: 7px; border-radius: 50%; background: #10b981; }
    .pg-h1 {
      font-family: var(--pg-display);
      font-size: clamp(2.1rem, 4.4vw, 3.4rem);
      font-weight: 700; line-height: 1.08; letter-spacing: -0.03em; color: var(--pg-ink);
    }
    .pg-role { font-size: 1.12rem; font-weight: 600; color: var(--pg-primary); margin-top: 0.4rem; }
    .pg-bio { font-size: 0.98rem; color: var(--pg-muted); max-width: 600px; line-height: 1.7; }
    .pg-cta-row { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .pg-btn-primary {
      padding: 11px 22px; border-radius: 14px;
      background: linear-gradient(135deg, var(--pg-primary), var(--pg-secondary));
      color: #fff; font-weight: 600; font-size: 0.88rem;
      box-shadow: 0 8px 20px rgba(99, 102, 241, 0.25);
      transition: transform 180ms ease;
    }
    .pg-btn-primary:hover { transform: translateY(-2px); }
    .pg-btn-soft {
      padding: 11px 20px; border-radius: 14px;
      background: #fff; border: 1px solid var(--pg-border);
      color: var(--pg-ink); font-weight: 600; font-size: 0.88rem;
      transition: border-color 180ms ease;
    }
    .pg-btn-soft:hover { border-color: var(--pg-primary); color: var(--pg-primary); }

    .pg-avatar {
      width: 132px; height: 132px; border-radius: 28px; object-fit: cover;
      border: 4px solid #fff; box-shadow: 0 12px 28px rgba(79, 70, 229, 0.16);
    }
    .pg-avatar-fallback {
      width: 132px; height: 132px; border-radius: 28px;
      background: linear-gradient(135deg, var(--pg-primary), var(--pg-secondary));
      color: #fff; font-family: var(--pg-display); font-size: 3.2rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      border: 4px solid #fff; box-shadow: 0 12px 28px rgba(79, 70, 229, 0.16);
    }
    .pg-loc { font-size: 0.84rem; color: var(--pg-muted); font-weight: 500; }
    .pg-social-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.45rem; }
    .pg-social-chip {
      padding: 6px 12px; border-radius: 10px; background: rgba(255,255,255,0.85);
      border: 1px solid var(--pg-border); font-size: 0.78rem; font-weight: 600; color: var(--pg-ink);
      transition: background 150ms ease, color 150ms ease;
    }
    .pg-social-chip:hover { background: var(--pg-primary); color: #fff; }

    /* Stats & About Row */
    .pg-stat-card {
      grid-column: span 4;
      display: flex; align-items: center; justify-content: space-between;
      background: #ffffff;
    }
    .pg-stat-card.tint-lav { background: #f3f0ff; }
    .pg-stat-card.tint-blue { background: #eff6ff; }
    .pg-stat-num { font-family: var(--pg-display); font-size: 2.2rem; font-weight: 700; color: var(--pg-ink); line-height: 1; }
    .pg-stat-lbl { font-size: 0.82rem; font-weight: 600; color: var(--pg-muted); margin-top: 0.35rem; }
    .pg-stat-icon {
      width: 46px; height: 46px; border-radius: 14px;
      background: #fff; display: flex; align-items: center; justify-content: center;
      font-family: var(--pg-mono); font-weight: 700; color: var(--pg-primary);
      border: 1px solid var(--pg-border);
    }

    .pg-about-card { grid-column: span 7; }
    .pg-skills-card { grid-column: span 5; }
    .pg-kicker {
      font-family: var(--pg-mono); font-size: 0.72rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.08em; color: var(--pg-primary);
      margin-bottom: 0.4rem;
    }
    .pg-h2 {
      font-family: var(--pg-display); font-size: 1.45rem; font-weight: 700;
      color: var(--pg-ink); margin-bottom: 0.9rem;
    }

    /* Skills Pills */
    .pg-skill-wrap { display: flex; flex-wrap: wrap; gap: 0.55rem; }
    .pg-skill-pill {
      display: inline-flex; align-items: center; gap: 0.45rem;
      padding: 7px 13px; border-radius: 12px;
      background: #f8f7ff; border: 1px solid var(--pg-border);
      font-size: 0.83rem; font-weight: 600; color: var(--pg-ink);
    }
    .pg-skill-lvl {
      font-family: var(--pg-mono); font-size: 0.7rem; color: var(--pg-primary);
      background: var(--pg-lavender); padding: 2px 6px; border-radius: 6px;
    }

    /* Projects Bento */
    .pg-section-head {
      grid-column: span 12;
      display: flex; justify-content: space-between; align-items: flex-end;
      flex-wrap: wrap; gap: 1rem; padding: 1.25rem 0.25rem 0.25rem;
    }
    .pg-proj-card {
      grid-column: span 6;
      display: flex; flex-direction: column; gap: 1rem;
    }
    .pg-proj-card.is-wide { grid-column: span 12; }
    .pg-proj-top {
      display: grid; grid-template-columns: 1fr; gap: 1.25rem;
    }
    .pg-proj-card.is-wide .pg-proj-top {
      grid-template-columns: 1.05fr 1fr; align-items: center; gap: 1.75rem;
    }
    .pg-proj-thumb {
      width: 100%; height: 220px; border-radius: 16px; overflow: hidden;
      background: linear-gradient(135deg, #ede9fe, #dbeafe);
      display: flex; align-items: center; justify-content: center;
      font-family: var(--pg-display); font-size: 2.5rem; font-weight: 700; color: var(--pg-primary);
    }
    .pg-proj-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .pg-proj-meta { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem; }
    .pg-proj-badge {
      padding: 3px 10px; border-radius: 999px;
      background: var(--pg-blue-soft); color: #1d4ed8;
      font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
    }
    .pg-proj-title { font-family: var(--pg-display); font-size: 1.28rem; font-weight: 700; color: var(--pg-ink); margin-bottom: 0.35rem; }
    .pg-proj-tagline { font-size: 0.92rem; color: var(--pg-muted); margin-bottom: 0.9rem; }
    .pg-tech-list { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .pg-tech {
      padding: 4px 10px; border-radius: 8px; background: #f1f5f9;
      font-family: var(--pg-mono); font-size: 0.72rem; color: #334155;
    }

    .pg-case-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
    .pg-case-tile {
      padding: 0.9rem 1rem; border-radius: 14px;
      background: #f8fafc; border: 1px solid #e2e8f0;
    }
    .pg-case-tile h4 { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--pg-primary); margin-bottom: 0.3rem; }
    .pg-case-tile p, .pg-case-tile li { font-size: 0.83rem; color: var(--pg-muted); line-height: 1.55; }
    .pg-case-tile li { padding-left: 0.9rem; position: relative; }
    .pg-case-tile li::before { content: '•'; position: absolute; left: 0; color: var(--pg-primary); font-weight: 700; }
    .pg-outcome-tile {
      padding: 0.9rem 1rem; border-radius: 14px;
      background: #ecfdf5; border: 1px solid #a7f3d0;
    }
    .pg-outcome-tile h4 { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: #065f46; margin-bottom: 0.25rem; }
    .pg-outcome-tile p { font-size: 0.83rem; color: #047857; }
    .pg-proj-actions { display: flex; flex-wrap: wrap; gap: 0.65rem; margin-top: auto; }

    /* Experience, Education, Achievements Widgets */
    .pg-half { grid-column: span 6; }
    .pg-full { grid-column: span 12; }
    .pg-list { display: flex; flex-direction: column; gap: 0.9rem; }
    .pg-list-item {
      padding: 1rem 1.15rem; border-radius: 16px;
      background: #f8f7ff; border: 1px solid var(--pg-border);
    }
    .pg-list-top { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.4rem; }
    .pg-list-title { font-weight: 700; font-size: 0.98rem; color: var(--pg-ink); }
    .pg-list-date { font-family: var(--pg-mono); font-size: 0.74rem; color: var(--pg-primary); }
    .pg-list-sub { font-size: 0.86rem; font-weight: 600; color: var(--pg-muted); margin-top: 0.15rem; }
    .pg-list-desc { font-size: 0.84rem; color: var(--pg-muted); margin-top: 0.4rem; }

    /* Contact Bento */
    .pg-contact-card {
      grid-column: span 12;
      background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #e0f2fe 100%);
      display: grid; grid-template-columns: 1fr 1.1fr; gap: 2rem; align-items: center;
    }
    .pg-form-card { background: #fff; border-radius: 18px; padding: 1.5rem; border: 1px solid var(--pg-border); }
    .pg-input, .pg-textarea {
      width: 100%; padding: 10px 12px; border-radius: 10px;
      border: 1px solid #cbd5e1; font-family: inherit; font-size: 0.88rem;
      margin-bottom: 0.75rem; outline: none;
    }
    .pg-input:focus, .pg-textarea:focus { border-color: var(--pg-primary); }
    .pg-textarea { min-height: 92px; resize: vertical; }
    .pg-submit {
      width: 100%; padding: 11px; border: none; border-radius: 10px;
      background: var(--pg-ink); color: #fff; font-weight: 600; cursor: pointer;
      font-family: inherit; transition: background 180ms ease;
    }
    .pg-submit:hover { background: var(--pg-primary); }

    .pg-footer { text-align: center; padding: 2rem 1rem 3rem; font-size: 0.82rem; color: var(--pg-muted); }

    @media (max-width: 960px) {
      .pg-hero-intro, .pg-hero-profile, .pg-about-card, .pg-skills-card,
      .pg-proj-card, .pg-half, .pg-contact-card { grid-column: span 12; }
      .pg-proj-card.is-wide .pg-proj-top, .pg-contact-card { grid-template-columns: 1fr; }
      .pg-stat-card { grid-column: span 4; }
    }
    @media (max-width: 720px) {
      .pg-nav-links { display: none; }
      .pg-ham { display: block; }
      .pg-stat-card { grid-column: span 12; }
      .pg-case-grid { grid-template-columns: 1fr; }
      .pg-container { padding: 1.25rem 1rem 3rem; }
      .pg-card { padding: 1.35rem; border-radius: 20px; }
    }
    @media (max-width: 400px) {
      .pg-cta-row { flex-direction: column; }
      .pg-btn-primary, .pg-btn-soft { width: 100%; text-align: center; }
    }

    ${customCss}
  </style>
</head>
<body class="pg-body">
  <div class="pg-nav-wrap">
    <nav class="pg-nav">
      <a href="#top" class="pg-brand">
        <span class="pg-brand-dot"></span>
        <span>${esc(profile.name || 'Portfolio')}</span>
      </a>
      <div class="pg-nav-links">
        ${on('about')      ? '<a href="#about">About</a>' : ''}
        ${on('skills')     && skills.length ? '<a href="#skills">Stack</a>' : ''}
        ${on('projects')   && orderedProjs.length ? '<a href="#projects">Projects</a>' : ''}
        ${on('experience') && experience.length ? '<a href="#experience">Experience</a>' : ''}
        ${on('education')  && education.length ? '<a href="#education">Education</a>' : ''}
        ${on('contact')    ? '<a href="#contact">Contact</a>' : ''}
        ${resumeUrl        ? `<a href="${esc(resumeUrl)}" class="pg-nav-btn" target="_blank" rel="noopener">Resume ↗</a>` : ''}
      </div>
      <button class="pg-ham" aria-label="Toggle Menu" onclick="document.getElementById('pg-mob').classList.toggle('open')">☰</button>
    </nav>
    <div class="pg-mobile-menu" id="pg-mob">
      ${on('about')      ? '<a href="#about" onclick="this.parentElement.classList.remove(\'open\')">About</a>' : ''}
      ${on('skills')     && skills.length ? '<a href="#skills" onclick="this.parentElement.classList.remove(\'open\')">Stack</a>' : ''}
      ${on('projects')   && orderedProjs.length ? '<a href="#projects" onclick="this.parentElement.classList.remove(\'open\')">Projects</a>' : ''}
      ${on('experience') && experience.length ? '<a href="#experience" onclick="this.parentElement.classList.remove(\'open\')">Experience</a>' : ''}
      ${on('education')  && education.length ? '<a href="#education" onclick="this.parentElement.classList.remove(\'open\')">Education</a>' : ''}
      ${on('contact')    ? '<a href="#contact" onclick="this.parentElement.classList.remove(\'open\')">Contact</a>' : ''}
      ${resumeUrl        ? `<a href="${esc(resumeUrl)}" target="_blank" rel="noopener">Download Resume ↗</a>` : ''}
    </div>
  </div>

  <main class="pg-container" id="top">
    <div class="pg-bento-grid">

      ${on('hero') ? `
      <section class="pg-card pg-hero-intro pg-anchor">
        <div>
          <div class="pg-pill-tag"><span class="pg-pill-dot"></span> Available for Collaboration</div>
          <h1 class="pg-h1" style="margin-top:1rem">${esc(profile.name || 'Your Name')}</h1>
          <div class="pg-role">${esc(profile.title || 'Full-Stack Developer & Designer')}</div>
          <p class="pg-bio" style="margin-top:0.85rem">${esc(profile.bio || 'Building thoughtful software products with clean code and modern interfaces.')}</p>
        </div>
        <div class="pg-cta-row">
          ${on('contact') ? `<a href="#contact" class="pg-btn-primary">Get in Touch →</a>` : ''}
          ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="pg-btn-soft" target="_blank" rel="noopener">📄 Resume</a>` : ''}
          ${on('projects') && orderedProjs.length ? `<a href="#projects" class="pg-btn-soft">Explore Work</a>` : ''}
        </div>
      </section>

      <aside class="pg-card pg-hero-profile">
        ${profile.avatar
          ? `<img class="pg-avatar" src="${esc(profile.avatar)}" alt="${esc(profile.name || 'Profile')}" onerror="this.outerHTML='<div class=\\'pg-avatar-fallback\\'>${initial}</div>'"/>`
          : `<div class="pg-avatar-fallback">${initial}</div>`}
        <div>
          <div style="font-weight:700;font-size:1.05rem">${esc(profile.name || 'Developer')}</div>
          ${profile.location ? `<div class="pg-loc">📍 ${esc(profile.location)}</div>` : ''}
        </div>
        ${socials.length ? `
        <div class="pg-social-chips">
          ${socials.map(s => `<a href="${esc(s.href)}" class="pg-social-chip" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}
        </div>` : ''}
      </aside>

      <div class="pg-card pg-stat-card tint-lav">
        <div>
          <div class="pg-stat-num">${orderedProjs.length}</div>
          <div class="pg-stat-lbl">Shipped Projects</div>
        </div>
        <div class="pg-stat-icon">PRJ</div>
      </div>
      <div class="pg-card pg-stat-card tint-blue">
        <div>
          <div class="pg-stat-num">${skills.length}</div>
          <div class="pg-stat-lbl">Core Technologies</div>
        </div>
        <div class="pg-stat-icon">STK</div>
      </div>
      <div class="pg-card pg-stat-card">
        <div>
          <div class="pg-stat-num">${experience.length || education.length || 1}</div>
          <div class="pg-stat-lbl">${experience.length ? 'Career Roles' : 'Academic Degrees'}</div>
        </div>
        <div class="pg-stat-icon">EXP</div>
      </div>` : ''}

      ${on('about') ? `
      <section class="pg-card pg-about-card pg-anchor" id="about">
        <div class="pg-kicker">About Me</div>
        <h2 class="pg-h2">Engineering Philosophy</h2>
        <p class="pg-bio">${esc(profile.bio || 'Focused on modular design systems, reliable APIs, and fast web experiences.')}</p>
        ${profile.email ? `<p style="margin-top:1rem;font-size:0.88rem;color:var(--pg-primary);font-weight:600">Direct: ${esc(profile.email)}</p>` : ''}
      </section>` : ''}

      ${on('skills') && skills.length ? `
      <section class="pg-card pg-skills-card pg-anchor" id="skills" ${!on('about') ? 'style="grid-column:span 12"' : ''}>
        <div class="pg-kicker">Tech Stack</div>
        <h2 class="pg-h2">Tools &amp; Languages</h2>
        <div class="pg-skill-wrap">
          ${skills.map(s => {
            const lvl = skillLevel(s);
            return `<span class="pg-skill-pill">${esc(skillName(s))}${lvl !== null ? `<span class="pg-skill-lvl">${lvl}%</span>` : ''}</span>`;
          }).join('')}
        </div>
      </section>` : ''}

      ${on('projects') && orderedProjs.length ? `
      <div class="pg-section-head pg-anchor" id="projects">
        <div>
          <div class="pg-kicker">Featured Work</div>
          <h2 class="pg-h2" style="margin-bottom:0">Project Bento Showcase</h2>
        </div>
      </div>
      ${orderedProjs.map((p, idx) => `
      <article class="pg-card pg-proj-card ${idx === 0 ? 'is-wide' : ''}">
        <div class="pg-proj-top">
          <div class="pg-proj-thumb">
            ${p.thumbnail
              ? `<img src="${esc(p.thumbnail)}" alt="${esc(p.title || 'Project')}"/>`
              : `<span>0${idx + 1}</span>`}
          </div>
          <div>
            <div class="pg-proj-meta">
              <span class="pg-kicker" style="margin-bottom:0">Project 0${idx + 1}</span>
              ${p.featured ? `<span class="pg-proj-badge">Featured</span>` : ''}
            </div>
            <h3 class="pg-proj-title">${esc(p.title || 'Untitled Project')}</h3>
            ${p.tagline ? `<p class="pg-proj-tagline">${esc(p.tagline)}</p>` : ''}
            ${(p.technologies || []).length ? `
            <div class="pg-tech-list">
              ${p.technologies.map(t => `<span class="pg-tech">${esc(t)}</span>`).join('')}
            </div>` : ''}
          </div>
        </div>
        ${(p.problem || p.solution) ? `
        <div class="pg-case-grid">
          ${p.problem ? `<div class="pg-case-tile"><h4>Problem</h4><p>${esc(p.problem)}</p></div>` : ''}
          ${p.solution ? `<div class="pg-case-tile"><h4>Solution</h4><p>${esc(p.solution)}</p></div>` : ''}
        </div>` : ''}
        ${p.features?.filter(Boolean).length ? `
        <div class="pg-case-tile">
          <h4>Core Features</h4>
          <ul>${p.features.filter(Boolean).map(featItem).join('')}</ul>
        </div>` : ''}
        ${p.challenges ? `<div class="pg-case-tile"><h4>Challenges</h4><p>${esc(p.challenges)}</p></div>` : ''}
        ${p.outcomes ? `<div class="pg-outcome-tile"><h4>Outcomes</h4><p>${esc(p.outcomes)}</p></div>` : ''}
        <div class="pg-proj-actions">
          ${p.liveUrl ? `<a href="${esc(p.liveUrl)}" class="pg-btn-primary" target="_blank" rel="noopener">Live Demo ↗</a>` : ''}
          ${p.githubUrl ? `<a href="${esc(p.githubUrl)}" class="pg-btn-soft" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
        </div>
      </article>`).join('')}` : ''}

      ${on('experience') && experience.length ? `
      <section class="pg-card pg-half pg-anchor" id="experience" ${!(on('education') && education.length) ? 'style="grid-column:span 12"' : ''}>
        <div class="pg-kicker">Experience</div>
        <h2 class="pg-h2">Work History</h2>
        <div class="pg-list">
          ${experience.map(e => `
          <div class="pg-list-item">
            <div class="pg-list-top">
              <div class="pg-list-title">${esc(e.role || e.title || 'Engineer')}</div>
              ${e.period ? `<span class="pg-list-date">${esc(e.period)}</span>` : ''}
            </div>
            ${e.company ? `<div class="pg-list-sub">${esc(e.company)}</div>` : ''}
            ${e.description ? `<p class="pg-list-desc">${esc(e.description)}</p>` : ''}
          </div>`).join('')}
        </div>
      </section>` : ''}

      ${on('education') && education.length ? `
      <section class="pg-card pg-half pg-anchor" id="education" ${!(on('experience') && experience.length) ? 'style="grid-column:span 12"' : ''}>
        <div class="pg-kicker">Education</div>
        <h2 class="pg-h2">Academic Background</h2>
        <div class="pg-list">
          ${education.map(e => `
          <div class="pg-list-item">
            <div class="pg-list-top">
              <div class="pg-list-title">${esc(e.degree || 'Degree')}</div>
              ${(e.year || e.period) ? `<span class="pg-list-date">${esc(e.year || e.period)}</span>` : ''}
            </div>
            ${e.school ? `<div class="pg-list-sub">${esc(e.school)}</div>` : ''}
            ${e.description ? `<p class="pg-list-desc">${esc(e.description)}</p>` : ''}
          </div>`).join('')}
        </div>
      </section>` : ''}

      ${achievements.length ? `
      <section class="pg-card pg-full pg-anchor" id="achievements">
        <div class="pg-kicker">Highlights</div>
        <h2 class="pg-h2">Achievements</h2>
        <div class="pg-list">
          ${achievements.map(a => `
          <div class="pg-list-item">
            <div class="pg-list-title">${esc(typeof a === 'object' ? (a.title || a.name || '') : a)}</div>
            ${typeof a === 'object' && a.description ? `<p class="pg-list-desc">${esc(a.description)}</p>` : ''}
          </div>`).join('')}
        </div>
      </section>` : ''}

      ${on('contact') ? `
      <section class="pg-card pg-contact-card pg-anchor" id="contact">
        <div>
          <div class="pg-kicker">Contact</div>
          <h2 class="pg-h2" style="font-size:1.85rem">Let's Connect</h2>
          <p class="pg-bio" style="margin-bottom:1.25rem">Interested in working together or discussing an engineering challenge? Drop a note below.</p>
          <div class="pg-social-chips" style="justify-content:flex-start">
            ${profile.email ? `<a href="mailto:${esc(profile.email)}" class="pg-social-chip">✉ ${esc(profile.email)}</a>` : ''}
            ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="pg-social-chip" target="_blank" rel="noopener">📄 Resume ↗</a>` : ''}
            ${socials.map(s => `<a href="${esc(s.href)}" class="pg-social-chip" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}
          </div>
        </div>
        <div class="pg-form-card">
          <form onsubmit="event.preventDefault(); alert('Message sent!'); this.reset();">
            <input type="text" class="pg-input" required placeholder="Your Name"/>
            <input type="email" class="pg-input" required placeholder="Your Email"/>
            <textarea class="pg-textarea" required placeholder="Your message..."></textarea>
            <button type="submit" class="pg-submit">Send Message →</button>
          </form>
        </div>
      </section>` : ''}

    </div>
  </main>

  <footer class="pg-footer">
    <p>${esc(profile.name || 'Developer')} · Pixel Grid Portfolio · © ${year}</p>
  </footer>
</body>
</html>`;
  },
};
