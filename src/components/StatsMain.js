import { useState } from "react";
import { Chart } from "react-google-charts";
import { useGooglePieData } from "../hooks/useGooglePieData";
import { useTheme } from "../hooks/useTheme";
import { useGoogleBarData } from "../hooks/useGoogleBarData";
import { StatsTransactions } from "./StatsTransactions";
import { useWindowResize } from "../hooks/useWindowResize";

export const StatsMain = () => {
  const size = useWindowResize();
  const theme = useTheme();
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const { data, options } = useGooglePieData(year, month);
  const { barData, barOptions } = useGoogleBarData(year, month);

  const monthHandler = (ev) => {
    setMonth(parseInt(ev.target.value));
  };

  const yearHandler = (ev) => {
    setYear(parseInt(ev.target.value));
  };

  return (
    <>
      <div className="mainWrapper" style={{ backgroundColor: theme.main }}>
        <div className="dateSelect">
          <form className="dateForm">
            <div className="yearWrapper">
              <label htmlFor="year" style={{ color: theme.text }}>
                Year
              </label>
              <select
                id="year"
                style={{ color: theme.text, backgroundColor: theme.side }}
                className="yearSelect"
                defaultValue={year}
                name="year"
                onChange={yearHandler}
              >
                <option value={2016}>2016</option>
                <option value={2017}>2017</option>
                <option value={2018}>2018</option>
                <option value={2019}>2019</option>
                <option value={2020}>2020</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
              </select>
            </div>
            <div className="monthWrapper">
              <label htmlFor="month" style={{ color: theme.text }}>
                Month
              </label>
              <select
                id="month"
                style={{ color: theme.text, backgroundColor: theme.side }}
                className="monthSelect"
                name="month"
                defaultValue={month}
                onChange={monthHandler}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
              </select>
            </div>
          </form>
        </div>
        <div className="pieChartWrapper">
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"300px"}
            height={"350px"}
          />
        </div>
        <div className="barChartWrapper">
          <Chart
            chartType="BarChart"
            width={size.width > 578 ? "550px" : "350px"}
            height={"350px"}
            data={barData}
            options={barOptions}
          />
        </div>
      </div>
      <StatsTransactions year={year} month={month}></StatsTransactions>
    </>
  );
};
