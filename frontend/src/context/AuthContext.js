// Import necessary dependencies
import React, { createContext, useState, useEffect } from "react";
import axios from "../axiosConfig"; // Custom axios instance
import setAuthToken from "../utils/setAuthToken"; // Utility to set JWT
import { useNavigate } from "react-router-dom"; // For programmatic navigation

// Create a context for authentication
export const AuthContext = createContext();

// AuthProvider component to manage authentication state
const AuthProvider = ({ children }) => {
  // State to hold authentication info
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Effect to run on component mount (and dependency changes)
  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      // Set token in axios defaults
      setAuthToken(token);

      // Fetch current user data
      axios
        .get("/current-user")
        .then((response) => {
          // Update auth state with user data
          setAuth({
            isAuthenticated: true,
            user: response.data,
          });
        })
        .catch(() => {
          // If fetching fails (e.g., invalid token), clear auth state
          setAuthToken(null);
          setAuth({
            isAuthenticated: false,
            user: null,
          });
        });
    }
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle user login
  const login = (userData) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
    });
  };

  // Function to handle user logout
  const logout = () => {
    // Clear token and auth state
    setAuthToken(null);
    setAuth({
      isAuthenticated: false,
      user: null,
    });
    // Redirect to login page
    navigate("/login");
  };

  // Provide auth state and functions to children
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
