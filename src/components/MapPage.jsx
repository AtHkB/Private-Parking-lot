import { useEffect, useState } from "react";
import parkings from "../api/parkings.json";

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

  return (
    <div className="mapPageContainer m-2 flex gap-2">
      <div className="suggestionCardsContainer w-1/4 ">
        {parkings.map((parking) => {
          return (
            <div
              className="border rounded shadow min-h-24 pb-2 mb-2 "
              key={parking._id}
            >
              <h3 className="font-medium px-2 text-center  bg-red-600">
                Street name(from form)
              </h3>
              <h3 className="px-2 text-center mt-5">
                Hourly Price: ${parking.location.hourlyPrice}
              </h3>
              <a href=""></a>
            </div>
          );
        })}
      </div>
      <div className="map bg-green-200 w-3/4 mb-2">
        <h1 className="font-medium text-center">Map</h1>
      </div>
    </div>
  );
}
