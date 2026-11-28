/**
 * template-bento.js — Bento Studio
 * Asymmetrical pastel bento portfolio. Styles are scoped to .bs and --bs-* variables.
 * Does not alter Aurora, Minimal, or Neon.
 */
window.TemplateBento = {
  name: 'Bento Studio',
  id: 'bento',
  description: 'Asymmetrical pastel bento grid — personal site meets a refined studio layout',

  render(profile, projects, config = {}) {
    const esc = (str) => String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const safeColor = (value, fallback) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value || '') ? value : fallback;
    const font = String(config.fontFamily || 'Outfit').replace(/['"\\<>]/g, '') || 'Outfit';
    const primary = safeColor(config.primaryColor, '#e07a5f');
    const secondary = safeColor(config.secondaryColor, '#7c6cf0');
    const show = config.showSections || {};
    const on = (key) => show[key] !== false;
    const customCss = config.customCss || '';
    const resumeUrl = profile.resumeUrl || '';

    const skillName = (s) => typeof s === 'object' && s ? (s.name || '') : String(s || '');
    const skillLevel = (s) => {
      if (typeof s !== 'object' || !s || s.level == null || s.level === '') return null;
      const n = Number(s.level);
      return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : null;
    };
    const ordered = [...(projects || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const skills = (profile.skills || []).filter((s) => skillName(s));
    const experience = profile.experience || [];
    const education = profile.education || [];
    const initial = esc(((profile.name || '?').trim().charAt(0) || '?').toUpperCase());
    const year = new Date().getFullYear();

    const avatar = profile.avatar
      ? `<img class="bs-avatar-img" src="${esc(profile.avatar)}" alt="${esc(profile.name || 'Profile photo')}" />`
      : `<div class="bs-avatar-fallback" aria-hidden="true">${initial}</div>`;

    const socials = [
      profile.social?.github && { href: profile.social.github, label: 'GitHub' },
      profile.social?.linkedin && { href: profile.social.linkedin, label: 'LinkedIn' },
      profile.social?.twitter && { href: profile.social.twitter, label: 'Twitter' },
      (profile.website || profile.social?.website) && { href: profile.website || profile.social.website, label: 'Website' },
    ].filter(Boolean);

    const navLink = (href, label, visible) => visible ? `<a href="${href}" onclick="document.getElementById('bs-nav').classList.remove('is-open')">${label}</a>` : '';

    const featureLine = (f) => {
      if (typeof f === 'object' && f) {
        const title = f.title ? esc(f.title) : '';
        const desc = f.desc ? esc(f.desc) : '';
        return title && desc ? `<strong>${title}.</strong> ${desc}` : (title || desc);
      }
      return esc(f);
    };

    const projectCard = (p, index) => {
      const features = (p.features || []).filter(Boolean);
      const thumb = p.thumbnail
        ? `<img src="${esc(p.thumbnail)}" alt="" />`
        : `<span class="bs-thumb-letter">${esc(((p.title || '?').trim().charAt(0) || '?').toUpperCase())}</span>`;
      return `
      <article class="bs-card bs-project ${index === 0 ? 'is-lead' : ''}">
        <div class="bs-thumb">${thumb}</div>
        <div class="bs-project-body">
          <div class="bs-kicker">${p.featured ? 'Featured' : 'Project'} · 0${index + 1}</div>
          <h3>${esc(p.title || 'Untitled project')}</h3>
          ${p.tagline ? `<p class="bs-muted">${esc(p.tagline)}</p>` : ''}
          ${(p.technologies || []).length ? `<ul class="bs-chips">${p.technologies.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
          ${(p.problem || p.solution || features.length || p.challenges || p.outcomes) ? `
          <details class="bs-details">
            <summary>Case study</summary>
            ${p.problem ? `<p><strong>Problem.</strong> ${esc(p.problem)}</p>` : ''}
            ${p.solution ? `<p><strong>Solution.</strong> ${esc(p.solution)}</p>` : ''}
            ${features.length ? `<ul class="bs-points">${features.map((f) => `<li>${featureLine(f)}</li>`).join('')}</ul>` : ''}
            ${p.challenges ? `<p><strong>Challenges.</strong> ${esc(p.challenges)}</p>` : ''}
            ${p.outcomes ? `<p><strong>Outcomes.</strong> ${esc(p.outcomes)}</p>` : ''}
          </details>` : ''}
          <div class="bs-actions">
            ${p.liveUrl ? `<a class="bs-textlink" href="${esc(p.liveUrl)}" target="_blank" rel="noopener">Live</a>` : ''}
            ${p.githubUrl ? `<a class="bs-textlink" href="${esc(p.githubUrl)}" target="_blank" rel="noopener">Source</a>` : ''}
          </div>
        </div>
      </article>`;
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${esc(profile.name || 'Portfolio')} — Bento Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,520;9..144,680&family=${encodeURIComponent(font)}:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    .bs, .bs *, .bs *::before, .bs *::after { box-sizing: border-box; }
    .bs {
      --bs-ink: #241f1b;
      --bs-muted: #6f675f;
      --bs-card: rgba(255,252,248,0.86);
      --bs-line: rgba(36,31,27,0.08);
      --bs-accent: ${primary};
      --bs-accent-2: ${secondary};
      --bs-shadow: 0 18px 40px rgba(92, 64, 42, 0.08);
      --bs-font: '${font}', 'Outfit', 'Segoe UI', sans-serif;
      --bs-display: 'Fraunces', Georgia, 'Times New Roman', serif;
      margin: 0;
      min-height: 100vh;
      font-family: var(--bs-font);
      font-size: 16px;
      line-height: 1.6;
      color: var(--bs-ink);
      background:
        radial-gradient(900px 520px at -10% -10%, #ffe3d2 0%, transparent 58%),
        radial-gradient(820px 520px at 110% 0%, #e5dcff 0%, transparent 52%),
        radial-gradient(760px 480px at 80% 110%, #d9f4ea 0%, transparent 50%),
        #f6f1ea;
      overflow-x: hidden;
    }
    .bs a { color: inherit; text-decoration: none; }
    .bs img { max-width: 100%; display: block; }
    .bs h1, .bs h2, .bs h3, .bs p { margin: 0; overflow-wrap: anywhere; }
    .bs ul { margin: 0; padding: 0; list-style: none; }
    .bs-wrap { width: min(1120px, calc(100% - 40px)); margin: 0 auto; }
    .bs-nav {
      position: sticky; top: 0; z-index: 30;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      width: min(1120px, calc(100% - 28px));
      margin: 14px auto 0;
      padding: 12px 16px 12px 20px;
      border-radius: 999px;
      background: rgba(255,252,248,0.78);
      border: 1px solid rgba(255,255,255,0.8);
      box-shadow: 0 10px 30px rgba(80, 60, 40, 0.06);
      backdrop-filter: blur(16px);
    }
    .bs-logo { font-family: var(--bs-display); font-weight: 680; font-size: 1.15rem; letter-spacing: -0.03em; }
    .bs-nav-links { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; justify-content: flex-end; }
    .bs-nav-links a { font-size: 0.86rem; font-weight: 600; color: var(--bs-muted); }
    .bs-nav-links a:hover { color: var(--bs-ink); }
    .bs-nav-cta {
      background: var(--bs-ink); color: #fff !important;
      border-radius: 999px; padding: 8px 14px;
    }
    .bs-burger {
      display: none; width: 42px; height: 42px; border-radius: 50%;
      border: 1px solid var(--bs-line); background: #fff; cursor: pointer;
      align-items: center; justify-content: center; flex-direction: column; gap: 5px;
    }
    .bs-burger span { display: block; width: 16px; height: 1.5px; background: var(--bs-ink); }
    .bs-hero { padding: 28px 0 10px; }
    .bs-bento {
      display: grid;
      grid-template-columns: 1.45fr 0.8fr;
      grid-template-areas: "intro avatar" "intro stats";
      gap: 16px;
      align-items: stretch;
    }
    .bs-card {
      background: var(--bs-card);
      border: 1px solid rgba(255,255,255,0.7);
      border-radius: 28px;
      box-shadow: var(--bs-shadow);
      min-width: 0;
    }
    .bs-intro { grid-area: intro; padding: 36px 36px 32px; display: flex; flex-direction: column; justify-content: space-between; gap: 28px; }
    .bs-kicker {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 0.75rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--bs-muted);
    }
    .bs-kicker i { width: 8px; height: 8px; border-radius: 50%; background: var(--bs-accent); display: inline-block; }
    .bs-intro h1 {
      font-family: var(--bs-display); font-weight: 680; letter-spacing: -0.045em;
      font-size: clamp(2.6rem, 5vw, 4.5rem); line-height: 0.96; margin: 12px 0 14px;
    }
    .bs-role { font-size: 1.08rem; font-weight: 650; color: var(--bs-accent-2); }
    .bs-bio { margin-top: 12px; max-width: 38rem; color: #4d463f; font-size: 1.05rem; }
    .bs-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
    .bs-btn, .bs-btn-ghost {
      display: inline-flex; align-items: center; justify-content: center;
      min-height: 44px; padding: 0 18px; border-radius: 999px;
      font-weight: 650; font-size: 0.92rem; border: 1px solid transparent; cursor: pointer;
      transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
    }
    .bs-btn { background: var(--bs-ink); color: #fff; }
    .bs-btn-ghost { background: transparent; border-color: rgba(36,31,27,0.16); color: var(--bs-ink); }
    .bs-btn:hover, .bs-btn-ghost:hover, .bs-project:hover, .bs-skill:hover, .bs-statrow:hover {
      transform: translateY(-3px);
    }
    .bs-btn:hover { box-shadow: 0 10px 24px rgba(36,31,27,0.16); }
    .bs-avatar, .bs-stats { min-height: 180px; }
    .bs-avatar { grid-area: avatar; padding: 12px; position: relative; overflow: hidden; }
    .bs-avatar-img, .bs-avatar-fallback {
      width: 100%; height: 100%; min-height: 220px; object-fit: cover; border-radius: 20px;
    }
    .bs-avatar-fallback {
      display: grid; place-items: center;
      font-family: var(--bs-display); font-size: 4rem;
      background: linear-gradient(160deg, #ffe8da, #efe7ff 55%, #ddf6ee);
    }
    .bs-loc {
      position: absolute; left: 22px; bottom: 22px;
      background: rgba(255,252,248,0.92); border-radius: 999px;
      padding: 6px 12px; font-size: 0.8rem; font-weight: 650;
      max-width: calc(100% - 44px);
    }
    .bs-stats { grid-area: stats; padding: 18px; display: grid; gap: 8px; }
    .bs-statrow {
      display: flex; align-items: baseline; justify-content: space-between; gap: 12px;
      padding: 10px 12px; border-radius: 16px; background: rgba(255,255,255,0.55);
      transition: transform 180ms ease;
    }
    .bs-statrow strong { font-family: var(--bs-display); font-size: 1.7rem; letter-spacing: -0.04em; line-height: 1; }
    .bs-statrow span { color: var(--bs-muted); font-size: 0.82rem; font-weight: 600; }
    .bs-section { padding: 18px 0 8px; }
    .bs-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; margin: 8px 2px 14px; }
    .bs-head h2 { font-family: var(--bs-display); font-size: clamp(1.8rem, 3vw, 2.5rem); letter-spacing: -0.04em; line-height: 1; }
    .bs-muted { color: var(--bs-muted); }
    .bs-skills { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
    .bs-skill { padding: 16px 16px 14px; min-height: 124px; display: flex; flex-direction: column; justify-content: space-between; transition: transform 180ms ease, box-shadow 180ms ease; }
    .bs-skill:hover { box-shadow: 0 18px 36px rgba(92, 64, 42, 0.12); }
    .bs-skill b { font-size: 1rem; letter-spacing: -0.02em; }
    .bs-meter { height: 7px; border-radius: 99px; background: rgba(36,31,27,0.08); overflow: hidden; margin-top: 14px; }
    .bs-meter span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--bs-accent), var(--bs-accent-2)); }
    .bs-skill em { font-style: normal; font-size: 0.75rem; font-weight: 700; color: var(--bs-muted); }
    .bs-mark {
      width: 36px; height: 36px; border-radius: 12px; display: grid; place-items: center;
      font-family: var(--bs-display); font-style: normal; font-weight: 680; color: #fff;
      background: linear-gradient(145deg, var(--bs-accent), var(--bs-accent-2));
    }
    .bs-work { display: grid; grid-template-columns: 1.35fr 1fr; gap: 16px; }
    .bs-project { overflow: hidden; display: flex; flex-direction: column; transition: transform 180ms ease, box-shadow 180ms ease; }
    .bs-project.is-lead { grid-row: span 2; }
    .bs-project:hover { box-shadow: 0 22px 44px rgba(92, 64, 42, 0.14); }
    .bs-thumb {
      height: 180px; display: grid; place-items: center; overflow: hidden;
      background: linear-gradient(145deg, #ffe8da, #e7defc 60%, #d9f3ea);
    }
    .bs-project.is-lead .bs-thumb { height: 260px; }
    .bs-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 280ms ease; }
    .bs-project:hover .bs-thumb img { transform: scale(1.04); }
    .bs-thumb-letter { font-family: var(--bs-display); font-size: 3.4rem; }
    .bs-project-body { padding: 18px 18px 20px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .bs-project h3 { font-family: var(--bs-display); font-size: 1.55rem; letter-spacing: -0.03em; line-height: 1.15; }
    .bs-chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .bs-chips li { font-size: 0.75rem; font-weight: 650; padding: 4px 8px; border-radius: 999px; background: rgba(36,31,27,0.05); }
    .bs-details { font-size: 0.92rem; color: #4d463f; }
    .bs-details summary { cursor: pointer; font-weight: 700; color: var(--bs-ink); }
    .bs-details p, .bs-points { margin-top: 8px; }
    .bs-points { padding-left: 1rem; list-style: disc; }
    .bs-textlink { font-weight: 750; font-size: 0.88rem; border-bottom: 1.5px solid var(--bs-accent); }
    .bs-split { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 16px; }
    .bs-split:has(> :only-child) { grid-template-columns: 1fr; }
    .bs-list { padding: 8px; display: flex; flex-direction: column; gap: 8px; }
    .bs-row { padding: 14px 14px; border-radius: 18px; background: rgba(255,255,255,0.5); }
    .bs-row strong { display: block; font-size: 1.02rem; }
    .bs-row span, .bs-row p { color: var(--bs-muted); font-size: 0.9rem; }
    .bs-contact { padding: 28px; display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .bs-contact h2 { font-family: var(--bs-display); font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -0.04em; line-height: 1; }
    .bs-contact a.bs-mail { display: inline-block; margin-top: 10px; font-weight: 700; color: var(--bs-accent-2); overflow-wrap: anywhere; }
    .bs-form { display: grid; gap: 10px; }
    .bs-form input, .bs-form textarea {
      width: 100%; border: 1px solid var(--bs-line); background: #fff; border-radius: 14px;
      padding: 12px 14px; font: inherit; color: inherit;
    }
    .bs-form textarea { min-height: 110px; resize: vertical; }
    .bs-socials { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
    .bs-socials a { border: 1px solid var(--bs-line); border-radius: 999px; padding: 6px 12px; font-size: 0.82rem; font-weight: 700; background: #fff; }
    .bs-foot { padding: 28px 0 36px; color: var(--bs-muted); font-size: 0.85rem; }
    @media (max-width: 980px) {
      .bs-skills { grid-template-columns: 1fr 1fr; }
      .bs-work, .bs-split, .bs-contact { grid-template-columns: 1fr; }
      .bs-project.is-lead { grid-row: auto; }
    }
    @media (max-width: 760px) {
      .bs-wrap { width: min(1120px, calc(100% - 24px)); }
      .bs-nav { width: min(1120px, calc(100% - 16px)); border-radius: 22px; align-items: flex-start; }
      .bs-burger { display: inline-flex; }
      .bs-nav-links {
        display: none; position: absolute; left: 8px; right: 8px; top: calc(100% + 8px);
        flex-direction: column; align-items: stretch; padding: 12px;
        background: #fffdfb; border-radius: 18px; box-shadow: var(--bs-shadow);
      }
      .bs-nav.is-open .bs-nav-links { display: flex; }
      .bs-bento { grid-template-columns: 1fr; grid-template-areas: "intro" "avatar" "stats"; }
      .bs-intro { padding: 24px 20px; }
      .bs-skills { grid-template-columns: 1fr; }
      .bs-avatar-img, .bs-avatar-fallback { min-height: 240px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .bs-btn, .bs-btn-ghost, .bs-project, .bs-skill, .bs-statrow, .bs-thumb img { transition: none; }
    }
    ${customCss}
  </style>
</head>
<body class="bs">
  <header class="bs-nav" id="bs-nav">
    <a class="bs-logo" href="#bs-top">${esc(profile.name || 'Portfolio')}</a>
    <button class="bs-burger" type="button" aria-label="Open menu" onclick="document.getElementById('bs-nav').classList.toggle('is-open')"><span></span><span></span></button>
    <nav class="bs-nav-links" aria-label="Portfolio">
      ${navLink('#bs-about', 'About', on('about') || on('hero'))}
      ${navLink('#bs-skills', 'Skills', on('skills') && skills.length)}
      ${navLink('#bs-work', 'Work', on('projects') && ordered.length)}
      ${navLink('#bs-experience', 'Experience', on('experience') && experience.length)}
      ${navLink('#bs-education', 'Education', on('education') && education.length)}
      ${navLink('#bs-contact', 'Contact', on('contact'))}
      ${resumeUrl ? `<a class="bs-nav-cta" href="${esc(resumeUrl)}" target="_blank" rel="noopener">Resume</a>` : ''}
    </nav>
  </header>

  <main id="bs-top">
    ${on('hero') ? `
    <section class="bs-hero" id="bs-about">
      <div class="bs-wrap bs-bento">
        <article class="bs-card bs-intro">
          <div>
            <div class="bs-kicker"><i></i> ${esc(profile.location || 'Portfolio')}</div>
            <h1>${esc(profile.name || 'Your Name')}</h1>
            ${profile.title ? `<div class="bs-role">${esc(profile.title)}</div>` : ''}
            ${on('about') && profile.bio ? `<p class="bs-bio">${esc(profile.bio)}</p>` : ''}
          </div>
          <div class="bs-actions">
            ${on('contact') ? `<a class="bs-btn" href="${profile.email ? `mailto:${esc(profile.email)}` : '#bs-contact'}">Start a conversation</a>` : ''}
            ${resumeUrl ? `<a class="bs-btn-ghost" href="${esc(resumeUrl)}" target="_blank" rel="noopener">Resume</a>` : ''}
            ${on('projects') && ordered.length ? `<a class="bs-btn-ghost" href="#bs-work">Selected work</a>` : ''}
          </div>
        </article>
        <article class="bs-card bs-avatar">
          ${avatar}
          ${profile.location ? `<div class="bs-loc">${esc(profile.location)}</div>` : ''}
        </article>
        <article class="bs-card bs-stats" aria-label="Profile statistics">
          <div class="bs-statrow"><strong>${ordered.length}</strong><span>Projects</span></div>
          <div class="bs-statrow"><strong>${skills.length}</strong><span>Skills</span></div>
          <div class="bs-statrow"><strong>${experience.length}</strong><span>Roles</span></div>
        </article>
      </div>
    </section>` : (on('about') && profile.bio ? `
    <section class="bs-section" id="bs-about"><div class="bs-wrap"><article class="bs-card bs-intro"><p class="bs-bio">${esc(profile.bio)}</p></article></div></section>` : '')}

    ${on('skills') && skills.length ? `
    <section class="bs-section" id="bs-skills">
      <div class="bs-wrap">
        <div class="bs-head"><h2>Capabilities</h2><span class="bs-muted">${skills.length} in the toolkit</span></div>
        <div class="bs-skills">
          ${skills.map((s) => {
            const level = skillLevel(s);
            return `<article class="bs-card bs-skill">
              <span class="bs-mark">${esc(skillName(s).trim().charAt(0).toUpperCase() || '•')}</span>
              <div>
                <b>${esc(skillName(s))}</b>
                ${level != null ? `<div class="bs-meter" aria-hidden="true"><span style="width:${level}%"></span></div><em>${level}%</em>` : `<div class="bs-meter" aria-hidden="true"><span style="width:100%;opacity:.45"></span></div>`}
              </div>
            </article>`;
          }).join('')}
        </div>
      </div>
    </section>` : ''}

    ${on('projects') && ordered.length ? `
    <section class="bs-section" id="bs-work">
      <div class="bs-wrap">
        <div class="bs-head"><h2>Selected work</h2><span class="bs-muted">Case studies from the profile</span></div>
        <div class="bs-work">
          ${ordered.map(projectCard).join('')}
        </div>
      </div>
    </section>` : ''}

    ${(on('experience') && experience.length) || (on('education') && education.length) ? `
    <section class="bs-section" id="bs-experience">
      <div class="bs-wrap bs-split">
        ${on('experience') && experience.length ? `
        <article class="bs-card bs-list">
          <div class="bs-head" style="padding:10px 8px 0"><h2>Experience</h2></div>
          ${experience.map((e) => `
            <div class="bs-row">
              <strong>${esc(e.role || e.title || 'Role')}</strong>
              <span>${esc([e.company, e.duration || e.period].filter(Boolean).join(' · '))}</span>
              ${e.description ? `<p>${esc(e.description)}</p>` : ''}
            </div>`).join('')}
        </article>` : ''}
        ${on('education') && education.length ? `
        <article class="bs-card bs-list" id="bs-education">
          <div class="bs-head" style="padding:10px 8px 0"><h2>Education</h2></div>
          ${education.map((e) => `
            <div class="bs-row">
              <strong>${esc(e.degree || 'Study')}</strong>
              <span>${esc([e.school, e.year, e.gpa ? `GPA ${e.gpa}` : ''].filter(Boolean).join(' · '))}</span>
              ${e.description ? `<p>${esc(e.description)}</p>` : ''}
            </div>`).join('')}
        </article>` : ''}
      </div>
    </section>` : ''}

    ${on('contact') ? `
    <section class="bs-section" id="bs-contact">
      <div class="bs-wrap">
        <article class="bs-card bs-contact">
          <div>
            <div class="bs-kicker"><i></i> Contact</div>
            <h2>Let’s build the next thing.</h2>
            ${profile.email ? `<a class="bs-mail" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>` : ''}
            ${profile.phone ? `<p class="bs-muted" style="margin-top:6px">${esc(profile.phone)}</p>` : ''}
            <div class="bs-socials">
              ${socials.map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('')}
              ${resumeUrl ? `<a href="${esc(resumeUrl)}" target="_blank" rel="noopener">Resume</a>` : ''}
            </div>
          </div>
          <form class="bs-form" onsubmit="event.preventDefault(); this.reset(); this.querySelector('[data-note]').hidden = false;">
            <input required name="name" type="text" placeholder="Your name" aria-label="Your name"/>
            <input required name="email" type="email" placeholder="Email" aria-label="Email"/>
            <textarea required name="message" placeholder="What should we make?" aria-label="Message"></textarea>
            <button class="bs-btn" type="submit">Send note</button>
            <p data-note hidden class="bs-muted">Thanks — this preview stores the note only in the page.</p>
          </form>
        </article>
      </div>
    </section>` : ''}
  </main>
  <footer class="bs-wrap bs-foot">${esc(profile.name || 'Portfolio')} · ${year}</footer>
</body>
</html>`;
  },
};
