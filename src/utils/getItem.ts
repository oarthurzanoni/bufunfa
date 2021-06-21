import AsyncStorage from "@react-native-async-storage/async-storage";

import { ITransaction } from "../providers/Transactions";

export default async function getItem(id: string): Promise<ITransaction | []> {
  const incomes: string | null = await AsyncStorage.getItem("@incomes");

  if(incomes) {
    const parsedIncomes: ITransaction[] = JSON.parse(incomes);

    const itemFound: ITransaction[] = parsedIncomes.filter(income => {
      return income.id === id;
    });

    if(itemFound.length > 0) {
      return itemFound[0];
    }
  }

  const expenses: string | null = await AsyncStorage.getItem("@expenses");

  if(expenses) {
    const parsedExpenses: ITransaction[] = JSON.parse(expenses);

    const itemFound: ITransaction[] = parsedExpenses.filter(expense => {
      return expense.id === id;
    });

    if(itemFound.length > 0) {
      return itemFound[0];
    }
  }

  return [];
}