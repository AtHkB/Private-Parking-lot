import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = ({ onSearch, onSearchWithCriteria }) => {
  const [query, setQuery] = React.useState("");
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (startDate && endDate) {
      onSearchWithCriteria(query, startDate, endDate);
    } else {
      onSearch(query);
    }
  };

  return (
    <div
      className="relative flex items-center"
      style={{
        backgroundImage: `url('/background-image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* <p className="text-2xl text-red-500 mt-20 mb-4  text-decoration-color: #fff;">
        Book a car park space by the hour, day or month
      </p> */}
      <form
        onSubmit={handleSubmit}
        className="w-3/4 mx-auto border border-blue-400 rounded-2xl p-4 bg-white bg-opacity-90 "
        style={{ zIndex: 10 }}
      >
        <div className="flex items-center gap-2 justify-between">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search"
            className="w-full py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-300"
          />
          <label htmlFor="startDate" className="text-blue-500 m-2">
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
            className="w-24 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-300"
            placeholderText="Date - Time"
          />
          <span className="text-blue-500 ml-2 mr-2">to</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-24 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-300"
            placeholderText="Date - Time"
          />

          <button
            type="submit"
            className="block w-auto py-2 px-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
