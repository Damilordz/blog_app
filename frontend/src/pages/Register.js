// Importing necessary hooks, components, and utilities
import { useState, useContext } from "react"; // React hooks for state and context
import { Form, Button, Alert } from "react-bootstrap"; // Bootstrap components
import { Link, useNavigate } from "react-router-dom"; // React Router hooks and components
import axios from "../axiosConfig"; // Axios instance with custom config
import setAuthToken from "../utils/setAuthToken"; // Utility to set auth token in axios headers
import { AuthContext } from "../context/AuthContext"; // Custom auth context

// Register component definition
const Register = () => {
  // State for alert messages
  const [alert, setAlert] = useState({ message: "", variant: "" });

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  // Extracting login function from AuthContext
  const { login } = useContext(AuthContext);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Destructuring form data for easier access
  const { name, email, password, confirmpassword } = formData;

  // Handler for form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if passwords match
    if (password !== confirmpassword) {
      setAlert({ message: "Passwords do not match", variant: "danger" });
      return; // Stop execution if passwords don't match
    }

    // Prepare user data for registration
    const newUser = {
      email: email.toLowerCase(),
      password,
      name,
    };

    try {
      // Make a POST request to register endpoint
      const response = await axios.post("/register", newUser);
      const { token, user } = response.data;

      // Set token in localStorage and axios headers
      setAuthToken(token);

      // Update auth context with new user
      login(user);

      // Show success alert
      setAlert({ message: "Registered successfully!", variant: "success" });

      // Reset form fields
      setFormData({ name: "", email: "", password: "", confirmpassword: "" });

      // Navigate to dashboard after 1 second
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      // Handle registration errors
      setAlert({
        message:
          err.response.data.message || "Registration failed, please try again.",
        variant: "danger",
      });
      console.error(err);
    }
  };

  return (
    <div className="form-wrap">
      {/* Registration form */}
      <Form onSubmit={handleSignUp}>
        <h1 className="h3 mb-3 fw-normal">Register</h1>

        {/* Conditional rendering of alert */}
        {alert.message && (
          <Alert variant={alert.variant}>{alert.message}</Alert>
        )}

        {/* Name input */}
        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
            name="name"
          />
        </Form.Group>

        {/* Email input */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
            name="email"
          />
        </Form.Group>

        {/* Password input */}
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            name="password"
          />
        </Form.Group>

        {/* Confirm Password input */}
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={handleChange}
            name="confirmpassword"
          />
        </Form.Group>

        {/* Submit button */}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>

      {/* Login link for already registered users */}
      <div className="mt-2 l-p">
        <p className="mb-1">Already registered?</p>
        <Link to="/login">
          <Button variant="secondary">Login</Button>
        </Link>
      </div>
    </div>
  );
};

// Exporting the Register component as default
export default Register;
