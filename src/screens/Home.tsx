import React from "react";

import { StackScreenProps } from "@react-navigation/stack";

import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback
} from "react-native";

import { ProfileContext } from "../providers/Profile";

import { StackParamList } from "../types/Navigator";

import Icon from "../components/Icon";

import Wallet from "../assets/images/svgs/Wallet";

type Props = StackScreenProps<StackParamList, "Home">;

export default function HomeScreen({ navigation }: Props): JSX.Element {
  const { username } = React.useContext(ProfileContext);

  return(
    <View style={styles.container}>
      <View style={styles.greetingsContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Profile")}
        >
          <Text numberOfLines={1} style={styles.greetingsText}>Olá, { username ? username : "qual é o seu nome ?" }</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.walletCard}>
          <View style={styles.description}>
            <Text style={[ styles.text, styles.textDescription ]}>Saldo na sua carteira</Text>
            <Icon
              svg={Wallet}
              fill="#171717"
              height="40px"
              width="40px"
            />
          </View>
          <View>
            <Text numberOfLines={1} style={[ styles.text, styles.textAmount ]}>R$ 1.441,10</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ffffff",
  },

  statusContainer: {
    marginVertical: 10,
    marginHorizontal: 20,

    justifyContent: "center",
  },

  greetingsContainer: {
    height: 48,

    marginVertical: 45,
    marginHorizontal: 20,

    justifyContent: "center",
  },

  greetingsText: {
    fontFamily: "Poppins-Medium",
    fontSize: 24,

    textAlignVertical: "center",

    color: "#050505"
  },

  walletCard: {
    padding: 20,

    borderRadius: 8,
    
    backgroundColor: "#D1FBEA"
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