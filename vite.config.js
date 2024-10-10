import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Planifio/', // Set this to your repository name
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this is where Vite outputs the compiled files
    rollupOptions: {
      input: './index.html', // Specify the entry point
    },
  },
});
