import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tina from 'astro-tina';

export default defineConfig({
  site: 'https://longlostforgotten.com',
  output: 'static',
  integrations: [react(), tina()],
});