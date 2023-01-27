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
  console.log(response.data);
  const months = new Array(3).fill({});
  for (let i = 0; i < response.data.length; i++) {
    let currMonth = response.data[i]._id.month;
    let diffIdx = month - currMonth;
    if (diffIdx < 0) {
      diffIdx = month + i;
    }
    let totalAmount = response.data[i].totalAmount;
    months[diffIdx] = { month: currMonth, total: totalAmount };
    for (let j = 0; j < response.data[i].categories.length; j++) {
      const currCateg = response.data[i].categories[j];
      const val = response.data[i].amounts[j];
      if (months[diffIdx].hasOwnProperty(currCateg)) {
        months[diffIdx][currCateg] += val;
      } else {
        months[diffIdx][currCateg] = val;
      }
    }
  }

  return months;
};
