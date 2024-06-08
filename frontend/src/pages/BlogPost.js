// Importing necessary hooks, components, and utilities
import { useState, useEffect } from "react"; // React hooks for state and side effects
import { useParams, useNavigate } from "react-router-dom"; // React Router hooks
import { Container, Button, Spinner } from "react-bootstrap"; // Bootstrap components
import { Link } from "react-router-dom"; // React Router's Link component
import axios from "../axiosConfig"; // Axios instance with custom config

// BlogPost component definition
const BlogPost = () => {
  // Extract post id from URL params
  const { id } = useParams();

  // State for post data and current user
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Effect hook to fetch post and user data
  useEffect(() => {
    // Function to fetch post data
    const fetchPost = async () => {
      try {
        // Get auth token from localStorage
        const authToken = localStorage.getItem("authToken");

        // Fetch post data with auth token in headers
        const response = await axios.get(`/posts/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    // Function to fetch current user data
    const fetchUser = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get("/current-user", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call both fetch functions
    fetchUser();
    fetchPost();
  }, [id]); // Re-run effect if post id changes

  // Handler for deleting a post
  const handleDelete = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      // Send DELETE request to remove post
      await axios.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // Navigate back to dashboard page after deletion
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Show loading spinner while fetching post
  if (!post) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  // Render post content
  return (
    <Container>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      {/* Display author's name */}
      <p>Posted by: {post.author.name}</p>

      {/* Display creation date and time */}
      <p>Posted at: {new Date(post.createdAt).toLocaleString()}</p>

      {/* Conditionally render Edit and Delete buttons */}
      {user && user._id === post.author._id && (
        <>
          {/* Edit button links to edit page */}
          <Button variant="warning" as={Link} to={`/edit/${post._id}`}>
            Edit
          </Button>

          {/* Delete button triggers handleDelete */}
          <Button variant="danger" onClick={handleDelete} className="ms-2">
            Delete
          </Button>
        </>
      )}
    </Container>
  );
};

// Exporting the BlogPost component as default
export default BlogPost;
