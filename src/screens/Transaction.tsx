import React from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Datepicker from "../components/Datepicker";
import Icon from "../components/Icon";

import { TextInputMask } from "react-native-masked-text";

import MoneyBag from "../assets/images/svgs/MoneyBag";
import TagWindow from "../assets/images/svgs/TagWindow";
import Pencil from "../assets/images/svgs/Pencil";

import Select, { IOption } from "../components/Select";

import TransactionOptions from "../settings/TransactionOptions";

import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";

import CategoryOptions from "../settings/CategoryOptions";

import { INewTransaction, TransactionsContext } from "../providers/Transactions";

type Props = StackScreenProps<StackParamList, "Transaction">;

export default function TransactionScreen({ route }: Props): JSX.Element {
  const { defaultTransaction } = route.params;

  const {
    updateTransactions,
    isSaving,
  } = React.useContext(TransactionsContext);

  const [ transaction, updateTransaction ] = React.useState<string>(defaultTransaction);
  const [ category, updateCategory ] = React.useState<string>("Outros");
  const [ amount, updateAmount ] = React.useState<string>("");
  const [ title, updateTitle ] = React.useState<string>("");
  const [ description, updateDescription ] = React.useState<string>("");
  const [ date, updateDate ] = React.useState<Date>(new Date(Date.now()));

  function handleSubmit(): void {
    const cleanAmount: number = Number(String(amount).replace(/\D/g, ""));
    const newTitle: string = title ? title : "Sem título";

    const newTransaction: INewTransaction = {
      type: transaction,
      title: newTitle,
      description,
      amount: cleanAmount,
      category,
      date
    }

    updateTransactions(newTransaction);
  }

  return(
    <>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={[ styles.container ]}
      >
        <View style={styles.paddingView} />
        <Select
          options={TransactionOptions}
          defaultOption={defaultTransaction}
          onChangeSelect={(option: IOption) => updateTransaction(option.description)}
          sortByAlphabeticalOrder={false}
        />
        <View style={styles.card}>
          <View style={styles.image}>
            <Icon
              svg={MoneyBag}
              fill="#050505"
              height="37px"
              width="37px"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInputMask
              style={[ styles.text ]}
              placeholder="R$ 0,00"
              placeholderTextColor="#444444"
              type={"money"}
              options={{
                precision: 2,
                separator: ",",
                delimiter: ".",
                unit: "R$ ",
                suffixUnit: ""
              }}
              value={amount && String(amount)}
              onChangeText={amount => updateAmount(amount)}
            />
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.image}>
            <Icon
              svg={TagWindow}
              fill="#050505"
              height="37px"
              width="37px"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[ styles.text ]}
              keyboardType="default"
              placeholder="Título"
              placeholderTextColor="#444444"
              onChangeText={title => updateTitle(title)}
              value={title && String(title)}
            ></TextInput>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.image}>
            <Icon
              svg={Pencil}
              fill="#050505"
              height="37px"
              width="37px"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[ styles.text ]}
              keyboardType="default"
              placeholder="Descrição"
              placeholderTextColor="#444444"
              onChangeText={description => updateDescription(description)}
              value={description && String(description)}
            ></TextInput>
          </View>
        </View>
        <Datepicker onChangeDate={(date: Date) => updateDate(date)} />
        <Select
          options={CategoryOptions}
          defaultOption={"Outros"}
          onChangeSelect={(option: IOption) => updateCategory(option.description)}
          sortByAlphabeticalOrder={true}
        />
      </ScrollView>
      <View
        style={[
          {
            paddingHorizontal: 20,

            backgroundColor: "#ffffff"
          }
        ]}
      >
        <TouchableOpacity
          style={{ marginTop: 14 }}
          onPress={() => isSaving ? {} : handleSubmit()}
        >
          <View style={[
            styles.card,
            styles.button,
          ]}>
            <Text style={[ styles.text, { color: "#171717" } ]}>{ isSaving ? "Salvando ..." : "Salvar" }</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
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

    marginBottom: 14,
  },

  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,

    textAlignVertical: "center",

    color: "#050505",
  },

  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },

  paddingView: {
    height: 45,
  },

  button: {
    width: "100%",

    backgroundColor: "#D1FBEA",

    height: 60,

    borderRadius: 4,

    justifyContent: "center",
    alignItems: "center",
  },
});