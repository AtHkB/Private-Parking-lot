import { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../context/authContext";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styles from "./Contact.module.css";
import backgroundImage from "../assets/parkingLot.jpeg";
import { useParams, useNavigate } from "react-router";
import { SpinnerDotted } from "spinners-react";

const Contact = () => {
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
  const [currentPosition, setCurrentPosition] = useState(null);
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
    console.log("Signup data:", signupData);
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
        <form /* onSubmit={handleSignupSubmit} */ className={styles.signupForm}>
          <div className={styles.checkboxWrapper}>
            <h4>Contact-form</h4>
          </div>

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

          <label htmlFor="instructions" className={styles.inputLabel}>
            Contact us
          </label>
          <textarea
            className={styles.textarea}
            id="instructions"
            placeholder="Contact"
            required={true}
            value={signupData.note}
            onChange={(e) =>
              setSignupData({ ...signupData, note: e.target.value })
            }
          ></textarea>

          <button
            className={styles.submitButton}
            type="submit"
            onClick={handleSignupSubmit}
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
