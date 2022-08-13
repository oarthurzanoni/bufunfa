export type Theme = {
  name: "dark" | "light";
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;

    background: string;
    surface: string;
  };
};
