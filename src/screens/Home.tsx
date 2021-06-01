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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ffffff",
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
});