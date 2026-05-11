import { motion } from 'framer-motion'

export function Card({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`glass gradient-border rounded-3xl shadow-card ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function Pill({ children }) {
  return <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">{children}</span>
}

export function ScoreBar({ value, max = 100, className = '' }) {
  const width = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={`h-2.5 overflow-hidden rounded-full bg-zinc-900 ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="h-full rounded-full bg-gradient-to-r from-white via-zinc-300 to-white shadow-glow"
      />
    </div>
  )
}

export function FieldLabel({ children }) {
  return <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{children}</label>
}
