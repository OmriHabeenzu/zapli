# Zapli — Animated Search

A single-page web app featuring a scroll-triggered space animation that transitions into an AI-powered web search chat interface.

## Animation Theme

**The Universe of Knowledge** — As you scroll, you journey through space:
- **Phase 1 (0-25%)**: Title reveals against a starfield with twinkling stars and nebula glow
- **Phase 2 (20-50%)**: A solar system materialises — a planet with rings, orbiting moons, and data streams spinning around it
- **Phase 3 (45-80%)**: Transition prompt appears, guiding the user toward the search interface
- **Transition (60-85%)**: Smooth fade from dark space into the chat interface

## Tech Stack

- **React** with TypeScript
- **Tavily Search API** for real-time web search
- **CSS animations** (no external animation libraries — pure CSS keyframes + scroll-driven transforms)
- **Axios** for API requests

## Setup

1. Clone the repo:
```bash
git clone https://github.com/OmriHabeenzu/zapli.git
cd zapli
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
REACT_APP_TAVILY_API_KEY=your_tavily_api_key_here
```
Get a free API key at [tavily.com](https://tavily.com)

4. Run locally:
```bash
npm start
```

5. Build for production:
```bash
npm run build
```

## Live Demo

[https://zapli.vercel.app](https://zapli.vercel.app)

## What I'd Improve With More Time

- **Scroll animation**: Add more phases — black hole effect, warp speed transition
- **Chat**: Add conversation history with context, streaming responses
- **Performance**: Use Intersection Observer instead of scroll events for better performance
- **Search**: Add image results, news filtering, date range
- **UI**: Add keyboard shortcuts, search suggestions, copy to clipboard
- **Mobile**: Full touch gesture support for the hero animation
- **Testing**: Unit tests for search logic, E2E tests with Cypress
- **Backend proxy**: Move API key to server-side to protect it properly

## Author

Omri Habeenzu — omrihabeenzu1@gmail.com
