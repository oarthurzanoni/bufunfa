import React from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import Clipboard from "expo-clipboard";

let feedbackTimeout: NodeJS.Timeout;

export default function DonateScreen(): JSX.Element {
  const [ copied, setCopied ] = React.useState<boolean>(false);

  function copiedFeedback(): void {
    setCopied(true);

    feedbackTimeout = setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  function copyToClipboard(): void {
    Clipboard.setString("445e5708-c93c-4caa-9041-6a991aa918c8");

    copiedFeedback();
  }

  React.useEffect(() => {
    return () => clearTimeout(feedbackTimeout);
  }, []);

  return(
    <ScrollView style={styles.container}>
      <View style={styles.paddingView} />
      <Text style={styles.titleText}>Retribuir</Text>
      <Text style={[ styles.text, { marginTop: 30 } ]}>
        Este é um aplicativo gratuito e de código aberto. Está sob a licença MIT e o código-fonte encontra-se neste repositório no GitHub: github.com/Mitacho/bufunfa.
      </Text>
      <Text style={[ styles.text, { marginTop: 30 } ]}>
        Se de alguma forma este app já te ajudou, eu peço que, se possível, faça uma retribuição doando qualquer valor para a chave Pix abaixo.
      </Text>
      <Text style={[ styles.text, { marginTop: 30 } ]}>
        Me ajude a realizar o sonho de ter este notebook, o Samsung Galaxy Book S:
      </Text>
      <View
        style={[
          {
            marginVertical: 40,
          },
        ]}
      >
        <Image
          source={require("../assets/images/png/book-s.png")}
          style={[
            {
              flex: 1,

              height: 300,
              width: "90%",

              resizeMode: "contain",
            },
          ]}
        />
      </View>
      <Text style={[ styles.text, { marginTop: 30 } ]}>
        Desde já lhe agradeço por isso! :D
      </Text>
      <Text style={[ styles.text, { marginTop: 30 } ]}>
        Chave Pix aleatória:
      </Text>
      <Text style={[ styles.text, { marginTop: 30, fontFamily: "Poppins-Medium" } ]}>
        445e5708-c93c-4caa-9041-6a991aa918c8
      </Text>
      <TouchableOpacity
        style={{ marginTop: 60 }}
        onPress={() => {
          copied
          ? {}
          : copyToClipboard()
        }}
      >
        <View style={[ styles.button, copied ? { backgroundColor: "#CFF4CF" } : { backgroundColor: "#E2D5FE" } ]}>
          <Text style={[ styles.text, { color: "#171717"} ]}>{copied ? "Chave Pix copiada !" : "Copiar chave Pix" }</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.paddingView} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,

    backgroundColor: "#ffffff",
  },

  titleText: {
    fontFamily: "Poppins-Medium",
    fontSize: 24,

    textAlignVertical: "center",

    color: "#050505"
  },

  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,

    textAlignVertical: "center",

    color: "#050505"
  },
  
  button: {
    width: "100%",

    height: 60,

    borderRadius: 4,

    justifyContent: "center",
    alignItems: "center",
  },

  paddingView: {
    height: 45
  }
});