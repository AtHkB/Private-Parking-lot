import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Booking.module.css";
import BookingStatus from "../../enums/bookingStatus";

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
        handleMessage("Check in was successful.");
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
        handleMessage("Check out was successful.");
        const data = await response.json();
        getBookings(userId);
      }
    } catch (error) {
      console.error("Error fetching Bookings:", error);
    }
  };
  const noAction = async () => {
    const rand = Math.floor(Math.random() * 100);
    handleMessage(`you already checked out!.${rand}`);
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
          Not found any reservations yet!
        </button>
      )}
      {bookings &&
        bookings.map((item, index) => {
          return (
            <div key={index}>
              {item.bookingStatus === BookingStatus.BOOK && (
                <div
                  onClick={() => ckeckinAction(item._id, userId)}
                  className={styles.ticket}
                  role="img"
                  aria-label="A jagged admit one pink ticket, with serial number 123456 over a white background"
                >
                  <p className={styles.ticketp}>
                    <span className={styles.ticketSpan}>
                      Check in!
                      <br /> {item?.parkingSpots[0]?.streetName}
                    </span>
                  </p>
                </div>
              )}
              {item.bookingStatus === BookingStatus.CHECKIN && (
                <div
                  onClick={() => ckeckoutAction(item._id, userId)}
                  className={styles.ticket}
                  role="img"
                  aria-label="A jagged admit one pink ticket, with serial number 123456 over a white background"
                >
                  <p className={styles.ticketp}>
                    <span className={styles.ticketSpan}>
                      Check out!
                      <br /> {item?.parkingSpots[0]?.streetName}
                    </span>
                  </p>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}

export default Booking;
