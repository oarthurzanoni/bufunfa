import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import { nanoid } from "nanoid/non-secure";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from "../components/Icon";

import getCategoryIcon from "../utils/getCategoryIcon";
import getNumberOfDays from "../utils/getNumberOfDays";
import formatCurrency from "../utils/formatCurrency";
import formatDate from "../utils/formatDate";

import VerifiedScroll from "../assets/images/svgs/VerifiedScroll";
import Remove from "../assets/images/svgs/Remove";


export interface ITransaction {
  id: string;
  type: string;
  date: Date;
  title: string;
  description: string;
  amount: number;
  category: string;
  createdAt: Date;
}

export interface INewTransaction {
  type: string;
  date: Date;
  title: string;
  description: string;
  amount: number;
  category: string;
}

interface ITransactionsCard {
  limit?: number | undefined;
}

interface TransactionsContextData {
  expenses: ITransaction[];
  incomes: ITransaction[];
  recentTransactions: ITransaction[];
  receiveAndDebts: ITransaction[];
  receiveSoon: ITransaction[];
  paySoon: ITransaction[];
  notPaid: ITransaction[];
  notReceived: ITransaction[];
  walletAmount: number;
  walletSavings: number;
  BiggestSpendings: () => JSX.Element;
  RecentTransactions: ({ limit }: ITransactionsCard) => JSX.Element;
  ReceiveAndDebts: ({ limit }: ITransactionsCard) => JSX.Element;
  ReceiveSoon: ({ limit }: ITransactionsCard) => JSX.Element;
  PaySoon: ({ limit }: ITransactionsCard) => JSX.Element;
  NotPaid: ({ limit }: ITransactionsCard) => JSX.Element;
  NotReceived: ({ limit }: ITransactionsCard) => JSX.Element;
  updateTransactions: (data: INewTransaction) => void;
  deleteTransaction: ({ id, type }: ITransaction) => void;
  processTransaction: ({ id, type }: ITransaction) => void;
  storeWalletSavings: () => Promise<void>;
  resetAll: () => Promise<void>;
  incomesAmount: number;
  expensesAmount: number;
  receiveAmount: number;
  debtsAmount: number;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionCardProps {
  transaction: ITransaction;
}

export const TransactionsContext = React.createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps): JSX.Element {
  const [ incomesAmount, updateIncomesAmount ] = React.useState<number>(0);
  const [ receiveAmount, updateReceiveAmount ] = React.useState<number>(0);
  const [ expensesAmount, updateExpensesAmount ] = React.useState<number>(0);
  const [ debtsAmount, updateDebtsAmount ] = React.useState<number>(0);

  const [ walletAmount, updateWalletAmount ] = React.useState<number>(0);

  const [ walletSavings, updateWalletSavings ] = React.useState<number>(0);

  const [ recentTransactions, updateRecentTransactions ] = React.useState<ITransaction[]>([]);
  const [ receiveAndDebts, updateReceiveAndDebts ] = React.useState<ITransaction[]>([]);
  const [ receiveSoon, updateReceiveSoon ] = React.useState<ITransaction[]>([]);
  const [ paySoon, updatePaySoon ] = React.useState<ITransaction[]>([]);
  const [ notPaid, updateNotPaid ] = React.useState<ITransaction[]>([]);
  const [ notReceived, updateNotReceived ] = React.useState<ITransaction[]>([]);

  const [ expenses, setExpenses ] = React.useState<ITransaction[]>([]);
  const [ incomes, setIncomes ] = React.useState<ITransaction[]>([]);

  const [ isSaving, setIsSaving ] = React.useState<boolean>(false);
  const [ isLoadingInfo, setIsLoadingInfo ] = React.useState<boolean>(false);

  function TransactionCard({ transaction }: TransactionCardProps): JSX.Element {
    const [ modalVisible, setModalVisible ] = React.useState<boolean>(false);
  
    const {
      deleteTransaction,
      processTransaction,
    } = React.useContext(TransactionsContext);
  
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
          </ScrollView>
          <View
            style={[
              {
                flexDirection: "row",
  
                paddingHorizontal: 20,
  
                backgroundColor: "#ffffff"
              }
            ]}
          >
            {
              (type === "A receber" || type === "Dívida") &&
              <TouchableOpacity
                onPress={() => {
                  processTransaction(transaction);
                  setModalVisible(false);
                }}
              >
                <View style={[
                  styles.card,
                  styles.button,
                ]}>
                  <Icon
                    fill="#050505"
                    height="37px"
                    width="37px"
                    svg={VerifiedScroll}
                  />
                </View>
              </TouchableOpacity>
            }
            <TouchableOpacity
              onPress={() => {
                deleteTransaction(transaction);
                setModalVisible(false);
              }}
            >
              <View style={[
                styles.card,
                styles.button,
              ]}>
                <Icon
                  fill="#050505"
                  height="37px"
                  width="37px"
                  svg={Remove}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </>
    );
  }  

  function deleteTransaction({ id, type }: ITransaction): void {
    if(type === "Entrada" || type === "A receber") {
      setIncomes(prev => prev.filter(item => item.id !== id));
    }

    else if(type === "Saída" || type === "Dívida") {
      setExpenses(prev => prev.filter(item => item.id !== id));
    }
  }

  function processTransaction({ id, type }: ITransaction): void {
    if(type === "A receber") {
      const transactionDetails: ITransaction = incomes.find(transaction => transaction.id === id)!;
      
      const newId: string = nanoid();

      const newTransaction: ITransaction = {
        ...transactionDetails,
        type: "Entrada",
        id: newId,
        createdAt: new Date(Date.now())
      };
  
      setIncomes([ ...incomes, newTransaction ]);
      setIncomes(prev => prev.filter(item => item.id !== transactionDetails.id));
    }

    else if(type === "Dívida") {
      const transactionDetails: ITransaction = expenses.find(transaction => transaction.id === id)!;

      const newId: string = nanoid();
     
      const newTransaction: ITransaction = {
        ...transactionDetails,
        type: "Saída",
        id: newId,
        createdAt: new Date(Date.now())
      };
  
      setExpenses([ ...expenses, newTransaction ]);
      setExpenses(prev => prev.filter(item => item.id !== transactionDetails.id));
    }
  }

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
          <Text style={[ styles.text, { fontSize: 16 } ]}>Você não possui gastos.</Text>
        </View>
      }</>
    );
  }

  function RecentTransactions({ limit }: ITransactionsCard): JSX.Element {
    let transactions: ITransaction[] = [];

    for(let i = 0; i < recentTransactions.length; i++) {
      if(limit) {
        if(transactions.length === limit) break;
      }

      transactions.push(recentTransactions[i]);
    }

    return(
      <View>
        {
          transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)
        }
      </View>
    );
  }

  function ReceiveAndDebts({ limit }: ITransactionsCard): JSX.Element {
    let transactions: ITransaction[] = [];

    for(let i = 0; i < receiveAndDebts.length; i++) {
      if(limit) {
        if(transactions.length === limit) break;
      }

      transactions.push(receiveAndDebts[i]);
    }

    return(
      <View>
        {
          transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)
        }
      </View>
    );
  }

  function ReceiveSoon({ limit }: ITransactionsCard): JSX.Element {
    let transactions: ITransaction[] = [];

    for(let i = 0; i < receiveSoon.length; i++) {
      if(limit) {
        if(transactions.length === limit) break;
      }

      transactions.push(receiveSoon[i]);
    }

    return(
      <View>
        {
          transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)
        }
      </View>
    );
  }

  function PaySoon({ limit }: ITransactionsCard): JSX.Element {
    let transactions: ITransaction[] = [];

    for(let i = 0; i < paySoon.length; i++) {
      if(limit) {
        if(transactions.length === limit) break;
      }

      transactions.push(paySoon[i]);
    }

    return(
      <View>
        {
          transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)
        }
      </View>
    );
  }

  function NotPaid({ limit }: ITransactionsCard): JSX.Element {
    let transactions: ITransaction[] = [];

    for(let i = 0; i < notPaid.length; i++) {
      if(limit) {
        if(transactions.length === limit) break;
      }

      transactions.push(notPaid[i]);
    }

    return(
      <View>
        {
          transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)
        }
      </View>
    );
  }

  function NotReceived({ limit }: ITransactionsCard): JSX.Element {
    let transactions: ITransaction[] = [];

    for(let i = 0; i < notReceived.length; i++) {
      if(limit) {
        if(transactions.length === limit) break;
      }

      transactions.push(notReceived[i]);
    }

    return(
      <View>
        {
          transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)
        }
      </View>
    );
  }

  async function updateTransactions(data: INewTransaction): Promise<void> {
    const id: string = nanoid();

    const newTransaction: ITransaction = { ...data, id, createdAt: new Date(Date.now()) };

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

    updateRecentTransactions([ ...recentTransactions, newTransaction ]);
  }

  async function renderStoredSavings(): Promise<void> {
    const storedSavings: string | null = await AsyncStorage.getItem("@savings");

    if(storedSavings) {
      const parsedSavings: number = Number(JSON.parse(storedSavings));

      updateWalletSavings(parsedSavings);
    }
  }

  async function renderStoredIncomes(): Promise<void> {
    const storedIncomes: string | null = await AsyncStorage.getItem("@incomes");

    if(storedIncomes) {
      const parsedStoredIncomes: ITransaction[] = JSON.parse(storedIncomes);

      setIncomes(parsedStoredIncomes);
    }
  }

  async function renderStoredExpenses(): Promise<void> {
    const storedExpenses: string | null = await AsyncStorage.getItem("@expenses");
    
    if(storedExpenses) {
      const parsedStoredExpenses: ITransaction[] = JSON.parse(storedExpenses);

      setExpenses(parsedStoredExpenses);
    }
  }

  async function renderStoredRecentTransactions(): Promise<void> {
    const storedRecentTransactions: string | null = await AsyncStorage.getItem("@recent");
    
    if(storedRecentTransactions) {
      const parsedStoredRecentTransactions: ITransaction[] = JSON.parse(storedRecentTransactions);

      updateRecentTransactions(parsedStoredRecentTransactions);
    }
  }

  async function storeWalletSavings(): Promise<void> {
    await AsyncStorage.setItem("@savings", String(walletAmount));
    
    updateWalletSavings(walletAmount);

    setIncomes(prev => prev.filter(item => item.type !== "Entrada"));
    setExpenses(prev => prev.filter(item => item.type !== "Saída"));
  }

  async function resetAll(): Promise<void> {
    await AsyncStorage.setItem("@savings", "");

    updateWalletSavings(0);

    setIncomes([]);
    setExpenses([]);
  }

  function renderRecentTransactions(): void {
    let recent: ITransaction[] = [];

    incomes.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    expenses.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    for(let i = 0; i < incomes.length; i++) {
      if(incomes[i]) recent.push(incomes[i]);
    }

    for(let i = 0; i < expenses.length; i++) {
      if(expenses[i]) recent.push(expenses[i]);
    }

    recent.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });
    
    updateRecentTransactions(recent);
  }

  function renderToReceiveAndDebts(): void {
    let receiveAndDebts: ITransaction[] = [];

    incomes.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    expenses.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    for(let i = 0; i < incomes.length; i++) {
      if(incomes[i].type === "A receber") receiveAndDebts.push(incomes[i]);
    }

    for(let i = 0; i < expenses.length; i++) {
      if(expenses[i].type === "Dívida") receiveAndDebts.push(expenses[i]);
    }

    receiveAndDebts.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    updateReceiveAndDebts(receiveAndDebts);
  }

  function renderToReceiveSoon(): void {
    let receive: ITransaction[] = [];

    incomes.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    for(let i = 0; i < incomes.length; i++) {
      if(incomes[i].type === "A receber") {
        const currentDate: Date = new Date(Date.now());

        const days: number = getNumberOfDays(currentDate, incomes[i].date);

        if(days < 3 && days >= 0) {
          receive.push(incomes[i]);
        }
      }
    }

    receive.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    updateReceiveSoon(receive);
  }

  function renderPaySoon(): void {
    let pay: ITransaction[] = [];

    expenses.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    for(let i = 0; i < expenses.length; i++) {
      if(expenses[i].type === "Dívida") {
        const currentDate: Date = new Date(Date.now());

        const days: number = getNumberOfDays(currentDate, expenses[i].date);

        if(days < 7 && days >= 0) {
          pay.push(expenses[i]);
        }
      }
    }

    pay.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    updatePaySoon(pay);
  }

  function renderNotPaid(): void {
    let notPaidTransactions: ITransaction[] = [];

    expenses.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    for(let i = 0; i < expenses.length; i++) {
      if(expenses[i].type === "Dívida") {
        const currentDate: Date = new Date(Date.now());

        const days: number = getNumberOfDays(currentDate, expenses[i].date);

        if(days < 0) {
          notPaidTransactions.push(expenses[i]);
        }
      }
    }

    notPaidTransactions.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    updateNotPaid(notPaidTransactions);
  }

  function renderNotReceived(): void {
    let notReceivedTransactions: ITransaction[] = [];

    incomes.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    for(let i = 0; i < incomes.length; i++) {
      if(incomes[i].type === "A receber") {
        const currentDate: Date = new Date(Date.now());

        const days: number = getNumberOfDays(currentDate, incomes[i].date);

        if(days < 0) {
          notReceivedTransactions.push(incomes[i]);
        }
      }
    }

    notReceivedTransactions.sort((a, b) => {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    updateNotReceived(notReceivedTransactions);
  }

  async function saveTransactions(): Promise<void> {
    await AsyncStorage.setItem("@incomes", JSON.stringify(incomes));
    await AsyncStorage.setItem("@expenses", JSON.stringify(expenses));
  }

  function renderWalletAmount(incomeTotal: number, expenseTotal: number): void {
    const total: number = incomeTotal - expenseTotal;

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
    renderStoredSavings();
    renderStoredIncomes();
    renderStoredExpenses();
    renderStoredRecentTransactions();
  }, []);
  
  React.useEffect(() => {
    renderIncomesAmount();
    renderReceiveAmount();
    renderRecentTransactions();
    renderToReceiveAndDebts();
    renderToReceiveSoon();
    renderPaySoon();
    renderNotPaid();
    renderNotReceived();
    saveTransactions();
  }, [incomes]);

  React.useEffect(() => {
    renderExpensesAmount();
    renderDebtsAmount();
    renderRecentTransactions();
    renderToReceiveAndDebts();
    renderToReceiveSoon();
    renderPaySoon();
    renderNotPaid();
    renderNotReceived();
    saveTransactions();
  }, [expenses]);

  return(
    <TransactionsContext.Provider
      value={{
        expenses,
        incomes,
        recentTransactions,
        receiveAndDebts,
        receiveSoon,
        paySoon,
        notPaid,
        notReceived,
        walletAmount,
        walletSavings,
        RecentTransactions,
        ReceiveAndDebts,
        ReceiveSoon,
        PaySoon,
        NotPaid,
        NotReceived,
        BiggestSpendings,
        updateTransactions,
        deleteTransaction,
        processTransaction,
        storeWalletSavings,
        resetAll,
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
  },

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

  paddingView: {
    height: 45,
  },

  button: {
    height: 60,

    marginRight: 12,
    paddingHorizontal: 12,

    borderRadius: 4,

    justifyContent: "center",
    alignItems: "center",
  },
});