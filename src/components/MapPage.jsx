import { useEffect, useState, useContext, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { AuthContext } from "../context/authContext";
import { useParams } from "react-router";
import parkings from "../api/parkings.json";
import { Link } from "react-router-dom";
import styles from "./MapPage.module.css";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { id } = useParams();
  const [selectedParking, setSelectedParking] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const getSearchParams = () => {
    return new URLSearchParams(location.search);
  };

  useEffect(() => {
    const queryParams = getSearchParams();

    const query = queryParams.get("q");
    const startDate = queryParams.get("startDate");
    const endDate = queryParams.get("endDate");

    console.log("Query:", query);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    // fetching parking spots based on query, startDate, and endDate goes here
    if (id) {
      const parking = parkings.find((parking) => parking.id === parseInt(id));
      setSelectedParking(parking);
    } else {
      setSelectedParking(null);
    }
  }, [location.search]);

  const containerStyle = {
    width: "73vw",
    height: "100vh",
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          setSelectedPosition({ lat: latitude, lng: longitude });
          setIsLoading(false); // Turn off loading state after getting position
        },
        (error) => {
          console.error(error);
          setIsLoading(false); // Turn off loading state on error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLoading(false); // Turn off loading state if geolocation not supported
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

  return (
    <>
      <div className={styles.mapPageContainer}>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <SpinnerDotted
              size={90}
              thickness={145}
              speed={100}
              color="rgba(57, 105, 172, 1)"
            />
          </div>
        ) : selectedParking ? (
          <div className={styles.suggestionCardsContainer}>
            <div className={styles.suggestionCard} key={selectedParking.id}>
              <h3 className={styles.streetName}>Street name(from form)</h3>
              <h3 className={styles.hourlyPrice}>
                Hourly Price: ${selectedParking.location.hourlyPrice}
              </h3>
            </div>
          </div>
        ) : (
          <div className={styles.suggestionCardsContainer}>
            {parkings.map((parking) => (
              <Link
                className={styles.link}
                to={`details/${parking.id}`}
                key={parking.id}
              >
                <div className={styles.suggestionCard} key={parking.id}>
                  <h3 className={styles.streetName}>Street name(from form)</h3>
                  <h3 className={styles.hourlyPrice}>
                    Hourly Price: ${parking.location.hourlyPrice}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className={styles.map}>
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
            <div className={styles.spinnerContainer}>
              <SpinnerDotted
                size={90}
                thickness={145}
                speed={100}
                color="rgba(57, 105, 172, 1)"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
