import { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../context/authContext";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styles from "./SignupPage.module.css";
import backgroundImage from "../assets/parkingLot.jpeg";
import { useParams } from "react-router";

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
  /* BEGINNING OF MAP INSERTION */
  const [showModal, setShowModal] = useState(false); // Modal component's state
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const { id } = useParams();
  const [selectedParking, setSelectedParking] = useState(null);

  const containerStyle = {
    width: "400PX",
    height: "400PX",
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          setSelectedPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(currentPosition);
      map.fitBounds(bounds);
      setMap(map);

      map.addListener("click", (event) => {
        setSelectedPosition({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      });
    },
    [currentPosition]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  /* END OF MAP INSERTION */

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Add your signup logic here
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8081/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signupData.email,
        password: signupData.password,
        fullName: signupData.fullName,
        location: signupData.location,
        postalCode: signupData.postalCode,
        streetName: signupData.streetName,
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
      localStorage.setItem("token", data.token);
      setIsLoading(false);
      login(data.token);
    }
    console.log("Signup data:", signupData);
  };

  // Function to handle selecting location on map
  const handleSelectLocation = () => {
    setShowModal(true);
  };

  // Function to handle saving location and closing modal
  const handleSaveLocation = (location) => {
    setSignupData({ ...signupData, location });
    setShowModal(false);
  };

  return (
    <div
      className={styles.signupcontainer}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form onSubmit={handleSignupSubmit} className={styles.signupForm}>
        <label htmlFor="email" className={styles.inputLabel}>
          Email
        </label>
        <input
          className={styles.inputField}
          id="email"
          type="email"
          placeholder="Email"
          required={true}
          value={signupData.email}
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
          }
        />

        <label htmlFor="password" className={styles.inputLabel}>
          Password
        </label>
        <input
          className={styles.inputField}
          id="password"
          type="password"
          placeholder="**********"
          required={true}
          value={signupData.password}
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
        />

        <label htmlFor="confirmPassword" className={styles.inputLabel}>
          Confirm Password
        </label>
        <input
          className={styles.inputField}
          id="confirmPassword"
          type="password"
          placeholder="**********"
          required={true}
          value={signupData.confirmPassword}
          onChange={(e) =>
            setSignupData({ ...signupData, confirmPassword: e.target.value })
          }
        />

        <label htmlFor="fullName" className={styles.inputLabel}>
          Full Name
        </label>
        <input
          className={styles.inputField}
          id="fullName"
          type="text"
          placeholder="Full Name"
          required={true}
          value={signupData.fullName}
          onChange={(e) =>
            setSignupData({ ...signupData, fullName: e.target.value })
          }
        />

        <label htmlFor="postalCode" className={styles.inputLabel}>
          Postal Code
        </label>
        <input
          className={styles.inputField}
          id="postalCode"
          type="text"
          placeholder="Postal Code"
          required={true}
          value={signupData.postalCode}
          onChange={(e) =>
            setSignupData({ ...signupData, postalCode: e.target.value })
          }
        />

        <label htmlFor="streetName" className={styles.inputLabel}>
          Street Name
        </label>
        <input
          className={styles.inputField}
          id="streetName"
          type="text"
          placeholder="Street Name"
          required={true}
          value={signupData.streetName}
          onChange={(e) =>
            setSignupData({ ...signupData, streetName: e.target.value })
          }
        />

        <label htmlFor="houseNumber" className={styles.inputLabel}>
          House Number
        </label>
        <input
          className={styles.inputField}
          id="houseNumber"
          type="text"
          placeholder="House Number"
          required={true}
          value={signupData.houseNumber}
          onChange={(e) =>
            setSignupData({ ...signupData, houseNumber: e.target.value })
          }
        />

        <label htmlFor="instructions" className={styles.inputLabel}>
          Instructions to Access the Parking
        </label>
        <textarea
          className={styles.textarea}
          id="instructions"
          placeholder="Instructions"
          required={true}
          value={signupData.instructions}
          onChange={(e) =>
            setSignupData({ ...signupData, instructions: e.target.value })
          }
        ></textarea>

        <label htmlFor="idCard" className={styles.inputLabel}>
          Upload ID Card
        </label>

        <input
          type="file"
          id="idCard"
          accept=".jpg, .jpeg, .png, .pdf"
          required={true}
          onChange={(e) =>
            setSignupData({ ...signupData, idCard: e.target.files[0] })
          }
          className={styles.fileInput} // Keep this class for custom styling
        />
        <label htmlFor="idCard" className={styles.customFileButton}>
          Choose File
        </label>

        {/* SELECT LOCATION */}
        <div className={styles.mapContainer}>
          <button className={styles.button} onClick={handleSelectLocation}>
            Select Location on Map
          </button>
          {/* Display selected location here */}
          {signupData.location && (
            <div className={styles.selectedLocation}>
              Selected Location: {signupData.location}
            </div>
          )}
        </div>

        {signupData.idCard && (
          <span className={styles.selectedFile}>{signupData.idCard.name}</span>
        )}

        {error && <div className={styles.error}>{error}</div>}
        {/* Modal for selecting location on map */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2>Select Location on Map</h2>
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={currentPosition}
                  zoom={10}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {selectedPosition && <Marker position={selectedPosition} />}
                </GoogleMap>
              ) : (
                <div>Loading...</div>
              )}
              <button
                className={styles.button}
                onClick={() => handleSaveLocation("Selected Location")}
              >
                Save Location
              </button>
              <button
                className={styles.button}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <button className={styles.submitButton} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
