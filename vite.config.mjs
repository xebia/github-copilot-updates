import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basename from './react-config';
import rewriteAll from 'vite-plugin-rewrite-all';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(), 
    rewriteAll(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          basePath: basename,
        },
      },      
    }),
  ],
  base: basename,
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  publicDir: 'public',
  define: {
    // MODE is automatically available in Vite
    // VITE_BUILDNUMBER will be automatically available
  }
});
