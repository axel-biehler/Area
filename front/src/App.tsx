import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/AuthenticationPage";
import EmailValidation from "./pages/EmailValidationPage";
import GithubLinkingPage from "./pages/GithubLinkingPage";
import Home from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import TrelloLinkingPage from "./pages/TrelloLinkingPage";

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
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<Login />} />
        <Route path="/validate/*" element={<EmailValidation />} />
        <Route path="/github/link/*" element={<GithubLinkingPage />} />
        <Route path="/trello/link/*" element={<TrelloLinkingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
