# PeerSupportSite

PeerSupportSite is a zero-backend static site that offers a calm, supportive space for students to reflect on emotions, view wellbeing tips, and access campus resources. It's privacy-first and not a replacement for professional care.

Getting started

1. Open this folder in VS Code.
2. (Recommended) Install the Live Server extension and start it, or open `index.html` in your browser.

Files created

- `index.html` — Homepage with mood selector, journal, and breathing exercise
- `about.html` — Purpose and guidance page
- `resources.html` — Support resources and helplines
- `css/styles.css` — responsive styles, dark mode, and modal
- `js/app.js` — client-side features: mood persistence, tips, journal/history, dark mode, breathing
- `.vscode/settings.json` — Live Server port and root
- `.gitignore` — ignores `node_modules` and `.DS_Store`

New features

- Dark mode toggle with persisted preference.
- Mood journaling and history saved in `localStorage` (export not included; privacy-first).
- Guided breathing modal (simple 4-cycle breathing routine).
- Accessible interactions: keyboard support, aria-live regions, reduced-motion respect.

Design notes

- Color palette: warm calming teal (`#6AA7A1`), soft peach (`#F5C6AA`), gentle lavender (`#CDB4DB`), neutral/card background (`#FFFFFF`) and warm background (`#FFFAF6`).
- JavaScript features: mood selector, tips panel, autosaved journal, dark-mode persistence, and a breathing exercise.
- UX principles: Compassion-first language, clear actions, keyboard accessibility, readable typography, low cognitive load, and optional reduced-motion.

Notes

This project intentionally avoids backend or AI integration to remain safe and private. To extend it, consider adding secure server-side storage (with user consent), institution-specific resource links, or optional analytics with explicit opt-in.
