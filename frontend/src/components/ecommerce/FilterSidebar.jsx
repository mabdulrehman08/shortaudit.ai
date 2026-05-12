import { categories } from '../../data/catalog.js'
import { money } from '../../lib/format.js'

export default function FilterSidebar({ filters, setFilters, productCount }) {
  return (
    <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-soft lg:sticky lg:top-24 lg:self-start">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-black tracking-[-0.03em] text-slate-950">Filters</h2>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{productCount} products</span>
      </div>

      <div className="space-y-6">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-slate-400">Category</p>
          <div className="grid gap-2">
            <FilterButton active={filters.category === 'all'} onClick={() => setFilters((current) => ({ ...current, category: 'all' }))}>All Peptides</FilterButton>
            {categories.map((category) => <FilterButton key={category.id} active={filters.category === category.slug} onClick={() => setFilters((current) => ({ ...current, category: category.slug }))}>{category.name}</FilterButton>)}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-slate-400">Price</p>
          <input
            type="range"
            min="50"
            max="250"
            value={filters.maxPrice}
            onChange={(event) => setFilters((current) => ({ ...current, maxPrice: Number(event.target.value) }))}
            className="w-full accent-blue-700"
          />
          <p className="mt-2 text-sm font-bold text-slate-700">Up to {money(filters.maxPrice)}</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-slate-400">Research Goal</p>
          <select value={filters.goal} onChange={(event) => setFilters((current) => ({ ...current, goal: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100">
            <option value="all">All goals</option>
            <option>Metabolic research</option>
            <option>Tissue repair research</option>
            <option>Growth-hormone axis research</option>
            <option>Cellular energy research</option>
          </select>
        </div>
      </div>
    </aside>
  )
}

function FilterButton({ active, children, onClick }) {
  return <button type="button" onClick={onClick} className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${active ? 'bg-slate-950 text-white' : 'border border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50'}`}>{children}</button>
}
