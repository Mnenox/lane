import raw from '../../site.config.json';
import { cssVars as buildVars } from './presets';

// JSON 经 vite import 追踪：配置改动触发 dev 热更新（v1.25 修复预览不刷新）

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