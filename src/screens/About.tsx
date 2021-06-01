import React from "react";

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from "react-native";

import { StackScreenProps } from "@react-navigation/stack";

import { StackParamList } from "../types/Navigator";

import Icons8Svg from "../assets/images/svgs/Icons8Svg";
import MailSvg from "../assets/images/svgs/MailSvg";

type Props = StackScreenProps<StackParamList, "About">;

export default function AboutScreen({ navigation }: Props): JSX.Element {
  return(
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Créditos</Text>
        <View style={styles.items}>
          <View style={styles.card}>
            <View style={styles.image}>
              <Icons8Svg />
            </View>
            <Text style={styles.text}>Icons by Icons8</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Desenvolvedor</Text>
        <View style={styles.items}>
          <View style={styles.card}>
            <View style={styles.image}>
              <MailSvg />
            </View>
            <Text style={styles.text}>arthurflavio@protonmail.com</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 45,
    paddingHorizontal: 20,

    backgroundColor: "#ffffff",
  },

  image: {
    marginRight: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,

    color: "#050505",
  },

  items: {
    flexDirection: "column",
  },

  card: {
    height: 42,

    flexDirection: "row",

    marginTop: 10,
  },

  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,

    textAlignVertical: "center",

    color: "#050505",
  },
});