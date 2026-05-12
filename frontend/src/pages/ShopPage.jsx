import { useMemo, useState } from 'react'
import FilterSidebar from '../components/ecommerce/FilterSidebar.jsx'
import ProductCard from '../components/ecommerce/ProductCard.jsx'
import { products } from '../data/catalog.js'

export default function ShopPage({ onNavigate, initialCategory = 'all', title = 'Shop Research Peptides', description = 'Browse lab-verified research compounds by category, price, popularity, newest arrivals, and research goal.' }) {
  const [filters, setFilters] = useState({ category: initialCategory, maxPrice: 250, goal: 'all', sort: 'popularity' })

  const visible = useMemo(() => {
    const filtered = products.filter((product) => {
      const categoryMatch = filters.category === 'all' || product.categories.includes(filters.category)
      const priceMatch = product.price <= filters.maxPrice
      const goalMatch = filters.goal === 'all' || product.goal === filters.goal
      return categoryMatch && priceMatch && goalMatch
    })
    return [...filtered].sort((a, b) => {
      if (filters.sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
      if (filters.sort === 'price-low') return a.price - b.price
      if (filters.sort === 'price-high') return b.price - a.price
      return b.popularity - a.popularity
    })
  }, [filters])

  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">Premium catalog</p>
          <h1 className="mt-3 text-5xl font-black tracking-[-0.07em] text-slate-950 sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[18rem_1fr] lg:px-8">
        <FilterSidebar filters={filters} setFilters={setFilters} productCount={visible.length} />
        <div>
          <div className="mb-5 flex flex-col justify-between gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-soft sm:flex-row sm:items-center">
            <p className="font-bold text-slate-700">Showing {visible.length} premium research products</p>
            <select value={filters.sort} onChange={(event) => setFilters((current) => ({ ...current, sort: event.target.value }))} className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-blue-300">
              <option value="popularity">Sort by popularity</option>
              <option value="newest">Sort by newest</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} />)}
          </div>
        </div>
      </section>
    </main>
  )
}
