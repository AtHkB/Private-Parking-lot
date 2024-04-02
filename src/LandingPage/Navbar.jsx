import { useNavigate } from "react-router-dom";
import parkLogo from "../assets/parkRed.gif";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { useJwt } from "react-jwt";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, token } = useContext(AuthContext);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    logout();
  };

  const { decodedToken } = useJwt(token);

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <nav className="flex items-center justify-between px-9 py-5 bg-white-900">
      {/* Logo */}
      <div>
        <img src={parkLogo} alt="Park Logo" className="w-24 h-auto" />
      </div>

      {/* Login and Sign Up buttons */}
      <div className="flex items-center">
        {token !== null && (
          <div>
            <span style={{ padding: "10px" }}>Hello, {decodedToken?.name}</span>
            <button
              className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleClick}
            >
              Log out
            </button>
          </div>
        )}
        {token === null && (
          <div className="flex items-center">
            <button
              className="ml-4 px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="ml-4 px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleSignupClick}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
