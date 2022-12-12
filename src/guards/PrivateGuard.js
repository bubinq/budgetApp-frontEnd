import { useContext } from "react";
import { BudgetContext } from "../context/budgetContext";
import { Outlet, Navigate } from "react-router";

export const PrivateGuard = () => {
  const { user } = useContext(BudgetContext);
  if (!user) {
    return <Navigate to="/login" replace></Navigate>;
  } else {
    return <Outlet />;
  }
};
