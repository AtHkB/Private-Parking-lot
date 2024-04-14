import { useEffect, useState, useContext } from "react";
import styles from "./Booking.module.css";
import BookingStatus from "../enums/bookingStatus";

function Booking({ userinfo }) {
  const [bookings, setBookings] = useState([]);
  const userId = userinfo.userId;
  const getBookings = async (userId) => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_BOOKING_GET_BY_USER_ID}${userId}`
      );
      const data = await response.json();
      setBookings(data.booking);
      console.log("DATA: ", data);
    } catch (error) {
      console.error("Error fetching Bookings:", error);
    }
  };
  const ckeckinAction = async (bookingId, userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BOOKING_UPDATE}${bookingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingStatus: BookingStatus.CHECKIN }),
        }
      );
      const data = await response.json();
      getBookings(userId);
      console.log("DATA: ", data);
    } catch (error) {
      console.error("Error fetching Bookings:", error);
    }
  };

  const ckeckoutAction = async (bookingId, userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BOOKING_UPDATE}${bookingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingStatus: BookingStatus.CHECKOUT }),
        }
      );
      const data = await response.json();
      getBookings(userId);
      console.log("DATA: ", data);
    } catch (error) {
      console.error("Error fetching Bookings:", error);
    }
  };
  useEffect(() => {
    if (userId) {
      getBookings(userId);
    } else {
      console.log("user not set");
    }
  }, [userId]);
  return (
    <>
      &nbsp;
      {!bookings && (
        <button className={styles.navNoBookingButton}>
          Not find any reservation yet!
        </button>
      )}
      {bookings &&
        bookings.map((item, index) => {
          console.log("item", item.bookingStatus);
          return (
            <div key={index}>
              {item.bookingStatus === BookingStatus.BOOK && (
                <button
                  onClick={() => ckeckinAction(item._id, userId)}
                  className={styles.navBookingButton}
                >
                  Parking Spot - try Checkin!
                </button>
              )}
              {item.bookingStatus === BookingStatus.CHECKIN && (
                <button
                  onClick={() => ckeckoutAction(item._id, userId)}
                  className={styles.navBookingButton}
                >
                  Parking Spot - try Checkout!
                </button>
              )}
              {item.bookingStatus === BookingStatus.CHECKOUT && (
                <button className={styles.navBookingButton}>
                  Parking Spot - you are already checkout!
                </button>
              )}
            </div>
          );
        })}
    </>
  );
}

export default Booking;
