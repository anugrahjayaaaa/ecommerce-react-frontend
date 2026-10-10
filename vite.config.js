import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    proxy: {
      // Proxying keeps every API call same-origin, which removes the whole
      // cross-site cookie problem: SameSite, CORS and the localhost vs
      // 127.0.0.1 host mismatch can no longer bite.
      '/api': { target: 'http://127.0.0.1:8000' },
      '/sanctum': { target: 'http://127.0.0.1:8000' },
      '/storage': { target: 'http://127.0.0.1:8000' },
    },
  },
})
