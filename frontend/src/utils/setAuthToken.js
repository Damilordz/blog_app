// Import axios library
import axios from "axios";

// Function to set or remove the JWT in axios defaults and localStorage
const setAuthToken = (token) => {
  // Check if a token is provided
  if (token) {
    // Set the Authorization header for all axios requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Store the token in localStorage for persistence
    localStorage.setItem("authToken", token);
  } else {
    // If no token (or falsy value like null or '') is provided:

    // Remove the Authorization header from axios defaults
    delete axios.defaults.headers.common["Authorization"];

    // Remove the token from localStorage
    localStorage.removeItem("authToken");
  }
};

// Export the setAuthToken function
export default setAuthToken;
