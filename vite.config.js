import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The public web address used in search tags, the sitemap, and link previews.
// Set SITE_URL in Vercel (Settings → Environment Variables) once the domain is chosen, e.g. https://olgatislina.com
// Until then Vercel's own production address is used, and local builds use the preview server's address.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:4173'
).replace(/\/+$/, '')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl) },
})
