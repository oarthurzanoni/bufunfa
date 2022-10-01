import { useTheme } from "hooks";
import { Text } from "react-native";

import type { TextProps } from "react-native";

interface LabelProps extends TextProps {
  title: string;
}

export function Label({ title, style, ...props }: LabelProps) {
  const { theme } = useTheme();

  return (
    <Text
      style={[
        {
          fontFamily: theme.fonts.medium,
          fontSize: theme.sizes.fonts.xs,
          color: theme.colors.text[theme.name === "dark" ? "50" : "500"],
        },
        style,
      ]}
      {...props}
    >
      {title}
    </Text>
  );
}
