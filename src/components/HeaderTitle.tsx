import { useTheme } from "hooks";
import { Text } from "react-native";
import { i18n } from "translations";
import { FONT_HEIGHT_PADDING } from "../constants";

import type { Screens } from "navigation";

interface HeaderTitleProps {
  screen: Screens;
}

export function HeaderTitle({ screen }: HeaderTitleProps) {
  const { theme } = useTheme();

  const title: Partial<Record<Screens, string>> = {
    Settings: "settings",
  };

  return (
    <Text
      style={[
        {
          color: theme.colors.text[theme.name === "dark" ? 50 : 500],
          fontFamily: theme.fonts.regular,
          fontSize: theme.sizes.fonts.sm,
          paddingTop: FONT_HEIGHT_PADDING,
          marginTop: theme.sizes.spacing.lg,
        },
      ]}
      testID="headerTitle"
    >
      {i18n.t(title[screen] || "settings")}
    </Text>
  );
}
