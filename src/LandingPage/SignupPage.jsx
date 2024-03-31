import { useState } from "react";
/*import "./LandingPage/AuthPage.css"; */

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log("Signup data:", signupData);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignupSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={signupData.confirmPassword}
            onChange={(e) =>
              setSignupData({ ...signupData, confirmPassword: e.target.value })
            }
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
