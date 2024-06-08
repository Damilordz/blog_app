// Importing necessary components
import { Container } from "react-bootstrap"; // Bootstrap container for layout
import { Link } from "react-router-dom"; // React Router's Link for navigation

// Homepage component definition
const Homepage = () => {
  return (
    <div>
      {/* Bootstrap Container for centering content */}
      <Container className="text-center">
        {/* Main heading */}
        <h1>Welcome to Blog App</h1>

        {/* Subheading with navigation links */}
        <h5>
          Please kindly <Link to="/login">Login</Link> or{" "}
          <Link to="/register">Sign up</Link>
        </h5>
      </Container>
    </div>
  );
};

// Exporting the Homepage component as default
export default Homepage;
