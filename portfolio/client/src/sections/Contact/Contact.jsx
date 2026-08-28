import React, { useState } from 'react';
import SectionTitle from '../../components/common/SectionTitle.jsx';
import Button from '../../components/common/Button.jsx';
import { submitContactMessage } from '../../services/contactService.js';
import { Mail, CheckCircle2, AlertTriangle, Send } from 'lucide-react';
import { DEVELOPER_INFO } from '../../constants/config.js';
import useScrollReveal from '../../hooks/useScrollReveal.js';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' }); // type: 'success' | 'error' | ''
  const [revealRef, isRevealed] = useScrollReveal();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side quick checks
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'All form fields are required.' });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: '', message: '' });
      
      const response = await submitContactMessage(formData);
      
      if (response.success) {
        setStatus({
          type: 'success',
          message: 'Your message has been received! Thank you for getting in touch.'
        });
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus({
          type: 'error',
          message: response.message || 'Failed to submit form data.'
        });
      }
    } catch (err) {
      // Use clean message avoiding backend dump details
      setStatus({
        type: 'error',
        message: err.message || 'An unexpected server error occurred. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={revealRef}
      className={`py-20 bg-slate-50 border-t border-slate-100 reveal-element transition-all duration-700 ease-out transform ${
        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          title="Contact Me"
          subtitle="Get in touch for internships, project collaborations, or general questions."
        />

        <div className="grid md:grid-cols-5 gap-10 items-start max-w-4xl mx-auto">
          {/* Info Card (Left) */}
          <div className="md:col-span-2 space-y-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs">
            <h3 className="text-lg font-bold text-slate-900">Contact Information</h3>
            <p className="text-xs text-slate-555 leading-relaxed">
              Fill out the form to leave a message. I usually review messages and respond via email within 24-48 hours.
            </p>

            <div className="border-t border-slate-100 pt-6 space-y-4">
              <a
                href={`mailto:${DEVELOPER_INFO.email}`}
                className="flex items-center gap-3 text-sm text-slate-655 hover:text-blue-600 transition duration-150"
              >
                <div className="p-2 bg-blue-50 border border-blue-100 rounded-lg text-blue-600">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs truncate max-w-full">{DEVELOPER_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Form Card (Right) */}
          <div className="md:col-span-3 bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs">
            {/* Status Notifications */}
            {status.message && (
              <div
                className={`mb-6 p-4 rounded-xl flex items-start gap-3 border ${
                  status.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 mt-0.5 text-rose-600 flex-shrink-0" />
                )}
                <span className="text-sm font-medium leading-normal">{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 placeholder-slate-400 text-slate-800 transition duration-150"
                  disabled={loading}
                />
              </div>

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
                  placeholder="john@example.com"
                  className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 placeholder-slate-400 text-slate-800 transition duration-150"
                  disabled={loading}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message details here..."
                  rows={4}
                  className="w-full text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 placeholder-slate-400 text-slate-800 resize-none transition duration-150"
                  disabled={loading}
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full gap-2 py-3 mt-2 cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
