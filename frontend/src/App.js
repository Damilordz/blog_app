// Import styles
import "./assets/css/App.css"; // Custom styles for the app
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles

// Import React Router components
import { Routes, Route } from "react-router-dom";

// Import components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Home";
import About from "./pages/About";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

// Import context and utilities
import AuthProvider from "./context/AuthContext";
import setAuthToken from "./utils/setAuthToken";

// Import React hooks and axios
import { useEffect, useState } from "react";
import axios from "./axiosConfig"; // Axios instance with base URL and other configs

function App() {
  // State to manage authentication
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  // Effect to fetch user data on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get token from localStorage
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
          // Set token in axios defaults
          setAuthToken(authToken);
          // Fetch current user data
          const response = await axios.get("/current-user");
          // Update auth state
          setAuth({
            isAuthenticated: true,
            user: response.data.user,
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    // Provide auth context to all children
    <AuthProvider value={{ auth, setAuth }}>
      <div className="App">
        <Header />
        <main>
          {/* Define routes */}
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
