import { createContext, useEffect, useReducer } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const MonthlyDistributionContext = createContext();

function monthlyExpensesManager(state, action) {
  switch (action.type) {
    case "READ":
      return [...action.payload];
    case "ADD":
      return [...state, { ...action.payload }];
    case "DELETE":
      return [...state.filter((expense) => expense._id !== action.id)];

    default:
      return state;
  }
}

function monthlyExpensesInitializer() {
  const session = JSON.parse(sessionStorage.getItem("monthly"));
  return session || [];
}

export const MonthlyDistributionProvider = ({ children }) => {
  const [monthlyExpenses, dispatcher] = useReducer(
    monthlyExpensesManager,
    [],
    monthlyExpensesInitializer
  );
  const [monthlyExpensesStorage, setMonthlyExpensesStorage] = useSessionStorage("monthlyExpenses");

  useEffect(() => {
    setMonthlyExpensesStorage(monthlyExpenses);
    //eslint-disable-next-line
  }, [monthlyExpenses]);

  return (
    <MonthlyDistributionContext.Provider
      value={{
        monthlyExpenses,
        dispatcher,
        monthlyExpensesStorage,
      }}
    >
      {children}
    </MonthlyDistributionContext.Provider>
  );
};
