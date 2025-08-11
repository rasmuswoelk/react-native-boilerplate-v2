import { BaseTheme } from "./theme";

// Global theme type that will be augmented by the app
declare global {
  namespace Theme {
    interface AppTheme extends BaseTheme {}
  }
}
