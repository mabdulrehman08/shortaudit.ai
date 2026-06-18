import { useState } from 'react'
import { AlertTriangle, BarChart3, Bot, FileVideo, Gauge, Layers, Loader2, UploadCloud, Wand2, Zap } from 'lucide-react'
import { analyzeVideo } from '../lib/api.js'
import { Card, FieldLabel, Pill, ScoreBar } from './ui.jsx'

const initialForm = {
  title: 'How I made $5000 using AI in 30 days',
  description: 'A fast-paced AI side hustle short with screen recordings, captions, and a CTA in the first 3 seconds asking viewers to follow for the full workflow.',
  platform: 'YouTube Shorts',
  uploadMethod: 'API Upload',
  ctaIntensity: 'Aggressive',
}

const defaultAnalysis = {
  hookStrength: { score: 7.4, explanation: 'Clear money outcome, but the opening needs a sharper curiosity gap and proof point.' },
  retentionRisk: { level: 'Medium', explanation: 'The idea is strong, but early CTA pressure and generic AI-side-hustle framing can cause swipes.' },
  algorithmRisk: { level: 'Medium', explanation: 'Repeated AI money claims uploaded through tooling can resemble templated distribution patterns.' },
  ctaAggression: { level: 'Aggressive', explanation: 'Delay the ask until after viewers see a credible proof moment.' },
  aiGeneratedDetectionRisk: { level: 'Medium', explanation: 'Stock b-roll, synthetic voiceover, and identical caption rhythm may feel mass-produced.' },
  duplicateContentRisk: { level: 'High', explanation: 'AI income hooks are saturated. Add a unique constraint, timeline, or failure moment.' },
  platformSpecificAdvice: ['YouTube Shorts tends to suppress repetitive slideshow pacing.', 'Aggressive CTAs near the start may reduce retention.', 'Test a manual upload with different cover text and native comments.'],
  viralPotentialScore: 78,
  shadowbanProbability: 31,
  aiConfidence: 86,
  manualVsApiComparison: { manual: 'Manual upload should feel more native if paired with custom cover text.', api: 'API upload needs metadata variation and non-identical cadence to reduce templated signals.' },
  recommendedFixes: ['Start with a surprising proof receipt.', 'Replace generic AI claims with one specific workflow.', 'Move CTA after the first result reveal.'],
}

export default function Dashboard() {
  const [form, setForm] = useState(initialForm)
  const [analysis, setAnalysis] = useState(defaultAnalysis)
  const [history, setHistory] = useState([defaultAnalysis])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleAnalyze(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await analyzeVideo(form)
      setAnalysis(result)
      setHistory((current) => [result, ...current].slice(0, 4))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="dashboard" className="px-6 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <Pill tone="amber">Creator command center</Pill>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Audit the distribution story before you post.</h2>
          </div>
          <p className="max-w-xl text-slate-400">Upload context, describe the short, and ShortAudit AI returns practical analysis that feels like a strategist reviewed your video.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-5 sm:p-6">
            <form onSubmit={handleAnalyze} className="space-y-5">
              <div className="rounded-3xl border border-dashed border-cyan-200/20 bg-cyan-300/5 p-6 text-center">
                <UploadCloud className="mx-auto text-cyan-200" size={34} />
                <p className="mt-3 font-bold text-white">Drop short-form video</p>
                <p className="mt-1 text-sm text-slate-400">Demo MVP analyzes metadata and creative context. Video parsing can be added later.</p>
              </div>

              <div>
                <FieldLabel>Title</FieldLabel>
                <input className="input-shell" value={form.title} onChange={(event) => updateField('title', event.target.value)} />
              </div>
              <div>
                <FieldLabel>Description / transcript / context</FieldLabel>
                <textarea className="input-shell min-h-32 resize-none" value={form.description} onChange={(event) => updateField('description', event.target.value)} />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Select label="Platform" value={form.platform} onChange={(value) => updateField('platform', value)} options={['TikTok', 'YouTube Shorts', 'Instagram Reels']} />
                <Select label="Upload method" value={form.uploadMethod} onChange={(value) => updateField('uploadMethod', value)} options={['Manual Upload', 'API Upload', 'Scheduler Tool']} />
                <Select label="CTA intensity" value={form.ctaIntensity} onChange={(value) => updateField('ctaIntensity', value)} options={['Low', 'Medium', 'Aggressive']} />
              </div>

              {error ? <p className="rounded-2xl border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-100">{error}</p> : null}

              <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-fuchsia-400 px-5 py-4 font-black text-slate-950 shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
                {loading ? 'Running AI audit...' : 'Analyze Video'}
              </button>
            </form>
          </Card>

          <div className="space-y-6">
            <AnalysisGrid analysis={analysis} />
            <BonusPanel analysis={analysis} history={history} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select className="input-shell" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  )
}

function AnalysisGrid({ analysis }) {
  const cards = [
    { title: 'Retention Risk', icon: Gauge, level: analysis.retentionRisk.level, text: analysis.retentionRisk.explanation },
    { title: 'Algorithm Risk', icon: AlertTriangle, level: analysis.algorithmRisk.level, text: analysis.algorithmRisk.explanation },
    { title: 'CTA Aggression', icon: Zap, level: analysis.ctaAggression.level, text: analysis.ctaAggression.explanation },
    { title: 'AI-Generated Detection Risk', icon: Bot, level: analysis.aiGeneratedDetectionRisk.level, text: analysis.aiGeneratedDetectionRisk.explanation },
    { title: 'Duplicate Content Risk', icon: Layers, level: analysis.duplicateContentRisk.level, text: analysis.duplicateContentRisk.explanation },
  ]

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card className="p-6 xl:col-span-2">
        <div className="grid gap-6 md:grid-cols-[1fr_220px] md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-cyan-100"><BarChart3 size={18} /><span className="font-bold">Hook Strength</span></div>
            <p className="text-sm leading-6 text-slate-400">{analysis.hookStrength.explanation}</p>
            <ScoreBar value={analysis.hookStrength.score} max={10} className="mt-5" />
          </div>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Viral potential</p>
            <p className="mt-2 bg-gradient-to-r from-cyan-200 to-fuchsia-300 bg-clip-text text-6xl font-black text-transparent">{Math.round(analysis.viralPotentialScore)}</p>
            <p className="text-sm text-slate-400">premium score</p>
          </motion.div>
        </div>
      </Card>

      {cards.map((card) => (
        <Card key={card.title} className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-cyan-100"><card.icon size={18} /></div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-white">{card.level}</span>
          </div>
          <h3 className="mt-5 text-lg font-bold text-white">{card.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{card.text}</p>
        </Card>
      ))}

      <Card className="p-5 xl:col-span-2">
        <h3 className="flex items-center gap-2 text-lg font-bold text-white"><FileVideo size={18} /> Platform-Specific Advice</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {analysis.platformSpecificAdvice.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">{item}</div>)}
        </div>
      </Card>
    </div>
  )
}

function BonusPanel({ analysis, history }) {
  const chart = [42, 58, 51, 74, 62, 83, analysis.viralPotentialScore]
  return (
    <Card className="p-5">
      <div className="grid gap-6 lg:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-slate-400">Shadowban probability</p>
          <p className="mt-2 text-4xl font-black text-white">{Math.round(analysis.shadowbanProbability)}%</p>
          <ScoreBar value={analysis.shadowbanProbability} className="mt-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-400">AI confidence meter</p>
          <p className="mt-2 text-4xl font-black text-white">{Math.round(analysis.aiConfidence)}%</p>
          <ScoreBar value={analysis.aiConfidence} className="mt-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-400">Fake analytics trend</p>
          <div className="mt-4 flex h-20 items-end gap-2">
            {chart.map((value, index) => <div key={`${value}-${index}`} className="flex-1 rounded-t-xl bg-gradient-to-t from-cyan-500 to-fuchsia-300" style={{ height: `${value}%` }} />)}
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-white/[0.03] p-4"><b className="text-white">Manual:</b> <span className="text-slate-400">{analysis.manualVsApiComparison.manual}</span></div>
        <div className="rounded-2xl bg-white/[0.03] p-4"><b className="text-white">API:</b> <span className="text-slate-400">{analysis.manualVsApiComparison.api}</span></div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {history.map((item, index) => <span key={index} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">Audit #{history.length - index}: {Math.round(item.viralPotentialScore)} viral</span>)}
      </div>
    </Card>
  )
}
