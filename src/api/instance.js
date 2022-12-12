import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8000/",
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
  const months = new Array(response.data.length);
  for (let i = 0; i < months.length; i++) {
    months[i] = {month: response.data[i]._id.month, total: response.data[i].totalAmount};
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
