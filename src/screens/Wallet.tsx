import React from "react";

import {
  StyleSheet,
  View,
  Text
} from "react-native";

import { StackScreenProps } from "@react-navigation/stack";

import { StackParamList } from "../types/Navigator";

type Props = StackScreenProps<StackParamList, "Wallet">;

export default function WalletScreen({ navigation }: Props): JSX.Element {
  return(
    <View style={styles.container}>
      <Text>Wallet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,

    backgroundColor: "#ffffff",
  }
});