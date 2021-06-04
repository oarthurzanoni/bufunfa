import React from "react";

import {
  View,
  Text,
  StyleSheet
} from "react-native";

import Icon from "../components/Icon";

import OnlineStore from "../assets/images/svgs/OnlineStore";
import Car from "../assets/images/svgs/Car";

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
  BiggestSpendings: () => JSX.Element;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = React.createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps): JSX.Element {
  const [ expenses, setExpenses ] = React.useState<ITransaction[]>([
    {
      id: 0,
      date: new Date(Date.now()),
      title: "Mercados",
      description: "",
      amount: 100000,
      category: {
        description: "Mercados",
        icon: <Icon svg={OnlineStore} fill="#050505" height="37px" width="37px" />
      },
    },
    {
      id: 2,
      date: new Date(Date.now()),
      title: "Carro",
      description: "Financiamento",
      amount: 46900,
      category: {
        description: "Veículos",
        icon: <Icon svg={Car} fill="#050505" height="37px" width="37px" />
      },
    },
  ]);

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

    return <>{
      categories.map((category, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.image}>
            {category.icon}
          </View>
          <Text style={styles.text}>{category.description}</Text>
        </View>
      ))
    }</>;
  }

  return(
    <TransactionsContext.Provider
      value={{
        expenses,
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
});