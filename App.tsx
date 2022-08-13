import { ThemeProvider } from "./context/theme";
import { HomeScreen } from "./screens/Home";

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}
