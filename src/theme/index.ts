import { BaseTheme, baseTheme } from "@/lib/theme/theme";

// App-specific theme extension that allows overriding default theme values
const appThemeExtension = {
  colors: {
    primary: "#000000",
    secondary: "#666666",
    background: "#ffffff",
    text: "#000000",
    border: "#e0e0e0",
    // Example: Override brand colors with custom blue theme
    // You can replace these with any colors (red, green, purple, etc.)
    brand: {
      100: "#e8f4fd", // lightest blue
      200: "#bee9fb",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9", // primary blue
      600: "#0284c7",
      700: "#0369a1", // darkest blue
    },
    // You can also override other base theme colors like:
    // red: { 100: "#custom", 200: "#custom", ... },
    // green: { 100: "#custom", 200: "#custom", ... },
    // gray: { 100: "#custom", 200: "#custom", ... },
  },
} as const;

export const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    ...appThemeExtension.colors,
  },
};

declare global {
  namespace Theme {
    interface AppTheme extends Omit<BaseTheme, "colors"> {
      colors: Omit<BaseTheme["colors"], "brand"> & {
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
