import { Menu, ShoppingBag, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { categories } from '../../data/catalog.js'
import SearchBar from './SearchBar.jsx'

export default function Navbar({ onNavigate, currentPath }) {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  function go(path) {
    setOpen(false)
    setMenuOpen(false)
    onNavigate(path)
  }

  const navLink = (path, label) => (
    <button type="button" onClick={() => go(path)} className={`text-sm font-bold transition hover:text-blue-700 ${currentPath === path ? 'text-blue-700' : 'text-slate-700'}`}>
      {label}
    </button>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/82 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => go('/')} className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 to-blue-700 text-lg font-black text-white shadow-glow-soft">E</span>
          <span className="leading-none">
            <span className="block text-lg font-black tracking-[-0.05em] text-slate-950">EaglePeptide</span>
            <span className="hidden text-[0.65rem] font-bold uppercase tracking-[0.24em] text-blue-600 sm:block">Research Supply</span>
          </span>
        </button>

        <div className="hidden items-center gap-7 lg:flex">
          <div className="relative">
            <button onClick={() => setOpen((value) => !value)} className="text-sm font-bold text-slate-700 transition hover:text-blue-700">Categories</button>
            {open ? (
              <div className="absolute left-0 top-8 w-[23rem] rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-premium">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button key={category.id} type="button" onClick={() => go(`/category/${category.slug}`)} className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-blue-50">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} text-white`}><Icon size={18} /></span>
                      <span>
                        <span className="block font-black text-slate-950">{category.shortName}</span>
                        <span className="line-clamp-1 text-xs text-slate-500">{category.description}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : null}
          </div>
          {navLink('/shop', 'Shop')}
          {navLink('/category/recovery-healing', 'Recovery')}
          {navLink('/category/longevity-anti-aging', 'Longevity')}
        </div>

        <div className="ml-auto hidden max-w-sm flex-1 lg:block">
          <SearchBar onNavigate={go} />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button className="hidden h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 sm:inline-flex"><UserRound size={17} /> <span className="ml-2">Account</span></button>
          <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-blue-700" aria-label="Cart"><ShoppingBag size={18} /><span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-[0.65rem] font-black text-slate-950">0</span></button>
          <button onClick={() => setMenuOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-800 lg:hidden" aria-label="Open menu"><Menu size={20} /></button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm lg:hidden">
          <div className="ml-auto flex h-dvh w-[min(92vw,26rem)] flex-col bg-white p-5 shadow-premium">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-lg font-black text-slate-950">EaglePeptide</span>
              <button onClick={() => setMenuOpen(false)} className="rounded-full border border-slate-200 p-2"><X size={20} /></button>
            </div>
            <SearchBar onNavigate={go} variant="mobile" />
            <div className="mt-6 grid gap-2">
              <button onClick={() => go('/shop')} className="rounded-2xl bg-slate-950 px-4 py-3 text-left font-black text-white">Shop Peptides</button>
              {categories.map((category) => <button key={category.id} onClick={() => go(`/category/${category.slug}`)} className="rounded-2xl border border-slate-200 px-4 py-3 text-left font-bold text-slate-800">{category.name}</button>)}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
