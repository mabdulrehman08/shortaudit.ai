import Link from 'next/link';
import { ArrowRight, BarChart3, ClipboardCheck, Layers3, ScanLine, Sparkles, TrendingUp, Video } from 'lucide-react';
import { DemoConsole } from '@/components/demo-console';
import { Badge, Card, Section, ScoreBar } from '@/components/ui';
import { RetentionGraph } from '@/components/retention-graph';
import { sampleReport } from '@/lib/constants';

const outcomes = [
  ['Hook rewrite', 'Turn flat openings into scroll-stopping first lines.'],
  ['Retention map', 'Spot the second where viewers are likely to leave.'],
  ['Creative brief', 'Get visual, subtitle, CTA, and caption fixes in one report.'],
  ['AI risk check', 'Reduce generic template patterns before publishing.'],
];

const workflow = ['Paste or upload a short', 'Pick the platform', 'Generate the audit', 'Ship the stronger version'];

export default function LandingPage() {
  return (
    <main>
      <Section className="grid items-center gap-10 pb-10 pt-14 lg:grid-cols-[0.95fr_1.05fr] lg:pt-20">
        <div>
          <Badge icon={Sparkles}>Fastlane-inspired creator intelligence</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
            Audit shorts before the algorithm does.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            ShortAudit AI extends the content-automation feel into a full pre-publish command center: hooks, retention, pacing, captions, CTA timing, and demo-ready reports.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/upload" className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-4 font-black text-ink shadow-glow transition hover:bg-white">
              Try the live demo <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/report/demo-report" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 font-bold text-white transition hover:bg-white/10">
              View sample report <ScanLine className="h-5 w-5" />
            </Link>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {[
              ['84', 'demo score'],
              ['12s', 'first report'],
              ['5', 'fixes ranked'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="text-2xl font-black text-lime">{value}</div>
                <div className="mt-1 text-xs font-bold uppercase text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <DemoConsole />
      </Section>

      <Section className="pt-4">
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <Card>
            <Badge icon={Video}>Demo workflow</Badge>
            <h2 className="mt-5 text-4xl font-black tracking-tight">From raw short to creator-ready fixes.</h2>
            <div className="mt-6 space-y-3">
              {workflow.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-lg border border-white/10 bg-black/25 p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-lime text-sm font-black text-ink">{index + 1}</span>
                  <span className="font-bold text-slate-100">{step}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-lime">Predicted retention</p>
                <h2 className="text-2xl font-black">Viewer survival curve</h2>
              </div>
              <BarChart3 className="h-7 w-7 text-lime" />
            </div>
            <RetentionGraph data={sampleReport.retentionCurve} />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <ScoreBar label="Hook" value={88} />
              <ScoreBar label="Pacing" value={79} tone="pulse" />
              <ScoreBar label="CTA" value={61} tone="warning" />
            </div>
          </Card>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {outcomes.map(([title, text]) => (
            <Card key={title}>
              <Layers3 className="h-6 w-6 text-lime" />
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-4">
        <Card className="flex flex-col items-start justify-between gap-6 border-lime/30 bg-lime/10 lg:flex-row lg:items-center">
          <div>
            <Badge icon={ClipboardCheck}>Today-ready demo</Badge>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Use the sample short or upload your own video.</h2>
            <p className="mt-3 max-w-3xl text-slate-300">The demo works with fallback analysis, so the report still renders if storage, auth, or AI providers are not configured.</p>
          </div>
          <Link href="/upload" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-4 font-black text-ink transition hover:bg-lime">
            Open audit studio <TrendingUp className="h-5 w-5" />
          </Link>
        </Card>
      </Section>
    </main>
  );
}
