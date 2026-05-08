import { useState } from 'react'
import { Globe2, Loader2, MessageCircle, WandSparkles } from 'lucide-react'
import { localizeHook, rewriteHook } from '../lib/api.js'
import { Card, FieldLabel, Pill } from './ui.jsx'

const styles = ['Curiosity', 'Gen-Z', 'Luxury', 'Ragebait', 'Emotional', 'Storytelling']
const audiences = ['USA Gen-Z', 'UK', 'Pakistan Gen-Z', 'Dubai', 'India', 'Spanish-speaking audience']

export default function HookTools() {
  const [hook, setHook] = useState('How I made $5000 using AI')
  const [rewrites, setRewrites] = useState([
    'I used AI for 30 days and the result made my friends uncomfortable',
    'This AI workflow quietly made my first $5,000 online',
    'Stop using AI like everyone else. Do this instead.',
  ])
  const [audience, setAudience] = useState('Pakistan Gen-Z')
  const [localized, setLocalized] = useState('POV: sab maze le rahe thay aur maine AI se paisa banana start kar diya')
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')

  async function onRewrite(style) {
    setBusy(style)
    setError('')
    try {
      const result = await rewriteHook({ hook, style })
      setRewrites(result.hooks)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  async function onLocalize() {
    setBusy('localize')
    setError('')
    try {
      const result = await localizeHook({ hook, audience })
      setLocalized(result.localizedHook)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  return (
    <section id="rewrite" className="px-6 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <Pill>Hook lab</Pill>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Rewrite and localize hooks like a native creator.</h2>
          <p className="mt-4 text-slate-400">Generate punchier openers and culturally adapted hooks — not literal translations.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="flex items-center gap-2 text-xl font-bold text-white"><WandSparkles size={20} /> Rewrite Hook</h3>
            <div className="mt-5">
              <FieldLabel>Original hook</FieldLabel>
              <input className="input-shell" value={hook} onChange={(event) => setHook(event.target.value)} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {styles.map((style) => (
                <button key={style} onClick={() => onRewrite(style)} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
                  {busy === style ? <Loader2 className="inline animate-spin" size={14} /> : style}
                </button>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {rewrites.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm leading-6 text-slate-200">“{item}”</div>)}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="flex items-center gap-2 text-xl font-bold text-white"><Globe2 size={20} /> Localized Hook Generator</h3>
            <div className="mt-5">
              <FieldLabel>Audience</FieldLabel>
              <select className="input-shell" value={audience} onChange={(event) => setAudience(event.target.value)}>
                {audiences.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <button onClick={onLocalize} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-black text-slate-950 transition hover:bg-cyan-100">
              {busy === 'localize' ? <Loader2 className="animate-spin" size={18} /> : <MessageCircle size={18} />}
              Localize Hook
            </button>
            <div className="mt-6 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-100">{audience}</p>
              <p className="mt-3 text-2xl font-black leading-tight text-white">“{localized}”</p>
              <p className="mt-4 text-sm text-slate-400">Culturally tuned for references, rhythm, slang, and platform-native phrasing.</p>
            </div>
            {error ? <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-100">{error}</p> : null}
          </Card>
        </div>
      </div>
    </section>
  )
}
