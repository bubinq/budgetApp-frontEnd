import { useContext } from "react";
import "../App.css";
import { instance } from "../api/instance";
import { BudgetContext } from "../context/budgetContext";
import { Link } from "react-router-dom";
import { BsFillSunFill } from "react-icons/bs";
import { useTheme } from "../hooks/useTheme";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const {
    toggleHandler,
    user,
    setUser,
    toggleTheme,
    theme,
    dropDownToggle,
    setDropDownToggle,
  } = useContext(BudgetContext);
  const lightOrDark = useTheme();
  const { pathname } = useLocation();

  const handleDropDown = (ev) => {
    ev.stopPropagation();
    setDropDownToggle(true);
  };

  const logoutHandler = async (ev) => {
    ev.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      await instance.get("auth/logout", { withCredentials: true });
      setUser(null);
      sessionStorage.clear();
      window.location.reload();
    }
  };

  return (
    <header
      className="headerWrapper"
      style={{ backgroundColor: lightOrDark.header }}
    >
      <div className="headerContent">
        <div className="menuWrapper">
          <div className="menu" onClick={toggleHandler}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="heading">
            <h1>{pathname === "/" ? "Manage Expenses" : "Account Stats"}</h1>
          </div>
        </div>

        <div
          className="settings"
          onClick={() => {
            setDropDownToggle(!dropDownToggle);
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3405/3405846.png"
            alt="Settings icon"
          />
          {dropDownToggle && (
            <div
              className="dropDown"
              style={{
                backgroundColor: lightOrDark.dropDown,
                boxShadow: lightOrDark.dropShadow,
              }}
              onClick={handleDropDown}
            >
              <div className="dropDownHeading">
                <span>Settings</span>
              </div>
              <div className="themeSlider">
                <div className="textAndIcon">
                  <BsFillSunFill
                    style={{
                      color: lightOrDark.text,
                      width: "22px",
                      height: "22px",
                    }}
                  ></BsFillSunFill>
                  <span
                    className="themeText"
                    style={{ color: lightOrDark.text }}
                  >
                    {theme === "dark" ? "Dark" : "Light"}
                  </span>
                </div>

                <label className="switch" htmlFor="checkbox">
                  <input type="checkbox" id="checkbox" onClick={toggleTheme} />
                  <div className="slider round"></div>
                </label>
              </div>

              <div className="profileSection">
                <div className="profile">
                  <div className="profileIcon">
                    {user && (
                      <img src={user.profileUrl} alt="User profile"></img>
                    )}
                  </div>
                  <div className="profileName">
                    <span style={{ color: lightOrDark.text }}>
                      {user?.displayName}
                    </span>
                  </div>
                </div>

                {!user ? (
                  <Link to="/login" style={{ color: lightOrDark.text }}>
                    Log In
                  </Link>
                ) : (
                  <Link
                    to="/"
                    style={{ color: lightOrDark.text }}
                    onClick={logoutHandler}
                  >
                    Log Out
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
