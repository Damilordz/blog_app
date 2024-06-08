// Importing necessary React hooks and Bootstrap components
import React, { useState } from "react"; // React and useState hook
import { Container, Form, Button, Alert } from "react-bootstrap"; // Bootstrap components

// Contact component definition
const Contact = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State for alert messages
  const [alert, setAlert] = useState(null);

  // Handler for form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Set success alert
    setAlert(
      <Alert variant="success">
        Thank you for reaching out! We'll get back to you soon.
      </Alert>
    );

    // Clear form fields
    setFormData({ name: "", email: "", message: "" });

    // Note: In a real-world app, you'd typically send the form data to a server here
  };

  return (
    <Container className="contact-form">
      <div className="contact-form-wrap">
        <h1>Contact Us</h1>

        {/* Conditionally render alert if it exists */}
        {alert && alert}

        {/* Contact form */}
        <Form onSubmit={handleSubmit}>
          {/* Name input */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required // HTML5 form validation
            />
          </Form.Group>

          {/* Email input */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required // HTML5 form validation
            />
          </Form.Group>

          {/* Message textarea */}
          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter your message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required // HTML5 form validation
            />
          </Form.Group>

          {/* Submit button */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

// Exporting the Contact component as default
export default Contact;
