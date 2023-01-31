import { useContext, useState } from "react";
import { instance } from "../api/instance";
import { BudgetContext } from "../context/budgetContext";
import { useTheme } from "../hooks/useTheme";

export const BudgetModal = ({ show, type, current }) => {
  const [allocated, setAllocated] = useState(1);
  const { dispatcher } = useContext(BudgetContext);
  const theme = useTheme();

  const submitNewBudget = async (ev) => {
    ev.preventDefault();
    if (type === "Decrease" && current < allocated) {
      alert("Cannot withdraw more than currently available!")
      return;
    }
    const newBudget = await instance.put(
      "/budget/edit",
      {
        amount: allocated,
        type,
      },
      { withCredentials: true }
    );
    dispatcher({
      type: "GET",
      payload: newBudget.data
    })
    show(false);
  };
  return (
    <>
      <div
        className="overlay"
        onClick={() => {
          show(false);
        }}
      ></div>
      <div className="budgetModal">
        <form onSubmit={submitNewBudget}>
          <label htmlFor="amount" style={{color: theme.text}}>{type} Amount:</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min={1}
            value={allocated}
            onChange={(ev) => {
              setAllocated(ev.target.value);
            }}
          ></input>
          <button className="budgetBtn" type="submit">{type}</button>
        </form>
      </div>
    </>
  );
};
