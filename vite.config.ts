import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      // Use the public URL for WebSocket connection
      clientPort: 443,
      host: 'blink.new',
      protocol: 'wss'
    },
    // Allow all blink.new subdomains
    allowedHosts: 'all'
  }
})