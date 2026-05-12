import { categories } from '../../data/catalog.js'

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950">E</span>
            <span className="text-xl font-black tracking-[-0.05em]">EaglePeptide</span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">Premium research peptides with a science-first product experience, category-led shopping, and transparent laboratory details. Products are intended for laboratory research use only.</p>
        </div>
        <div>
          <h3 className="font-black">Research Goals</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            {categories.slice(0, 4).map((category) => <button key={category.id} onClick={() => onNavigate(`/category/${category.slug}`)} className="text-left transition hover:text-white">{category.name}</button>)}
          </div>
        </div>
        <div>
          <h3 className="font-black">Quality</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <span>Third-party tested</span>
            <span>Secure Stripe checkout</span>
            <span>Fast USA shipping</span>
            <span>Batch-focused quality controls</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
