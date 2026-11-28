/**
 * template-aether.js — Aether Template
 * Deep midnight navy, purple/violet/electric-blue gradients, split-screen hero,
 * selective glassmorphism, and structured developer case studies.
 * Scoped with .ae-* classes and --ae-* CSS custom properties.
 */
window.TemplateAether = {
  name: 'Aether',
  id: 'aether',
  description: 'Deep midnight navy with split-screen hero, violet & electric-blue gradients, and selective glass cards',

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
    const primary   = safeColor(config.primaryColor, '#8b5cf6');
    const secondary = safeColor(config.secondaryColor, '#38bdf8');
    const font      = String(config.fontFamily || 'Plus Jakarta Sans').replace(/['"\\<>]/g, '') || 'Plus Jakarta Sans';
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
      profile.social?.twitter  && { href: profile.social.twitter,  label: 'Twitter / X' },
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
  <title>${esc(profile.name || 'Portfolio')} — Aether</title>
  <meta name="description" content="${esc((profile.bio || 'Software Engineer Portfolio').slice(0, 160))}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --ae-primary: ${primary};
      --ae-secondary: ${secondary};
      --ae-bg: #060918;
      --ae-bg-elevated: #0b1026;
      --ae-surface: rgba(15, 23, 52, 0.58);
      --ae-border: rgba(148, 163, 184, 0.14);
      --ae-text: #f1f5f9;
      --ae-muted: #94a3b8;
      --ae-dim: #64748b;
      --ae-font: '${font}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --ae-display: 'Space Grotesk', '${font}', sans-serif;
      --ae-mono: 'JetBrains Mono', monospace;
      --ae-nav-h: 72px;
    }
    html { scroll-behavior: smooth; }
    body.ae-body {
      font-family: var(--ae-font);
      background-color: var(--ae-bg);
      color: var(--ae-text);
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      position: relative;
    }
    .ae-body * { overflow-wrap: break-word; word-wrap: break-word; }
    .ae-body a { color: inherit; text-decoration: none; }
    .ae-body ul { list-style: none; }
    .ae-body img { display: block; max-width: 100%; }

    /* Ambient backdrop */
    .ae-glow {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background:
        radial-gradient(ellipse 65% 50% at 15% 10%, rgba(139, 92, 246, 0.18), transparent 65%),
        radial-gradient(ellipse 55% 45% at 85% 20%, rgba(56, 189, 248, 0.14), transparent 60%),
        radial-gradient(ellipse 50% 45% at 50% 90%, rgba(168, 85, 247, 0.10), transparent 65%);
    }

    /* ── Navbar ── */
    .ae-nav {
      position: fixed; top: 0; left: 0; right: 0; height: var(--ae-nav-h);
      z-index: 200;
      background: rgba(6, 9, 24, 0.78);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--ae-border);
    }
    .ae-nav-inner {
      max-width: 1180px; margin: 0 auto; height: 100%;
      padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    }
    .ae-brand {
      display: flex; align-items: center; gap: 0.65rem;
      font-family: var(--ae-display); font-weight: 700; font-size: 1.1rem;
      letter-spacing: -0.02em; color: #fff; flex-shrink: 0;
    }
    .ae-brand-mark {
      width: 30px; height: 30px; border-radius: 9px;
      background: linear-gradient(135deg, var(--ae-primary), var(--ae-secondary));
      display: flex; align-items: center; justify-content: center;
      font-size: 0.85rem; font-weight: 800; color: #fff;
      box-shadow: 0 0 18px rgba(139, 92, 246, 0.45);
    }
    .ae-nav-links { display: flex; align-items: center; gap: 1.6rem; }
    .ae-nav-links a {
      font-size: 0.875rem; font-weight: 500; color: var(--ae-muted);
      transition: color 180ms ease; white-space: nowrap;
    }
    .ae-nav-links a:hover { color: #fff; }
    .ae-nav-cta {
      padding: 8px 16px; border-radius: 999px;
      background: linear-gradient(135deg, var(--ae-primary), var(--ae-secondary));
      color: #fff !important; font-size: 0.8125rem !important; font-weight: 600 !important;
      box-shadow: 0 4px 16px rgba(139, 92, 246, 0.35);
      transition: transform 180ms ease, box-shadow 180ms ease !important;
    }
    .ae-nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(56, 189, 248, 0.45); }

    .ae-ham {
      display: none; background: rgba(255,255,255,0.06); border: 1px solid var(--ae-border);
      color: #fff; border-radius: 8px; padding: 7px 11px; font-size: 1.15rem; cursor: pointer;
    }
    .ae-mobile-drawer {
      display: none; position: fixed; top: var(--ae-nav-h); left: 0; right: 0;
      background: rgba(8, 12, 30, 0.98); backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--ae-border);
      padding: 1.25rem 2rem 1.75rem; flex-direction: column; gap: 0.9rem; z-index: 199;
    }
    .ae-mobile-drawer.open { display: flex; }
    .ae-mobile-drawer a { font-size: 0.95rem; color: var(--ae-muted); font-weight: 500; padding: 0.35rem 0; }
    .ae-mobile-drawer a:hover { color: #fff; }

    /* ── Main container ── */
    .ae-wrap { max-width: 1180px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 1; }
    .ae-section { padding: 5.5rem 0; scroll-margin-top: calc(var(--ae-nav-h) + 16px); }
    .ae-divider { height: 1px; background: linear-gradient(90deg, transparent, var(--ae-border), transparent); border: none; }

    /* ── Split-Screen Hero ── */
    .ae-hero {
      min-height: calc(100vh - var(--ae-nav-h));
      padding: calc(var(--ae-nav-h) + 3.5rem) 0 4.5rem;
      display: grid; grid-template-columns: 1.15fr 0.85fr;
      gap: 4rem; align-items: center;
      scroll-margin-top: 0;
    }
    .ae-badge {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 6px 14px; border-radius: 999px;
      background: rgba(139, 92, 246, 0.12);
      border: 1px solid rgba(139, 92, 246, 0.35);
      color: #c4b5fd; font-size: 0.78rem; font-weight: 600;
      letter-spacing: 0.04em; margin-bottom: 1.4rem;
    }
    .ae-badge-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--ae-secondary);
      box-shadow: 0 0 10px var(--ae-secondary);
    }
    .ae-hero-title {
      font-family: var(--ae-display);
      font-size: clamp(2.5rem, 5vw, 4.25rem);
      font-weight: 700; line-height: 1.08; letter-spacing: -0.03em;
      margin-bottom: 1rem; color: #ffffff;
    }
    .ae-gradient-text {
      background: linear-gradient(125deg, #ffffff 15%, var(--ae-primary) 60%, var(--ae-secondary) 100%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .ae-hero-role {
      font-size: clamp(1.05rem, 2vw, 1.35rem); font-weight: 600;
      color: var(--ae-secondary); margin-bottom: 1.25rem;
    }
    .ae-hero-bio {
      font-size: 1.025rem; color: var(--ae-muted); line-height: 1.78;
      max-width: 580px; margin-bottom: 2rem;
    }
    .ae-hero-actions { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-bottom: 2rem; }
    .ae-btn-primary {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 13px 26px; border-radius: 12px;
      background: linear-gradient(135deg, var(--ae-primary), var(--ae-secondary));
      color: #fff; font-weight: 600; font-size: 0.9rem;
      box-shadow: 0 10px 28px rgba(139, 92, 246, 0.35);
      transition: transform 200ms ease, box-shadow 200ms ease;
    }
    .ae-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(56, 189, 248, 0.4); }
    .ae-btn-ghost {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 13px 24px; border-radius: 12px;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--ae-border); color: var(--ae-text);
      font-weight: 600; font-size: 0.9rem;
      transition: border-color 200ms ease, background 200ms ease;
    }
    .ae-btn-ghost:hover { border-color: var(--ae-secondary); background: rgba(56, 189, 248, 0.08); }

    .ae-hero-socials { display: flex; flex-wrap: wrap; gap: 1.25rem; align-items: center; }
    .ae-social-link {
      font-size: 0.85rem; font-weight: 500; color: var(--ae-dim);
      transition: color 180ms ease;
    }
    .ae-social-link:hover { color: var(--ae-secondary); }

    /* Hero right portrait card */
    .ae-hero-visual { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
    .ae-portrait-frame {
      position: relative; width: 100%; max-width: 360px; aspect-ratio: 4 / 4.4;
      padding: 3px; border-radius: 28px;
      background: linear-gradient(145deg, var(--ae-primary), var(--ae-secondary), rgba(255,255,255,0.1));
      box-shadow: 0 28px 70px rgba(0, 0, 0, 0.55), 0 0 50px rgba(139, 92, 246, 0.22);
    }
    .ae-portrait-inner {
      width: 100%; height: 100%; border-radius: 25px; overflow: hidden;
      background: var(--ae-bg-elevated);
      display: flex; align-items: center; justify-content: center;
    }
    .ae-portrait-inner img { width: 100%; height: 100%; object-fit: cover; }
    .ae-portrait-initials {
      font-family: var(--ae-display); font-size: 5.5rem; font-weight: 700;
      background: linear-gradient(135deg, var(--ae-primary), var(--ae-secondary));
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .ae-hero-metrics {
      width: 100%; max-width: 360px;
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;
    }
    .ae-metric-box {
      background: var(--ae-surface); backdrop-filter: blur(16px);
      border: 1px solid var(--ae-border); border-radius: 14px;
      padding: 0.9rem 0.75rem; text-align: center;
    }
    .ae-metric-val {
      font-family: var(--ae-display); font-size: 1.35rem; font-weight: 700; color: #fff;
    }
    .ae-metric-lbl { font-size: 0.7rem; color: var(--ae-dim); text-transform: uppercase; letter-spacing: 0.06em; }

    /* ── Section Header ── */
    .ae-sec-kicker {
      font-family: var(--ae-mono); font-size: 0.75rem; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.14em; color: var(--ae-secondary);
      margin-bottom: 0.5rem;
    }
    .ae-sec-title {
      font-family: var(--ae-display); font-size: clamp(1.75rem, 3.2vw, 2.5rem);
      font-weight: 700; letter-spacing: -0.025em; color: #fff; margin-bottom: 0.6rem;
    }
    .ae-sec-sub { font-size: 0.98rem; color: var(--ae-muted); max-width: 620px; margin-bottom: 2.75rem; }

    /* ── About Card ── */
    .ae-about-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 2rem; align-items: stretch; }
    .ae-glass-card {
      background: var(--ae-surface);
      backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
      border: 1px solid var(--ae-border); border-radius: 20px;
      padding: 2rem;
      transition: border-color 220ms ease, transform 220ms ease;
    }
    .ae-glass-card:hover { border-color: rgba(139, 92, 246, 0.35); }
    .ae-about-text { font-size: 1.02rem; color: #cbd5e1; line-height: 1.85; }
    .ae-info-list { display: flex; flex-direction: column; gap: 1rem; }
    .ae-info-row {
      display: flex; justify-content: space-between; align-items: center; gap: 1rem;
      padding-bottom: 0.85rem; border-bottom: 1px solid rgba(148,163,184,0.1);
      font-size: 0.875rem;
    }
    .ae-info-row:last-child { border-bottom: none; padding-bottom: 0; }
    .ae-info-k { color: var(--ae-dim); font-weight: 500; }
    .ae-info-v { color: #f8fafc; font-weight: 600; text-align: right; }

    /* ── Skills ── */
    .ae-skills-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
      gap: 1rem;
    }
    .ae-skill-card {
      background: rgba(11, 16, 38, 0.85);
      border: 1px solid var(--ae-border); border-radius: 14px;
      padding: 1.15rem 1.25rem;
      transition: border-color 200ms ease, transform 200ms ease;
    }
    .ae-skill-card:hover { border-color: var(--ae-primary); transform: translateY(-2px); }
    .ae-skill-top { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; }
    .ae-skill-name { font-weight: 600; font-size: 0.92rem; color: #f1f5f9; }
    .ae-skill-pct { font-family: var(--ae-mono); font-size: 0.75rem; color: var(--ae-secondary); }
    .ae-skill-bar {
      height: 5px; border-radius: 999px; background: rgba(255,255,255,0.07);
      margin-top: 0.75rem; overflow: hidden;
    }
    .ae-skill-fill {
      height: 100%; border-radius: 999px;
      background: linear-gradient(90deg, var(--ae-primary), var(--ae-secondary));
    }

    /* ── Projects ── */
    .ae-proj-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 500px), 1fr));
      gap: 2rem;
    }
    .ae-proj-card {
      background: var(--ae-surface);
      backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
      border: 1px solid var(--ae-border); border-radius: 22px;
      overflow: hidden; display: flex; flex-direction: column;
      transition: transform 240ms ease, border-color 240ms ease, box-shadow 240ms ease;
    }
    .ae-proj-card:hover {
      transform: translateY(-4px);
      border-color: rgba(56, 189, 248, 0.4);
      box-shadow: 0 24px 50px rgba(0, 0, 0, 0.45);
    }
    .ae-proj-thumb {
      height: 210px; background: linear-gradient(135deg, #0f172a, #1e1b4b);
      position: relative; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
    }
    .ae-proj-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .ae-proj-thumb-fallback {
      font-family: var(--ae-display); font-size: 2.8rem; font-weight: 700;
      color: rgba(255,255,255,0.16); letter-spacing: 0.04em;
    }
    .ae-proj-badge {
      position: absolute; top: 14px; right: 14px;
      padding: 4px 11px; border-radius: 999px;
      background: rgba(6, 9, 24, 0.8); backdrop-filter: blur(8px);
      border: 1px solid rgba(139, 92, 246, 0.5);
      color: #ddd6fe; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
    }
    .ae-proj-body { padding: 1.85rem; flex: 1; display: flex; flex-direction: column; }
    .ae-proj-title { font-family: var(--ae-display); font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 0.4rem; }
    .ae-proj-tagline { font-size: 0.92rem; color: var(--ae-muted); margin-bottom: 1.1rem; }
    .ae-tech-row { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.35rem; }
    .ae-tech-pill {
      padding: 4px 10px; border-radius: 6px;
      background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2);
      color: #bae6fd; font-family: var(--ae-mono); font-size: 0.72rem;
    }
    .ae-case-stack { display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.4rem; }
    .ae-case-box {
      padding: 0.95rem 1.1rem; border-radius: 12px;
      background: rgba(6, 9, 24, 0.55); border: 1px solid rgba(148, 163, 184, 0.1);
    }
    .ae-case-box h4 {
      font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.09em;
      color: var(--ae-secondary); margin-bottom: 0.35rem; font-weight: 700;
    }
    .ae-case-box p, .ae-case-box li { font-size: 0.84rem; color: #cbd5e1; line-height: 1.6; }
    .ae-case-box ul li { padding-left: 1rem; position: relative; margin-top: 0.25rem; }
    .ae-case-box ul li::before { content: '›'; position: absolute; left: 0; color: var(--ae-primary); font-weight: 700; }
    .ae-outcome-box {
      padding: 0.95rem 1.1rem; border-radius: 12px;
      background: linear-gradient(135deg, rgba(139,92,246,0.12), rgba(56,189,248,0.1));
      border: 1px solid rgba(139, 92, 246, 0.3);
    }
    .ae-outcome-box h4 { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.09em; color: #ddd6fe; margin-bottom: 0.3rem; }
    .ae-outcome-box p { font-size: 0.84rem; color: #f1f5f9; }
    .ae-proj-links { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: auto; padding-top: 0.5rem; }
    .ae-link-btn {
      padding: 9px 18px; border-radius: 9px; font-size: 0.82rem; font-weight: 600;
      background: linear-gradient(135deg, var(--ae-primary), var(--ae-secondary));
      color: #fff; transition: opacity 180ms ease;
    }
    .ae-link-btn:hover { opacity: 0.9; }
    .ae-link-sec {
      padding: 9px 18px; border-radius: 9px; font-size: 0.82rem; font-weight: 600;
      border: 1px solid var(--ae-border); color: var(--ae-muted); transition: all 180ms ease;
    }
    .ae-link-sec:hover { border-color: #fff; color: #fff; }

    /* ── Timeline (Experience & Education) ── */
    .ae-timeline { position: relative; padding-left: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
    .ae-timeline::before {
      content: ''; position: absolute; left: 7px; top: 8px; bottom: 8px; width: 2px;
      background: linear-gradient(180deg, var(--ae-primary), var(--ae-secondary), transparent);
    }
    .ae-tl-item {
      position: relative; background: rgba(11, 16, 38, 0.8);
      border: 1px solid var(--ae-border); border-radius: 16px; padding: 1.5rem;
      transition: border-color 200ms ease;
    }
    .ae-tl-item:hover { border-color: rgba(139, 92, 246, 0.4); }
    .ae-tl-dot {
      position: absolute; left: -2.05rem; top: 1.65rem;
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--ae-secondary);
      border: 3px solid var(--ae-bg);
      box-shadow: 0 0 12px var(--ae-secondary);
    }
    .ae-tl-head { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.35rem; }
    .ae-tl-role { font-family: var(--ae-display); font-size: 1.08rem; font-weight: 700; color: #fff; }
    .ae-tl-period {
      font-family: var(--ae-mono); font-size: 0.75rem; color: var(--ae-secondary);
      padding: 3px 10px; border-radius: 999px; background: rgba(56, 189, 248, 0.1);
    }
    .ae-tl-org { font-size: 0.9rem; font-weight: 600; color: #c4b5fd; margin-bottom: 0.5rem; }
    .ae-tl-desc { font-size: 0.88rem; color: var(--ae-muted); line-height: 1.65; }

    /* ── Achievements ── */
    .ae-ach-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: 1.25rem; }
    .ae-ach-card {
      background: var(--ae-surface); border: 1px solid var(--ae-border);
      border-radius: 16px; padding: 1.5rem;
    }
    .ae-ach-title { font-weight: 700; color: #fff; margin-bottom: 0.35rem; }
    .ae-ach-desc { font-size: 0.875rem; color: var(--ae-muted); }

    /* ── Contact ── */
    .ae-contact-grid { display: grid; grid-template-columns: 1fr 1.15fr; gap: 2.5rem; align-items: start; }
    .ae-contact-info h3 { font-family: var(--ae-display); font-size: 1.65rem; font-weight: 700; margin-bottom: 0.75rem; }
    .ae-contact-info p { color: var(--ae-muted); margin-bottom: 1.75rem; }
    .ae-contact-links { display: flex; flex-direction: column; gap: 0.85rem; }
    .ae-contact-pill {
      display: inline-flex; align-items: center; gap: 0.75rem;
      padding: 0.9rem 1.15rem; border-radius: 12px;
      background: rgba(11, 16, 38, 0.85); border: 1px solid var(--ae-border);
      font-size: 0.9rem; font-weight: 500; transition: border-color 180ms ease;
    }
    .ae-contact-pill:hover { border-color: var(--ae-secondary); color: var(--ae-secondary); }

    .ae-form-group { margin-bottom: 1rem; }
    .ae-form-label { display: block; font-size: 0.78rem; font-weight: 600; color: var(--ae-muted); margin-bottom: 0.4rem; }
    .ae-input, .ae-textarea {
      width: 100%; padding: 11px 14px; border-radius: 10px;
      background: rgba(6, 9, 24, 0.8); border: 1px solid var(--ae-border);
      color: #fff; font-family: inherit; font-size: 0.9rem; outline: none;
      transition: border-color 180ms ease;
    }
    .ae-input:focus, .ae-textarea:focus { border-color: var(--ae-secondary); }
    .ae-textarea { min-height: 110px; resize: vertical; }
    .ae-submit {
      width: 100%; padding: 13px; border: none; border-radius: 10px; cursor: pointer;
      background: linear-gradient(135deg, var(--ae-primary), var(--ae-secondary));
      color: #fff; font-family: inherit; font-weight: 700; font-size: 0.92rem;
      transition: opacity 180ms ease;
    }
    .ae-submit:hover { opacity: 0.92; }

    /* ── Footer ── */
    .ae-footer {
      border-top: 1px solid var(--ae-border); padding: 2.5rem 2rem;
      text-align: center; color: var(--ae-dim); font-size: 0.84rem;
      position: relative; z-index: 1;
    }

    /* ── Responsive ── */
    @media (max-width: 960px) {
      .ae-hero { grid-template-columns: 1fr; gap: 2.75rem; padding-top: calc(var(--ae-nav-h) + 2.5rem); text-align: left; }
      .ae-hero-visual { align-items: flex-start; }
      .ae-about-grid, .ae-contact-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .ae-nav-links { display: none; }
      .ae-ham { display: block; }
      .ae-wrap { padding: 0 1.25rem; }
      .ae-section { padding: 4rem 0; }
      .ae-proj-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 420px) {
      .ae-hero-actions { flex-direction: column; }
      .ae-btn-primary, .ae-btn-ghost { width: 100%; justify-content: center; }
      .ae-hero-metrics { grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; }
      .ae-portrait-frame { max-width: 280px; }
    }

    ${customCss}
  </style>
</head>
<body class="ae-body">
  <div class="ae-glow" aria-hidden="true"></div>

  <nav class="ae-nav">
    <div class="ae-nav-inner">
      <a href="#top" class="ae-brand">
        <span class="ae-brand-mark">${initial}</span>
        <span>${esc(profile.name || 'Developer')}</span>
      </a>
      <div class="ae-nav-links">
        ${on('about')      ? '<a href="#about">About</a>' : ''}
        ${on('skills')     && skills.length ? '<a href="#skills">Skills</a>' : ''}
        ${on('projects')   && orderedProjs.length ? '<a href="#projects">Projects</a>' : ''}
        ${on('experience') && experience.length ? '<a href="#experience">Experience</a>' : ''}
        ${on('education')  && education.length ? '<a href="#education">Education</a>' : ''}
        ${on('contact')    ? '<a href="#contact">Contact</a>' : ''}
        ${resumeUrl        ? `<a href="${esc(resumeUrl)}" class="ae-nav-cta" target="_blank" rel="noopener">Resume ↗</a>` : ''}
      </div>
      <button class="ae-ham" id="ae-ham" aria-label="Open menu" onclick="document.getElementById('ae-drawer').classList.toggle('open')">☰</button>
    </div>
  </nav>

  <div class="ae-mobile-drawer" id="ae-drawer">
    ${on('about')      ? '<a href="#about" onclick="this.parentElement.classList.remove(\'open\')">About</a>' : ''}
    ${on('skills')     && skills.length ? '<a href="#skills" onclick="this.parentElement.classList.remove(\'open\')">Skills</a>' : ''}
    ${on('projects')   && orderedProjs.length ? '<a href="#projects" onclick="this.parentElement.classList.remove(\'open\')">Projects</a>' : ''}
    ${on('experience') && experience.length ? '<a href="#experience" onclick="this.parentElement.classList.remove(\'open\')">Experience</a>' : ''}
    ${on('education')  && education.length ? '<a href="#education" onclick="this.parentElement.classList.remove(\'open\')">Education</a>' : ''}
    ${on('contact')    ? '<a href="#contact" onclick="this.parentElement.classList.remove(\'open\')">Contact</a>' : ''}
    ${resumeUrl        ? `<a href="${esc(resumeUrl)}" target="_blank" rel="noopener">Download Resume ↗</a>` : ''}
  </div>

  <main class="ae-wrap" id="top">
    ${on('hero') ? `
    <section class="ae-hero">
      <div>
        <div class="ae-badge"><span class="ae-badge-dot"></span> ${esc(profile.location || 'Available for engineering roles')}</div>
        <h1 class="ae-hero-title">Hi, I'm <span class="ae-gradient-text">${esc(profile.name || 'Your Name')}</span></h1>
        <div class="ae-hero-role">${esc(profile.title || 'Software Engineer & Systems Builder')}</div>
        <p class="ae-hero-bio">${esc(profile.bio || 'Crafting resilient architectures, clean developer interfaces, and scalable web applications.')}</p>
        <div class="ae-hero-actions">
          ${on('contact') ? `<a href="#contact" class="ae-btn-primary">Get in Touch →</a>` : ''}
          ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="ae-btn-ghost" target="_blank" rel="noopener">Download Resume ↗</a>` : ''}
          ${profile.social?.github ? `<a href="${esc(profile.social.github)}" class="ae-btn-ghost" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
        </div>
        ${socials.length ? `
        <div class="ae-hero-socials">
          ${socials.map(s => `<a href="${esc(s.href)}" class="ae-social-link" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}
        </div>` : ''}
      </div>

      <div class="ae-hero-visual">
        <div class="ae-portrait-frame">
          <div class="ae-portrait-inner">
            ${profile.avatar
              ? `<img src="${esc(profile.avatar)}" alt="${esc(profile.name || 'Profile')}" onerror="this.parentElement.innerHTML='<span class=\\'ae-portrait-initials\\'>${initial}</span>'"/>`
              : `<span class="ae-portrait-initials">${initial}</span>`}
          </div>
        </div>
        <div class="ae-hero-metrics">
          <div class="ae-metric-box">
            <div class="ae-metric-val">${orderedProjs.length}</div>
            <div class="ae-metric-lbl">Projects</div>
          </div>
          <div class="ae-metric-box">
            <div class="ae-metric-val">${skills.length}</div>
            <div class="ae-metric-lbl">Skills</div>
          </div>
          <div class="ae-metric-box">
            <div class="ae-metric-val">${experience.length || education.length || 1}</div>
            <div class="ae-metric-lbl">${experience.length ? 'Roles' : 'Degrees'}</div>
          </div>
        </div>
      </div>
    </section>
    <hr class="ae-divider"/>` : ''}

    ${on('about') ? `
    <section class="ae-section" id="about">
      <div class="ae-sec-kicker">01 // Introduction</div>
      <h2 class="ae-sec-title">About Me</h2>
      <p class="ae-sec-sub">Engineering approach, focus areas, and background.</p>
      <div class="ae-about-grid">
        <div class="ae-glass-card">
          <p class="ae-about-text">${esc(profile.bio || 'Software developer focused on building reliable, maintainable products with clear architecture and thoughtful user experience.')}</p>
        </div>
        <div class="ae-glass-card">
          <div class="ae-info-list">
            <div class="ae-info-row"><span class="ae-info-k">Name</span><span class="ae-info-v">${esc(profile.name || '—')}</span></div>
            <div class="ae-info-row"><span class="ae-info-k">Role</span><span class="ae-info-v">${esc(profile.title || 'Developer')}</span></div>
            ${profile.location ? `<div class="ae-info-row"><span class="ae-info-k">Location</span><span class="ae-info-v">${esc(profile.location)}</span></div>` : ''}
            ${profile.email ? `<div class="ae-info-row"><span class="ae-info-k">Email</span><span class="ae-info-v">${esc(profile.email)}</span></div>` : ''}
          </div>
        </div>
      </div>
    </section>
    <hr class="ae-divider"/>` : ''}

    ${on('skills') && skills.length ? `
    <section class="ae-section" id="skills">
      <div class="ae-sec-kicker">02 // Capabilities</div>
      <h2 class="ae-sec-title">Technical Skills</h2>
      <p class="ae-sec-sub">Core languages, frameworks, and tools used in production.</p>
      <div class="ae-skills-grid">
        ${skills.map(s => {
          const name = skillName(s);
          const lvl = skillLevel(s);
          return `
          <div class="ae-skill-card">
            <div class="ae-skill-top">
              <span class="ae-skill-name">${esc(name)}</span>
              ${lvl !== null ? `<span class="ae-skill-pct">${lvl}%</span>` : ''}
            </div>
            ${lvl !== null ? `<div class="ae-skill-bar"><div class="ae-skill-fill" style="width:${lvl}%"></div></div>` : ''}
          </div>`;
        }).join('')}
      </div>
    </section>
    <hr class="ae-divider"/>` : ''}

    ${on('projects') && orderedProjs.length ? `
    <section class="ae-section" id="projects">
      <div class="ae-sec-kicker">03 // Selected Work</div>
      <h2 class="ae-sec-title">Featured Projects</h2>
      <p class="ae-sec-sub">Detailed engineering case studies, architectural decisions, and outcomes.</p>
      <div class="ae-proj-grid">
        ${orderedProjs.map((p, idx) => `
        <article class="ae-proj-card">
          <div class="ae-proj-thumb">
            ${p.thumbnail
              ? `<img src="${esc(p.thumbnail)}" alt="${esc(p.title || 'Project')}"/>`
              : `<span class="ae-proj-thumb-fallback">0${idx + 1}</span>`}
            ${p.featured ? `<span class="ae-proj-badge">Featured</span>` : ''}
          </div>
          <div class="ae-proj-body">
            <h3 class="ae-proj-title">${esc(p.title || 'Untitled Project')}</h3>
            ${p.tagline ? `<p class="ae-proj-tagline">${esc(p.tagline)}</p>` : ''}
            ${(p.technologies || []).length ? `
            <div class="ae-tech-row">
              ${p.technologies.map(t => `<span class="ae-tech-pill">${esc(t)}</span>`).join('')}
            </div>` : ''}
            <div class="ae-case-stack">
              ${p.problem ? `<div class="ae-case-box"><h4>Problem</h4><p>${esc(p.problem)}</p></div>` : ''}
              ${p.solution ? `<div class="ae-case-box"><h4>Solution</h4><p>${esc(p.solution)}</p></div>` : ''}
              ${p.features?.filter(Boolean).length ? `
              <div class="ae-case-box">
                <h4>Key Features</h4>
                <ul>${p.features.filter(Boolean).map(featItem).join('')}</ul>
              </div>` : ''}
              ${p.challenges ? `<div class="ae-case-box"><h4>Challenges</h4><p>${esc(p.challenges)}</p></div>` : ''}
              ${p.outcomes ? `<div class="ae-outcome-box"><h4>Outcomes</h4><p>${esc(p.outcomes)}</p></div>` : ''}
            </div>
            <div class="ae-proj-links">
              ${p.liveUrl ? `<a href="${esc(p.liveUrl)}" class="ae-link-btn" target="_blank" rel="noopener">Live Demo ↗</a>` : ''}
              ${p.githubUrl ? `<a href="${esc(p.githubUrl)}" class="ae-link-sec" target="_blank" rel="noopener">Source Code ↗</a>` : ''}
            </div>
          </div>
        </article>`).join('')}
      </div>
    </section>
    <hr class="ae-divider"/>` : ''}

    ${on('experience') && experience.length ? `
    <section class="ae-section" id="experience">
      <div class="ae-sec-kicker">04 // Career</div>
      <h2 class="ae-sec-title">Experience</h2>
      <p class="ae-sec-sub">Roles and engineering impact over time.</p>
      <div class="ae-timeline">
        ${experience.map(e => `
        <div class="ae-tl-item">
          <span class="ae-tl-dot"></span>
          <div class="ae-tl-head">
            <div class="ae-tl-role">${esc(e.role || e.title || 'Software Engineer')}</div>
            ${e.period ? `<span class="ae-tl-period">${esc(e.period)}</span>` : ''}
          </div>
          ${e.company ? `<div class="ae-tl-org">${esc(e.company)}</div>` : ''}
          ${e.description ? `<p class="ae-tl-desc">${esc(e.description)}</p>` : ''}
        </div>`).join('')}
      </div>
    </section>
    <hr class="ae-divider"/>` : ''}

    ${on('education') && education.length ? `
    <section class="ae-section" id="education">
      <div class="ae-sec-kicker">05 // Academic</div>
      <h2 class="ae-sec-title">Education</h2>
      <div class="ae-timeline">
        ${education.map(e => `
        <div class="ae-tl-item">
          <span class="ae-tl-dot"></span>
          <div class="ae-tl-head">
            <div class="ae-tl-role">${esc(e.degree || 'Degree')}</div>
            ${(e.year || e.period) ? `<span class="ae-tl-period">${esc(e.year || e.period)}</span>` : ''}
          </div>
          ${e.school ? `<div class="ae-tl-org">${esc(e.school)}</div>` : ''}
          ${e.description ? `<p class="ae-tl-desc">${esc(e.description)}</p>` : ''}
        </div>`).join('')}
      </div>
    </section>
    <hr class="ae-divider"/>` : ''}

    ${achievements.length ? `
    <section class="ae-section" id="achievements">
      <div class="ae-sec-kicker">06 // Recognition</div>
      <h2 class="ae-sec-title">Achievements</h2>
      <div class="ae-ach-grid">
        ${achievements.map(a => `
        <div class="ae-ach-card">
          <div class="ae-ach-title">${esc(typeof a === 'object' ? (a.title || a.name || '') : a)}</div>
          ${typeof a === 'object' && a.description ? `<p class="ae-ach-desc">${esc(a.description)}</p>` : ''}
        </div>`).join('')}
      </div>
    </section>
    <hr class="ae-divider"/>` : ''}

    ${on('contact') ? `
    <section class="ae-section" id="contact">
      <div class="ae-sec-kicker">Connect</div>
      <h2 class="ae-sec-title">Let's Build Together</h2>
      <div class="ae-contact-grid">
        <div class="ae-contact-info">
          <h3>Start a conversation</h3>
          <p>Open to senior engineering roles, architecture consulting, and collaborative builds.</p>
          <div class="ae-contact-links">
            ${profile.email ? `<a href="mailto:${esc(profile.email)}" class="ae-contact-pill">✉ ${esc(profile.email)}</a>` : ''}
            ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="ae-contact-pill" target="_blank" rel="noopener">📄 Download Resume ↗</a>` : ''}
            ${socials.map(s => `<a href="${esc(s.href)}" class="ae-contact-pill" target="_blank" rel="noopener">↗ ${esc(s.label)}</a>`).join('')}
          </div>
        </div>
        <div class="ae-glass-card">
          <form onsubmit="event.preventDefault(); alert('Thank you! Your message has been queued.'); this.reset();">
            <div class="ae-form-group">
              <label class="ae-form-label">Name</label>
              <input type="text" class="ae-input" required placeholder="Your name"/>
            </div>
            <div class="ae-form-group">
              <label class="ae-form-label">Email</label>
              <input type="email" class="ae-input" required placeholder="you@example.com"/>
            </div>
            <div class="ae-form-group">
              <label class="ae-form-label">Message</label>
              <textarea class="ae-textarea" required placeholder="Tell me about your project or role..."></textarea>
            </div>
            <button type="submit" class="ae-submit">Send Message →</button>
          </form>
        </div>
      </div>
    </section>` : ''}
  </main>

  <footer class="ae-footer">
    <p>${esc(profile.name || 'Developer')} · Built with DevPortfolio Builder · © ${year}</p>
  </footer>
</body>
</html>`;
  },
};
