import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/AuthenticationPage";
import Home from "./pages/HomePage";
import EmailValidation from "./pages/EmailValidationPage";
import PrivateRoute from "./components/PrivateRoute";
import Test from "./testAPI/test"
import Redirect from "./testAPI/redditAuth"

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/validate/*" element={<EmailValidation />} />
        <Route path="/test" element={<Test />} />
        <Route path="/reddit_auth" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
