import styles from "./Register.module.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../api/instance";
import { ErrorMessage } from "../components/ErrorMessage";
import { BudgetContext } from "../context/budgetContext";

export const Register = () => {
  const { setUser } = useContext(BudgetContext);
  const [error, setError] = useState({
    message: "",
    triggered: false,
  });
  const [isFocused, setFocus] = useState({
    displayName: false,
    email: false,
    profileUrl: false,
    password: false,
    repass: false,
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

  const registerHandler = async (ev) => {
    ev.preventDefault();

    const { displayName, email, profileUrl, password, repass } =
      Object.fromEntries(new FormData(ev.target));
    try {
      const response = await instance.post(
        "/auth/register",
        {
          displayName,
          email,
          profileUrl,
          password,
          repass,
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
    <div className={styles.registerWrapper}>
      <div className={styles.registerContent}>
        <h3>Create account</h3>
        <div className={styles.textWrapper}>
          <span>Already have an account?</span>
          <Link to="/login">Sign In</Link>
        </div>
        {error.triggered && (
          <ErrorMessage message={error.message}></ErrorMessage>
        )}
        <form onSubmit={registerHandler}>
          <div className={styles.emailWrapper}>
            <label
              htmlFor="displayName"
              className={
                isFocused.displayName
                  ? `${styles.focused} `
                  : `${styles.labels}`
              }
            >
              Name
            </label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              onBlur={labelHandler}
              onFocus={labelHandler}
              autoComplete="off"
              required
            />
          </div>
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
              htmlFor="profileUrl"
              className={
                isFocused.profileUrl ? `${styles.focused}` : `${styles.labels}`
              }
            >
              Profile Url
            </label>
            <input
              type="text"
              name="profileUrl"
              id="profileUrl"
              onBlur={labelHandler}
              onFocus={labelHandler}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.emailWrapper}>
            <label
              htmlFor="password"
              className={isFocused.password ? `${styles.focused}` : `${styles.labels}`}
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

          <div className={styles.emailWrapper}>
            <label
              htmlFor="repass"
              className={isFocused.repass ? `${styles.focused}` : `${styles.labels}`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="repass"
              id="repass"
              onBlur={labelHandler}
              onFocus={labelHandler}
              required
            />
          </div>

          <div className={styles.authBtn}>
            <button>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};
