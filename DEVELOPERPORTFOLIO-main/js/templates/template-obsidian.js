/**
 * template-obsidian.js — Obsidian Luxe
 * Charcoal and champagne editorial portfolio. Scoped to .ol and --ol-* variables.
 */
window.TemplateObsidian = {
  name: 'Obsidian Luxe',
  id: 'obsidian',
  description: 'Charcoal cinematic layout with champagne accents and serif editorial type',

  render(profile, projects, config = {}) {
    const esc = (str) => String(str ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    const safeColor = (value, fallback) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value || '') ? value : fallback;
    const font = String(config.fontFamily || 'Inter').replace(/['"\\<>]/g, '') || 'Inter';
    const primary = safeColor(config.primaryColor, '#c6a15b');
    const show = config.showSections || {};
    const on = (key) => show[key] !== false;
    const customCss = config.customCss || '';
    const resumeUrl = profile.resumeUrl || '';
    const skillName = (s) => typeof s === 'object' && s ? (s.name || '') : String(s || '');
    const ordered = [...(projects || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const skills = (profile.skills || []).filter((s) => skillName(s));
    const experience = profile.experience || [];
    const education = profile.education || [];
    const initial = esc(((profile.name || '?').trim().charAt(0) || '?').toUpperCase());
    const year = new Date().getFullYear();
    const avatar = profile.avatar
      ? `<img class="ol-portrait" src="${esc(profile.avatar)}" alt="${esc(profile.name || 'Profile photo')}" />`
      : `<div class="ol-portrait ol-fallback">${initial}</div>`;
    const socials = [
      profile.social?.github && { href: profile.social.github, label: 'GitHub' },
      profile.social?.linkedin && { href: profile.social.linkedin, label: 'LinkedIn' },
      profile.social?.twitter && { href: profile.social.twitter, label: 'Twitter' },
      (profile.website || profile.social?.website) && { href: profile.website || profile.social.website, label: 'Website' },
    ].filter(Boolean);
    const nav = (href, label, visible) => visible
      ? `<a href="${href}" onclick="document.getElementById('ol-nav').classList.remove('is-open')">${label}</a>` : '';
    const featureLine = (f) => {
      if (typeof f === 'object' && f) {
        const title = f.title ? esc(f.title) : '';
        const desc = f.desc ? esc(f.desc) : '';
        return title && desc ? `${title} — ${desc}` : (title || desc);
      }
      return esc(f);
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${esc(profile.name || 'Portfolio')} — Obsidian Luxe</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=${encodeURIComponent(font)}:wght@400;500;600&display=swap" rel="stylesheet"/>
  <style>
    .ol, .ol *, .ol *::before, .ol *::after { box-sizing: border-box; }
    .ol {
      --ol-bg: #0b0b0b;
      --ol-ink: #f3eee6;
      --ol-muted: #b7b0a4;
      --ol-line: rgba(243, 238, 230, 0.12);
      --ol-gold: #c6a15b;
      --ol-accent: ${primary};
      --ol-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
      --ol-sans: '${font}', 'Segoe UI', sans-serif;
      margin: 0;
      min-height: 100vh;
      color: var(--ol-ink);
      background:
        radial-gradient(900px 420px at 50% -10%, rgba(198,161,91,0.14), transparent 55%),
        linear-gradient(180deg, #12110f 0%, #0b0b0b 38%, #0e0d0c 100%);
      font-family: var(--ol-sans);
      font-size: 16px;
      line-height: 1.65;
      overflow-x: hidden;
    }
    .ol::before {
      content: "";
      pointer-events: none;
      position: fixed;
      inset: 0;
      opacity: 0.05;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.55'/></svg>");
    }
    .ol a { color: inherit; text-decoration: none; }
    .ol img { max-width: 100%; display: block; }
    .ol h1, .ol h2, .ol h3, .ol p { margin: 0; overflow-wrap: anywhere; }
    .ol-wrap { width: min(1080px, calc(100% - 48px)); margin: 0 auto; position: relative; z-index: 1; }
    .ol-nav {
      position: sticky; top: 0; z-index: 20;
      display: flex; align-items: center; justify-content: space-between; gap: 18px;
      padding: 18px 0;
      border-bottom: 1px solid var(--ol-line);
      background: rgba(11,11,11,0.86);
      backdrop-filter: blur(12px);
      width: min(1080px, calc(100% - 48px));
      margin: 0 auto;
    }
    .ol-brand { font-family: var(--ol-serif); font-size: 1.45rem; letter-spacing: 0.01em; }
    .ol-links { display: flex; gap: 22px; align-items: center; flex-wrap: wrap; justify-content: flex-end; }
    .ol-links a { font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ol-muted); }
    .ol-links a:hover { color: var(--ol-ink); }
    .ol-burger { display: none; background: transparent; border: 1px solid var(--ol-line); color: var(--ol-ink); width: 42px; height: 42px; cursor: pointer; }
    .ol-hero { min-height: calc(100vh - 78px); display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 48px; align-items: end; padding: 72px 0 64px; }
    .ol-eyebrow { font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ol-gold); }
    .ol-hero h1 {
      font-family: var(--ol-serif); font-weight: 500;
      font-size: clamp(3.4rem, 8vw, 7.2rem); line-height: 0.88; letter-spacing: -0.03em;
      margin: 18px 0 20px;
    }
    .ol-rule { width: 56px; height: 1px; background: var(--ol-gold); margin: 8px 0 18px; }
    .ol-title { letter-spacing: 0.18em; text-transform: uppercase; font-size: 0.78rem; color: var(--ol-muted); }
    .ol-bio { max-width: 36rem; margin-top: 18px; color: #d9d2c6; font-size: 1.05rem; }
    .ol-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
    .ol-btn, .ol-btn-solid {
      min-height: 44px; padding: 0 18px; display: inline-flex; align-items: center;
      border: 1px solid rgba(198,161,91,0.75); letter-spacing: 0.14em; text-transform: uppercase;
      font-size: 0.68rem; background: transparent; color: var(--ol-ink); transition: background 200ms ease, color 200ms ease;
    }
    .ol-btn:hover, .ol-btn-solid { background: var(--ol-gold); color: #16130e; }
    .ol-btn-solid { border-color: var(--ol-accent); }
    .ol-frame { border: 1px solid var(--ol-line); padding: 12px; }
    .ol-portrait, .ol-fallback { width: 100%; aspect-ratio: 4/5; object-fit: cover; }
    .ol-fallback {
      display: grid; place-items: center; font-family: var(--ol-serif); font-size: 5rem;
      background: linear-gradient(180deg, #1a1814, #0e0d0b); color: var(--ol-gold);
    }
    .ol-meta { display: flex; justify-content: space-between; gap: 12px; margin-top: 10px; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ol-muted); }
    .ol-section { padding: 28px 0 10px; position: relative; z-index: 1; }
    .ol-section h2 { font-family: var(--ol-serif); font-weight: 500; font-size: clamp(2.2rem, 4vw, 3.4rem); letter-spacing: -0.02em; }
    .ol-skills { display: flex; flex-wrap: wrap; gap: 0; margin-top: 22px; border-top: 1px solid var(--ol-line); }
    .ol-skills li { padding: 14px 18px 14px 0; margin-right: 18px; border-bottom: 1px solid var(--ol-line); font-size: 0.95rem; }
    .ol-project { display: grid; grid-template-columns: 160px 1fr 220px; gap: 28px; padding: 36px 0; border-top: 1px solid var(--ol-line); align-items: start; }
    .ol-index { font-family: var(--ol-serif); font-size: 2rem; color: var(--ol-gold); }
    .ol-project h3 { font-family: var(--ol-serif); font-size: clamp(1.8rem, 3vw, 2.7rem); font-weight: 500; line-height: 1; }
    .ol-tag { margin-top: 8px; color: var(--ol-muted); }
    .ol-tech { margin-top: 12px; color: var(--ol-gold); font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; }
    .ol-shot, .ol-shot-fallback { width: 100%; aspect-ratio: 4/3; object-fit: cover; background: #161411; }
    .ol-shot-fallback { display: grid; place-items: center; font-family: var(--ol-serif); font-size: 2.4rem; color: var(--ol-gold); }
    .ol-links-row { display: flex; gap: 16px; margin-top: 14px; }
    .ol-links-row a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border-bottom: 1px solid var(--ol-gold); }
    .ol-case { margin-top: 12px; color: #d5cec3; font-size: 0.95rem; }
    .ol-case summary { cursor: pointer; letter-spacing: 0.12em; text-transform: uppercase; font-size: 0.7rem; color: var(--ol-muted); }
    .ol-timeline { margin-top: 8px; }
    .ol-job { display: grid; grid-template-columns: 200px 1fr; gap: 24px; padding: 22px 0; border-top: 1px solid var(--ol-line); }
    .ol-job strong { font-family: var(--ol-serif); font-size: 1.6rem; font-weight: 500; display: block; }
    .ol-when { color: var(--ol-gold); font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; }
    .ol-contact { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; padding: 48px 0 20px; border-top: 1px solid var(--ol-line); }
    .ol-contact h2 { font-size: clamp(2.6rem, 6vw, 4.6rem); line-height: 0.92; }
    .ol-mail { display: inline-block; margin-top: 16px; font-size: 1.05rem; border-bottom: 1px solid var(--ol-gold); overflow-wrap: anywhere; }
    .ol-form { display: grid; gap: 10px; }
    .ol-form input, .ol-form textarea {
      width: 100%; background: transparent; color: var(--ol-ink);
      border: 0; border-bottom: 1px solid var(--ol-line); padding: 12px 0; font: inherit;
    }
    .ol-form textarea { min-height: 90px; resize: vertical; }
    .ol-foot { padding: 28px 0 40px; color: var(--ol-muted); font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; position: relative; z-index: 1; }
    @media (max-width: 900px) {
      .ol-hero, .ol-project, .ol-job, .ol-contact { grid-template-columns: 1fr; }
      .ol-project { gap: 14px; }
    }
    @media (max-width: 720px) {
      .ol-wrap, .ol-nav { width: min(1080px, calc(100% - 28px)); }
      .ol-burger { display: inline-flex; align-items: center; justify-content: center; }
      .ol-links { display: none; position: absolute; top: 100%; left: 0; right: 0; background: #111; padding: 16px; border-bottom: 1px solid var(--ol-line); flex-direction: column; align-items: flex-start; }
      .ol-nav.is-open .ol-links { display: flex; }
      .ol-hero { min-height: 0; padding-top: 42px; }
      .ol-hero h1 { font-size: clamp(2.8rem, 14vw, 4.2rem); }
    }
    @media (prefers-reduced-motion: reduce) {
      .ol-btn { transition: none; }
    }
    ${customCss}
  </style>
</head>
<body class="ol">
  <header class="ol-nav" id="ol-nav">
    <a class="ol-brand" href="#ol-top">${esc(profile.name || 'Portfolio')}</a>
    <button class="ol-burger" type="button" aria-label="Open menu" onclick="document.getElementById('ol-nav').classList.toggle('is-open')">Menu</button>
    <nav class="ol-links" aria-label="Portfolio">
      ${nav('#ol-about', 'About', on('about'))}
      ${nav('#ol-skills', 'Skills', on('skills') && skills.length)}
      ${nav('#ol-work', 'Work', on('projects') && ordered.length)}
      ${nav('#ol-experience', 'Experience', on('experience') && experience.length)}
      ${nav('#ol-education', 'Education', on('education') && education.length)}
      ${nav('#ol-contact', 'Contact', on('contact'))}
    </nav>
  </header>
  <main class="ol-wrap" id="ol-top">
    ${on('hero') ? `
    <section class="ol-hero">
      <div>
        <div class="ol-eyebrow">${esc(profile.location || 'Portfolio')}</div>
        <h1>${esc(profile.name || 'Your Name')}</h1>
        <div class="ol-rule"></div>
        ${profile.title ? `<div class="ol-title">${esc(profile.title)}</div>` : ''}
        ${on('about') && profile.bio ? `<p class="ol-bio" id="ol-about">${esc(profile.bio)}</p>` : '<div id="ol-about"></div>'}
        <div class="ol-cta">
          ${profile.email ? `<a class="ol-btn-solid" href="mailto:${esc(profile.email)}">Enquire</a>` : (on('contact') ? `<a class="ol-btn-solid" href="#ol-contact">Enquire</a>` : '')}
          ${resumeUrl ? `<a class="ol-btn" href="${esc(resumeUrl)}" target="_blank" rel="noopener">Resume</a>` : ''}
        </div>
      </div>
      <aside class="ol-frame">
        ${avatar}
        <div class="ol-meta"><span>${esc(profile.title || 'Profile')}</span><span>${year}</span></div>
      </aside>
    </section>` : (on('about') && profile.bio ? `<section class="ol-section" id="ol-about"><p class="ol-bio">${esc(profile.bio)}</p></section>` : '')}

    ${on('skills') && skills.length ? `
    <section class="ol-section" id="ol-skills">
      <div class="ol-eyebrow">Expertise</div>
      <h2>A considered practice</h2>
      <ul class="ol-skills">${skills.map((s) => `<li>${esc(skillName(s))}</li>`).join('')}</ul>
    </section>` : ''}

    ${on('projects') && ordered.length ? `
    <section class="ol-section" id="ol-work">
      <div class="ol-eyebrow">Selected work</div>
      <h2>Projects</h2>
      ${ordered.map((p, i) => {
        const features = (p.features || []).filter(Boolean);
        const shot = p.thumbnail
          ? `<img class="ol-shot" src="${esc(p.thumbnail)}" alt="" />`
          : `<div class="ol-shot-fallback">${esc(((p.title || '?').charAt(0) || '?').toUpperCase())}</div>`;
        return `<article class="ol-project">
          <div>
            <div class="ol-index">${String(i + 1).padStart(2, '0')}</div>
            ${p.featured ? `<div class="ol-eyebrow" style="margin-top:8px">Featured</div>` : ''}
          </div>
          <div>
            <h3>${esc(p.title || 'Untitled project')}</h3>
            ${p.tagline ? `<p class="ol-tag">${esc(p.tagline)}</p>` : ''}
            ${(p.technologies || []).length ? `<div class="ol-tech">${p.technologies.map((t) => esc(t)).join('  /  ')}</div>` : ''}
            ${(p.problem || p.solution || features.length || p.challenges || p.outcomes) ? `
            <details class="ol-case">
              <summary>Read the case</summary>
              ${p.problem ? `<p>${esc(p.problem)}</p>` : ''}
              ${p.solution ? `<p>${esc(p.solution)}</p>` : ''}
              ${features.length ? `<p>${features.map(featureLine).join(' · ')}</p>` : ''}
              ${p.challenges ? `<p>${esc(p.challenges)}</p>` : ''}
              ${p.outcomes ? `<p>${esc(p.outcomes)}</p>` : ''}
            </details>` : ''}
            <div class="ol-links-row">
              ${p.liveUrl ? `<a href="${esc(p.liveUrl)}" target="_blank" rel="noopener">Live</a>` : ''}
              ${p.githubUrl ? `<a href="${esc(p.githubUrl)}" target="_blank" rel="noopener">Source</a>` : ''}
            </div>
          </div>
          <div>${shot}</div>
        </article>`;
      }).join('')}
    </section>` : ''}

    ${on('experience') && experience.length ? `
    <section class="ol-section" id="ol-experience">
      <div class="ol-eyebrow">Career</div>
      <h2>Experience</h2>
      <div class="ol-timeline">
        ${experience.map((e) => `<article class="ol-job">
          <div class="ol-when">${esc(e.duration || e.period || '')}</div>
          <div>
            <strong>${esc(e.role || e.title || 'Role')}</strong>
            <div class="ol-tag">${esc(e.company || '')}</div>
            ${e.description ? `<p class="ol-tag">${esc(e.description)}</p>` : ''}
          </div>
        </article>`).join('')}
      </div>
    </section>` : ''}

    ${on('education') && education.length ? `
    <section class="ol-section" id="ol-education">
      <div class="ol-eyebrow">Study</div>
      <h2>Education</h2>
      <div class="ol-timeline">
        ${education.map((e) => `<article class="ol-job">
          <div class="ol-when">${esc([e.year, e.gpa ? `GPA ${e.gpa}` : ''].filter(Boolean).join(' · '))}</div>
          <div>
            <strong>${esc(e.degree || 'Study')}</strong>
            <div class="ol-tag">${esc(e.school || '')}</div>
            ${e.description ? `<p class="ol-tag">${esc(e.description)}</p>` : ''}
          </div>
        </article>`).join('')}
      </div>
    </section>` : ''}

    ${on('contact') ? `
    <section class="ol-contact" id="ol-contact">
      <div>
        <div class="ol-eyebrow">Contact</div>
        <h2>A quiet introduction is welcome.</h2>
        ${profile.email ? `<a class="ol-mail" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>` : ''}
        ${profile.phone ? `<p class="ol-tag" style="margin-top:10px">${esc(profile.phone)}</p>` : ''}
        ${profile.location ? `<p class="ol-tag">${esc(profile.location)}</p>` : ''}
        <div class="ol-links-row">
          ${socials.map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('')}
          ${resumeUrl ? `<a href="${esc(resumeUrl)}" target="_blank" rel="noopener">Resume</a>` : ''}
        </div>
      </div>
      <form class="ol-form" onsubmit="event.preventDefault(); this.reset(); this.querySelector('[data-note]').hidden=false;">
        <input required type="text" placeholder="Name" aria-label="Name"/>
        <input required type="email" placeholder="Email" aria-label="Email"/>
        <textarea required placeholder="Message" aria-label="Message"></textarea>
        <button class="ol-btn" type="submit">Send</button>
        <p data-note hidden class="ol-tag">Received in this preview.</p>
      </form>
    </section>` : ''}
  </main>
  <footer class="ol-wrap ol-foot">${esc(profile.name || 'Portfolio')} · ${year}</footer>
</body>
</html>`;
  },
};
