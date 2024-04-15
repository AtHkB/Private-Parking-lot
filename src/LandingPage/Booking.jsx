import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Booking.module.css";
import BookingStatus from "../enums/bookingStatus";
import Spinner from "../components/Spinner";

function Booking({ handleMessage, msg, bookings, getBookings, userId }) {
  const navigate = useNavigate();

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
      if (response.ok) {
        handleMessage("checkin was successful.");
        const data = await response.json();
        getBookings(userId);
      }
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
      if (response.ok) {
        handleMessage("checkout was successful.");
        const data = await response.json();
        getBookings(userId);
      }
    } catch (error) {
      console.error("Error fetching Bookings:", error);
    }
  };
  const noAction = async () => {
    const rand = Math.floor(Math.random() * 100);
    handleMessage(`you are already checkout!.${rand}`);
  };
  useEffect(() => {
    if (userId) {
      getBookings(userId);
    } else {
      console.log("no updated data (user)");
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
                <button className={styles.navBookingButton} onClick={noAction}>
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
