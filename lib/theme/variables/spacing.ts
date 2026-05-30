export const spacing = {
  ['3xs']: 1,
  ['2xs']: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  ['2xl']: 40,
  ['3xl']: 48,
  ['4xl']: 56,
  ['5xl']: 64,
  ['6xl']: 72,
  ['7xl']: 80,
  gutter: 12,
} as const;

export type SpacingType = typeof spacing;
export type SpacingKeyType = keyof typeof spacing;
