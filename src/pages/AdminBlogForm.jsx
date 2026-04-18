import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {
  fetchBlogBySlug,
  createBlog,
  updateBlog,
  clearCurrentPost,
  clearMutationState,
  selectCurrentPost,
  selectDetailStatus,
  selectMutationStatus,
  selectMutationError,
} from '../redux/slices/Blogslice';

/* ─── Reusable field wrapper ──────────────────────────────────────────────── */
const Field = ({ label, required, children, hint }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <label
      style={{
        display: 'block',
        marginBottom: '0.375rem',
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        fontWeight: 500,
      }}
    >
      {label} {required && <span style={{ color: 'var(--primary-color)' }}>*</span>}
    </label>
    {children}
    {hint && (
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
        {hint}
      </p>
    )}
  </div>
);

/* ─── Shared input/textarea style ────────────────────────────────────────── */
const inputStyle = {
  width: '100%',
  background: 'var(--bg-dark-navy)',
  border: '1px solid var(--border-light)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  padding: '0.75rem 1rem',
  fontSize: '0.9375rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'var(--font-family)',
};

const focusStyle = {
  borderColor: 'var(--primary-color)',
  boxShadow: '0 0 0 3px rgba(238,79,39,0.15)',
};

const Input = ({ value, onChange, type = 'text', placeholder, ...rest }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ ...inputStyle, ...(focused ? focusStyle : {}) }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...rest}
    />
  );
};

const Textarea = ({ value, onChange, rows = 4, placeholder }) => {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      style={{ ...inputStyle, ...(focused ? focusStyle : {}), resize: 'vertical' }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

const Select = ({ value, onChange, children }) => {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      style={{ ...inputStyle, ...(focused ? focusStyle : {}), cursor: 'pointer' }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </select>
  );
};

/* ─── Empty form state ────────────────────────────────────────────────────── */
const EMPTY = {
  title:     '',
  excerpt:   '',
  content:   '',
  category:  '',
  status:    'DRAFT',
  readTime:  '',
  tags:      '',       // comma-separated string, split on submit
  coverImage: '',
};

/* ─── Main Component ──────────────────────────────────────────────────────── */
const AdminBlogForm = () => {
  const { id }         = useParams();          // present when editing
  const isEdit         = Boolean(id);
  const dispatch       = useDispatch();
  const navigate       = useNavigate();

  const post           = useSelector(selectCurrentPost);
  const detailStatus   = useSelector(selectDetailStatus);
  const mutationStatus = useSelector(selectMutationStatus);
  const mutationError  = useSelector(selectMutationError);

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  /* Load post for editing */
  useEffect(() => {
    if (isEdit && id) {
      // id could be a slug or numeric id — backend /blogs/:slug also works by id
      dispatch(fetchBlogBySlug(id));
    }
    return () => {
      dispatch(clearCurrentPost());
      dispatch(clearMutationState());
    };
  }, [dispatch, id, isEdit]);

  /* Populate form when post loads */
  useEffect(() => {
    if (isEdit && post) {
      setForm({
        title:      post.title      || '',
        excerpt:    post.excerpt    || '',
        content:    post.content    || '',
        category:   post.category   || '',
        status:     post.status     || 'DRAFT',
        readTime:   post.readTime   != null ? String(post.readTime) : '',
        tags:       Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
        coverImage: post.coverImage || '',
      });
    }
  }, [post, isEdit]);

  /* Redirect after successful mutation */
  useEffect(() => {
    if (mutationStatus === 'succeeded') {
      dispatch(clearMutationState());
      navigate('/admin/blogs');
    }
  }, [mutationStatus, dispatch, navigate]);

  /* ── Validation ─────────────────────────────────────────────────────────── */
  const validate = () => {
    const e = {};
    if (!form.title.trim())   e.title   = 'Title is required';
    if (!form.excerpt.trim()) e.excerpt = 'Excerpt is required';
    if (!form.content.trim()) e.content = 'Content is required';
    if (!form.category.trim()) e.category = 'Category is required';
    if (form.readTime && isNaN(Number(form.readTime))) e.readTime = 'Must be a number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Submit ─────────────────────────────────────────────────────────────── */
  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      title:     form.title.trim(),
      excerpt:   form.excerpt.trim(),
      content:   form.content.trim(),
      category:  form.category.trim(),
      status:    form.status,
      readTime:  form.readTime ? Number(form.readTime) : undefined,
      tags:      form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      coverImage: form.coverImage.trim() || undefined,
    };

    if (isEdit) {
      dispatch(updateBlog({ id: post?.id || id, ...payload }));
    } else {
      dispatch(createBlog(payload));
    }
  };

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const isSubmitting = mutationStatus === 'loading';
  const isLoadingPost = isEdit && (detailStatus === 'idle' || detailStatus === 'loading');

  /* ── Error style helper ─────────────────────────────────────────────────── */
  const errStyle = { color: '#f87171', fontSize: '0.8125rem', marginTop: '0.25rem' };

  return (
    <div style={{ background: 'var(--bg-midnight)', minHeight: '100vh', padding: '2rem 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>

            {/* Breadcrumb */}
            <div className="d-flex align-items-center gap-2 mb-4" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <Link to="/admin/blogs" style={{ color: 'var(--text-muted)' }}>Blog Posts</Link>
              <span>›</span>
              <span style={{ color: 'var(--text-primary)' }}>{isEdit ? 'Edit Post' : 'New Post'}</span>
            </div>

            {/* Page title */}
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '2rem',
              }}
            >
              {isEdit ? 'Edit Post' : 'New Blog Post'}
            </h2>

            {/* Loading post skeleton */}
            {isLoadingPost && (
              <div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: 44, borderRadius: 10, marginBottom: 16 }} />
                ))}
              </div>
            )}

            {/* Form */}
            {!isLoadingPost && (
              <div
                style={{
                  background: 'var(--bg-dark-navy)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                }}
              >
                {/* Mutation error */}
                {mutationError && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'rgba(239,68,68,0.12)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: 'var(--radius-md)',
                      color: '#f87171',
                      fontSize: '0.875rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {mutationError}
                  </div>
                )}

                {/* Title */}
                <Field label="Title" required>
                  <Input value={form.title} onChange={set('title')} placeholder="Post title" />
                  {errors.title && <p style={errStyle}>{errors.title}</p>}
                </Field>

                {/* Excerpt */}
                <Field label="Excerpt" required hint="A short summary shown on the blog listing page.">
                  <Textarea value={form.excerpt} onChange={set('excerpt')} rows={2} placeholder="Short description…" />
                  {errors.excerpt && <p style={errStyle}>{errors.excerpt}</p>}
                </Field>

                {/* Content */}
                <Field label="Content" required hint="HTML or plain text content of the post.">
                  <Textarea value={form.content} onChange={set('content')} rows={12} placeholder="Write your post content here…" />
                  {errors.content && <p style={errStyle}>{errors.content}</p>}
                </Field>

                {/* Row: Category + Status */}
                <Row>
                  <Col md={6}>
                    <Field label="Category" required>
                      <Input value={form.category} onChange={set('category')} placeholder="e.g. Web Development" />
                      {errors.category && <p style={errStyle}>{errors.category}</p>}
                    </Field>
                  </Col>
                  <Col md={6}>
                    <Field label="Status">
                      <Select value={form.status} onChange={set('status')}>
                        <option value="DRAFT">Draft</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="ARCHIVED">Archived</option>
                      </Select>
                    </Field>
                  </Col>
                </Row>

                {/* Row: Read time + Cover image */}
                <Row>
                  <Col md={4}>
                    <Field label="Read Time (mins)" hint="Approx. reading time in minutes.">
                      <Input value={form.readTime} onChange={set('readTime')} type="number" placeholder="5" />
                      {errors.readTime && <p style={errStyle}>{errors.readTime}</p>}
                    </Field>
                  </Col>
                  <Col md={8}>
                    <Field label="Cover Image URL" hint="Optional. Paste a direct image URL.">
                      <Input value={form.coverImage} onChange={set('coverImage')} placeholder="https://…" />
                    </Field>
                  </Col>
                </Row>

                {/* Tags */}
                <Field label="Tags" hint="Comma-separated. e.g. react, nextjs, webdev">
                  <Input value={form.tags} onChange={set('tags')} placeholder="react, nextjs, webdev" />
                </Field>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '0.75rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <Link to="/admin/blogs" className="btn btn-secondary-dark btn-sm">
                    Cancel
                  </Link>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    style={{ minWidth: 120 }}
                  >
                    {isSubmitting
                      ? (isEdit ? 'Saving…' : 'Creating…')
                      : (isEdit ? 'Save Changes' : 'Publish Post')}
                  </button>
                </div>
              </div>
            )}

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminBlogForm;