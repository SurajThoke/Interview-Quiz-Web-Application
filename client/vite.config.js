import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This server block sets up the development server configuration.
    proxy: {
      // When the client requests /api/..., Vite forwards it to the target server.
      '/api': {
        // The target is the port where your Express server is running (port 5000)
        target: 'http://localhost:5000', 
        // We need changeOrigin to true for virtual hosting setups
        changeOrigin: true,
        // Set to true if your backend uses HTTPS, but for local development, false is common
        secure: false, 
      },
    },
  },
})
