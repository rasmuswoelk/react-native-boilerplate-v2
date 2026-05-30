import { borderRadius } from './variables/borderRadius';
import { colors } from './variables/colors';
import { spacing } from './variables/spacing';
import { typography } from './variables/typography';

export const baseTheme = {
  spacing,
  colors,
  typography,
  borderRadius,
} as const;

export type BaseTheme = typeof baseTheme;
