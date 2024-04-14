import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import useAuthToken from "../helpers/useAuthToken";
import parkLogo from "../assets/Private-parking-4-4-2024 (1).png";
import styles from "./Navbar.module.css";
import Booking from "./Booking";

function Navbar({ token }) {
  const decodeTokenData = useAuthToken(token);
  //console.log("decodeTokenData", decodeTokenData);
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const bookingResponse = localStorage.getItem(
    "booking-request-response-message"
  );
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    logout();
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src={parkLogo} alt="Park Logo" className={styles.logo} />
        </Link>
      </div>

      <div className={styles.linksContainer}>
        {bookingResponse && <p>{bookingResponse}</p>}
        {token && (
          <>
            <Booking userinfo={decodeTokenData} />
            <button className={styles.navButton} onClick={handleLogOut}>
              Logout
            </button>
            <span>{decodeTokenData.fullName}</span>
          </>
        )}
        {!token && (
          <>
            <button className={styles.navButton} onClick={handleLoginClick}>
              Login
            </button>
            <button className={styles.navButton} onClick={handleSignupClick}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
