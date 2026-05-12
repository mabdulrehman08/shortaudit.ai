import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { categories, products } from '../../data/catalog.js'

export default function SearchBar({ onNavigate, variant = 'desktop' }) {
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLowerCase()
  const results = useMemo(() => {
    if (!normalized) return { products: [], categories: [] }
    return {
      products: products.filter((product) => `${product.name} ${product.goal}`.toLowerCase().includes(normalized)).slice(0, 4),
      categories: categories.filter((category) => category.name.toLowerCase().includes(normalized)).slice(0, 3),
    }
  }, [normalized])

  function go(path) {
    setQuery('')
    onNavigate(path)
  }

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search peptides, goals, categories"
        className={`${variant === 'mobile' ? 'h-12' : 'h-11'} w-full rounded-full border border-slate-200 bg-white/90 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100`}
      />
      {normalized ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-50 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-premium">
          <div className="p-3">
            {results.products.length || results.categories.length ? (
              <>
                {results.products.map((product) => (
                  <button key={product.id} type="button" onClick={() => go(`/product/${product.slug}`)} className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-blue-50">
                    <img src={product.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
                    <span>
                      <span className="block font-bold text-slate-950">{product.name}</span>
                      <span className="block text-xs text-slate-500">{product.goal}</span>
                    </span>
                  </button>
                ))}
                {results.categories.map((category) => (
                  <button key={category.id} type="button" onClick={() => go(`/category/${category.slug}`)} className="flex w-full items-center justify-between rounded-2xl p-3 text-left text-sm font-bold text-blue-700 transition hover:bg-blue-50">
                    Category: {category.name}
                    <span aria-hidden="true">→</span>
                  </button>
                ))}
              </>
            ) : (
              <p className="p-4 text-sm text-slate-500">No matching products or categories.</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
