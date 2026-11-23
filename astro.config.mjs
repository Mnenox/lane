import { defineConfig } from 'astro/config';
import fs from 'node:fs';

const cfg = JSON.parse(
  fs.readFileSync(new URL('./site.config.json', import.meta.url), 'utf8')
);

export default defineConfig({
  site: cfg.siteUrl || 'https://example.github.io',
  base: cfg.basePath || '/',
  trailingSlash: 'ignore',
  output: 'static',
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { theme: 'github-light' }
  }
});