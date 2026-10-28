# Fit Log

A workout library and planning app. Browse training sessions, open the details, and build your own plan.

Live data comes from the Fit Log API (`https://api.abcz.workers.dev/api/fitlog`) with a fallback endpoint.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- lucide-react icons

## Features

1. Home page hero banner with the full workout library
2. Sort dropdown for the library (duration and other keys)
3. Workout details page with a two-column layout
4. Add workouts to My Plan, save them for later, or remove them
5. Mark planned workouts as done with a progress indicator
6. Toasts for every plan action
7. Fully responsive layout for mobile, tablet and desktop
8. Custom 404 page

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` start the dev server
- `npm run build` production build
- `npm start` serve the production build
- `npm run lint` lint the project
