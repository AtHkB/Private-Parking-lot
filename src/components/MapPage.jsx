import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useParams } from "react-router";
import parkings from "../api/parkings.json";
import { Link } from "react-router-dom";

export default function MapPage() {
  /* const API = "http://localhost:8081/suggestedParkings"; 
  const [parkings, setParkings] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        setParkings(parkings);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []); */
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
      <div className="map bg-green-200 w-3/4 mb-2 min-h-screen">
        <h1 className="font-medium text-center">Map</h1>
      </div>
    </div>
  );
}
