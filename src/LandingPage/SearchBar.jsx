import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundImage from "../assets/background2.jpg";
import myImage from "../assets/landing.png";
import threeSteps from "../assets/3.png";
import styles from "./SearchBar.module.css";
import Spinner from "../components/Spinner";

const SearchBar = ({ onSearch, onSearchWithCriteria }) => {
  const [query, setQuery] = React.useState("");
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [loading, setLoading] = React.useState(false); // Add loading state

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    // Make handleSubmit async
    event.preventDefault();
    setLoading(true); // Set loading state to true when search starts
    if (startDate && endDate) {
      await onSearchWithCriteria(query, startDate, endDate); // Await the search with criteria
    } else {
      await onSearch(query); // Await the normal search
    }
    setLoading(false); // Set loading state to false when search completes
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
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className={styles.datePicker}
                  placeholderText="Date - Time"
                />
                <span className={styles.dateSeparator}>to</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className={styles.datePicker}
                  placeholderText="Date - Time"
                />
                <button type="submit" className={styles.searchButton}>
                  Search
                </button>
              </div>
            </form>
            {loading && <Spinner />} {/* Display spinner if loading */}
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
