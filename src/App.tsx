import React from "react";
import {
  StatusBar
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import HomeScreen from "./screens/Home";

const Stack = createStackNavigator();

export default function App(): JSX.Element {
  const [ fontsLoaded ] = useFonts({
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
    return(
      <NavigationContainer>
        <StatusBar
            barStyle="light-content"
            backgroundColor="black"
        />
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}