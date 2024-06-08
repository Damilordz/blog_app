// Importing necessary components and hooks
import React, { useState, useEffect } from "react"; // React and its hooks
import { Container, Card, Spinner, Alert } from "react-bootstrap"; // Bootstrap components
import { Link } from "react-router-dom"; // React Router's Link component
import axios from "../axiosConfig"; // Axios instance with custom config

// Dashboard component definition
const Dashboard = () => {
  // State to hold the list of blog posts
  const [posts, setPosts] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error message
  const [error, setError] = useState(null);

  // Effect hook to fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Get auth token from localStorage
        const authToken = localStorage.getItem("authToken");

        // Fetch posts with auth token in headers
        const response = await axios.get("/posts", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Update state with fetched posts
        setPosts(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError("Failed to fetch blog posts. Please try again later.");
        setLoading(false); // Set loading to false when there is an error
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount

  // Utility function to truncate post content
  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) return content;

    // Find the last space before maxLength
    const lastSpace = content.lastIndexOf(" ", maxLength);

    // If found, cut at the last space; otherwise, cut at maxLength
    const truncatedIndex = lastSpace !== -1 ? lastSpace : maxLength;

    return content.substring(0, truncatedIndex) + "...";
  };

  return (
    <div>
      <Container>
        {/* Show loading spinner while fetching data */}
        {loading ? (
          <div className="mt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <h1>Blog Posts</h1>
        )}

        {/* Show error message if there's an error */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Map over posts array to render each post */}
        {!loading &&
          !error &&
          posts.map((post) => (
            // Bootstrap Card component for each post
            <Card key={post._id} className="my-3">
              <Card.Body>
                {/* Post title */}
                <Card.Title>{post.title}</Card.Title>

                {/* Truncated post content */}
                <Card.Text>
                  {truncateContent(post.content, 200)}{" "}
                  {/* Show first 200 characters */}
                </Card.Text>

                {/* Link to full post view */}
                <Link to={`/posts/${post._id}`} className="btn btn-primary">
                  Read More
                </Link>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </div>
  );
};

// Exporting the Dashboard component as default
export default Dashboard;
