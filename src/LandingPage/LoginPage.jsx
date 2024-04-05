import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/backgroundLogin.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [userNormal, setUserNormal] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const handleClick = () => setUserNormal(!userNormal);
  const handleLoginSubmit = async (e) => {
    const login_URL = userNormal
      ? import.meta.env.VITE_USER_LOGIN_URL
      : import.meta.env.VITE_USER_WITH_PARKING_LOGIN_URL;
    console.log("userNormal", userNormal);
    e.preventDefault();
    // Add your login logic here

    setIsLoading(true);
    setError(null);
    const { email, password } = loginData;
    const response = await fetch(login_URL, {
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
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      login(data.token);
      navigate("/");
    }
  };

  return (
    <div
      className={styles.logincontainer}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form onSubmit={handleLoginSubmit} className={styles.loginForm}>
        <div className="loginType_container">
          <label htmlFor="loginType" className={styles.inputLabel}>
            <span>Login as Parking Owner:</span>
            <input
              id="loginType"
              type="checkbox"
              value={userNormal}
              onChange={handleClick}
            />
          </label>
        </div>

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
