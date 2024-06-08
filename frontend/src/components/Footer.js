// Import necessary dependencies and assets
import { Container } from "react-bootstrap"; // For layout container
import { Link } from "react-router-dom"; // For internal navigation links
import blogLogo from "../assets/img/blog-logo.png"; // Blog logo image
import { useState, useEffect } from "react"; // React hooks for state and side effects

// Footer component
function Footer() {
  // State to store the current year
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Effect to update the year (runs once on component mount)
  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year);
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    // Container for responsive layout
    <Container className="footer-container">
      {/* Footer element with flexbox layout */}
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 px-4 border-top">
        {/* Left section: Logo and copyright */}
        <div className="col-md-4 d-flex align-items-center">
          {/* Link to homepage with blog logo */}
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1 footer-logo"
          >
            <img src={blogLogo} alt="blog logo" />
          </Link>
          {/* Copyright text with dynamic year */}
          <span className="mb-3 mb-md-0 text-body-secondary">
            {currentYear} &copy; Blog App
          </span>
        </div>

        {/* Right section: Social media links */}
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex footer-socials">
          {/* Twitter link */}
          <li className="ms-3">
            <a className="text-body-secondary" href="https://twitter.com">
              <i className="fa-brands fa-twitter fa-xl"></i>
            </a>
          </li>
          {/* Instagram link */}
          <li className="ms-3">
            <a className="text-body-secondary" href="https://instagram.com">
              <i className="fa-brands fa-instagram fa-xl"></i>
            </a>
          </li>
          {/* Facebook link */}
          <li className="ms-3">
            <a className="text-body-secondary" href="https://facebook.com">
              <i className="fa-brands fa-facebook fa-xl"></i>
            </a>
          </li>
        </ul>
      </footer>
    </Container>
  );
}

export default Footer;
