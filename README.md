# ShortAudit AI

ShortAudit AI is a modern AI SaaS MVP that helps creators understand why short-form videos may underperform on TikTok, YouTube Shorts, and Instagram Reels. It acts like an AI content distribution analyst for weak hooks, retention risk, CTA aggression, upload-method risk, AI-generated feel, repetitive formats, and platform-specific suppression patterns.

## Features

- Premium black-and-white dark SaaS landing page with glassmorphism, monochrome gradients, and motion.
- Dashboard with video upload placeholder, YouTube/short-form URL input, title/context inputs, transcript, niche, audience, metrics, hashtags, thumbnail notes, competitor links, past winners, platform selection, upload method, and CTA intensity.
- AI analysis cards for:
  - Hook strength
  - Retention risk
  - Algorithm risk
  - CTA aggression
  - AI-generated detection risk
  - Duplicate/repetitive content risk
  - Platform-specific advice
  - Viral potential score
- Bonus founder-demo features:
  - Fake analytics chart
  - Upload history chips
  - Browser backup vault using `localStorage`
  - Exportable JSON backup for audits, video links, metrics, and viral reference notes
  - Shadowban probability
  - AI confidence meter
  - Manual vs API upload comparison
- Hook rewriter with styles: Curiosity, Gen-Z, Luxury, Ragebait, Emotional, Storytelling.
- Localized hook generator for USA Gen-Z, UK, Pakistan Gen-Z, Dubai, India, and Spanish-speaking audiences.
- Express backend with OpenAI Responses API integration and JSON-schema outputs.
- Mock fallback responses when `OPENAI_API_KEY` is not set, so the product is demo-ready locally.

## What is done now

- Users can paste a YouTube Shorts or short-form video link.
- Users can feed richer creator data: niche, target audience, original hook, transcript/captions, hashtags, posting time, video length, views, likes, comments, shares, saves, average watch time, retention percentage, thumbnail/cover notes, competitor links, and past winners.
- Each completed audit is automatically backed up in the browser with the full form payload and AI output.
- Users can export all saved audit backups as a JSON file for a more permanent copy.
- Users can clear local backups from the dashboard.
- The AI prompt now considers metrics, reference links, and viral picture/cover notes when generating advice.

## Backup model

The current MVP stores backups in the user’s browser with `localStorage`. That means the data remains on the same device/browser and can be exported as JSON. For production accounts, the next step would be adding a real database such as Postgres/Supabase/Firebase so backups sync across devices and creator teams.

## Tech Stack

- Frontend: React, Vite, TailwindCSS, Framer Motion, Lucide React
- Backend: Node.js, Express, OpenAI API, Zod
- Deployment: Vercel for frontend, Railway for backend

## Project Structure

```text
shortaudit.ai/
├── backend/
│   ├── src/
│   │   ├── lib/fallbackAnalysis.js
│   │   ├── routes/aiRoutes.js
│   │   ├── services/openaiService.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
└── package.json
```

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Backend:

```bash
cp backend/.env.example backend/.env
```

Set your OpenAI key in `backend/.env`:

```env
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-4.1-mini
PORT=8080
FRONTEND_ORIGIN=http://localhost:5173
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
```

```env
VITE_API_URL=http://localhost:8080
```

### 3. Run the app

```bash
npm run dev
```

- Frontend: <http://localhost:5173>
- Backend health check: <http://localhost:8080/health>

## API Routes

### `POST /api/analyze`

Analyzes a short-form video concept. Users can paste a public YouTube Shorts link; the MVP treats the URL as creator-provided context and combines it with the title, notes/transcript, platform, upload method, and CTA intensity. It does not claim private YouTube analytics access or full video scraping.

Example body:

```json
{
  "videoUrl": "https://www.youtube.com/shorts/example",
  "title": "How I made $5000 using AI in 30 days",
  "description": "Fast-paced AI side hustle short with screenshots and a CTA in the first 3 seconds.",
  "niche": "AI side hustles",
  "targetAudience": "Gen-Z creators who want extra income",
  "originalHook": "I tried making money with AI for 30 days",
  "transcript": "Day 1 I tested five AI tools...",
  "hashtags": "#ai #sidehustle #youtubeshorts",
  "views": "5200",
  "likes": "318",
  "comments": "42",
  "shares": "19",
  "saves": "71",
  "avgWatchTime": "21 seconds",
  "retentionPercent": "62",
  "thumbnailNotes": "Black background, white caption, AI dashboard screenshot",
  "competitorLinks": "https://www.youtube.com/shorts/competitor-example",
  "pastWinners": "Personal proof screenshots worked best.",
  "platform": "YouTube Shorts",
  "uploadMethod": "API Upload",
  "ctaIntensity": "Aggressive"
}
```

### `POST /api/rewrite-hook`

```json
{
  "hook": "How I made $5000 using AI",
  "style": "Curiosity"
}
```

### `POST /api/localize-hook`

```json
{
  "hook": "How I made $5000 using AI",
  "audience": "Pakistan Gen-Z"
}
```

## Prompt Engineering

The analysis route prompts the model to act as:

> an elite short-form content strategist and algorithm analyst

The backend asks the model to analyze:

- Hook quality
- Retention risk
- CTA problems
- AI-generated appearance
- Platform risks
- Repetitive formatting
- Algorithmic weaknesses
- Shadowban-like suppression patterns
- Manual vs API upload considerations

The OpenAI service enforces structured JSON responses with schema validation from the Responses API, making frontend rendering reliable.

## Deployment

### Frontend on Vercel

1. Create a Vercel project from this repository.
2. Set the root directory to `frontend`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add environment variable:

```env
VITE_API_URL=https://your-railway-backend.up.railway.app
```

### Backend on Railway

1. Create a Railway service from this repository.
2. Set the root directory to `backend`.
3. Start command: `npm run start`.
4. Add environment variables:

```env
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-4.1-mini
PORT=8080
FRONTEND_ORIGIN=https://your-vercel-app.vercel.app
```

5. Deploy and copy the public Railway URL into `VITE_API_URL` on Vercel.

## Production Notes

- The upload box and video URL field are intentionally polished MVP inputs; real video ingestion, transcript fetching, YouTube Data API metadata, and cloud database backups can be added later with object storage, platform API credentials, and Postgres/Supabase/Firebase.
- The product does not claim true shadowban detection. It estimates distribution risk from creator-provided context and known content strategy patterns.
- The backend returns mock fallback output if no OpenAI API key is configured, which keeps demos fast and resilient.
