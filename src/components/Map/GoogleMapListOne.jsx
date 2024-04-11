import { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { svgMarker, encodeSVG } from "./helpers/svgHelper";
import styles from "../MapPage.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import locationsString from "../../api/getAllLocations";
import { SpinnerDotted } from "spinners-react";
import Footer from "../Footer";

const GoogleMapListOne = (user) => {
  const navigate = useNavigate();
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [searchParams] = useSearchParams();
  //const parkings = JSON.parse(locationsString.replaceAll("_id", "id"));
  //const [locations, setLocations] = useState(parkings.parkinSpot);
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
    console.log("uuser", user.user);
    const response = await fetch(import.meta.env.VITE_BOOKING_CREATE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: user.user.id,
        parkingspotID: id,
        startDate,
        endDate,
      }),
    });
    const data = await response.json();
    console.log("data", data?.message);
    const message = data?.message
      ? "in this time booking not posible please change yout time ot spot."
      : "booking done successful.";
    localStorage.setItem(
      "booking-request-response-message",
      JSON.stringify(message)
    );
    return navigate("/");
  };
  useEffect(() => {
    const getLocations = async () => {
      try {
        let response = await fetch(import.meta.env.VITE_LOCATION_GET_ALL);
        response = await response.text();
        response = response.replaceAll("_id", "id");
        const data = await JSON.parse(response);
        setLocations(data.parkinSpot);
        console.log("DATA: ", data);
      } catch (error) {
        console.error("Error fetching Locations:", error);
      }
    };
    getLocations();
  }, []);
  return (
    <div>
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
                    Street:{selectedPosition.streetName} &nbsp;&nbsp;&nbsp;
                    number:
                    {selectedPosition.hauseNumber}
                  </h3>
                  <h3 className={styles.hourlyPrice}>
                    Postal:
                    {selectedPosition.postalCode}&nbsp;&nbsp;&nbsp; Price:&nbsp;
                    €{selectedPosition.price}
                  </h3>
                  <h3 className={styles.hourlyPrice}>
                    <button onClick={handleBooking}>Book!</button>
                    <button
                      onClick={() => {
                        setSelectedPosition(null);
                      }}
                    >
                      back!
                    </button>
                  </h3>
                </div>
              </div>
            ) : (
              <div className={styles.suggestionCardsContainer}>
                {locations.map((parking) => (
                  <div className={styles.suggestionCard} key={parking.id}>
                    <h3 className={styles.streetName}>{parking.title}</h3>
                    <h3 className={styles.hourlyPrice}>
                      Price: ${parking.price}
                    </h3>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.map}>
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
                <Map
                  style={{ width: "80vw", height: "100vh" }}
                  center={locations[0].location[0]}
                  defaultZoom={12}
                  gestureHandling={"greedy"}
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
    </div>
  );
};

export default GoogleMapListOne;
