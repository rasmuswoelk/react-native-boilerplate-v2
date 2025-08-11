import { BaseTheme, baseTheme } from "@/lib/theme/theme";

// App-specific theme extension that allows overriding default theme values
const customTheme = {
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
      800: "#004d7a",
      900: "#002f44",
    },
    // You can also override other base theme colors like:
    // red: { 100: "#custom", 200: "#custom", ... },
    // green: { 100: "#custom", 200: "#custom", ... },
    // gray: { 100: "#custom", 200: "#custom", ... },
  },
} as const;

type CustomTheme = typeof customTheme;

export const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    ...customTheme.colors,
  },
};

declare global {
  namespace Theme {
    interface AppTheme extends Omit<BaseTheme, "colors"> {
      colors: Omit<BaseTheme["colors"], "brand"> & CustomTheme["colors"];
    }
  }
}
