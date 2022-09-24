import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton, HeaderTitle } from "components";
import { StatusBar } from "expo-status-bar";
import { useTheme, useUser } from "hooks";
import { HomeScreen, SettingsScreen } from "navigation";
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
      <StatusBar
        style={theme.statusBar.style}
        backgroundColor={
          theme.colors.background[theme.name === "dark" ? 500 : 50]
        }
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animation: "fade_from_bottom",
            headerStyle: {
              backgroundColor:
                theme.colors.background[theme.name === "dark" ? 500 : 50],
            },
            headerShadowVisible: false,
            headerTitle: () => null,
            headerLeft: () => <HeaderBackButton />,
          }}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerRight: () => <HeaderTitle screen="Settings" />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
