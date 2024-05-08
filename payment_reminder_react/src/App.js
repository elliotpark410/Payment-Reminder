import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContent from './AppContent'; // The main content of your app
import Login from './components/Auth/Login';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists
  return token ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

const App = () => {
  return (
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
  );
};

export default App;
