import { ArrowRight, FlaskConical } from 'lucide-react'
import { motion } from 'framer-motion'
import CategoryCard from '../components/ecommerce/CategoryCard.jsx'
import ProductCarousel from '../components/ecommerce/ProductCarousel.jsx'
import TrustBadge from '../components/ecommerce/TrustBadge.jsx'
import { categories, products, trustBadges } from '../data/catalog.js'

const MotionDiv = motion.div

export default function HomePage({ onNavigate }) {
  return (
    <>
      <section className="relative overflow-hidden bg-biotech px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 molecule-pattern opacity-55" />
        <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -left-28 bottom-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <MotionDiv initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-white/75 px-4 py-2 text-sm font-black text-blue-800 shadow-soft backdrop-blur">Third-party tested research compounds</div>
            <h1 className="max-w-5xl text-5xl font-black tracking-[-0.075em] text-slate-950 sm:text-7xl lg:text-8xl">Premium Research Peptides</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">Third-party tested research compounds with uncompromising purity.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => onNavigate('/shop')} className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 font-black text-white shadow-premium transition hover:-translate-y-0.5 hover:bg-blue-700">Shop Peptides <ArrowRight className="transition group-hover:translate-x-1" size={18} /></button>
              <button onClick={() => onNavigate('/category/fat-loss')} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-7 py-4 font-black text-slate-950 shadow-soft backdrop-blur transition hover:border-blue-200 hover:bg-blue-50">View Categories</button>
            </div>
          </MotionDiv>

          <MotionDiv initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-[2.25rem] border border-white/70 bg-white/65 p-4 shadow-premium backdrop-blur-xl">
            <div className="rounded-[1.8rem] bg-slate-950 p-6 text-white">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Batch profile</p>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Lab verified purity</h2>
                </div>
                <FlaskConical className="text-cyan-200" size={32} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {['HPLC identity', 'COA available', 'Cold-chain ready', 'Sterile workflow'].map((item) => <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"><p className="text-sm text-slate-400">Standard</p><p className="mt-2 text-xl font-black">{item}</p></div>)}
              </div>
              <div className="mt-6 rounded-3xl bg-gradient-to-r from-cyan-300 to-blue-500 p-5 text-slate-950"><p className="text-sm font-bold">Quality signal</p><p className="mt-1 text-3xl font-black tracking-[-0.05em]">99%+ Purity Focus</p></div>
            </div>
          </MotionDiv>
        </div>
      </section>

      <section className="relative -mt-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-5">
          {trustBadges.map((badge) => <TrustBadge key={badge.title} badge={badge} />)}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">Shop by goal</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-5xl">Organized for serious research workflows.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 5).map((category, index) => <CategoryCard key={category.id} category={category} onNavigate={onNavigate} featured={index === 0} />)}
          </div>
        </div>
      </section>

      <ProductCarousel products={[...products].sort((a, b) => b.popularity - a.popularity)} onNavigate={onNavigate} />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-slate-950 p-7 text-white shadow-premium sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-200">Why EaglePeptide</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] sm:text-5xl">Science-first sourcing for a premium research standard.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {['Clear category architecture', 'Purity-first product pages', 'Professional laboratory handling details', 'Conversion-focused shopping without clutter'].map((item) => <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"><h3 className="font-black">{item}</h3><p className="mt-2 text-sm leading-6 text-slate-400">Built to communicate trust, scientific intent, and ecommerce clarity on every device.</p></div>)}
          </div>
        </div>
      </section>
    </>
  )
}
