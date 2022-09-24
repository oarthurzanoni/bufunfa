import { useNavigation } from "@react-navigation/native";
import { useTheme } from "hooks";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { i18n } from "translations";
import { FONT_HEIGHT_PADDING } from "../constants";
import { Icon } from "./Icon";

import type { TouchableOpacityProps } from "react-native";

const BACKGROUND_OPACITY = "30";

interface HeaderBackButtonProps extends TouchableOpacityProps {}

export function HeaderBackButton({ style, ...props }: HeaderBackButtonProps) {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      {...props}
      style={[style, { marginTop: theme.sizes.spacing.lg }]}
      onPress={() => navigation.goBack()}
      testID="headerBackButton"
    >
      <View
        style={[
          styles.button,
          {
            borderRadius: theme.sizes.rounded.lg,
            backgroundColor: `${
              theme.name === "dark" ? "#7984AD" : "#D3C7ED"
            }${BACKGROUND_OPACITY}`,
            padding: theme.sizes.spacing.sm,
          },
        ]}
      >
        <Icon
          name="arrow-back"
          fill={
            theme.name === "light"
              ? theme.colors["on-color"]["500"]
              : theme.colors["on-color"]["50"]
          }
          height={16}
          width={16}
          style={{ marginRight: theme.sizes.spacing.sm }}
        />
        <Text
          style={[
            {
              color: theme.colors.text[theme.name === "dark" ? 50 : 500],
              fontFamily: theme.fonts.regular,
              fontSize: theme.sizes.fonts.xs,
              paddingTop: FONT_HEIGHT_PADDING,
            },
          ]}
        >
          {i18n.t("back")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
});
