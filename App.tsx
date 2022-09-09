import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { ComposeProviders, ThemeProvider, UserProvider } from "contexts";
import { Main } from "./src/index";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ComposeProviders with={[ThemeProvider, UserProvider]}>
      <Main />
    </ComposeProviders>
  );
}
