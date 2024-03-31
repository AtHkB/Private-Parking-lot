import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const AuthRouter = () => {
  return (
    <Router>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Router>
  );
};

export default AuthRouter;
