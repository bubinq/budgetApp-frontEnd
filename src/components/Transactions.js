import { useContext, useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { Expense } from "./Expense";
import { instance } from "../api/instance";
import { BudgetContext } from "../context/budgetContext";
import { ExpenseContext } from "../context/expenseContext";
import { useWindowResize } from "../hooks/useWindowResize";

export const Transactions = () => {
  const theme = useTheme();
  const size = useWindowResize();
  const [recentExpenses, setRecentExpenses] = useState([]);
  const { user } = useContext(BudgetContext);
  const { expensesStorage } = useContext(ExpenseContext);

  useEffect(() => {
    const loadRecentUserExpenses = async (id) => {
      const expenses = await instance.get(`/expenses/recent/${id}`);
      setRecentExpenses(expenses.data);
    };
    if (user?.displayName) {
      loadRecentUserExpenses(user._id);
    }
    //eslint-disable-next-line
  }, [expensesStorage]);
  return (
    <div className="transactionsWrapper">
      <h1 style={{ color: theme.text }}>Transaction History</h1>
      <div className="transactionsHeading">
        {size.width > 574 && (
          <span style={{ color: "rgb(255, 72, 136)" }}>Date</span>
        )}
        <span style={{ color: "rgb(255, 72, 136)" }}>Category</span>
        <span style={{ color: "rgb(255, 72, 136)" }}>Amount</span>
        <span style={{ color: "rgb(255, 72, 136)" }}>Remove</span>
      </div>
      <div className="expensesWrapper">
        {recentExpenses.map((expense) => (
          <Expense key={expense._id} data={expense}></Expense>
        ))}
      </div>
    </div>
  );
};
