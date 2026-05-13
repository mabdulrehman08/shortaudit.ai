export function RetentionGraph({ data }: { data: number[] }) {
  const points = data.map((value, index) => `${(index / Math.max(data.length - 1, 1)) * 100},${100 - value}`).join(' ');

  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-neon">Predicted audience retention</p>
          <h3 className="text-xl font-black text-white">Viewer survival curve</h3>
        </div>
        <span className="rounded-full bg-neon/10 px-3 py-1 text-xs font-bold text-neon">AI forecast</span>
      </div>
      <svg viewBox="0 0 100 48" className="h-40 w-full overflow-visible">
        <defs>
          <linearGradient id="retention-gradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#6fffe9" />
            <stop offset="100%" stopColor="#ff4ecd" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => (
          <line key={line} x1="0" x2="100" y1={line * 15} y2={line * 15} stroke="rgba(255,255,255,.09)" strokeWidth=".5" />
        ))}
        <polyline fill="none" stroke="url(#retention-gradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" points={points} />
      </svg>
    </div>
  );
}
