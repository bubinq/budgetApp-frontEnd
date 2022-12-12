import { createContext, useEffect, useReducer, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const BudgetContext = createContext();

function budgetManager(state, action) {
  switch (action.type) {
    case "GET":
    case "ADD":
    case "EDIT":
      return  {...action.payload};

    default:
      return state;
  }
}

function budgetInitializer() {
  const session = JSON.parse(sessionStorage.getItem("budget"));
  return session || [];
}

export const BudgetProvider = ({ children }) => {
  const [budget, dispatcher] = useReducer(budgetManager, [], budgetInitializer);
  const [budgetSession, setBudgetSession] = useSessionStorage("budget");
  const [user, setUser] = useSessionStorage("user");
  const [theme, setTheme] = useState("dark");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropDownToggle, setDropDownToggle] = useState(false);

  const selectMenuHandler = (type) => {
    setSelectedMenu(type);
  };

  const toggleHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const dropDownHandler = (value) => {
    if (!value) {
      setDropDownToggle(value);
    } else {
      setDropDownToggle(!dropDownToggle);
    }
  };

  useEffect(() => {
    setBudgetSession(budget);
    //eslint-disable-next-line
  }, [budget]);

  return (
    <BudgetContext.Provider
      value={{
        selectedMenu,
        selectMenuHandler,
        toggleHandler,
        toggleMenu,
        user,
        setUser,
        dropDownHandler,
        dropDownToggle,
        setDropDownToggle,
        theme,
        setTheme,
        toggleTheme,
        budget,
        dispatcher,
        budgetSession,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
