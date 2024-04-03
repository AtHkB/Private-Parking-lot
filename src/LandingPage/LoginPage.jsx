import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useContext(AuthContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8081/user/login", {
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
      localStorage.setItem("token", JSON.stringify(data));
      setIsLoading(false);
      login(data.token);
    }
  };

  console.log("Login data:", loginData);

  return (
    <div className={styles.logincontainer}>
      <form onSubmit={handleLoginSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Email
          </label>
          <input
            className={styles.input}
            id="username"
            type="email"
            placeholder="Email"
            required={true}
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            className={styles.input}
            id="password"
            type="password"
            placeholder="**********"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>
        <button className={styles.button} type="submit">
          Login
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
