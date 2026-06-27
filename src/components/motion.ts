export const siteEase = [0.22, 1, 0.36, 1] as const;

export const fadeUpTransition = {
  duration: 0.65,
  ease: siteEase,
} as const;

export const inViewViewport = {
  once: true,
  amount: 0.2,
} as const;
