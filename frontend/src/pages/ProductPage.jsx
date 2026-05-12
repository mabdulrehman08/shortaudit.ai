import { Check, Minus, Plus, ShieldCheck, Snowflake } from 'lucide-react'
import { createElement, useMemo, useState } from 'react'
import RelatedProducts from '../components/ecommerce/RelatedProducts.jsx'
import { getProductCategories, products } from '../data/catalog.js'
import { money } from '../lib/format.js'

export default function ProductPage({ product, onNavigate }) {
  const [quantity, setQuantity] = useState(1)
  const productCategories = getProductCategories(product)
  const related = useMemo(() => products.filter((item) => item.id !== product.id && item.categories.some((category) => product.categories.includes(category))).slice(0, 3), [product])

  return (
    <main className="bg-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6 shadow-soft">
            <div className="absolute left-6 top-6 z-10 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-blue-700 shadow-soft ring-1 ring-blue-100">{product.purity} purity</div>
            <img src={product.image} alt={`${product.name} research product`} className="aspect-square w-full rounded-[2rem] object-cover" />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {productCategories.map((category) => <button key={category.id} onClick={() => onNavigate(`/category/${category.slug}`)} className="rounded-full bg-blue-50 px-4 py-2 text-xs font-black text-blue-700 ring-1 ring-blue-100">{category.name}</button>)}
          </div>
          <h1 className="mt-5 text-5xl font-black tracking-[-0.075em] text-slate-950 sm:text-6xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{product.description}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <Spec icon={ShieldCheck} title="Purity" value={product.purity} />
            <Spec icon={Check} title="Grade" value="Research" />
            <Spec icon={Snowflake} title="Handling" value="Cold ready" />
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-4xl font-black tracking-[-0.05em] text-slate-950">{money(product.price)}</p>
                <p className="mt-1 text-sm text-slate-400 line-through">{money(product.compareAt)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-slate-200 p-1">
                  <button onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100" aria-label="Decrease quantity"><Minus size={16} /></button>
                  <span className="w-10 text-center font-black">{quantity}</span>
                  <button onClick={() => setQuantity((current) => current + 1)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100" aria-label="Increase quantity"><Plus size={16} /></button>
                </div>
                <button className="rounded-full bg-slate-950 px-7 py-4 font-black text-white shadow-premium transition hover:bg-blue-700">Add to cart</button>
              </div>
            </div>
          </div>

          <InfoPanel title="Research applications" items={product.applications} />
          <div className="mt-5 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">Storage instructions</h2>
            <p className="mt-3 leading-7 text-slate-600">{product.storage}</p>
          </div>
          <FAQ />
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <RelatedProducts products={related} onNavigate={onNavigate} />
      </div>
      <div className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/90 p-3 shadow-premium backdrop-blur lg:hidden">
        <button className="w-full rounded-full bg-slate-950 px-6 py-4 font-black text-white">Add {quantity} to cart · {money(product.price * quantity)}</button>
      </div>
    </main>
  )
}

function Spec({ icon, title, value }) {
  return <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">{createElement(icon, { className: 'text-blue-700', size: 21 })}<p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-slate-400">{title}</p><p className="mt-1 font-black text-slate-950">{value}</p></div>
}

function InfoPanel({ title, items }) {
  return <div className="mt-5 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">{title}</h2><div className="mt-4 grid gap-3">{items.map((item) => <div key={item} className="flex gap-3 rounded-2xl bg-blue-50 p-4 text-sm font-bold text-slate-700"><Check className="mt-0.5 shrink-0 text-blue-700" size={17} />{item}</div>)}</div></div>
}

function FAQ() {
  const faqs = [
    ['Is this product third-party tested?', 'The redesigned catalog surfaces purity and lab-verification messaging so customers can quickly evaluate quality signals.'],
    ['Who are these products intended for?', 'Products are positioned for laboratory research use by qualified researchers and organizations.'],
    ['How should vials be stored?', 'Follow the product storage instructions and your internal laboratory SOPs for sterile handling and cold storage.'],
  ]
  return <div className="mt-5 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">FAQ</h2><div className="mt-4 divide-y divide-slate-200">{faqs.map(([question, answer]) => <details key={question} className="group py-4"><summary className="cursor-pointer list-none font-black text-slate-950">{question}</summary><p className="mt-3 leading-7 text-slate-600">{answer}</p></details>)}</div></div>
}
