import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundImage from "../assets/a1.jpg";
import myImage from "../assets/landing.png";
import threeSteps from "../assets/lalalala.png";
import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const queryString = new URLSearchParams({
      q: query,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    }).toString();

    navigate(`/gmap?${queryString}`);
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
                  placeholder="Search"
                  className={styles.searchInput}
                />
                <label htmlFor="startDate" className={styles.label}>
                  From:
                </label>
                <DatePicker
                  id="startDate"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className={styles.datePicker}
                  placeholderText="Select Date"
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
    </div>
  );
};

export default SearchBar;
