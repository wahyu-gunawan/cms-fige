'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Email atau password salah');
        setLoading(false);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <span className="admin-login-logo">FIGE & REKAN</span>
          <span className="admin-login-subtitle">Content Management System</span>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Email</label>
            <input
              type="email"
              className="admin-form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@fige.com"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <input
              type="password"
              className="admin-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="admin-btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? <span className="admin-spinner"></span> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
