import React from "react";

interface ExpensesContextData {

}

interface ExpensesProviderProps {
  children: React.ReactNode;
}

export const ExpensesContext = React.createContext({} as ExpensesContextData);

export function ExpensesProvider({ children }: ExpensesProviderProps): JSX.Element {
  return(
    <ExpensesContext.Provider
      value={{

      }}
    >
      { children }
    </ExpensesContext.Provider>
  );
}