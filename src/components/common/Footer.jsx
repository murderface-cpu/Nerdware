import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-dark text-white py-5">
      <Container>
        <Row className="justify-content-between">
          <Col md={4} className="mb-4 mb-md-0">
            <h4 className="text-white mb-4">Nerdware Systems Limited.</h4>
            <p>Pushing Technologies to the Limits</p>
            <p>Our vision is to translate knowledge into innovative applications that will have significant societal and economic impacts.</p>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
              <li><Link to="/services" className="text-light text-decoration-none">Services</Link></li>
              <li><Link to="/portfolio" className="text-light text-decoration-none">Portfolio</Link></li>
              <li><Link to="/blog" className="text-light text-decoration-none">Blogs</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact Us</Link></li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h5 className="text-white mb-3">Connect With Us</h5>
            <div className="social-links d-flex gap-3 mb-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebookF className="text-light" size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter className="text-light" size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedinIn className="text-light" size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram className="text-light" size={20} />
              </a>
            </div>
            <Link to="/contact" className="btn btn-outline-light">Contact Us</Link>
          </Col>
        </Row>
        
        <hr className="mt-4 mb-4 bg-secondary" />
        
        <Row>
          <Col className="text-center">
            <p className="mb-0">© Copyright {currentYear}. Nerdware Systems Inc.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;