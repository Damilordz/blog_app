// Importing necessary components and hooks from libraries
import { Link } from "react-router-dom"; // For creating navigation links
import { useContext, useState } from "react"; // Hooks to access React context and manage state
import { Navbar, Nav, Container, Button } from "react-bootstrap"; // Bootstrap components
import { AuthContext } from "../context/AuthContext"; // Custom context for authentication
import blogLogo from "../assets/img/blog-logo.png"; // Blog logo image

// Header component definition
function Header() {
  // Destructuring auth and logout from AuthContext
  const { auth, logout } = useContext(AuthContext);
  // State to manage the expanded state of the Navbar
  const [expanded, setExpanded] = useState(false);

  // Function to handle link clicks and collapse the Navbar
  const handleLinkClick = () => {
    setExpanded(false);
  };

  return (
    // Bootstrap Navbar component with custom class
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="custom-navbar"
      expanded={expanded} // Setting the expanded state of the Navbar
    >
      <Container>
        {/* Navbar brand with conditional link based on auth status */}
        <Navbar.Brand as={Link} to={auth.isAuthenticated ? "/dashboard" : "/"}>
          <img
            src={blogLogo}
            alt="Blog Logo"
            className="d-inline-block align-top"
          />
          <h1 className="fs-3 d-inline-block ms-2">Blog App</h1>
        </Navbar.Brand>

        {/* Responsive toggle for mobile view */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)} // Toggle the expanded state on click
        />

        {/* Collapsible navbar content */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left-aligned navigation links */}
          <Nav className="me-auto">
            {/* Conditionally render Home link if user is authenticated */}
            {auth.isAuthenticated && (
              <Nav.Link as={Link} to="/dashboard" className="fw-bold" onClick={handleLinkClick}>
                Home
              </Nav.Link>
            )}

            {/* Common links for all users */}
            <Nav.Link as={Link} to="/about" className="fw-bold" onClick={handleLinkClick}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-bold" onClick={handleLinkClick}>
              Contact Us
            </Nav.Link>

            {/* Conditionally render Create Post link if user is authenticated */}
            {auth.isAuthenticated && (
              <Nav.Link as={Link} to="/create" className="fw-bold" onClick={handleLinkClick}>
                Create Post
              </Nav.Link>
            )}
          </Nav>

          {/* Right-aligned authentication section */}
          <Nav className="ms-auto">
            {/* Conditionally render content based on authentication status */}
            {auth.isAuthenticated ? (
              <div>
                {/* Display user's name and logout button if authenticated */}
                <span className="me-2 text-white fw-bold">
                  {auth.user.name}
                </span>
                <Button onClick={logout} variant="danger">
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                {/* Display login and signup buttons if not authenticated */}
                <Link to="/login">
                  <Button variant="light" className="me-2 login-btn">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="dark">Sign up</Button>
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// Exporting the Header component as default
export default Header;
