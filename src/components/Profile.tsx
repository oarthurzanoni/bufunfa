import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
  ScrollView
} from "react-native";

import ProfileSvg from "../assets/images/svgs/ProfileSvg";
import OnlineStoreSvg from "../assets/images/svgs/OnlineStoreSvg";
import CarSvg from "../assets/images/svgs/CarSvg";
import TShirtSvg from "../assets/images/svgs/TShirtSvg";

export default function Profile(): JSX.Element {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const modalFadeAnim = React.useRef(new Animated.Value(0)).current;

  const [ isActive, updateIsActive ] = React.useState<boolean>(false);

  const [ username, setUsername ] = React.useState<string>("");

  function handleUsername(username: string): void {
    setUsername(username);
  }

  function openModal(): void {
    updateIsActive(true);

    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }
    ).start();

    Animated.timing(
      modalFadeAnim,
      {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }
    ).start();
  }

  function closeModal(): void {
    Animated.timing(
      modalFadeAnim,
      {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }
    ).start();

    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }
    ).start();

    setTimeout(() => {
      updateIsActive(false);
    }, 100);
  }

  return(
    <>
      { isActive &&
        <>
          <TouchableWithoutFeedback
            onPress={() => closeModal()}
          >
            <Animated.View style={[ styles.overlay, { opacity: fadeAnim } ]} />
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.modal, { opacity: modalFadeAnim }]}>
            <ScrollView>
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
                  <View style={styles.expenseContainer}>
                    <View style={styles.image}>
                      <OnlineStoreSvg />
                    </View>
                    <Text style={styles.text}>Mercados</Text>
                  </View>
                  <View style={styles.expenseContainer}>
                    <View style={styles.image}>
                      <CarSvg />
                    </View>
                    <Text style={styles.text}>Veículos</Text>
                  </View>
                  <View style={styles.expenseContainer}>
                    <View style={styles.image}>
                      <TShirtSvg />
                    </View>
                    <Text style={styles.text}>Roupas</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </>
      }

      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => openModal()}
        >
          <Text numberOfLines={1} style={styles.greetingsText}>Olá, { username ? username : "qual é o seu nome ?" }</Text>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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

  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    height: "100%",
    width: "100%",

    position: "absolute",

    zIndex: 1,

    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },

  modal: {
    width: "90%",
    maxWidth: 400,

    justifyContent: "center",

    paddingVertical: 25,
    paddingHorizontal: 35,

    position: "absolute",
    
    alignSelf: "center",
    
    top: "25%",
    bottom: "25%",

    zIndex: 2,

    borderRadius: 4,

    backgroundColor: "#ffffff",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.50,
    shadowRadius: 3.84,

    elevation: 5,
  },

  username: {
    height: 40,

    flexDirection: "row",

    marginBottom: 30,
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
  },

  spendingText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,

    color: "#050505",
  },

  biggestSpendingsContainer: {
    flexDirection: "column",
  },

  expenseContainer: {
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