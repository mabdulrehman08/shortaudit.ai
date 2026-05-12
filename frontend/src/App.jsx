import { useEffect, useMemo, useState } from 'react'
import Footer from './components/ecommerce/Footer.jsx'
import Navbar from './components/ecommerce/Navbar.jsx'
import { getCategoryBySlug, getProductBySlug } from './data/catalog.js'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import ShopPage from './pages/ShopPage.jsx'

function getPath() {
  return window.location.pathname || '/'
}

export default function App() {
  const [path, setPath] = useState(getPath())

  useEffect(() => {
    const onPopState = () => setPath(getPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function navigate(nextPath) {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const route = useMemo(() => {
    const parts = path.split('/').filter(Boolean)
    if (parts[0] === 'product' && parts[1]) {
      const product = getProductBySlug(parts[1])
      return product ? { type: 'product', product } : { type: 'not-found' }
    }
    if (parts[0] === 'category' && parts[1]) {
      const category = getCategoryBySlug(parts[1])
      return category ? { type: 'category', category } : { type: 'not-found' }
    }
    if (parts[0] === 'shop') return { type: 'shop' }
    return { type: 'home' }
  }, [path])

  useEffect(() => {
    if (route.type === 'product') document.title = `${route.product.name} | EaglePeptide Research Peptides`
    else if (route.type === 'category') document.title = `${route.category.name} Research Peptides | EaglePeptide`
    else if (route.type === 'shop') document.title = 'Shop Research Peptides | EaglePeptide'
    else document.title = 'EaglePeptide | Premium Research Peptides'
  }, [route])

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar onNavigate={navigate} currentPath={path} />
      {route.type === 'home' ? <HomePage onNavigate={navigate} /> : null}
      {route.type === 'shop' ? <ShopPage key="shop" onNavigate={navigate} /> : null}
      {route.type === 'category' ? <ShopPage key={route.category.slug} onNavigate={navigate} initialCategory={route.category.slug} title={route.category.name} description={route.category.description} /> : null}
      {route.type === 'product' ? <ProductPage product={route.product} onNavigate={navigate} /> : null}
      {route.type === 'not-found' ? <NotFound onNavigate={navigate} /> : null}
      <Footer onNavigate={navigate} />
    </div>
  )
}

function NotFound({ onNavigate }) {
  return (
    <main className="px-4 py-24 text-center">
      <h1 className="text-5xl font-black tracking-[-0.06em] text-slate-950">Page not found</h1>
      <p className="mt-4 text-slate-600">This research page does not exist.</p>
      <button onClick={() => onNavigate('/shop')} className="mt-8 rounded-full bg-slate-950 px-7 py-4 font-black text-white">Return to shop</button>
    </main>
  )
}
