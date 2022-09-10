export type Theme = {
  name: "dark" | "light";
  statusBar: {
    style: "dark" | "light";
  };
  fonts: {
    regular: string;
    medium: string;
    bold: string;
  };
  sizes: {
    icons: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    fonts: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    rounded: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
    };
  };
  colors: {
    primary: {
      "600": string;
      "500": string;
      "400": string;
    };
    secondary: {
      "600": string;
      "500": string;
      "400": string;
    };
    tertiary: {
      "600": string;
      "500": string;
      "400": string;
    };

    background: {
      "500": string;
      "100": string;
      "50": string;
    };
    surface: {
      "500": string;
      "100": string;
      "50": string;
    };
    "on-color": {
      "500": string;
      "400": string;
      "200": string;
      "100": string;
      "50": string;
    };
    text: {
      "500": string;
      "400": string;
      "300": string;
      "200": string;
      "100": string;
      "50": string;
    };
    green: {
      "500": string;
    };
    red: {
      "500": string;
    };
    gray: {
      "700": string;
      "600": string;
      "500": string;
      "100": string;
    };
    black: {
      "900": string;
    };
    white: {
      "50": string;
    };
  };
};
