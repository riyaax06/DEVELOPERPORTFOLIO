# UI/UX Design System & Accessibility Specification

**Author:** Sameera Khan (2415001394)  
**Module:** `Sameera-UIUX` — Visual Architecture, Design Tokens & UX Governance  
**Project:** Developer Portfolio & Case-Study Builder  

---

## 1. Design Token Architecture
All visual styles across the application are governed by centralized CSS Custom Properties rather than hardcoded values, ensuring consistency across all templates:

| Token Category | CSS Variable | Purpose |
| :--- | :--- | :--- |
| **Theme Surface** | `--bg-surface` | Controls base canvas (`#1c1e34` Aurora, `#f4eee5` Minimal, `#060912` Neon) |
| **User Accent** | `--user-accent` | Dynamically updates CTAs, active indicators, and case-study badges |
| **Typography** | `--font-primary` | Switches seamlessly between `DM Sans`, `Playfair Display`, and `DM Mono` |

---

## 2. Spacing & Layout Grid
- **8pt Spatial System:** All padding, gaps, and card margins follow multiples of `4px` and `8px` (`8px`, `12px`, `16px`, `24px`, `36px`) for predictable visual rhythm.
- **Fluid Typography (`clamp()`):** Headings scale automatically between mobile (`34px`) and desktop (`58px`) without abrupt layout jumps.
- **Responsive Breakpoints:**
  - `> 850px`: Split-screen studio workspace (Controls + Live Stage).
  - `<= 850px`: Single-column stacked editor for tablets.
  - `<= 520px`: Single-column case-study cards for mobile screens.

---

## 3. WCAG 2.1 Accessibility Standards
- **Real-Time Contrast Validation:** `PortfolioDesign.jsx` calculates relative luminance (`L = 0.2126R + 0.7152G + 0.0722B`) to verify that user-selected accent colors maintain a **>= 4.5:1 contrast ratio (WCAG AA)** against the active theme background.
- **Keyboard & Screen-Reader Support:** Interactive theme cards use `aria-pressed` states and clear focus rings (`box-shadow: 0 0 0 3px`).

---

## 4. Applied Usability Heuristics (Jakob Nielsen)
1. **Visibility of System Status:** Live preview indicator dot, active viewport pixel readout (`100%`, `620px`, `375px`), and instant WCAG pass/warning feedback.
2. **Match Between System & Real World:** Structured case-study sections (*Problem* -> *Outcome*) mirror how engineering recruiters evaluate portfolios.
3. **Aesthetic & Minimalist Design:** High signal-to-noise ratio with progressive disclosure (users can toggle the case-study module on or off).
