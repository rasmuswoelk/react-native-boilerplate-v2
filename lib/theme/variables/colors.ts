export const colors = {
  ground: "#fff",
  figure: "#000",
  white: "#fff",
  black: "#000",
  brand: {
    100: "#f5f5f5",
    200: "#e0e0e0",
    300: "#bdbdbd",
    400: "#9e9e9e",
    500: "#757575",
    600: "#616161",
    700: "#424242",
  },
  red: {
    100: "#ffe3e3",
    200: "#ffb3b3",
    300: "#ff8383",
    400: "#ff5353",
    500: "#ff2323",
    600: "#e61e1e",
    700: "#cc1a1a",
  },
  green: {
    100: "#e3ffe3",
    200: "#b3ffb3",
    300: "#83ff83",
    400: "#53ff53",
    500: "#23ff23",
    600: "#1ecc1e",
    700: "#1acc1a",
  },
  gray: {
    100: "#f5f5f5",
    200: "#e0e0e0",
    300: "#bdbdbd",
    400: "#9e9e9e",
    500: "#757575",
    600: "#616161",
    700: "#424242",
  },
} as const;

export type ColorsType = typeof colors;
