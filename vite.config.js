import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Planifio/', // Set this to your repository name
  plugins: [react()],
});