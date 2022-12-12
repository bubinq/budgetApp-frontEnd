import { useContext } from "react";
import { ExpenseContext } from "../context/expenseContext";
import _ from "lodash";

export function useGraphData() {
  const { expenses } = useContext(ExpenseContext);

  const colors = _.chain(expenses)
    .map((obj) => obj.color)
    .uniq()
    .value();
  const amountByCategory = _.chain(expenses)
    .groupBy("category")
    .map((obj) => {
      return _.sumBy(obj, "amount");
    })
    .value();
  const config = {
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "Expenses",
          data: amountByCategory,
          backgroundColor: colors,
          hoverOffset: 3,
          borderRadius: 25,
          spacing: 20,
        },
      ],
    },

    options: {
      cutout: 125,
      radius: 150,
    },
  };
  return config;
}
