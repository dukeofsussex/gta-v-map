import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import config from './maps.config';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 8080,
  },
  define: {
    'process.env.CONFIG': config,
  },
});
