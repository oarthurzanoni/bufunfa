import React from "react";

import {
  View,
  StyleSheet
} from "react-native";

import Wallet from "./Wallet";

export default function Status(): JSX.Element {
  return(
    <View style={styles.container}>
      <Wallet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,

    justifyContent: "center",
  }
});