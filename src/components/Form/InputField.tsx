import { useRef } from "react";

import { useTheme } from "hooks";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { FONT_HEIGHT_PADDING } from "../../constants";
import { IconName } from "../../types";
import { Icon } from "../Icon";

import { FieldError } from "react-hook-form";
import type { TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {
  icon?: IconName;
  defaultValue?: string;
  errors: FieldError | undefined;
}

export function InputField({
  placeholder,
  keyboardType,
  style,
  icon,
  defaultValue = "",
  onBlur,
  onChangeText,
  value,
  errors,
  ...props
}: InputFieldProps) {
  const { theme } = useTheme();
  const textFieldRef = useRef<TextInput | null>(null);

  function focusOnInput() {
    textFieldRef.current?.focus();
  }

  return (
    <View style={style}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: errors ? theme.colors.red["500"] : "transparent",
            borderRadius: theme.sizes.rounded.xs,
            paddingVertical: theme.sizes.spacing.sm,
          },
        ]}
      >
        {icon ? (
          <Icon
            onPress={focusOnInput}
            name={icon}
            height={theme.sizes.icons.lg}
            width={theme.sizes.icons.lg}
            fill={
              errors
                ? theme.colors.red["500"]
                : theme.colors["on-color"][
                    theme.name === "dark" ? "200" : "500"
                  ]
            }
            style={{
              marginRight: theme.sizes.spacing.lg,
            }}
          />
        ) : null}
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
          ]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          keyboardType={keyboardType}
          placeholderTextColor={
            errors
              ? theme.colors.red["500"]
              : theme.colors.text[theme.name === "dark" ? "200" : "100"]
          }
          {...props}
        />
      </View>
      {errors ? (
        <Text
          style={[
            styles.error,
            {
              color: theme.colors.red["500"],
              fontFamily: theme.fonts.regular,
              fontSize: theme.sizes.fonts.xs,
              marginTop: theme.sizes.spacing.xs,
            },
          ]}
        >
          {errors?.message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  input: {
    flex: 1,
  },
  error: {
    paddingTop: FONT_HEIGHT_PADDING,
  },
});
