# ShortAudit AI

ShortAudit AI is a production-ready Next.js 15 App Router MVP for AI-powered short-form video intelligence. Creators upload TikTok, Instagram Reels, or YouTube Shorts drafts and receive an audit explaining why the video may go viral or flop before publishing.

## What the MVP includes

- Modern dark, glassmorphism SaaS UI inspired by Linear, Vercel, and premium AI dashboards.
- Landing page copy for “AI-powered short-form video intelligence,” plus sections for why videos flop, retention, virality, and algorithm-style analysis.
- Drag-and-drop upload UI for MP4/MOV with max-size validation, upload progress, and TikTok-style preview player.
- Serverless Next.js API routes for upload validation and AI analysis, with no separate Express/Railway backend.
- Heuristic AI audit logic for hook quality, retention weaknesses, pacing issues, CTA timing, subtitle quality, emotional engagement, visual stimulation, and AI-generated detection risk.
- AI report dashboard with viral score, hook strength, retention prediction, scroll-risk timeline, score cards, feedback, recommendations, captions, hashtags, and export-ready report UI.
- Supabase auth-ready login with Google OAuth and passwordless email.
- Supabase schema for videos, transcripts, analysis reports, scores, timestamps, and user history with row-level security.
- Vercel deployment-oriented environment variables and serverless route configuration.

## Tech stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion-ready component architecture
- Supabase database/auth
- Vercel Blob upload integration
- OpenAI/Whisper or Deepgram transcription integration points
- ffmpeg-compatible extraction pipeline placeholders for serverless workers

## File structure

```text
app/                 App Router pages and API routes
app/api/             Serverless upload and analysis endpoints
components/          Reusable UI, upload, graph, timeline, and report components
hooks/               Client upload/analyze state management
lib/                 Environment, heuristics, constants, and Supabase clients
api/                 Shared API contracts for SDK/client use
types/               Audit and database TypeScript types
supabase/migrations/ Database schema and RLS policies
```

## Environment variables

Copy `.env.example` to `.env.local` and provide values as needed:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
BLOB_READ_WRITE_TOKEN=
DEEPGRAM_API_KEY=
```

The app runs with deterministic heuristic fallbacks when AI/transcription/upload provider keys are not configured, so the MVP remains usable in preview environments.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deployment

Deploy directly to Vercel. The app avoids localhost dependencies and CORS issues by keeping uploads, analysis, auth, and persistence inside the single Next.js application with App Router API routes.
