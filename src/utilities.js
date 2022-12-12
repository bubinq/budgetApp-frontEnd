export function getBudgetColor(budget, current) {
  let rate = current / budget;
  let color = "#05f505";
  if (rate < 0.75) {
    color = "#f5dd05";
  }
  if (rate < 0.5) {
    color = "#f58105";
  }
  if (rate < 0.25) {
    color = "#f52505";
  }
  return color;
}

export const colors = {
  Rent: "rgb(78, 99, 71)",
  Utilities: "rgb(78, 99, 174)",
  Clothes: "rgb(78, 30, 174)",
  Groceries: "rgb(236, 30, 174)",
};

export const getLastThreeMonths = (year, month) => {
  let months = [];
  for (let i = 3; i > 0; i--) {
    months.push(
      new Date(year, month - i).toLocaleString("default", { month: "long" })
    );
  }
  return months;
};
