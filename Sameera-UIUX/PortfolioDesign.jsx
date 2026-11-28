import { useState } from "react";
import "./PortfolioDesign.css";

const THEMES = [
  { id: "aurora", name: "Aurora", note: "Dark · Glassmorphism", badge: "Aa" },
  { id: "minimal", name: "Minimal", note: "Light · Editorial", badge: "Aa" },
  { id: "neon", name: "Neon", note: "Cyberpunk · Terminal", badge: ">_" },
];

const FONTS = [
  { id: "sans", label: "DM Sans (Modern)", family: "'DM Sans', sans-serif" },
  { id: "serif", label: "Playfair (Editorial)", family: "'Playfair Display', serif" },
  { id: "mono", label: "DM Mono (Developer)", family: "'DM Mono', monospace" },
];

const VIEWPORTS = [
  { id: "desktop", label: "Desktop", width: "100%" },
  { id: "tablet", label: "Tablet", width: "640px" },
  { id: "mobile", label: "Mobile", width: "375px" },
];

export default function PortfolioDesign() {
  const [theme, setTheme] = useState("aurora");
  const [font, setFont] = useState(FONTS[0]);
  const [viewport, setViewport] = useState("desktop");
  const [accent, setAccent] = useState("#a78bfa");

  // Profile & Case-Study Content State
  const [name, setName] = useState("Alex Morgan");
  const [role, setRole] = useState("Full-Stack Frontend Engineer");
  const [about, setAbout] = useState(
    "I craft accessible, high-performance web applications and structured design systems."
  );
  const [projectTitle, setProjectTitle] = useState("DevPortfolio & Case-Study Builder");
  const [problem, setProblem] = useState(
    "Developers struggle to turn raw GitHub repos into structured, recruiter-ready case studies."
  );
  const [outcome, setOutcome] = useState(
    "Zero-backend client-side builder with live theming and 1-click static HTML export."
  );
  const [showCaseStudy, setShowCaseStudy] = useState(true);

  const activeViewportWidth =
    VIEWPORTS.find((v) => v.id === viewport)?.width || "100%";

  return (
    <main className="pd-shell">
      {/* Top Studio Header */}
      <header className="pd-topbar">
        <div className="pd-brand">
          <span className="pd-mark">✳</span> folio
          <span className="pd-muted">/studio · UI/UX System</span>
        </div>
        <div className="pd-topbar-meta">
          <span className="pd-status">UI/UX DESIGN PROTOTYPE</span>
        </div>
      </header>

      {/* Hero Header */}
      <section className="pd-heading">
        <div>
          <p className="pd-eyebrow">DESIGN SYSTEM & VISUAL ARCHITECTURE</p>
          <h1>
            Craft portfolios that <em>tell a story.</em>
          </h1>
          <p className="pd-intro">
            Interactive UI/UX reference showcasing live theme switching (Aurora,
            Minimal, Neon), typography tokens, responsive viewports, and
            structured case-study layouts.
          </p>
        </div>
        <div className="pd-step">
          <span>01</span> <span>Configure Tokens</span>
          <i>→</i>
          <span>02</span> <span>Live Preview</span>
          <i>→</i>
          <span>03</span> <span>Export HTML</span>
        </div>
      </section>

      {/* Main Split Workspace */}
      <section className="pd-workspace">
        {/* Left Control Panel */}
        <aside className="pd-panel">
          <div className="pd-panel-title">
            <div>
              <p className="pd-eyebrow">CUSTOMIZATION</p>
              <h2>Theme & Visual Tokens</h2>
            </div>
            <span className="pd-number">01/02</span>
          </div>

          {/* Theme Switcher */}
          <div className="pd-control-group">
            <span className="pd-group-label">Select Portfolio Theme</span>
            <div className="pd-themes">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`pd-theme ${theme === t.id ? "is-selected" : ""}`}
                >
                  <span className={`pd-swatch pd-swatch-${t.id}`}>
                    {t.badge}
                  </span>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.note}</small>
                  </div>
                  <span className="pd-radio">
                    {theme === t.id ? "✓" : ""}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pd-divider" />

          {/* Typography & Accent Controls */}
          <div className="pd-row-2">
            <label>
              Typography
              <select
                value={font.id}
                onChange={(e) =>
                  setFont(FONTS.find((f) => f.id === e.target.value) || FONTS[0])
                }
              >
                {FONTS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Accent Token
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

          {/* Content Inputs */}
          <label>
            Developer Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Headline / Role
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </label>

          <label>
            Short Bio
            <textarea
              rows="2"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>

          <div className="pd-divider" />

          {/* Case Study Controls */}
          <div className="pd-toggle-row">
            <span>Show Structured Case Study</span>
            <input
              type="checkbox"
              checked={showCaseStudy}
              onChange={(e) => setShowCaseStudy(e.target.checked)}
            />
          </div>

          {showCaseStudy && (
            <>
              <label>
                Featured Case-Study Title
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
              </label>
              <label>
                Problem Statement
                <textarea
                  rows="2"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                />
              </label>
              <label>
                Outcome & Impact
                <textarea
                  rows="2"
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                />
              </label>
            </>
          )}

          <p className="pd-hint">
            All UI tokens map directly to CSS custom properties in{" "}
            <code>css/variables.css</code>.
          </p>
        </aside>

        {/* Right Live Preview Stage */}
        <div className="pd-stage">
          {/* Viewport Switcher Toolbar */}
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

          {/* Responsive Preview Frame */}
          <div className="pd-preview-wrapper">
            <article
              className={`pd-preview pd-preview-${theme}`}
              style={{
                width: activeViewportWidth,
                fontFamily: font.family,
                "--user-accent": accent,
              }}
            >
              <div className="pd-previewbar">
                <span>
                  <i className="pd-live-dot" />
                  LIVE PREVIEW · {theme.toUpperCase()} THEME
                </span>
                <span>2026 EDITION</span>
              </div>

              <div className="pd-preview-content">
                <nav className="pd-preview-nav">
                  <span className="pd-preview-logo">
                    {name.slice(0, 2).toUpperCase() || "AM"}
                  </span>
                  <div>WORK · CASE STUDIES · CONTACT</div>
                </nav>

                <p className="pd-preview-kicker">AVAILABLE FOR OPPORTUNITIES</p>
                <h2>
                  {name}
                  <span>.</span>
                </h2>
                <p className="pd-preview-role">{role}</p>
                <p className="pd-preview-about">{about}</p>

                <button type="button" className="pd-cta">
                  Explore Case Studies <span>↗</span>
                </button>

                {showCaseStudy && (
                  <div className="pd-project">
                    <div className="pd-project-body">
                      <p className="pd-preview-kicker">FEATURED CASE STUDY</p>
                      <h3>{projectTitle}</h3>
                      <div className="pd-cs-grid">
                        <div>
                          <strong>01 · Problem</strong>
                          <p>{problem}</p>
