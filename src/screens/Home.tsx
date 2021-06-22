import React from "react";

import { StackScreenProps } from "@react-navigation/stack";

import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import { ProfileContext } from "../providers/Profile";

import { StackParamList } from "../types/Navigator";

import Icon from "../components/Icon";

import Wallet from "../assets/images/svgs/Wallet";
import MoneyBox from "../assets/images/svgs/MoneyBox";
import CardPayment from "../assets/images/svgs/CardPayment";
import ReceivDollar from "../assets/images/svgs/ReceivDollar";
import Donate from "../assets/images/svgs/Donate";
import UpRight from "../assets/images/svgs/UpRight";

import formatCurrency from "../utils/formatCurrency";

import { TransactionsContext } from "../providers/Transactions";

type Props = StackScreenProps<StackParamList, "Home">;

export default function HomeScreen({ navigation }: Props): JSX.Element {
  const {
    walletAmount,
    incomesAmount,
    expensesAmount,
    receiveAmount,
    debtsAmount,
    recentTransactions,
    receiveAndDebts,
    receiveSoon,
    paySoon,
    notPaid,
    notReceived,
    RecentTransactions,
    ReceiveAndDebts,
    ReceiveSoon,
    PaySoon,
    NotPaid,
    NotReceived,
  } = React.useContext(TransactionsContext);

  const { username } = React.useContext(ProfileContext);

  return(
    <ScrollView style={styles.container}>
      <View style={styles.greetingsContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Profile")}
        >
          <Text numberOfLines={1} style={styles.greetingsText}>Olá, { username ? username : "qual é o seu nome ?" }</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.statusContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Wallet")}
        >
          <View
            style={[
              styles.walletCard,
              {
                backgroundColor: "#D1FBEA"
              }
            ]}
          >
            <View style={styles.description}>
              <Text style={[ styles.text, styles.textDescription ]}>Saldo na sua carteira</Text>
              <Icon
                svg={Wallet}
                fill="#171717"
                height="40px"
                width="40px"
              />
            </View>
            <View>
              <Text numberOfLines={1} style={[ styles.text, styles.textAmount ]}>
                {formatCurrency(walletAmount)}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Transaction", {
            defaultTransaction: "Entrada"
          })}
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor: "#FCEDD2"
              }
            ]}
          >
            <View style={[ { marginRight: 20 } ]}>
              <Icon
                svg={MoneyBox}
                fill="#171717"
                height="37px"
                width="37px"
              />
            </View>
            <View style={[
              {
                flex: 1,

                flexDirection: "column",
                justifyContent: "space-between",
              }
            ]}>
              <Text style={[ styles.text, styles.textDescription ]}>Entradas</Text>
              <Text numberOfLines={1} style={[
                styles.text,
                styles.textAmount,
                {
                  fontSize: 20
                }
              ]}>{formatCurrency(incomesAmount)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Transaction", {
            defaultTransaction: "Saída"
          })}
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor: "#E2D5FE"
              }
            ]}
          >
            <View style={[ { marginRight: 20 } ]}>
              <Icon
                svg={CardPayment}
                fill="#171717"
                height="37px"
                width="37px"
              />
            </View>
            <View style={[
              {
                flex: 1,

                flexDirection: "column",
                justifyContent: "space-between",
              }
            ]}>
              <Text style={[ styles.text, styles.textDescription ]}>Saídas</Text>
              <Text numberOfLines={1} style={[
                styles.text,
                styles.textAmount,
                {
                  fontSize: 20
                }
              ]}>{formatCurrency(expensesAmount)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Transaction", {
            defaultTransaction: "A receber"
          })}
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor: "#CFF4CF"
              }
            ]}
          >
            <View style={[ { marginRight: 20 } ]}>
              <Icon
                svg={ReceivDollar}
                fill="#171717"
                height="37px"
                width="37px"
              />
            </View>
            <View style={[
              {
                flex: 1,

                flexDirection: "column",
                justifyContent: "space-between",
              }
            ]}>
              <Text style={[ styles.text, styles.textDescription ]}>A receber</Text>
              <Text numberOfLines={1} style={[
                styles.text,
                styles.textAmount,
                {
                  fontSize: 20
                }
              ]}>{formatCurrency(receiveAmount)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Transaction", {
            defaultTransaction: "Dívida"
          })}
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor: "#F3DACC"
              }
            ]}
          >
            <View style={[ { marginRight: 20 } ]}>
              <Icon
                svg={Donate}
                fill="#171717"
                height="37px"
                width="37px"
              />
            </View>
            <View style={[
              {
                flex: 1,

                flexDirection: "column",
                justifyContent: "space-between",
              }
            ]}>
              <Text style={[ styles.text, styles.textDescription ]}>Dívidas</Text>
              <Text numberOfLines={1} style={[
                styles.text,
                styles.textAmount,
                {
                  fontSize: 20
                }
              ]}>{formatCurrency(debtsAmount)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {
        recentTransactions.length > 0 &&
        <View style={styles.sectionContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("RecentTransactions")}
          >
            <View style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16
              }
            ]}>
              <Text numberOfLines={1} style={styles.text}>Transações recentes</Text>
              <Icon
                svg={UpRight}
                fill="#050505"
                height="16px"
                width="16px"
              />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <RecentTransactions limit={5} />
          </View>
        </View>
      }
      {
        receiveAndDebts.length > 0 &&
        <View style={styles.sectionContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("ReceiveAndDebts")}
          >
            <View style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16
              }
            ]}>
              <Text numberOfLines={1} style={styles.text}>Dívidas e contas a receber</Text>
              <Icon
                svg={UpRight}
                fill="#050505"
                height="16px"
                width="16px"
              />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <ReceiveAndDebts limit={5} />
          </View>
        </View>
      }
      {
        receiveSoon.length > 0 &&
        <View style={styles.sectionContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("ReceiveSoon")}
          >
            <View style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16
              }
            ]}>
              <Text numberOfLines={1} style={styles.text}>Receber em breve</Text>
              <Icon
                svg={UpRight}
                fill="#050505"
                height="16px"
                width="16px"
              />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <ReceiveSoon limit={5} />
          </View>
        </View>
      }
      {
        paySoon.length > 0 &&
        <View style={styles.sectionContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("PaySoon")}
          >
            <View style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16
              }
            ]}>
              <Text numberOfLines={1} style={styles.text}>Pagar em breve</Text>
              <Icon
                svg={UpRight}
                fill="#050505"
                height="16px"
                width="16px"
              />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <PaySoon limit={5} />
          </View>
        </View>
      }
      {
        notPaid.length > 0 &&
        <View style={styles.sectionContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("NotPaid")}
          >
            <View style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16
              }
            ]}>
              <Text numberOfLines={1} style={styles.text}>Não pagas</Text>
              <Icon
                svg={UpRight}
                fill="#050505"
                height="16px"
                width="16px"
              />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <NotPaid limit={5} />
          </View>
        </View>
      }
      {
        notReceived.length > 0 &&
        <View style={styles.sectionContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("NotReceived")}
          >
            <View style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16
              }
            ]}>
              <Text numberOfLines={1} style={styles.text}>Não recebidas</Text>
              <Icon
                svg={UpRight}
                fill="#050505"
                height="16px"
                width="16px"
              />
            </View>
          </TouchableWithoutFeedback>
          <View>
            <NotReceived limit={5} />
          </View>
        </View>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ffffff",
  },

  statusContainer: {
    marginVertical: 10,
    marginHorizontal: 20,

    justifyContent: "center",
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

  sectionContainer: {
    justifyContent: "center",

    marginVertical: 45,
    marginHorizontal: 20,
  },

  walletCard: {
    padding: 20,

    borderRadius: 8,

    marginBottom: 14,
  },

  card: {
    paddingHorizontal: 20,
    paddingVertical: 15,

    flexDirection: "row",
    alignItems: "center",

    borderRadius: 8,

    marginBottom: 14,
  },

  description: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
    marginBottom: 21,
  },

  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,

    textAlignVertical: "center",

    color: "#171717",
  },

  textAmount: {
    fontFamily: "Poppins-Medium",
    fontSize: 24,
  },

  textDescription: {
    fontSize: 14,

    color: "#161618"
  }
});