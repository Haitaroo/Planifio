import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Planifio/', // Set the base path to the subdirectory
  plugins: [react()],
});
