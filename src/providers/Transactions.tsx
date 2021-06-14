import React from "react";

import {
  View,
  Text,
  StyleSheet
} from "react-native";

import { nanoid } from "nanoid/non-secure";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from "../components/Icon";

import formatCurrency from "../utils/formatCurrency";
import getCategoryIcon from "../utils/getCategoryIcon";

export interface ITransaction {
  id: string;
  type: string;
  date: Date;
  title: string;
  description: string;
  amount: number;
  category: string;
}

export interface INewTransaction {
  type: string;
  date: Date;
  title: string;
  description: string;
  amount: number;
  category: string;
}

interface TransactionsContextData {
  expenses: ITransaction[];
  walletAmount: number;
  walletSavings: number;
  BiggestSpendings: () => JSX.Element;
  saveTransaction: (data: INewTransaction) => void;
  isSaving: boolean;
  incomesTotal: number;
  expensesTotal: number;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = React.createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps): JSX.Element {
  const [ walletSavings, updateWalletSavings ] = React.useState<number>(0);
  const [ walletAmount, updateWalletAmount ] = React.useState<number>(0);

  const [ expenses, setExpenses ] = React.useState<ITransaction[]>([]);
  const [ incomes, setIncomes ] = React.useState<ITransaction[]>([]);

  const [ isSaving, setIsSaving ] = React.useState<boolean>(false);

  const [ incomesTotal, updateIncomesTotal ] = React.useState<number>(0);
  const [ expensesTotal, updateExpensesTotal ] = React.useState<number>(0);

  function BiggestSpendings(): JSX.Element {
    expenses.sort((a, b) => b.amount - a.amount);

    let categories: ITransaction["category"][] = [];

    for(let i = 0; i < expenses.length; i++) {
      if(categories.length === 3) break;

      const categoryFound: undefined | ITransaction["category"] = categories.find(category => {
        category === expenses[i].category;
      });

      if(!categoryFound) {
        categories.push(expenses[i].category);
      }
    }

    return (
      <>{
        categories.length > 0 
        ? categories.map((category, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.image}>
              <Icon
                svg={getCategoryIcon(category)}
                fill="#050505"
                height="37px"
                width="37px"
              />
            </View>
            <Text style={styles.text}>{category}</Text>
          </View>
        ))
        : <View style={styles.noExpensesContainer}>
          <Text style={[ styles.text, { fontSize: 14 } ]}>Aqui serão exibidos os seus 3 maiores gastos.</Text>
        </View>
      }</>
    );
  }

  async function saveTransaction(data: INewTransaction): Promise<void> {
    setIsSaving(true);

    console.log(data);

    setIsSaving(false);
  }

  return(
    <TransactionsContext.Provider
      value={{
        expenses,
        walletAmount,
        walletSavings,
        BiggestSpendings,
        saveTransaction,
        isSaving,
        incomesTotal,
        expensesTotal,
      }}
    >
      { children }
    </TransactionsContext.Provider>
  );
}

const styles = StyleSheet.create({
  image: {
    marginRight: 20,

    alignItems: "center",
    justifyContent: "center",
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

  noExpensesContainer: {
    justifyContent: "center",

    height: 100
  }
});