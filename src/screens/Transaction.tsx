import React from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput
} from "react-native";

import Icon from "../components/Icon";

import MoneyBag from "../assets/images/svgs/MoneyBag";
import TagWindow from "../assets/images/svgs/TagWindow";
import Pencil from "../assets/images/svgs/Pencil";
import Calendar from "../assets/images/svgs/Calendar";

import Select, { IOption } from "../components/Select";

import TransactionOptions from "../settings/TransactionOptions";

import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/Navigator";
import CategoryOptions from "../settings/CategoryOptions";

type Props = StackScreenProps<StackParamList, "Transaction">;

export default function TransactionScreen({ route }: Props): JSX.Element {
  const { defaultTransaction } = route.params;

  const [ transaction, updateTransaction ] = React.useState<string>(defaultTransaction);
  const [ category, updateCategory ] = React.useState<string>("Outros");
  const [ amount, updateAmount ] = React.useState<string>("");
  const [ title, updateTitle ] = React.useState<string>("");
  const [ description, updateDescription ] = React.useState<string>("");
  const [ date, updateDate ] = React.useState<string>("");

  function handleDateChange(date: string): void {
    console.log(date);

    updateDate(date);
  }

  function formatDate(): string {
    return date;
  }

  return(
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={[ styles.container ]}
    >
      <View style={styles.paddingView} />
      <Select
        options={TransactionOptions}
        defaultOption={defaultTransaction}
        onChangeSelect={(option: IOption) => updateTransaction(option.description)}
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
          <TextInput
            style={[ styles.text ]}
            keyboardType="number-pad"
            placeholder="R$ 0,00"
            placeholderTextColor="#444444"
            onChangeText={amount => updateAmount(amount)}
            value={amount && String(amount)}
          ></TextInput>
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
      <View style={styles.card}>
        <View style={styles.image}>
          <Icon
            svg={Calendar}
            fill="#050505"
            height="37px"
            width="37px"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[ styles.text ]}
            keyboardType="number-pad"
            placeholder="Dia e mês"
            placeholderTextColor="#444444"
            onChangeText={date => handleDateChange(date)}
            value={formatDate()}
          ></TextInput>
        </View>
      </View>
      <Select
        options={CategoryOptions}
        defaultOption={"Outros"}
        onChangeSelect={(option: IOption) => updateCategory(option.description)}
      />
      <View style={styles.paddingView} />
    </ScrollView>
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
  }
});