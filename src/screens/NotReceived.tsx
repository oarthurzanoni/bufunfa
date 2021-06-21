import React from "react";

import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";

import { TransactionsContext } from "../providers/Transactions";

type Props = StackScreenProps<StackParamList, "Home">;

export default function NotReceivedScreen({ navigation }: Props): JSX.Element {
  const { NotReceived } = React.useContext(TransactionsContext);

  return(
    <ScrollView style={[ styles.container ]}>
      <View style={[ styles.transactionsContainer ]}>
        <NotReceived navigation={navigation} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ffffff",
  },

  transactionsContainer: {
    justifyContent: "center",

    marginVertical: 45,
    marginHorizontal: 20,
  }
});