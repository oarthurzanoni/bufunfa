import React from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";

import { ITransaction } from "../providers/Transactions";

import formatCurrency from "../utils/formatCurrency";
import getCategoryIcon from "../utils/getCategoryIcon";

import Icon from "./Icon";
import formatDate from "../utils/formatDate";

interface Props {
  transaction: ITransaction;
}

export default function TransactionCard({ transaction }: Props): JSX.Element {
  const [ modalVisible, setModalVisible ] = React.useState<boolean>(false);

  const {
    id,
    category,
    title,
    amount,
    type,
    createdAt,
    date,
    description,
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
      cardColor = "#FAE2D4";
      break;
    default:
      cardColor = "#F6EEE0";
      break;
  }

  return(
    <>
      <TouchableWithoutFeedback
        onPress={() => setModalVisible(true)}
      >
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
      </TouchableWithoutFeedback>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={[
            {
              marginVertical: 10,
              marginHorizontal: 20,
          
              justifyContent: "center",
            }
          ]}
        >
          <View style={styles.paddingView} />
          <View style={[ styles.card, { marginBottom: 30 } ]}>
          <View style={[ styles.imageContainer, { marginLeft: 0, paddingHorizontal: 0 } ]}>
            <Icon
              svg={getCategoryIcon(category)}
              fill="#050505"
              width="37px"
              height="37px"
            />
          </View>
            <View style={[ styles.titleContainer ]}>
              <Text
                style={[
                  styles.text,
                  {
                    color: "#444444",
                  }
                ]}
                numberOfLines={1}
              >
                { category }
              </Text>
            </View>
          </View>
          <Text
            style={[
              styles.text,
              {
                color: `${ type === "Entrada" || type === "A receber" ? "#70B657" : "#D17777" }`,
                marginBottom: 20,
              }
            ]}
            numberOfLines={1}
          >
            {formatCurrency(amount)}
          </Text>
          <Text style={[ styles.text, { fontFamily: "Poppins-Medium" } ]} numberOfLines={1}>{title ? title : "Sem título"}</Text>
          <Text
            style={[
              styles.text,
              {
                color: "#444444",
                marginBottom: 45,
                marginTop: 15,
              }
            ]}
            numberOfLines={1}
          >
            { formatDate(new Date(date)) }
          </Text>
          <Text style={[ styles.text ]}>{ description }</Text>
          <View style={styles.paddingView} />
        </ScrollView>
      </Modal>
    </>
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

  card: {
    height: 42,

    flexDirection: "row",

    marginBottom: 14,
  },

  paddingView: {
    height: 45,
  },
});