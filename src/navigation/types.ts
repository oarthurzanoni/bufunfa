import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

export type Screens = "Home" | "Settings";

export type ScreenProps<Screen extends Screens> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
