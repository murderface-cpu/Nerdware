import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import LazyImage from '../components/common/LazyImage';
import {
  fetchBlogBySlug,
  clearCurrentPost,
  selectCurrentPost,
  selectDetailStatus,
  selectBlogsError,
} from '../redux/slices/Blogslice';

/* ─── Skeleton ────────────────────────────────────────────────────────────── */
const DetailSkeleton = () => (
  <Container>
    <Row className="justify-content-center">
      <Col lg={8}>
        <div className="skeleton skeleton-badge mb-3" style={{ width: 90, height: 22 }} />
        <div className="skeleton skeleton-title mb-2" style={{ height: 36 }} />
        <div className="skeleton skeleton-title mb-4" style={{ height: 36, width: '70%' }} />
        <div className="d-flex gap-3 mb-4">
          <div className="skeleton" style={{ width: 120, height: 16, borderRadius: 4 }} />
          <div className="skeleton" style={{ width: 80,  height: 16, borderRadius: 4 }} />
        </div>
        <div className="skeleton skeleton-img mb-5" style={{ height: 380, borderRadius: 16 }} />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton skeleton-text mb-2" style={{ width: i % 3 === 0 ? '80%' : '100%' }} />
        ))}
      </Col>
    </Row>
  </Container>
);

/* ─── Tag pills ───────────────────────────────────────────────────────────── */
const TagPill = ({ tag }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      background: 'rgba(238,79,39,0.12)',
      border: '1px solid rgba(238,79,39,0.25)',
      color: 'var(--primary-color)',
      fontSize: '0.8125rem',
      fontWeight: 500,
      marginRight: 6,
      marginBottom: 6,
    }}
  >
    #{tag}
  </span>
);

/* ─── Main ────────────────────────────────────────────────────────────────── */
const BlogDetail = () => {
  const { slug }   = useParams();
  const dispatch   = useDispatch();
  const post       = useSelector(selectCurrentPost);
  const status     = useSelector(selectDetailStatus);
  const error      = useSelector(selectBlogsError);

  useEffect(() => {
    dispatch(fetchBlogBySlug(slug));
    return () => dispatch(clearCurrentPost());
  }, [dispatch, slug]);

  const isLoading = status === 'idle' || status === 'loading';

  const formatDate = (str) =>
    str
      ? new Date(str).toLocaleDateString(undefined, {
          year: 'numeric', month: 'long', day: 'numeric',
        })
      : '';

  return (
    <>
      {post && (
        <Helmet>
          <title>{post.title} | Nerdware Blog</title>
          <meta name="description" content={post.excerpt} />
          <meta property="og:title"       content={post.title} />
          <meta property="og:description" content={post.excerpt} />
          {post.coverImage && <meta property="og:image" content={post.coverImage} />}
          <link rel="canonical" href={`https://nerdwaretechnologies.com/blog/${post.slug}`} />
        </Helmet>
      )}

      <main>
        {/* ── Page header spacer ──────────────────────────────────────────── */}
        <div style={{ paddingTop: 100, background: 'var(--bg-midnight)' }} />

        <section style={{ background: 'var(--bg-midnight)', paddingBottom: 80 }}>

          {/* Loading */}
          {isLoading && (
            <div style={{ paddingTop: 40 }}>
              <DetailSkeleton />
            </div>
          )}

          {/* Error */}
          {status === 'failed' && (
            <Container>
              <Row className="justify-content-center text-center py-5">
                <Col lg={6}>
                  <h4 className="mb-2">Couldn't load this post</h4>
                  <p className="text-muted mb-4">{error}</p>
                  <Link to="/blog" className="btn btn-outline-primary">← Back to Blog</Link>
                </Col>
              </Row>
            </Container>
          )}

          {/* Post */}
          {status === 'succeeded' && post && (
            <Container>
              <Row className="justify-content-center">
                <Col lg={8}>

                  {/* Back link */}
                  <Link
                    to="/blog"
                    className="text-muted d-inline-flex align-items-center gap-1 mb-4 fade-in-up"
                    style={{ fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.target.style.color = '')}
                  >
                    ← Back to Blog
                  </Link>

                  {/* Category */}
                  {post.category && (
                    <div className="mb-3 fade-in-up">
                      <Badge
                        style={{
                          background: 'var(--primary-gradient)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-full)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {post.category}
                      </Badge>
                    </div>
                  )}

                  {/* Title */}
                  <h1
                    className="fade-in-up"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      marginBottom: '1rem',
                      lineHeight: 1.1,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {post.title}
                  </h1>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p
                      className="lead fade-in-up"
                      style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '1.5rem' }}
                    >
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta row */}
                  <div
                    className="d-flex flex-wrap align-items-center gap-3 mb-5 fade-in-up"
                    style={{
                      paddingBottom: '1.5rem',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    {post.author?.name && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span
                          style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'var(--primary-gradient)',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.875rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                          }}
                        >
                          {post.author.name[0]}
                        </span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                          {post.author.name}
                        </span>
                      </span>
                    )}
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                    {(post.readTime || post.read_time) && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        · {post.readTime || post.read_time} min read
                      </span>
                    )}
                  </div>

                  {/* Cover image */}
                  {post.coverImage && (
                    <div
                      className="fade-in-up mb-5"
                      style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
                    >
                      <LazyImage
                        src={post.coverImage}
                        alt={post.title}
                        className="w-100"
                        style={{ maxHeight: 420, objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  {post.content ? (
                    <div
                      className="fade-in-up blog-post-content"
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1.0625rem',
                        lineHeight: 1.85,
                      }}
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  ) : (
                    <p className="text-muted fst-italic">No content available.</p>
                  )}

                  {/* Tags */}
                  {post.tags?.length > 0 && (
                    <div
                      className="mt-5 pt-4 fade-in-up"
                      style={{ borderTop: '1px solid var(--border-subtle)' }}
                    >
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 10 }}>
                        Tagged:
                      </p>
                      <div>
                        {post.tags.map((tag) => (
                          <TagPill key={tag} tag={tag} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Back CTA */}
                  <div className="mt-5 pt-3 fade-in-up">
                    <Link to="/blog" className="btn btn-outline-primary">
                      ← More Articles
                    </Link>
                  </div>

                </Col>
              </Row>
            </Container>
          )}
        </section>
      </main>
    </>
  );
};

export default BlogDetail;