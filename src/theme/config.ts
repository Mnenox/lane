import fs from 'node:fs';
import { cssVars as buildVars } from './presets';

const raw = JSON.parse(
  fs.readFileSync(new URL('../../site.config.json', import.meta.url), 'utf8')
);

const DEFAULT_THEME = {
  wall: 'midnight',
  radius: 10,
  tilt: 1.5,
  density: 'mid',
  stickers: true,
  entranceAnimation: true,
  fontPair: 'default'
};

export const config = {
  siteName: 'lane',
  tagline: '',
  author: '',
  locale: 'zh-CN',
  nav: [
    { label: '首页', href: '/' },
    { label: '归档', href: '/archive/' },
    { label: '关于', href: '/about/' }
  ],
  social: [],
  about: '',
  ...raw,
  theme: { ...DEFAULT_THEME, ...(raw.theme || {}) }
};

export const cssVars = buildVars(config.theme);

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path) {
  if (!path || path === '/') return BASE + '/';
  if (/^https?:\/\//.test(path)) return path;
  return BASE + (path.startsWith('/') ? path : '/' + path);
}

export function isPublished(post, now = new Date()) {
  return !post.data.draft && post.data.publishAt <= now;
}