import ProductCard from './ProductCard.jsx'

export default function RelatedProducts({ products, onNavigate }) {
  return (
    <section className="mt-14">
      <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">Frequently researched with</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-950">Related research compounds</h2>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} compact />)}
      </div>
    </section>
  )
}
