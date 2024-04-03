import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/authContext";
import { useParams } from "react-router";
import parkings from "../api/parkings.json";
import { Link } from "react-router-dom";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

export default function MapPage() {
  const [map, setMap] = useState(null);

  const containerStyle = {
    width: "73vw",
    height: "100vh",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const { id } = useParams();
  const [selectedParking, setSelectedParking] = useState(null);

  useEffect(() => {
    if (id) {
      const parking = parkings.find((parking) => parking.id === parseInt(id));
      setSelectedParking(parking);
    } else {
      setSelectedParking(null);
    }
  }, [id]);

  return (
    <div className="mapPageContainer m-2 flex gap-2 min-h-screen">
      {selectedParking ? (
        <div className="suggestionCardsContainer w-1/4 ">
          <div
            className="border rounded shadow min-h-24 pb-2 mb-2 "
            key={selectedParking.id}
          >
            <h3 className="font-medium px-2 text-center  bg-red-600">
              Street name(from form)
            </h3>
            <h3 className="px-2 text-center mt-5">
              Hourly Price: ${selectedParking.location.hourlyPrice}
            </h3>
          </div>
        </div>
      ) : (
        <div className="suggestionCardsContainer w-1/4 min-h-screen">
          {parkings.map((parking) => (
            <Link to={`details/${parking.id}`} key={parking.id}>
              <div
                className="border rounded shadow min-h-24 pb-2 mb-2 "
                key={parking.id}
              >
                <h3 className="font-medium px-2 text-center  bg-red-600">
                  Street name(from form)
                </h3>
                <h3 className="px-2 text-center mt-5">
                  Hourly Price: ${parking.location.hourlyPrice}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="map w-3/4 mb-2 min-h-screen">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
