import React from "react";

import {
  View,
  Text,
  StyleSheet
} from "react-native";

import Icon from "./Icon";

import WalletSvg from "../assets/images/svgs/Wallet";

export default function Wallet(): JSX.Element {
  return(
    <View style={styles.container}>
      <View style={styles.description}>
        <Text>Saldo na sua carteira</Text>
        <Icon
          svg={WalletSvg}
          fill="#050505"
          height="37px"
          width="37px"
        />
      </View>
      <View>
        <Text>R$ 1.441,10</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D1FBEA",

    padding: 20,

    borderRadius: 8,
  },

  description: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  text: {

  }
});