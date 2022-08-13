import { ThemeContext } from "contexts/theme";
import { useContext } from "react";

export const useTheme = () => useContext(ThemeContext);
