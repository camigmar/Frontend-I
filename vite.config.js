import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // nombre del repo para que funcione en github pages
  base: '/Frontend-I/',
})
