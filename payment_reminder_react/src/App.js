import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContent from './AppContent'; // The main content of your app
import Login from './components/Auth/Login';
import backgroundImg from './images/background.jpg';

// Define the background style for the entire app
const backgroundStyle = {
  backgroundImage: `url(${backgroundImg})`, // Background image
  backgroundSize: 'cover', // Covers the entire background
  backgroundPosition: 'center', // Centers the image
  backgroundRepeat: 'no-repeat', // Prevents repeating pattern
  minHeight: '100vh', // Minimum height for full viewport
  display: 'flex', // For correct alignment of content
  flexDirection: 'column', // Vertical alignment
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists
  return token ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

const App = () => {
  return (
    <div style={backgroundStyle}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
