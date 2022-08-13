import { ThemeProvider } from "contexts";
import { Main } from "./src";

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}
