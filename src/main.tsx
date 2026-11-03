import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TreatmentPage from './components/TreatmentPage.tsx'

// Ruta individual: /tratamientos/<slug>
const match = location.pathname.match(/^\/tratamientos\/([^/]+)\/?$/)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {match ? <TreatmentPage slug={match[1]} /> : <App />}
  </StrictMode>,
)
