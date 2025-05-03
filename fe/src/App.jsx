import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignInPage";
import AdminPage from "./pages/AdminPage";
import UploadDetails from "./pages/UploadDetails";
import ResultPage from "./pages/ResultPage";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  // Check if token exists and is not expired
  if (!token || !tokenExpiry || Date.now() > tokenExpiry) {
    console.log("Token expired. Redirecting to signin...");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    return <Navigate to="/signin" replace />;
  }

  return element;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/result/:className/:rollNumber" element={<ResultPage />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
        <Route path="/uploaddetails" element={<ProtectedRoute element={<UploadDetails />} />} />
      </Routes>
    </Router>
  );
};

export default App;
