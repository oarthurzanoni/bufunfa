import { ThemeProvider } from "contexts";
import { Main } from "./src/index";

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}
