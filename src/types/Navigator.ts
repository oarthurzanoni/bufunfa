import { ITransaction } from "../providers/Transactions";

export type StackParamList = {
  Home: undefined;
  Profile: undefined;
  About: undefined;
  Donate: undefined;
  Wallet: undefined;
  Transaction: { defaultTransaction: string };
  Details: undefined;
  RecentTransactions: undefined;
  ReceiveAndDebts: undefined;
  ReceiveSoon: undefined;
  PaySoon: undefined;
  NotPaid: undefined;
  NotReceived: undefined;
}