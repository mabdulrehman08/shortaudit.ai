import { motion } from 'framer-motion'

const MotionDiv = motion.div

export function Card({ children, className = '' }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`glass gradient-border rounded-3xl shadow-card ${className}`}
    >
      {children}
    </MotionDiv>
  )
}

export function Pill({ children, tone = 'cyan' }) {
  const tones = {
    cyan: 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100',
    purple: 'border-purple-300/20 bg-purple-300/10 text-purple-100',
    amber: 'border-amber-300/20 bg-amber-300/10 text-amber-100',
  }

  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>
}

export function ScoreBar({ value, max = 100, className = '' }) {
  const width = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={`h-2.5 overflow-hidden rounded-full bg-slate-800 ${className}`}>
      <MotionDiv
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 shadow-glow"
      />
    </div>
  )
}

export function FieldLabel({ children }) {
  return <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{children}</label>
}
