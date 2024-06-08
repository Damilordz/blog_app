// Importing necessary components and hooks from libraries
import { Link } from "react-router-dom"; // For creating navigation links
import { useContext } from "react"; // Hook to access React context
import { Navbar, Nav, Container, Button } from "react-bootstrap"; // Bootstrap components
import { AuthContext } from "../context/AuthContext"; // Custom context for authentication
import blogLogo from "../assets/img/blog-logo.png"; // Blog logo image

// Header component definition
function Header() {
  // Destructuring auth and logout from AuthContext
  const { auth, logout } = useContext(AuthContext);

  return (
    // Bootstrap Navbar component with custom class
    <Navbar bg="primary" variant="dark" expand="lg" className="custom-navbar">
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Collapsible navbar content */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left-aligned navigation links */}
          <Nav className="me-auto">
            {/* Conditionally render Home link if user is authenticated */}
            {auth.isAuthenticated && (
              <Nav.Link as={Link} to="/dashboard" className="fw-bold">
                Home
              </Nav.Link>
            )}

            {/* Common links for all users */}
            <Nav.Link as={Link} to="/about" className="fw-bold">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-bold">
              Contact Us
            </Nav.Link>

            {/* Conditionally render Create Post link if user is authenticated */}
            {auth.isAuthenticated && (
              <Nav.Link as={Link} to="/create" className="fw-bold">
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
