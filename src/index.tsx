import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, ProfileScreen } from "./screens";

import type { RootStackParamList } from "./screens/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
