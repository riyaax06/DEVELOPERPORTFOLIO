(() => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('messages');
  const suggestions = document.getElementById('suggestions');
  const clearButton = document.getElementById('clear-chat');

  if (!form || !input || !messages || !suggestions || !clearButton) {
    throw new Error('Portfolio assistant could not initialize: required chat elements are missing.');
  }

  function getPortfolioSnapshot() {
    try {
      const profile = JSON.parse(localStorage.getItem('dpb_profile') || '{}');
      const projects = JSON.parse(localStorage.getItem('dpb_projects') || '[]');
      return {
        profile: profile && typeof profile === 'object' ? profile : {},
        projects: Array.isArray(projects) ? projects : [],
      };
    } catch (error) {
      console.warn('Portfolio assistant could not read saved portfolio data.', error);
      return { profile: {}, projects: [] };
    }
  }

  function addMessage(text, sender) {
    const article = document.createElement('article');
    article.className = `message ${sender === 'user' ? 'user-message' : 'assistant-message'}`;

    const avatar = document.createElement('span');
    avatar.className = 'message-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = sender === 'user' ? 'You' : '✦';

    const content = document.createElement('div');
    content.className = 'message-content';

    const author = document.createElement('span');
    author.className = 'message-author';
    author.textContent = sender === 'user' ? 'You' : 'Portfolio assistant';

    const paragraph = document.createElement('p');
    paragraph.textContent = text;

    content.append(author, paragraph);
    article.append(avatar, content);
    messages.append(article);
    messages.scrollTop = messages.scrollHeight;
  }

  function getReply(message) {
    const text = message.toLowerCase();
    const { profile, projects } = getPortfolioSnapshot();
    const projectCount = projects.length;

    if (/\b(hi|hello|hey|namaste)\b/.test(text)) {
      return 'Hello! I can help you with your profile, project case studies, templates, or portfolio export. What are you working on?';
    }
    if (/(start|begin|getting started|first|shuru|kaise shuru)/.test(text)) {
      return 'A good order is:\n1. Add your name, role, short bio, and contact links in Personal Info.\n2. Add at least one project in Project Builder.\n3. Choose a template in Template Gallery.\n4. Fine-tune the layout in Live Editor, then preview your portfolio.';
    }
    if (/(resume|résumé|cv|printout|print|pdf)/.test(text)) {
      return 'Use the “Resume printout” link in the top-right of this page. It builds a print-ready resume from your saved profile, experience, education, skills, and projects. Choose “Print / Save as PDF” to print or save a PDF.';
    }
    if (/(profile|bio|about|skills|personal|resume|cv)/.test(text)) {
      const nameLine = profile.name ? ` I can see your saved profile is under ${profile.name}.` : '';
      return `Make your profile specific: use a clear role, a short bio that says what you build, and skills that match your target work. Add a professional photo, location, email, and at least one GitHub or LinkedIn link.${nameLine} You can edit these in Personal Info.`;
    }
    if (/(project|case study|case-study|problem|solution|challenge)/.test(text)) {
      const projectLine = projectCount
        ? ` I can see ${projectCount} saved project${projectCount === 1 ? '' : 's'} in this browser.`
        : ' I do not see any saved projects in this browser yet.';
      return `A strong case study explains the problem, your role, the solution, key features, technical choices, challenges, and measurable outcomes. Add relevant technologies and working demo or GitHub links when available.${projectLine} Start or edit one in Project Builder.`;
    }
    if (/(template|theme|design|color|font|layout|customi[sz])/.test(text)) {
      return 'Open Template Gallery to compare Aurora (dark and atmospheric), Minimal (clean and light), and Neon (bold and high-contrast). After choosing one, use Live Editor to adjust colors, typography, and visible sections.';
    }
    if (/(export|download|publish|deploy|share|html)/.test(text)) {
      return 'Open Generated Portfolio and use its export/download action to save a standalone HTML file. Preview it first, then upload that file to a static host such as GitHub Pages, Netlify, or Vercel.';
    }
    if (/(progress|complete|checklist|status|saved|my portfolio|my projects)/.test(text)) {
      const completed = [
        profile.name,
        profile.title,
        profile.bio,
        profile.email,
        profile.avatar,
        profile.location,
        Array.isArray(profile.skills) && profile.skills.length > 0,
        Array.isArray(profile.education) && profile.education.length > 0,
        profile.social && (profile.social.github || profile.social.linkedin),
      ].filter(Boolean).length;
      return `In this browser I found ${projectCount} saved project${projectCount === 1 ? '' : 's'} and ${completed}/9 profile details used by the app's completion check. Your data stays in browser storage. Visit the dashboard checklist for the full setup status.`;
    }

    return 'I can help with getting started, profile writing, project case studies, templates, or exporting. Try asking “What should I add to a case study?” or “How do I export my portfolio?”';
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    input.value = '';
    addMessage(getReply(message), 'assistant');
    input.focus();
  });

  suggestions.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    input.value = button.textContent;
    form.requestSubmit();
  });

  clearButton.addEventListener('click', () => {
    messages.replaceChildren();
    addMessage('Conversation cleared. Ask me about getting started, your profile, case studies, templates, or exporting your portfolio.', 'assistant');
    input.focus();
  });
})();
