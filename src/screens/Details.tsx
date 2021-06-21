import React from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

import Icon from "../components/Icon";

import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";

type Props = StackScreenProps<StackParamList, "Details">;

export default function DetailsScreen({ route, navigation }: Props): JSX.Element {
  // const { transaction } = route.params;

  // const {
  //   id,
  //   type,
  //   title,
  //   description,
  //   amount,
  //   createdAt,
  //   date,
  //   category
  // } = transaction;

  return(
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={[ styles.container ]}
    >
      <View style={styles.paddingView} />
      <Text style={[ styles.text ]}>Tela de detalhes</Text>
      <View style={styles.paddingView} />
    </ScrollView>
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

    marginBottom: 14,
  },

  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,

    textAlignVertical: "center",

    color: "#050505",
  },

  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },

  paddingView: {
    height: 45,
  },

  button: {
    width: "100%",

    backgroundColor: "#D1FBEA",

    height: 60,

    borderRadius: 4,

    justifyContent: "center",
    alignItems: "center",
  },
});