import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  Clapperboard,
  ClipboardCheck,
  Database,
  Download,
  FileVideo2,
  Gauge,
  Hash,
  Layers3,
  Loader2,
  MousePointer2,
  Play,
  Route,
  ScanEye,
  Sparkles,
  Timer,
  TrendingUp,
  Upload,
  WandSparkles,
  Zap,
} from 'lucide-react';
import './styles.css';

const platforms = ['TikTok', 'Instagram Reels', 'YouTube Shorts'];
const sampleIdea = 'AI workflow that turns one customer call into ten short-form posts with proof, subtitles, and a soft CTA.';

function App() {
  const [platform, setPlatform] = useState('TikTok');
  const [idea, setIdea] = useState(sampleIdea);
  const [fileName, setFileName] = useState('sample-founder-workflow.mp4');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeView, setActiveView] = useState('studio');
  const [report, setReport] = useState(() => createReport(sampleIdea, 'TikTok', 'sample-founder-workflow.mp4'));

  const previewScore = useMemo(() => estimateScore(idea, platform), [idea, platform]);

  function runAudit() {
    setIsAnalyzing(true);
    window.setTimeout(() => {
      setReport(createReport(idea, platform, fileName || 'untitled-short.mp4'));
      setActiveView('report');
      setIsAnalyzing(false);
    }, 850);
  }

  function loadSample() {
    setIdea(sampleIdea);
    setPlatform('TikTok');
    setFileName('sample-founder-workflow.mp4');
    setReport(createReport(sampleIdea, 'TikTok', 'sample-founder-workflow.mp4'));
    setActiveView('studio');
  }

  return (
    <div className="app-shell">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main>
        <section className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={16} /> Fastlane-inspired creator intelligence</div>
            <h1>Audit shorts before the algorithm does.</h1>
            <p>
              ShortAudit AI is an extended pre-publish command center for hooks, retention, pacing, captions, CTA timing, and AI-pattern risk.
            </p>
            <div className="hero-actions">
              <button onClick={runAudit} className="primary-action">
                Run audit <ArrowRight size={18} />
              </button>
              <button onClick={loadSample} className="ghost-action">
                <Play size={18} /> Load sample
              </button>
            </div>
            <div className="metric-strip">
              <Metric value={`${previewScore}`} label="live score" />
              <Metric value="12s" label="demo report" />
              <Metric value="5" label="ranked fixes" />
            </div>
          </div>

          <AuditStudio
            platform={platform}
            setPlatform={setPlatform}
            idea={idea}
            setIdea={setIdea}
            fileName={fileName}
            setFileName={setFileName}
            score={previewScore}
            isAnalyzing={isAnalyzing}
            runAudit={runAudit}
          />
        </section>

        <AnimatePresence mode="wait">
          {activeView === 'studio' && <StudioPanel key="studio" report={report} />}
          {activeView === 'algorithm' && <AlgorithmPanel key="algorithm" report={report} />}
          {activeView === 'fastlane' && <FastlaneHomepage key="fastlane" />}
          {activeView === 'dashboard' && <DashboardPanel key="dashboard" report={report} />}
          {activeView === 'report' && <ReportPanel key="report" report={report} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function Header({ activeView, setActiveView }) {
  return (
    <header className="topbar">
      <button onClick={() => setActiveView('studio')} className="brand">
        <span className="brand-mark"><ScanEye size={20} /></span>
        <span><strong>ShortAudit AI</strong><small>Extended creator intelligence</small></span>
      </button>
      <nav>
        {[
          ['studio', 'Studio'],
          ['algorithm', 'Algorithm'],
          ['fastlane', 'Fastlane Concept'],
          ['dashboard', 'Dashboard'],
          ['report', 'Report'],
        ].map(([id, label]) => (
          <button key={id} onClick={() => setActiveView(id)} className={activeView === id ? 'active' : ''}>{label}</button>
        ))}
      </nav>
      <button onClick={() => setActiveView('report')} className="topbar-cta">View report</button>
    </header>
  );
}

function AuditStudio({ platform, setPlatform, idea, setIdea, fileName, setFileName, score, isAnalyzing, runAudit }) {
  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="audit-card">
      <div className="audit-head">
        <div><span>Live audit studio</span><h2>Preflight console</h2></div>
        <div className="score-pill"><strong>{score}</strong><small>/100</small></div>
      </div>

      <div className="preview-grid">
        <div className="phone-preview">
          <div className="phone-caption">WAIT - your hook is leaking views</div>
          <div className="phone-visual"><Clapperboard size={52} /></div>
          <div className="phone-note">Risk appears around second 6. Move proof earlier.</div>
        </div>

        <div className="control-stack">
          <label>
            <span>Video idea or transcript</span>
            <textarea value={idea} onChange={(event) => setIdea(event.target.value)} />
          </label>

          <div className="segmented">
            {platforms.map((item) => (
              <button key={item} onClick={() => setPlatform(item)} className={platform === item ? 'selected' : ''}>{item}</button>
            ))}
          </div>

          <label className="file-input">
            <input
              type="file"
              accept="video/mp4,video/quicktime"
              onChange={(event) => {
                const next = event.target.files?.[0];
                if (next) setFileName(next.name);
              }}
            />
            <Upload size={18} />
            <span>{fileName || 'Choose MP4/MOV'}</span>
          </label>

          <button onClick={runAudit} disabled={isAnalyzing} className="primary-action wide">
            {isAnalyzing ? <Loader2 className="spin" size={18} /> : <ClipboardCheck size={18} />}
            {isAnalyzing ? 'Analyzing...' : 'Generate audit'}
          </button>
        </div>
      </div>
    </motion.section>
  );
}

function StudioPanel({ report }) {
  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="section-grid">
      <Card>
        <SectionTitle icon={Zap} kicker="Demo workflow" title="From raw idea to sharper short." />
        <div className="workflow-list">
          {['Upload or use sample short', 'Score hook and retention risk', 'Rewrite hooks and CTA', 'Export the creator brief'].map((item, index) => (
            <div key={item} className="workflow-row"><span>{index + 1}</span>{item}</div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle icon={BarChart3} kicker="Retention forecast" title="Viewer survival curve" />
        <RetentionCurve values={report.retention} />
        <div className="score-grid">
          <ScoreBar label="Hook" value={report.scores.hook} />
          <ScoreBar label="Pacing" value={report.scores.pacing} />
          <ScoreBar label="CTA" value={report.scores.cta} tone="warn" />
        </div>
      </Card>
    </motion.section>
  );
}

function AlgorithmPanel({ report }) {
  const signals = [
    ['Hook text', 'First 3 seconds, curiosity gap, outcome promise'],
    ['Video timing', 'Scene changes, subtitle density, proof placement'],
    ['Platform rules', `${report.platform} pacing, caption style, CTA tolerance`],
    ['Pattern risk', 'AI sameness, repeated templates, generic phrasing'],
  ];

  const scoreWeights = [
    ['Hook', 24, report.scores.hook],
    ['Retention', 27, report.scores.retention],
    ['Caption', 15, report.scores.caption],
    ['CTA', 10, report.scores.cta],
    ['Emotion', 14, report.score - 8],
    ['Visuals', 10, report.scores.pacing],
  ];

  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="algorithm-page">
      <Card className="algorithm-hero">
        <SectionTitle icon={BrainCircuit} kicker="How the algorithm works" title="A scratchpad model for predicting why a short wins or stalls." />
        <p>
          ShortAudit does not pretend to know the private TikTok, Reels, or Shorts ranking code. It builds a creator-side prediction from visible signals: hook clarity, pacing, proof timing, caption quality, CTA placement, and repeated AI patterns.
        </p>
        <div className="formula-card">
          <span>Viral Score</span>
          <strong>= weighted signals - scroll risk - sameness risk</strong>
        </div>
      </Card>

      <div className="scratch-board">
        <PipelineNode step="01" icon={Database} title="Ingest" text="Video, transcript, platform, file name, duration, and creator goal." />
        <Connector />
        <PipelineNode step="02" icon={ScanEye} title="Read Signals" text="Detect hook promise, proof beat, visual rhythm, CTA language, and subtitle density." />
        <Connector />
        <PipelineNode step="03" icon={BarChart3} title="Score Axes" text="Convert each signal into 0-100 scores that can be compared and weighted." />
        <Connector />
        <PipelineNode step="04" icon={Route} title="Simulate Drop" text="Forecast likely viewer drop points and timeline moments that need edits." />
        <Connector />
        <PipelineNode step="05" icon={WandSparkles} title="Rank Fixes" text="Sort recommendations by expected retention lift, not by generic advice." />
      </div>

      <div className="algorithm-grid">
        <Card>
          <SectionTitle icon={Database} kicker="Input signals" title="What the model reads" />
          <div className="signal-list">
            {signals.map(([title, text]) => (
              <div key={title} className="signal-row">
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle icon={Gauge} kicker="Scoring weights" title="How the score is assembled" />
          <div className="weight-list">
            {scoreWeights.map(([label, weight, value]) => (
              <div key={label} className="weight-row">
                <div><strong>{label}</strong><span>{weight}% weight</span></div>
                <ScoreBar label={`${value}/100`} value={Math.max(0, Math.min(100, value))} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="span-2">
          <SectionTitle icon={Timer} kicker="Retention scratchpad" title="Where the short is likely to lose viewers" />
          <div className="timeline-model">
            {[
              ['0-3s', 'Hook stop', report.scores.hook > 84 ? 'strong' : 'risk'],
              ['4-7s', 'Proof gap', report.scores.retention > 78 ? 'watch' : 'drop'],
              ['8-14s', 'Pattern break', report.scores.pacing > 76 ? 'strong' : 'risk'],
              ['15s+', 'CTA loop', report.scores.cta > 75 ? 'watch' : 'drop'],
            ].map(([time, label, tone]) => (
              <div key={time} className={`timeline-chip ${tone}`}>
                <strong>{time}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="algorithm-note">
            The final recommendations are generated from the weakest weighted signals first. That is why a low CTA score becomes “move CTA earlier,” while a weak retention segment becomes “move proof before second 5.”
          </p>
        </Card>
      </div>
    </motion.section>
  );
}

function FastlaneHomepage() {
  const contentCards = [
    ['Trend remix', 'Turn proven posts into product-native scripts.'],
    ['AI UGC', 'Pick an avatar, angle, product, and scene style.'],
    ['Calendar fill', 'Approve 30 days of posts in one planning sprint.'],
  ];

  const examples = [
    ['Fitness app', '227K views', '+25K likes'],
    ['Founder tool', '112K views', '+8.4K clicks'],
    ['AI SaaS', '31.8M views', '1 viral post'],
  ];

  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="fastlane-page">
      <div className="fastlane-hero">
        <div className="fastlane-copy">
          <div className="eyebrow"><Zap size={16} /> Alternate homepage concept</div>
          <h1>Fastlane should feel like a content machine, not a long brochure.</h1>
          <p>
            A sharper homepage concept for usefastlane.ai: show the workflow immediately, prove the output visually, and make the free-start CTA impossible to miss.
          </p>
          <div className="hero-actions">
            <button className="primary-action">Get content for free <ArrowRight size={18} /></button>
            <button className="ghost-action"><Play size={18} /> Watch 30-sec flow</button>
          </div>
        </div>

        <Card className="fastlane-product">
          <div className="product-toolbar">
            <span>Blitz Mode</span>
            <strong>30 days queued</strong>
          </div>
          <div className="swipe-stage">
            <div className="swipe-card back-card">UGC demo</div>
            <div className="swipe-card">
              <div className="swipe-video"><Clapperboard size={46} /></div>
              <h3>“This app fixes your morning routine”</h3>
              <p>Hook: Problem-aware · Style: Founder UGC · Platform: TikTok</p>
              <div className="swipe-actions">
                <span>Skip</span>
                <strong>Post</strong>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="fastlane-flow">
        <FlowStep icon={Database} label="1. Enter website" text="Fastlane learns the product, audience, offer, and tone." />
        <FlowStep icon={MousePointer2} label="2. Swipe winners" text="Approve, skip, or remix generated content in Blitz mode." />
        <FlowStep icon={CalendarClock} label="3. Fill calendar" text="Schedule TikTok, Reels, and Shorts from one queue." />
        <FlowStep icon={BarChart3} label="4. Double down" text="Use analytics to generate more of what actually worked." />
      </div>

      <div className="fastlane-grid">
        <Card>
          <SectionTitle icon={Sparkles} kicker="What users get" title="One product page, dozens of usable posts." />
          <div className="content-card-grid">
            {contentCards.map(([title, text]) => (
              <div key={title} className="content-tile">
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle icon={TrendingUp} kicker="Proof section" title="Make the outcomes scannable." />
          <div className="example-list">
            {examples.map(([name, views, result]) => (
              <div key={name} className="example-row">
                <span>{name}</span>
                <strong>{views}</strong>
                <em>{result}</em>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="fastlane-cta">
        <div>
          <SectionTitle icon={WandSparkles} kicker="Homepage close" title="From website to scheduled posts before lunch." />
          <p>Lead with the product motion, then support it with proof, pricing, and examples. Keep the visitor moving toward “Get content for free.”</p>
        </div>
        <button className="primary-action">Start free <ArrowRight size={18} /></button>
      </Card>
    </motion.section>
  );
}

function FlowStep({ icon: Icon, label, text }) {
  return (
    <div className="flow-step">
      <Icon size={22} />
      <strong>{label}</strong>
      <span>{text}</span>
    </div>
  );
}

function PipelineNode({ step, icon: Icon, title, text }) {
  return (
    <div className="pipeline-node">
      <span>{step}</span>
      <Icon size={22} />
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function Connector() {
  return <div className="connector"><ArrowRight size={18} /></div>;
}

function DashboardPanel({ report }) {
  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="dashboard">
      <MetricCard icon={Gauge} label="Average audit score" value={report.score} detail="+14 vs first draft" />
      <MetricCard icon={Timer} label="Predicted retention" value={`${report.scores.retention}%`} detail="Top 18% of niche" />
      <MetricCard icon={TrendingUp} label="Hook lift" value="+27%" detail="after rewrite" />
      <MetricCard icon={Layers3} label="AI sameness risk" value={`${report.scores.aiRisk}%`} detail="manageable" />
      <Card className="span-2">
        <SectionTitle icon={FileVideo2} kicker="Recent audits" title="Demo creator pipeline" />
        <table>
          <thead><tr><th>Video</th><th>Score</th><th>Risk</th><th>Status</th></tr></thead>
          <tbody>
            {[
              ['Founder workflow', report.score, 'Low', 'Ready'],
              ['AI facts #42', 88, 'Medium', 'Rewrite CTA'],
              ['Agency teardown', 76, 'Medium', 'Move proof'],
            ].map((row) => (
              <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card>
        <SectionTitle icon={WandSparkles} kicker="Platform fit" title={report.platform} />
        <div className="stack">
          <ScoreBar label="Discovery fit" value={report.scores.discovery} />
          <ScoreBar label="Caption quality" value={report.scores.caption} />
          <ScoreBar label="Loop strength" value={report.scores.loop} />
        </div>
      </Card>
    </motion.section>
  );
}

function ReportPanel({ report }) {
  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="report-grid">
      <Card className="report-score">
        <span>Viral score</span>
        <strong>{report.score}</strong>
        <p>{report.summary}</p>
        <button className="ghost-action"><Download size={18} /> Export brief</button>
      </Card>
      <Card>
        <SectionTitle icon={WandSparkles} kicker="Hook rewrites" title="Use one of these openings" />
        <div className="stack">
          {report.hooks.map((hook) => <div key={hook} className="callout">{hook}</div>)}
        </div>
      </Card>
      <Card>
        <SectionTitle icon={CheckCircle2} kicker="Ranked fixes" title="Change these before posting" />
        <ul className="fix-list">
          {report.fixes.map((fix) => <li key={fix}>{fix}</li>)}
        </ul>
      </Card>
      <Card>
        <SectionTitle icon={Hash} kicker="Caption" title={report.caption} />
        <div className="tag-row">{report.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </Card>
    </motion.section>
  );
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function SectionTitle({ icon: Icon, kicker, title }) {
  return <div className="section-title"><span><Icon size={16} /> {kicker}</span><h2>{title}</h2></div>;
}

function Metric({ value, label }) {
  return <div className="mini-metric"><strong>{value}</strong><span>{label}</span></div>;
}

function MetricCard({ icon: Icon, label, value, detail }) {
  return <Card><Icon className="metric-icon" size={22} /><span className="metric-label">{label}</span><strong className="metric-value">{value}</strong><p>{detail}</p></Card>;
}

function ScoreBar({ label, value, tone = 'lime' }) {
  return (
    <div className="score-bar">
      <div><span>{label}</span><strong>{value}</strong></div>
      <i><b className={tone} style={{ width: `${value}%` }} /></i>
    </div>
  );
}

function RetentionCurve({ values }) {
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 100},${100 - value}`).join(' ');
  return (
    <svg className="retention" viewBox="0 0 100 54">
      {[0, 1, 2, 3].map((line) => <line key={line} x1="0" x2="100" y1={line * 16} y2={line * 16} />)}
      <polyline points={points} />
    </svg>
  );
}

function estimateScore(idea, platform) {
  return analyzeSignals(idea, platform).score;
}

function createReport(idea, platform, fileName) {
  const analysis = analyzeSignals(idea, platform);
  const { score, scores, flags } = analysis;
  const ctaLate = !flags.hasCta;
  const retention = scores.retention;
  const summaryTone = score >= 82 ? 'strong' : score >= 68 ? 'workable' : 'underdeveloped';

  return {
    fileName,
    platform,
    score,
    summary: `${fileName} has a ${summaryTone} premise for ${platform}. The score is driven by ${analysis.topSignals.join(', ')}, with the biggest risk coming from ${analysis.mainRisk}.`,
    scores: {
      hook: scores.hook,
      retention,
      pacing: scores.pacing,
      cta: scores.cta,
      aiRisk: scores.aiRisk,
      discovery: scores.discovery,
      caption: scores.caption,
      loop: scores.loop,
    },
    retention: [98, 94, 90, retention, retention - 5, retention - 9, retention - 12, retention - 14, retention - 17, retention - 19, retention - 22, retention - 24].map((value) => Math.max(38, value)),
    hooks: [
      `I audited this ${platform} before posting, and one line was killing retention.`,
      `This short looks ready until you see the second 6 drop.`,
      `Before you publish this idea, move the proof into the first three seconds.`,
    ],
    fixes: [
      'Open with the outcome, not the setup.',
      'Move the strongest proof beat before second 5.',
      'Add a visual pattern break every two seconds in the first half.',
      'Rewrite the CTA as a save-worthy next step.',
      'Make subtitles shorter, higher contrast, and easier to scan.',
    ],
    caption: `Before posting on ${platform}, fix the hook and move proof earlier.`,
    tags: ['#shortform', '#contentstrategy', '#aitools', '#creatorgrowth'],
  };
}

function analyzeSignals(idea, platform) {
  const text = idea.trim();
  const normalized = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const firstSentence = normalized.split(/[.!?]/).find(Boolean) || normalized;

  const flags = {
    hasNumber: /\d/.test(text),
    hasProof: /\b(proof|result|case study|before|after|customer|revenue|views|leads|saved|built|demo)\b/i.test(text),
    hasPain: /\b(fail|failed|mistake|wrong|ignored|leaking|flop|problem|struggle|waste|risk|drop)\b/i.test(text),
    hasCuriosity: /\b(secret|hidden|why|how|what|before|until|watch|wait|nobody|missing)\b/i.test(text),
    hasCta: /\b(save|comment|follow|try|download|dm|share|subscribe|join|click)\b/i.test(text),
    hasAudience: /\b(founder|creator|agency|coach|editor|brand|customer|student|team|business)\b/i.test(text),
    isGeneric: /^(ai video|my video|new post|content idea|test|hello|today|in this video)$/i.test(text) || wordCount < 7,
    isTooLong: wordCount > 55,
  };

  const platformFit = {
    TikTok: flags.hasCuriosity || flags.hasPain ? 84 : 70,
    'Instagram Reels': flags.hasProof || flags.hasAudience ? 82 : 72,
    'YouTube Shorts': flags.hasNumber || flags.hasProof ? 82 : 70,
  }[platform] || 72;

  const hook = clamp(
    42 +
    (flags.hasCuriosity ? 18 : 0) +
    (flags.hasPain ? 14 : 0) +
    (flags.hasNumber ? 8 : 0) +
    (firstSentence.includes('you') ? 6 : 0) -
    (flags.isGeneric ? 18 : 0) -
    (firstSentence.length > 120 ? 8 : 0),
  );

  const specificity = clamp(
    38 +
    Math.min(wordCount, 28) +
    (flags.hasNumber ? 12 : 0) +
    (flags.hasAudience ? 10 : 0) +
    (flags.hasProof ? 14 : 0) -
    (flags.isGeneric ? 20 : 0),
  );

  const pacing = clamp(
    52 +
    (wordCount >= 12 && wordCount <= 36 ? 16 : 0) +
    (flags.hasProof ? 8 : 0) +
    (flags.hasPain ? 6 : 0) -
    (flags.isTooLong ? 14 : 0) -
    (wordCount < 7 ? 12 : 0),
  );

  const cta = clamp(44 + (flags.hasCta ? 30 : 0) + (flags.hasProof ? 8 : 0) - (flags.isGeneric ? 10 : 0));
  const caption = clamp(48 + (flags.hasAudience ? 10 : 0) + (flags.hasPain ? 8 : 0) + (flags.hasNumber ? 8 : 0) + (wordCount > 18 ? 7 : 0));
  const loop = clamp(46 + (flags.hasCuriosity ? 14 : 0) + (flags.hasProof ? 10 : 0) + (flags.hasCta ? 7 : 0) - (flags.isTooLong ? 8 : 0));
  const aiRisk = clamp(68 - specificity / 3 - (flags.hasAudience ? 8 : 0) + (/ai/i.test(text) ? 8 : 0) + (flags.isGeneric ? 14 : 0));
  const retention = clamp(Math.round(hook * 0.36 + pacing * 0.34 + loop * 0.2 + cta * 0.1 - (flags.isGeneric ? 8 : 0)));
  const discovery = clamp(Math.round(platformFit * 0.45 + hook * 0.35 + specificity * 0.2));

  const score = clamp(Math.round(
    hook * 0.24 +
    retention * 0.24 +
    specificity * 0.14 +
    caption * 0.12 +
    cta * 0.1 +
    discovery * 0.1 +
    pacing * 0.08 -
    aiRisk * 0.06,
  ));

  const signalValues = [
    ['hook clarity', hook],
    ['specific proof', specificity],
    ['retention shape', retention],
    ['platform fit', discovery],
    ['CTA timing', cta],
  ].sort((a, b) => b[1] - a[1]);

  const risks = [
    ['generic opening', flags.isGeneric ? 90 : 20],
    ['missing CTA', flags.hasCta ? 22 : 78],
    ['thin proof', flags.hasProof ? 25 : 74],
    ['AI sameness', aiRisk],
    ['overlong setup', flags.isTooLong ? 72 : 26],
  ].sort((a, b) => b[1] - a[1]);

  return {
    score,
    flags,
    topSignals: signalValues.slice(0, 2).map(([label]) => label),
    mainRisk: risks[0][0],
    scores: {
      hook,
      retention,
      pacing,
      cta,
      aiRisk,
      discovery,
      caption,
      loop,
    },
  };
}

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

createRoot(document.getElementById('root')).render(<App />);
