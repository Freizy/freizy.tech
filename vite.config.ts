import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  if (!process.env.VITE_WEB3FORMS_KEY) {
    console.warn(
      '[freizy] VITE_WEB3FORMS_KEY is not set — contact forms will show their error state until it is configured.'
    );
  }
  return {
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          // Keep the large, rarely-changing libraries in their own chunks so
          // app code can be cached independently and the entry stays small.
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'motion-vendor': ['motion'],
            'icons-vendor': ['lucide-react'],
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
