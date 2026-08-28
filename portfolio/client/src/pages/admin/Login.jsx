import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';
import Button from '../../components/common/Button.jsx';
import { Shield, AlertTriangle } from 'lucide-react';

export default function Login() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to admin landing
  if (isAuthenticated && !loading) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      setFormError('Please enter both email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError('');

      const response = await api.post('/auth/login', { email, password });
      
      if (response.data?.success && response.data?.token) {
        await login(response.data.token);
        navigate('/admin');
      } else {
        setFormError('Invalid server response during authentication.');
      }
    } catch (err) {
      setFormError(err.message || 'Login failed. Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12 selection:bg-blue-600 selection:text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-md w-full z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-2xl text-blue-600 inline-block mb-4 shadow-sm">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin Login</h1>
          <p className="text-sm text-slate-500 mt-1.5">Sign in to manage your portfolio content</p>
        </div>

        {/* Card Body */}
        <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-md">
          {/* Error Banner */}
          {formError && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 mt-0.5 text-rose-600 flex-shrink-0" />
              <span className="text-sm font-semibold leading-normal">{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400 text-slate-800"
                disabled={isSubmitting}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400 text-slate-800"
                disabled={isSubmitting}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-3 mt-2 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Button to="/" variant="secondary" className="text-xs py-2">
            Back to Public Site
          </Button>
        </div>
      </div>
    </div>
  );
}
