import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./LandingPage/Navbar";
import SearchBar from "./LandingPage/SearchBar";
import ExplanationContainer from "./LandingPage/ExplanationContainer";
import LoginPage from "./LandingPage/LoginPage";
import SignupPage from "./LandingPage/SignupPage";
import AuthRouter from "./LandingPage/AuthRouter"; // Import the AuthRouter component
import MapPage from "./components/MapPage";
import FullParkingDetails from "./components/FullParkingDetails"; /* delete later */

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchBar />}>
            <Route index element={<ExplanationContainer />} />
          </Route>
          <Route path="map" element={<MapPage />} />
          <Route path="details/:id" element={<FullParkingDetails />} />
          {/* delete later */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth" element={<AuthRouter />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
