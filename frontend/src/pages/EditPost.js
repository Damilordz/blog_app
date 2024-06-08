// Importing necessary hooks and components
import { useState, useEffect } from "react"; // React hooks for state and side effects
import { useParams, useNavigate } from "react-router-dom"; // React Router hooks
import { Form, Button, Container, Spinner } from "react-bootstrap"; // Bootstrap components
import axios from "../axiosConfig"; // Axios instance with custom config

// EditPost component definition
const EditPost = () => {
  // Extract post id from URL params
  const { id } = useParams();

  // State for post data and loading indicator
  const [post, setPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Effect hook to fetch post data on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Get auth token from localStorage
        const authToken = localStorage.getItem("authToken");

        // Fetch post data with auth token in headers
        const response = await axios.get(`/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Update state with fetched data
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]); // Re-run effect if id changes

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get auth token from localStorage
      const authToken = localStorage.getItem("authToken");

      // Send PUT request to update post
      await axios.put(`/posts/${id}`, post, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Navigate to updated post page
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Handler for cancel button click
  const handleCancel = () => {
    navigate(`/posts/${id}`);
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  // Render edit form
  return (
    <Container className="edit-post">
      <div className="post-wrap">
        <h1>Edit Post</h1>
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

          {/* Submit and cancel buttons */}
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Update Post
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

// Exporting the EditPost component as default
export default EditPost;
