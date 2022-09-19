import { Card, CardInline, Hello } from "components";
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
        style={{
          flex: 1,
          backgroundColor:
            theme.colors.background[theme.name === "dark" ? 500 : 50],
        }}
      >
        <Hello />
        <View
          style={{
            paddingHorizontal: theme.sizes.spacing.md,
            marginTop: theme.sizes.spacing.xl * 2,
          }}
        >
          <Card
            amount={10000}
            style={{ marginBottom: theme.sizes.spacing.sm }}
          />
          <CardInline
            type="income"
            amount={10300}
            style={{ marginBottom: theme.sizes.spacing.sm }}
          />
          <CardInline type="expense" amount={300} />
        </View>
      </ScrollView>
    </Fragment>
  );
}
