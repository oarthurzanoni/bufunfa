import { createContext, useState } from "react";
import { dark } from "./dark";
import { light } from "./light";
import { Theme } from "./types";

interface ThemeContextData {
  theme: Theme;
  changeTheme: (theme: Theme["name"]) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(light);

  function changeTheme(theme: Theme["name"]) {
    setTheme(theme === "dark" ? dark : light);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
