import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import styles from "./SignupPage.module.css";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    location: "",
    postalCode: "",
    streetName: "",
    houseNumber: "",
    instructions: "",
    idCard: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8081/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signupData.email,
        password: signupData.password,
        fullName: signupData.fullName,
        postalcode: signupData.postalCode,
        streetNumber: signupData.streetName,
        houseNumber: signupData.houseNumber,
        instructions: signupData.instructions,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("token", data.token);
      setIsLoading(false);
      login(data.token);
    }
  };

  return (
    <div className={styles.signupcontainer}>
      <form onSubmit={handleSignupSubmit} className={styles.signupForm}>
        {/* Form fields */}
        <button className={styles.button} type="submit">
          Sign Up
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default SignupPage;
