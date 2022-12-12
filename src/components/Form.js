import { useContext, useState, useEffect } from "react";
import { ExpenseContext } from "../context/expenseContext";
import { useTheme } from "../hooks/useTheme";
import { instance } from "../api/instance";
import { ErrorMessage } from "./ErrorMessage";
import { BudgetContext } from "../context/budgetContext";
import { useNavigate } from "react-router-dom";

export const Form = () => {
  const [error, setError] = useState({
    message: "",
  });
  const theme = useTheme();
  const navigatoTo = useNavigate();
  const { user } = useContext(BudgetContext);
  const { dispatcher } = useContext(ExpenseContext);
  const submitHandler = async (ev) => {
    ev.preventDefault();

    const { category, amount } = Object.fromEntries(new FormData(ev.target));

    if (amount.trim() && !isNaN(amount)) {
      setError({ message: "" });
    } else {
      ev.target.reset();
      setError({ message: "Please fill with correct data!" });
      return;
    }

    try {
      const response = await instance.post(
        "/expenses/create",
        {
          category,
          amount,
        },
        { withCredentials: true }
      );
      dispatcher({
        type: "ADD",
        payload: response.data,
      });
      setError({ message: "" });
      ev.target.reset();
    } catch (error) {
      const msg = error.response.data.message;
      setError({ message: msg });
    }
  };

  const handleRadirect = () => {
    if (!user) {
      navigatoTo("/login");
    }
  };

  useEffect(() => {
    const loadUserExpenses = async (id) => {
      const expenses = await instance.get(`/expenses/all/${id}`);
      dispatcher({
        type: "READ",
        payload: expenses.data,
      });
    };
    if (user?.displayName) {
      loadUserExpenses(user._id);
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div className="stepOne">
      <div className="chartHeading">
        <h1 style={{ color: theme.text }}>Transactions</h1>
      </div>
      <div className="stepsHeading">
        <h1>1. Select Category</h1>
      </div>
      <form className="transactionsForm" onSubmit={submitHandler}>
        <label className="buble" htmlFor="category">
          <select id="category" name="category">
            <option>Rent</option>
            <option>Groceries</option>
            <option>Utilities</option>
            <option>Clothes</option>
          </select>
        </label>
        <div className="stepsHeading">
          <h1>2. Select Amount</h1>
        </div>
        {error.message && <ErrorMessage message={error.message}></ErrorMessage>}
        <label className="buble" htmlFor="budget">
          <input
            onFocus={handleRadirect}
            id="budget"
            type="text"
            placeholder="Amount:"
            name="amount"
          ></input>
        </label>

        <button type="submit" className="addTransaction">
          Add Expense
        </button>
      </form>
    </div>
  );
};
