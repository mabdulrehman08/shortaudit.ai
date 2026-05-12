import ProductCard from './ProductCard.jsx'

export default function ProductCarousel({ products, onNavigate, title = 'Featured Products', eyebrow = 'Lab verified' }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">{eyebrow}</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-5xl">{title}</h2>
          </div>
          <button onClick={() => onNavigate('/shop')} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-soft transition hover:border-blue-200 hover:bg-blue-50">View all products</button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} />)}
        </div>
      </div>
    </section>
  )
}
