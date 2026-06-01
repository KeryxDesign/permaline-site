// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Config dinamica: usa env DEPLOY_TARGET=production per dominio reale
// permaline.it, default per GitHub Pages preview keryxdesign.github.io
const isProduction = process.env.DEPLOY_TARGET === 'production';

// https://astro.build/config
export default defineConfig({
  site: isProduction ? 'https://permaline.it' : 'https://keryxdesign.github.io',
  base: isProduction ? '/' : '/permaline-site/',
  server: { port: 4326 },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
