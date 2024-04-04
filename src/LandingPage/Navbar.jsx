import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
//import { Link } from "react-router-dom";
import { useJwt } from "react-jwt";
import parkLogo from "../assets/Private-parking-4-4-2024 (1).png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    logout();
  };

  const { decodedToken } = useJwt(user?.token);

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
        {user && (
          <button className={styles.navButton} onClick={handleLogOut}>
            Logout
          </button>
        )}
        {!user && (
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
};

export default Navbar;
