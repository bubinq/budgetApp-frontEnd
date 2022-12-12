import { useContext } from "react";
import { ExpenseContext } from "../context/expenseContext";
import _ from "lodash";
import { BudgetContext } from "../context/budgetContext";

export function useLabelData() {
  const { expenses } = useContext(ExpenseContext);
  const { budget } = useContext(BudgetContext);

  const noBudget = expenses.reduce((list, item) => list + item.amount, 0);

  const labelData = _.chain(expenses)
    .groupBy("category")
    .map((obj, idx) => {
      return {
        percentage: (_.sumBy(obj, "amount") / (budget?.amount || noBudget)) * 100,
        category: idx,
        color: obj[0].color,
      };
    })
    .value();

  return labelData;
}
