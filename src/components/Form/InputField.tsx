import { useRef } from "react";

import { useTheme } from "hooks";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { FONT_HEIGHT_PADDING } from "../../constants";
import { IconName } from "../../types";
import { Icon } from "../Icon";

import type { UseControllerProps } from "react-hook-form";
import type { TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {
  icon?: IconName;
  defaultValue?: string;
  name: string;
  rules?: UseControllerProps["rules"];
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
  name,
  rules,
  ...props
}: InputFieldProps) {
  const { theme } = useTheme();
  const textFieldRef = useRef<TextInput | null>(null);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  function focusOnInput() {
    textFieldRef.current?.focus();
  }

  return (
    <View style={style}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? theme.colors.red["500"] : "transparent",
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
              error
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
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={textFieldRef}
              style={[
                styles.input,
                {
                  fontFamily: theme.fonts.regular,
                  fontSize: theme.sizes.fonts.sm,
                  paddingTop: FONT_HEIGHT_PADDING,
                  color:
                    theme.colors.text[theme.name === "dark" ? "50" : "500"],
                },
              ]}
              placeholder={placeholder}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              defaultValue={defaultValue}
              keyboardType={keyboardType}
              placeholderTextColor={
                error
                  ? theme.colors.red["500"]
                  : theme.colors.text[theme.name === "dark" ? "200" : "100"]
              }
              {...props}
            />
          )}
        />
      </View>
      {error ? (
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
          {error?.message}
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
