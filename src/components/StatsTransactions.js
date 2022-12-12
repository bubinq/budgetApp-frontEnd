import { useContext, useEffect, useState } from "react";
import { Expense } from "./Expense";
import { instance } from "../api/instance";
import { BudgetContext } from "../context/budgetContext";
import { ExpenseContext } from "../context/expenseContext";

export const StatsTransactions = ({ year, month }) => {
  const [expenses, setExpenses] = useState([]);
  const { user } = useContext(BudgetContext);
  const { expensesStorage } = useContext(ExpenseContext);

  useEffect(() => {
    const loadMonthlyExpenses = async (id) => {
      const expenses = await instance.post(
        `/expenses/monthly/${id}`,
        {
          year: parseInt(year),
          month: parseInt(month),
        },
        { withCredentials: true }
      );
      setExpenses(expenses.data);
    };
    if (user?.displayName) {
      loadMonthlyExpenses(user?._id);
    }
    //eslint-disable-next-line
  }, [year, month, expensesStorage]);
  return (
    <div className="statsTransactionsWrapper">
      <h1>Transactions</h1>
      <div className="tansactionsHeading">
        <span style={{ color: "rgb(255, 72, 136)" }}>Date</span>
        <span style={{ color: "rgb(255, 72, 136)" }}>Category</span>
        <span style={{ color: "rgb(255, 72, 136)" }}>Amount</span>
        <span style={{ color: "rgb(255, 72, 136)" }}>Remove</span>
      </div>
      <div className="expensesWrapper">
        {expenses.map((expense) => (
          <Expense key={expense._id} data={expense}></Expense>
        ))}
      </div>
    </div>
  );
};
