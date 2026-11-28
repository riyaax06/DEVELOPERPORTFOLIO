/**
 * template-canvas.js — Bold Canvas
 * Editorial black, paper, and red portfolio. Scoped to .bc and --bc-* variables.
 */
window.TemplateCanvas = {
  name: 'Bold Canvas',
  id: 'canvas',
  description: 'Oversized editorial type, asymmetric grids, and a strict black, paper, and red palette',

  render(profile, projects, config = {}) {
    const esc = (str) => String(str ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    const safeColor = (value, fallback) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value || '') ? value : fallback;
    const font = String(config.fontFamily || 'Inter').replace(/['"\\<>]/g, '') || 'Inter';
    const accent = safeColor(config.primaryColor, '#e10600');
    const signature = (accent.toLowerCase() === '#3b82f6') ? '#e10600' : accent;
    const show = config.showSections || {};
    const on = (key) => show[key] !== false;
    const customCss = config.customCss || '';
    const resumeUrl = profile.resumeUrl || '';
    const skillName = (s) => typeof s === 'object' && s ? (s.name || '') : String(s || '');
    const ordered = [...(projects || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const skills = (profile.skills || []).filter((s) => skillName(s));
    const experience = profile.experience || [];
    const education = profile.education || [];
    const year = new Date().getFullYear();
    const socials = [
      profile.social?.github && { href: profile.social.github, label: 'GitHub' },
      profile.social?.linkedin && { href: profile.social.linkedin, label: 'LinkedIn' },
      profile.social?.twitter && { href: profile.social.twitter, label: 'Twitter' },
      (profile.website || profile.social?.website) && { href: profile.website || profile.social.website, label: 'Website' },
    ].filter(Boolean);
    const nav = (href, label, visible) => visible
      ? `<a href="${href}" onclick="document.getElementById('bc-nav').classList.remove('is-open')">${label}</a>` : '';
    const featureLine = (f) => {
      if (typeof f === 'object' && f) {
        const title = f.title ? esc(f.title) : '';
        const desc = f.desc ? esc(f.desc) : '';
        return title && desc ? `${title}: ${desc}` : (title || desc);
      }
      return esc(f);
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${esc(profile.name || 'Portfolio')} — Bold Canvas</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=${encodeURIComponent(font)}:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    .bc, .bc *, .bc *::before, .bc *::after { box-sizing: border-box; }
    .bc {
      --bc-ink: #111111;
      --bc-paper: #f4f1ea;
      --bc-red: ${signature};
      --bc-muted: #4c4a45;
      --bc-display: 'Syne', 'Arial Black', 'Segoe UI', sans-serif;
      --bc-font: '${font}', 'Segoe UI', sans-serif;
      margin: 0;
      background: var(--bc-paper);
      color: var(--bc-ink);
      font-family: var(--bc-font);
      font-size: 16px;
      line-height: 1.5;
      overflow-x: hidden;
    }
    .bc a { color: inherit; text-decoration: none; }
    .bc img { max-width: 100%; display: block; }
    .bc h1, .bc h2, .bc h3, .bc p { margin: 0; overflow-wrap: anywhere; }
    .bc-nav {
      position: sticky; top: 0; z-index: 20;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      padding: 14px 22px;
      background: var(--bc-paper);
      border-bottom: 2px solid var(--bc-ink);
    }
    .bc-mark { font-family: var(--bc-display); font-weight: 800; letter-spacing: -0.04em; font-size: 1.2rem; }
    .bc-mark i { color: var(--bc-red); font-style: normal; }
    .bc-links { display: flex; gap: 18px; align-items: center; flex-wrap: wrap; justify-content: flex-end; font-weight: 700; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.08em; }
    .bc-links a:hover { color: var(--bc-red); }
    .bc-burger { display: none; border: 2px solid var(--bc-ink); background: transparent; font: inherit; font-weight: 800; padding: 6px 10px; cursor: pointer; }
    .bc-hero { padding: 28px 22px 10px; display: grid; grid-template-columns: 1.4fr 0.6fr; gap: 24px; align-items: end; }
    .bc-index { font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; font-size: 0.75rem; }
    .bc-index span { color: var(--bc-red); }
    .bc-hero h1 {
      font-family: var(--bc-display); font-weight: 800; text-transform: uppercase;
      font-size: clamp(3.4rem, 11vw, 8.4rem); line-height: 0.82; letter-spacing: -0.055em;
      margin: 8px 0 16px;
    }
    .bc-hero-side { border-left: 8px solid var(--bc-red); padding: 4px 0 8px 16px; }
    .bc-role { font-family: var(--bc-display); font-weight: 700; font-size: 1.35rem; line-height: 1.15; }
    .bc-bio { margin-top: 12px; color: var(--bc-muted); font-size: 1.02rem; max-width: 34rem; }
    .bc-cta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
    .bc-btn, .bc-btn-line {
      min-height: 44px; padding: 0 14px; display: inline-flex; align-items: center;
      font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.75rem;
      border: 2px solid var(--bc-ink);
    }
    .bc-btn { background: var(--bc-ink); color: var(--bc-paper); }
    .bc-btn:hover { background: var(--bc-red); border-color: var(--bc-red); }
    .bc-btn-line { background: transparent; }
    .bc-btn-line:hover { background: var(--bc-ink); color: var(--bc-paper); }
    .bc-band {
      margin-top: 28px; background: var(--bc-ink); color: var(--bc-paper);
      display: flex; justify-content: space-between; gap: 16px; align-items: center;
      padding: 14px 22px; font-family: var(--bc-display); font-weight: 800;
      letter-spacing: 0.12em; text-transform: uppercase;
    }
    .bc-band b { color: var(--bc-red); }
    .bc-section { padding: 28px 22px; }
    .bc-skills { display: grid; grid-template-columns: 180px 1fr; gap: 18px; align-items: start; }
    .bc-skillline { display: flex; flex-wrap: wrap; border-top: 2px solid var(--bc-ink); }
    .bc-skillline span { padding: 12px 16px; border-right: 2px solid var(--bc-ink); border-bottom: 2px solid var(--bc-ink); font-weight: 750; }
    .bc-work { display: flex; flex-direction: column; }
    .bc-proj {
      display: grid; grid-template-columns: 90px 1.1fr 0.9fr; gap: 18px;
      padding: 22px 0; border-top: 2px solid var(--bc-ink); align-items: stretch;
    }
    .bc-num { font-family: var(--bc-display); font-weight: 800; font-size: 2rem; color: var(--bc-red); }
    .bc-proj h3 { font-family: var(--bc-display); font-weight: 800; text-transform: uppercase; font-size: clamp(1.6rem, 3vw, 2.8rem); line-height: 0.9; letter-spacing: -0.04em; }
    .bc-tag { margin-top: 8px; color: var(--bc-muted); }
    .bc-tech { margin-top: 8px; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; }
    .bc-shot, .bc-letter { width: 100%; height: 100%; min-height: 160px; object-fit: cover; background: #ddd7cc; }
    .bc-letter { display: grid; place-items: center; font-family: var(--bc-display); font-size: 3rem; font-weight: 800; background: var(--bc-ink); color: var(--bc-paper); }
    .bc-proj:nth-child(even) .bc-letter { background: var(--bc-red); }
    .bc details { margin-top: 8px; }
    .bc summary { cursor: pointer; font-weight: 800; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.08em; }
    .bc-inline { display: flex; gap: 14px; margin-top: 10px; font-weight: 800; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.08em; }
    .bc-inline a { border-bottom: 2px solid var(--bc-red); }
    .bc-split { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 2px solid var(--bc-ink); }
    .bc-split:has(> :only-child) { grid-template-columns: 1fr; }
    .bc-col { padding: 22px; }
    .bc-col + .bc-col { border-left: 2px solid var(--bc-ink); }
    .bc-col h2, .bc-skills h2, .bc-contact h2 { font-family: var(--bc-display); font-weight: 800; text-transform: uppercase; letter-spacing: -0.04em; font-size: clamp(2rem, 4vw, 3rem); line-height: 0.9; }
    .bc-item { padding: 14px 0; border-top: 2px solid var(--bc-ink); }
    .bc-item strong { display: block; font-size: 1.15rem; }
    .bc-contact { display: grid; grid-template-columns: 1.1fr 0.9fr; min-height: 320px; }
    .bc-contact-copy { background: var(--bc-ink); color: var(--bc-paper); padding: 28px 22px; }
    .bc-contact-copy a { border-bottom: 2px solid var(--bc-red); overflow-wrap: anywhere; }
    .bc-form { padding: 28px 22px; display: grid; gap: 10px; align-content: start; }
    .bc-form input, .bc-form textarea { width: 100%; border: 2px solid var(--bc-ink); background: transparent; padding: 12px; font: inherit; color: inherit; }
    .bc-form textarea { min-height: 110px; resize: vertical; }
    .bc-foot { padding: 18px 22px 28px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; font-size: 0.75rem; }
    @media (max-width: 900px) {
      .bc-hero, .bc-proj, .bc-skills, .bc-split, .bc-contact { grid-template-columns: 1fr; }
      .bc-col + .bc-col { border-left: 0; border-top: 2px solid var(--bc-ink); }
      .bc-hero-side { border-left: 0; border-top: 8px solid var(--bc-red); padding: 14px 0 0; }
    }
    @media (max-width: 720px) {
      .bc-burger { display: inline-block; }
      .bc-links { display: none; position: absolute; left: 0; right: 0; top: 100%; background: var(--bc-paper); border-bottom: 2px solid var(--bc-ink); flex-direction: column; align-items: flex-start; padding: 12px 22px 16px; }
      .bc-nav.is-open .bc-links { display: flex; }
      .bc-hero { padding: 20px 16px 8px; }
      .bc-section, .bc-band, .bc-nav, .bc-foot { padding-left: 16px; padding-right: 16px; }
      .bc-hero h1 { font-size: clamp(2.8rem, 16vw, 4.4rem); }
    }
    @media (prefers-reduced-motion: reduce) {
      .bc-btn, .bc-btn-line { transition: none; }
    }
    ${customCss}
  </style>
</head>
<body class="bc">
  <header class="bc-nav" id="bc-nav">
    <a class="bc-mark" href="#bc-top">${esc((profile.name || 'Portfolio').split(' ')[0])}<i>.</i></a>
    <button class="bc-burger" type="button" aria-label="Open menu" onclick="document.getElementById('bc-nav').classList.toggle('is-open')">Menu</button>
    <nav class="bc-links">
      ${nav('#bc-about', 'About', on('about') || on('hero'))}
      ${nav('#bc-skills', 'Skills', on('skills') && skills.length)}
      ${nav('#bc-work', 'Work', on('projects') && ordered.length)}
      ${nav('#bc-experience', 'Experience', on('experience') && experience.length)}
      ${nav('#bc-education', 'Education', on('education') && education.length)}
      ${nav('#bc-contact', 'Contact', on('contact'))}
    </nav>
  </header>
  <main id="bc-top">
    ${on('hero') ? `
    <section class="bc-hero" id="bc-about">
      <div>
        <div class="bc-index"><span>01</span> — Portfolio ${year}</div>
        <h1>${esc(profile.name || 'Your Name')}</h1>
      </div>
      <div class="bc-hero-side">
        ${profile.title ? `<div class="bc-role">${esc(profile.title)}</div>` : ''}
        ${profile.location ? `<p class="bc-tag">${esc(profile.location)}</p>` : ''}
        ${on('about') && profile.bio ? `<p class="bc-bio">${esc(profile.bio)}</p>` : ''}
        <div class="bc-cta">
          ${on('contact') ? `<a class="bc-btn" href="${profile.email ? `mailto:${esc(profile.email)}` : '#bc-contact'}">Contact</a>` : ''}
          ${resumeUrl ? `<a class="bc-btn-line" href="${esc(resumeUrl)}" target="_blank" rel="noopener">Resume</a>` : ''}
        </div>
      </div>
    </section>` : (on('about') && profile.bio ? `<section class="bc-section" id="bc-about"><p class="bc-bio">${esc(profile.bio)}</p></section>` : '')}

    ${on('skills') && skills.length ? `
    <section class="bc-section" id="bc-skills">
      <div class="bc-skills">
        <h2>Skills</h2>
        <div class="bc-skillline">${skills.map((s) => `<span>${esc(skillName(s))}</span>`).join('')}</div>
      </div>
    </section>` : ''}

    ${on('projects') && ordered.length ? `
    <div class="bc-band" id="bc-work"><span>Selected work</span><b>${String(ordered.length).padStart(2, '0')}</b></div>
    <section class="bc-section bc-work">
      ${ordered.map((p, i) => {
        const features = (p.features || []).filter(Boolean);
        const media = p.thumbnail
          ? `<img class="bc-shot" src="${esc(p.thumbnail)}" alt="" />`
          : `<div class="bc-letter">${esc(((p.title || '?').charAt(0) || '?').toUpperCase())}</div>`;
        return `<article class="bc-proj">
          <div class="bc-num">${String(i + 1).padStart(2, '0')}</div>
          <div>
            ${p.featured ? `<div class="bc-index"><span>Featured</span></div>` : ''}
            <h3>${esc(p.title || 'Untitled')}</h3>
            ${p.tagline ? `<p class="bc-tag">${esc(p.tagline)}</p>` : ''}
            ${(p.technologies || []).length ? `<div class="bc-tech">${p.technologies.map((t) => esc(t)).join(' / ')}</div>` : ''}
            ${(p.problem || p.solution || features.length || p.challenges || p.outcomes) ? `<details>
              <summary>Case</summary>
              ${p.problem ? `<p>${esc(p.problem)}</p>` : ''}
              ${p.solution ? `<p>${esc(p.solution)}</p>` : ''}
              ${features.length ? `<p>${features.map(featureLine).join(' · ')}</p>` : ''}
              ${p.challenges ? `<p>${esc(p.challenges)}</p>` : ''}
              ${p.outcomes ? `<p>${esc(p.outcomes)}</p>` : ''}
            </details>` : ''}
            <div class="bc-inline">
              ${p.liveUrl ? `<a href="${esc(p.liveUrl)}" target="_blank" rel="noopener">Live</a>` : ''}
              ${p.githubUrl ? `<a href="${esc(p.githubUrl)}" target="_blank" rel="noopener">Source</a>` : ''}
            </div>
          </div>
          <div>${media}</div>
        </article>`;
      }).join('')}
    </section>` : ''}

    ${(on('experience') && experience.length) || (on('education') && education.length) ? `
    <section class="bc-split" id="bc-experience">
      ${on('experience') && experience.length ? `<div class="bc-col"><h2>Experience</h2>${experience.map((e) => `<article class="bc-item"><strong>${esc(e.role || e.title || 'Role')}</strong><span>${esc([e.company, e.duration || e.period].filter(Boolean).join(' · '))}</span>${e.description ? `<p class="bc-tag">${esc(e.description)}</p>` : ''}</article>`).join('')}</div>` : ''}
      ${on('education') && education.length ? `<div class="bc-col" id="bc-education"><h2>Education</h2>${education.map((e) => `<article class="bc-item"><strong>${esc(e.degree || 'Study')}</strong><span>${esc([e.school, e.year, e.gpa ? `GPA ${e.gpa}` : ''].filter(Boolean).join(' · '))}</span>${e.description ? `<p class="bc-tag">${esc(e.description)}</p>` : ''}</article>`).join('')}</div>` : ''}
    </section>` : ''}

    ${on('contact') ? `
    <section class="bc-contact" id="bc-contact">
      <div class="bc-contact-copy">
        <div class="bc-index"><span>Contact</span></div>
        <h2 style="margin:10px 0 16px">Say it plain.</h2>
        ${profile.email ? `<p><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></p>` : ''}
        ${profile.phone ? `<p style="margin-top:8px">${esc(profile.phone)}</p>` : ''}
        ${profile.location ? `<p>${esc(profile.location)}</p>` : ''}
        <div class="bc-inline">${socials.map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('')}${resumeUrl ? `<a href="${esc(resumeUrl)}" target="_blank" rel="noopener">Resume</a>` : ''}</div>
      </div>
      <form class="bc-form" onsubmit="event.preventDefault(); this.reset(); this.querySelector('[data-note]').hidden=false;">
        <input required type="text" placeholder="Name" aria-label="Name"/>
        <input required type="email" placeholder="Email" aria-label="Email"/>
        <textarea required placeholder="Message" aria-label="Message"></textarea>
        <button class="bc-btn" type="submit">Send</button>
        <p data-note hidden>Received in this preview.</p>
      </form>
    </section>` : ''}
  </main>
  <footer class="bc-foot">${esc(profile.name || 'Portfolio')} · ${year}</footer>
</body>
</html>`;
  },
};
