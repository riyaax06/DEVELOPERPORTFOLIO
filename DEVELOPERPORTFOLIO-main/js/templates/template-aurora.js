/**
 * template-aurora.js — Aurora Template
 * Dark Navy (#0B1020) with Purple & Electric Blue Gradients & Glassmorphism
 */
window.TemplateAurora = {
  name: 'Aurora',
  id: 'aurora',
  description: 'Dark navy (#0B1020), purple & electric blue gradients, glassmorphism & subtle glowing borders',

  render(profile, projects, config = {}) {
    const primary   = config.primaryColor   || '#8b5cf6';
    const secondary = config.secondaryColor || '#00d4ff';
    const font      = config.fontFamily     || 'Inter';
    const show      = config.showSections   || {};
    const resumeUrl = profile.resumeUrl     || '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${esc(profile.name || 'Portfolio')} — Software Engineer & Builder</title>
  <meta name="description" content="${esc(profile.bio?.slice(0,160) || 'Developer Portfolio and Case Studies')}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: ${primary};
      --secondary: ${secondary};
      --gradient: linear-gradient(135deg, ${primary} 0%, ${secondary} 100%);
      --gradient-card: linear-gradient(145deg, rgba(22, 33, 64, 0.75) 0%, rgba(12, 18, 38, 0.85) 100%);
      --glass-bg: rgba(16, 24, 48, 0.72);
      --glass-border: rgba(139, 92, 246, 0.22);
      --glow-border: 0 0 20px rgba(139, 92, 246, 0.25), 0 0 40px rgba(0, 212, 255, 0.12);
      --font: '${font}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--font);
      background-color: #0B1020;
      color: #f8fafc;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      position: relative;
    }
    a { color: var(--secondary); text-decoration: none; transition: all 200ms; }
    a:hover { color: #f8fafc; }
    img { display: block; max-width: 100%; }
    ul { list-style: none; }

    /* ── Ambient Radial Glows ── */
    .ambient-glow-top {
      position: absolute; top: -150px; left: 50%; transform: translateX(-50%);
      width: 800px; height: 500px; border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(0, 212, 255, 0.1) 45%, transparent 70%);
      pointer-events: none; filter: blur(70px); z-index: 0;
    }
    .ambient-glow-bottom {
      position: absolute; bottom: 400px; right: -100px;
      width: 600px; height: 600px; border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%);
      pointer-events: none; filter: blur(80px); z-index: 0;
    }

    /* ── Navigation ── */
    nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 100;
      background: rgba(11, 16, 32, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0 2rem;
    }
    .nav-inner {
      max-width: 1140px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      height: 70px;
    }
    .nav-logo {
      font-size: 1.15rem; font-weight: 800;
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.02em;
    }
    .nav-right-group {
      display: flex; align-items: center; gap: 2rem;
    }
    .nav-links { display: flex; gap: 1.75rem; }
    .nav-links a { font-size: 0.875rem; font-weight: 500; color: #94a3b8; }
    .nav-links a:hover { color: #f8fafc; }
    .nav-resume-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 7px 16px; border-radius: 8px;
      background: rgba(139, 92, 246, 0.15);
      border: 1px solid rgba(139, 92, 246, 0.35);
      color: #c084fc; font-size: 0.8125rem; font-weight: 600;
      transition: all 200ms;
    }
    .nav-resume-btn:hover {
      background: rgba(139, 92, 246, 0.3);
      border-color: var(--secondary);
      color: #ffffff;
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
    }

    /* ── Hero ── */
    .hero {
      min-height: 94vh;
      display: flex; align-items: center;
      padding: 120px 2rem 5rem;
      position: relative; z-index: 1;
    }
    .hero-inner {
      max-width: 1140px; margin: 0 auto; width: 100%;
      display: grid; grid-template-columns: 1fr auto;
      gap: 4rem; align-items: center;
    }
    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--secondary);
      background: rgba(0, 212, 255, 0.1);
      border: 1px solid rgba(0, 212, 255, 0.25);
      padding: 6px 16px; border-radius: 999px;
      margin-bottom: 1.5rem;
    }
    .hero-eyebrow::before {
      content: ''; width: 7px; height: 7px; border-radius: 50%;
      background: var(--secondary); box-shadow: 0 0 8px var(--secondary);
    }
    .hero-name {
      font-size: clamp(2.6rem, 6vw, 4.2rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 0.75rem;
      color: #f8fafc;
    }
    .hero-title {
      font-size: clamp(1.2rem, 3vw, 1.6rem);
      font-weight: 500;
      color: #94a3b8;
      margin-bottom: 1.5rem;
    }
    .hero-title span { color: var(--secondary); }
    .hero-bio {
      font-size: 1.05rem;
      color: #94a3b8;
      max-width: 580px;
      line-height: 1.8;
      margin-bottom: 2rem;
    }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
    .btn-hero-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 26px; border-radius: 10px;
      background: var(--gradient);
      color: white; font-weight: 600; font-size: 0.9375rem;
      box-shadow: 0 8px 25px rgba(139, 92, 246, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.18);
      transition: all 200ms;
    }
    .btn-hero-primary:hover { color: white; transform: translateY(-2px); box-shadow: 0 12px 35px rgba(0, 212, 255, 0.4); }
    .btn-hero-secondary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 26px; border-radius: 10px;
      background: rgba(22, 33, 64, 0.65);
      border: 1px solid rgba(139, 92, 246, 0.25);
      color: #e2e8f0; font-weight: 500; font-size: 0.9375rem;
      transition: all 200ms;
    }
    .btn-hero-secondary:hover { background: rgba(30, 45, 90, 0.8); border-color: var(--secondary); color: white; }
    .btn-hero-resume {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 24px; border-radius: 10px;
      background: rgba(0, 212, 255, 0.1);
      border: 1px solid rgba(0, 212, 255, 0.3);
      color: #38bdf8; font-weight: 600; font-size: 0.9375rem;
      transition: all 200ms;
    }
    .btn-hero-resume:hover { background: rgba(0, 212, 255, 0.2); border-color: var(--secondary); color: #ffffff; box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }

    .hero-social { display: flex; gap: 0.85rem; }
    .hero-social a {
      width: 42px; height: 42px; border-radius: 10px;
      background: rgba(16, 24, 48, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      display: flex; align-items: center; justify-content: center;
      color: #94a3b8; font-size: 0.875rem; font-weight: 600;
      transition: all 200ms;
    }
    .hero-social a:hover {
      background: var(--primary); border-color: var(--secondary); color: white;
      box-shadow: 0 0 16px rgba(139, 92, 246, 0.4);
      transform: translateY(-2px);
    }

    .hero-avatar-wrap { position: relative; flex-shrink: 0; }
    .hero-avatar {
      width: 250px; height: 250px; border-radius: 36px;
      border: 2px solid rgba(139, 92, 246, 0.35);
      object-fit: cover;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6), var(--glow-border);
    }
    .hero-avatar-placeholder {
      width: 250px; height: 250px; border-radius: 36px;
      background: var(--gradient);
      display: flex; align-items: center; justify-content: center;
      font-size: 5rem; font-weight: 800; color: white;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6), var(--glow-border);
    }

    /* ── Sections Common ── */
    section { padding: 5.5rem 2rem; position: relative; z-index: 1; }
    .section-inner { max-width: 1140px; margin: 0 auto; }
    .section-label {
      font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--secondary);
      margin-bottom: 0.75rem;
    }
    .section-title {
      font-size: clamp(2rem, 4vw, 2.75rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      color: #f8fafc;
    }
    .section-subtitle {
      font-size: 1rem; color: #94a3b8; max-width: 580px; margin-bottom: 3.5rem; line-height: 1.7;
    }

    /* ── Skills Section ── */
    .skills-grid { display: flex; flex-wrap: wrap; gap: 0.85rem; }
    .skill-badge {
      padding: 10px 20px; border-radius: 999px;
      background: rgba(16, 24, 48, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(139, 92, 246, 0.25);
      color: #cbd5e1;
      font-size: 0.9rem; font-weight: 500;
      transition: all 200ms;
    }
    .skill-badge:hover {
      background: rgba(30, 45, 90, 0.8);
      border-color: var(--secondary);
      color: #ffffff;
      box-shadow: 0 0 18px rgba(0, 212, 255, 0.3);
      transform: translateY(-2px);
    }

    /* ── Projects & Case Studies ── */
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 2rem; }
    .project-card {
      background: var(--glass-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--glass-border);
      border-radius: 24px;
      overflow: hidden;
      display: flex; flex-direction: column;
      box-shadow: 0 15px 40px rgba(0,0,0,0.5);
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .project-card:hover {
      border-color: rgba(0, 212, 255, 0.45);
      box-shadow: 0 20px 60px rgba(0,0,0,0.7), var(--glow-border);
      transform: translateY(-6px);
    }
    .project-thumb {
      height: 210px; overflow: hidden;
      background: linear-gradient(135deg, #131c36, #0e1529);
      display: flex; align-items: center; justify-content: center;
      font-size: 3.5rem; font-weight: 800; color: rgba(255,255,255,0.15);
      position: relative;
    }
    .project-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .project-body { padding: 1.75rem; flex: 1; display: flex; flex-direction: column; }
    .project-featured-badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 0.6875rem; font-weight: 700;
      padding: 4px 12px; border-radius: 999px;
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3);
      margin-bottom: 0.85rem; width: fit-content;
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    .project-title { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: #f8fafc; }
    .project-tagline { font-size: 0.9rem; color: #94a3b8; margin-bottom: 1.25rem; line-height: 1.6; }
    .project-tech { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.5rem; }
    .tech-badge {
      padding: 4px 10px; border-radius: 6px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      font-size: 0.75rem; font-weight: 500; color: #cbd5e1;
    }

    /* Case Study Expanded Block */
    .case-study-section {
      background: rgba(11, 16, 32, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
    }
    .case-study-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .case-block { background: rgba(255, 255, 255, 0.02); border-radius: 10px; padding: 0.85rem; }
    .case-block h4 {
      font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--secondary); margin-bottom: 0.4rem;
    }
    .case-block p { font-size: 0.8125rem; color: #94a3b8; line-height: 1.6; }
    .feature-list { list-style: none; display: flex; flex-direction: column; gap: 0.35rem; }
    .feature-list li { display: flex; align-items: flex-start; gap: 6px; font-size: 0.8125rem; color: #cbd5e1; }
    .feature-list li::before { content: '✓'; color: #10b981; flex-shrink: 0; font-weight: bold; }

    .case-impact-box {
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 10px; padding: 0.85rem; margin-top: 0.75rem;
    }
    .case-impact-box h4 { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #34d399; margin-bottom: 0.3rem; }
    .case-impact-box p { font-size: 0.8125rem; color: #d1fae5; line-height: 1.5; }

    .project-links { display: flex; gap: 0.75rem; margin-top: auto; }
    .project-link {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 9px 18px; border-radius: 8px;
      font-size: 0.8125rem; font-weight: 600;
      transition: all 200ms;
    }
    .project-link.primary {
      background: var(--gradient); color: white;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .project-link.primary:hover { opacity: 0.92; box-shadow: 0 0 16px rgba(0, 212, 255, 0.3); }
    .project-link.ghost {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #94a3b8;
    }
    .project-link.ghost:hover { background: rgba(255, 255, 255, 0.1); color: #f8fafc; border-color: rgba(255, 255, 255, 0.2); }

    /* ── Work Experience & Education ── */
    .timeline-grid { display: flex; flex-direction: column; gap: 1.25rem; }
    .timeline-card {
      background: var(--glass-bg);
      backdrop-filter: blur(14px);
      border: 1px solid var(--glass-border);
      border-radius: 18px; padding: 1.5rem 1.75rem;
      display: flex; align-items: flex-start; gap: 1.5rem;
      transition: all 200ms;
    }
    .timeline-card:hover { border-color: var(--secondary); transform: translateX(4px); }
    .timeline-icon {
      width: 48px; height: 48px; border-radius: 14px;
      background: var(--gradient);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem; flex-shrink: 0; color: white;
      box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
    }
    .timeline-role { font-weight: 700; font-size: 1.05rem; color: #f8fafc; margin-bottom: 0.25rem; }
    .timeline-meta { color: var(--secondary); font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; }
    .timeline-desc { font-size: 0.875rem; color: #94a3b8; line-height: 1.6; }

    /* ── Contact Section ── */
    .contact-wrapper {
      background: linear-gradient(145deg, rgba(22, 33, 64, 0.75) 0%, rgba(12, 18, 38, 0.85) 100%);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 28px; padding: 4.5rem 2.5rem;
      display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem;
      box-shadow: var(--glow-border);
    }
    .contact-info-col h3 { font-size: 2rem; font-weight: 800; color: #f8fafc; margin-bottom: 1rem; }
    .contact-info-col p { font-size: 1rem; color: #94a3b8; line-height: 1.7; margin-bottom: 2rem; }
    .contact-status-chip {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 14px; border-radius: 999px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399; font-size: 0.8125rem; font-weight: 600;
      margin-bottom: 2rem;
    }
    .contact-social-chips { display: flex; flex-direction: column; gap: 0.85rem; }
    .contact-chip-link {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 18px; border-radius: 12px;
      background: rgba(16, 24, 48, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #cbd5e1; font-size: 0.9rem; font-weight: 500;
      transition: all 200ms;
    }
    .contact-chip-link:hover {
      background: rgba(30, 45, 90, 0.8);
      border-color: var(--secondary);
      color: #ffffff;
      transform: translateX(4px);
    }

    .contact-form-col {
      background: rgba(11, 16, 32, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px; padding: 2rem;
      display: flex; flex-direction: column; gap: 1.25rem;
    }
    .cf-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .cf-label { font-size: 0.8125rem; font-weight: 600; color: #94a3b8; }
    .cf-input, .cf-textarea {
      width: 100%;
      background: rgba(16, 24, 48, 0.7);
      border: 1px solid rgba(139, 92, 246, 0.25);
      border-radius: 10px; padding: 12px 16px;
      font-size: 0.875rem; color: #f8fafc; font-family: inherit;
      outline: none; transition: border-color 200ms, box-shadow 200ms;
    }
    .cf-input:focus, .cf-textarea:focus {
      border-color: var(--secondary);
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
    }
    .cf-textarea { min-height: 110px; resize: vertical; }
    .cf-submit-btn {
      padding: 13px 24px; border-radius: 10px;
      background: var(--gradient);
      border: none; color: white;
      font-size: 0.9375rem; font-weight: 700;
      cursor: pointer; transition: all 200ms;
      box-shadow: 0 4px 18px rgba(139, 92, 246, 0.35);
    }
    .cf-submit-btn:hover {
      box-shadow: 0 6px 28px rgba(0, 212, 255, 0.45);
      transform: translateY(-2px);
    }

    /* ── Footer ── */
    footer {
      text-align: center; padding: 3rem 2rem; font-size: 0.8125rem;
      color: #64748b; border-top: 1px solid rgba(255, 255, 255, 0.06);
      position: relative; z-index: 1;
    }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .hero-inner { grid-template-columns: 1fr; text-align: center; }
      .hero-avatar-wrap { display: flex; justify-content: center; }
      .hero-actions { justify-content: center; }
      .hero-social { justify-content: center; }
      .contact-wrapper { grid-template-columns: 1fr; padding: 2.5rem 1.5rem; }
      .nav-links { display: none; }
    }
    @media (max-width: 640px) {
      .case-study-grid { grid-template-columns: 1fr; }
      .hero-actions { flex-direction: column; width: 100%; }
      .hero-actions a { width: 100%; justify-content: center; }
    }
  </style>
</head>
<body>

  <!-- Ambient Glows -->
  <div class="ambient-glow-top"></div>
  <div class="ambient-glow-bottom"></div>

  <!-- Navigation -->
  <nav aria-label="Main Navigation">
    <div class="nav-inner">
      <a href="#about" class="nav-logo">${esc(profile.name || 'Portfolio')}</a>
      <div class="nav-right-group">
        <div class="nav-links">
          ${show.about !== false    ? '<a href="#about">About</a>'       : ''}
          ${show.skills !== false   ? '<a href="#skills">Skills</a>'     : ''}
          ${show.projects !== false ? '<a href="#projects">Work &amp; Case Studies</a>' : ''}
          ${show.experience !== false && profile.experience?.length ? '<a href="#experience">Experience</a>' : ''}
          ${show.education !== false && profile.education?.length ? '<a href="#education">Education</a>' : ''}
          ${show.contact !== false  ? '<a href="#contact">Contact</a>'   : ''}
        </div>
        ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="nav-resume-btn" target="_blank" rel="noopener">📄 Resume</a>` : ''}
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  ${show.hero !== false ? `
  <section class="hero" id="about">
    <div class="hero-inner">
      <div class="hero-content">
        <div class="hero-eyebrow">Available for Engineering Opportunities</div>
        <h1 class="hero-name">${esc(profile.name || 'Your Name')}</h1>
        <div class="hero-title">${esc(profile.title || 'Full-Stack Software Engineer')}</div>
        <p class="hero-bio">${esc(profile.bio || 'Architecting scalable cloud systems, high-throughput microservices, and modern web applications.')}</p>

        <div class="hero-actions">
          ${profile.email ? `<a href="mailto:${esc(profile.email)}" class="btn-hero-primary">Get in Touch →</a>` : `<a href="#contact" class="btn-hero-primary">Get in Touch →</a>`}
          ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="btn-hero-resume" target="_blank" rel="noopener">📄 Download Resume</a>` : ''}
          ${profile.social?.github ? `<a href="${esc(profile.social.github)}" class="btn-hero-secondary" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
        </div>

        <div class="hero-social">
          ${profile.social?.github   ? `<a href="${esc(profile.social.github)}" target="_blank" rel="noopener" title="GitHub">GH</a>` : ''}
          ${profile.social?.linkedin ? `<a href="${esc(profile.social.linkedin)}" target="_blank" rel="noopener" title="LinkedIn">LI</a>` : ''}
          ${profile.social?.twitter  ? `<a href="${esc(profile.social.twitter)}" target="_blank" rel="noopener" title="Twitter / X">TW</a>` : ''}
          ${profile.website          ? `<a href="${esc(profile.website)}" target="_blank" rel="noopener" title="Website">🌐</a>` : ''}
        </div>
      </div>

      <div class="hero-avatar-wrap">
        ${profile.avatar
          ? `<img class="hero-avatar" src="${esc(profile.avatar)}" alt="${esc(profile.name)}" onerror="this.parentElement.innerHTML='<div class=\\'hero-avatar-placeholder\\'>${esc((profile.name?.[0]||'?').toUpperCase())}</div>'" />`
          : `<div class="hero-avatar-placeholder">${esc((profile.name?.[0]||'?').toUpperCase())}</div>`}
      </div>
    </div>
  </section>` : ''}

  <!-- Skills Section -->
  ${show.skills !== false && profile.skills?.length ? `
  <section id="skills">
    <div class="section-inner">
      <div class="section-label">Technical Stack</div>
      <h2 class="section-title">Skills &amp; Technologies</h2>
      <p class="section-subtitle">Core programming languages, frameworks, cloud infrastructure, and databases I leverage in production.</p>
      <div class="skills-grid">
        ${profile.skills.map(s => `<span class="skill-badge">${esc(s)}</span>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <!-- Projects & Case Studies -->
  ${show.projects !== false && projects.length ? `
  <section id="projects">
    <div class="section-inner">
      <div class="section-label">Case Studies &amp; Architecture</div>
      <h2 class="section-title">Featured Projects</h2>
      <p class="section-subtitle">Deep dives into system design, technical challenges, and measurable engineering outcomes.</p>

      <div class="projects-grid">
        ${projects.map(p => `
        <div class="project-card">
          <div class="project-thumb">
            ${p.thumbnail ? `<img src="${esc(p.thumbnail)}" alt="${esc(p.title)}" onerror="this.parentElement.textContent='${esc((p.title?.[0]||'?').toUpperCase())}'" />` : esc((p.title?.[0]||'?').toUpperCase())}
          </div>
          <div class="project-body">
            ${p.featured ? `<div class="project-featured-badge">★ Featured Project</div>` : ''}
            <h3 class="project-title">${esc(p.title || 'Untitled Project')}</h3>
            <p class="project-tagline">${esc(p.tagline || '')}</p>

            <div class="project-tech">
              ${(p.technologies || []).map(t => `<span class="tech-badge">${esc(t)}</span>`).join('')}
            </div>

            ${(p.problem || p.solution || (p.features && p.features.length) || p.challenges || p.outcomes) ? `
            <div class="case-study-section">
              ${(p.problem || p.solution) ? `
              <div class="case-study-grid">
                ${p.problem  ? `<div class="case-block"><h4>The Problem</h4><p>${esc(p.problem)}</p></div>` : ''}
                ${p.solution ? `<div class="case-block"><h4>Solution Architecture</h4><p>${esc(p.solution)}</p></div>` : ''}
              </div>` : ''}

              ${p.features && p.features.filter(Boolean).length ? `
              <div class="case-block" style="margin-bottom:0.75rem">
                <h4>Core Implementation Features</h4>
                <ul class="feature-list">
                  ${p.features.filter(Boolean).map(f => typeof f === 'object' ? `<li><strong>${esc(f.title || '')}:</strong> ${esc(f.desc || '')}</li>` : `<li>${esc(f)}</li>`).join('')}
                </ul>
              </div>` : ''}

              ${p.challenges ? `
              <div class="case-block" style="margin-bottom:0.75rem">
                <h4>Engineering Challenges &amp; Trade-offs</h4>
                <p>${esc(p.challenges)}</p>
              </div>` : ''}

              ${p.outcomes ? `
              <div class="case-impact-box">
                <h4>Measurable Outcomes &amp; Impact</h4>
                <p>${esc(p.outcomes)}</p>
              </div>` : ''}
            </div>` : ''}

            <div class="project-links">
              ${p.liveUrl   ? `<a href="${esc(p.liveUrl)}" class="project-link primary" target="_blank" rel="noopener">Live Demo ↗</a>` : ''}
              ${p.githubUrl ? `<a href="${esc(p.githubUrl)}" class="project-link ghost" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <!-- Experience Section -->
  ${show.experience !== false && profile.experience?.length ? `
  <section id="experience">
    <div class="section-inner">
      <div class="section-label">Career Journey</div>
      <h2 class="section-title">Work Experience</h2>
      <p class="section-subtitle">Track record of building and scaling systems at technology companies.</p>

      <div class="timeline-grid">
        ${profile.experience.map(exp => `
        <div class="timeline-card">
          <div class="timeline-icon">💼</div>
          <div>
            <div class="timeline-role">${esc(exp.role || exp.title || 'Engineer')}</div>
            <div class="timeline-meta">${esc(exp.company || '')} ${exp.period ? `· ${esc(exp.period)}` : ''}</div>
            <div class="timeline-desc">${esc(exp.description || '')}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <!-- Education Section -->
  ${show.education !== false && profile.education?.length ? `
  <section id="education">
    <div class="section-inner">
      <div class="section-label">Academic Background</div>
      <h2 class="section-title">Education</h2>
      <div class="timeline-grid">
        ${profile.education.map(edu => `
        <div class="timeline-card">
          <div class="timeline-icon">🎓</div>
          <div>
            <div class="timeline-role">${esc(edu.school || '')}</div>
            <div class="timeline-meta">${esc(edu.degree || '')} ${edu.year ? `· ${esc(edu.year)}` : ''}</div>
            <div class="timeline-desc">${esc(edu.description || '')}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <!-- Contact Section -->
  ${show.contact !== false ? `
  <section id="contact">
    <div class="section-inner">
      <div class="contact-wrapper">
        <div class="contact-info-col">
          <div class="section-label">Let's Connect</div>
          <h3>Start a Conversation</h3>
          <p>
            Whether you have a technical role, contract project, or just want to discuss software architecture, I'd love to connect.
          </p>

          <div class="contact-status-chip">
            <span style="width:7px;height:7px;border-radius:50%;background:#34d399"></span>
            Available for new projects
          </div>

          <div class="contact-social-chips">
            ${profile.email ? `<a href="mailto:${esc(profile.email)}" class="contact-chip-link">✉ ${esc(profile.email)}</a>` : ''}
            ${profile.location ? `<div class="contact-chip-link">📍 ${esc(profile.location)}</div>` : ''}
            ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="contact-chip-link" target="_blank" rel="noopener">📄 Download Full Resume (PDF)</a>` : ''}
          </div>
        </div>

        <form class="contact-form-col" onsubmit="event.preventDefault(); alert('Message sent! Thank you for reaching out.'); this.reset();">
          <div class="cf-group">
            <label class="cf-label">Your Name</label>
            <input type="text" class="cf-input" placeholder="Jane Smith" required />
          </div>
          <div class="cf-group">
            <label class="cf-label">Your Email</label>
            <input type="email" class="cf-input" placeholder="jane@example.com" required />
          </div>
          <div class="cf-group">
            <label class="cf-label">Message</label>
            <textarea class="cf-textarea" placeholder="Hi Alex, I would love to connect about an engineering opportunity..." required></textarea>
          </div>
          <button type="submit" class="cf-submit-btn">Send Message →</button>
        </form>
      </div>
    </div>
  </section>` : ''}

  <footer>
    <p>Built with DevPortfolio Builder · ${esc(profile.name || 'Developer')} © ${new Date().getFullYear()}</p>
  </footer>

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
