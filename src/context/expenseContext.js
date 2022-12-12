import { createContext, useEffect, useReducer } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const ExpenseContext = createContext();

function expensesManager(state, action) {
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

function expensesInitializer() {
  const session = JSON.parse(sessionStorage.getItem("expenses"));
  return session || [];
}

export const ExpenseProvider = ({ children }) => {
  const [expenses, dispatcher] = useReducer(
    expensesManager,
    [],
    expensesInitializer
  );
  const [expensesStorage, setExpensesStorage] = useSessionStorage("expenses");

  useEffect(() => {
    setExpensesStorage(expenses);
    //eslint-disable-next-line
  }, [expenses]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        dispatcher,
        expensesStorage,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
