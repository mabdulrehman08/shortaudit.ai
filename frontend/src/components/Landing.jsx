import { createElement } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Sparkles, Zap } from 'lucide-react'
import { Pill } from './ui.jsx'

const MotionDiv = motion.div

export default function Landing() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-fuchsia-400 text-slate-950 shadow-glow">
            <Sparkles size={20} />
          </div>
          <span className="text-sm font-bold tracking-tight text-white">ShortAudit AI</span>
        </div>
        <a href="#dashboard" className="hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-100 sm:block">
          Analyze My Video
        </a>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <MotionDiv initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 flex flex-wrap gap-3">
            <Pill>AI distribution analyst</Pill>
            <Pill tone="purple">TikTok · Reels · Shorts</Pill>
          </div>
          <h1 className="max-w-5xl text-5xl font-extrabold tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            Understand Why Your Shorts Flop.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            AI-powered analysis for TikTok, Reels, and YouTube Shorts. Diagnose weak hooks, retention cliffs, API upload risks, repetitive AI formats, and CTA friction before your next post disappears at 5 views.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#dashboard" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-400 px-7 py-4 font-bold text-slate-950 shadow-glow transition hover:scale-[1.02]">
              Analyze My Video <ArrowRight className="transition group-hover:translate-x-1" size={18} />
            </a>
            <a href="#rewrite" className="inline-flex items-center justify-center rounded-full border border-white/10 px-7 py-4 font-semibold text-white transition hover:bg-white/10">
              Rewrite hooks
            </a>
          </div>
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="glass gradient-border rounded-[2rem] p-5 shadow-card">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Live Audit</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Distribution risk</h3>
              </div>
              <div className="rounded-2xl bg-emerald-400/10 px-3 py-2 text-sm font-bold text-emerald-200">82% confidence</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Hook', '7.8/10', Sparkles, 'from-cyan-300 to-blue-500'],
                ['Shadowban', '24%', Zap, 'from-amber-300 to-orange-500'],
                ['Retention', 'Medium', BarChart3, 'from-fuchsia-300 to-purple-500'],
                ['Viral score', '78', ArrowRight, 'from-emerald-300 to-cyan-400'],
              ].map(([label, value, Icon, gradient]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-slate-950`}>
                    {createElement(Icon, { size: 19 })}
                  </div>
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-1 text-2xl font-black text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
