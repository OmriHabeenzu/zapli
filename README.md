# Zapli — Animated Search

A single-page web app featuring a scroll-triggered space animation that transitions into an AI-powered web search chat interface.

## Animation Theme

**The Universe of Knowledge** — As you scroll, you journey through space:
- **Phase 1 (0–25%)**: Hero title reveals against a twinkling starfield with nebula glow — words slide in from opposite directions
- **Phase 2 (20–50%)**: A solar system materialises — a planet with rings, three orbiting moons, and data streams rotating around it
- **Phase 3 (45–80%)**: Transition prompt appears, guiding the user toward the search interface
- **Transition (60–65%)**: Dark space fades out and the chat interface slides up smoothly

## Tech Stack

- **React 19** with TypeScript
- **Tavily Search API** — real-time web search (no mock data)
- **CSS animations** — pure CSS keyframes + scroll-driven inline transforms, no animation libraries
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

3. Create a `.env.local` file in the project root:
```
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

- **Animation**: Add a warp-speed / black hole phase as the final scroll transition
- **Streaming**: Stream search results token-by-token instead of showing all at once
- **Backend proxy**: Move the API key server-side so it's never exposed to the client
- **Context**: Keep conversation history so follow-up questions reference previous results
- **Performance**: Replace scroll event listener with IntersectionObserver + CSS scroll-driven animations
- **Search**: Add image results, news tab, date range filter
- **Testing**: Unit tests for search logic, E2E tests with Cypress

## Author

Omri Habeenzu — omrihabeenzu1@gmail.com
