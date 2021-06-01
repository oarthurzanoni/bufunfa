import React from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import Profile from "../components/Profile";

export default function HomeScreen(): JSX.Element {
  return(
    <View style={styles.container}>
      <Profile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ffffff",
  },
});