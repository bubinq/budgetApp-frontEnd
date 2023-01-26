import axios from "axios";

export const instance = axios.create({
  baseURL: "https://budgetapp-react-backend.onrender.com/",
});

export const getLastThreeMonthsAmounts = async (year, month) => {
  const response = await instance.post(
    "/expenses/getLatest",
    {
      year,
      month,
    },
    { withCredentials: true }
  );
  const months = new Array(3).fill({});
  for (let i = 0; i < response.data.length; i++) {
    let currMonth = response.data[i]._id.month;
    let currYear = response.data[i].year.year;
    let totalAmount = response.data[i].totalAmount;
    if (year > currYear) {
      currMonth = 0 - i;
    }
    months[month - currMonth] = { month: currMonth, total: totalAmount };
    for (let j = 0; j < response.data[i].categories.length; j++) {
      const currCateg = response.data[i].categories[j];
      const val = response.data[i].amounts[j];
      if (months[i].hasOwnProperty(currCateg)) {
        months[i][currCateg] += val;
      } else {
        months[i][currCateg] = val;
      }
    }
  }

  return months;
};
