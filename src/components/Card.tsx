import { FONT_HEIGHT_PADDING } from "consts";
import { useTheme } from "hooks";
import { StyleSheet, Text, View } from "react-native";
import { currencyOptions, i18n } from "translations";
import { Icon } from "./Icon";

import { useMemo } from "react";
import type { ViewProps } from "react-native";
import { IconName } from "types";

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
            color: theme.colors["on-color"]["500"],
          },
        ]}
      >
        {i18n.t("wallet_balance")}
      </Text>
      <View style={[styles.icon]}>
        <Icon
          name="wallet"
          height={theme.sizes.icons.xl}
          width={theme.sizes.icons.xl}
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
            color: theme.colors["on-color"]["500"],
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
          backgroundColor: theme.colors.primary[500],
        },
        style,
      ]}
    >
      <Header />
      <Amount amount={amount} />
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
          : theme.colors.tertiary[400],
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
      <View>
        <Icon
          name={ICON[type]}
          height={theme.sizes.icons.xl}
          width={theme.sizes.icons.xl}
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
              color: theme.colors["on-color"]["500"],
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
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    width: 36,
  },
});
