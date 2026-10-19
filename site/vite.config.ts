import { existsSync, readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// A non-empty CNAME means the site is served from its own domain, at the root.
// Otherwise it is served as a project page, at https://abdou-rgd.github.io/officina/.
const cname = existsSync('CNAME') ? readFileSync('CNAME', 'utf8').trim() : '';

export default defineConfig({
  base: process.env.SITE_BASE ?? (cname ? '/' : '/officina/'),
  plugins: [react()]
});
