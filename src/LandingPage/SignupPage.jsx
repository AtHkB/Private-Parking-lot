import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
/*import "./LandingPage/AuthPage.css"; */

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
        postalcode: signupData.postalCode,
        streetNumber: signupData.streetName,
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
    <div className="logincontainer flex items-center">
      <form
        onSubmit={handleSignupSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 ml-[34%] w-96"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            required={true}
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="**********"
            required={true}
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="**********"
            required={true}
            value={signupData.confirmPassword}
            onChange={(e) =>
              setSignupData({ ...signupData, confirmPassword: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullName"
            type="text"
            placeholder="Full Name"
            required={true}
            value={signupData.fullName}
            onChange={(e) =>
              setSignupData({ ...signupData, fullName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location {/* change later */}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            placeholder="Location"
            required={true}
            value={signupData.location}
            onChange={(e) =>
              setSignupData({ ...signupData, location: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="postalCode"
          >
            Postal Code
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="postalCode"
            type="text"
            placeholder="Postal Code"
            required={true}
            value={signupData.postalCode}
            onChange={(e) =>
              setSignupData({ ...signupData, postalCode: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="streetName"
          >
            Street Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="streetName"
            type="text"
            placeholder="Street Name"
            required={true}
            value={signupData.streetName}
            onChange={(e) =>
              setSignupData({ ...signupData, streetName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="houseNumber"
          >
            House Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="houseNumber"
            type="text"
            placeholder="House Number"
            required={true}
            value={signupData.houseNumber}
            onChange={(e) =>
              setSignupData({ ...signupData, houseNumber: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="instructions"
          >
            Instructions to Access the Parking
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="instructions"
            placeholder="Instructions to Access the Parking"
            required={true}
            value={signupData.instructions}
            onChange={(e) =>
              setSignupData({ ...signupData, instructions: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="idCard"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload ID Card
          </label>
          {/* Hidden file input */}
          <input
            type="file"
            id="idCard"
            accept=".jpg, .jpeg, .png, .pdf"
            required={true}
            onChange={(e) =>
              setSignupData({ ...signupData, idCard: e.target.files[0] })
            }
            className="hidden"
          />
          {/* Custom-styled button */}
          <label
            htmlFor="idCard"
            className="cursor-pointer bg-slate-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Choose File
          </label>
          {/* Optionally, display the selected file name */}
          {signupData.idCard && (
            <span className="ml-2">{signupData.idCard.name}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
