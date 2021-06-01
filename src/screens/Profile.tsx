import React from "react";

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";

import { ProfileContext } from "../providers/Profile";

import ProfileSvg from "../assets/images/svgs/ProfileSvg";
import OnlineStoreSvg from "../assets/images/svgs/OnlineStoreSvg";
import CarSvg from "../assets/images/svgs/CarSvg";
import TShirtSvg from "../assets/images/svgs/TShirtSvg";
import AboutSvg from "../assets/images/svgs/AboutSvg";

import { StackScreenProps } from "@react-navigation/stack";

import { StackParamList } from "../types/Navigator";
import MercadoPagoSvg from "../assets/images/svgs/MercadoPagoSvg";

type Props = StackScreenProps<StackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props): JSX.Element {
  const { handleUsername, username } = React.useContext(ProfileContext);

  return(
    <ScrollView style={styles.container}>
      <View style={styles.username}>
        <View style={styles.image}>
          <ProfileSvg />
        </View>
        <TextInput
          style={styles.name}
          onChangeText={text => handleUsername(text)}
          value={username}
          placeholder="Primeiro nome ..."
        />
      </View>
      <View style={styles.spendingContainer}>
        <Text style={styles.spendingText}>Seus maiores gastos</Text>
        <View style={styles.biggestSpendingsContainer}>
          <View style={styles.card}>
            <View style={styles.image}>
              <OnlineStoreSvg />
            </View>
            <Text style={styles.text}>Mercados</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.image}>
              <CarSvg />
            </View>
            <Text style={styles.text}>Veículos</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.image}>
              <TShirtSvg />
            </View>
            <Text style={styles.text}>Roupas</Text>
          </View>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("About")}
      >
        <View style={[ styles.card, { marginBottom: 30 } ]}>
          <View style={styles.image}>
            <MercadoPagoSvg />
          </View>
          <Text style={[styles.text, { color: "#28316B" }]}>Agora </Text>
          <Text style={[styles.text, { color: "#51B4E9" }]}>vai!</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("About")}
      >
        <View style={styles.card}>
          <View style={styles.image}>
            <AboutSvg />
          </View>
          <Text style={styles.text}>Sobre</Text>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 45,
    paddingHorizontal: 20,

    backgroundColor: "#ffffff",
  },

  username: {
    height: 40,

    flexDirection: "row",
  },

  image: {
    marginRight: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    flex: 1,

    fontFamily: "Poppins-Regular",
    fontSize: 18,

    textAlignVertical: "center",

    color: "#050505",
  },

  spendingContainer: {
    marginVertical: 30,
  },

  spendingText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,

    color: "#050505",
  },

  biggestSpendingsContainer: {
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