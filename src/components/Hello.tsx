import { useNavigation } from "@react-navigation/native";
import { useTheme, useUser } from "hooks";
import { NativeModules, Text, TouchableOpacity, View } from "react-native";
import { i18n } from "translations";

export function Hello() {
  const { theme } = useTheme();
  const { name } = useUser();
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
              color: theme.colors.text[500],
              fontFamily: theme.fonts.medium,
              fontSize: theme.sizes.fonts.xl,
            },
          ]}
        >
          {i18n.t(name ? "hello" : "hello_stranger", { name })}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
