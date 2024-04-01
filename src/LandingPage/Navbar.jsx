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
    <nav className="flex items-center justify-between align-bottom px-9 py-5 bg-white-900">
      <div className="flex items-center">
        <div className="w-24">
          <img src={parkLogo} alt="Park Logo" className="w-full h-auto" />
        </div>
      </div>

      <div>
        <button
          className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
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
    </nav>
  );
};

export default Navbar;
