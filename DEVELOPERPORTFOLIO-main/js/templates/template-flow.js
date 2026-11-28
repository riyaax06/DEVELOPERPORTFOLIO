/**
 * template-flow.js — Creative Flow
 * Warm editorial portfolio with organic shapes and a staggered story layout.
 * Scoped to .cf and --cf-* variables.
 * Added because the approved Creative Flow concept was not present in the repository.
 */
window.TemplateFlow = {
  name: 'Creative Flow',
  id: 'flow',
  description: 'Organic editorial flow — serif headlines, clay and moss accents, staggered story bands',

  render(profile, projects, config = {}) {
    const esc = (str) => String(str ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    const safeColor = (value, fallback) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value || '') ? value : fallback;
    const font = String(config.fontFamily || 'Inter').replace(/['"\\<>]/g, '') || 'Inter';
    const clay = safeColor(config.primaryColor, '#d85a3a');
    const moss = safeColor(config.secondaryColor, '#1f6b58');
    const clayFixed = clay.toLowerCase() === '#3b82f6' ? '#d85a3a' : clay;
    const mossFixed = moss.toLowerCase() === '#8b5cf6' ? '#1f6b58' : moss;
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
    const socials = [
      profile.social?.github && { href: profile.social.github, label: 'GitHub' },
      profile.social?.linkedin && { href: profile.social.linkedin, label: 'LinkedIn' },
      profile.social?.twitter && { href: profile.social.twitter, label: 'Twitter' },
      (profile.website || profile.social?.website) && { href: profile.website || profile.social.website, label: 'Website' },
    ].filter(Boolean);
    const nav = (href, label, visible) => visible
      ? `<a href="${href}" onclick="document.getElementById('cf-nav').classList.remove('is-open')">${label}</a>` : '';
    const featureLine = (f) => {
      if (typeof f === 'object' && f) {
        const title = f.title ? esc(f.title) : '';
        const desc = f.desc ? esc(f.desc) : '';
        return title && desc ? `${title} — ${desc}` : (title || desc);
      }
      return esc(f);
    };
    const portrait = profile.avatar
      ? `<img class="cf-blob" src="${esc(profile.avatar)}" alt="${esc(profile.name || 'Profile photo')}" />`
      : `<div class="cf-blob cf-fallback">${initial}</div>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${esc(profile.name || 'Portfolio')} — Creative Flow</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=${encodeURIComponent(font)}:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    .cf, .cf *, .cf *::before, .cf *::after { box-sizing: border-box; }
    .cf {
      --cf-ink: #1c1714;
      --cf-muted: #6a5f57;
      --cf-paper: #fff8f1;
      --cf-clay: ${clayFixed};
      --cf-moss: ${mossFixed};
      --cf-serif: 'Instrument Serif', Georgia, 'Times New Roman', serif;
      --cf-sans: '${font}', 'Segoe UI', sans-serif;
      margin: 0;
      background:
        radial-gradient(700px 320px at 100% 0%, rgba(216,90,58,0.13), transparent 60%),
        radial-gradient(640px 280px at 0% 20%, rgba(31,107,88,0.12), transparent 55%),
        var(--cf-paper);
      color: var(--cf-ink);
      font-family: var(--cf-sans);
      font-size: 16px;
      line-height: 1.6;
      overflow-x: hidden;
    }
    .cf a { color: inherit; text-decoration: none; }
    .cf img { max-width: 100%; display: block; }
    .cf h1, .cf h2, .cf h3, .cf p { margin: 0; overflow-wrap: anywhere; }
    .cf-nav {
      position: sticky; top: 0; z-index: 20;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 16px 28px;
      background: rgba(255,248,241,0.9);
      backdrop-filter: blur(10px);
    }
    .cf-logo { font-family: var(--cf-serif); font-size: 1.5rem; font-style: italic; }
    .cf-links { display: flex; gap: 18px; align-items: center; flex-wrap: wrap; justify-content: flex-end; }
    .cf-links a { font-size: 0.92rem; color: var(--cf-muted); }
    .cf-links a:hover { color: var(--cf-clay); }
    .cf-burger { display: none; border: 0; background: transparent; font: inherit; font-weight: 700; cursor: pointer; color: var(--cf-ink); }
    .cf-hero { width: min(1120px, calc(100% - 48px)); margin: 0 auto; padding: 18px 0 0; display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 20px; align-items: end; }
    .cf-kicker { letter-spacing: 0.18em; text-transform: uppercase; font-size: 0.72rem; font-weight: 700; color: var(--cf-moss); }
    .cf-hero h1 { font-family: var(--cf-serif); font-weight: 400; font-size: clamp(3.4rem, 8vw, 7rem); line-height: 0.9; letter-spacing: -0.03em; margin: 8px 0; }
    .cf-hero h1 em { font-style: italic; color: var(--cf-clay); }
    .cf-role { font-size: 1.2rem; }
    .cf-bio { margin-top: 14px; max-width: 38rem; color: #3f3732; font-size: 1.08rem; }
    .cf-cta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
    .cf-btn, .cf-btn-ghost {
      min-height: 46px; padding: 0 18px; border-radius: 999px; display: inline-flex; align-items: center; font-weight: 650;
    }
    .cf-btn { background: var(--cf-ink); color: #fff8f1; }
    .cf-btn:hover { background: var(--cf-clay); }
    .cf-btn-ghost { border: 1px solid rgba(28,23,20,0.2); }
    .cf-portrait { position: relative; min-height: 280px; }
    .cf-blob, .cf-fallback {
      width: min(100%, 360px); margin-left: auto; aspect-ratio: 1;
      object-fit: cover; border-radius: 58% 42% 62% 38% / 42% 52% 48% 58%;
      box-shadow: 18px 24px 0 rgba(31,107,88,0.16);
    }
    .cf-fallback { display: grid; place-items: center; font-family: var(--cf-serif); font-size: 5rem; background: #f0d2c4; color: var(--cf-ink); }
    .cf-float {
      position: absolute; left: 0; bottom: 18px;
      background: #fff; border-radius: 18px; padding: 10px 14px;
      box-shadow: 0 10px 30px rgba(80, 40, 20, 0.08);
      max-width: 200px; font-size: 0.88rem;
    }
    .cf-wave { display: block; width: 100%; height: 70px; }
    .cf-section { width: min(1120px, calc(100% - 48px)); margin: 0 auto; padding: 10px 0 24px; }
    .cf-section h2 { font-family: var(--cf-serif); font-weight: 400; font-size: clamp(2.2rem, 4vw, 3.4rem); letter-spacing: -0.03em; }
    .cf-river { margin-top: 14px; font-family: var(--cf-serif); font-size: clamp(1.4rem, 2.4vw, 2rem); line-height: 1.45; }
    .cf-river mark { background: transparent; color: var(--cf-moss); font-style: italic; }
    .cf-story { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 28px; align-items: center; padding: 26px 0; }
    .cf-story:nth-child(even) { grid-template-columns: 1.1fr 0.9fr; }
    .cf-story:nth-child(even) .cf-media { order: 2; }
    .cf-media, .cf-letter {
      width: 100%; min-height: 230px; object-fit: cover;
      border-radius: 28px 80px 28px 80px;
      background: #f3e1d6;
    }
    .cf-letter { display: grid; place-items: center; font-family: var(--cf-serif); font-size: 4rem; color: var(--cf-clay); }
    .cf-story:nth-child(even) .cf-media, .cf-story:nth-child(even) .cf-letter { border-radius: 80px 28px 80px 28px; }
    .cf-story h3 { font-family: var(--cf-serif); font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 400; line-height: 1.05; }
    .cf-muted { color: var(--cf-muted); }
    .cf-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; padding: 0; list-style: none; }
    .cf-chips li { border-radius: 999px; padding: 4px 10px; background: rgba(31,107,88,0.1); color: var(--cf-moss); font-size: 0.8rem; font-weight: 700; }
    .cf details { margin-top: 8px; }
    .cf summary { cursor: pointer; font-weight: 700; color: var(--cf-clay); }
    .cf-links-row { display: flex; gap: 14px; margin-top: 12px; font-weight: 700; }
    .cf-links-row a { border-bottom: 1px solid var(--cf-clay); }
    .cf-path { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .cf-path:has(> :only-child) { grid-template-columns: 1fr; }
    .cf-note { padding: 8px 0 16px; border-bottom: 1px solid rgba(28,23,20,0.08); }
    .cf-note strong { font-family: var(--cf-serif); font-size: 1.45rem; font-weight: 400; display: block; }
    .cf-contact {
      margin: 10px auto 0; width: min(1120px, calc(100% - 48px));
      background: var(--cf-ink); color: #fff8f1; border-radius: 36px;
      padding: 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
    }
    .cf-contact h2 { font-family: var(--cf-serif); font-weight: 400; font-size: clamp(2.4rem, 5vw, 4rem); line-height: 0.95; }
    .cf-contact a { color: #f2c7b8; overflow-wrap: anywhere; }
    .cf-form { display: grid; gap: 10px; }
    .cf-form input, .cf-form textarea {
      width: 100%; border: 0; border-radius: 14px; padding: 12px 14px; font: inherit; color: var(--cf-ink);
    }
    .cf-form textarea { min-height: 110px; resize: vertical; }
    .cf-form .cf-btn { background: var(--cf-clay); justify-content: center; }
    .cf-foot { width: min(1120px, calc(100% - 48px)); margin: 0 auto; padding: 22px 0 34px; color: var(--cf-muted); }
    @media (max-width: 900px) {
      .cf-hero, .cf-story, .cf-story:nth-child(even), .cf-path, .cf-contact { grid-template-columns: 1fr; }
      .cf-story:nth-child(even) .cf-media { order: 0; }
      .cf-blob { margin: 0 auto; }
    }
    @media (max-width: 720px) {
      .cf-nav { padding: 14px 16px; }
      .cf-burger { display: inline-block; }
      .cf-links { display: none; position: absolute; left: 12px; right: 12px; top: 100%; background: #fff8f1; border-radius: 16px; padding: 12px; flex-direction: column; align-items: flex-start; box-shadow: 0 12px 30px rgba(80,40,20,0.08); }
      .cf-nav.is-open .cf-links { display: flex; }
      .cf-hero, .cf-section, .cf-contact, .cf-foot { width: min(1120px, calc(100% - 28px)); }
      .cf-hero h1 { font-size: clamp(2.8rem, 14vw, 4rem); }
      .cf-contact { padding: 22px; border-radius: 24px; }
    }
    ${customCss}
  </style>
</head>
<body class="cf">
  <header class="cf-nav" id="cf-nav">
    <a class="cf-logo" href="#cf-top">${esc(profile.name || 'Portfolio')}</a>
    <button class="cf-burger" type="button" aria-label="Open menu" onclick="document.getElementById('cf-nav').classList.toggle('is-open')">Menu</button>
    <nav class="cf-links">
      ${nav('#cf-about', 'About', on('about') || on('hero'))}
      ${nav('#cf-skills', 'Craft', on('skills') && skills.length)}
      ${nav('#cf-work', 'Work', on('projects') && ordered.length)}
      ${nav('#cf-experience', 'Path', (on('experience') && experience.length) || (on('education') && education.length))}
      ${nav('#cf-contact', 'Contact', on('contact'))}
    </nav>
  </header>
  <main id="cf-top">
    ${on('hero') ? `
    <section class="cf-hero">
      <div id="cf-about">
        <div class="cf-kicker">${esc(profile.location || 'Creative practice')}</div>
        <h1>${esc(profile.name || 'Your Name')}${profile.title ? `<br/><em>${esc(profile.title)}</em>` : ''}</h1>
        ${on('about') && profile.bio ? `<p class="cf-bio">${esc(profile.bio)}</p>` : ''}
        <div class="cf-cta">
          ${on('projects') && ordered.length ? `<a class="cf-btn" href="#cf-work">Follow the work</a>` : ''}
          ${resumeUrl ? `<a class="cf-btn-ghost" href="${esc(resumeUrl)}" target="_blank" rel="noopener">Resume</a>` : ''}
          ${profile.email ? `<a class="cf-btn-ghost" href="mailto:${esc(profile.email)}">Email</a>` : ''}
        </div>
      </div>
      <div class="cf-portrait">
        ${portrait}
        ${profile.location ? `<div class="cf-float">${esc(profile.location)}</div>` : ''}
      </div>
    </section>
    <svg class="cf-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40c180 40 280-40 480-20s280 50 480 20 280-50 480-10v50H0Z" fill="#fff8f1"/><path d="M0 50c220 30 300-36 520-12s300 36 480 8 250-28 440 6" fill="none" stroke="${clayFixed}" stroke-width="2" opacity="0.7"/></svg>
    ` : (on('about') && profile.bio ? `<section class="cf-section" id="cf-about"><p class="cf-bio">${esc(profile.bio)}</p></section>` : '')}

    ${on('skills') && skills.length ? `
    <section class="cf-section" id="cf-skills">
      <div class="cf-kicker">Craft</div>
      <h2>Tools in the current</h2>
      <p class="cf-river">${skills.map((s) => `<mark>${esc(skillName(s))}</mark>`).join(' · ')}</p>
    </section>` : ''}

    ${on('projects') && ordered.length ? `
    <section class="cf-section" id="cf-work">
      <div class="cf-kicker">Stories</div>
      <h2>Work, in sequence</h2>
      ${ordered.map((p, i) => {
        const features = (p.features || []).filter(Boolean);
        const media = p.thumbnail
          ? `<img class="cf-media" src="${esc(p.thumbnail)}" alt="" />`
          : `<div class="cf-letter">${esc(((p.title || '?').charAt(0) || '?').toUpperCase())}</div>`;
        return `<article class="cf-story">
          ${media}
          <div>
            <div class="cf-kicker">${p.featured ? 'Featured' : 'Project'} 0${i + 1}</div>
            <h3>${esc(p.title || 'Untitled project')}</h3>
            ${p.tagline ? `<p class="cf-muted">${esc(p.tagline)}</p>` : ''}
            ${(p.technologies || []).length ? `<ul class="cf-chips">${p.technologies.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
            ${(p.problem || p.solution || features.length || p.challenges || p.outcomes) ? `<details>
              <summary>Open the story</summary>
              ${p.problem ? `<p>${esc(p.problem)}</p>` : ''}
              ${p.solution ? `<p>${esc(p.solution)}</p>` : ''}
              ${features.length ? `<p>${features.map(featureLine).join(' · ')}</p>` : ''}
              ${p.challenges ? `<p>${esc(p.challenges)}</p>` : ''}
              ${p.outcomes ? `<p>${esc(p.outcomes)}</p>` : ''}
            </details>` : ''}
            <div class="cf-links-row">
              ${p.liveUrl ? `<a href="${esc(p.liveUrl)}" target="_blank" rel="noopener">Live</a>` : ''}
              ${p.githubUrl ? `<a href="${esc(p.githubUrl)}" target="_blank" rel="noopener">Source</a>` : ''}
            </div>
          </div>
        </article>`;
      }).join('')}
    </section>` : ''}

    ${(on('experience') && experience.length) || (on('education') && education.length) ? `
    <section class="cf-section cf-path" id="cf-experience">
      ${on('experience') && experience.length ? `<div><div class="cf-kicker">Path</div><h2>Experience</h2>${experience.map((e) => `<article class="cf-note"><strong>${esc(e.role || e.title || 'Role')}</strong><span class="cf-muted">${esc([e.company, e.duration || e.period].filter(Boolean).join(' · '))}</span>${e.description ? `<p>${esc(e.description)}</p>` : ''}</article>`).join('')}</div>` : ''}
      ${on('education') && education.length ? `<div id="cf-education"><div class="cf-kicker">Study</div><h2>Education</h2>${education.map((e) => `<article class="cf-note"><strong>${esc(e.degree || 'Study')}</strong><span class="cf-muted">${esc([e.school, e.year, e.gpa ? `GPA ${e.gpa}` : ''].filter(Boolean).join(' · '))}</span>${e.description ? `<p>${esc(e.description)}</p>` : ''}</article>`).join('')}</div>` : ''}
    </section>` : ''}

    ${on('contact') ? `
    <section class="cf-contact" id="cf-contact">
      <div>
        <div class="cf-kicker" style="color:#f2c7b8">Hello</div>
        <h2>Write when the idea is still soft.</h2>
        ${profile.email ? `<p style="margin-top:12px"><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></p>` : ''}
        ${profile.phone ? `<p>${esc(profile.phone)}</p>` : ''}
        <div class="cf-links-row">${socials.map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('')}${resumeUrl ? `<a href="${esc(resumeUrl)}" target="_blank" rel="noopener">Resume</a>` : ''}</div>
      </div>
      <form class="cf-form" onsubmit="event.preventDefault(); this.reset(); this.querySelector('[data-note]').hidden=false;">
        <input required type="text" placeholder="Name" aria-label="Name"/>
        <input required type="email" placeholder="Email" aria-label="Email"/>
        <textarea required placeholder="Message" aria-label="Message"></textarea>
        <button class="cf-btn" type="submit">Send</button>
        <p data-note hidden>Received in this preview.</p>
      </form>
    </section>` : ''}
  </main>
  <footer class="cf-foot">${esc(profile.name || 'Portfolio')} · ${year}</footer>
</body>
</html>`;
  },
};
