import { useTheme } from "../hooks/useTheme";
import { Chart, ArcElement } from "chart.js";
import { useGraphData } from "../hooks/useGraphData";
import { Doughnut } from "react-chartjs-2";
import { Form } from "./Form";
import { BudgetForm } from "./BudgetForm";
import { LabelsList } from "./LabelsList";
import { Transactions } from "./Transactions";
Chart.register(ArcElement);

export const Main = () => {
  const theme = useTheme();
  const config = useGraphData();

  return (
    <>
      <div className="mainWrapper" style={{ backgroundColor: theme.main }}>
        <div className="chartWrapper">
          <div className="chartHeading">
            <h1 style={{ color: theme.text }}>Expenses</h1>
          </div>
          <Doughnut {...config}></Doughnut>
          <LabelsList></LabelsList>
        </div>
        <BudgetForm></BudgetForm>
        <Form></Form>
      </div>
      <Transactions></Transactions>
    </>
  );
};
