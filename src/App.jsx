import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/LandingPage/SearchBar";
import ExplanationContainer from "./components/LandingPage/ExplanationContainer";
import LoginPage from "./components/Login/LoginPage";
import SignupPage from "./components/Signup/SignupPage";
import AuthRouter from "./components/LandingPage/AuthRouter";
import MapPage from "./components/Map/MapPage";
import { AuthContext } from "./context/authContext";
import MainLayout from "./components/LandingPage/MainLayout";
import GoogleMapListOne from "./components/Map/GoogleMapListOne";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Career from "./components/Career/Career";

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
