import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TreatmentDetail from './components/TreatmentDetail.tsx'
import NotFound from './components/NotFound.tsx'
import { findTreatment } from './data/treatments.ts'

// Enrutado por ruta (sin dependencias). `public/404.html` + el script de index.html
// permiten abrir /tratamientos/<slug> directamente en GitHub Pages.
function route() {
  const path = location.pathname.slice(import.meta.env.BASE_URL.length - 1) || '/'
  if (path === '/' || path === '/index.html') return <App />

  const m = path.match(/^\/tratamientos\/([^/]+)\/?$/)
  if (m) {
    const t = findTreatment(decodeURIComponent(m[1]))
    return t ? <TreatmentDetail treatment={t} /> : <NotFound />
  }
  return <NotFound />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>{route()}</StrictMode>,
)
