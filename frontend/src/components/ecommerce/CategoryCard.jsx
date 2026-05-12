import { ArrowRight } from 'lucide-react'

export default function CategoryCard({ category, onNavigate, featured = false }) {
  const Icon = category.icon

  return (
    <button
      type="button"
      onClick={() => onNavigate(`/category/${category.slug}`)}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/60 text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-premium ${featured ? 'min-h-[22rem]' : 'min-h-[16rem]'}`}
    >
      <img src={category.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/88 via-slate-950/60 to-blue-700/40" />
      <div className="relative flex h-full flex-col justify-between p-6 text-white sm:p-8">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} shadow-glow-soft`}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">{category.name}</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-blue-50/85">{category.description}</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 transition group-hover:gap-3">
            Explore category <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </button>
  )
}
