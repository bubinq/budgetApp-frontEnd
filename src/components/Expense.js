import { useTheme } from "../hooks/useTheme";
import dayjs from "dayjs";
import { BiTrash } from "react-icons/bi";
import { instance } from "../api/instance";
import { useContext } from "react";
import { ExpenseContext } from "../context/expenseContext";

export const Expense = ({ data }) => {
  const theme = useTheme();
  const { dispatcher } = useContext(ExpenseContext);

  const removeExpenseHandler = async () => {
    if (window.confirm("Are you sure you want to remove this expense?")) {
      await instance.delete(`/expenses/delete/${data._id}`, {
        withCredentials: true,
      });
      dispatcher({
        type: "DELETE",
        id: data._id,
      });
    }
  };
  return (
    <div className="expenseItem">
      <div className="expenseDate">
        {" "}
        <span className="dates" style={{ color: theme.text }}>
          {" "}
          {dayjs(data.createdAt).format("DD. MM - HH:mm ")}
        </span>
      </div>
      <div className="expenseCategory">
        <span style={{ color: theme.text }}>{data.category} </span>
      </div>
      <div className="expenseAmount">
        <span style={{ color: theme.text }}> ${data.amount.toFixed(2)}</span>
      </div>
      <div className="expenseRemove" onClick={removeExpenseHandler}>
        <BiTrash
          style={{
            color: theme.text,
            width: "18px",
            height: "18px",
            cursor: "pointer",
          }}
        ></BiTrash>
      </div>
    </div>
  );
};
