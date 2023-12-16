import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "./path/to/_variables.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      // Treat .js files as .jsx files for JSX syntax
      entries: [{ find: /\.jsx?$/, replacement: '.js' }],
    },
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
});
