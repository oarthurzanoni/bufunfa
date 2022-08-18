import { StatusBar } from "expo-status-bar";
import { useTheme } from "hooks";
import { Fragment } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import type { ScreenProps } from "./types";

type HomeScreenProps = ScreenProps<"Home">;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme, changeTheme } = useTheme();

  const textStyle = {
    color: theme.name === "light" ? "#050505" : "#f5f5f5",
  };

  return (
    <Fragment>
      <StatusBar
        translucent={true}
        style={theme.name === "dark" ? "light" : "dark"}
      />
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View
          style={[
            {
              backgroundColor: theme.colors.background,
              padding: 16,
              borderRadius: 16,
              minHeight: 244,
              minWidth: 216,
            },
          ]}
        >
          <Text style={[textStyle, { fontFamily: "Poppins_400Regular" }]}>
            Bufunfa v2
          </Text>
          <Text style={textStyle}>{theme.name}</Text>
          <Button
            onPress={() =>
              changeTheme(theme.name === "dark" ? "light" : "dark")
            }
            title="Mudar o tema"
          />
          <Button
            onPress={() => navigation.navigate("Profile")}
            title="Profile"
          />
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    padding: "2rem",
    borderRadius: 16,
  },
});
