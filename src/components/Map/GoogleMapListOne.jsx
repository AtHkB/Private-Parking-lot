import { useEffect, useState, useRef } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { svgMarker, encodeSVG } from "./helpers/svgHelper";
import styles from "./MapPage.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthToken from "../../helpers/useAuthToken";
import Footer from "../Footer/Footer";
import { SpinnerDotted } from "spinners-react";

const GoogleMapListOne = ({ token, msg, handleMessage }) => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const decodeTokenData = useAuthToken(token);
  const [position, setPosition] = useState({
    lat: 48.13299255224677,
    lng: 11.58192322563543,
  });

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [searchParams] = useSearchParams();
  const [locations, setLocations] = useState([]);

  const handleMarkerCilick = (evt) => {
    // console.log(evt.latLng.lat(), evt.latLng.lng());
    const location = findLocationByLatLng(
      locations,
      evt.latLng.lat(),
      evt.latLng.lng()
    );
    setSelectedPosition(location);
  };

  const findLocationByLatLng = (locationsArray, lat, lng) => {
    return locationsArray.find((location) =>
      location.location.some((coord) => coord.lat === lat && coord.lng === lng)
    );
  };

  const handleBooking = async () => {
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const { id } = selectedPosition;
    // console.log("user", decodeTokenData.userId);
    // console.log("token", token);

    const response = await fetch(import.meta.env.VITE_BOOKING_CREATE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: decodeTokenData.userId,
        parkingspotID: id,
        startDate,
        endDate,
      }),
    });
    const data = await response.json();
    //console.log("data", data?.message);
    const message = data?.message
      ? "The parking is not available, please change the desired Time or Spot."
      : "Booking is done successfuly.";

    const rand = Math.floor(Math.random() * 100);
    handleMessage(`${message}${rand}`);
    if (message.includes("successful")) {
      return navigate("/");
    }
  };
  const onMarkerDragEnd = (evt) => {
    console.log(evt.latLng.lat(), evt.latLng.lng());
    setSelectedPosition({ lat: evt.latLng.lat(), lng: evt.latLng.lng() });
  };
  useEffect(() => {
    const getLocations = async () => {
      try {
        let response = await fetch(import.meta.env.VITE_LOCATION_GET_ALL);
        response = await response.text();
        response = response.replaceAll("_id", "id");
        const data = await JSON.parse(response);
        setLocations(data.parkinSpot);
        //        console.log("DATA: ", data);
      } catch (error) {
        console.error("Error fetching Locations:", error);
      }
    };
    getLocations();
  }, []);

  return (
    <>
      <div className={styles.mapPageContainer}>
        {locations.length == 0 && (
          <div className={styles.spinnerContainer}>
            <SpinnerDotted
              size={90}
              thickness={145}
              speed={100}
              color="rgba(57, 105, 172, 1)"
            />
          </div>
        )}
        {locations.length !== 0 && (
          <>
            {selectedPosition ? (
              <div className={styles.suggestionCardsContainer}>
                <div
                  className={styles.suggestionCard}
                  key={selectedPosition.id}
                >
                  <h3 className={styles.streetName}>
                    {selectedPosition.title}
                  </h3>
                  <h3 className={styles.hourlyPrice}>
                    Street:&nbsp;
                    {selectedPosition.streetName} &nbsp;&nbsp; Number:&nbsp;
                    {selectedPosition.hauseNumber}
                  </h3>
                  <h3 className={styles.hourlyPrice}>
                    Postal Code:&nbsp;
                    {selectedPosition.postalCode}&nbsp;&nbsp;&nbsp; Price:&nbsp;
                    €{selectedPosition.price}
                  </h3>
                  <p className={styles.bookButtonContainer}>
                    <button onClick={handleBooking}>Book</button>
                    <button
                      onClick={() => {
                        setSelectedPosition(null);
                      }}
                    >
                      back
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.suggestionCardsContainer}>
                {locations.map((parking) => (
                  <div className={styles.suggestionCard} key={parking.id}>
                    <h3 className={styles.streetName}>{parking.title}</h3>
                    <h3 className={styles.hourlyPrice}>
                      Price: €{parking.price}
                    </h3>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.map}>
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
                <Map
                  style={{ width: "80vw", height: "100vh" }}
                  defaultCenter={position}
                  defaultZoom={12}
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                  mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
                >
                  {locations &&
                    locations.map((item) => {
                      const price = item.price; //'full'
                      const color = "#253d5f"; //#cccccc full
                      const priceTagSvg = svgMarker(price, color);
                      return (
                        <Marker
                          key={item.id}
                          position={item.location[0]}
                          icon={{
                            // path: google.maps.SymbolPath.CIRCLE,
                            url: encodeSVG(priceTagSvg),
                            fillColor: "#EB00FF",
                            scale: 7,
                          }}
                          onClick={handleMarkerCilick}
                          draggable={true}
                          onDragEnd={onMarkerDragEnd}
                        />
                      );
                    })}
                </Map>
              </APIProvider>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default GoogleMapListOne;
