import { useContext } from "react";
import { BudgetContext } from "../context/budgetContext";

export const useTheme = () => {
  const { theme } = useContext(BudgetContext);
  const lightAndDark = {
    header: theme === "light" ? "white" : "#192235",
    side: theme === "light" ? "white" : "#3a4356",
    main: theme === "light" ? "#f9f9f9" : "#282c34",
    text: theme === "light" ? "black" : "white",
    dropDown: theme === "light" ? "white" : "#3a4356",
    dropShadow: theme === "light" && "-1px 7px 9px 1px rgba(0,0,0,0.32)",
    sideShadow: theme === "light" && "0px 9px 4px 2px rgba(0,0,0,0.32)",
  };

  return lightAndDark;
};
