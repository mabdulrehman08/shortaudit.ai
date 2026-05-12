export default function TrustBadge({ badge }) {
  const Icon = badge.icon

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white/85 p-5 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-premium">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
        <Icon size={21} />
      </div>
      <h3 className="text-lg font-black tracking-[-0.03em] text-slate-950">{badge.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{badge.description}</p>
    </div>
  )
}
