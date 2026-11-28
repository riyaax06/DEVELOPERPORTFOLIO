(() => {
  const THEMES = [
    { id: "aurora", name: "Aurora", note: "Dark · Glassmorphism", badge: "Ag", bg: "#1c1e34" },
    { id: "minimal", name: "Minimal", note: "Editorial · Light", badge: "Ag", bg: "#f4eee5" },
    { id: "neon", name: "Neon", note: "Cyberpunk · Terminal", badge: ">_", bg: "#060912" },
  ];

  const FONTS = [
    { id: "sans", label: "DM Sans (Modern)", family: "'DM Sans', sans-serif" },
    { id: "serif", label: "Playfair (Editorial)", family: "'Playfair Display', serif" },
    { id: "mono", label: "DM Mono (Developer)", family: "'DM Mono', monospace" },
  ];

  const VIEWPORTS = [
    { id: "desktop", label: "Desktop", width: "100%" },
    { id: "tablet", label: "Tablet", width: "620px" },
    { id: "mobile", label: "Mobile", width: "375px" },
  ];

  // Read saved data if available
  let savedName = "Alex Morgan";
  let savedRole = "Frontend Developer";
  let savedBio = "I build accessible, thoughtful digital experiences with clean design systems.";
  let savedProject = "A portfolio that tells a story";
  let savedProblem = "Developers struggle to present raw repositories as structured, recruiter-ready case studies.";
  let savedOutcome = "Client-side template engine with instant theme switching and standalone HTML export.";

  try {
    const p = JSON.parse(localStorage.getItem("dpb_profile") || "{}");
    if (p.name) savedName = p.name;
    if (p.title) savedRole = p.title;
    if (p.bio) savedBio = p.bio;
    const projs = JSON.parse(localStorage.getItem("dpb_projects") || "[]");
    if (projs.length && projs[0].title) savedProject = projs[0].title;
    if (projs.length && projs[0].problem) savedProblem = projs[0].problem;
    if (projs.length && projs[0].outcomes) savedOutcome = projs[0].outcomes;
  } catch (e) {}

  let state = {
    theme: "aurora",
    fontId: "sans",
    viewport: "desktop",
    accent: "#c9f27a",
    name: savedName,
    role: savedRole,
    about: savedBio,
    project: savedProject,
    problem: savedProblem,
    outcome: savedOutcome,
    showCaseStudy: true,
  };

  function getLuminance(hex) {
    const clean = hex.replace("#", "");
    const rgb = [0, 2, 4].map((offset) => {
      const channel = parseInt(clean.slice(offset, offset + 2), 16) / 255;
      return channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }

  function getContrastRatio(bgHex, fgHex) {
    const l1 = getLuminance(bgHex);
    const l2 = getLuminance(fgHex);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return ((brightest + 0.05) / (darkest + 0.05)).toFixed(1);
  }

  function esc(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getInitials(nameStr) {
    return (
      (nameStr || "")
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "AM"
    );
  }

  // Initial full render of the page skeleton
  function initPage() {
    const root = document.getElementById("root");
    if (!root) return;

    const activeThemeObj = THEMES.find((t) => t.id === state.theme) || THEMES[0];
    const contrastRatio = getContrastRatio(activeThemeObj.bg, state.accent);
    const isAccessible = parseFloat(contrastRatio) >= 4.5;

    root.innerHTML = `
      <main class="pd-shell">
        <header class="pd-topbar">
          <div class="pd-brand">
            <span class="pd-mark">✳</span> folio
            <span class="pd-muted">/studio</span>
          </div>
          <div style="display:flex;align-items:center;gap:1.5rem">
            <a href="../index.html" style="color:#9da2c7;font-size:0.8rem;text-decoration:none;font-weight:600">← Back to Dashboard</a>
            <span class="pd-status">UX ARCHITECTURE &amp; TOKENS</span>
          </div>
        </header>

        <section class="pd-heading">
          <div>
            <p class="pd-eyebrow">DESIGN SYSTEM · ACCESSIBILITY · VIEWPORTS</p>
            <h1>
              Make your work<br />
              <em>tell your story.</em>
            </h1>
            <p class="pd-intro">
              UI/UX design system governing theme tokens (Aurora, Minimal, Neon),
              real-time WCAG contrast validation, typography scales, and responsive viewports.
            </p>
          </div>
          <div class="pd-step">
            <span>01</span>
            <span>Tokens</span>
            <i>—</i>
            <span>02</span>
            <span>WCAG Audit</span>
            <i>—</i>
            <span>03</span>
            <span>Preview</span>
          </div>
        </section>

        <section class="pd-workspace">
          <aside class="pd-panel">
            <div class="pd-panel-title">
              <div>
                <p class="pd-eyebrow">VISUAL DIRECTION</p>
                <h2>Theme &amp; UX Audit</h2>
              </div>
              <span class="pd-number">01</span>
            </div>

            <div class="pd-themes" id="themes-group">
              ${THEMES.map(
                (item) => `
                <button
                  type="button"
                  class="pd-theme ${state.theme === item.id ? "is-selected" : ""}"
                  data-theme-id="${item.id}"
                >
                  <span class="pd-swatch pd-swatch-${item.id}">
                    <b>${item.badge}</b>
                  </span>
                  <span>
                    <strong>${item.name}</strong>
                    <small>${item.note}</small>
                  </span>
                  <span class="pd-radio">${state.theme === item.id ? "✓" : ""}</span>
                </button>
              `
              ).join("")}
            </div>

            <div class="pd-row-2">
              <label>
                Font Family
                <select id="font-select">
                  ${FONTS.map(
                    (f) => `
                    <option value="${f.id}" ${state.fontId === f.id ? "selected" : ""}>
                      ${f.label}
                    </option>
                  `
                  ).join("")}
                </select>
              </label>

              <label>
                Accent Token
                <div class="pd-color-wrap">
                  <input type="color" id="accent-input" value="${state.accent}" />
                  <span id="accent-label">${state.accent.toUpperCase()}</span>
                </div>
              </label>
            </div>

            <div id="wcag-box" class="pd-wcag-box ${isAccessible ? "is-pass" : "is-warn"}">
              <div>
                <strong id="wcag-title">WCAG Contrast Ratio: ${contrastRatio}:1</strong>
                <small id="wcag-desc">
                  ${
                    isAccessible
                      ? "Passes WCAG AA readability on current theme"
                      : "Low contrast — pick a darker/brighter accent"
                  }
                </small>
              </div>
              <span id="wcag-pill" class="pd-wcag-pill">${isAccessible ? "AA PASS" : "CHECK"}</span>
            </div>

            <div class="pd-divider"></div>

            <div class="pd-panel-title">
              <div>
                <p class="pd-eyebrow">YOUR CONTENT</p>
                <h2>Profile &amp; Case Study</h2>
              </div>
              <span class="pd-number">02</span>
            </div>

            <label>
              Name
              <input id="name-input" value="${esc(state.name)}" autocomplete="off" />
            </label>
            <label>
              Role
              <input id="role-input" value="${esc(state.role)}" autocomplete="off" />
            </label>
            <label>
              Short introduction
              <textarea id="about-input" rows="2">${esc(state.about)}</textarea>
            </label>

            <div class="pd-toggle-row">
              <span>Include Case-Study Card</span>
              <input type="checkbox" id="cs-toggle" ${state.showCaseStudy ? "checked" : ""} />
            </div>

            <div id="cs-fields" style="${state.showCaseStudy ? "" : "display:none"}">
              <label>
                Featured project
                <input id="project-input" value="${esc(state.project)}" autocomplete="off" />
              </label>
              <label>
                Problem statement
                <textarea id="problem-input" rows="2">${esc(state.problem)}</textarea>
              </label>
              <label>
                Key outcome
                <textarea id="outcome-input" rows="2">${esc(state.outcome)}</textarea>
              </label>
            </div>

            <p class="pd-hint">
              Tokens map to <code>css/variables.css</code> across all templates.
            </p>
          </aside>

          <div class="pd-stage">
            <div class="pd-stage-toolbar">
              <div class="pd-viewport-tabs" id="viewports-group">
                ${VIEWPORTS.map(
                  (v) => `
                  <button
                    type="button"
                    data-vp-id="${v.id}"
                    class="pd-vp-btn ${state.viewport === v.id ? "is-active" : ""}"
                  >
                    ${v.label}
                  </button>
                `
                ).join("")}
              </div>
              <span class="pd-vp-size" id="vp-size-label">
                ${state.viewport.toUpperCase()} · 100%
              </span>
            </div>

            <div class="pd-preview-wrapper" id="preview-wrapper">
              <!-- Live preview rendered here without reloading the input fields -->
            </div>
          </div>
        </section>

        <footer class="pd-footer">
          UI/UX Architecture &amp; Design System for Developer Portfolio Builder
          <span>·</span> Sameera Khan
        </footer>
      </main>
    `;

    bindEvents();
    updatePreview();
  }

  // Update only the preview section and audit indicators (never destroys form inputs)
  function updatePreview() {
    const activeThemeObj = THEMES.find((t) => t.id === state.theme) || THEMES[0];
    const activeFont = FONTS.find((f) => f.id === state.fontId)?.family || FONTS[0].family;
    const activeViewportWidth = VIEWPORTS.find((v) => v.id === state.viewport)?.width || "100%";
    const contrastRatio = getContrastRatio(activeThemeObj.bg, state.accent);
    const isAccessible = parseFloat(contrastRatio) >= 4.5;
    const initials = getInitials(state.name);

    // Update contrast widget
    const wcagBox = document.getElementById("wcag-box");
    const wcagTitle = document.getElementById("wcag-title");
    const wcagDesc = document.getElementById("wcag-desc");
    const wcagPill = document.getElementById("wcag-pill");
    if (wcagBox && wcagTitle && wcagDesc && wcagPill) {
      wcagBox.className = `pd-wcag-box ${isAccessible ? "is-pass" : "is-warn"}`;
      wcagTitle.textContent = `WCAG Contrast Ratio: ${contrastRatio}:1`;
      wcagDesc.textContent = isAccessible
        ? "Passes WCAG AA readability on current theme"
        : "Low contrast — pick a darker/brighter accent";
      wcagPill.textContent = isAccessible ? "AA PASS" : "CHECK";
    }

    // Update accent label
    const accentLabel = document.getElementById("accent-label");
    if (accentLabel) {
      accentLabel.textContent = state.accent.toUpperCase();
    }

    // Update viewport label
    const vpSizeLabel = document.getElementById("vp-size-label");
    if (vpSizeLabel) {
      vpSizeLabel.textContent = `${state.viewport.toUpperCase()} · ${activeViewportWidth}`;
    }

    // Update theme button states
    document.querySelectorAll("#themes-group button").forEach((btn) => {
      const isSelected = btn.dataset.themeId === state.theme;
      btn.classList.toggle("is-selected", isSelected);
      const radio = btn.querySelector(".pd-radio");
      if (radio) radio.textContent = isSelected ? "✓" : "";
    });

    // Update viewport button states
    document.querySelectorAll("#viewports-group button").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.vpId === state.viewport);
    });

    // Render preview content inside #preview-wrapper
    const previewWrapper = document.getElementById("preview-wrapper");
    if (!previewWrapper) return;

    previewWrapper.innerHTML = `
      <section
        class="pd-preview pd-preview-${state.theme}"
        aria-label="Live portfolio preview"
        style="width:${activeViewportWidth}; font-family:${activeFont}; --user-accent:${state.accent}"
      >
        <div class="pd-previewbar">
          <span>
            <b class="pd-live-dot"></b> LIVE PREVIEW · ${state.theme.toUpperCase()}
          </span>
          <span>CONTRAST ${contrastRatio}:1</span>
        </div>

        <div class="pd-preview-content">
          <div class="pd-preview-nav">
            <span class="pd-preview-logo">${esc(initials)}</span>
            <span>ABOUT&nbsp;&nbsp;&nbsp;WORK&nbsp;&nbsp;&nbsp;CONTACT</span>
          </div>

          <p class="pd-preview-kicker">HELLO, I'M</p>
          <h2>
            ${esc(state.name || "Your name")}<span>.</span>
          </h2>
          <p class="pd-preview-role">${esc(state.role || "Your role")}</p>
          <p class="pd-preview-about">
            ${esc(state.about || "A short introduction about you.")}
          </p>

          <button type="button" class="pd-cta" onclick="event.preventDefault()">
            Explore my work <span>↗</span>
          </button>

          ${
            state.showCaseStudy
              ? `
            <div class="pd-project">
              <div class="pd-project-main">
                <p class="pd-preview-kicker">FEATURED PROJECT · 01</p>
                <h3>${esc(state.project || "Your featured project")}</h3>
                <div class="pd-cs-grid">
                  <div>
                    <strong>01 · PROBLEM</strong>
                    <p>${esc(state.problem)}</p>
                  </div>
                  <div>
                    <strong>02 · OUTCOME</strong>
                    <p>${esc(state.outcome)}</p>
                  </div>
                </div>
              </div>
              <div class="pd-project-art">
                <span>✳</span>
                <small>CASE<br />STUDY</small>
              </div>
            </div>
          `
              : ""
          }

          <div class="pd-preview-foot">
            <span>DESIGNED WITH INTENTION</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </div>
      </section>
    `;
  }

  function bindEvents() {
    // Theme buttons
    document.querySelectorAll("#themes-group button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        state.theme = btn.dataset.themeId;
        updatePreview();
      });
    });

    // Viewport buttons
    document.querySelectorAll("#viewports-group button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        state.viewport = btn.dataset.vpId;
        updatePreview();
      });
    });

    // Font select
    const fontSelect = document.getElementById("font-select");
    if (fontSelect) {
      fontSelect.addEventListener("change", (e) => {
        state.fontId = e.target.value;
        updatePreview();
      });
    }

    // Accent color
    const accentInput = document.getElementById("accent-input");
    if (accentInput) {
      accentInput.addEventListener("input", (e) => {
        state.accent = e.target.value;
        updatePreview();
      });
    }

    // Name, role, about
    const nameInput = document.getElementById("name-input");
    if (nameInput) {
      nameInput.addEventListener("input", (e) => {
        state.name = e.target.value;
        updatePreview();
      });
    }

    const roleInput = document.getElementById("role-input");
    if (roleInput) {
      roleInput.addEventListener("input", (e) => {
        state.role = e.target.value;
        updatePreview();
      });
    }

    const aboutInput = document.getElementById("about-input");
    if (aboutInput) {
      aboutInput.addEventListener("input", (e) => {
        state.about = e.target.value;
        updatePreview();
      });
    }

    // Toggle case study
    const csToggle = document.getElementById("cs-toggle");
    const csFields = document.getElementById("cs-fields");
    if (csToggle) {
      csToggle.addEventListener("change", (e) => {
        state.showCaseStudy = e.target.checked;
        if (csFields) {
          csFields.style.display = state.showCaseStudy ? "block" : "none";
        }
        updatePreview();
      });
    }

    // Project, problem, outcome
    const projectInput = document.getElementById("project-input");
    if (projectInput) {
      projectInput.addEventListener("input", (e) => {
        state.project = e.target.value;
        updatePreview();
      });
    }

    const problemInput = document.getElementById("problem-input");
    if (problemInput) {
      problemInput.addEventListener("input", (e) => {
        state.problem = e.target.value;
        updatePreview();
      });
    }

    const outcomeInput = document.getElementById("outcome-input");
    if (outcomeInput) {
      outcomeInput.addEventListener("input", (e) => {
        state.outcome = e.target.value;
        updatePreview();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", initPage);
  if (document.readyState === "complete" || document.readyState === "interactive") {
    initPage();
  }
})();
