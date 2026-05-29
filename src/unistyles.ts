import { StyleSheet } from "react-native-unistyles";
import { borderRadius } from "@/lib/theme/variables/borderRadius";
import { spacing } from "@/lib/theme/variables/spacing";
import { typography } from "@/lib/theme/variables/typography";

const primitiveColors = {
  white: "#fff",
  black: "#000",
  red: {
    100: "#ffe3e3",
    200: "#ffb3b3",
    300: "#ff8383",
    400: "#ff5353",
    500: "#ff2323",
    600: "#e61e1e",
    700: "#cc1a1a",
    800: "#b31515",
  },
  green: {
    100: "#e3ffe3",
    200: "#b3ffb3",
    300: "#83ff83",
    400: "#53ff53",
    500: "#23ff23",
    600: "#1ecc1e",
    700: "#1acc1a",
    800: "#15b715",
  },
  orange: {
    100: "#fff3e0",
    200: "#ffe0b2",
    300: "#ffcc80",
    400: "#ffb74d",
    500: "#ffa726",
    600: "#ff9800",
    700: "#ff5722",
    800: "#d84315",
  },
  blue: {
    100: "#e3f2fd",
    200: "#bbdefb",
    300: "#90caf9",
    400: "#64b5f6",
    500: "#42a5f5",
    600: "#2196f3",
    700: "#1e88e5",
    800: "#1976d2",
  },
  gray: {
    100: "#f5f5f5",
    200: "#e0e0e0",
    300: "#bdbdbd",
    400: "#9e9e9e",
    500: "#757575",
    600: "#616161",
    700: "#424242",
    800: "#212121",
  },
  brand: {
    100: "#e8f4fd",
    200: "#bee9fb",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#004d7a",
    900: "#002f44",
  },
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
    ground: "#ffffff",
    figure: "#000000",
    background: "#ffffff",
    text: "#000000",
    primary: "#000000",
    secondary: "#666666",
    border: "#e0e0e0",
  },
} as const;

const darkTheme = {
  ...sharedValues,
  colors: {
    ...primitiveColors,
    ground: "#000000",
    figure: "#ffffff",
    background: "#0d0d0d",
    text: "#f0f0f0",
    primary: "#ffffff",
    secondary: "#999999",
    border: "#2a2a2a",
  },
} as const;

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module "react-native-unistyles" {
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
