import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

type Screens = "Home" | "Profile";

export type ScreenProps<Screen extends Screens> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;
