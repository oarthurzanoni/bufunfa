import React from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
} from "react-native";

export default function IncomeScreen(): JSX.Element {
  return(
    <SafeAreaView style={[ styles.container ]}>
      <Text>Add income form</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 45,
    paddingHorizontal: 20,

    backgroundColor: "#ffffff",
  }
});