import { createContext, useEffect, useReducer } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const TotalDistributionContext = createContext();

function totalExpensesManager(state, action) {
  switch (action.type) {
    case "READ":
      return [...action.payload];

    default:
      return state;
  }
}

function totalExpensesInitializer() {
  const session = JSON.parse(sessionStorage.getItem("total"));
  return session || [];
}

export const TotalDistributionProvider = ({ children }) => {
  const [totalExpenses, dispatch] = useReducer(
    totalExpensesManager,
    [],
    totalExpensesInitializer
  );
  const [totalExpensesStorage, setTotalExpensesStorage] = useSessionStorage("TotalExpenses");

  useEffect(() => {
    setTotalExpensesStorage(totalExpenses);
    //eslint-disable-next-line
  }, [totalExpenses]);

  return (
    <TotalDistributionContext.Provider
      value={{
        totalExpenses,
        dispatch,
        totalExpensesStorage,
      }}
    >
      {children}
    </TotalDistributionContext.Provider>
  );
};
