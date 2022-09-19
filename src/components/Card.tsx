import { FONT_HEIGHT_PADDING } from "consts";
import { useTheme } from "hooks";
import { StyleSheet, Text, View } from "react-native";
import { currencyOptions, i18n } from "translations";
import { Icon } from "./Icon";

import { useMemo } from "react";
import type { ViewProps } from "react-native";
import { IconName } from "types";

const CIRCLE = {
  size: 40,
  inlineTop: 0,
  inlineLeft: 5,
  top: -4,
  right: 0,
};

interface CircleProps {
  type?: CardInlineType;
}

function Circle({ type }: CircleProps) {
  const { theme } = useTheme();

  const BG_COLOR = useMemo<Record<CardInlineType & "balance", string>>(
    () => ({
      income:
        theme.name === "dark"
          ? theme.colors.secondary[500]
          : theme.colors.secondary[600],
      expense:
        theme.name === "dark"
          ? theme.colors.tertiary[500]
          : theme.colors.tertiary[500],
      balance: theme.colors.primary[500],
    }),
    [theme.name]
  );

  return (
    <View
      style={{
        height: CIRCLE.size,
        width: CIRCLE.size,
        borderRadius: CIRCLE.size / 2,
        top: CIRCLE[type ? "inlineTop" : "top"],
        left: CIRCLE[type ? "inlineLeft" : "right"],
        backgroundColor: BG_COLOR[(type as keyof typeof BG_COLOR) || "balance"],
        position: "absolute",
      }}
    />
  );
}

function Header() {
  const { theme } = useTheme();

  return (
    <View style={[styles.header]}>
      <Text
        style={[
          styles.label,
          {
            fontFamily: theme.fonts.regular,
            fontSize: theme.sizes.fonts.xs,
            color:
              theme.name === "dark"
                ? theme.colors.text[100]
                : theme.colors["on-color"][500],
          },
        ]}
      >
        {i18n.t("wallet_balance")}
      </Text>
      <View style={[styles.icon]}>
        <Circle />
        <Icon
          name="wallet"
          height={theme.sizes.icons.xl}
          width={theme.sizes.icons.xl}
          fill={
            theme.name === "dark"
              ? theme.colors["on-color"]["50"]
              : theme.colors["on-color"]["500"]
          }
        />
      </View>
    </View>
  );
}

interface AmountProps extends ViewProps {
  amount: number;
}

function Amount({ amount, style, ...props }: AmountProps) {
  const { theme } = useTheme();

  const last2Digits = String(amount).slice(-2);

  return (
    <View
      {...props}
      style={[
        styles.main,
        {
          marginTop: theme.sizes.spacing.md,
          height: theme.sizes.fonts.xl * 2,
        },
        style,
      ]}
    >
      <Text
        numberOfLines={1}
        style={[
          styles.amount,
          {
            fontFamily: theme.fonts.medium,
            fontSize: theme.sizes.fonts.xl,
            color:
              theme.name === "dark"
                ? theme.colors.text[100]
                : theme.colors["on-color"][500],
          },
        ]}
      >
        {currencyOptions[i18n.locale].unit}{" "}
        {i18n.numberToCurrency(amount / 100, {
          ...currencyOptions[i18n.locale],
          unit: "",
          precision: last2Digits === "00" ? 0 : 2,
        })}
      </Text>
    </View>
  );
}

interface CardProps extends ViewProps {
  amount: number;
}

export function Card({ amount, style, ...props }: CardProps) {
  const { theme } = useTheme();

  return (
    <View
      {...props}
      style={[
        styles.card,
        {
          borderRadius: theme.sizes.rounded.sm,
          padding: theme.sizes.rounded.md,
          backgroundColor:
            theme.name === "dark"
              ? theme.colors.surface[500]
              : theme.colors.primary[500],
        },
        style,
      ]}
    >
      <Header />
      <Amount amount={amount} style={{ marginBottom: -FONT_HEIGHT_PADDING }} />
    </View>
  );
}

type CardInlineType = "income" | "expense";

interface CardInlineProps extends ViewProps {
  amount: number;
  type: CardInlineType;
}

export function CardInline({ amount, type, style, ...props }: CardInlineProps) {
  const { theme } = useTheme();

  const CARD_BG_COLOR = useMemo<Record<CardInlineType, string>>(
    () => ({
      expense:
        theme.name === "dark"
          ? theme.colors.surface[500]
          : theme.colors.tertiary[500],
      income:
        theme.name === "dark"
          ? theme.colors.surface[500]
          : theme.colors.secondary[600],
    }),
    [theme.name]
  );

  const TITLE = useMemo<Record<CardInlineType, string>>(
    () => ({
      expense: i18n.t("expense"),
      income: i18n.t("income"),
    }),
    []
  );

  const ICON = useMemo<Record<CardInlineType, IconName>>(
    () => ({
      expense: "card-in-use",
      income: "money-box",
    }),
    []
  );

  return (
    <View
      {...props}
      style={[
        styles.cardInline,
        {
          borderRadius: theme.sizes.rounded.sm,
          padding: theme.sizes.rounded.md,
          backgroundColor: CARD_BG_COLOR[type],
        },
        style,
      ]}
    >
      <View style={{ position: "relative" }}>
        <Circle type={type} />
        <Icon
          name={ICON[type]}
          height={theme.sizes.icons.xl}
          width={theme.sizes.icons.xl}
          fill={
            theme.name === "dark"
              ? theme.colors["on-color"]["50"]
              : theme.colors["on-color"]["500"]
          }
        />
      </View>
      <View
        style={{
          marginLeft: theme.sizes.spacing.lg,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          style={[
            styles.label,
            {
              marginBottom: -FONT_HEIGHT_PADDING,
              fontFamily: theme.fonts.regular,
              fontSize: theme.sizes.fonts.xs,
              color:
                theme.name === "dark"
                  ? theme.colors.text[100]
                  : theme.colors["on-color"][500],
            },
          ]}
        >
          {TITLE[type]}
        </Text>
        <Amount
          amount={amount}
          style={{
            marginTop: 0,
            marginBottom: -FONT_HEIGHT_PADDING,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {},
  cardInline: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {},
  label: {
    paddingTop: FONT_HEIGHT_PADDING,
  },
  amount: {
    paddingTop: FONT_HEIGHT_PADDING,
  },
  icon: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    width: 36,
  },
});
