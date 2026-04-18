const Testimonial = ({ testimonial }) => {
  const avatarUrl = testimonial.image
    || "https://gravatar.com/avatar/c27ed039266d0e757973489b42b30064?s=400&d=robohash&r=x";

  return (
    <div className="testimonial-card">
      {/* Quote mark accent */}
      <div
        style={{
          fontSize: '3rem',
          lineHeight: 1,
          marginBottom: '0.75rem',
          background: 'var(--primary-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: 'Georgia, serif',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Feedback text */}
      <p className="quote-text mb-4">{testimonial.feedback}</p>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: 'var(--border-subtle)',
          marginBottom: '1.25rem',
        }}
      />

      {/* Author row */}
      <div className="d-flex align-items-center gap-3">
        <img
          src={avatarUrl}
          alt={testimonial.name}
          className="testimonial-avatar"
          onError={(e) => {
            e.currentTarget.src =
              "https://gravatar.com/avatar/c27ed039266d0e757973489b42b30064?s=400&d=robohash&r=x";
          }}
        />
        <div>
          <p className="testimonial-author-name mb-0">{testimonial.name}</p>
          <p className="testimonial-author-role mb-0">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;