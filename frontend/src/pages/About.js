import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function About() {
  return (
    <Container className="text-center mx-4" id="about">
      <h1>About</h1>
      <p>Welcome to Blog Web! 🎉</p>
      <p>
        Welcome to our blog! This is where we share interesting articles,
        stories, and insights about various topics. Our goal is to provide
        valuable content to our readers and create a community where people can
        engage and learn from each other.
      </p>
      <p>
        Feel free to explore our blog posts and don't hesitate to leave your
        comments and feedback. We appreciate your support and hope you enjoy
        your time here!
      </p>
      <p>
        Have questions or feedback? Feel free to reach out to us through the
        contact form provided on the <Link to="/contact">Contact</Link> page.
      </p>

      <h3>Thank You</h3>
      <p>Happy coding! 🚀</p>
    </Container>
  );
}

export default About;
