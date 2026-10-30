# Web Refresher – Student Developer Profile

Mohamed Shermarkia · Web Dev II (CCO5104-20P) · Formative brief 1

A single-page responsive profile built with HTML5, CSS and JavaScript (no React).

## How to run

Open `index.html` in a browser. No build step or server needed.

## File structure

```
web-refresher/
├── index.html        Page structure (semantic HTML5)
├── css/styles.css    All styling, mobile-first, one media query at 768px
├── js/script.js      All interactivity
├── assets/avatar.svg Logo image used in the hero
└── README.md
```

## What the page demonstrates

- **HTML5:** `header`, `nav`, `main`, `section`, `footer`; one `h1`, then `h2`/`h3` in order; alt text on the image; labelled form fields; a skip link.
- **CSS:** custom properties for colours, Flexbox (header, hero, filters, skills), Grid (about columns, project list, form).
- **Responsive:** mobile-first base styles; `@media (min-width: 768px)` switches to the desktop layout and shows the full nav.
- **JavaScript:** theme switcher saved in `localStorage`, mobile menu toggle, project filter with a live count, show/hide panel, and contact form validation with a character counter.

## Testing

Tested in Chrome DevTools device mode at 375px (iPhone-sized) and 1366px (laptop).

| Check | Result |
|---|---|
| No horizontal scroll at 375px | Pass |
| Menu button opens/closes nav on phone, hidden on desktop | Pass |
| Project filter shows correct projects and count | Pass |
| Theme switcher changes colours and is remembered after reload | Pass |
| Form shows errors for empty/invalid fields, success when valid | Pass |
| Console errors | None |

Issue found and fixed: at 375px the header buttons wrapped onto a second line, pushing the theme switch under the logo. I reduced the button padding and the header gap so everything fits on one row.

## Reflection

The HTML structure and layout were the easy part. I build single-page sites for clients, so the header, nav, sections and a Grid of project cards came quickly. Writing the CSS mobile-first also kept my one media query short.

The harder part was the detail I usually skip on client work. Getting the buttons to tell screen readers whether they were open or pressed took longer than making them work. Testing at 375px in DevTools caught a bug where the header buttons wrapped onto a second line, which I would not have seen on my laptop. I also used Claude to help draft some of the code, so I went back through each function until I could explain it myself.

In Web Development II I want to test more properly, with a checklist I run every time instead of checking by eye.
