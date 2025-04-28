import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // ✅ ye line add kar de — ye browser auto khol dega
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
});
