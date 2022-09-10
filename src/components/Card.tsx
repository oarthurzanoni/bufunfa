import { useTheme } from "hooks";
import { StyleSheet, Text, View } from "react-native";
import { currencyOptions, i18n } from "translations";
import { Icon } from "./Icon";

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

interface AmountProps {
  amount: number;
}

function Amount({ amount }: AmountProps) {
  const { theme } = useTheme();

  const last2Digits = String(amount).slice(-2);

  return (
    <View
      style={[
        styles.main,
        {
          marginTop: theme.sizes.spacing.md,
          height: theme.sizes.fonts.xl * 2,
        },
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

interface CardProps {
  amount: number;
}

export function Card({ amount }: CardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          borderRadius: theme.sizes.rounded.sm,
          padding: theme.sizes.rounded.md,
          backgroundColor: theme.colors.primary[500],
        },
      ]}
    >
      <Header />
      <Amount amount={amount} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {},
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {},
  label: {
    paddingTop: 5,
  },
  amount: {
    paddingTop: 5,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    width: 36,
  },
});
