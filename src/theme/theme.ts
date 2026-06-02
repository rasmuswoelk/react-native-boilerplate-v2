import { StyleSheet } from 'react-native-unistyles';
import { borderRadius } from '@/lib/theme/variables/borderRadius';
import { colors as primitiveColors } from '@/lib/theme/variables/colors';
import { spacing } from '@/lib/theme/variables/spacing';
import { typography } from '@/lib/theme/variables/typography';

const brand = {
  100: '#e8f4fd',
  200: '#bee9fb',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  800: '#004d7a',
  900: '#002f44',
} as const;

const sharedValues = {
  spacing,
  typography,
  borderRadius,
} as const;

const lightTheme = {
  ...sharedValues,
  colors: {
    ...primitiveColors,
    brand,
    ground: '#ffffff',
    figure: '#000000',
    background: '#ffffff',
    text: '#000000',
    primary: '#000000',
    secondary: '#666666',
    border: '#e0e0e0',
  },
} as const;

const darkTheme = {
  ...sharedValues,
  colors: {
    ...primitiveColors,
    brand,
    ground: '#000000',
    figure: '#ffffff',
    background: '#0d0d0d',
    text: '#f0f0f0',
    primary: '#ffffff',
    secondary: '#999999',
    border: '#2a2a2a',
  },
} as const;

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  settings: {
    adaptiveThemes: true,
  },
});

export type AppTheme = typeof lightTheme;
