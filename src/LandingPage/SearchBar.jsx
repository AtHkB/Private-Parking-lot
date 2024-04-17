import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundImage from "../assets/a1.jpg";
import myImage from "../assets/landing.png";
import threeSteps from "../assets/lalalala.png";
import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!startDate && !endDate) {
      return;
    }

    const queryString = new URLSearchParams({
      q: query,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    }).toString();

    navigate(`/gmap?${queryString}`);
  };
  const handleFilterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };
  return (
    <div className={styles.landingWrapper}>
      <div
        className={styles.searchbar}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          minHeight: "100vh",
        }}
      >
        <div className={styles.wrapper}>
          <div className={styles.search}>
            <img src={myImage} alt="My Image" className={styles.image} />
            <form onSubmit={handleSubmit} className={styles.searchForm}>
              <div className={styles.searchInputs}>
                <input
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder="Munich"
                  className={styles.searchInput}
                />
                <label htmlFor="startDate" className={styles.label}>
                  From:
                </label>
                <DatePicker
                  id="startDate"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    if (date) {
                      // Calculate one hour ahead of start date
                      const endDate = new Date(date);
                      endDate.setHours(date.getHours() + 1);
                      setEndDate(endDate);
                    } else {
                      setEndDate(null);
                    }
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  filterTime={handleFilterPassedTime}
                  className={styles.datePicker}
                  placeholderText="Date - Time"
                />
                <span className={styles.dateSeparator}>to</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className={styles.datePicker}
                  placeholderText="Date - Time"
                  minTime={
                    startDate &&
                    endDate &&
                    startDate.getDate() === endDate.getDate()
                      ? new Date(new Date().getTime() + 60 * 60 * 1000) // Set minTime to one hour ahead of current time if start and end date are same
                      : startDate
                      ? new Date(
                          startDate.getFullYear(),
                          startDate.getMonth(),
                          startDate.getDate(),
                          8,
                          0
                        )
                      : new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          new Date().getDate(),
                          8,
                          0
                        )
                  } // Set minTime to 8:00 of start date or current day
                  maxTime={
                    endDate
                      ? new Date(
                          endDate.getFullYear(),
                          endDate.getMonth(),
                          endDate.getDate(),
                          23,
                          59,
                          59
                        )
                      : null
                  } // Set maxTime to 23:59:59 of selected "To" day
                />
                <button type="submit" className={styles.searchButton}>
                  Search
                </button>
              </div>
            </form>

            <div className={styles.item}>
              <img
                src={threeSteps}
                alt="Three Steps Image"
                className={styles.threeStepsimage}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchBar;
