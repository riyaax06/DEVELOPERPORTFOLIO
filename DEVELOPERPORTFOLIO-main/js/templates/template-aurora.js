/**
 * template-aurora.js — Aurora Template (Premium Edition)
 * Dark Navy (#0B1020), Purple (#8b5cf6) & Electric Blue (#00d4ff) Gradients,
 * Glassmorphism cards, glowing ambient effects, and zero-overlap responsive layout.
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
    const customCss = config.customCss       || '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0"/>
  <title>${esc(profile.name || 'Portfolio')} — Software Engineer & Builder</title>
  <meta name="description" content="${esc(profile.bio?.slice(0, 160) || 'Developer Portfolio and Case Studies')}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    /* ── Reset & Box Sizing ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: ${primary};
      --secondary: ${secondary};
      --gradient: linear-gradient(135deg, ${primary} 0%, ${secondary} 100%);
      --gradient-card: linear-gradient(145deg, rgba(22, 33, 64, 0.75) 0%, rgba(12, 18, 38, 0.85) 100%);
      --glass-bg: rgba(16, 24, 48, 0.72);
      --glass-border: rgba(139, 92, 246, 0.22);
      --glass-blur: blur(20px);
      --glow-border: 0 0 20px rgba(139, 92, 246, 0.25), 0 0 40px rgba(0, 212, 255, 0.12);
      --font: '${font}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    html { scroll-behavior: smooth; font-size: 16px; }
    body {
      font-family: var(--font);
      background-color: #0B1020;
      color: #f8fafc;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      width: 100%;
      min-height: 100vh;
      position: relative;
    }
    a { color: var(--secondary); text-decoration: none; transition: all 200ms ease; }
    a:hover { color: #ffffff; }
    img { display: block; max-width: 100%; height: auto; }
    ul { list-style: none; }
    button, input, textarea { font-family: inherit; }

    /* ── Ambient Radial Mesh Glows ── */
    .ambient-glow-top {
      position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
      width: min(900px, 100vw); height: 500px; border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, rgba(0, 212, 255, 0.12) 45%, transparent 70%);
      pointer-events: none; filter: blur(75px); z-index: 0;
    }
    .ambient-glow-mid {
      position: absolute; top: 1200px; right: -100px;
      width: min(700px, 90vw); height: 600px; border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%);
      pointer-events: none; filter: blur(85px); z-index: 0;
    }
    .ambient-glow-bottom {
      position: absolute; bottom: 300px; left: -100px;
      width: min(750px, 90vw); height: 650px; border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.09) 50%, transparent 70%);
      pointer-events: none; filter: blur(80px); z-index: 0;
    }

    /* ── Navigation (Guaranteed Zero Overlap) ── */
    nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 1000;
      background: rgba(11, 16, 32, 0.88);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0 1.5rem;
      transition: background 200ms ease;
    }
    .nav-inner {
      max-width: 1140px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      height: 70px;
      gap: 1rem;
    }
    .nav-logo {
      font-size: 1.2rem; font-weight: 800;
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.02em;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .nav-right-group {
      display: flex; align-items: center; gap: 1.5rem;
      min-width: 0;
    }
    .nav-links {
      display: flex; gap: 1.5rem; align-items: center;
      white-space: nowrap;
    }
    .nav-links a {
      font-size: 0.875rem; font-weight: 500; color: #94a3b8;
      position: relative; padding: 4px 0;
    }
    .nav-links a:hover { color: #f8fafc; }
    .nav-links a::after {
      content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px;
      background: var(--gradient); transition: width 200ms ease; border-radius: 1px;
    }
    .nav-links a:hover::after { width: 100%; }

    .nav-resume-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 7px 16px; border-radius: 8px;
      background: rgba(139, 92, 246, 0.15);
      border: 1px solid rgba(139, 92, 246, 0.35);
      color: #c084fc; font-size: 0.8125rem; font-weight: 600;
      white-space: nowrap; flex-shrink: 0;
      transition: all 200ms;
    }
    .nav-resume-btn:hover {
      background: rgba(139, 92, 246, 0.3);
      border-color: var(--secondary);
      color: #ffffff;
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
      transform: translateY(-1px);
    }

    /* ── Sections Common & Scroll Margins ── */
    section {
      padding: 5.5rem 1.5rem;
      position: relative; z-index: 1;
      scroll-margin-top: 85px;
      max-width: 100%;
    }
    .section-inner {
      max-width: 1140px; margin: 0 auto;
    }
    .section-label {
      font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--secondary);
      margin-bottom: 0.75rem;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .section-label::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%;
      background: var(--secondary); box-shadow: 0 0 8px var(--secondary);
    }
    .section-title {
      font-size: clamp(2rem, 4vw, 2.75rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.75rem;
      color: #f8fafc;
      line-height: 1.2;
    }
    .section-subtitle {
      font-size: 1rem; color: #94a3b8; max-width: 620px;
      margin-bottom: 3rem; line-height: 1.7;
    }

    /* ── Hero Section (Guaranteed Non-Colliding) ── */
    .hero {
      min-height: calc(100vh - 70px);
      display: flex; align-items: center;
      padding-top: calc(70px + 3rem);
      padding-bottom: 4.5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      position: relative; z-index: 1;
      scroll-margin-top: 0;
    }
    .hero-inner {
      max-width: 1140px; margin: 0 auto; width: 100%;
      display: grid; grid-template-columns: 1.2fr 0.8fr;
      gap: 3.5rem; align-items: center;
    }
    .hero-content {
      display: flex; flex-direction: column;
      align-items: flex-start;
      min-width: 0;
    }
    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--secondary);
      background: rgba(0, 212, 255, 0.1);
      border: 1px solid rgba(0, 212, 255, 0.25);
      padding: 6px 16px; border-radius: 999px;
      margin-bottom: 1.25rem;
      max-width: 100%;
      white-space: normal;
    }
    .hero-eyebrow::before {
      content: ''; width: 7px; height: 7px; border-radius: 50%;
      background: var(--secondary); box-shadow: 0 0 8px var(--secondary);
      flex-shrink: 0;
    }
    .hero-name {
      font-size: clamp(2.4rem, 5.5vw, 4.2rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 0.75rem;
      color: #f8fafc;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    .hero-title {
      font-size: clamp(1.15rem, 2.5vw, 1.55rem);
      font-weight: 500;
      color: #94a3b8;
      margin-bottom: 1.25rem;
      line-height: 1.4;
      overflow-wrap: break-word;
    }
    .hero-title span {
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
    }
    .hero-bio {
      font-size: 1.05rem;
      color: #94a3b8;
      max-width: 580px;
      line-height: 1.8;
      margin-bottom: 2rem;
      overflow-wrap: break-word;
    }
    .hero-actions {
      display: flex; gap: 0.85rem; flex-wrap: wrap;
      margin-bottom: 2rem; width: 100%;
    }
    .btn-hero-primary {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      padding: 13px 26px; border-radius: 10px;
      background: var(--gradient);
      color: white; font-weight: 600; font-size: 0.9375rem;
      box-shadow: 0 8px 25px rgba(139, 92, 246, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.18);
      transition: all 200ms;
      min-height: 48px;
      white-space: nowrap;
    }
    .btn-hero-primary:hover {
      color: white; transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(0, 212, 255, 0.4);
    }
    .btn-hero-secondary {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      padding: 13px 24px; border-radius: 10px;
      background: rgba(22, 33, 64, 0.65);
      border: 1px solid rgba(139, 92, 246, 0.25);
      color: #e2e8f0; font-weight: 500; font-size: 0.9375rem;
      transition: all 200ms;
      min-height: 48px;
      white-space: nowrap;
    }
    .btn-hero-secondary:hover {
      background: rgba(30, 45, 90, 0.8);
      border-color: var(--secondary);
      color: white;
      transform: translateY(-2px);
    }
    .btn-hero-resume {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      padding: 13px 24px; border-radius: 10px;
      background: rgba(0, 212, 255, 0.1);
      border: 1px solid rgba(0, 212, 255, 0.35);
      color: #38bdf8; font-weight: 600; font-size: 0.9375rem;
      transition: all 200ms;
      min-height: 48px;
      white-space: nowrap;
    }
    .btn-hero-resume:hover {
      background: rgba(0, 212, 255, 0.2);
      border-color: var(--secondary);
      color: #ffffff;
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
      transform: translateY(-2px);
    }

    .hero-social { display: flex; gap: 0.75rem; flex-wrap: wrap; }
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

    .hero-avatar-wrap {
      position: relative; flex-shrink: 0;
      display: flex; justify-content: center; align-items: center;
    }
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

    /* ── Skills Section ── */
    .skills-grid {
      display: flex; flex-wrap: wrap; gap: 0.85rem;
    }
    .skill-badge {
      padding: 10px 20px; border-radius: 999px;
      background: rgba(16, 24, 48, 0.72);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(139, 92, 246, 0.25);
      color: #cbd5e1;
      font-size: 0.9rem; font-weight: 500;
      transition: all 200ms;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .skill-badge:hover {
      background: rgba(30, 45, 90, 0.85);
      border-color: var(--secondary);
      color: #ffffff;
      box-shadow: 0 0 18px rgba(0, 212, 255, 0.3);
      transform: translateY(-2px);
    }

    /* ── Projects & Case Studies (Zero Card Overflow) ── */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 350px), 1fr));
      gap: 2rem;
    }
    .project-card {
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      border-radius: 24px;
      overflow: hidden;
      display: flex; flex-direction: column;
      box-shadow: 0 15px 40px rgba(0,0,0,0.5);
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      min-width: 0;
    }
    .project-card:hover {
      border-color: rgba(0, 212, 255, 0.45);
      box-shadow: 0 20px 60px rgba(0,0,0,0.7), var(--glow-border);
      transform: translateY(-6px);
    }
    .project-thumb {
      height: 210px; width: 100%; overflow: hidden;
      background: linear-gradient(135deg, #131c36, #0e1529);
      display: flex; align-items: center; justify-content: center;
      font-size: 3.5rem; font-weight: 800; color: rgba(255,255,255,0.15);
      position: relative;
    }
    .project-thumb img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 400ms ease;
    }
    .project-card:hover .project-thumb img {
      transform: scale(1.04);
    }
    .project-body {
      padding: 1.75rem; flex: 1; display: flex; flex-direction: column;
      min-width: 0;
    }
    .project-featured-badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 0.6875rem; font-weight: 700;
      padding: 4px 12px; border-radius: 999px;
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3);
      margin-bottom: 0.85rem; width: fit-content;
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    .project-title {
      font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;
      color: #f8fafc; overflow-wrap: break-word;
    }
    .project-tagline {
      font-size: 0.9rem; color: #94a3b8; margin-bottom: 1.25rem;
      line-height: 1.6; overflow-wrap: break-word;
    }
    .project-tech {
      display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.5rem;
    }
    .tech-badge {
      padding: 4px 10px; border-radius: 6px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      font-size: 0.75rem; font-weight: 500; color: #cbd5e1;
    }

    /* Case Study Structured Box */
    .case-study-section {
      background: rgba(11, 16, 32, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
      min-width: 0;
    }
    .case-study-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
      gap: 1rem; margin-bottom: 1rem;
    }
    .case-block {
      background: rgba(255, 255, 255, 0.02);
      border-radius: 10px; padding: 0.85rem;
      min-width: 0;
    }
    .case-block h4 {
      font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--secondary); margin-bottom: 0.4rem;
    }
    .case-block p {
      font-size: 0.8125rem; color: #94a3b8; line-height: 1.6;
      overflow-wrap: break-word;
    }
    .feature-list {
      list-style: none; display: flex; flex-direction: column; gap: 0.4rem;
    }
    .feature-list li {
      display: flex; align-items: flex-start; gap: 8px;
      font-size: 0.8125rem; color: #cbd5e1; line-height: 1.5;
      overflow-wrap: break-word;
    }
    .feature-list li::before {
      content: '✓'; color: #10b981; flex-shrink: 0; font-weight: bold;
    }

    .case-impact-box {
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 10px; padding: 0.85rem; margin-top: 0.75rem;
      min-width: 0;
    }
    .case-impact-box h4 {
      font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.08em; color: #34d399; margin-bottom: 0.3rem;
    }
    .case-impact-box p {
      font-size: 0.8125rem; color: #d1fae5; line-height: 1.5;
      overflow-wrap: break-word;
    }

    .project-links {
      display: flex; gap: 0.75rem; margin-top: auto; flex-wrap: wrap;
    }
    .project-link {
      display: inline-flex; align-items: center; justify-content: center; gap: 6px;
      padding: 9px 18px; border-radius: 8px;
      font-size: 0.8125rem; font-weight: 600;
      transition: all 200ms;
      min-height: 38px;
    }
    .project-link.primary {
      background: var(--gradient); color: white;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .project-link.primary:hover {
      opacity: 0.92; box-shadow: 0 0 16px rgba(0, 212, 255, 0.3);
      color: white;
    }
    .project-link.ghost {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #94a3b8;
    }
    .project-link.ghost:hover {
      background: rgba(255, 255, 255, 0.1); color: #f8fafc;
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* ── Work Experience & Education ── */
    .timeline-grid { display: flex; flex-direction: column; gap: 1.25rem; }
    .timeline-card {
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      border-radius: 18px; padding: 1.5rem 1.75rem;
      display: flex; align-items: flex-start; gap: 1.5rem;
      transition: all 200ms;
    }
    .timeline-card:hover {
      border-color: var(--secondary); transform: translateX(4px);
    }
    .timeline-icon {
      width: 48px; height: 48px; border-radius: 14px;
      background: var(--gradient);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem; flex-shrink: 0; color: white;
      box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
    }
    .timeline-role {
      font-weight: 700; font-size: 1.05rem; color: #f8fafc;
      margin-bottom: 0.25rem; overflow-wrap: break-word;
    }
    .timeline-meta {
      color: var(--secondary); font-size: 0.875rem; font-weight: 500;
      margin-bottom: 0.5rem; overflow-wrap: break-word;
    }
    .timeline-desc {
      font-size: 0.875rem; color: #94a3b8; line-height: 1.6;
      overflow-wrap: break-word;
    }

    /* ── Contact Section ── */
    .contact-wrapper {
      background: linear-gradient(145deg, rgba(22, 33, 64, 0.75) 0%, rgba(12, 18, 38, 0.85) 100%);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      border-radius: 28px; padding: 4rem 2.5rem;
      display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem;
      box-shadow: var(--glow-border);
      min-width: 0;
    }
    .contact-info-col h3 {
      font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; color: #f8fafc;
      margin-bottom: 1rem; line-height: 1.2;
    }
    .contact-info-col p {
      font-size: 1rem; color: #94a3b8; line-height: 1.7;
      margin-bottom: 2rem; overflow-wrap: break-word;
    }
    .contact-status-chip {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 14px; border-radius: 999px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399; font-size: 0.8125rem; font-weight: 600;
      margin-bottom: 2rem;
    }
    .contact-status-chip::before {
      content: ''; width: 7px; height: 7px; border-radius: 50%;
      background: #10b981; box-shadow: 0 0 8px #10b981;
    }
    .contact-social-chips { display: flex; flex-direction: column; gap: 0.85rem; }
    .contact-chip-link {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 18px; border-radius: 12px;
      background: rgba(16, 24, 48, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #cbd5e1; font-size: 0.9rem; font-weight: 500;
      transition: all 200ms;
      overflow-wrap: anywhere;
    }
    .contact-chip-link:hover {
      background: rgba(30, 45, 90, 0.8);
      border-color: var(--secondary);
      color: #ffffff;
      transform: translateX(4px);
    }

    .contact-form-col {
      background: rgba(11, 16, 32, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px; padding: 2rem;
      display: flex; flex-direction: column; gap: 1.25rem;
      min-width: 0;
    }
    .cf-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .cf-label { font-size: 0.8125rem; font-weight: 600; color: #94a3b8; }
    .cf-input, .cf-textarea {
      width: 100%;
      background: rgba(16, 24, 48, 0.7);
      border: 1px solid rgba(139, 92, 246, 0.25);
      border-radius: 10px; padding: 12px 16px;
      font-size: 0.875rem; color: #f8fafc;
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
      min-height: 48px;
    }
    .cf-submit-btn:hover {
      box-shadow: 0 6px 28px rgba(0, 212, 255, 0.45);
      transform: translateY(-2px);
    }

    /* ── Footer ── */
    footer {
      text-align: center; padding: 3rem 1.5rem; font-size: 0.8125rem;
      color: #64748b; border-top: 1px solid rgba(255, 255, 255, 0.06);
      position: relative; z-index: 1;
    }

    /* ── Responsive Viewport Rules (Zero Overlap Guaranteed) ── */
    @media (max-width: 900px) {
      .hero {
        padding-top: calc(70px + 2rem);
        padding-bottom: 3.5rem;
      }
      .hero-inner {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2.5rem;
      }
      .hero-content {
        align-items: center;
      }
      .hero-avatar-wrap {
        order: -1;
      }
      .hero-avatar, .hero-avatar-placeholder {
        width: 180px; height: 180px;
        font-size: 3.5rem;
      }
      .hero-actions { justify-content: center; }
      .hero-social { justify-content: center; }
      .contact-wrapper {
        grid-template-columns: 1fr;
        padding: 2.5rem 1.5rem;
        gap: 2.5rem;
      }
      .nav-links { display: none; }
    }

    @media (max-width: 640px) {
      nav { padding: 0 1rem; }
      .nav-inner { height: 62px; }
      .nav-logo { font-size: 1.05rem; }
      .hero {
        padding-top: calc(62px + 1.5rem);
        padding-bottom: 3rem;
      }
      .hero-avatar, .hero-avatar-placeholder {
        width: 140px; height: 140px;
        font-size: 3rem;
        border-radius: 28px;
      }
      .hero-actions {
        flex-direction: column;
        width: 100%;
      }
      .hero-actions a {
        width: 100%;
      }
      .project-links {
        flex-direction: column;
      }
      .project-link {
        width: 100%;
      }
      .case-study-grid {
        grid-template-columns: 1fr;
      }
      .contact-wrapper {
        padding: 2rem 1.25rem;
        border-radius: 20px;
      }
      .contact-form-col {
        padding: 1.25rem;
      }
    }

    @media (max-width: 380px) {
      .hero-name { font-size: 2rem; }
      .hero-avatar, .hero-avatar-placeholder {
        width: 110px; height: 110px;
        font-size: 2.2rem;
        border-radius: 20px;
      }
      .hero-eyebrow { font-size: 0.7rem; padding: 4px 10px; }
      .timeline-card { padding: 1.25rem 1rem; gap: 1rem; }
      .timeline-icon { width: 40px; height: 40px; font-size: 1.1rem; }
    }

    /* Injected Custom CSS from Live Editor */
    ${customCss}
  </style>
</head>
<body>

  <!-- Ambient Glows -->
  <div class="ambient-glow-top"></div>
  <div class="ambient-glow-mid"></div>
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
      <p class="section-subtitle">Core languages, cloud platforms, and architecture patterns verified in production environments.</p>

      <div class="skills-grid">
        ${profile.skills.map(s => {
          const name = typeof s === 'object' ? s.name : s;
          const level = typeof s === 'object' && s.level ? ` (${s.level}%)` : '';
          return `<div class="skill-badge">${esc(name)}${level}</div>`;
        }).join('')}
      </div>
    </div>
  </section>` : ''}

  <!-- Projects Section (Case Studies) -->
  ${show.projects !== false && projects.length ? `
  <section id="projects">
    <div class="section-inner">
      <div class="section-label">Engineering Case Studies</div>
      <h2 class="section-title">Featured Projects</h2>
      <p class="section-subtitle">Deep architectural breakdowns highlighting problem statements, system tradeoffs, and measurable production impact.</p>

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
      <p class="section-subtitle">Track record of engineering impact, systems architecture, and leadership.</p>

      <div class="timeline-grid">
        ${profile.experience.map(e => `
        <div class="timeline-card">
          <div class="timeline-icon">💼</div>
          <div style="flex:1;min-width:0">
            <div class="timeline-role">${esc(e.role || e.title || 'Software Engineer')}</div>
            <div class="timeline-meta">${esc(e.company || '')} ${e.period ? `· ${esc(e.period)}` : ''}</div>
            <div class="timeline-desc">${esc(e.description || '')}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <!-- Education Section -->
  ${show.education !== false && profile.education?.length ? `
  <section id="education">
    <div class="section-inner">
      <div class="section-label">Credentials</div>
      <h2 class="section-title">Education &amp; Background</h2>

      <div class="timeline-grid">
        ${profile.education.map(e => `
        <div class="timeline-card">
          <div class="timeline-icon" style="background:linear-gradient(135deg,#00d4ff,#3b82f6)">🎓</div>
          <div style="flex:1;min-width:0">
            <div class="timeline-role">${esc(e.degree || 'Degree')}</div>
            <div class="timeline-meta">${esc(e.school || '')} ${e.year ? `· ${esc(e.year)}` : ''}</div>
            <div class="timeline-desc">${esc(e.description || '')}</div>
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
          <div class="contact-status-chip">Open to Opportunities</div>
          <h3>Let's Build Something Exceptional</h3>
          <p>
            ${esc(profile.bio || 'Currently exploring staff engineering roles, distributed systems challenges, and advisory consulting.')}
          </p>

          <div class="contact-social-chips">
            ${profile.email ? `
            <a href="mailto:${esc(profile.email)}" class="contact-chip-link">
              <span>✉</span>
              <span>${esc(profile.email)}</span>
            </a>` : ''}
            ${resumeUrl ? `
            <a href="${esc(resumeUrl)}" class="contact-chip-link" target="_blank" rel="noopener">
              <span>📄</span>
              <span>Download Full Resume (PDF)</span>
            </a>` : ''}
            ${profile.location ? `
            <div class="contact-chip-link" style="cursor:default">
              <span>📍</span>
              <span>${esc(profile.location)}</span>
            </div>` : ''}
            ${profile.social?.github ? `
            <a href="${esc(profile.social.github)}" class="contact-chip-link" target="_blank" rel="noopener">
              <span>🐙</span>
              <span>GitHub / ${esc(profile.social.github.split('/').pop())}</span>
            </a>` : ''}
            ${profile.social?.linkedin ? `
            <a href="${esc(profile.social.linkedin)}" class="contact-chip-link" target="_blank" rel="noopener">
              <span>💼</span>
              <span>LinkedIn Profile</span>
            </a>` : ''}
          </div>
        </div>

        <div class="contact-form-col">
          <h4 style="font-size:1.15rem;font-weight:700;color:#f8fafc;margin-bottom:0.25rem">Get in Touch</h4>
          <p style="font-size:0.85rem;color:#94a3b8;margin-bottom:1rem">Leave a message and I'll respond within 24 hours.</p>

          <form onsubmit="event.preventDefault(); alert('Thank you! Your message has been received.'); this.reset();">
            <div class="cf-group" style="margin-bottom:1rem">
              <label class="cf-label">Your Name <span style="color:#f43f5e">*</span></label>
              <input type="text" class="cf-input" required placeholder="Alex Johnson" />
            </div>
            <div class="cf-group" style="margin-bottom:1rem">
              <label class="cf-label">Email Address <span style="color:#f43f5e">*</span></label>
              <input type="email" class="cf-input" required placeholder="alex@company.com" />
            </div>
            <div class="cf-group" style="margin-bottom:1.25rem">
              <label class="cf-label">Message <span style="color:#f43f5e">*</span></label>
              <textarea class="cf-textarea" required placeholder="Hi, let's discuss an engineering project..."></textarea>
            </div>
            <button type="submit" class="cf-submit-btn" style="width:100%">Send Message →</button>
          </form>
        </div>
      </div>
    </div>
  </section>` : ''}

  <!-- Footer -->
  <footer>
    <p>Crafted with DevPortfolio Builder · <strong>${esc(profile.name || 'Developer')}</strong> © ${new Date().getFullYear()}</p>
  </footer>

</body>
</html>`;
  },
};

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
