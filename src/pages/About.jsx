import { Container, Row, Col } from 'react-bootstrap';
import SEO from '../components/common/SEO';
import LazyImage from '../components/common/LazyImage';

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L14.5 9H22L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2 9H9.5L12 2Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    title: 'Innovation',
    desc: 'We constantly explore emerging technologies and novel approaches to architect solutions that lead rather than follow.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M12 2C12 2 5 6.5 5 12C5 16 8.1 19.5 12 19.5C15.9 19.5 19 16 19 12C19 6.5 12 2 12 2Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    title: 'Quality',
    desc: 'Excellence is non-negotiable. Every line of code, every pixel, every interaction is crafted to exceed expectations.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    title: 'Partnership',
    desc: 'Your goals become our goals. We embed ourselves as true partners not vendors in your digital journey.',
  },
];

const stats = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '4+', label: 'Years of Excellence' },
  { value: '24/7', label: 'Support Available' },
];

const About = () => {
  return (
    <>
      <SEO
        title="About Us - Our Story & Mission"
        description="Learn about Nerdware Technologies' journey, mission, and the expert team behind innovative web development solutions."
        keywords="about nerdware, web development team, company mission, technology experts"
        url="/about"
      />

      <main className="about-page">

        {/* ── Hero ── */}
        <section className="about-hero">
          <div className="about-hero__noise" />
          <div className="about-hero__glow about-hero__glow--right" />
          <div className="about-hero__glow about-hero__glow--left" />
          <div className="about-hero__grid" />
          <Container className="position-relative">
            <Row className="justify-content-center text-center">
              <Col lg={8}>
                <div className="about-hero__pill fade-in-up">Our Story</div>
                <h1 className="about-hero__title fade-in-up fade-in-up-delay-1">
                  We Build Digital<br />
                  <span className="text-gradient">Experiences That Matter</span>
                </h1>
                <p className="about-hero__lead fade-in-up fade-in-up-delay-2">
                  Nerdware System Technologies translating knowledge into bold, 
                  impactful technology that reshapes industries and empowers communities.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── Stats Strip ── */}
        <section className="about-stats">
          <Container>
            <div className="about-stats__strip">
              {stats.map((s, i) => (
                <div key={i} className="about-stats__item">
                  <span className="about-stats__value text-gradient">{s.value}</span>
                  <span className="about-stats__label">{s.label}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Story ── */}
        <section className="about-story">
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={5}>
                <div className="about-image-wrapper">
                  <div className="about-image-wrapper__frame" />
                  <div className="about-image-wrapper__inner">
                    <LazyImage
                      src="/nerdware.png"
                      alt="Nerdware System Technologies"
                      className="about-image-wrapper__img"
                    />
                  </div>
                  <div className="about-image-badge">
                    <span className="text-gradient">Est. 2022</span>
                  </div>
                </div>
              </Col>
              <Col lg={7}>
                <p className="section-eyebrow">Who We Are</p>
                <h2 className="about-story__heading">Driven by curiosity,<br/>defined by craft</h2>
                <p className="about-story__body">
                  We started with a simple but powerful belief technology should solve real problems
                  and create lasting value. From that seed, Nerdware grew into a team of developers,
                  designers, and strategists united by a passion for precision and impact.
                </p>
                <p className="about-story__body">
                  Today we partner with businesses across Africa and beyond to build digital products
                  that are as robust under the hood as they are beautiful on the surface. We push
                  technology to its limits because that's where the real breakthroughs happen.
                </p>
                <div className="about-story__divider" />
                <blockquote className="about-story__quote">
                  "We don't just write code, we engineer futures."
                </blockquote>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="about-mv">
          <div className="about-mv__bg-glow" />
          <Container className="position-relative">
            <Row className="justify-content-center text-center mb-5">
              <Col lg={6}>
                <p className="section-eyebrow">Purpose</p>
                <h2>Mission &amp; Vision</h2>
              </Col>
            </Row>
            <Row className="g-4">
              <Col md={6}>
                <div className="mv-card">
                  <div className="mv-card__icon">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="6" stroke="#ee4f27" strokeWidth="2" fill="none"/>
                      <path d="M16 2V6M16 26V30M2 16H6M26 16H30" stroke="#ee4f27" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M6.34 6.34L9.17 9.17M22.83 22.83L25.66 25.66M6.34 25.66L9.17 22.83M22.83 9.17L25.66 6.34"
                        stroke="#ee4f27" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                    </svg>
                  </div>
                  <span className="mv-card__label">Mission</span>
                  <h3 className="mv-card__heading">Built to Solve</h3>
                  <p className="mv-card__body">
                    To deliver innovative technological solutions that solve real-world problems and 
                    empower businesses to achieve digital transformation through cutting-edge technology 
                    and exceptional, human-centered service.
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="mv-card mv-card--vision">
                  <div className="mv-card__icon">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                      <path d="M16 6C9.37 6 4 16 4 16C4 16 9.37 26 16 26C22.63 26 28 16 28 16C28 16 22.63 6 16 6Z"
                        stroke="#fd8925" strokeWidth="2" fill="none"/>
                      <circle cx="16" cy="16" r="4" stroke="#fd8925" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <span className="mv-card__label mv-card__label--vision">Vision</span>
                  <h3 className="mv-card__heading">Built to Last</h3>
                  <p className="mv-card__body">
                    To translate knowledge into innovative applications that create significant societal 
                    and economic impacts making transformative technology accessible, inclusive, 
                    and beneficial for everyone.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── Values ── */}
        <section className="about-values">
          <Container>
            <Row className="justify-content-center text-center mb-5">
              <Col lg={6}>
                <p className="section-eyebrow">What Drives Us</p>
                <h2>Our Core Values</h2>
              </Col>
            </Row>
            <Row className="g-4">
              {values.map((v, i) => (
                <Col md={4} key={i}>
                  <div className="value-card">
                    <div className="value-card__icon">{v.icon}</div>
                    <h4 className="value-card__title">{v.title}</h4>
                    <p className="value-card__desc">{v.desc}</p>
                    <div className="value-card__line" />
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* ── CTA ── */}
        <section className="about-cta">
          <div className="about-cta__glow" />
          <Container className="position-relative text-center">
            <p className="section-eyebrow">Let's Build Together</p>
            <h2 className="about-cta__heading">Ready to start your<br />next project?</h2>
            <p className="about-cta__sub">
              We'd love to hear about your vision. Let's turn it into something extraordinary.
            </p>
            <div className="about-cta__actions">
              <a href="/contact" className="btn btn-primary btn-lg">Get In Touch</a>
              <a href="/portfolio" className="btn btn-secondary-dark btn-lg">View Our Work</a>
            </div>
          </Container>
        </section>

      </main>

      <style>{`
        /* ─── About Page Styles ─── */

        .about-page {
          background: var(--bg-midnight);
        }

        /* Shared eyebrow label */
        .section-eyebrow {
          font-family: var(--font-family);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--primary-color);
          margin-bottom: 0.75rem;
        }

        /* ─── Hero ─── */
        .about-hero {
          position: relative;
          padding: 160px 0 100px;
          overflow: hidden;
        }

        .about-hero__noise {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .about-hero__glow {
          position: absolute;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          pointer-events: none;
        }

        .about-hero__glow--right {
          top: -250px;
          right: -250px;
          background: radial-gradient(circle, rgba(238,79,39,0.11) 0%, transparent 60%);
        }

        .about-hero__glow--left {
          bottom: -300px;
          left: -250px;
          background: radial-gradient(circle, rgba(107,33,239,0.07) 0%, transparent 60%);
        }

        .about-hero__grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%);
          pointer-events: none;
        }

        .about-hero__pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--primary-color);
          background: rgba(238,79,39,0.08);
          border: 1px solid rgba(238,79,39,0.2);
          border-radius: 100px;
          padding: 0.375rem 1rem;
          margin-bottom: 1.5rem;
        }

        .about-hero__pill::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary-color);
          display: block;
        }

        .about-hero__title {
          font-size: clamp(2.75rem, 5.5vw, 4.75rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.05;
          margin-bottom: 1.5rem;
        }

        .about-hero__lead {
          font-size: 1.0625rem;
          color: var(--text-muted);
          max-width: 540px;
          margin: 0 auto;
          line-height: 1.8;
        }

        /* ─── Stats ─── */
        .about-stats {
          padding: 0 0 80px;
        }

        .about-stats__strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: var(--bg-dark-navy);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .about-stats__item {
          position: relative;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.375rem;
          transition: background 0.2s ease;
        }

        .about-stats__item + .about-stats__item {
          border-left: 1px solid var(--border-subtle);
        }

        .about-stats__item:hover {
          background: rgba(255,255,255,0.025);
        }

        .about-stats__value {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .about-stats__label {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        @media (max-width: 575px) {
          .about-stats__strip { grid-template-columns: repeat(2, 1fr); }
          .about-stats__item:nth-child(2) { border-left: 1px solid var(--border-subtle); }
          .about-stats__item:nth-child(3) { border-left: none; border-top: 1px solid var(--border-subtle); }
          .about-stats__item:nth-child(4) { border-top: 1px solid var(--border-subtle); }
        }

        /* ─── Story ─── */
        .about-story {
          padding: 80px 0 100px;
        }

        /* IMAGE key fix: contain the image without cropping */
        .about-image-wrapper {
          position: relative;
          padding-bottom: 16px;
          padding-right: 16px;
        }

        .about-image-wrapper__frame {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 16px;
          top: 16px;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-subtle);
          background: linear-gradient(135deg, rgba(238,79,39,0.05) 0%, transparent 60%);
          z-index: 0;
        }

        .about-image-wrapper__inner {
          position: relative;
          z-index: 1;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          background: var(--bg-dark-navy);
          overflow: hidden;
          /* Natural height no forced aspect ratio, no crop */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-image-wrapper__img {
          width: 100%;
          height: auto;
          display: block;
          /* object-fit: contain so nothing is cropped */
          object-fit: contain;
        }

        .about-image-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          z-index: 2;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 0.5rem 1.25rem;
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .about-story__heading {
          font-size: clamp(1.875rem, 3vw, 2.625rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .about-story__body {
          color: var(--text-muted);
          font-size: 0.9375rem;
          line-height: 1.85;
          margin-bottom: 1rem;
        }

        .about-story__divider {
          width: 40px;
          height: 1px;
          background: var(--primary-gradient);
          border-radius: var(--radius-full);
          margin: 2rem 0;
        }

        .about-story__quote {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 600;
          color: var(--text-primary);
          opacity: 0.6;
          font-style: italic;
          letter-spacing: -0.01em;
          margin: 0;
          border: none;
          padding: 0;
        }

        /* ─── Mission & Vision ─── */
        .about-mv {
          position: relative;
          padding: 100px 0;
          overflow: hidden;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .about-mv__bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(238,79,39,0.055) 0%, transparent 70%);
          pointer-events: none;
        }

        .mv-card {
          background: var(--bg-dark-navy);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          height: 100%;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }

        .mv-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(238,79,39,0.45), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .mv-card:hover {
          border-color: rgba(255,255,255,0.1);
          transform: translateY(-4px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
        }

        .mv-card:hover::after { opacity: 1; }

        .mv-card__icon {
          margin-bottom: 1.5rem;
        }

        .mv-card__label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--primary-color);
          display: block;
          margin-bottom: 0.5rem;
        }

        .mv-card__label--vision {
          color: var(--primary-light);
        }

        .mv-card__heading {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: -0.025em;
        }

        .mv-card__body {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.8;
          margin: 0;
        }

        /* ─── Values ─── */
        .about-values {
          padding: 100px 0;
        }

        .value-card {
          background: var(--bg-dark-navy);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 2.25rem;
          height: 100%;
          position: relative;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }

        .value-card:hover {
          border-color: rgba(238,79,39,0.25);
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.25);
        }

        .value-card__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(238,79,39,0.08);
          border: 1px solid rgba(238,79,39,0.18);
          color: var(--primary-color);
          margin-bottom: 1.25rem;
          transition: background 0.25s ease, border-color 0.25s ease;
        }

        .value-card:hover .value-card__icon {
          background: rgba(238,79,39,0.15);
          border-color: rgba(238,79,39,0.35);
        }

        .value-card__title {
          font-size: 1.0625rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          letter-spacing: -0.015em;
        }

        .value-card__desc {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.75;
          margin: 0 0 1.75rem;
        }

        .value-card__line {
          width: 28px;
          height: 1.5px;
          background: var(--primary-gradient);
          border-radius: var(--radius-full);
          transition: width 0.35s ease;
        }

        .value-card:hover .value-card__line { width: 52px; }

        /* ─── CTA ─── */
        .about-cta {
          position: relative;
          padding: 120px 0;
          overflow: hidden;
          border-top: 1px solid var(--border-subtle);
        }

        .about-cta__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(238,79,39,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .about-cta__heading {
          font-size: clamp(2rem, 4vw, 3.25rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          margin-bottom: 1.25rem;
          line-height: 1.1;
        }

        .about-cta__sub {
          color: var(--text-muted);
          font-size: 1rem;
          max-width: 460px;
          margin: 0 auto 2.5rem;
          line-height: 1.75;
        }

        .about-cta__actions {
          display: flex;
          gap: 0.875rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ─── Animations ─── */
        .fade-in-up {
          animation: fadeInUp 0.65s ease both;
        }
        .fade-in-up-delay-1 { animation-delay: 0.1s; }
        .fade-in-up-delay-2 { animation-delay: 0.2s; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default About;