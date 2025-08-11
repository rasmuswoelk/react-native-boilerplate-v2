import { BaseTheme, baseTheme } from "@/lib/theme/theme";

const appThemeExtension = {
  colors: {
    primary: "#000000",
    secondary: "#666666",
    background: "#ffffff",
    text: "#000000",
    border: "#e0e0e0",
    brand: {
      100: "#f0f0f0",
      200: "#e0e0e0",
      300: "#d0d0d0",
      400: "#b0b0b0",
      500: "#808080",
      600: "#606060",
      700: "#404040",
    },
  },
};

export const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    ...appThemeExtension.colors,
  },
};

declare global {
  namespace Theme {
    interface AppTheme extends BaseTheme {
      colors: BaseTheme["colors"] & {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        border: string;
        brand: {
          100: string;
          200: string;
          300: string;
          400: string;
          500: string;
          600: string;
          700: string;
        };
      };
    }
  }
}
