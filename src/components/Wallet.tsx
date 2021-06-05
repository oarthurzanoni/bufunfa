import React from "react";

import {
  View,
  Text,
  StyleSheet
} from "react-native";

import Icon from "./Icon";

import WalletSvg from "../assets/images/svgs/Wallet";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Wallet(): JSX.Element {
  const [ modalVisible, setModalVisible ] = React.useState<boolean>(false);

  return(
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.description}>
          <Text style={[ styles.text, styles.textDescription ]}>Saldo na sua carteira</Text>
          <Icon
            svg={WalletSvg}
            fill="#171717"
            height="40px"
            width="40px"
          />
        </View>
        <View>
          <Text numberOfLines={1} style={[ styles.text, styles.textAmount ]}>R$ 1.441,10</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D1FBEA",

    padding: 20,

    borderRadius: 8,

    marginBottom: 14,
  },

  description: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
    marginBottom: 21,
  },

  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,

    textAlignVertical: "center",

    color: "#171717",
  },

  textAmount: {
    fontFamily: "Poppins-Medium",
    fontSize: 24,
  },

  textDescription: {
    fontSize: 14,

    color: "#161618"
  }
});