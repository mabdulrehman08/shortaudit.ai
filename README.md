# ShortAudit AI

ShortAudit AI is a modern SaaS product prototype for auditing short-form videos before upload. It is designed for creators and teams publishing to TikTok, YouTube Shorts, Instagram Reels, and AI-generated video workflows.

## Product scope

- AI Video Audit Engine for MP4 uploads, hook scoring, retention prediction, CTA analysis, subtitle readability, AI-pattern risk, and shadowban signals.
- Feedback dashboard with failure reasons, improvements, retention graphs, upload timing, captions, hashtags, thumbnail recommendations, and scene-swap suggestions.
- Viral pattern learning UI comparing uploaded videos to high-performing pacing, clip cadence, emotional hook, sound design, subtitle, and curiosity-gap benchmarks.
- Creator intelligence panels for upload history, views, retention, engagement, and score trends.
- Platform-specific optimization for TikTok, YouTube Shorts, and Instagram Reels.
- SaaS pages for landing, pricing, auth, dashboard, upload, analytics, creator history, settings, and API access.

## Suggested production architecture

- Frontend: React, Next.js/Vite, Tailwind CSS, Framer Motion, and chart components.
- Backend: Node.js/Express or FastAPI workers for upload orchestration.
- Data: PostgreSQL, Supabase Auth, object storage, and Redis queues.
- AI/ML: OpenAI API, Whisper transcription, CV frame analysis, NLP hook/caption scoring, and custom viral pattern models.
- Infrastructure: Vercel, Railway/Render, Cloudflare CDN, Stripe subscriptions, Discord bot and Chrome extension integrations.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```
