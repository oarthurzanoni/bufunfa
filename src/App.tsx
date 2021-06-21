import React from "react";
import {
  StatusBar
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
import AboutScreen from "./screens/About";
import DonateScreen from "./screens/Donate";
import WalletScreen from "./screens/Wallet";
import TransactionScreen from "./screens/Transaction";
import RecentTransactionsScreen from "./screens/RecentTransactions";
import ReceiveAndDebtsScreen from "./screens/ReceiveAndDebts";
import ReceiveSoonScreen from "./screens/ReceiveSoon";
import PaySoonScreen from "./screens/PaySoon";
import NotPaidScreen from "./screens/NotPaid";
import NotReceivedScreen from "./screens/NotReceived";
import DetailsScreen from "./screens/Details";

import { ProfileProvider } from "./providers/Profile";
import { TransactionsProvider } from "./providers/Transactions";

import { StackParamList } from "./types/Navigator";

const Stack = createStackNavigator<StackParamList>();

export default function App(): JSX.Element {
  const [ fontsLoaded ] = useFonts({
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
    return(
      <NavigationContainer>
        <TransactionsProvider>
          <ProfileProvider>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#ffffff"
            />
            <Stack.Navigator>
              <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
              <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
              <Stack.Screen options={{ headerShown: false }} name="About" component={AboutScreen} />
              <Stack.Screen options={{ headerShown: false }} name="Donate" component={DonateScreen} />
              <Stack.Screen options={{ headerShown: false }} name="Wallet" component={WalletScreen} />
              <Stack.Screen options={{ headerShown: false }} name="Transaction" component={TransactionScreen} />
              <Stack.Screen options={{ headerShown: false }} name="RecentTransactions" component={RecentTransactionsScreen} />
              <Stack.Screen options={{ headerShown: false }} name="ReceiveAndDebts" component={ReceiveAndDebtsScreen} />
              <Stack.Screen options={{ headerShown: false }} name="ReceiveSoon" component={ReceiveSoonScreen} />
              <Stack.Screen options={{ headerShown: false }} name="PaySoon" component={PaySoonScreen} />
              <Stack.Screen options={{ headerShown: false }} name="NotPaid" component={NotPaidScreen} />
              <Stack.Screen options={{ headerShown: false }} name="NotReceived" component={NotReceivedScreen} />
              <Stack.Screen options={{ headerShown: false }} name="Details" component={DetailsScreen} />
            </Stack.Navigator>
          </ProfileProvider>
        </TransactionsProvider>
      </NavigationContainer>
    );
  }
}