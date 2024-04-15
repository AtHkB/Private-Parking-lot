import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function useBookings(userId) {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const getBookings = async (userId) => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_BOOKING_GET_BY_USER_ID}${userId}`
      );
      const data = await response.json();
      setBookings(data.booking);
    } catch (error) {
      console.error("Error fetching Bookings:", error);
    }
  };
  useEffect(() => {
    if (userId) {
      getBookings(userId);
    } else {
      setBookings([]);
    }
  }, [location]);
  return { bookings, getBookings };
}
export default useBookings;
