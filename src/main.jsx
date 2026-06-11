import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
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
  const words = idea.trim().split(/\s+/).filter(Boolean).length;
  const specificity = /\d|proof|audit|workflow|founder|mistake|failed|customer/i.test(idea) ? 13 : 0;
  const platformBoost = platform === 'TikTok' ? 4 : platform === 'Instagram Reels' ? 2 : 1;
  return Math.max(58, Math.min(96, 63 + Math.min(words, 15) + specificity + platformBoost));
}

function createReport(idea, platform, fileName) {
  const score = estimateScore(idea, platform);
  const ctaLate = !/(save|comment|follow|try|download|dm)/i.test(idea);
  const hook = Math.min(98, score + 4);
  const retention = Math.max(54, score - (ctaLate ? 7 : 1));

  return {
    fileName,
    platform,
    score,
    summary: `${fileName} has a strong premise for ${platform}, but the edit needs proof earlier, a tighter mid-video pattern break, and a softer CTA before the retention dip.`,
    scores: {
      hook,
      retention,
      pacing: Math.max(61, score - 5),
      cta: ctaLate ? 62 : 83,
      aiRisk: Math.max(24, 74 - score),
      discovery: Math.min(94, score + 2),
      caption: Math.min(93, score + 1),
      loop: Math.max(58, score - 8),
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

createRoot(document.getElementById('root')).render(<App />);
