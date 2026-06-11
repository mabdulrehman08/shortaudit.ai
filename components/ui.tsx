import type { LucideIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn('mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8', className)}>{children}</section>;
}

export function Badge({ children, icon: Icon = Sparkles }: { children: React.ReactNode; icon?: LucideIcon }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-4 py-2 text-sm font-bold text-lime shadow-glow">
      <Icon className="h-4 w-4" />
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('glass rounded-lg p-5 sm:p-6', className)}>{children}</div>;
}

export function ScoreBar({ label, value, tone = 'lime' }: { label: string; value: number; tone?: 'lime' | 'neon' | 'pulse' | 'flare' | 'warning' }) {
  const colors = {
    lime: 'from-lime to-emerald-300',
    neon: 'from-neon to-cyan-300',
    pulse: 'from-pulse to-violet-300',
    flare: 'from-flare to-pink-300',
    warning: 'from-warning to-orange-300',
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-200">{label}</span>
        <span className="font-black text-white">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full bg-gradient-to-r ${colors[tone]}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
