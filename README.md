# Eswar Rao — AI-Agent Portfolio

A responsive Next.js portfolio inspired by the supplied AI-agent portfolio guide. Uses resume-supported information only.

## Requirements
- Node.js 20.9 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000/?agents=on

## Build for production
```bash
npm run build
npm start
```

## Deploy free on Vercel
1. Create a GitHub repository and push this folder.
2. Sign in to https://vercel.com and import the repository.
3. Keep the default Next.js settings and deploy.

## Personalize before publishing
- Confirm that you want your email address publicly visible.
- Add your real LinkedIn and GitHub profile URLs in `app/page.tsx` when available.
- Review your public education and location details.
- The resume PDF is intentionally not included in `public/` to avoid publishing personal information.

## Controls
- Pause: pause animated cursor movement.
- Agents On/Off: toggle cursor agents (preference saved locally).
- Tour: auto-scroll the page for a screen recording; scroll or press Escape to stop.
- Replay: return to the top and replay the hero build state.
- Keyboard: `T` starts the tour, `A` toggles agents, `P` pauses/resumes agents, `Esc` stops the tour. `?agents=on` forces agents on, `?agents=off` disables them.
