import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here

    setIsLoading(true);
    setError(null);
    const { email, password } = loginData;
    const response = await fetch("http://localhost:8081/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("token", JSON.stringify(data)); /* or data.token? */
      setIsLoading(false);
      login(data.token);
    }
  };

  return (
    <div className={styles.logincontainer}>
      <form onSubmit={handleLoginSubmit} className={styles.loginForm}>
        <label htmlFor="email" className={styles.inputLabel}>
          Email
        </label>
        <input
          className={styles.inputField}
          id="email"
          type="email"
          placeholder="Email"
          required={true}
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />

        <label htmlFor="password" className={styles.inputLabel}>
          Password
        </label>
        <input
          className={styles.inputField}
          id="password"
          type="password"
          placeholder="**********"
          required={true}
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />

        <button className={styles.submitButton} type="submit">
          Login
        </button>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
