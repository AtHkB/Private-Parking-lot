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
    // Add your signup logic here
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8081/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signupData.email,
        password: signupData.password,
        fullName: signupData.fullName,
        location: signupData.location,
        postalCode: signupData.postalCode,
        streetName: signupData.streetName,
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
      localStorage.setItem("token", data.token); /* or data.token? */
      setIsLoading(false);
      login(data.token);
    }
    console.log("Signup data:", signupData);
  };

  return (
    <div className={styles.signupcontainer}>
      <form onSubmit={handleSignupSubmit} className={styles.signupForm}>
        <label htmlFor="email" className={styles.inputLabel}>
          Email
        </label>
        <input
          className={styles.inputField}
          id="email"
          type="email"
          placeholder="Email"
          required={true}
          value={signupData.email}
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
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
          value={signupData.password}
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
        />

        <label htmlFor="confirmPassword" className={styles.inputLabel}>
          Confirm Password
        </label>
        <input
          className={styles.inputField}
          id="confirmPassword"
          type="password"
          placeholder="**********"
          required={true}
          value={signupData.confirmPassword}
          onChange={(e) =>
            setSignupData({ ...signupData, confirmPassword: e.target.value })
          }
        />

        <label htmlFor="fullName" className={styles.inputLabel}>
          Full Name
        </label>
        <input
          className={styles.inputField}
          id="fullName"
          type="text"
          placeholder="Full Name"
          required={true}
          value={signupData.fullName}
          onChange={(e) =>
            setSignupData({ ...signupData, fullName: e.target.value })
          }
        />

        <label htmlFor="location" className={styles.inputLabel}>
          Location
        </label>
        <input
          className={styles.inputField}
          id="location"
          type="text"
          placeholder="Location"
          required={true}
          value={signupData.location}
          onChange={(e) =>
            setSignupData({ ...signupData, location: e.target.value })
          }
        />

        <label htmlFor="postalCode" className={styles.inputLabel}>
          Postal Code
        </label>
        <input
          className={styles.inputField}
          id="postalCode"
          type="text"
          placeholder="Postal Code"
          required={true}
          value={signupData.postalCode}
          onChange={(e) =>
            setSignupData({ ...signupData, postalCode: e.target.value })
          }
        />

        <label htmlFor="streetName" className={styles.inputLabel}>
          Street Name
        </label>
        <input
          className={styles.inputField}
          id="streetName"
          type="text"
          placeholder="Street Name"
          required={true}
          value={signupData.streetName}
          onChange={(e) =>
            setSignupData({ ...signupData, streetName: e.target.value })
          }
        />

        <label htmlFor="houseNumber" className={styles.inputLabel}>
          House Number
        </label>
        <input
          className={styles.inputField}
          id="houseNumber"
          type="text"
          placeholder="House Number"
          required={true}
          value={signupData.houseNumber}
          onChange={(e) =>
            setSignupData({ ...signupData, houseNumber: e.target.value })
          }
        />

        <label htmlFor="instructions" className={styles.inputLabel}>
          Instructions to Access the Parking
        </label>
        <textarea
          className={styles.textareaField}
          id="instructions"
          placeholder="Instructions to Access the Parking"
          required={true}
          value={signupData.instructions}
          onChange={(e) =>
            setSignupData({ ...signupData, instructions: e.target.value })
          }
        ></textarea>

        <label htmlFor="idCard" className={styles.inputLabel}>
          Upload ID Card
        </label>
        <input
          type="file"
          id="idCard"
          accept=".jpg, .jpeg, .png, .pdf"
          required={true}
          onChange={(e) =>
            setSignupData({ ...signupData, idCard: e.target.files[0] })
          }
          className={styles.fileInput}
        />
        {signupData.idCard && (
          <span className={styles.selectedFile}>{signupData.idCard.name}</span>
        )}

        <button className={styles.submitButton} type="submit">
          Sign Up
        </button>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default SignupPage;
