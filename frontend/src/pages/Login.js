// Importing necessary hooks, components, and utilities
import { useState, useContext } from "react"; // React hooks for state and context
import { Alert, Button, Form } from "react-bootstrap"; // Bootstrap components
import { Link, useNavigate } from "react-router-dom"; // React Router hooks and components
import axios from "../axiosConfig"; // Axios instance with custom config
import setAuthToken from "../utils/setAuthToken"; // Utility to set auth token in axios headers
import { AuthContext } from "../context/AuthContext"; // Custom auth context

// Login component definition
const Login = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for alert messages
  const [alert, setAlert] = useState("");

  // Extracting login function from AuthContext
  const { login } = useContext(AuthContext);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handler for form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Make a POST request to login endpoint
      const response = await axios.post("/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Set token in localStorage and axios headers
      setAuthToken(token);

      // Update auth context with logged-in user
      login(user);

      if (response.status === 200) {
        // Successful login, navigate to dashboard
        navigate("/dashboard");
      } else {
        // Error from backend, set error message in alert
        setAlert(response.data.message);
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response && error.response.status === 404) {
        // User not found, suggest registration
        setAlert(
          <span>
            Email not registered, please{" "}
            <Alert.Link as={Link} to="/register">
              sign up
            </Alert.Link>
          </span>
        );
      } else if (error.response && error.response.status === 401) {
        // Incorrect password
        setAlert("Invalid password");
      } else {
        // Other errors
        setAlert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="form-wrap">
      {/* Login form */}
      <Form onSubmit={handleLogin}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        {/* Conditional rendering of alert */}
        {alert && <Alert key="login-alert">{alert}</Alert>}

        {/* Email input */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* Password input */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* Submit button */}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

// Exporting the Login component as default
export default Login;
