import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContent from './AppContent';
import Login from './components/Auth/Login';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists
  return token ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

const App = () => {
  return (
    <div className="background-style">
      <Router>
        <div className="app-container">
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
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
