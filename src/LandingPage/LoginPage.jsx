import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useContext(AuthContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here

    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8081/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("token", JSON.stringify(data)); /* or data.token? */
      setIsLoading(false);
      login(data.token);
    }
  };

  console.log("Login data:", loginData);

  return (
    <div className="logincontainer flex items-center">
      <form
        onSubmit={handleLoginSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 ml-[34%] w-96"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="email"
            placeholder="Email"
            required={true}
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
            required={true}
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="**********"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            Login
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
      {/* <p className="text-center text-gray-500 text-xs">
        &copy;2024 Private Parking All rights reserved.
      </p> */}
    </div>
  );
};

export default LoginPage;
