(() => {
  if (document.getElementById('portfolio-assistant-widget')) return;

  const scriptUrl = document.currentScript && document.currentScript.src;
  if (!scriptUrl) {
    console.error('Portfolio assistant shortcut could not determine its folder URL.');
    return;
  }

  const folderUrl = new URL('.', scriptUrl);
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = new URL('project-widget.css', folderUrl).href;
  document.head.append(stylesheet);

  const widget = document.createElement('div');
  widget.id = 'portfolio-assistant-widget';
  widget.className = 'portfolio-assistant-widget';

  const panel = document.createElement('div');
  panel.className = 'portfolio-assistant-panel';
  panel.id = 'portfolio-assistant-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label', 'Portfolio tools');

  const heading = document.createElement('p');
  heading.className = 'portfolio-assistant-heading';
  heading.textContent = 'Portfolio tools';

  const chatbotLink = document.createElement('a');
  chatbotLink.className = 'portfolio-assistant-link';
  chatbotLink.href = new URL('index.html', folderUrl).href;
  chatbotLink.innerHTML = '<span class="portfolio-assistant-link-icon" aria-hidden="true">✦</span><span><strong>Chatbot assistant</strong><small>Get help with your portfolio</small></span>';

  const resumeLink = document.createElement('a');
  resumeLink.className = 'portfolio-assistant-link';
  resumeLink.href = new URL('resume.html', folderUrl).href;
  resumeLink.innerHTML = '<span class="portfolio-assistant-link-icon" aria-hidden="true">▤</span><span><strong>Resume printout</strong><small>Print or save as PDF</small></span>';

  panel.append(heading, chatbotLink, resumeLink);

  const toggle = document.createElement('button');
  toggle.className = 'portfolio-assistant-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open chatbot and resume shortcuts');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', panel.id);
  toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.4-.8L4 20l1.2-4.1A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8.5 11.5h.01m3.49 0h.01m3.49 0h.01"/></svg><span>Help</span>';

  toggle.addEventListener('click', () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open chatbot and resume shortcuts' : 'Close chatbot and resume shortcuts');
  });

  document.addEventListener('click', event => {
    if (!widget.contains(event.target) && !panel.hidden) {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open chatbot and resume shortcuts');
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  widget.append(panel, toggle);
  document.body.append(widget);
})();
