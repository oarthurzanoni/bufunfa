import React from "react";

import {
  View,
  Text,
  StyleSheet
} from "react-native";

interface ITransaction {
  id: number;
  date: Date;
  title: string;
  description: string;
  amount: number;
  category: {
    description: string;
    icon: JSX.Element;
  };
}

interface TransactionsContextData {
  expenses: ITransaction[];
  walletAmount: number;
  walletSavings: number;
  BiggestSpendings: () => JSX.Element;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = React.createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps): JSX.Element {
  const [ walletSavings, updateWalletSavings ] = React.useState<number>(0);
  const [ walletAmount, updateWalletAmount ] = React.useState<number>(144110);
  const [ expenses, setExpenses ] = React.useState<ITransaction[]>([]);

  function BiggestSpendings(): JSX.Element {
    expenses.sort((a, b) => b.amount - a.amount);

    let categories: ITransaction["category"][] = [];

    for(let i = 0; i < expenses.length; i++) {
      if(categories.length === 3) break;

      const categoryFound: undefined | ITransaction["category"] = categories.find(category => {
        category.description === expenses[i].category.description;
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
              {category.icon}
            </View>
            <Text style={styles.text}>{category.description}</Text>
          </View>
        ))
        : <View style={styles.noExpensesContainer}>
          <Text style={[ styles.text, { fontSize: 14 } ]}>Aqui serão exibidos os seus 3 maiores gastos.</Text>
        </View>
      }</>
    );
  }

  return(
    <TransactionsContext.Provider
      value={{
        expenses,
        walletAmount,
        walletSavings,
        BiggestSpendings
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