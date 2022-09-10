import { NavigationContainer } from "@react-navigation/native";
import React, { ComponentType } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

interface MockedNavigatorProps {
  component: ComponentType<any>;
  params?: any;
  name: keyof RootStackParamList;
}

export function MockedNavigator({
  name,
  component,
  params = {},
}: MockedNavigatorProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={name}
          component={component}
          initialParams={params}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
