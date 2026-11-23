import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// ┌──────────────────────────────────────────────────────────────────────────────┐
// │ The site's public web address. CHANGE THIS before uploading to Hostinger,    │
// │ e.g. 'https://olgatislina.com' (no slash at the end). Search engines, the    │
// │ sitemap, link previews, and the https/www redirect in .htaccess all use it.  │
// └──────────────────────────────────────────────────────────────────────────────┘
const SITE_URL = 'https://olgas-art.com'

// (A SITE_URL environment variable, if set, wins: handy for one-off test builds.)
const siteUrl = (process.env.SITE_URL || SITE_URL).replace(/\/+$/, '')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl) },
})
