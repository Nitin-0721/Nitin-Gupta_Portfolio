import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import api from '../../services/api.js';
import Button from '../../components/common/Button.jsx';
import { Plus, Edit2, Trash2, X, AlertTriangle, ExternalLink } from 'lucide-react';
import Loader from '../../components/ui/Loader.jsx';
import ErrorMessage from '../../components/ui/ErrorMessage.jsx';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null); // null = closed, proj = confirm open

  // Modal form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = adding, ID = editing
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    technologies: '',
    features: '',
    githubUrl: '',
    liveUrl: '',
    image: '',
    category: '',
    order: 0
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/projects');
      setProjects(response.data?.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load projects list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Form input hander
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value, 10) || 0 : value
    }));
    setFormError('');
  };

  // Generate slug dynamically from title
  const generateSlug = () => {
    const slugValue = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData((prev) => ({ ...prev, slug: slugValue }));
  };

  // Open modal for adding
  const openAddModal = () => {
    setEditingId(null);
    setFormError('');
    setFormData({
      title: '',
      slug: '',
      description: '',
      technologies: '',
      features: '',
      githubUrl: '',
      liveUrl: '',
      image: '',
      category: '',
      order: 0
    });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (proj) => {
    setEditingId(proj._id);
    setFormError('');
    setFormData({
      title: proj.title || '',
      slug: proj.slug || '',
      description: proj.description || '',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : '',
      features: Array.isArray(proj.features) ? proj.features.join('\n') : '',
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      image: proj.image || '',
      category: proj.category || '',
      order: proj.order || 0
    });
    setIsModalOpen(true);
  };

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { title, slug, description, technologies, features } = formData;

    if (!title.trim() || !slug.trim() || !description.trim()) {
      setFormError('Title, Slug, and Description fields are required.');
      return;
    }

    // Format list fields as array items
    const technologiesArray = technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const featuresArray = features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const submissionPayload = {
      ...formData,
      technologies: technologiesArray,
      features: featuresArray
    };

    try {
      setFormLoading(true);
      setFormError('');

      if (editingId) {
        // PUT update action
        await api.put(`/projects/${editingId}`, submissionPayload);
        setSuccessMsg('Project updated successfully.');
      } else {
        // POST create action
        await api.post('/projects', submissionPayload);
        setSuccessMsg('Project created successfully.');
      }

      setIsModalOpen(false);
      fetchProjects();
      
      // Auto-clear success banner
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setFormError(err.message || 'API request failed during submission.');
    } finally {
      setFormLoading(false);
    }
  };

  // Open delete target
  const handleDeleteProject = (proj) => {
    setDeleteTarget(proj);
  };

  // Perform actual API delete
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setSuccessMsg('');
      await api.delete(`/projects/${deleteTarget._id}`);
      setSuccessMsg('Project deleted successfully.');
      fetchProjects();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to delete project.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      {/* Header and buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Manage Projects</h1>
          <p className="text-slate-500 mt-1.5 text-sm">Add, modify, or remove portfolio showcase items</p>
        </div>
        <Button onClick={openAddModal} variant="primary" className="gap-1.5 cursor-pointer">
          <Plus className="w-4.5 h-4.5" />
          <span>Add Project</span>
        </Button>
      </div>

      {/* Response Banners */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-xl font-medium text-sm">
          {successMsg}
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-250 text-rose-800 rounded-xl font-medium text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 mt-0.5 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Projects Table */}
      {loading ? (
        <Loader message="Querying database projects..." />
      ) : error && projects.length === 0 ? (
        <ErrorMessage message={error} onRetry={fetchProjects} />
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl max-w-md mx-auto">
          <p className="text-slate-450 text-sm">No project items found. Click 'Add Project' to create one.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4">Technologies</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {projects.map((proj) => (
                  <tr key={proj._id} className="hover:bg-slate-50/40 text-slate-700">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{proj.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{proj.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {proj.category || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-mono">{proj.order}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {proj.technologies.slice(0, 3).map((t, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-650">
                            {t}
                          </span>
                        ))}
                        {proj.technologies.length > 3 && (
                          <span className="text-[10px] text-slate-400">+{proj.technologies.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-1.5 text-slate-450 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4.5 h-4.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj)}
                          className="p-1.5 text-slate-450 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Overlay Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl max-h-[90vh] flex flex-col my-8">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-150 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              {formError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex gap-2 items-start">
                  <AlertTriangle className="w-4.5 h-4.5 mt-0.5 text-rose-600 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title & Slug */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    onBlur={generateSlug}
                    placeholder="e.g. Portfolio Website"
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Slug (URL string) *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="e.g. portfolio-website"
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 font-mono"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Short description summary..."
                  rows={3}
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 resize-none"
                />
              </div>

              {/* Technologies & Features */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Technologies (comma separated)
                  </label>
                  <textarea
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="React, Express, Node, MongoDB"
                    rows={3}
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Key Features (one per line)
                  </label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    placeholder="Implemented secure login authentication.&#10;Added automatic email forms."
                    rows={3}
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 resize-none"
                  />
                </div>
              </div>

              {/* Git & Live URLs */}
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
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
              </div>

              {/* Image URL, Category, and Order */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g. Web App"
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    min="0"
                    value={formData.order}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="e.g. /images/proj.jpg"
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
              </div>

              {/* Buttons footer inside modal */}
              <div className="border-t border-slate-150 pt-6 mt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  variant="secondary"
                  className="py-2.5 font-medium cursor-pointer"
                  disabled={formLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="py-2.5 font-medium cursor-pointer"
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Project</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white border border-slate-250 rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-md font-bold text-slate-900 mb-2">Delete Project</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteTarget.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button onClick={() => setDeleteTarget(null)} variant="secondary" className="py-2 text-xs cursor-pointer">
                Cancel
              </Button>
              <Button onClick={handleDeleteConfirm} variant="danger" className="py-2 text-xs cursor-pointer">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
