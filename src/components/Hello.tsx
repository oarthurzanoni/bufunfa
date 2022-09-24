import { useNavigation } from "@react-navigation/native";
import { useTheme, useUser } from "hooks";
import { NativeModules, Text, TouchableOpacity, View } from "react-native";
import { i18n } from "translations";
import { FONT_HEIGHT_PADDING } from "../constants";

export function Hello() {
  const { theme } = useTheme();
  const { name } = useUser();
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <View
        style={[
          {
            marginTop:
              NativeModules.StatusBarManager.HEIGHT + theme.sizes.spacing.xl,
            marginHorizontal: theme.sizes.spacing.md,
          },
        ]}
      >
        <Text
          style={[
            {
              color: theme.colors.text[theme.name === "dark" ? 50 : 500],
              fontFamily: theme.fonts.medium,
              fontSize: theme.sizes.fonts.xl,
              paddingTop: FONT_HEIGHT_PADDING,
            },
          ]}
          testID="helloMessage"
        >
          {i18n.t(name ? "hello" : "hello_stranger", { name })}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
