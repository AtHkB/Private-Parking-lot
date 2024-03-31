import { useNavigate } from "react-router-dom";
import parkLogo from "../assets/parkRed.gif";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={parkLogo} alt="Park Logo" className="logo-image" />
      </div>

      <div className="buttons">
        <button className="login-btn" onClick={handleLoginClick}>
          Login
        </button>
        <button className="signup-btn" onClick={handleSignupClick}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
