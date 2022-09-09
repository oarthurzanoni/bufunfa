import { Theme } from "./types";

export const light: Theme = {
  name: "light",
  statusBar: {
    style: "dark",
  },
  fonts: {
    regular: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    bold: "Poppins_700Bold",
  },
  sizes: {
    fonts: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
  },
  colors: {
    primary: {
      "600": "",
      "500": "#D1FBEA",
      "400": "#E1FFF3",
    },
    secondary: {
      "600": "",
      "500": "",
      "400": "#F6EEE0",
    },
    tertiary: {
      "600": "#FCEDD2",
      "500": "#E2D5FE",
      "400": "#E8E3F3",
    },

    background: {
      "500": "",
      "100": "#DDDDDD",
      "50": "#FFFFFF",
    },
    surface: {
      "500": "",
      "100": "#D2D2D2",
      "50": "#F2F2F2",
    },
    "on-color": {
      "500": "#050505",
      "400": "#0E0E0E",
      "200": "",
      "100": "",
      "50": "",
    },
    black: {
      "900": "#000000",
    },
    white: {
      "50": "#FFFFFF",
    },
    gray: {
      "700": "#666666",
      "600": "#808080",
      "500": "#BBBBBB",
      "100": "",
    },
    green: {
      "500": "#70B657",
    },
    red: {
      "500": "#D17777",
    },
    text: {
      "500": "#050505",
      "400": "#0E0E0E",
      "300": "",
      "200": "",
      "100": "#444444",
      "50": "",
    },
  },
};
