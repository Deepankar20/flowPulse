import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'MyReactSDK',
      formats: ['es', 'cjs'],
      fileName: (format) => `my-react-sdk.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'] // Mark peer dependencies as external
    }
  }
});
