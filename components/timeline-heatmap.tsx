import type { TimelineMoment } from '@/types/audit';

const tone = {
  strong: 'bg-neon text-ink shadow-glow',
  risk: 'bg-warning text-ink',
  drop: 'bg-flare text-white shadow-magenta',
  neutral: 'bg-white/20 text-white',
};

export function TimelineHeatmap({ moments, duration }: { moments: TimelineMoment[]; duration: number }) {
  return (
    <div className="timeline-grid rounded-3xl border border-white/10 bg-black/25 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-neon">Scroll risk timeline</p>
          <h3 className="text-xl font-black">Risky moments, strong beats, and likely drops</h3>
        </div>
        <span className="text-sm text-slate-400">0:{duration.toString().padStart(2, '0')}</span>
      </div>
      <div className="relative h-20 rounded-2xl bg-white/5">
        {moments.map((moment) => (
          <div key={`${moment.second}-${moment.label}`} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${Math.min(92, (moment.second / duration) * 100)}%` }}>
            <div className={`h-9 w-9 rounded-full ${tone[moment.intensity]} grid place-items-center text-xs font-black`}>{moment.second}s</div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {moments.map((moment) => (
          <div key={moment.label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-black">{moment.label}</span>
              <span className="text-xs uppercase tracking-wider text-slate-500">{moment.second}s · {moment.intensity}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{moment.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
