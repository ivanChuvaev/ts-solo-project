import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/weather-api': {
        target: 'https://api.weatherapi.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weather-api/, '')
      },
    }
  }
});
