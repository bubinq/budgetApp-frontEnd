import { useTheme } from "../hooks/useTheme";
import { BiSend } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { instance } from "../api/instance";
import { BudgetContext } from "../context/budgetContext";
import { ErrorMessage } from "./ErrorMessage";
import { ExpenseContext } from "../context/expenseContext";
import { useNavigate } from "react-router-dom";
import { getBudgetColor } from "../utilities";
import { BsPlusCircle } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import { BudgetModal } from "./BudgetModal";

export const BudgetForm = () => {
  const theme = useTheme();
  const { dispatcher, budget, user } = useContext(BudgetContext);
  const { expenses } = useContext(ExpenseContext);
  const [error, setError] = useState({ message: "" });
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetType, setBudgetType] = useState("");
  const navigatoTo = useNavigate();

  const totalExpenses = expenses.reduce(
    (sum, currAmount) => sum + currAmount.amount,
    0
  );

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const { amount } = Object.fromEntries(new FormData(ev.target));

    if (amount.trim() && !isNaN(amount)) {
      setError({ message: "" });
    } else {
      ev.target.reset();
      setError({ message: "Please fill with correct data!" });
      return;
    }

    try {
      const response = await instance.post(
        "/budget/create",
        {
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

  const handleRedirect = () => {
    if (!user) {
      navigatoTo("/login");
    }
  };

  const showBudgetModalHandler = (type) => {
    setBudgetType(type)
    setShowBudgetModal(!showBudgetModal);
  };

  useEffect(() => {
    const loadBudget = async (id) => {
      const userBudget = await instance.get(`budget/get/${id}`);
      dispatcher({
        type: "GET",
        payload: userBudget.data,
      });
    };
    if (user?.displayName) {
      loadBudget(user._id);
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div className="budgetTotal">
      <h1 style={{ color: theme.text }}>Budget Total:</h1>
      {!budget?.amount && (
        <form onSubmit={handleSubmit}>
          <input
            style={{ color: theme.text }}
            className="budgetInput"
            onFocus={handleRedirect}
            type="text"
            placeholder="Set Budget"
            name="amount"
          ></input>
          <button className="sendBudget">
            <BiSend
              style={{ color: theme.text, width: "20px", height: "20px" }}
            ></BiSend>
          </button>
        </form>
      )}

      {error.message && <ErrorMessage message={error.message}></ErrorMessage>}
      {budget?.amount && (
        <>
          <div className="budgetWrapper">
            <BsPlusCircle
              onClick={() => showBudgetModalHandler("Increase")}
              style={{
                color: theme.text,
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
            ></BsPlusCircle>
            <span className="budgetAmount" style={{ color: theme.text }}>
              Initial: ${budget.amount}
            </span>
            <FiMinusCircle
              onClick={() => showBudgetModalHandler("Decrease")}
              style={{
                color: theme.text,
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
            ></FiMinusCircle>
          </div>

          <span
            style={{
              color: getBudgetColor(
                budget.amount,
                budget.amount - totalExpenses
              ),
            }}
          >
            Current: ${budget.amount - totalExpenses}
          </span>
        </>
      )}
      {showBudgetModal && <BudgetModal show={setShowBudgetModal} type={budgetType} current={budget.amount - totalExpenses}></BudgetModal>}
    </div>
  );
};
