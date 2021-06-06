import React from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback
} from "react-native";

import Icon from "../components/Icon";

import Wallet from "../assets/images/svgs/Wallet";
import Bloom from "../assets/images/svgs/Bloom";

export default function WalletScreen(): JSX.Element {
  return(
    <View style={styles.container}>
      <View style={styles.paddingView} />
      <TouchableWithoutFeedback
        onPress={() => console.log("Button pressed!")}
      >
        <View style={styles.card}>
          <View style={styles.image}>
            <Icon
              fill="#050505"
              height="37px"
              width="37px"
              svg={Wallet}
            />
          </View>
          <View style={styles.description}>
            <Text style={[ styles.text ]}>Fechar o mês</Text>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={[
                  styles.text,
                  styles.textAmout
                ]}
              >R$ 1.441,10</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => console.log("Button pressed!")}
      >
        <View style={styles.card}>
          <View style={styles.image}>
            <Icon
              fill="#050505"
              height="37px"
              width="37px"
              svg={Bloom}
            />
          </View>
          <View style={styles.description}>
            <Text style={[ styles.text ]}>Limpar tudo</Text>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={[
                  styles.text,
                  styles.textAmout
                ]}
              >R$ 0,00</Text>
            </View>
          </View>
        </View>
      </ TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,

    backgroundColor: "#ffffff",
  },

  image: {
    marginRight: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    height: 42,

    flexDirection: "row",

    marginTop: 10,
    marginBottom: 24,
  },

  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,

    textAlignVertical: "center",

    color: "#050505",
  },

  textAmout: {
    flex: 1,

    textAlign: "right",

    color: "#70B657"
  },

  description: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  
  paddingView: {
    height: 45
  }
});