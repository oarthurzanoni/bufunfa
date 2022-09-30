import { useTheme } from "hooks";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, ScrollView, StyleSheet, View } from "react-native";
import { i18n } from "translations";
import { InputField } from "../components";

import type { SubmitHandler } from "react-hook-form";
import type { ScreenProps } from "./types";

type SettingsScreenProps = ScreenProps<"Settings">;

type FormData = {
  username: string;
};

export function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { theme } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    Alert.alert(JSON.stringify(data));
  };

  return (
    <Fragment>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor:
            theme.colors.background[theme.name === "dark" ? 500 : 50],
        }}
      >
        <View
          style={{
            paddingHorizontal: theme.sizes.spacing.md,
            marginTop: theme.sizes.spacing.xl * 2,
          }}
        >
          {/* REFACTOR: move Controller into InputField */}
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                icon="user"
                placeholder={i18n.t("hello_stranger")}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  marginBottom: 24,
                }}
                errors={errors.username}
              />
            )}
          />

          <Button title="Salvar nome" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    padding: "2rem",
    borderRadius: 16,
  },
});
