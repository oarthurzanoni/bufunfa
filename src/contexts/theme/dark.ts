import { Theme } from "./types";

export const dark: Theme = {
  name: "dark",
  statusBar: {
    style: "light",
  },
  fonts: {
    regular: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    bold: "Poppins_700Bold",
  },
  sizes: {
    icons: {
      xs: 14,
      sm: 16,
      md: 24,
      lg: 36,
      xl: 44,
    },
    fonts: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 22,
      xl: 26,
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    rounded: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
    },
  },
  colors: {
    primary: {
      "600": "#506055",
      "500": "#466A51",
      "400": "",
    },
    secondary: {
      "600": "#625A4C",
      "500": "#6C614B",
      "400": "",
    },
    tertiary: {
      "600": "#FCEDD2",
      "500": "#E2D5FE",
      "400": "#E8E3F3",
    },

    background: {
      "500": "#181818",
      "100": "",
      "50": "",
    },
    surface: {
      "500": "#252525",
      "100": "",
      "50": "",
    },
    "on-color": {
      "500": "",
      "400": "",
      "200": "#B9BBBE",
      "100": "#EEEEEE",
      "50": "#FFFFFF",
    },
    black: {
      "900": "#000000",
    },
    white: {
      "50": "#FFFFFF",
    },
    gray: {
      "700": "#222222",
      "600": "#444444",
      "500": "",
      "100": "#DDDDDD",
    },
    green: {
      "500": "#6ED28E",
    },
    red: {
      "500": "#DB6265",
    },
    text: {
      "500": "",
      "400": "",
      "300": "#65676A",
      "200": "#96989D",
      "100": "#EEEEEE",
      "50": "#FFFFFF",
    },
  },
};
