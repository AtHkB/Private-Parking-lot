import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./LandingPage/Navbar";
import SearchBar from "./LandingPage/SearchBar";
import ExplanationContainer from "./LandingPage/ExplanationContainer";
import LoginPage from "./LandingPage/LoginPage";
import SignupPage from "./LandingPage/SignupPage";
import AuthRouter from "./LandingPage/AuthRouter";
import MapPage from "./components/MapPage";
import { AuthContext } from "./context/authContext";
import MainLayout from "./LandingPage/MainLayout";
import GoogleMapListOne from "./components/Map/GoogleMapListOne";
const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <MainLayout>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchBar />}>
            <Route index element={<ExplanationContainer />} />
          </Route>
          {/* <Route path="map" element={<MapPage />} /> */}
          <Route
            path="/gmap"
            element={user ? <GoogleMapListOne user={user} /> : <LoginPage />}
          />
          <Route path="/map/details/:id" element={<MapPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth" element={<AuthRouter />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
