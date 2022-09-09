import { Hello } from "components";
import { useTheme } from "hooks";
import { Fragment } from "react";
import { ScrollView } from "react-native";

import type { ScreenProps } from "./types";

type HomeScreenProps = ScreenProps<"Home">;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme } = useTheme();

  return (
    <Fragment>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.background[50] }}
      >
        <Hello />
      </ScrollView>
    </Fragment>
  );
}
