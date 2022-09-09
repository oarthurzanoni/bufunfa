import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useTheme, useUser } from "hooks";
import { HomeScreen, ProfileScreen } from "navigation";
import "./translations/i18n";

import type { RootStackParamList } from "navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Main() {
  const { isLoadingUser } = useUser();
  const { theme, isLoadingTheme } = useTheme();

  const isAppLoading = isLoadingTheme || isLoadingUser;

  if (isAppLoading) {
    return null;
  }

  return (
    <>
      <StatusBar translucent={true} style={theme.statusBar.style} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animation: "fade_from_bottom",
          }}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
