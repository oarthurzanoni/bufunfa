import { createContext, useEffect, useState } from "react";
import { dark } from "./dark";
import { light } from "./light";
import { Theme } from "./types";

interface ThemeContextData {
  theme: Theme;
  isLoadingTheme: boolean;
  changeTheme: (theme: Theme["name"]) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(dark);
  const [isLoadingTheme, setIsLoadingTheme] = useState<boolean>(true);

  function changeTheme(theme: Theme["name"]) {
    setTheme(theme === "dark" ? dark : light);
  }

  useEffect(() => {
    setIsLoadingTheme(false);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isLoadingTheme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
