import SEO from '../components/common/SEO'
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Features from '../components/home/Features';
import TestimonialSection from '../components/home/TestimonialSection';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Newsletter from '../components/common/Newsletter';

const Home = () => {
  return (
    <>
      <SEO
        title="Leading Software Development and AI automation Company in Kenya"
        description="Expert web development, mobile apps, and digital solutions. Transform your business with cutting-edge technology and innovative design."
        keywords="web development, mobile apps, software development, digital solutions, technology consulting"
        url="/"
      />
      <main className="home-page">
        <Hero />
        <Services />
        <Features />
        <TestimonialSection />

        {/* Call to Action Section */}
        <section className="cta-section py-5 bg-primary text-white text-center">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} lg={8}>
                <h2 className="cta-heading mb-3">
                  Ready to Start Your Project?
                </h2>
                <p className="cta-text mb-4">
                  Contact us today to discuss how we can help bring your ideas to life.
                </p>
                <div className="cta-actions">
                  <Link to="/contact">
                    <Button variant="light" size="lg">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <div className="newsletter-wrapper">
          <Newsletter />
        </div>

        <style>{`
          /* ─── Page wrapper: clip any overflowing children ─── */
          .home-page {
            overflow-x: hidden;
            width: 100%;
          }

          /* ─── CTA section ─── */
          .cta-section {
            overflow: hidden;
            width: 100%;
          }

          .cta-heading {
            font-size: clamp(1.5rem, 5vw, 2.25rem);
            font-weight: 800;
            line-height: 1.2;
            word-break: break-word;
            overflow-wrap: break-word;
          }

          .cta-text {
            font-size: clamp(0.9375rem, 2.5vw, 1.0625rem);
            max-width: 480px;
            margin: 0 auto 1.5rem;
            line-height: 1.75;
          }

          .cta-actions {
            display: flex;
            gap: 0.875rem;
            justify-content: center;
            flex-wrap: wrap;
          }

          /* ─── Newsletter wrapper ─── */
          .newsletter-wrapper {
            width: 100%;
            overflow: hidden;
          }

          /* ─── Responsive: ≤ 767px ─── */
          @media (max-width: 767px) {
            .cta-section {
              padding: 3rem 0 !important;
            }

            .cta-actions {
              flex-direction: column;
              align-items: stretch;
            }

            .cta-actions a,
            .cta-actions .btn {
              width: 100%;
              text-align: center;
              justify-content: center;
            }
          }

          /* ─── Responsive: ≤ 480px ─── */
          @media (max-width: 480px) {
            .cta-section {
              padding: 2.5rem 0 !important;
            }

            .cta-heading {
              font-size: clamp(1.25rem, 6vw, 1.75rem);
            }

            .cta-text {
              font-size: 0.9375rem;
            }
          }
        `}</style>
      </main>
    </>
  );
};

export default Home;