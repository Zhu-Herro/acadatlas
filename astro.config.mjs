// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Deployment note:
 * Replace `site` with the final production origin before going live.
 * It is used for canonical URLs, Open Graph tags and the sitemap.
 */
const SITE = 'https://acadatlas.netlify.app';

// https://astro.build/config
export default defineConfig({
  site: SITE,

  /**
   * Internationalisation is part of the architecture from day one.
   * - Default locale (zh) is served without a path prefix:  /
   * - Other locales are prefixed:                            /en/
   * Adding a third language later only requires adding it to `locales`
   * plus a dictionary in `src/i18n/ui.ts`.
   */
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-CN',
          en: 'en',
        },
      },
    }),
  ],

  vite: {
    // The Tailwind v4 Vite plugin is typed against its own bundled Vite copy,
    // which can differ from the one Astro resolves. The cast is type-only —
    // the plugin is a standard Vite plugin at runtime.
    plugins: [/** @type {any} */ (tailwindcss())],
  },

  build: {
    // Keep small stylesheets inlined, ship larger ones as files.
    inlineStylesheets: 'auto',
  },

  // Static output: fast, cheap, SEO-friendly. Interactive tools (search,
  // compare) run client-side; a database/API layer can be added later
  // without changing the content architecture.
  output: 'static',
});
