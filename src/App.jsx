import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";
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
import About from "./components/About";
import Contact from "./components/Contact";
import Career from "./components/Career";

const App = () => {
  const { token } = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const handleMessage = (msgg = null) => {
    let msgLocal;
    if (!msgg) {
      msgLocal = localStorage.getItem("msg");
    } else {
      msgLocal = msgg;
    }
    if (msgLocal) {
      setMsg(msgLocal);
    }
  };

  return (
    <Router>
      <MainLayout>
        <Navbar token={token} handleMessage={handleMessage} msg={msg} />
        <Routes>
          <Route path="/" element={<SearchBar />}>
            <Route index element={<ExplanationContainer />} />
          </Route>
          {/* <Route path="map" element={<MapPage />} /> */}
          <Route
            path="/gmap"
            element={
              token ? (
                <GoogleMapListOne
                  token={token}
                  handleMessage={handleMessage}
                  msg={msg}
                />
              ) : (
                <LoginPage />
              )
            }
          />

          <Route path="/map/details/:id" element={<MapPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth" element={<AuthRouter />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Career" element={<Career />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
