import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Prevent clickjacking attacks
      'X-Frame-Options': 'DENY',
      // Prevent MIME type sniffing
      'X-Content-Type-Options': 'nosniff',
      // Control referrer information
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Restrict browser features
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      // Content Security Policy — allows React, fonts, GHL widget, and trusted CDNs only
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://widgets.leadconnectorhq.com https://link.msgsndr.com https://js.hsforms.net",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self' https://api.leadconnectorhq.com https://backend.leadconnectorhq.com https://services.leadconnectorhq.com https://widgets.leadconnectorhq.com https://link.msgsndr.com",
        "frame-src 'self' https://widgets.leadconnectorhq.com https://api.leadconnectorhq.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self' https://backend.leadconnectorhq.com https://api.leadconnectorhq.com",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
      ].join('; '),
    },
  },
  build: {
    // Prevent source map exposure in production
    sourcemap: false,
    rollupOptions: {
      output: {
        // Randomize chunk filenames to prevent path enumeration
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
      },
    },
  },
})
