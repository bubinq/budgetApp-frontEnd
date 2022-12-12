import styles from "./Login.module.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../api/instance";
import { ErrorMessage } from "../components/ErrorMessage";
import { BudgetContext } from "../context/budgetContext";

export const Login = () => {
  const { setUser } = useContext(BudgetContext);
  const [error, setError] = useState({
    message: "",
    triggered: false,
  });
  const [isFocused, setFocus] = useState({
    email: false,
    password: false,
  });
  const navigateTo = useNavigate();

  const labelHandler = (ev) => {
    let input = ev.target;
    if (input.value.trim()) {
      setFocus((oldFocus) => ({ ...oldFocus, [input.name]: true }));
      return;
    }
    setFocus((oldFocus) => ({
      ...oldFocus,
      [input.name]: !isFocused[`${input.name}`],
    }));
  };

  const loginHandler = async (ev) => {
    ev.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(ev.target));
    try {
      const response = await instance.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setUser(response.data);
      setError({ triggered: false, message: "" });
      navigateTo("/", { replace: true });
    } catch (error) {
      const msg = error.response.data.message;
      setError({ triggered: true, message: msg });
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContent}>
        <h3>Welcome back</h3>
        <div className={styles.textWrapper}>
          <span>Don't have an account?</span>
          <Link to="/register">Sign Up</Link>
        </div>
        {error.triggered && (
          <ErrorMessage message={error.message}></ErrorMessage>
        )}
        <form onSubmit={loginHandler}>
          <div className={styles.emailWrapper}>
            <label
              htmlFor="email"
              className={
                isFocused.email ? `${styles.focused}` : `${styles.labels}`
              }
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onBlur={labelHandler}
              onFocus={labelHandler}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.emailWrapper}>
            <label
              htmlFor="password"
              className={
                isFocused.password ? `${styles.focused}` : `${styles.labels}`
              }
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onBlur={labelHandler}
              onFocus={labelHandler}
              required
            />
          </div>

          <div className={styles.authBtn}>
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
