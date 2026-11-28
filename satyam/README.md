# Portfolio Assistant

A self-contained, responsive chatbot page for the DevPortfolio Builder. It answers common questions about profiles, project case studies, templates, and exporting without a server or API key.

## Open it

From the project root, open `satyam/index.html` in a browser, or serve the project root with a local static server and visit `/satyam/`.

The assistant can read the app's `dpb_profile` and `dpb_projects` browser storage entries to personalize a few replies. It does not change or transmit saved portfolio data.

## Resume printout

Choose **Resume printout** in the assistant header to create a resume from the same saved profile and project data. Use **Print / Save as PDF** and select a printer or PDF destination in the browser print dialog. For saved data to appear, open the resume page in the same browser and origin as the main app.

## Project shortcuts

The floating **Help** button in the dashboard and portfolio-building pages links to both the chatbot and resume printout. `project-widget.js` and `project-widget.css` live in this folder; the app pages load that shared widget.
