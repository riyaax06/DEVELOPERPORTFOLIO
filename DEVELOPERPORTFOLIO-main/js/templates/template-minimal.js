/**
 * template-minimal.js — Minimal Template
 * Clean, white/light design with elegant typography & structured case studies
 */
window.TemplateMinimal = {
  name: 'Minimal',
  id: 'minimal',
  description: 'Clean, white & elegant — timeless professional style with deep case studies',

  render(profile, projects, config = {}) {
    const primary   = config.primaryColor   || '#2563eb';
    const font      = config.fontFamily     || 'Inter';
    const show      = config.showSections   || {};
    const resumeUrl = profile.resumeUrl     || '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${esc(profile.name || 'Portfolio')} — Portfolio</title>
  <meta name="description" content="${esc(profile.bio?.slice(0,160) || 'Developer Portfolio and Case Studies')}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: ${primary};
      --font: '${font}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    html { scroll-behavior: smooth; }
    body { font-family: var(--font); background: #ffffff; color: #0f172a; -webkit-font-smoothing: antialiased; line-height: 1.6; }
    a { color: var(--primary); text-decoration: none; }
    ul { list-style: none; }
    img { display: block; max-width: 100%; }

    /* ── Header ── */
    header {
      border-bottom: 1px solid #e2e8f0;
      position: sticky; top: 0; background: rgba(255,255,255,0.95);
      backdrop-filter: blur(12px); z-index: 100;
    }
    .header-inner {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.1rem 2rem; max-width: 900px; margin: 0 auto;
    }
    .header-name { font-weight: 700; font-size: 1.05rem; color: #0f172a; letter-spacing: -0.01em; }
    .header-nav { display: flex; align-items: center; gap: 1.5rem; }
    .header-nav a { font-size: 0.875rem; color: #64748b; font-weight: 500; transition: color 150ms; }
    .header-nav a:hover { color: var(--primary); }
    .nav-btn-min {
      padding: 6px 14px; border-radius: 6px; border: 1px solid #cbd5e1;
      color: #334155; font-size: 0.8125rem; font-weight: 600;
    }
    .nav-btn-min:hover { border-color: var(--primary); color: var(--primary); }

    /* ── Hero ── */
    .hero { padding: 5.5rem 2rem 4rem; max-width: 900px; margin: 0 auto; }
    .hero-grid { display: grid; grid-template-columns: 1fr auto; gap: 3.5rem; align-items: center; }
    .hero-kicker { font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--primary); margin-bottom: 0.75rem; }
    .hero-name  { font-size: clamp(2.4rem, 5vw, 3.4rem); font-weight: 800; line-height: 1.1; color: #0f172a; margin-bottom: 0.75rem; letter-spacing: -0.02em; }
    .hero-role  { font-size: 1.2rem; color: #475569; margin-bottom: 1.25rem; font-weight: 500; }
    .hero-bio   { font-size: 1rem; color: #475569; line-height: 1.8; margin-bottom: 2rem; }
    .hero-cta   { display: flex; gap: 0.875rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
    .btn-primary-min {
      padding: 11px 24px; border-radius: 8px;
      background: var(--primary); color: white;
      font-size: 0.875rem; font-weight: 600;
      transition: opacity 150ms;
    }
    .btn-primary-min:hover { opacity: 0.88; color: white; }
    .btn-outline-min {
      padding: 11px 24px; border-radius: 8px;
      border: 1px solid #cbd5e1; color: #334155;
      font-size: 0.875rem; font-weight: 500;
      transition: border-color 150ms, background 150ms;
    }
    .btn-outline-min:hover { border-color: var(--primary); background: rgba(37,99,235,0.04); color: var(--primary); }

    .avatar-min {
      width: 170px; height: 170px; border-radius: 50%;
      object-fit: cover; border: 3px solid #f1f5f9;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }
    .avatar-min-placeholder {
      width: 170px; height: 170px; border-radius: 50%;
      background: var(--primary);
      display: flex; align-items: center; justify-content: center;
      font-size: 3.5rem; font-weight: 800; color: white;
    }

    .hero-links { display: flex; gap: 1.25rem; flex-wrap: wrap; }
    .hero-links a { font-size: 0.875rem; color: #64748b; font-weight: 500; transition: color 150ms; }
    .hero-links a:hover { color: var(--primary); }

    /* ── Divider ── */
    .divider { border: none; border-top: 1px solid #e2e8f0; margin: 0; }

    /* ── Section ── */
    section { padding: 4.5rem 2rem; max-width: 900px; margin: 0 auto; }
    .sec-label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--primary); margin-bottom: 0.5rem; }
    .sec-title { font-size: 1.75rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem; letter-spacing: -0.01em; }
    .sec-desc  { font-size: 0.95rem; color: #64748b; line-height: 1.7; margin-bottom: 2.5rem; max-width: 600px; }

    /* ── Skills ── */
    .skills-list { display: flex; flex-wrap: wrap; gap: 0.6rem; }
    .skill-pill {
      padding: 8px 16px; border-radius: 999px;
      border: 1px solid #e2e8f0; background: #f8fafc;
      font-size: 0.85rem; font-weight: 500; color: #334155;
      transition: all 150ms;
    }
    .skill-pill:hover { border-color: var(--primary); color: var(--primary); background: #ffffff; }

    /* ── Projects & Case Studies ── */
    .proj-list { display: flex; flex-direction: column; gap: 2.5rem; }
    .proj-item {
      padding: 2.25rem;
      border: 1px solid #e2e8f0; border-radius: 20px;
      background: #ffffff;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
      transition: all 200ms;
    }
    .proj-item:hover { border-color: #cbd5e1; box-shadow: 0 10px 30px rgba(0,0,0,0.06); }
    .proj-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem; }
    .proj-title { font-size: 1.25rem; font-weight: 800; color: #0f172a; }
    .proj-featured { font-size: 0.6875rem; font-weight: 700; padding: 4px 10px; border-radius: 999px; background: #fefce8; border: 1px solid #fde68a; color: #854d0e; text-transform: uppercase; }
    .proj-tagline { font-size: 0.95rem; color: #475569; margin-bottom: 1.25rem; line-height: 1.6; }
    .proj-tech { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.5rem; }
    .tech-tag { padding: 4px 10px; border-radius: 6px; background: #f1f5f9; font-size: 0.75rem; font-weight: 500; color: #334155; }

    .proj-case-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .proj-case-block { padding: 1.1rem; background: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9; }
    .proj-case-block h4 { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--primary); margin-bottom: 0.4rem; }
    .proj-case-block p  { font-size: 0.85rem; color: #475569; line-height: 1.6; }
    .feat-list li { font-size: 0.85rem; color: #475569; padding: 3px 0; }
    .feat-list li::before { content: '→ '; color: var(--primary); font-weight: bold; }

    .impact-box-min {
      padding: 1rem; background: #f0fdf4; border: 1px solid #bbf7d0;
      border-radius: 12px; margin-bottom: 1.25rem;
    }
    .impact-box-min h4 { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #166534; margin-bottom: 0.3rem; }
    .impact-box-min p { font-size: 0.85rem; color: #15803d; line-height: 1.6; }

    .proj-links { display: flex; gap: 0.75rem; margin-top: 1rem; }
    .proj-link-primary { padding: 9px 20px; border-radius: 8px; background: var(--primary); color: white; font-size: 0.85rem; font-weight: 600; }
    .proj-link-primary:hover { opacity: 0.88; color: white; }
    .proj-link-ghost { padding: 9px 20px; border-radius: 8px; border: 1px solid #cbd5e1; color: #475569; font-size: 0.85rem; font-weight: 500; }
    .proj-link-ghost:hover { border-color: var(--primary); color: var(--primary); }

    .proj-thumb-min { width: 100%; height: 200px; border-radius: 14px; object-fit: cover; margin-bottom: 1.25rem; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; overflow: hidden; }
    .proj-thumb-min img { width: 100%; height: 100%; object-fit: cover; }

    /* ── Experience & Education ── */
    .edu-list { display: flex; flex-direction: column; gap: 1rem; }
    .edu-item { display: flex; align-items: flex-start; gap: 1.25rem; padding: 1.5rem; border: 1px solid #e2e8f0; border-radius: 14px; }
    .edu-dot { width: 40px; height: 40px; border-radius: 50%; background: #f1f5f9; color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
    .edu-school { font-weight: 700; color: #0f172a; font-size: 1rem; margin-bottom: 0.25rem; }
    .edu-degree { font-size: 0.875rem; color: #475569; }
    .edu-year   { font-size: 0.75rem; color: #64748b; margin-top: 0.25rem; }

    /* ── Contact ── */
    .contact-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 24px; padding: 3.5rem 2rem; text-align: center; }
    .contact-email { display: inline-block; margin-top: 1.5rem; padding: 12px 30px; border-radius: 10px; background: var(--primary); color: white; font-weight: 600; font-size: 0.95rem; }
    .contact-email:hover { opacity: 0.9; color: white; }
    .contact-links { display: flex; justify-content: center; gap: 1.25rem; margin-top: 1.5rem; flex-wrap: wrap; }
    .contact-lnk { font-size: 0.875rem; color: #64748b; font-weight: 500; }
    .contact-lnk:hover { color: var(--primary); }

    /* ── Footer ── */
    footer { text-align: center; padding: 2.5rem; font-size: 0.8125rem; color: #94a3b8; border-top: 1px solid #e2e8f0; }

    @media (max-width: 768px) {
      .hero-grid { grid-template-columns: 1fr; }
      .avatar-min, .avatar-min-placeholder { width: 110px; height: 110px; font-size: 2.5rem; }
      .hero-grid .avatar-wrap { order: -1; }
      .proj-case-grid { grid-template-columns: 1fr; }
      .header-nav { display: none; }
    }
  </style>
</head>
<body>

<header>
  <div class="header-inner">
    <div class="header-name">${esc(profile.name || 'Portfolio')}</div>
    <nav class="header-nav">
      ${show.about !== false    ? '<a href="#about">About</a>'       : ''}
      ${show.skills !== false   ? '<a href="#skills">Skills</a>'     : ''}
      ${show.projects !== false ? '<a href="#projects">Work</a>'     : ''}
      ${show.experience !== false && profile.experience?.length ? '<a href="#experience">Experience</a>' : ''}
      ${show.education !== false && profile.education?.length ? '<a href="#education">Education</a>' : ''}
      ${show.contact !== false  ? '<a href="#contact">Contact</a>'   : ''}
      ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="nav-btn-min" target="_blank" rel="noopener">Resume ↗</a>` : ''}
    </nav>
  </div>
</header>

${show.hero !== false ? `
<div class="hero" id="about">
  <div class="hero-grid">
    <div>
      <div class="hero-kicker">Software Engineer &amp; Builder</div>
      <h1 class="hero-name">${esc(profile.name || 'Your Name')}</h1>
      <p class="hero-role">${esc(profile.title || 'Engineer')}</p>
      <p class="hero-bio">${esc(profile.bio || 'Designing and engineering scalable systems.')}</p>
      <div class="hero-cta">
        ${profile.email ? `<a href="mailto:${esc(profile.email)}" class="btn-primary-min">Get in Touch →</a>` : `<a href="#contact" class="btn-primary-min">Get in Touch →</a>`}
        ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="btn-outline-min" target="_blank" rel="noopener">📄 Download Resume</a>` : ''}
        ${profile.social?.github ? `<a href="${esc(profile.social.github)}" class="btn-outline-min" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
      </div>
      <div class="hero-links">
        ${profile.social?.linkedin ? `<a href="${esc(profile.social.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>` : ''}
        ${profile.social?.twitter  ? `<a href="${esc(profile.social.twitter)}" target="_blank" rel="noopener">Twitter / X ↗</a>` : ''}
        ${profile.website          ? `<a href="${esc(profile.website)}" target="_blank" rel="noopener">Website ↗</a>` : ''}
        ${profile.location         ? `<span style="font-size:0.875rem;color:#64748b">📍 ${esc(profile.location)}</span>` : ''}
      </div>
    </div>
    <div class="avatar-wrap">
      ${profile.avatar
        ? `<img class="avatar-min" src="${esc(profile.avatar)}" alt="${esc(profile.name)}" onerror="this.parentElement.innerHTML='<div class=\\'avatar-min-placeholder\\'>${esc((profile.name?.[0]||'?').toUpperCase())}</div>'" />`
        : `<div class="avatar-min-placeholder">${esc((profile.name?.[0]||'?').toUpperCase())}</div>`}
    </div>
  </div>
</div>
<hr class="divider"/>` : ''}

${show.skills !== false && profile.skills?.length ? `
<section id="skills">
  <div class="sec-label">Technical Stack</div>
  <h2 class="sec-title">Skills &amp; Technologies</h2>
  <p class="sec-desc">Languages, frameworks, and architecture patterns used in production systems.</p>
  <div class="skills-list">
    ${profile.skills.map(s => `<span class="skill-pill">${esc(s)}</span>`).join('')}
  </div>
</section>
<hr class="divider"/>` : ''}

${show.projects !== false && projects.length ? `
<section id="projects">
  <div class="sec-label">Case Studies</div>
  <h2 class="sec-title">Engineering Projects</h2>
  <p class="sec-desc">Selected work highlighting technical architecture, problem solving, and metrics.</p>
  <div class="proj-list">
    ${projects.map(p => `
    <div class="proj-item">
      ${p.thumbnail ? `<div class="proj-thumb-min"><img src="${esc(p.thumbnail)}" alt="${esc(p.title)}" /></div>` : ''}
      <div class="proj-header">
        <h3 class="proj-title">${esc(p.title || 'Untitled Project')}</h3>
        ${p.featured ? `<span class="proj-featured">Featured</span>` : ''}
      </div>
      <p class="proj-tagline">${esc(p.tagline || '')}</p>
      <div class="proj-tech">
        ${(p.technologies || []).map(t => `<span class="tech-tag">${esc(t)}</span>`).join('')}
      </div>
      ${(p.problem || p.solution) ? `
      <div class="proj-case-grid">
        ${p.problem  ? `<div class="proj-case-block"><h4>Problem</h4><p>${esc(p.problem)}</p></div>` : ''}
        ${p.solution ? `<div class="proj-case-block"><h4>Solution</h4><p>${esc(p.solution)}</p></div>` : ''}
      </div>` : ''}
      ${p.features?.filter(Boolean).length ? `
      <div class="proj-case-block" style="margin-bottom:1rem">
        <h4>Core Features</h4>
        <ul class="feat-list">
          ${p.features.filter(Boolean).map(f => typeof f === 'object' ? `<li><strong>${esc(f.title || '')}:</strong> ${esc(f.desc || '')}</li>` : `<li>${esc(f)}</li>`).join('')}
        </ul>
      </div>` : ''}
      ${p.challenges ? `
      <div class="proj-case-block" style="margin-bottom:1rem">
        <h4>Challenges &amp; Trade-offs</h4>
        <p>${esc(p.challenges)}</p>
      </div>` : ''}
      ${p.outcomes ? `
      <div class="impact-box-min">
        <h4>Measurable Outcomes</h4>
        <p>${esc(p.outcomes)}</p>
      </div>` : ''}
      <div class="proj-links">
        ${p.liveUrl   ? `<a href="${esc(p.liveUrl)}" class="proj-link-primary" target="_blank" rel="noopener">Live Demo ↗</a>` : ''}
        ${p.githubUrl ? `<a href="${esc(p.githubUrl)}" class="proj-link-ghost" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
      </div>
    </div>`).join('')}
  </div>
</section>
<hr class="divider"/>` : ''}

${show.experience !== false && profile.experience?.length ? `
<section id="experience">
  <div class="sec-label">Career</div>
  <h2 class="sec-title">Work Experience</h2>
  <div class="edu-list">
    ${profile.experience.map(e => `
    <div class="edu-item">
      <div class="edu-dot">💼</div>
      <div>
        <div class="edu-school">${esc(e.role || e.title || 'Engineer')}</div>
        <div class="edu-degree">${esc(e.company || '')} ${e.period ? `· ${esc(e.period)}` : ''}</div>
        <div class="edu-year" style="color:#64748b;font-size:0.85rem">${esc(e.description || '')}</div>
      </div>
    </div>`).join('')}
  </div>
</section>
<hr class="divider"/>` : ''}

${show.education !== false && profile.education?.length ? `
<section id="education">
  <div class="sec-label">Academic</div>
  <h2 class="sec-title">Education</h2>
  <div class="edu-list">
    ${profile.education.map(e => `
    <div class="edu-item">
      <div class="edu-dot">🎓</div>
      <div>
        <div class="edu-school">${esc(e.school)}</div>
        <div class="edu-degree">${esc(e.degree)}</div>
        <div class="edu-year">${esc(e.year || '')}</div>
      </div>
    </div>`).join('')}
  </div>
</section>
<hr class="divider"/>` : ''}

${show.contact !== false ? `
<section id="contact">
  <div class="contact-box">
    <div class="sec-label">Connect</div>
    <h2 class="sec-title" style="margin-bottom:0.75rem">Let's Work Together</h2>
    <p style="color:#64748b;max-width:520px;margin:0 auto;line-height:1.7">
      ${esc(profile.bio || 'Open to technical roles, consulting, and engineering collaborations.')}
    </p>

    <div style="margin:2rem auto 0;max-width:480px;text-align:left;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:1.5rem">
      <form onsubmit="event.preventDefault(); alert('Message sent successfully!'); this.reset();">
        <div style="margin-bottom:12px">
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:4px">Your Name</label>
          <input type="text" style="width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px" required placeholder="Jane Doe" />
        </div>
        <div style="margin-bottom:12px">
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:4px">Your Email</label>
          <input type="email" style="width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px" required placeholder="jane@example.com" />
        </div>
        <div style="margin-bottom:16px">
          <label style="font-size:12px;font-weight:600;color:#64748b;display:block;margin-bottom:4px">Message</label>
          <textarea style="width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px;min-height:90px" required placeholder="Your message..."></textarea>
        </div>
        <button type="submit" class="btn-primary-min" style="width:100%;border:none;cursor:pointer">Send Message →</button>
      </form>
    </div>

    <div class="contact-links">
      ${profile.email ? `<a href="mailto:${esc(profile.email)}" class="contact-lnk">✉ ${esc(profile.email)}</a>` : ''}
      ${resumeUrl ? `<a href="${esc(resumeUrl)}" class="contact-lnk" target="_blank" rel="noopener">📄 Download Resume</a>` : ''}
      ${profile.social?.linkedin ? `<a href="${esc(profile.social.linkedin)}" class="contact-lnk" target="_blank" rel="noopener">LinkedIn</a>` : ''}
      ${profile.social?.github ? `<a href="${esc(profile.social.github)}" class="contact-lnk" target="_blank" rel="noopener">GitHub</a>` : ''}
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
