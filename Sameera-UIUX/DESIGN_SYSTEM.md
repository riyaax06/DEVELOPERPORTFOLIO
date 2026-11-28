# Sameera Khan — UI/UX Design & Visual Architecture

## Project
Developer Portfolio & Case-Study Builder

## Role
UI/UX Design, Accessibility & Visual Architecture (`Sameera-UIUX/`)

## Contribution Overview
This directory contains the interactive UI/UX design system, accessibility validator, and visual prototype for the Developer Portfolio & Case-Study Builder. It governs the design tokens, typography hierarchy, WCAG contrast rules, responsive viewport behavior, and structured case-study layout used across the application.

## Key Features Demonstrated
- **Three Signature Themes:** Live switching between **Aurora** (dark glassmorphism), **Minimal** (editorial light), and **Neon** (cyberpunk terminal) styles.
- **Live WCAG Accessibility Audit:** Real-time relative luminance calculation verifying that custom accent colors meet the **>= 4.5:1 WCAG AA contrast ratio** against each theme background.
- **Typography & Accent Tokens:** Dynamic Google Font switching (*DM Sans*, *Playfair Display*, *DM Mono*) and live accent customization via CSS custom properties (`--user-accent`).
- **Responsive Viewport Switcher:** Instant preview across **Desktop (`100%`)**, **Tablet (`620px`)**, and **Mobile (`375px`)** containers.
- **Structured Case-Study Layout:** Toggleable project showcase highlighting **01 · Problem** and **02 · Outcome** sections.

## Files
- `PortfolioDesign.jsx` — Interactive React prototype featuring theme tokens, live WCAG contrast calculation, viewport toggling, and case-study preview.
- `PortfolioDesign.css` — Modular stylesheet defining layout grids, glassmorphism effects, theme variables, WCAG status indicators, and responsive breakpoints.
- `DESIGN_SYSTEM.md` — Formal UI/UX specification covering the 8pt spacing grid, CSS design tokens, WCAG 2.1 standards, and Nielsen's usability heuristics.
