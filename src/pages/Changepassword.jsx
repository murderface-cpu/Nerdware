import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, clearPasswordState, selectPasswordStatus, selectPasswordError } from '../redux/slices/authslice';

export default function ChangePassword() {
  const dispatch       = useDispatch();
  const status         = useSelector(selectPasswordStatus);
  const error          = useSelector(selectPasswordError);

  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [localError, setLocalError] = useState('');

  useEffect(() => () => dispatch(clearPasswordState()), [dispatch]);

  const toggleShow = (field) => setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (localError) setLocalError('');
    if (error) dispatch(clearPasswordState());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmNewPassword) {
      setLocalError('New passwords do not match.');
      return;
    }
    if (form.newPassword.length < 6) {
      setLocalError('New password must be at least 6 characters.');
      return;
    }
    dispatch(changePassword({
      currentPassword: form.currentPassword,
      newPassword:     form.newPassword,
    }));
  };

  const handleReset = () => {
    setForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setLocalError('');
    dispatch(clearPasswordState());
  };

  const isLoading    = status === 'loading';
  const isSuccess    = status === 'succeeded';
  const displayError = localError || error;

  const EyeIcon = ({ visible }) =>
    visible ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );

  return (
    <div className="auth-page">
      <div className="auth-glow" aria-hidden="true" />

      <div className="auth-card fade-in-up">
        <div className="auth-brand">
          <span className="text-gradient">Nerdware</span>
        </div>

        <h2 className="auth-heading">Change password</h2>
        <p className="auth-subheading">Keep your account secure with a strong password</p>

        {/* Success state */}
        {isSuccess && (
          <div className="auth-success" role="status">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Password changed successfully!
          </div>
        )}

        {/* Error state */}
        {!isSuccess && displayError && (
          <div className="auth-alert" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {displayError}
          </div>
        )}

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {/* Current password */}
            <div className="auth-field">
              <label htmlFor="currentPassword" className="form-label">Current password</label>
              <div className="auth-input-wrapper">
                <input
                  id="currentPassword"
                  type={show.current ? 'text' : 'password'}
                  name="currentPassword"
                  className="form-control"
                  placeholder="••••••••"
                  value={form.currentPassword}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button type="button" className="auth-eye-btn" onClick={() => toggleShow('current')} aria-label="Toggle visibility">
                  <EyeIcon visible={show.current} />
                </button>
              </div>
            </div>

            <div className="auth-divider" />

            {/* New password */}
            <div className="auth-field">
              <label htmlFor="newPassword" className="form-label">New password</label>
              <div className="auth-input-wrapper">
                <input
                  id="newPassword"
                  type={show.new ? 'text' : 'password'}
                  name="newPassword"
                  className="form-control"
                  placeholder="Min. 6 characters"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                <button type="button" className="auth-eye-btn" onClick={() => toggleShow('new')} aria-label="Toggle visibility">
                  <EyeIcon visible={show.new} />
                </button>
              </div>
            </div>

            {/* Confirm new password */}
            <div className="auth-field">
              <label htmlFor="confirmNewPassword" className="form-label">Confirm new password</label>
              <div className="auth-input-wrapper">
                <input
                  id="confirmNewPassword"
                  type={show.confirm ? 'text' : 'password'}
                  name="confirmNewPassword"
                  className="form-control"
                  placeholder="Re-enter new password"
                  value={form.confirmNewPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                <button type="button" className="auth-eye-btn" onClick={() => toggleShow('confirm')} aria-label="Toggle visibility">
                  <EyeIcon visible={show.confirm} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="auth-spinner" aria-hidden="true" />
                  Updating…
                </>
              ) : 'Update password'}
            </button>
          </form>
        ) : (
          /* Post-success CTA */
          <div className="auth-post-success">
            <p className="auth-subheading" style={{ marginBottom: '1.5rem' }}>
              Your password has been updated. You can now use it to sign in.
            </p>
            <button className="btn btn-primary auth-submit" onClick={handleReset}>
              Change again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}