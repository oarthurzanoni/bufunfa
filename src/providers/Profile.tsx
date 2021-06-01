import React, { ReactNode } from "react";

interface ProfileContextData {
  username: string;

  handleUsername: (username: string) => void;
}

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileContext = React.createContext({} as ProfileContextData);

export function ProfileProvider({ children }: ProfileProviderProps): JSX.Element {
  const [ username, updateUsername ] = React.useState("");

  function handleUsername(username: string): void {
    updateUsername(username);
  }

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