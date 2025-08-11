import { getLineHeight } from "../utils/getLineHeight";

const lineHeight = {
  xs: 1,
  sm: 1.1,
  md: 1.2,
  lg: 1.3,
  xl: 1.4,
} as const;

const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 600,
  black: 700,
} as const;

const fontFamily = {
  primary: "SpaceMono",
} as const;

const fontSize = {
  ["3xs"]: 6,
  ["2xs"]: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  ["2xl"]: 24,
  ["3xl"]: 32,
  ["4xl"]: 40,
  ["5xl"]: 48,
  ["6xl"]: 56,
  ["7xl"]: 64,
} as const;

const variant = {
  h1: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.black,
    lineHeight: getLineHeight(fontSize["3xl"], lineHeight.xl),
  },
  h2: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.bold,
    lineHeight: getLineHeight(fontSize["2xl"], lineHeight.lg),
  },
  h3: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.medium,
    lineHeight: getLineHeight(fontSize.xl, lineHeight.xl),
  },
  h4: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    lineHeight: getLineHeight(fontSize.lg, lineHeight.lg),
  },
  h5: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.light,
    lineHeight: getLineHeight(fontSize.md, lineHeight.md),
  },
  body: {
    fontSize: fontSize.md,
    lineHeight: getLineHeight(fontSize.md, lineHeight.md),
  },
  paragraph: {
    fontSize: fontSize.md,
    lineHeight: getLineHeight(fontSize.md, lineHeight.xl),
  },
  caption: {
    fontSize: fontSize.sm,
    lineHeight: getLineHeight(fontSize.sm, lineHeight.sm),
  },
} as const;

export const typography = {
  lineHeight,
  fontFamily,
  fontSize,
  fontWeight,
  variant,
} as const;

export type TypographyType = typeof typography;
export type FontWeightType = typeof fontWeight;
export type FontFamilyType = typeof fontFamily;
export type FontSizeType = typeof fontSize;
export type LineHeightType = typeof lineHeight;
