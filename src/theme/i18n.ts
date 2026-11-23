// 界面 chrome 文案多语言（v1.18）：模板默认英语，按读者系统语言自动切换
export const STRINGS = {
  en: {
    skip: 'Click to skip · ESC',
    skipLink: 'Skip to content',
    empty: 'No posters on the wall yet — write your first in the lane client.',
    back: '← Back to the wall',
    aboutTitle: 'About lane',
    links: 'Links'
  },
  zh: {
    skip: '点击跳过 · ESC',
    skipLink: '跳到内容',
    empty: '墙上还没有海报 —— 去客户端写第一篇吧',
    back: '← 回到墙面',
    aboutTitle: '关于 lane',
    links: '链接'
  }
};

export function applyI18n(strings, pref) {
  const nav = (navigator.language || 'en').toLowerCase();
  const lang = pref === 'auto' ? (nav.startsWith('zh') ? 'zh' : 'en') : strings[pref] ? pref : 'en';
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const k = el.getAttribute('data-i18n');
    if (strings[lang] && strings[lang][k]) el.textContent = strings[lang][k];
  });
}