import { useNavigate } from "react-router-dom";

import parkLogo from "../assets/PProyal1 (1).png";
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

    <nav className="flex items-center justify-between align-bottom px-4 py-2 bg-white-900">
      <div className="flex items-center">
        <div>
          <img
            src={parkLogo}
            alt="Park Logo"
            style={{ width: "100px", height: "auto", marginLeft: "1rem" }}
          />
        </div>
      </div>

      <div>
        <button
          className="px-3 py-1 text-lg font-semibold text-indigo-950 bg-white rounded-md hover:text-rose-500 focus:outline-none focus:text-rose-300"
          onClick={handleLoginClick}
        >
          Login
        </button>
        <button
          className="ml-2 px-3 py-1 text-lg font-semibold text-indigo-950 bg-white rounded-md hover:text-rose-500 focus:outline-none focus:text-rose-300"
          onClick={handleSignupClick}
        >
          Sign Up
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
