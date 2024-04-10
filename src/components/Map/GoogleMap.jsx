import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
// get map id because of using the marker : goo.le/get-map-id
function GoogleMap() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    lat: 50.10515050495977,
    lng: 8.662006384546398,
  });

  const onMarkerDragEnd = (evt) => {
    console.log(evt.latLng.lat(), evt.latLng.lng());
    setPosition({ lat: evt.latLng.lat(), lng: evt.latLng.lng() });
  };
  const handleMarkerCilick = (evt) => {
    console.log(evt.latLng.lat(), evt.latLng.lng());
    setPosition({ lat: evt.latLng.lat(), lng: evt.latLng.lng() });
    setOpen(true);
  };
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={position}
        defaultZoom={12}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
      >
        <AdvancedMarker
          position={position}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          onClick={handleMarkerCilick}
        >
          <Pin
            background={"grey"}
            borderColor={"green"}
            glyphColor={"purple"}
          />
        </AdvancedMarker>
        {open && (
          <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
            <p>I am in this</p>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}

export default GoogleMap;
// <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
//   <Map
//     style={{ width: "100vw", height: "100vh" }}
//     center={locations[0].location[0]}
//     defaultZoom={12}
//     gestureHandling={"greedy"}
//   >
//     {locations &&
//       locations.map((item) => {
//         return (
//           <Marker
//             key={item.id}
//             position={item.location[0]}
//             icon={{
//               // path: google.maps.SymbolPath.CIRCLE,
//               url: encodeSVG(priceTagSvg),
//               fillColor: "#EB00FF",
//               scale: 7,
//             }}
//             onClick={handleMarkerCilick}
//           />
//         );
//       })}
//   </Map>
// </APIProvider>
