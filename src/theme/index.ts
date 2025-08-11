import { baseTheme } from "@/lib/theme/theme";
import { deepmerge } from "deepmerge-ts";
import { availableFontKeys } from "./fonts";

// App-specific theme extension that allows overriding default theme values
const customTheme = {
  typography: {
    fontFamily: {
      primary: availableFontKeys.SourceSans3_400Regular,
      ...availableFontKeys,
    },
  },
  colors: {
    primary: "#000000",
    secondary: "#666666",
    background: "#ffffff",
    text: "#000000",
    border: "#e0e0e0",
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
  },
} as const;

export const theme = deepmerge(baseTheme, customTheme);

type CustomAppTheme = typeof theme;

declare global {
  namespace Theme {
    interface AppTheme extends CustomAppTheme {}
  }
}
