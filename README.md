# Developer Portfolio Builder

**A customizable portfolio creation platform for developers.**

Build, personalize, preview, and export professional developer portfolios through an intuitive interface. Choose from three distinct design systems — Aurora, Minimal, and Neon — and showcase your profile, technical skills, and projects in a structured, recruiter-friendly format.

[Repository](https://github.com/riyaax06/DEVELOPERPORTFOLIO)

---

## Overview

Developer Portfolio Builder is a frontend application designed to simplify the process of creating professional developer portfolios.

Instead of manually designing and coding a portfolio website, users can manage their information, organize projects, select a visual theme, customize their portfolio, and generate a standalone HTML version.

The application focuses on usability, responsive design, customization, and reusable template architecture.

## Key Features

| Feature | Description |
|---|---|
| Multiple Templates | Three distinct portfolio themes: Aurora, Minimal, and Neon |
| Profile Management | Manage personal details, professional summary, and contact information |
| Skills Management | Organize technical skills and proficiency levels |
| Project Builder | Create structured project case studies |
| Live Editor | Customize visual settings, colors, fonts, and sections |
| Live Preview | Preview portfolio changes before exporting |
| Authentication | Sign-in, registration, and demo access |
| Local Persistence | Store application data using browser localStorage |
| HTML Export | Generate a standalone portfolio HTML document |
| Responsive UI | Layouts optimized for desktop, tablet, and mobile |

## Design System

### Aurora
A sophisticated dark interface featuring atmospheric gradients, glass-inspired surfaces, and electric blue and purple accents.

### Minimal
A clean editorial design focused on readability, balanced whitespace, elegant typography, and professional presentation.

### Neon
A futuristic developer-inspired interface featuring terminal aesthetics, dark surfaces, and controlled neon accents.

## Technology Stack

**Frontend**
- HTML5
- CSS3
- Vanilla JavaScript

**Browser APIs**
- LocalStorage API
- DOM API

**Development Tools**
- Visual Studio Code
- Git
- GitHub
- Node.js / npm for local development server

## Application Architecture

The application follows a modular frontend structure, separating application pages, shared styles, core logic, and portfolio template rendering.

```text
DEVELOPERPORTFOLIO/
│
├── index.html
├── README.md
│
└── DEVELOPERPORTFOLIO-main/
    ├── landing.html
    ├── index.html
    │
    ├── css/
    ├── riya-css/
    │
    ├── js/
    │   ├── core/
    │   │   └── store.js
    │   │
    │   └── templates/
    │       ├── template-aurora.js
    │       ├── template-minimal.js
    │       └── template-neon.js
    │
    └── pages/
        ├── auth.html
        ├── personal-info.html
        ├── project-builder.html
        ├── template-gallery.html
        ├── live-editor.html
        └── portfolio.html
```

## Getting Started

### Prerequisites

- Git
- Node.js and npm
- A modern web browser

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/riyaax06/DEVELOPERPORTFOLIO.git
```

**2. Navigate to the project directory**

```bash
cd DEVELOPERPORTFOLIO
```

**3. Start the local development server**

```bash
npx serve .
```

**4. Open the application**

Visit:

```text
http://localhost:3000
```

If the root route does not open the landing page, navigate to:

```text
http://localhost:3000/DEVELOPERPORTFOLIO-main/landing.html
```

## How It Works

1. **Access the application** through the landing page.
2. **Authenticate** using an account or demo access.
3. **Build your profile** by entering personal and professional details.
4. **Add technical skills** and organize your proficiency levels.
5. **Create project case studies** to highlight your work.
6. **Choose a template** from Aurora, Minimal, or Neon.
7. **Customize the design** using the live editor.
8. **Preview and export** your completed portfolio as standalone HTML.

## Data Management

The application uses browser localStorage for client-side persistence.

Profile information, project details, settings, and local session data are maintained in the browser.

**Current limitation:** Data is browser-specific and is not automatically synchronized across devices or users through a cloud database.

## Responsive Design

The interface is designed to adapt to:

- Desktop displays
- Tablet screens
- Mobile devices

The portfolio templates use responsive layouts and mobile navigation to provide a consistent browsing experience across screen sizes.

## Project Goals

- Simplify developer portfolio creation.
- Provide reusable and customizable portfolio templates.
- Improve project presentation through structured case studies.
- Maintain a responsive and accessible user experience.
- Enable portable portfolio exports without requiring a hosting platform.

## Future Development

- Cloud-based database integration
- Portfolio hosting and publishing
- Additional professional templates
- Extended theme customization
- User account synchronization
- Portfolio analytics and insights
- 
**Developer Portfolio Builder**

*Designed to make professional portfolio creation simpler.*

</p>
