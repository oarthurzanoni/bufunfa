import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

interface UserContextData {
  name: string;
  isLoadingUser: boolean;
  willSaveNameChanges: boolean;
  handleChangeUsername: (name: string) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

let saveTimeout: NodeJS.Timeout;
export const SAVE_NAME_CHANGES_TIMEOUT = 2000;

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [name, setName] = useState<string>("");
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [willSaveNameChanges, setWillSaveNameChanges] =
    useState<boolean>(false);

  async function loadUsername() {
    const username = await AsyncStorage.getItem("@username");

    if (username) {
      setName(username);
    }

    setIsLoadingUser(false);
  }

  async function saveUsername(name: string) {
    try {
      await AsyncStorage.setItem("@username", name).then(() => {
        console.log(`Name successfully saved: ${name}`);

        clearTimeout(saveTimeout);
        setWillSaveNameChanges(false);
      });
    } catch (error) {
      console.error(error);
    }
  }

  function saveChanges(name: string) {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    setWillSaveNameChanges(true);
    saveTimeout = setTimeout(() => {
      saveUsername(name);
    }, SAVE_NAME_CHANGES_TIMEOUT);
  }

  function handleChangeUsername(name: string) {
    setName(name);
    saveChanges(name);
  }

  useEffect(() => {
    loadUsername();
  }, []);

  return (
    <UserContext.Provider
      value={{ name, isLoadingUser, handleChangeUsername, willSaveNameChanges }}
    >
      {children}
    </UserContext.Provider>
  );
}
