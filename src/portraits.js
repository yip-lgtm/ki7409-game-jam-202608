// Portrait path map — 4 low-poly penguin expressions
export const PORTRAIT_CACHE = '20260818i';
export const PORTRAIT_SRC = {
  neutral: `assets/portraits/neutral.svg?v=${PORTRAIT_CACHE}`,
  sad:     `assets/portraits/sad.svg?v=${PORTRAIT_CACHE}`,
  shout:   `assets/portraits/shout.svg?v=${PORTRAIT_CACHE}`,
  sing:    `assets/portraits/sing.svg?v=${PORTRAIT_CACHE}`,
};

export function getPortraitSrc(expr) {
  return PORTRAIT_SRC[expr] || PORTRAIT_SRC.neutral;
}
