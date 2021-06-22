import React from "react";

import {
  StyleSheet,
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";

import Icon from "../components/Icon";

import Wallet from "../assets/images/svgs/Wallet";
import Bloom from "../assets/images/svgs/Bloom";
import VerifiedScroll from "../assets/images/svgs/VerifiedScroll";

import { TransactionsContext } from "../providers/Transactions";

import formatCurrency from "../utils/formatCurrency";

export default function WalletScreen(): JSX.Element {
  const { walletAmount, storeWalletSavings } = React.useContext(TransactionsContext);

  const [ modalSaveWalletVisible, setModalSaveWalletVisible ] = React.useState<boolean>(false);
  const [ modalClearAllVisible, setModalClearAllVisible ] = React.useState<boolean>(false);

  return(
    <View style={styles.container}>
      <View style={styles.paddingView} />
      <TouchableWithoutFeedback
        onPress={() => setModalSaveWalletVisible(true)}
      >
        <View style={styles.card}>
          <View style={styles.image}>
            <Icon
              fill="#050505"
              height="37px"
              width="37px"
              svg={Wallet}
            />
          </View>
          <View style={styles.description}>
            <Text style={[ styles.text ]}>Fechar o mês</Text>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={[
                  styles.text,
                  styles.textAmout
                ]}
              >{formatCurrency(walletAmount)}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => setModalClearAllVisible(true)}
      >
        <View style={styles.card}>
          <View style={styles.image}>
            <Icon
              fill="#050505"
              height="37px"
              width="37px"
              svg={Bloom}
            />
          </View>
          <View style={styles.description}>
            <Text style={[ styles.text ]}>Limpar tudo</Text>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={[
                  styles.text,
                  styles.textAmout
                ]}
              >R$ 0,00</Text>
            </View>
          </View>
        </View>
      </ TouchableWithoutFeedback>
      <Modal
        animationType="slide"
        visible={modalSaveWalletVisible}
        onRequestClose={() => setModalSaveWalletVisible(false)}
      >
        <SafeAreaView style={[ styles.container, { justifyContent: "space-between" } ]}>
          <Text style={[ styles.text, { textAlign: "justify", marginTop: 45 } ]}>
            Isso fará com que todas as suas entradas, saídas, contas a receber e dívidas que foram registradas nas datas anteriores a hoje sejam excluídas mas o saldo na sua carteira se manterá o mesmo.
          </Text>
          <TouchableOpacity
            onPress={() => {
              storeWalletSavings();
              setModalSaveWalletVisible(false);
            }}
          >
            <View style={[ styles.button, { backgroundColor: "#CFF4CF", marginBottom: 45 } ]}>
              <Text style={[ styles.text, { color: "#171717" } ]}>Fechar o mês</Text>
              <View style={[ styles.image, { marginLeft: 20, marginRight: 0 } ]}>
                <Icon
                  fill="#171717"
                  height="37px"
                  width="37px"
                  svg={VerifiedScroll}
                />
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <Modal
        animationType="slide"
        visible={modalClearAllVisible}
        onRequestClose={() => setModalClearAllVisible(false)}
      >
        <SafeAreaView style={[ styles.container, { justifyContent: "space-between" } ]}>
          <Text style={[ styles.text, { textAlign: "justify", marginTop: 45 } ]}>
            Excluí todas as suas entradas, saídas, contas a receber e dívidas, começando do zero.
          </Text>
          <TouchableOpacity
            onPress={() => { setModalClearAllVisible(false); }}
          >
            <View style={[ styles.button, { backgroundColor: "#E2D5FE", marginBottom: 45 } ]}>
              <Text style={[ styles.text, { color: "#171717" } ]}>Limpar tudo</Text>
              <View style={[ styles.image, { marginLeft: 20, marginRight: 0 } ]}>
                <Icon
                  fill="#171717"
                  height="37px"
                  width="37px"
                  svg={Bloom}
                />
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </View>
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

    marginTop: 10,
    marginBottom: 24,
  },

  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,

    textAlignVertical: "center",

    color: "#050505",
  },

  textAmout: {
    flex: 1,

    textAlign: "right",

    color: "#70B657"
  },

  description: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  
  paddingView: {
    height: 45
  },

  button: {
    width: "100%",

    height: 60,

    borderRadius: 4,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});