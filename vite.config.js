import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Planifio/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure Vite recognizes .jsx as a valid extension
  },
});
