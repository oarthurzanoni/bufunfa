import { useTheme } from "hooks";
import { Fragment } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import type { ScreenProps } from "./types";

type SettingsScreenProps = ScreenProps<"Settings">;

export function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { theme } = useTheme();

  return (
    <Fragment>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor:
            theme.colors.background[theme.name === "dark" ? 500 : 50],
        }}
      >
        <View
          style={{
            paddingHorizontal: theme.sizes.spacing.md,
            marginTop: theme.sizes.spacing.xl * 2,
          }}
        ></View>
      </ScrollView>
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
