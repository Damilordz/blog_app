// Importing necessary hooks and components
import { useState } from "react"; // React hook for state
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import { Form, Button, Container, Alert } from "react-bootstrap"; // Bootstrap components
import axios from "../axiosConfig"; // Axios instance with custom config

// CreatePost component definition
const CreatePost = () => {
  // State for form data (post) and error alerts
  const [post, setPost] = useState({ title: "", content: "" });
  const [alert, setAlert] = useState("");

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value }); // Update state using computed property names
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Get auth token from localStorage
      const authToken = localStorage.getItem("authToken");

      // Send POST request to create a new post
      await axios.post("/posts", post, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include token in headers
        },
      });

      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (error) {
      // Handle errors
      setAlert("Error creating post. Please try again.");
      console.error("Error creating post:", error.message);
    }
  };

  // Commented out console.log for debugging
  // console.log(post);

  return (
    <Container className="create-post">
      <div className="post-wrap">
        <h1>Create New Post</h1>

        {/* Conditionally render alert if there's an error */}
        {alert && <Alert variant="danger">{alert}</Alert>}

        {/* Form for creating a new post */}
        <Form onSubmit={handleSubmit}>
          {/* Title input */}
          <Form.Group className="mb-3" controlId="formPostTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={post.title}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Content textarea */}
          <Form.Group className="mb-3" controlId="formPostContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter content"
              name="content"
              value={post.content}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Submit button */}
          <Button variant="primary" type="submit">
            Create Post
          </Button>
        </Form>
      </div>
    </Container>
  );
};

// Exporting the CreatePost component as default
export default CreatePost;
