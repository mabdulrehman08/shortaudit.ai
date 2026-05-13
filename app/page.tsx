import Link from 'next/link';
import { ArrowRight, BrainCircuit, Clapperboard, Radar, ScanEye, Sparkles, TrendingUp, WandSparkles, Zap } from 'lucide-react';
import { Badge, Card, Section, ScoreBar } from '@/components/ui';
import { RetentionGraph } from '@/components/retention-graph';
import { MotionReveal } from '@/components/motion-shell';
import { sampleReport } from '@/lib/constants';

const reasons = [
  ['Why videos flop', 'Expose weak openings, static visuals, late CTAs, repetitive AI patterns, subtitle lag, and retention valleys before publishing.'],
  ['Understand retention', 'Predict where viewers slow down, swipe away, or rewatch using transcript, pacing, and visual-change heuristics.'],
  ['Decode virality', 'Compare hooks, emotional triggers, curiosity gaps, and scene cadence against winning short-form patterns.'],
  ['Analyze like the algorithm', 'Score platform fit for TikTok, Instagram Reels, and YouTube Shorts with creator-first recommendations.'],
];

const pipeline = [
  'Validate MP4/MOV and create preview',
  'Extract audio with ffmpeg-compatible workers',
  'Extract key frames every second',
  'Transcribe speech with Whisper or Deepgram',
  'Analyze transcript, captions, frames, pacing, CTA, and AI pattern risk',
  'Generate report, timeline heatmap, and next-edit recommendations',
];

export default function LandingPage() {
  return (
    <main>
      <Section className="grid items-center gap-12 pb-10 pt-20 lg:grid-cols-[1.02fr_.98fr] lg:pt-28">
        <MotionReveal>
          <Badge icon={Sparkles}>AI-powered short-form video intelligence</Badge>
          <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Analyze your content like the algorithm.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            ShortAudit AI reviews TikToks, Instagram Reels, and YouTube Shorts before upload to explain why a video could go viral, why it may flop, and exactly what to fix.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/upload" className="group inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-4 font-black text-ink shadow-glow transition hover:scale-[1.02]">
              Audit a video <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link href="/report/demo-report" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 font-bold text-white backdrop-blur transition hover:bg-white/10">
              View sample report <ScanEye className="h-5 w-5" />
            </Link>
          </div>
        </MotionReveal>
        <MotionReveal delay={0.12}>
        <Card className="relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-flare/20 blur-3xl" />
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-sm font-bold text-neon">Pre-upload audit</p>
              <h2 className="text-2xl font-black">Faceless AI workflow #184</h2>
            </div>
            <div className="rounded-2xl border border-neon/30 bg-neon/10 px-4 py-3 text-center">
              <div className="text-3xl font-black text-neon">84</div>
              <div className="text-xs uppercase text-slate-400">viral score</div>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-[.85fr_1.15fr]">
            <div className="aspect-[9/16] rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900 via-purple-950 to-cyan-950 p-4">
              <div className="flex h-full flex-col justify-between rounded-[1rem] border border-white/10 bg-black/25 p-4">
                <div className="rounded-full bg-white px-3 py-2 text-center text-sm font-black text-ink">WAIT—your hook is leaking views</div>
                <div className="space-y-2">
                  <div className="h-24 rounded-2xl bg-neon/20 blur-sm" />
                  <div className="grid grid-cols-3 gap-2"><span className="h-12 rounded-xl bg-flare/30" /><span className="h-12 rounded-xl bg-white/20" /><span className="h-12 rounded-xl bg-pulse/40" /></div>
                </div>
                <div className="rounded-2xl bg-black/50 p-3 text-xs leading-5 text-white">Risk: visual changes are too infrequent at 5-7s.</div>
              </div>
            </div>
            <div className="space-y-3">
              <ScoreBar label="Hook Strength" value={88} />
              <ScoreBar label="Retention Prediction" value={76} tone="pulse" />
              <ScoreBar label="CTA Effectiveness" value={61} tone="warning" />
              <ScoreBar label="AI Detection Risk" value={34} tone="flare" />
            </div>
          </div>
        </Card>
        </MotionReveal>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Badge icon={BrainCircuit}>Built for creators, editors, and faceless content teams</Badge>
          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Know why a short will win or stall before you post.</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map(([title, text]) => (
            <Card key={title}>
              <Zap className="h-6 w-6 text-neon" />
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Card>
            <Badge icon={Clapperboard}>Analysis pipeline</Badge>
            <h2 className="mt-5 text-4xl font-black tracking-tight">Serverless Next.js architecture, no separate backend.</h2>
            <p className="mt-4 leading-7 text-slate-400">API routes and server actions are designed for Vercel, Supabase, Vercel Blob uploads, OpenAI, Whisper/Deepgram transcription, and ffmpeg-powered workers.</p>
            <div className="mt-6 space-y-3">
              {pipeline.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-neon text-sm font-black text-ink">{index + 1}</span><span>{item}</span></div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-black">Compare against viral videos</h2><Radar className="h-7 w-7 text-flare" /></div>
            <RetentionGraph data={sampleReport.retentionCurve} />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[['Pacing', 79], ['Curiosity gap', 88], ['Emotion', 73]].map(([label, value]) => <ScoreBar key={label} label={String(label)} value={Number(value)} />)}
            </div>
          </Card>
        </div>
      </Section>

      <Section className="pt-4">
        <Card className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <Badge icon={WandSparkles}>Ready for your next upload?</Badge>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Find the fix before the algorithm ignores your work.</h2>
            <p className="mt-3 text-slate-400">Run a preflight audit for hook quality, pacing, subtitle quality, CTA timing, emotional engagement, AI risk, and retention.</p>
          </div>
          <Link href="/upload" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-4 font-black text-ink hover:bg-neon">Start audit <TrendingUp className="h-5 w-5" /></Link>
        </Card>
      </Section>
    </main>
  );
}
