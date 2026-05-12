import { ShoppingBag } from 'lucide-react'
import { getProductCategories } from '../../data/catalog.js'
import { money } from '../../lib/format.js'

export default function ProductCard({ product, onNavigate, compact = false }) {
  const [primaryCategory] = getProductCategories(product)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-premium">
      <button type="button" onClick={() => onNavigate(`/product/${product.slug}`)} className="relative block bg-gradient-to-br from-slate-50 via-white to-blue-50 p-5 text-left">
        <div className="absolute left-5 top-5 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm ring-1 ring-blue-100">
          {product.purity} Purity
        </div>
        {primaryCategory ? (
          <div className="absolute right-5 top-5 z-10 rounded-full bg-slate-950/90 px-3 py-1 text-xs font-semibold text-white">
            {primaryCategory.shortName}
          </div>
        ) : null}
        <div className="aspect-square overflow-hidden rounded-[1.35rem] bg-white">
          <img
            src={product.image}
            alt={`${product.name} research vial`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-600">{product.goal}</p>
        <button type="button" onClick={() => onNavigate(`/product/${product.slug}`)} className="mt-2 text-left">
          <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950 transition group-hover:text-blue-700">{product.name}</h3>
        </button>
        {!compact ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p> : null}
        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <p className="text-2xl font-black text-slate-950">{money(product.price)}</p>
            <p className="text-sm text-slate-400 line-through">{money(product.compareAt)}</p>
          </div>
          <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition hover:bg-blue-700" aria-label={`Quick add ${product.name}`}>
            <ShoppingBag size={19} />
          </button>
        </div>
      </div>
    </article>
  )
}
