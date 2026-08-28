import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import { getProfile, updateProfile } from '../../services/profileService.js';
import Button from '../../components/common/Button.jsx';
import Loader from '../../components/ui/Loader.jsx';
import ErrorMessage from '../../components/ui/ErrorMessage.jsx';
import { User, Save, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    professionalTitle: '',
    bio: '',
    email: '',
    location: '',
    profileImage: '',
    resumeUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    leetcodeUrl: '',
    codechefUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getProfile();
        if (response.success && response.data) {
          setFormData({
            name: response.data.name || '',
            professionalTitle: response.data.professionalTitle || '',
            bio: response.data.bio || '',
            email: response.data.email || '',
            location: response.data.location || '',
            profileImage: response.data.profileImage || '',
            resumeUrl: response.data.resumeUrl || '',
            githubUrl: response.data.githubUrl || '',
            linkedinUrl: response.data.linkedinUrl || '',
            leetcodeUrl: response.data.leetcodeUrl || '',
            codechefUrl: response.data.codechefUrl || ''
          });
        }
      } catch (err) {
        setError(err.message || 'Failed to load profile details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccessMsg('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Front-end validations
    if (
      !formData.name.trim() ||
      !formData.professionalTitle.trim() ||
      !formData.bio.trim() ||
      !formData.email.trim() ||
      !formData.location.trim()
    ) {
      setError('Please fill in all required fields (Name, Professional Title, Bio, Email, Location).');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      setSuccessMsg('');
      const response = await updateProfile(formData);
      if (response.success) {
        setSuccessMsg('Profile updated successfully.');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile data.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Manage Profile</h1>
          <p className="text-slate-500 mt-1.5 text-sm">Update your main developer bio, locations, and social URLs</p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-start gap-3 shadow-xs">
          <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600 flex-shrink-0" />
          <span className="text-sm font-semibold leading-normal">{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 mt-0.5 text-rose-600 flex-shrink-0" />
          <span className="text-sm font-semibold leading-normal">{error}</span>
        </div>
      )}

      {loading ? (
        <Loader message="Loading profile details..." />
      ) : (
        <form onSubmit={handleFormSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs max-w-4xl">
          {/* Section 1: Main Info */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Central Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Nitin Gupta"
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Professional Title *
                </label>
                <input
                  type="text"
                  name="professionalTitle"
                  required
                  value={formData.professionalTitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Software Developer"
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. mail@example.com"
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Gorakhpur, India"
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                Biography / Intro Summary *
              </label>
              <textarea
                name="bio"
                required
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Write a short biography..."
                rows={4}
                className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-255 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 resize-none"
                disabled={submitting}
              />
            </div>
          </div>

          {/* Section 2: Media and Documents */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Media & Documents</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleInputChange}
                  placeholder="/images/profile.jpg"
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Resume URL (PDF)
                </label>
                <input
                  type="text"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleInputChange}
                  placeholder="/resume.pdf"
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  disabled={submitting}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Social Profile Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Social & Coding Links</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/..."
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  LeetCode URL
                </label>
                <input
                  type="url"
                  name="leetcodeUrl"
                  value={formData.leetcodeUrl}
                  onChange={handleInputChange}
                  placeholder="https://leetcode.com/u/..."
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  CodeChef URL
                </label>
                <input
                  type="url"
                  name="codechefUrl"
                  value={formData.codechefUrl}
                  onChange={handleInputChange}
                  placeholder="https://codechef.com/users/..."
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  disabled={submitting}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              className="gap-2 cursor-pointer py-2.5"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving Profile...</span>
                </>
              ) : (
                <>
                  <Save className="w-4.5 h-4.5" />
                  <span>Save Profile</span>
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </AdminLayout>
  );
}
