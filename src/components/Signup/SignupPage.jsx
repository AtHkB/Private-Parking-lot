import { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/authContext";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styles from "./SignupPage.module.css";
import backgroundImage from "../../assets/parkingLot.jpeg";
import { useNavigate } from "react-router";
import { SpinnerDotted } from "spinners-react";
import Footer from "../Footer/Footer";

const SignupPage = () => {
  const navigate = useNavigate();
  const [sendLocation, setSendLocation] = useState(null);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    location: "",
    postalCode: "",
    streetName: "",
    houseNumber: "",
    title: "",
    price: "",
    note: "",
    idCard: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const [isParkingOwner, setIsParkingOwner] = useState(false); // State for checkbox

  // BEGINNING OF MAP INSERTION
  const [showModal, setShowModal] = useState(false);
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 48.13299255224677,
    lng: 11.58192322563543,
  });
  const [selectedPosition, setSelectedPosition] = useState(null);

  const containerStyle = {
    width: "400PX",
    height: "400PX",
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition(currentPosition);
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
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
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
  // END OF MAP INSERTION

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError(null);

    let endpoint = import.meta.env.VITE_USER_SIGNUP_URL;
    let requestBody = {
      email: signupData.email,
      password: signupData.password,
      fullName: signupData.fullName,
    };
    if (isParkingOwner) {
      endpoint = import.meta.env.VITE_USER_WITH_PARKING_SIGNUP_URL;
      requestBody = {
        ...requestBody,
        location: sendLocation,
        postalCode: signupData.postalCode,
        streetName: signupData.streetName,
        hauseNumber: signupData.houseNumber,
        title: signupData.title,
        price: Number(signupData.price),
        note: signupData.note,
      };
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
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

      setSignupData({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        location: "",
        postalCode: "",
        streetName: "",
        houseNumber: "",
        title: "",
        price: "",
        note: "",
        idCard: null,
      });

      // Redirect the user to the landing page
      navigate("/");
    }
  };

  const handleSelectLocation = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSaveLocation = (latitude, longitude) => {
    const locationString = `${latitude},${longitude}`;
    setSignupData({ ...signupData, location: locationString });
    setShowModal(false);
    let myJSONString = `[{ "lat": ${latitude}, "lng": ${longitude} }]`;
    let myObj = JSON.parse(myJSONString);
    setSendLocation(myObj);
  };

  return (
    <>
      <div
        className={styles.signupcontainer}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <SpinnerDotted
              size={90}
              thickness={145}
              speed={100}
              color="rgba(57, 105, 172, 1)"
            />
          </div>
        ) : (
          <form className={styles.signupForm}>
            <div className={styles.checkboxWrapper}>
              <h4>Are you a parking owner?</h4>
              <input
                id="checkboxInput"
                type="checkbox"
                className={styles.checkboxInput}
                checked={isParkingOwner}
                onChange={(e) => setIsParkingOwner(e.target.checked)}
              />
              <label htmlFor="checkboxInput" className={styles.rocker}>
                <span className={styles.switchLeft}>Yes</span>
                <span className={styles.switchRight}>No</span>
              </label>
            </div>

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
                setSignupData({
                  ...signupData,
                  confirmPassword: e.target.value,
                })
              }
            />

            {/* Render additional fields if user is a parking owner */}
            {isParkingOwner && (
              <>
                <label htmlFor="title" className={styles.inputLabel}>
                  Neighbourhood
                </label>
                <input
                  className={styles.inputField}
                  id="title"
                  type="text"
                  placeholder="Neighbourhood"
                  required={true}
                  value={signupData.title}
                  onChange={(e) =>
                    setSignupData({ ...signupData, title: e.target.value })
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
                    setSignupData({
                      ...signupData,
                      houseNumber: e.target.value,
                    })
                  }
                />
                <label htmlFor="price" className={styles.inputLabel}>
                  Price €
                </label>
                <input
                  className={styles.inputField}
                  id="price"
                  type="number"
                  placeholder="Price €"
                  required={true}
                  value={signupData.price}
                  onChange={(e) =>
                    setSignupData({ ...signupData, price: e.target.value })
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
                  value={signupData.note}
                  onChange={(e) =>
                    setSignupData({ ...signupData, note: e.target.value })
                  }
                ></textarea>

                <label htmlFor="idCard" className={styles.inputLabelID}>
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
                  className={styles.fileInput}
                />

                {/* Render the location select button */}
                <div className={styles.mapContainer}>
                  <button
                    className={styles.button}
                    onClick={handleSelectLocation}
                  >
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
                  <span className={styles.selectedFile}>
                    {signupData.idCard.name}
                  </span>
                )}
              </>
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
                      zoom={12}
                      onLoad={onLoad}
                      onUnmount={onUnmount}
                    >
                      {selectedPosition && (
                        <Marker position={selectedPosition} />
                      )}
                    </GoogleMap>
                  ) : (
                    <div>Loading...</div>
                  )}
                  <button
                    className={styles.button}
                    onClick={() =>
                      handleSaveLocation(
                        selectedPosition.lat,
                        selectedPosition.lng
                      )
                    }
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

            <button
              className={styles.submitButton}
              type="submit"
              onClick={handleSignupSubmit}
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
