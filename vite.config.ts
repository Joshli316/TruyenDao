import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

const buildHash = Date.now().toString(36);

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: 'sw-cache-bust',
      closeBundle() {
        try {
          const fs = require('fs');
          const swPath = resolve(__dirname, 'dist/sw.js');
          const content = fs.readFileSync(swPath, 'utf-8');
          fs.writeFileSync(swPath, content.replace('truyendao-v1', `truyendao-${buildHash}`));
        } catch { /* sw.js may not exist in dev */ }
      },
    },
  ],
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
