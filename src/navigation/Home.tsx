import { Card, Hello } from "components";
import { useTheme } from "hooks";
import { Fragment } from "react";
import { ScrollView, View } from "react-native";

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
        <View
          style={{
            paddingHorizontal: theme.sizes.spacing.md,
            marginTop: theme.sizes.spacing.xl * 2,
          }}
        >
          <Card amount={10000} />
        </View>
      </ScrollView>
    </Fragment>
  );
}
