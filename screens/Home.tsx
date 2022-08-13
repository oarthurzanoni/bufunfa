import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hook/useTheme";

export function HomeScreen() {
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
          <Text style={textStyle}>Bufunfa v2</Text>
          <Text style={textStyle}>{theme.name}</Text>
          <Button
            onPress={() =>
              changeTheme(theme.name === "dark" ? "light" : "dark")
            }
            title="Mudar o tema"
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
