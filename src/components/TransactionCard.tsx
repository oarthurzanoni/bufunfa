import React from "react";

import {
  StyleSheet,
  View,
  Text,
} from "react-native";

import { ITransaction } from "../providers/Transactions";

import formatCurrency from "../utils/formatCurrency";
import getCategoryIcon from "../utils/getCategoryIcon";

import Icon from "./Icon";

interface Props {
  transaction: ITransaction;
}

export default function TransactionCard({ transaction }: Props): JSX.Element {
  const {
    category,
    title,
    amount,
    type
  } = transaction;

  let cardColor: string;
  
  switch(type) {
    case "Entrada":
      cardColor = "#F6EEE0";
      break;
    case "A receber":
      cardColor = "#D9FAD9";
      break;
    case "Saída":
      cardColor = "#E8E3F3";
      break;
    case "Dívida":
      cardColor = "#F5EAE3";
      break;
    default:
      cardColor = "#F6EEE0";
      break;
  }

  return(
    <View style={[ styles.container, { backgroundColor: `${cardColor}`, } ]}>
      <View style={[ styles.imageContainer ]}>
        <Icon
          svg={getCategoryIcon(category)}
          fill="#050505"
          width="37px"
          height="37px"
        />
      </View>
      <View style={[ styles.titleContainer ]}>
        <Text style={[ styles.text ]} numberOfLines={1}>{title ? title : "Sem título"}</Text>
      </View>
      <View style={[ styles.amountContainer ]}>
        <Text style={[ styles.text ]} numberOfLines={1}>{formatCurrency(amount)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginVertical: 4,

    borderRadius: 8,

    backgroundColor: "#E8E3F3",
  },

  imageContainer: {
    height: "100%",

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 12,
    paddingHorizontal: 4,
  },

  titleContainer: {
    flex: 1,
    height: "100%",

    alignItems: "flex-start",
    justifyContent: "center",

    paddingHorizontal: 24,
  },

  amountContainer: {
    width: 110,
    height: "100%",

    alignItems: "flex-start",
    justifyContent: "center",

    marginRight: 12,
    paddingHorizontal: 4,
  },

  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,

    textAlignVertical: "center",

    color: "#050505",
  },
});