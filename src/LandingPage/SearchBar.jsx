import { useState, useEffect, useRef } from "react";

const SearchBar = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mapContainerRef = useRef(null);
  const googleMapRef = useRef(null);

  useEffect(() => {
    // Load Google Maps API
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    window.document.body.appendChild(googleMapsScript);

    googleMapsScript.addEventListener("load", () => {
      // Initialize the map once Google Maps API is loaded
      const googleMap = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: 51.505, lng: -0.09 },
        zoom: 13,
      });
      googleMapRef.current = googleMap;
      setIsLoaded(true);
    });

    return () => {
      // Cleanup function to remove the script
      window.document.body.removeChild(googleMapsScript);
    };
  }, []);

  // Placeholder search bar content
  const searchBarContent = (
    <div className="search-bar">
      <input type="text" placeholder="Enter location..." />
      <button>Search</button>
    </div>
  );

  if (!isLoaded) {
    return (
      <>
        {searchBarContent}
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      {searchBarContent}
      <div
        ref={mapContainerRef}
        className="map"
        style={{ width: "100%", height: "400px" }}
      ></div>
    </>
  );
};

export default SearchBar;
