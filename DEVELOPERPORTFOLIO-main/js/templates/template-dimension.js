/**
 * template-dimension.js — Digital Dimension
 * Futuristic glass portfolio. Scoped to .dd and --dd-* variables.
 * Motion is limited to hover and one slow ambient drift, disabled for reduced motion.
 */
window.TemplateDimension = {
  name: 'Digital Dimension',
  id: 'dimension',
  description: 'Violet and electric-blue space with layered glass and a 3D hero stage',

  render(profile, projects, config = {}) {
    const esc = (str) => String(str ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    const safeColor = (value, fallback) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value || '') ? value : fallback;
    const font = String(config.fontFamily || 'Sora').replace(/['"\\<>]/g, '') || 'Sora';
    const primary = safeColor(config.primaryColor, '#8b5cff');
    const secondary = safeColor(config.secondaryColor, '#3d8bff');
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
    const socials = [
      profile.social?.github && { href: profile.social.github, label: 'GitHub' },
      profile.social?.linkedin && { href: profile.social.linkedin, label: 'LinkedIn' },
      profile.social?.twitter && { href: profile.social.twitter, label: 'Twitter' },
      (profile.website || profile.social?.website) && { href: profile.website || profile.social.website, label: 'Website' },
    ].filter(Boolean);
    const nav = (href, label, visible) => visible
      ? `<a href="${href}" onclick="document.getElementById('dd-nav').classList.remove('is-open')">${label}</a>` : '';
    const featureLine = (f) => {
      if (typeof f === 'object' && f) {
        const title = f.title ? esc(f.title) : '';
        const desc = f.desc ? esc(f.desc) : '';
        return title && desc ? `<strong>${title}.</strong> ${desc}` : (title || desc);
      }
      return esc(f);
    };
    const lead = ordered[0];

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${esc(profile.name || 'Portfolio')} — Digital Dimension</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@500;700&family=${encodeURIComponent(font)}:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    .dd, .dd *, .dd *::before, .dd *::after { box-sizing: border-box; }
    .dd {
      --dd-a: ${primary};
      --dd-b: ${secondary};
      --dd-ink: #f4f7ff;
      --dd-muted: #b7c0dd;
      --dd-font: '${font}', 'Sora', 'Segoe UI', sans-serif;
      --dd-display: 'Sora', '${font}', 'Segoe UI', sans-serif;
      margin: 0;
      min-height: 100vh;
      color: var(--dd-ink);
      font-family: var(--dd-font);
      font-size: 16px;
      line-height: 1.6;
      background: #070714;
      overflow-x: hidden;
      position: relative;
    }
    .dd-sky, .dd-sky i { position: fixed; inset: 0; pointer-events: none; }
    .dd-sky { z-index: 0; background:
      radial-gradient(520px 320px at 12% 10%, color-mix(in srgb, var(--dd-a) 45%, transparent), transparent 70%),
      radial-gradient(480px 300px at 88% 18%, color-mix(in srgb, var(--dd-b) 40%, transparent), transparent 70%),
      radial-gradient(600px 380px at 70% 100%, rgba(88, 28, 135, 0.25), transparent 70%);
    }
    .dd-sky i {
      inset: auto; width: 280px; height: 280px; border-radius: 50%; filter: blur(8px); opacity: 0.35;
      background: conic-gradient(from 120deg, var(--dd-a), transparent 40%, var(--dd-b));
      top: 18%; right: 8%;
      animation: dd-drift 22s ease-in-out infinite alternate;
    }
    @keyframes dd-drift { from { transform: translate3d(0,0,0); } to { transform: translate3d(-18px, 22px, 0); } }
    .dd a { color: inherit; text-decoration: none; }
    .dd img { max-width: 100%; display: block; }
    .dd h1, .dd h2, .dd h3, .dd p { margin: 0; overflow-wrap: anywhere; }
    .dd-wrap { width: min(1120px, calc(100% - 40px)); margin: 0 auto; position: relative; z-index: 1; }
    .dd-nav {
      position: sticky; top: 12px; z-index: 20;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      width: min(920px, calc(100% - 24px));
      margin: 12px auto 0; padding: 8px 8px 8px 18px;
      border-radius: 999px;
      background: rgba(14, 16, 36, 0.72);
      border: 1px solid rgba(255,255,255,0.14);
      backdrop-filter: blur(16px);
      box-shadow: 0 16px 40px rgba(0,0,0,0.28);
    }
    .dd-logo { font-family: var(--dd-display); font-weight: 700; letter-spacing: -0.04em; }
    .dd-links { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; justify-content: flex-end; }
    .dd-links a { font-size: 0.82rem; color: var(--dd-muted); font-weight: 600; }
    .dd-links a:hover { color: white; }
    .dd-pill { background: linear-gradient(90deg, var(--dd-a), var(--dd-b)); color: white !important; border-radius: 999px; padding: 8px 14px; }
    .dd-burger { display: none; width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: white; cursor: pointer; }
    .dd-hero { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 36px; align-items: center; padding: 54px 0 24px; min-height: calc(100vh - 90px); }
    .dd-kicker { font-size: 0.75rem; letter-spacing: 0.16em; text-transform: uppercase; color: #d5dcff; }
    .dd-hero h1 { font-family: var(--dd-display); font-weight: 700; letter-spacing: -0.05em; font-size: clamp(2.8rem, 5.4vw, 5rem); line-height: 0.96; margin: 12px 0; }
    .dd-grad { background: linear-gradient(100deg, #fff, var(--dd-b) 55%, var(--dd-a)); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .dd-bio { color: var(--dd-muted); max-width: 36rem; font-size: 1.05rem; }
    .dd-cta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
    .dd-btn, .dd-btn-ghost {
      min-height: 44px; padding: 0 16px; border-radius: 12px; display: inline-flex; align-items: center;
      font-weight: 650; border: 1px solid transparent;
    }
    .dd-btn { background: linear-gradient(90deg, var(--dd-a), var(--dd-b)); color: white; }
    .dd-btn-ghost { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }
    .dd-stage { perspective: 1200px; min-height: 380px; position: relative; }
    .dd-glass {
      position: absolute; inset: 30px 40px auto 0;
      padding: 18px; border-radius: 22px;
      background: linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04));
      border: 1px solid rgba(255,255,255,0.18);
      box-shadow: 0 24px 50px rgba(0,0,0,0.35);
      backdrop-filter: blur(16px);
      transform: rotateY(-16deg) rotateX(8deg);
      transition: transform 240ms ease;
    }
    .dd-glass:nth-child(2) { top: 92px; left: 36px; right: 8px; }
    .dd-glass:nth-child(3) { top: 164px; left: 72px; right: 0; }
    .dd-stage:hover .dd-glass { transform: rotateY(-10deg) rotateX(4deg) translateY(-4px); }
    .dd-glass b { display: block; font-size: 1.05rem; }
    .dd-glass span { color: var(--dd-muted); font-size: 0.86rem; }
    .dd-avatar, .dd-fallback { width: 54px; height: 54px; border-radius: 16px; object-fit: cover; margin-bottom: 10px; }
    .dd-fallback { display: grid; place-items: center; font-weight: 700; background: linear-gradient(145deg, var(--dd-a), var(--dd-b)); }
    .dd-section { padding: 28px 0; position: relative; z-index: 1; }
    .dd-section h2 { font-family: var(--dd-display); font-size: clamp(1.8rem, 3vw, 2.6rem); letter-spacing: -0.04em; }
    .dd-orbit { margin-top: 18px; display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
    .dd-skill {
      border-radius: 18px; padding: 14px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.12);
      min-height: 96px;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02), 0 10px 24px rgba(0,0,0,0.18);
    }
    .dd-skill strong { display: block; margin-top: 18px; }
    .dd-arc { height: 4px; border-radius: 99px; background: rgba(255,255,255,0.08); overflow: hidden; }
    .dd-arc span { display: block; height: 100%; background: linear-gradient(90deg, var(--dd-a), var(--dd-b)); }
    .dd-grid { margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .dd-card {
      border-radius: 24px; overflow: hidden;
      background: rgba(12, 14, 32, 0.72);
      border: 1px solid rgba(255,255,255,0.12);
      box-shadow: 0 18px 40px rgba(0,0,0,0.28);
      transition: transform 200ms ease, border-color 200ms ease;
    }
    .dd-card:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--dd-b) 55%, white); }
    .dd-shot, .dd-letter { height: 170px; background: linear-gradient(145deg, rgba(139,92,255,0.35), rgba(61,139,255,0.15)); }
    .dd-shot { width: 100%; height: 170px; object-fit: cover; }
    .dd-letter { display: grid; place-items: center; font-family: var(--dd-display); font-size: 3rem; font-weight: 700; }
    .dd-card div { padding: 16px 16px 18px; }
    .dd-card h3 { font-size: 1.25rem; letter-spacing: -0.03em; }
    .dd-muted { color: var(--dd-muted); font-size: 0.92rem; }
    .dd-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    .dd-chips li { list-style: none; font-size: 0.75rem; padding: 4px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.14); }
    .dd-card ul { margin: 8px 0 0; padding: 0; }
    .dd details { margin-top: 8px; color: var(--dd-muted); font-size: 0.9rem; }
    .dd summary { cursor: pointer; color: white; }
    .dd-rowlinks { display: flex; gap: 12px; margin-top: 10px; }
    .dd-rowlinks a { font-weight: 700; font-size: 0.85rem; color: #c9d8ff; }
    .dd-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .dd-cols:has(> :only-child) { grid-template-columns: 1fr; }
    .dd-panel { border-radius: 24px; padding: 18px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); }
    .dd-job { padding: 12px 0; border-top: 1px solid rgba(255,255,255,0.08); }
    .dd-job strong { display: block; }
    .dd-contact { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 22px; border-radius: 28px; border: 1px solid rgba(255,255,255,0.14); background: rgba(10,12,28,0.8); }
    .dd-form { display: grid; gap: 10px; }
    .dd-form input, .dd-form textarea {
      width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.14);
      background: rgba(255,255,255,0.04); color: white; padding: 12px; font: inherit;
    }
    .dd-form textarea { min-height: 100px; resize: vertical; }
    .dd-foot { position: relative; z-index: 1; padding: 18px 0 32px; color: var(--dd-muted); font-size: 0.85rem; }
    @media (max-width: 980px) {
      .dd-hero, .dd-grid, .dd-cols, .dd-contact { grid-template-columns: 1fr; }
      .dd-stage { min-height: 320px; }
    }
    @media (max-width: 720px) {
      .dd-wrap { width: min(1120px, calc(100% - 24px)); }
      .dd-burger { display: inline-grid; place-items: center; }
      .dd-links { display: none; position: absolute; top: calc(100% + 8px); left: 0; right: 0; flex-direction: column; align-items: stretch; padding: 12px; border-radius: 16px; background: rgba(10,12,28,0.96); border: 1px solid rgba(255,255,255,0.12); }
      .dd-nav { position: sticky; }
      .dd-nav.is-open .dd-links { display: flex; }
      .dd-hero { min-height: 0; padding-top: 32px; }
      .dd-glass, .dd-glass:nth-child(2), .dd-glass:nth-child(3) { position: relative; inset: auto; transform: none; margin-bottom: 10px; }
      .dd-stage { min-height: 0; }
      .dd-stage:hover .dd-glass { transform: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      .dd-sky i { animation: none; }
      .dd-card, .dd-glass { transition: none; }
    }
    ${customCss}
  </style>
</head>
<body class="dd">
  <div class="dd-sky" aria-hidden="true"><i></i></div>
  <header class="dd-nav" id="dd-nav">
    <a class="dd-logo" href="#dd-top">${esc(profile.name || 'Portfolio')}</a>
    <button class="dd-burger" type="button" aria-label="Open menu" onclick="document.getElementById('dd-nav').classList.toggle('is-open')">☰</button>
    <nav class="dd-links">
      ${nav('#dd-about', 'About', on('about') || on('hero'))}
      ${nav('#dd-skills', 'Skills', on('skills') && skills.length)}
      ${nav('#dd-work', 'Work', on('projects') && ordered.length)}
      ${nav('#dd-experience', 'Path', (on('experience') && experience.length) || (on('education') && education.length))}
      ${nav('#dd-contact', 'Contact', on('contact'))}
      ${resumeUrl ? `<a class="dd-pill" href="${esc(resumeUrl)}" target="_blank" rel="noopener">Resume</a>` : ''}
    </nav>
  </header>
  <main class="dd-wrap" id="dd-top">
    ${on('hero') ? `
    <section class="dd-hero" id="dd-about">
      <div>
        <div class="dd-kicker">${esc(profile.location || 'Portfolio')}</div>
        <h1>${esc(profile.name || 'Your Name')}</h1>
        ${profile.title ? `<p class="dd-grad" style="font-weight:700;font-size:1.15rem;margin-bottom:12px">${esc(profile.title)}</p>` : ''}
        ${on('about') && profile.bio ? `<p class="dd-bio">${esc(profile.bio)}</p>` : ''}
        <div class="dd-cta">
          ${on('contact') ? `<a class="dd-btn" href="${profile.email ? `mailto:${esc(profile.email)}` : '#dd-contact'}">Open a channel</a>` : ''}
          ${on('projects') && ordered.length ? `<a class="dd-btn-ghost" href="#dd-work">View systems</a>` : ''}
        </div>
      </div>
      <div class="dd-stage" aria-hidden="false">
        <article class="dd-glass">
          ${profile.avatar ? `<img class="dd-avatar" src="${esc(profile.avatar)}" alt="" />` : `<div class="dd-fallback">${initial}</div>`}
          <b>${esc(profile.name || 'Profile')}</b>
          <span>${esc(profile.title || 'Developer')}</span>
        </article>
        <article class="dd-glass">
          <span>Coordinates</span>
          <b>${esc(profile.location || 'Remote')}</b>
          <span>${skills.length} skills · ${experience.length} roles</span>
        </article>
        <article class="dd-glass">
          <span>In focus</span>
          <b>${esc(lead?.title || profile.title || 'Portfolio')}</b>
          <span>${esc(lead?.tagline || profile.location || '')}</span>
        </article>
      </div>
    </section>` : (on('about') && profile.bio ? `<section class="dd-section" id="dd-about"><p class="dd-bio">${esc(profile.bio)}</p></section>` : '')}

    ${on('skills') && skills.length ? `
    <section class="dd-section" id="dd-skills">
      <div class="dd-kicker">Signal map</div>
      <h2>Skills</h2>
      <div class="dd-orbit">
        ${skills.map((s) => {
          const level = skillLevel(s);
          return `<article class="dd-skill">
            <div class="dd-arc"><span style="width:${level == null ? 100 : level}%;opacity:${level == null ? 0.45 : 1}"></span></div>
            <strong>${esc(skillName(s))}</strong>
            ${level != null ? `<span class="dd-muted">${level}%</span>` : ''}
          </article>`;
        }).join('')}
      </div>
    </section>` : ''}

    ${on('projects') && ordered.length ? `
    <section class="dd-section" id="dd-work">
      <div class="dd-kicker">Launch record</div>
      <h2>Projects</h2>
      <div class="dd-grid">
        ${ordered.map((p) => {
          const features = (p.features || []).filter(Boolean);
          const media = p.thumbnail
            ? `<img class="dd-shot" src="${esc(p.thumbnail)}" alt="" />`
            : `<div class="dd-letter">${esc(((p.title || '?').charAt(0) || '?').toUpperCase())}</div>`;
          return `<article class="dd-card">
            ${media}
            <div>
              ${p.featured ? `<div class="dd-kicker">Featured</div>` : ''}
              <h3>${esc(p.title || 'Untitled project')}</h3>
              ${p.tagline ? `<p class="dd-muted">${esc(p.tagline)}</p>` : ''}
              ${(p.technologies || []).length ? `<ul class="dd-chips">${p.technologies.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
              ${(p.problem || p.solution || features.length || p.challenges || p.outcomes) ? `<details>
                <summary>Case notes</summary>
                ${p.problem ? `<p>${esc(p.problem)}</p>` : ''}
                ${p.solution ? `<p>${esc(p.solution)}</p>` : ''}
                ${features.length ? `<p>${features.map(featureLine).join('<br/>')}</p>` : ''}
                ${p.challenges ? `<p>${esc(p.challenges)}</p>` : ''}
                ${p.outcomes ? `<p>${esc(p.outcomes)}</p>` : ''}
              </details>` : ''}
              <div class="dd-rowlinks">
                ${p.liveUrl ? `<a href="${esc(p.liveUrl)}" target="_blank" rel="noopener">Live</a>` : ''}
                ${p.githubUrl ? `<a href="${esc(p.githubUrl)}" target="_blank" rel="noopener">Source</a>` : ''}
              </div>
            </div>
          </article>`;
        }).join('')}
      </div>
    </section>` : ''}

    ${(on('experience') && experience.length) || (on('education') && education.length) ? `
    <section class="dd-section" id="dd-experience">
      <div class="dd-cols">
        ${on('experience') && experience.length ? `<article class="dd-panel"><h2>Experience</h2>${experience.map((e) => `<div class="dd-job"><strong>${esc(e.role || e.title || 'Role')}</strong><span class="dd-muted">${esc([e.company, e.duration || e.period].filter(Boolean).join(' · '))}</span>${e.description ? `<p class="dd-muted">${esc(e.description)}</p>` : ''}</div>`).join('')}</article>` : ''}
        ${on('education') && education.length ? `<article class="dd-panel" id="dd-education"><h2>Education</h2>${education.map((e) => `<div class="dd-job"><strong>${esc(e.degree || 'Study')}</strong><span class="dd-muted">${esc([e.school, e.year, e.gpa ? `GPA ${e.gpa}` : ''].filter(Boolean).join(' · '))}</span>${e.description ? `<p class="dd-muted">${esc(e.description)}</p>` : ''}</div>`).join('')}</article>` : ''}
      </div>
    </section>` : ''}

    ${on('contact') ? `
    <section class="dd-section" id="dd-contact">
      <div class="dd-contact">
        <div>
          <div class="dd-kicker">Contact</div>
          <h2>Signal me.</h2>
          ${profile.email ? `<p style="margin-top:10px"><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></p>` : ''}
          ${profile.phone ? `<p class="dd-muted">${esc(profile.phone)}</p>` : ''}
          <div class="dd-rowlinks">${socials.map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('')}${resumeUrl ? `<a href="${esc(resumeUrl)}" target="_blank" rel="noopener">Resume</a>` : ''}</div>
        </div>
        <form class="dd-form" onsubmit="event.preventDefault(); this.reset(); this.querySelector('[data-note]').hidden=false;">
          <input required type="text" placeholder="Name" aria-label="Name"/>
          <input required type="email" placeholder="Email" aria-label="Email"/>
          <textarea required placeholder="Message" aria-label="Message"></textarea>
          <button class="dd-btn" type="submit">Transmit</button>
          <p data-note hidden class="dd-muted">Noted in this preview.</p>
        </form>
      </div>
    </section>` : ''}
  </main>
  <footer class="dd-wrap dd-foot">${esc(profile.name || 'Portfolio')} · ${year}</footer>
</body>
</html>`;
  },
};
