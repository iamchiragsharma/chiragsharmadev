import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Port 3000 is used for the local frontend development server
    port: 3000,
    // Automatically open the app in the default browser when the server starts
    open: true,
    // Proxy configuration to handle backend API requests locally
    proxy: {
      '/api': {
        // Forward '/api' requests to the local Node.js API server (dev-api.js) on port 3001
        // Note: We use '127.0.0.1' instead of 'localhost' to avoid IPv6/IPv4 lookup conflicts on macOS
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
    },
  },
});
