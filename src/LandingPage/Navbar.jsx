import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import useAuthToken from "../helpers/useAuthToken";
import useBookings from "../helpers/useBookings";
import parkLogo from "../assets/Private-parking-4-4-2024 (1).png";
import styles from "./Navbar.module.css";
import Booking from "./Booking";
import Message from "../components/Messages";

function Navbar({ token, msg, handleMessage }) {
  const navigate = useNavigate();
  const { userId, fullName } = useAuthToken(token);
  const { bookings, getBookings } = useBookings(userId);

  const { logout } = useContext(AuthContext);

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

  useEffect(() => {
    if (msg) {
      handleMessage(msg);
    }
  }, [msg]);
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src={parkLogo} alt="Park Logo" className={styles.logo} />
        </Link>
      </div>

      <div className={styles.linksContainer}>
        {msg && <Message message={msg} autoCloseTime={5000} />}
        {token && (
          <>
            <Booking
              userId={userId}
              msg={msg}
              handleMessage={handleMessage}
              bookings={bookings}
              getBookings={getBookings}
            />
            <button className={styles.navButton} onClick={handleLogOut}>
              Logout
            </button>
            <span>{fullName}</span>
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
