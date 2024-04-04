import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./LandingPage/Navbar";
import SearchBar from "./LandingPage/SearchBar";
import ExplanationContainer from "./LandingPage/ExplanationContainer";
import LoginPage from "./LandingPage/LoginPage";
import SignupPage from "./LandingPage/SignupPage";
import AuthRouter from "./LandingPage/AuthRouter";
import MapPage from "./components/MapPage";
import AuthContextProvider from "./context/authContext";
import MainLayout from "./LandingPage/MainLayout";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <MainLayout>
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchBar />}>
              <Route index element={<ExplanationContainer />} />
            </Route>
            <Route path="map" element={<MapPage />} />
            <Route path="/map/details/:id" element={<MapPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth" element={<AuthRouter />} />
          </Routes>
        </MainLayout>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
