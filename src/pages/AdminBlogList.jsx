import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Table, Modal, Button } from 'react-bootstrap';
import {
  fetchBlogs,
  deleteBlog,
  selectAllBlogs,
  selectBlogsStatus,
  selectMutationStatus,
  selectMutationError,
  clearMutationState,
} from '../redux/slices/Blogslice';

/* ─── Status badge helper ─────────────────────────────────────────────────── */
const STATUS_STYLES = {
  PUBLISHED: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.35)', color: '#4ade80' },
  DRAFT:     { bg: 'rgba(253,186,116,0.15)', border: 'rgba(253,186,116,0.35)', color: '#fbbf24' },
  ARCHIVED:  { bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.25)', color: '#94a3b8' },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES.ARCHIVED;
  return (
    <span
      style={{
        padding: '3px 10px',
        borderRadius: 'var(--radius-full)',
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        fontSize: '0.75rem',
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  );
};

/* ─── Confirm Delete Modal ────────────────────────────────────────────────── */
const DeleteModal = ({ post, onConfirm, onCancel, loading }) => (
  <Modal show={!!post} onHide={onCancel} centered>
    <div
      style={{
        background: 'var(--bg-dark-navy)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        color: 'var(--text-primary)',
      }}
    >
      <h5 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.75rem' }}>
        Delete Post
      </h5>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>"{post?.title}"</strong>?
        This cannot be undone.
      </p>
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary-dark btn-sm" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button
          className="btn btn-sm"
          style={{
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: '0.4rem 1rem',
            fontWeight: 600,
          }}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </div>
  </Modal>
);

/* ─── Main Component ──────────────────────────────────────────────────────── */
const AdminBlogList = () => {
  const dispatch        = useDispatch();
  const posts           = useSelector(selectAllBlogs);
  const status          = useSelector(selectBlogsStatus);
  const mutationStatus  = useSelector(selectMutationStatus);
  const mutationError   = useSelector(selectMutationError);

  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchBlogs());
  }, [dispatch, status]);

  // Close modal & clear mutation state after successful delete
  useEffect(() => {
    if (mutationStatus === 'succeeded') {
      setToDelete(null);
      dispatch(clearMutationState());
    }
  }, [mutationStatus, dispatch]);

  const handleDelete = () => {
    if (toDelete) dispatch(deleteBlog(toDelete.id));
  };

  const isLoading = status === 'idle' || status === 'loading';

  const formatDate = (str) =>
    str ? new Date(str).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '—';

  return (
    <div style={{ background: 'var(--bg-midnight)', minHeight: '100vh', padding: '2rem 0' }}>
      <Container>

        {/* Header */}
        <Row className="align-items-center mb-4">
          <Col>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
              Blog Posts
            </h2>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </p>
          </Col>
          <Col xs="auto">
            <Link to="/admin/blogs/new" className="btn btn-primary btn-sm">
              + New Post
            </Link>
          </Col>
        </Row>

        {/* Error banner */}
        {mutationError && (
          <div
            className="mb-3"
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 'var(--radius-md)',
              color: '#f87171',
              fontSize: '0.875rem',
            }}
          >
            {mutationError}
          </div>
        )}

        {/* Table card */}
        <div
          style={{
            background: 'var(--bg-dark-navy)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}
        >
          {isLoading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading posts…
            </div>
          ) : posts.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No posts yet.{' '}
              <Link to="/admin/blogs/new" style={{ color: 'var(--primary-color)' }}>Create the first one →</Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    {['Title', 'Category', 'Status', 'Author', 'Date', 'Actions'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '0.875rem 1.25rem',
                          textAlign: 'left',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, i) => (
                    <tr
                      key={post.id}
                      style={{
                        borderBottom: i < posts.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {/* Title */}
                      <td style={{ padding: '1rem 1.25rem', maxWidth: 280 }}>
                        <p
                          style={{
                            color: 'var(--text-primary)',
                            fontWeight: 600,
                            fontSize: '0.9375rem',
                            margin: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {post.title}
                        </p>
                        {post.excerpt && (
                          <p
                            style={{
                              color: 'var(--text-muted)',
                              fontSize: '0.8125rem',
                              margin: '2px 0 0',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {post.excerpt}
                          </p>
                        )}
                      </td>
                      {/* Category */}
                      <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                          {post.category || '—'}
                        </span>
                      </td>
                      {/* Status */}
                      <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                        <StatusBadge status={post.status} />
                      </td>
                      {/* Author */}
                      <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                          {post.author?.name || '—'}
                        </span>
                      </td>
                      {/* Date */}
                      <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                      </td>
                      {/* Actions */}
                      <td style={{ padding: '1rem 1.25rem', whiteSpace: 'nowrap' }}>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '4px 10px',
                              borderRadius: 'var(--radius-sm)',
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid var(--border-light)',
                              color: 'var(--text-muted)',
                              fontSize: '0.8125rem',
                              fontWeight: 500,
                              textDecoration: 'none',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => { e.target.style.color = 'var(--text-primary)'; }}
                            onMouseLeave={(e) => { e.target.style.color = 'var(--text-muted)'; }}
                          >
                            View
                          </Link>
                          <Link
                            to={`/admin/blogs/${post.id}/edit`}
                            style={{
                              padding: '4px 10px',
                              borderRadius: 'var(--radius-sm)',
                              background: 'rgba(238,79,39,0.1)',
                              border: '1px solid rgba(238,79,39,0.25)',
                              color: 'var(--primary-color)',
                              fontSize: '0.8125rem',
                              fontWeight: 500,
                              textDecoration: 'none',
                              transition: 'all 0.2s',
                            }}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setToDelete(post)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: 'var(--radius-sm)',
                              background: 'rgba(239,68,68,0.1)',
                              border: '1px solid rgba(239,68,68,0.25)',
                              color: '#f87171',
                              fontSize: '0.8125rem',
                              fontWeight: 500,
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </Container>

      {/* Confirm modal */}
      <DeleteModal
        post={toDelete}
        onConfirm={handleDelete}
        onCancel={() => { setToDelete(null); dispatch(clearMutationState()); }}
        loading={mutationStatus === 'loading'}
      />
    </div>
  );
};

export default AdminBlogList;