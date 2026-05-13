import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CalendarClock,
  Check,
  ChevronRight,
  Clapperboard,
  CloudUpload,
  Code2,
  CreditCard,
  Gauge,
  GitCompare,
  Globe2,
  Hash,
  History,
  Layers3,
  Lock,
  MessageSquareText,
  Play,
  Radar,
  Rocket,
  ScanEye,
  Settings,
  ShieldAlert,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Upload,
  Users,
  WandSparkles,
  Zap,
} from 'lucide-react';
import './styles.css';

const navItems = [
  'Landing',
  'Pricing',
  'Login',
  'Dashboard',
  'Upload',
  'Analytics',
  'History',
  'Settings',
  'API',
];

const auditMetrics = [
  { label: 'Hook strength', score: 91, delta: '+18%', color: '#6fffe9' },
  { label: 'Retention probability', score: 76, delta: '+9%', color: '#a855f7' },
  { label: 'Scroll-stop potential', score: 84, delta: '+14%', color: '#ff4ecd' },
  { label: 'CTA effectiveness', score: 68, delta: '+6%', color: '#fbbf24' },
  { label: 'AI detection risk', score: 31, delta: '-22%', color: '#60a5fa' },
  { label: 'Subtitle readability', score: 88, delta: '+11%', color: '#34d399' },
];

const retention = [95, 91, 86, 83, 78, 73, 71, 66, 63, 59, 58, 54];
const comparison = [
  { name: '0-3s hook', current: 91, viral: 87 },
  { name: 'Clip cadence', current: 74, viral: 82 },
  { name: 'Emotion spikes', current: 68, viral: 85 },
  { name: 'Loop closure', current: 79, viral: 76 },
  { name: 'Subtitle clarity', current: 88, viral: 81 },
];

const platformScores = [
  { platform: 'TikTok', score: 86, note: 'Strong curiosity loop, reduce watermark risk.' },
  { platform: 'YouTube Shorts', score: 78, note: 'Tighten first caption and add stronger payoff.' },
  { platform: 'Instagram Reels', score: 82, note: 'Visual density is high but brand-safe.' },
];

const riskSensitivity = [
  { label: 'AI voice repetition', score: 78 },
  { label: 'Watermark detection', score: 84 },
  { label: 'Spammy CTA language', score: 69 },
  { label: 'Duplicate captions', score: 73 },
];

const historyRows = [
  { title: 'Faceless AI facts #42', date: 'May 12', score: 88, views: '412K', status: 'Winner' },
  { title: 'Fastlane product demo', date: 'May 11', score: 72, views: '58K', status: 'Needs hook' },
  { title: 'Oddly satisfying loop', date: 'May 09', score: 94, views: '1.2M', status: 'Winner' },
  { title: 'AI news recap', date: 'May 07', score: 61, views: '9K', status: 'Flopped' },
];

const plans = [
  { name: 'Free', price: '$0', audits: '5 audits / month', cta: 'Start auditing', features: ['AI video audit preview', 'Virality score', 'Basic captions', 'Community support'] },
  { name: 'Pro Creator', price: '$29', audits: '150 audits / month', cta: 'Scale my channel', featured: true, features: ['Full retention prediction', 'A/B hook testing', 'Fix My Video suggestions', 'Best upload time', 'Stripe billing ready'] },
  { name: 'Agency', price: '$149', audits: 'Unlimited team audits', cta: 'Book demo', features: ['Team workspaces', 'Client reporting', 'API access', 'Discord bot alerts', 'Priority model tuning'] },
];

function classNames(...items) {
  return items.filter(Boolean).join(' ');
}

function Shell() {
  const [page, setPage] = React.useState('Landing');

  React.useEffect(() => {
    document.title = `${page} · ShortAudit AI`;
  }, [page]);

  return (
    <div className="min-h-screen overflow-hidden bg-void text-white selection:bg-neon/30 selection:text-white">
      <Backdrop />
      <Header page={page} setPage={setPage} />
      <main>
        {page === 'Landing' && <Landing setPage={setPage} />}
        {page === 'Pricing' && <Pricing setPage={setPage} />}
        {page === 'Login' && <Login />}
        {page === 'Dashboard' && <Dashboard setPage={setPage} />}
        {page === 'Upload' && <UploadPage setPage={setPage} />}
        {page === 'Analytics' && <Analytics />}
        {page === 'History' && <HistoryPage />}
        {page === 'Settings' && <SettingsPage />}
        {page === 'API' && <ApiPage />}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}

function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,.30),transparent_30%),radial-gradient(circle_at_top_right,rgba(111,255,233,.18),transparent_32%),linear-gradient(180deg,#05060f_0%,#080b18_44%,#05060f_100%)]" />
      <div className="absolute inset-0 bg-grid bg-[length:42px_42px] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-flare/20 blur-3xl" />
    </div>
  );
}

function Header({ page, setPage }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-void/65 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={() => setPage('Landing')} className="flex items-center gap-3" aria-label="ShortAudit AI home">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-neon/40 bg-neon/10 shadow-glow">
            <ScanEye className="h-5 w-5 text-neon" />
          </span>
          <span className="text-left">
            <span className="block text-lg font-black tracking-tight">ShortAudit AI</span>
            <span className="hidden text-xs text-slate-400 sm:block">Algorithmic preflight for creators</span>
          </span>
        </button>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 lg:flex">
          {navItems.slice(0, 7).map((item) => (
            <NavButton key={item} item={item} page={page} setPage={setPage} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage('Login')} className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:text-white sm:block">Log in</button>
          <button onClick={() => setPage('Upload')} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-ink transition hover:bg-neon sm:px-5">Audit video</button>
        </div>
      </div>
      <div className="scrollbar-hide flex gap-2 overflow-x-auto border-t border-white/5 px-4 py-2 lg:hidden">
        {navItems.map((item) => <NavButton key={item} item={item} page={page} setPage={setPage} compact />)}
      </div>
    </header>
  );
}

function NavButton({ item, page, setPage, compact = false }) {
  return (
    <button
      onClick={() => setPage(item)}
      className={classNames(
        'rounded-full text-sm font-semibold transition',
        compact ? 'whitespace-nowrap px-3 py-2' : 'px-4 py-2',
        page === item ? 'bg-neon text-ink shadow-glow' : 'text-slate-400 hover:bg-white/10 hover:text-white',
      )}
    >
      {item}
    </button>
  );
}

function Section({ children, className = '' }) {
  return <section className={classNames('mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8', className)}>{children}</section>;
}

function Badge({ icon: Icon = Sparkles, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-4 py-2 text-sm font-semibold text-neon shadow-glow">
      <Icon className="h-4 w-4" />
      {children}
    </span>
  );
}

function Landing({ setPage }) {
  return (
    <>
      <Section className="grid items-center gap-12 pb-10 pt-20 lg:grid-cols-[1.02fr_.98fr] lg:pt-28">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge icon={Rocket}>YC-style creator intelligence for AI video teams</Badge>
          <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            Your videos don’t flop randomly.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Find out why the algorithm ignores your content. ShortAudit AI audits TikToks, YouTube Shorts, Reels, and AI-generated Fastlane-style videos before upload—then predicts retention, shadowban risk, and virality.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => setPage('Upload')} className="group inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-4 font-black text-ink shadow-glow transition hover:scale-[1.02]">
              Run first audit <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
            <button onClick={() => setPage('Dashboard')} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 font-bold text-white backdrop-blur transition hover:bg-white/10">
              View live dashboard <Play className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
            {[['3.1B', 'signals modeled'], ['87%', 'hook lift avg'], ['12s', 'audit preview']].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <HeroAuditCard />
      </Section>
      <FeatureGrid />
      <PlatformOptimization />
      <Workflow />
    </>
  );
}

function HeroAuditCard() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
      <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-r from-neon/20 via-pulse/20 to-flare/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-sm font-bold text-neon">Pre-upload audit</p>
            <h2 className="text-2xl font-black">AI Shorts Launch #184</h2>
          </div>
          <div className="rounded-2xl border border-neon/30 bg-neon/10 px-4 py-3 text-center">
            <div className="text-3xl font-black text-neon">84</div>
            <div className="text-xs uppercase text-slate-400">viral score</div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-[.9fr_1.1fr]">
          <div className="aspect-[9/16] overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900 via-purple-950 to-cyan-950 p-4">
            <div className="flex h-full flex-col justify-between rounded-[1rem] border border-white/10 bg-black/20 p-4">
              <div className="rounded-full bg-white px-3 py-2 text-center text-sm font-black text-ink">WAIT—this AI trick is hidden</div>
              <div className="space-y-2">
                <div className="h-24 rounded-2xl bg-neon/20 blur-sm" />
                <div className="grid grid-cols-3 gap-2">
                  <span className="h-12 rounded-xl bg-flare/30" />
                  <span className="h-12 rounded-xl bg-white/20" />
                  <span className="h-12 rounded-xl bg-pulse/40" />
                </div>
              </div>
              <div className="rounded-2xl bg-black/50 p-3 text-xs leading-5 text-white">Recommended cut: remove 0:07 repetition, swap to curiosity payoff.</div>
            </div>
          </div>
          <div className="space-y-4">
            <MiniGraph data={retention} />
            {auditMetrics.slice(0, 4).map((metric) => <MetricBar key={metric.label} {...metric} />)}
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Insight icon={AlertTriangle} label="May fail because" text="Hook promise is strong, but second scene repeats an AI stock pattern." />
          <Insight icon={WandSparkles} label="Fix my video" text="Add a humanized pattern break at 0:04 and reduce voice clone monotony." />
          <Insight icon={CalendarClock} label="Best upload" text="Thu 7:40 PM local, when your niche retention window peaks." />
        </div>
      </div>
    </motion.div>
  );
}

function MiniGraph({ data }) {
  const points = data.map((value, index) => `${(index / (data.length - 1)) * 100},${100 - value}`).join(' ');
  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-bold text-white">Predicted audience retention</span>
        <span className="text-xs text-neon">+23% vs baseline</span>
      </div>
      <svg viewBox="0 0 100 45" className="h-28 w-full overflow-visible">
        <defs>
          <linearGradient id="retention" x1="0" x2="1">
            <stop offset="0%" stopColor="#6fffe9" />
            <stop offset="100%" stopColor="#ff4ecd" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => <line key={line} x1="0" x2="100" y1={line * 14} y2={line * 14} stroke="rgba(255,255,255,.09)" strokeWidth=".5" />)}
        <polyline fill="none" stroke="url(#retention)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" points={points} />
      </svg>
    </div>
  );
}

function MetricBar({ label, score, delta, color }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-200">{label}</span>
        <span className="font-bold" style={{ color }}>{score}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <div className="mt-1 text-xs text-slate-500">{delta} projected change after fixes</div>
    </div>
  );
}

function Insight({ icon: Icon, label, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <Icon className="mb-3 h-5 w-5 text-neon" />
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</div>
      <p className="mt-1 text-sm leading-6 text-slate-200">{text}</p>
    </div>
  );
}

function FeatureGrid() {
  const features = [
    [CloudUpload, 'AI Video Audit Engine', 'Upload MP4s and extract frames, captions, pacing, transitions, subtitles, hooks, audio patterns, CTAs, and emotional beats.'],
    [Gauge, 'Algorithmic scoring', 'Score virality, retention probability, scroll-stop potential, platform fit, AI detection risk, overstimulation, and readability.'],
    [BrainCircuit, 'Viral pattern learning', 'Compare videos against high-performing pattern libraries for pacing, scene changes, sound design, curiosity gaps, and engagement loops.'],
    [ShieldAlert, 'Shadowban risk detector', 'Identify reused clips, watermarks, spammy CTA language, duplicate captions, banned words, and repetitive AI voices.'],
    [GitCompare, 'A/B hook testing', 'Test opening lines, captions, and thumbnail frames before publishing to find the strongest 3-second hook.'],
    [Bot, 'AI creator copilots', 'Generate hooks, rewrite captions, suggest hashtags, pick thumbnails, and create one-click Fix My Video instructions.'],
  ];
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <Badge icon={Sparkles}>The Grammarly for short-form content</Badge>
        <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Everything creators need before they press publish.</h2>
        <p className="mt-4 text-lg text-slate-400">Built for faceless brands, AI content studios, agencies, and creators scaling across TikTok, Shorts, Reels, and emerging AI video tools.</p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map(([Icon, title, text]) => (
          <motion.div key={title} whileHover={{ y: -6 }} className="rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-neon/10 text-neon"><Icon className="h-6 w-6" /></div>
            <h3 className="text-xl font-black">{title}</h3>
            <p className="mt-3 leading-7 text-slate-400">{text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function PlatformOptimization() {
  return (
    <Section className="pt-4">
      <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <GlassPanel>
          <Badge icon={Globe2}>Platform-specific optimization</Badge>
          <h2 className="mt-5 text-4xl font-black tracking-tight">One video, three algorithms, different fixes.</h2>
          <p className="mt-4 text-slate-400">ShortAudit AI separates TikTok velocity mechanics, Shorts satisfaction signals, and Reels discovery behavior so creators stop using one-size-fits-all advice.</p>
          <div className="mt-6 space-y-3">
            {platformScores.map((item) => <PlatformRow key={item.platform} {...item} />)}
          </div>
        </GlassPanel>
        <GlassPanel>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-bold text-neon">Viral pattern comparison</p>
              <h3 className="text-2xl font-black">Uploaded video vs winning niche cluster</h3>
            </div>
            <Radar className="h-8 w-8 text-flare" />
          </div>
          <div className="mt-6 space-y-5">
            {comparison.map((row) => (
              <div key={row.name}>
                <div className="mb-2 flex justify-between text-sm font-semibold"><span>{row.name}</span><span className="text-slate-400">You {row.current} / Viral {row.viral}</span></div>
                <div className="grid gap-2">
                  <Bar value={row.current} color="bg-neon" />
                  <Bar value={row.viral} color="bg-flare" />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </Section>
  );
}

function PlatformRow({ platform, score, note }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between"><span className="font-black">{platform}</span><span className="text-neon">{score}/100</span></div>
      <Bar value={score} color="bg-gradient-to-r from-neon to-flare" className="mt-3" />
      <p className="mt-3 text-sm text-slate-400">{note}</p>
    </div>
  );
}

function Bar({ value, color, className = '' }) {
  return <div className={classNames('h-2 overflow-hidden rounded-full bg-white/10', className)}><div className={classNames('h-full rounded-full', color)} style={{ width: `${value}%` }} /></div>;
}

function Workflow() {
  const steps = [
    ['Upload', 'Drop an MP4 or import from your content pipeline.'],
    ['Analyze', 'Frames, captions, pacing, audio, visual density, and NLP hook structure are scored.'],
    ['Fix', 'Receive prioritized edits, title/caption suggestions, hashtags, and cut recommendations.'],
    ['Learn', 'Track score improvements against real views, retention, and engagement over time.'],
  ];
  return (
    <Section className="pt-6">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 backdrop-blur-xl lg:p-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Badge icon={Zap}>Production-ready product architecture</Badge>
            <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight">Designed for Vercel, Railway/Render, Supabase Auth, PostgreSQL, Redis queues, Stripe, OpenAI, Whisper, and CV pipelines.</h2>
          </div>
          <button className="rounded-full bg-white px-5 py-3 font-black text-ink">Read API docs</button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map(([title, text], index) => (
            <div key={title} className="relative rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-neon font-black text-ink">{index + 1}</div>
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Pricing({ setPage }) {
  return (
    <Section className="pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <Badge icon={CreditCard}>Subscriptions for every creator stage</Badge>
        <h1 className="mt-5 text-5xl font-black tracking-tight">Start free. Upgrade when every upload matters.</h1>
        <p className="mt-4 text-lg text-slate-400">Stripe-ready tiers for individual creators, faceless content brands, and agencies managing high-volume audits.</p>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className={classNames('rounded-[2rem] border p-6 backdrop-blur-xl', plan.featured ? 'border-neon/50 bg-neon/10 shadow-glow' : 'border-white/10 bg-white/[0.04]')}>
            {plan.featured && <div className="mb-4 inline-flex rounded-full bg-neon px-3 py-1 text-xs font-black text-ink">Most popular</div>}
            <h2 className="text-2xl font-black">{plan.name}</h2>
            <div className="mt-4 flex items-end gap-2"><span className="text-5xl font-black">{plan.price}</span><span className="pb-2 text-slate-400">/mo</span></div>
            <p className="mt-2 text-slate-400">{plan.audits}</p>
            <button onClick={() => setPage('Upload')} className={classNames('mt-6 w-full rounded-full px-5 py-3 font-black', plan.featured ? 'bg-neon text-ink' : 'bg-white text-ink')}>{plan.cta}</button>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => <li key={feature} className="flex gap-3 text-sm text-slate-300"><Check className="h-5 w-5 text-neon" />{feature}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Login() {
  return (
    <Section className="grid min-h-[72vh] items-center gap-10 lg:grid-cols-2">
      <div>
        <Badge icon={Lock}>Supabase Auth ready</Badge>
        <h1 className="mt-5 text-5xl font-black tracking-tight">Log in to your creator intelligence workspace.</h1>
        <p className="mt-4 text-lg text-slate-400">Secure authentication for solo creators, agencies, and team collaboration dashboards.</p>
      </div>
      <GlassPanel>
        <div className="space-y-4">
          <Input label="Email" placeholder="creator@studio.com" />
          <Input label="Password" placeholder="••••••••" type="password" />
          <button className="w-full rounded-2xl bg-neon py-4 font-black text-ink">Continue securely</button>
          <button className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 font-bold">Sign up for free</button>
        </div>
      </GlassPanel>
    </Section>
  );
}

function Dashboard({ setPage }) {
  return (
    <Section className="pt-10">
      <DashboardHeader title="Creator command center" subtitle="Monitor audits, score improvements, retention trends, and risk signals across every short-form platform." action="Upload MP4" onAction={() => setPage('Upload')} />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat icon={TrendingUp} label="Avg virality score" value="82" detail="+14 this month" />
        <Stat icon={Timer} label="Predicted retention" value="71%" detail="Top 18% niche" />
        <Stat icon={ShieldAlert} label="Shadowban risk" value="Low" detail="3 warnings open" />
        <Stat icon={Users} label="Creator seats" value="8" detail="Agency workspace" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <GlassPanel><MiniGraph data={[62, 66, 68, 71, 74, 79, 77, 81, 84, 82, 86, 89]} /><HistoryTable /></GlassPanel>
        <GlassPanel><h2 className="text-2xl font-black">AI score improvements</h2><div className="mt-5 space-y-4">{auditMetrics.map((m) => <MetricBar key={m.label} {...m} />)}</div></GlassPanel>
      </div>
    </Section>
  );
}

function DashboardHeader({ title, subtitle, action, onAction }) {
  return (
    <div className="flex flex-col justify-between gap-5 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl lg:flex-row lg:items-center">
      <div><p className="font-bold text-neon">ShortAudit AI workspace</p><h1 className="mt-1 text-4xl font-black tracking-tight">{title}</h1><p className="mt-2 max-w-3xl text-slate-400">{subtitle}</p></div>
      <button onClick={onAction} className="inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-3 font-black text-ink"><Upload className="h-5 w-5" />{action}</button>
    </div>
  );
}

function Stat({ icon: Icon, label, value, detail }) {
  return <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5"><Icon className="mb-4 h-6 w-6 text-neon" /><div className="text-sm text-slate-400">{label}</div><div className="mt-1 text-3xl font-black">{value}</div><div className="mt-2 text-xs font-semibold text-neon">{detail}</div></div>;
}

function UploadPage({ setPage }) {
  return (
    <Section className="pt-10">
      <DashboardHeader title="AI Video Audit Engine" subtitle="Upload an MP4 and preflight the hook, pacing, subtitles, audio patterns, CTA, AI footprints, and platform compatibility before posting." action="View analytics" onAction={() => setPage('Analytics')} />
      <div className="mt-8 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <GlassPanel>
          <div className="grid min-h-[420px] place-items-center rounded-[1.6rem] border border-dashed border-neon/40 bg-neon/5 p-8 text-center">
            <div>
              <CloudUpload className="mx-auto h-16 w-16 text-neon" />
              <h2 className="mt-5 text-3xl font-black">Drop your MP4 here</h2>
              <p className="mx-auto mt-3 max-w-md text-slate-400">We simulate extraction of frames, captions, pacing, transitions, subtitles, hook structure, and audio signatures.</p>
              <button className="mt-6 rounded-full bg-white px-6 py-3 font-black text-ink">Choose file</button>
            </div>
          </div>
        </GlassPanel>
        <GlassPanel>
          <h2 className="text-2xl font-black">Audit checklist</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {['Hook strength', 'Retention probability', 'Scroll-stop potential', 'CTA effectiveness', 'AI detection risk', 'Repetitiveness', 'Visual overstimulation', 'Subtitle readability', 'Emotional engagement', 'Virality score', 'Platform score', 'Shadowban signals'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm"><Check className="h-5 w-5 text-neon" />{item}</div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </Section>
  );
}

function Analytics() {
  return (
    <Section className="pt-10">
      <DashboardHeader title="Audit results: why this video may fail" subtitle="Actionable diagnostics for failure reasons, fixes, retention graph, upload time, titles, hashtags, thumbnail frames, and recommended scene swaps." action="Export report" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_.8fr]">
        <GlassPanel><MiniGraph data={retention} /><div className="mt-6 grid gap-4 md:grid-cols-2"><Insight icon={AlertTriangle} label="Why it may fail" text="The first caption promises novelty, but the footage at 0:05 uses a repeated AI template detected in low-reach uploads." /><Insight icon={Target} label="What to improve" text="Open with consequence, add a hard visual pattern break, and move the payoff from 0:19 to 0:11." /><Insight icon={Hash} label="Suggested hashtags" text="#aitools #contentcreator #facelessbrand #shortsstrategy #fastlane" /><Insight icon={Clapperboard} label="Thumbnail frame" text="Use frame 00:02.14 where the neon UI and shocked face align with the hook text." /></div></GlassPanel>
        <GlassPanel><h2 className="text-2xl font-black">Recommended pacing changes</h2><div className="mt-5 space-y-4">{['Cut 0:06–0:08 repetitive zoom', 'Swap scene 3 with proof screenshot', 'Increase subtitle contrast by 18%', 'Replace engagement-bait CTA', 'Add loopback line in final 1.5s'].map((item, i) => <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neon font-black text-ink">{i + 1}</span><span>{item}</span></div>)}</div></GlassPanel>
      </div>
    </Section>
  );
}

function HistoryPage() {
  return (
    <Section className="pt-10">
      <DashboardHeader title="Creator history" subtitle="Track uploaded videos, views over time, retention, engagement, AI scores, and trends between successful and failed videos." action="Compare videos" />
      <div className="mt-8"><GlassPanel><HistoryTable /></GlassPanel></div>
    </Section>
  );
}

function HistoryTable() {
  return (
    <div className="mt-5 overflow-hidden rounded-3xl border border-white/10">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-white/5 text-slate-400"><tr>{['Video', 'Date', 'AI score', 'Views', 'Status'].map((h) => <th key={h} className="px-5 py-4 font-bold">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-white/10">
          {historyRows.map((row) => <tr key={row.title} className="bg-black/10"><td className="px-5 py-4 font-bold">{row.title}</td><td className="px-5 py-4 text-slate-400">{row.date}</td><td className="px-5 py-4 text-neon">{row.score}</td><td className="px-5 py-4">{row.views}</td><td className="px-5 py-4"><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">{row.status}</span></td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

function SettingsPage() {
  return (
    <Section className="pt-10">
      <DashboardHeader title="Settings" subtitle="Configure brand safety, platform defaults, notification channels, team roles, and model sensitivity." action="Save changes" />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GlassPanel><h2 className="text-2xl font-black">Workspace</h2><div className="mt-5 space-y-4"><Input label="Studio name" placeholder="Neon Faceless Media" /><Input label="Default niche" placeholder="AI tools and creator education" /><Toggle label="Flag banned words automatically" /><Toggle label="Discord bot alerts" /></div></GlassPanel>
        <GlassPanel><h2 className="text-2xl font-black">Risk sensitivity</h2><div className="mt-5 space-y-4">{riskSensitivity.map((item) => <MetricBar key={item.label} label={item.label} score={item.score} delta="active threshold" color="#6fffe9" />)}</div></GlassPanel>
      </div>
    </Section>
  );
}

function ApiPage() {
  return (
    <Section className="pt-10">
      <DashboardHeader title="API access" subtitle="Integrate ShortAudit AI into upload flows, Chrome extensions, Discord bots, agency dashboards, and automated content pipelines." action="Create key" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
        <GlassPanel><h2 className="text-2xl font-black">Infrastructure blueprint</h2><ul className="mt-5 space-y-3 text-slate-300">{['Next.js or Vite frontend on Vercel', 'Node/Express API on Railway or Render', 'PostgreSQL plus Supabase Auth', 'Redis queue for video processing', 'OpenAI, Whisper, CV frame analysis, NLP scoring', 'Cloudflare CDN and Stripe subscriptions'].map((item) => <li key={item} className="flex gap-3"><ChevronRight className="h-5 w-5 text-neon" />{item}</li>)}</ul></GlassPanel>
        <GlassPanel><div className="flex items-center gap-3"><Code2 className="h-6 w-6 text-neon" /><h2 className="text-2xl font-black">Audit endpoint</h2></div><pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-slate-300"><code>{`POST /v1/audits
Authorization: Bearer sk_live_...
Content-Type: multipart/form-data

{
  "platforms": ["tiktok", "youtube_shorts", "instagram_reels"],
  "checks": ["hook", "retention", "shadowban", "ai_patterns"],
  "return": ["scores", "fixes", "captions", "hashtags", "thumbnail"]
}`}</code></pre></GlassPanel>
      </div>
    </Section>
  );
}

function Toggle({ label }) {
  return <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4"><span className="font-semibold">{label}</span><span className="h-7 w-12 rounded-full bg-neon p-1"><span className="block h-5 w-5 translate-x-5 rounded-full bg-ink" /></span></div>;
}

function Input({ label, placeholder, type = 'text' }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-slate-300">{label}</span><input type={type} placeholder={placeholder} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none ring-neon/50 transition placeholder:text-slate-600 focus:ring-4" /></label>;
}

function GlassPanel({ children }) {
  return <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl backdrop-blur-xl sm:p-6">{children}</div>;
}

function Footer({ setPage }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 text-sm text-slate-500 sm:px-6 lg:flex-row lg:px-8">
        <div className="flex items-center gap-3"><ScanEye className="h-5 w-5 text-neon" /><span>© 2026 ShortAudit AI. Built for creators who test before they post.</span></div>
        <div className="flex flex-wrap gap-4">{['Pricing', 'API', 'Settings', 'Login'].map((item) => <button key={item} onClick={() => setPage(item)} className="hover:text-white">{item}</button>)}</div>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<Shell />);
