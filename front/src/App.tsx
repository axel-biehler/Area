import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/AuthenticationPage";
import Home from "./pages/HomePage";
import EmailValidation from "./pages/EmailValidationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/validate/*" element={<EmailValidation />} />
      </Routes>
    </Router>
  );
}

export default App;
