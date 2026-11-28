(() => {
  const resume = document.getElementById('resume');
  const printButton = document.getElementById('print-resume');
  if (!resume || !printButton) {
    throw new Error('Resume printout could not initialize: required page elements are missing.');
  }

  const readArray = value => Array.isArray(value) ? value : [];

  function readProfileData() {
    try {
      const profile = JSON.parse(localStorage.getItem('dpb_profile') || '{}');
      const projects = JSON.parse(localStorage.getItem('dpb_projects') || '[]');
      if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
        throw new TypeError('Saved profile must be an object.');
      }
      if (!Array.isArray(projects)) {
        throw new TypeError('Saved projects must be a list.');
      }
      return { profile, projects };
    } catch (error) {
      console.error('Could not load saved profile for the resume printout.', error);
      resume.replaceChildren();
      const message = document.createElement('p');
      message.className = 'empty-state';
      message.textContent = 'Your saved portfolio data could not be read. Open the dashboard in the same browser and try again.';
      resume.append(message);
      return null;
    }
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function appendSection(container, title, entries) {
    if (!entries.length) return;
    const section = element('section', 'resume-section');
    section.append(element('h2', '', title));
    entries.forEach(entry => section.append(entry));
    container.append(section);
  }

  function makeEntry(title, subtitle, meta, description) {
    const entry = element('article', 'entry');
    const heading = element('div', 'entry-heading');
    if (title) heading.append(element('h3', 'entry-title', title));
    if (meta) heading.append(element('span', 'entry-meta', meta));
    if (heading.childElementCount) entry.append(heading);
    if (subtitle) entry.append(element('p', 'entry-subtitle', subtitle));
    if (description) entry.append(element('p', 'entry-description', description));
    return entry;
  }

  function renderResume(data) {
    const { profile, projects } = data;
    const name = typeof profile.name === 'string' ? profile.name.trim() : '';
    const title = typeof profile.title === 'string' ? profile.title.trim() : '';
    const hasContent = name || title || profile.bio || profile.email ||
      readArray(profile.skills).length || readArray(profile.experience).length ||
      readArray(profile.education).length || projects.length;

    if (!hasContent) {
      resume.replaceChildren();
      const empty = element('div', 'empty-state');
      empty.append(
        element('h1', '', 'Your resume is ready to build'),
        element('p', '', 'Add your name, role, contact details, skills, experience, and education in Personal Info. Your saved projects will appear here too.'),
      );
      const link = element('a', '', 'Open Personal Info');
      link.href = '../pages/personal-info.html';
      empty.append(link);
      resume.append(empty);
      return;
    }

    resume.replaceChildren();
    const header = element('header', 'resume-header');
    header.append(element('h1', '', name || 'Your Name'));
    if (title) header.append(element('p', 'resume-title', title));

    const contact = element('div', 'contact-line');
    [profile.email, profile.phone, profile.location].forEach(value => {
      if (typeof value === 'string' && value.trim()) contact.append(element('span', '', value.trim()));
    });
    const social = profile.social && typeof profile.social === 'object' ? profile.social : {};
    const links = [
      ['Website', profile.website || social.website],
      ['GitHub', social.github],
      ['LinkedIn', social.linkedin],
      ['Twitter', social.twitter],
    ];
    links.forEach(([label, value]) => {
      if (typeof value !== 'string' || !value.trim()) return;
      const link = element('a', '', label);
      link.href = value.trim();
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.title = value.trim();
      contact.append(link);
    });
    if (contact.childElementCount) header.append(contact);
    resume.append(header);

    if (typeof profile.bio === 'string' && profile.bio.trim()) {
      const summary = element('section', 'resume-section');
      summary.append(element('h2', '', 'Professional Summary'));
      summary.append(element('p', 'summary', profile.bio.trim()));
      resume.append(summary);
    }

    const experience = readArray(profile.experience)
      .filter(item => item && (item.role || item.company || item.description))
      .map(item => makeEntry(
        item.role || '',
        item.company || '',
        item.duration || '',
        item.description || '',
      ));
    appendSection(resume, 'Experience', experience);

    const education = readArray(profile.education)
      .filter(item => item && (item.degree || item.school || item.year))
      .map(item => makeEntry(
        item.degree || '',
        item.school || '',
        [item.year, item.gpa ? `GPA ${item.gpa}` : ''].filter(Boolean).join(' · '),
        '',
      ));
    appendSection(resume, 'Education', education);

    const skills = readArray(profile.skills)
      .filter(skill => typeof skill === 'string' && skill.trim());
    if (skills.length) {
      const section = element('section', 'resume-section');
      section.append(element('h2', '', 'Skills'));
      const list = element('div', 'skill-list');
      skills.forEach(skill => list.append(element('span', 'skill', skill.trim())));
      section.append(list);
      resume.append(section);
    }

    const projectEntries = projects
      .filter(project => project && (project.title || project.tagline || project.solution || project.outcomes))
      .map(project => {
        const entry = makeEntry(
          project.title || 'Project',
          project.tagline || '',
          '',
          [project.solution, project.outcomes].filter(value => typeof value === 'string' && value.trim()).join('\n'),
        );
        const technologies = readArray(project.technologies).filter(value => typeof value === 'string' && value.trim());
        if (technologies.length) entry.append(element('p', 'project-tech', `Technologies: ${technologies.join(', ')}`));
        return entry;
      });
    appendSection(resume, 'Selected Projects', projectEntries);
  }

  printButton.addEventListener('click', () => window.print());
  const data = readProfileData();
  if (data) renderResume(data);
})();
