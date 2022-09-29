import { useTheme } from "hooks";
import { StyleSheet, TextInput, View } from "react-native";
import { FONT_HEIGHT_PADDING } from "../../constants";
import { Icon } from "../Icon";

import { useRef } from "react";
import type { TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {}

export function InputField({
  placeholder,
  onChangeText,
  value,
  keyboardType,
  style,
}: InputFieldProps) {
  const { theme } = useTheme();
  const textFieldRef = useRef<TextInput | null>(null);

  function focusOnInput() {
    textFieldRef.current?.focus();
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <Icon
          onPress={focusOnInput}
          name="wallet"
          height={theme.sizes.icons.lg}
          width={theme.sizes.icons.lg}
          fill={theme.colors["on-color"][theme.name === "dark" ? "200" : "500"]}
          style={{
            marginRight: theme.sizes.spacing.lg,
          }}
        />
        <TextInput
          ref={textFieldRef}
          style={[
            styles.input,
            {
              fontFamily: theme.fonts.regular,
              fontSize: theme.sizes.fonts.sm,
              paddingTop: FONT_HEIGHT_PADDING,
              color: theme.colors.text[theme.name === "dark" ? "50" : "500"],
            },
            style,
          ]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          placeholderTextColor={
            theme.colors.text[theme.name === "dark" ? "200" : "100"]
          }
        />
      </View>
      {/* Errors */}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flexGrow: 1,
  },
});
