import { useState } from "react";
import "./PortfolioDesign.css";

const THEMES = [
  { id: "aurora", name: "Aurora", note: "Dark · Glassmorphism", badge: "Ag" },
  { id: "minimal", name: "Minimal", note: "Editorial · Light", badge: "Ag" },
  { id: "neon", name: "Neon", note: "Cyberpunk · Terminal", badge: ">_" },
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

export default function PortfolioDesign() {
  const [theme, setTheme] = useState("aurora");
  const [fontId, setFontId] = useState("sans");
  const [viewport, setViewport] = useState("desktop");
  const [accent, setAccent] = useState("#c9f27a");

  // Profile & Structured Case-Study State
  const [name, setName] = useState("Alex Morgan");
  const [role, setRole] = useState("Frontend Developer");
  const [about, setAbout] = useState(
    "I build accessible, thoughtful digital experiences with clean design systems."
  );
  const [project, setProject] = useState("A portfolio that tells a story");
  const [problem, setProblem] = useState(
    "Developers struggle to present raw repositories as structured, recruiter-ready case studies."
  );
  const [outcome, setOutcome] = useState(
    "Client-side template engine with instant theme switching and standalone HTML export."
  );
  const [showCaseStudy, setShowCaseStudy] = useState(true);

  const activeFont =
    FONTS.find((f) => f.id === fontId)?.family || FONTS[0].family;
  const activeViewportWidth =
    VIEWPORTS.find((v) => v.id === viewport)?.width || "100%";

  const initials =
    name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AM";

  return (
    <main className="pd-shell">
      <header className="pd-topbar">
        <div className="pd-brand">
          <span className="pd-mark">✳</span> folio
          <span className="pd-muted">/studio</span>
        </div>
        <span className="pd-status">UI/UX DESIGN SYSTEM</span>
      </header>

      <section className="pd-heading">
        <div>
          <p className="pd-eyebrow">PORTFOLIO BUILDER · UI/UX ARCHITECTURE</p>
          <h1>
            Make your work
            <br />
            <em>tell your story.</em>
          </h1>
          <p className="pd-intro">
            Shape a clear, personal portfolio with live theme tokens (Aurora,
            Minimal, Neon), typography controls, and responsive viewport previews.
          </p>
        </div>
        <div className="pd-step">
          <span>01</span>
          <span>Profile</span>
          <i>—</i>
          <span>02</span>
          <span>Tokens</span>
          <i>—</i>
          <span>03</span>
          <span>Preview</span>
        </div>
      </section>

      <section className="pd-workspace">
        {/* Left Control Panel */}
        <aside className="pd-panel">
          <div className="pd-panel-title">
            <div>
              <p className="pd-eyebrow">VISUAL DIRECTION</p>
              <h2>Theme & Tokens</h2>
            </div>
            <span className="pd-number">01</span>
          </div>

          <div className="pd-themes">
            {THEMES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`pd-theme ${theme === item.id ? "is-selected" : ""}`}
                onClick={() => setTheme(item.id)}
                aria-pressed={theme === item.id}
              >
                <span className={`pd-swatch pd-swatch-${item.id}`}>
                  <b>{item.badge}</b>
                </span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.note}</small>
                </span>
                <span className="pd-radio">
                  {theme === item.id ? "✓" : ""}
                </span>
              </button>
            ))}
          </div>

          <div className="pd-row-2">
            <label>
              Font Family
              <select
                value={fontId}
                onChange={(e) => setFontId(e.target.value)}
              >
                {FONTS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Accent Color
              <div className="pd-color-wrap">
                <input
                  type="color"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                />
                <span>{accent.toUpperCase()}</span>
              </div>
            </label>
          </div>

          <div className="pd-divider" />

          <div className="pd-panel-title">
            <div>
              <p className="pd-eyebrow">YOUR CONTENT</p>
              <h2>Profile & Case Study</h2>
            </div>
            <span className="pd-number">02</span>
          </div>

          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Role
            <input value={role} onChange={(e) => setRole(e.target.value)} />
          </label>
          <label>
            Short introduction
            <textarea
              rows="2"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>

          <div className="pd-toggle-row">
            <span>Include Case-Study Card</span>
            <input
              type="checkbox"
              checked={showCaseStudy}
              onChange={(e) => setShowCaseStudy(e.target.checked)}
            />
          </div>

          {showCaseStudy && (
            <>
              <label>
                Featured project
                <input
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                />
              </label>
              <label>
                Problem statement
                <textarea
                  rows="2"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                />
              </label>
              <label>
                Key outcome
                <textarea
                  rows="2"
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                />
              </label>
            </>
          )}

          <p className="pd-hint">
            All tokens map directly to CSS custom properties in{" "}
            <code>css/variables.css</code>.
          </p>
        </aside>

        {/* Right Live Preview Stage */}
        <div className="pd-stage">
          <div className="pd-stage-toolbar">
            <div className="pd-viewport-tabs">
              {VIEWPORTS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setViewport(v.id)}
                  className={`pd-vp-btn ${viewport === v.id ? "is-active" : ""}`}
                >
                  {v.label}
                </button>
              ))}
            </div>
            <span className="pd-vp-size">
              {viewport.toUpperCase()} · {activeViewportWidth}
            </span>
          </div>

          <div className="pd-preview-wrapper">
            <section
              className={`pd-preview pd-preview-${theme}`}
              aria-label="Live portfolio preview"
              style={{
                width: activeViewportWidth,
                fontFamily: activeFont,
                "--user-accent": accent,
              }}
            >
              <div className="pd-previewbar">
                <span>
                  <b className="pd-live-dot" /> LIVE PREVIEW ·{" "}
                  {theme.toUpperCase()}
                </span>
                <span>PORTFOLIO / 2026</span>
              </div>

              <div className="pd-preview-content">
                <div className="pd-preview-nav">
                  <span className="pd-preview-logo">{initials}</span>
                  <span>ABOUT&nbsp;&nbsp;&nbsp;WORK&nbsp;&nbsp;&nbsp;CONTACT</span>
                </div>

                <p className="pd-preview-kicker">HELLO, I&apos;M</p>
                <h2>
                  {name || "Your name"}
                  <span>.</span>
                </h2>
                <p className="pd-preview-role">{role || "Your role"}</p>
                <p className="pd-preview-about">
                  {about || "A short introduction about you."}
                </p>

                <button type="button" className="pd-cta">
                  Explore my work <span>↗</span>
                </button>

                {showCaseStudy && (
                  <div className="pd-project">
                    <div className="pd-project-main">
                      <p className="pd-preview-kicker">FEATURED PROJECT · 01</p>
                      <h3>{project || "Your featured project"}</h3>
                      <div className="pd-cs-grid">
                        <div>
                          <strong>01 · PROBLEM</strong>
                          <p>{problem}</p>
                        </div>
                        <div>
                          <strong>02 · OUTCOME</strong>
                          <p>{outcome}</p>
                        </div>
                      </div>
                    </div>
                    <div className="pd-project-art">
                    <div className="pd-project-art">
                      <span>✳</span>
                      <small>
                        CASE
                        <br />
                        STUDY
                      </small>
                    </div>
                  </div>
                )}

                <div className="pd-preview-foot">
                  <span>DESIGNED WITH INTENTION</span>
                  <span>SCROLL TO EXPLORE ↓</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <footer className="pd-footer">
        A UI/UX design system for the Developer Portfolio & Case-Study Builder{" "}
        <span>·</span> Sameera Khan
      </footer>
    </main>
  );
}
