# FINCEPT Purdue — website

React + Vite + React Router. No UI library; all shapes are hand-built SVG/CSS.

## Run it

Requires Node 18+ (https://nodejs.org).

```bash
cd fincept-purdue
npm install
npm run dev        # opens at http://localhost:5173
```

Production build: `npm run build` (output in `dist/`), preview with `npm run preview`.
When hosting the build, configure the host to serve `index.html` for all routes (SPA fallback).

## Where to edit

| What | File |
| --- | --- |
| Email, LinkedIn, Instagram, apply link, application dates, contact-form endpoint | `src/config.js` |
| Home content (pillars, stats, mission/vision) | `src/pages/Home.jsx` |
| Leadership roles + descriptions | `src/pages/Team.jsx` |
| Membership copy, dates, team makeup | `src/pages/Membership.jsx` |
| Partner value, examples, past projects, case comps | `src/pages/Partners.jsx` |
| Colors / fonts | `:root` in `src/styles/base.css` |

## Contact form

With `formEndpoint: ''` the form opens the visitor's email app with the message pre-filled.
For true in-page sending, create a free Formspree or FormSubmit endpoint and paste it into `src/config.js`.

## Scroll animations (and why)

- Hero candlesticks grow on load and drift as you scroll (the chart "moves" with you).
- About: the three-pillar staircase builds step by step with scroll.
- Quote hexagon draws its outline when it arrives.
- Impact numbers count up and bars fill when visible.
- Org chart / membership tree: connectors draw in, nodes appear level by level.
- Membership: "what makes us unique" highlights the item in the middle of the screen; the how-it-works line fills with scroll.
- Partners: the case-competition timeline fills as you read down it.
- Footer wordmark fills green as you reach the end; thin progress bar at the top of the page.

All motion is disabled for visitors with "reduce motion" turned on.
