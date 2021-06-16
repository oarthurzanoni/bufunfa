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
  updateTransactions: (data: INewTransaction) => void;
  isSaving: boolean;
  isLoadingInfo: boolean;
  incomesAmount: number;
  expensesAmount: number;
  receiveAmount: number;
  debtsAmount: number;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = React.createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps): JSX.Element {
  const [ incomesAmount, updateIncomesAmount ] = React.useState<number>(0);
  const [ receiveAmount, updateReceiveAmount ] = React.useState<number>(0);
  const [ expensesAmount, updateExpensesAmount ] = React.useState<number>(0);
  const [ debtsAmount, updateDebtsAmount ] = React.useState<number>(0);

  const [ walletAmount, updateWalletAmount ] = React.useState<number>(0);

  const [ walletSavings, updateWalletSavings ] = React.useState<number>(0);

  const [ expenses, setExpenses ] = React.useState<ITransaction[]>([]);
  const [ incomes, setIncomes ] = React.useState<ITransaction[]>([]);

  const [ isSaving, setIsSaving ] = React.useState<boolean>(false);
  const [ isLoadingInfo, setIsLoadingInfo ] = React.useState<boolean>(false);

  function BiggestSpendings(): JSX.Element {
    expenses.sort((a, b) => b.amount - a.amount);

    let categories: ITransaction["category"][] = [];

    for(let i = 0; i < expenses.length; i++) {
      if(categories.length === 3) break;

      const categoryFound: undefined | ITransaction["category"] = categories.find(category => {
        return category === expenses[i].category;
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

  async function updateTransactions(data: INewTransaction): Promise<void> {
    console.log("Trasação recebida: ", data);

    const id: string = nanoid();

    const newTransaction: ITransaction = { ...data, id };

    console.log("Trasação com um id atribuído: ", newTransaction);

    switch(newTransaction.type) {
      case "Entrada":
        setIncomes([ ...incomes, newTransaction ]);
        break;
      case "A receber":
        setIncomes([ ...incomes, newTransaction ]);
        break;
      case "Saída":
        setExpenses([ ...expenses, newTransaction ]);
        break;
      case "Dívida":
        setExpenses([ ...expenses, newTransaction ]);
        break;
    }
  }

  async function renderStoredIncomes(): Promise<void> {
    const storedIncomes: string | null = await AsyncStorage.getItem("@incomes");

    if(storedIncomes) {
      const parsedStoredIncomes: ITransaction[] = JSON.parse(storedIncomes);

      setIncomes(parsedStoredIncomes);

      console.log("Definindo entradas armazenadas: ", parsedStoredIncomes);
    }
  }

  async function renderStoredExpenses(): Promise<void> {
    const storedExpenses: string | null = await AsyncStorage.getItem("@expenses");
    
    if(storedExpenses) {
      const parsedStoredExpenses: ITransaction[] = JSON.parse(storedExpenses);

      setExpenses(parsedStoredExpenses);
     
      console.log("Definindo saídas armazenadas: ", parsedStoredExpenses);
    }
  }

  async function saveTransactions(): Promise<void> {
    await AsyncStorage.setItem("@incomes", JSON.stringify(incomes))
      .then(() => {
        console.log("Entradas salvas: ", incomes);
      });
    await AsyncStorage.setItem("@expenses", JSON.stringify(expenses))
    .then(() => {
      console.log("Saídas salvas: ", expenses);
    });;
  }

  function renderWalletAmount(incomeTotal: number, expenseTotal: number): void {
    const total: number = incomeTotal - expenseTotal;

    console.log("Novo total: ", total);
    
    updateWalletAmount(walletSavings + total);
  }

  function renderIncomesAmount(): void {
    let counter: number = 0;

    incomes.map(income => {
      income.type === "Entrada" ? counter = counter + income.amount : {};
    });

    updateIncomesAmount(counter);
    renderWalletAmount(counter, expensesAmount);
  }

  function renderExpensesAmount(): void {
    let counter: number = 0;

    expenses.map(expense => {
      expense.type === "Saída" ? counter = counter + expense.amount : {};
    });

    updateExpensesAmount(counter);
    renderWalletAmount(incomesAmount, counter);
  }

  function renderReceiveAmount(): void {
    let counter: number = 0;

    incomes.map(income => {
      income.type === "A receber" ? counter = counter + income.amount : {};
    });

    updateReceiveAmount(counter);
  }

  function renderDebtsAmount(): void {
    let counter: number = 0;

    expenses.map(expense => {
      expense.type === "Dívida" ? counter = counter + expense.amount : {};
    });

    updateDebtsAmount(counter);
  }

  React.useEffect(() => {
    renderStoredIncomes();
    renderStoredExpenses();
  }, []);
  
  React.useEffect(() => {
    renderIncomesAmount();
    renderReceiveAmount();
    saveTransactions();
  }, [incomes]);

  React.useEffect(() => {
    renderExpensesAmount();
    renderDebtsAmount();
    saveTransactions();
  }, [expenses]);

  return(
    <TransactionsContext.Provider
      value={{
        expenses,
        walletAmount,
        walletSavings,
        BiggestSpendings,
        updateTransactions,
        isSaving,
        isLoadingInfo,
        incomesAmount,
        expensesAmount,
        receiveAmount,
        debtsAmount,
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