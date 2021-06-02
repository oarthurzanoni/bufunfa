import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProfileContextData {
  username: string;

  handleUsername: (username: string) => void;
}

interface ProfileProviderProps {
  children: React.ReactNode;
}

let saveTimeout: NodeJS.Timeout;

export const ProfileContext = React.createContext({} as ProfileContextData);

export function ProfileProvider({ children }: ProfileProviderProps): JSX.Element {
  const [ username, updateUsername ] = React.useState<string>("");

  async function setStoredUsername(): Promise<void> {
    const user: string | null = await AsyncStorage.getItem("@username");

    if(user) {
      updateUsername(user);
    }
  }

  async function saveUsername(name: string): Promise<void> {
    try {
      await AsyncStorage.setItem("@username", name)
        .then(() => {
          console.log(`Usuário salvo com sucesso: ${name}`);

          clearTimeout(saveTimeout);
        });
    } catch(error) {
      console.log(error);
    }
  }

  function automaticallySaveChanges(name: string): void {
    if(saveTimeout) {
      clearTimeout(saveTimeout);
    };

    saveTimeout = setTimeout(() => {
      saveUsername(name);
    }, 3000);
  }

  function handleUsername(name: string): void {
    updateUsername(name);

    automaticallySaveChanges(name);
  }

  React.useEffect(() => {
    setStoredUsername();
  }, []);

  return(
    <ProfileContext.Provider
      value={{
        username,
        handleUsername
      }}
    >
      { children }
    </ProfileContext.Provider>
  );
}