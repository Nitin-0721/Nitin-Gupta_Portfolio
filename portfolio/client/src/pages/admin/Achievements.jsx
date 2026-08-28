import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '../../services/achievementService.js';
import Button from '../../components/common/Button.jsx';
import Loader from '../../components/ui/Loader.jsx';
import ErrorMessage from '../../components/ui/ErrorMessage.jsx';
import { Plus, Edit2, Trash2, X, AlertTriangle } from 'lucide-react';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = adding, ID = editing
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    organization: '',
    date: '',
    url: '',
    order: 0
  });

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAchievements();
      setAchievements(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch achievements.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value, 10) || 0 : value
    }));
    setFormError('');
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormError('');
    setFormData({
      title: '',
      description: '',
      organization: '',
      date: '',
      url: '',
      order: 0
    });
    setIsModalOpen(true);
  };

  const openEditModal = (ach) => {
    setEditingId(ach._id);
    setFormError('');
    setFormData({
      title: ach.title || '',
      description: ach.description || '',
      organization: ach.organization || '',
      date: ach.date || '',
      url: ach.url || '',
      order: ach.order || 0
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = formData;

    if (!title.trim() || !description.trim()) {
      setFormError('Achievement Title and Description are required.');
      return;
    }

    try {
      setFormLoading(true);
      setFormError('');
      if (editingId) {
        await updateAchievement(editingId, formData);
        setSuccessMsg('Achievement updated successfully.');
      } else {
        await createAchievement(formData);
        setSuccessMsg('Achievement added successfully.');
      }
      setIsModalOpen(false);
      fetchAchievements();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setFormError(err.message || 'API request failed.');
    } finally {
      setFormLoading(false);
    }
  };

  const openDeleteConfirm = (ach) => {
    setDeleteTarget(ach);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAchievement(deleteTarget._id);
      setSuccessMsg('Achievement deleted successfully.');
      fetchAchievements();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to delete achievement.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Manage Achievements</h1>
          <p className="text-slate-500 mt-1.5 text-sm">Add, modify, or remove awards, competition positions, and ratings</p>
        </div>
        <Button onClick={openAddModal} variant="primary" className="gap-1.5 cursor-pointer">
          <Plus className="w-4.5 h-4.5" />
          <span>Add Achievement</span>
        </Button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-start gap-3 shadow-xs">
          <span className="text-sm font-semibold leading-normal">{successMsg}</span>
        </div>
      )}

      {loading ? (
        <Loader message="Loading achievements records..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchAchievements} />
      ) : achievements.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl max-w-md mx-auto shadow-sm">
          <p className="text-slate-500 text-sm font-medium">No achievements added yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Organization / Context</th>
                <th className="px-6 py-4">Display Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {achievements.map((ach) => (
                <tr key={ach._id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-semibold text-slate-900">{ach.title}</td>
                  <td className="px-6 py-4">{ach.organization || 'N/A'}</td>
                  <td className="px-6 py-4 font-mono text-xs">{ach.order}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(ach)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                      title="Edit Achievement"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(ach)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                      title="Delete Achievement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Achievement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white border border-slate-250 rounded-2xl max-w-2xl w-full shadow-xl flex flex-col overflow-hidden max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                {editingId ? 'Edit Achievement Details' : 'Add Achievement / Activity'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 overflow-y-auto">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Achievement Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. SIH Finalist"
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Organization / Awarder
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="e.g. Smart India Hackathon"
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Date / Term
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="e.g. 2024"
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    External Link / Profile URL
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    min="0"
                    value={formData.order}
                    onChange={handleInputChange}
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your achievement or competitive metrics..."
                  rows={4}
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  variant="secondary"
                  className="py-2 cursor-pointer"
                  disabled={formLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="py-2 cursor-pointer"
                  disabled={formLoading}
                >
                  {formLoading ? 'Saving...' : 'Save Achievement'}
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
            <h3 className="text-md font-bold text-slate-900 mb-2">Delete Achievement Record</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteTarget.title}"</span>?
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
