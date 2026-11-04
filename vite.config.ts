import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/clinic_web_design/',
  // Safari/iOS 14+: evita sintaxis que iPhones con iOS antiguo no pueden parsear.
  build: { target: ['es2020', 'safari14'] },
})
