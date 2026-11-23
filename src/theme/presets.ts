// 墙面预设与受控色板 —— 规格书 v0.10 冻结值（5.1 / 5.2）
// B 组「午夜霓虹巷」为默认冻结基准；A / C 归档备选，可经 site.config.json 切换。

export const WALL_PRESETS = {
  midnight: { wall: '#23304A', seam: '#1B2438', label: '午夜霓虹巷（默认，B 冻结）' },
  brick: { wall: '#8A4A3B', seam: '#6E3A2E', label: '砖红喷漆墙（备选 A）' },
  concrete: { wall: '#9A9A93', seam: '#7E7E77', label: '混凝土模板画廊（备选 C）' }
};

export const PALETTE = {
  red: '#FF3B2F',
  yellow: '#FFD400',
  green: '#00C48C',
  blue: '#2F6BFF',
  magenta: '#FF2E9A',
  paper: '#F7F1E5',
  ink: '#2B2620'
};

// 海报霓虹描边循环色（B 组：电光蓝 / 品红 / 荧光黄 / 喷漆绿 / 喷漆红）
export const POSTER_CYCLE = [
  PALETTE.blue,
  PALETTE.magenta,
  PALETTE.yellow,
  PALETTE.green,
  PALETTE.red
];

export const READ_CANVAS = '#FAF6EF';

export const DENSITY_COLS = { loose: 3, mid: 4, dense: 5 };

export const FONT_PAIRS = {
  default: {
    display:
      '"Archivo Black","Source Han Sans SC","Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif',
    body:
      '"Inter","Source Han Serif SC","Noto Serif SC","Songti SC","SimSun",serif'
  },
  sans: {
    display:
      '"Archivo Black","Source Han Sans SC","Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif',
    body:
      '"Inter","Source Han Sans SC","Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif'
  },
  serif: {
    display:
      '"Source Han Serif SC","Noto Serif SC","Songti SC","SimSun",serif',
    body:
      '"Source Han Serif SC","Noto Serif SC","Songti SC","SimSun",serif'
  }
};

export function cssVars(theme = {}) {
  const wall = WALL_PRESETS[theme.wall] || WALL_PRESETS.midnight;
  const radius = clamp(theme.radius ?? 10, 6, 14);
  const tilt = clamp(theme.tilt ?? 1.5, 0, 3);
  const cols = DENSITY_COLS[theme.density] || DENSITY_COLS.mid;
  const fonts = { ...(FONT_PAIRS[theme.fontPair] || FONT_PAIRS.default) };
  if (theme.fontDisplay) fonts.display = String(theme.fontDisplay);
  if (theme.fontBody) fonts.body = String(theme.fontBody);
  return [
    `--wall:${wall.wall}`,
    `--seam:${wall.seam}`,
    `--red:${PALETTE.red}`,
    `--yellow:${PALETTE.yellow}`,
    `--green:${PALETTE.green}`,
    `--blue:${PALETTE.blue}`,
    `--magenta:${PALETTE.magenta}`,
    `--paper:${PALETTE.paper}`,
    `--ink:${PALETTE.ink}`,
    `--read-canvas:${READ_CANVAS}`,
    `--radius:${radius}px`,
    `--tilt:${tilt}deg`,
    `--cols:${cols}`,
    `--font-display:${fonts.display}`,
    `--font-body:${fonts.body}`,
    `--stickers:${theme.stickers === false ? 0 : 1}`,
    `--entrance-anim:${theme.entranceAnimation === false ? 0 : 1}`
  ].join(';');
}

function clamp(v, min, max) {
  const n = Number(v);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}