import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Layout from './components/Layout.tsx'
import TreatmentDetail from './components/TreatmentDetail.tsx'
import NotFound from './components/NotFound.tsx'

// basename = base de Vite sin la barra final (/clinic_web_design en GitHub Pages).
// `public/404.html` + el script de index.html permiten abrir /tratamientos/<slug>
// directamente o recargarlo en GitHub Pages.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="tratamientos/:slug" element={<TreatmentDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
