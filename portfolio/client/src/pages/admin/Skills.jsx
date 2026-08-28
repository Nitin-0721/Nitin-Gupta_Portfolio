import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../services/skillService.js';
import Button from '../../components/common/Button.jsx';
import Loader from '../../components/ui/Loader.jsx';
import ErrorMessage from '../../components/ui/ErrorMessage.jsx';
import { Plus, Edit2, Trash2, X, AlertTriangle } from 'lucide-react';

export default function Skills() {
  const [skills, setSkills] = useState([]);
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
    name: '',
    category: 'Languages',
    order: 0
  });

  const categories = ['Languages', 'Frontend', 'Backend', 'Databases', 'AI/ML', 'Tools'];

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getSkills();
      setSkills(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch skills.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
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
    setFormData({ name: '', category: 'Languages', order: 0 });
    setIsModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingId(skill._id);
    setFormError('');
    setFormData({
      name: skill.name || '',
      category: skill.category || 'Languages',
      order: skill.order || 0
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category.trim()) {
      setFormError('Skill Name and Category are required.');
      return;
    }

    try {
      setFormLoading(true);
      setFormError('');
      if (editingId) {
        await updateSkill(editingId, formData);
        setSuccessMsg('Skill updated successfully.');
      } else {
        await createSkill(formData);
        setSuccessMsg('Skill added successfully.');
      }
      setIsModalOpen(false);
      fetchSkills();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setFormError(err.message || 'API request failed.');
    } finally {
      setFormLoading(false);
    }
  };

  const openDeleteConfirm = (skill) => {
    setDeleteTarget(skill);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteSkill(deleteTarget._id);
      setSuccessMsg('Skill deleted successfully.');
      fetchSkills();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to delete skill.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Manage Skills</h1>
          <p className="text-slate-500 mt-1.5 text-sm">Add, modify, or remove technical skills displayed on your public page</p>
        </div>
        <Button onClick={openAddModal} variant="primary" className="gap-1.5 cursor-pointer">
          <Plus className="w-4.5 h-4.5" />
          <span>Add Skill</span>
        </Button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-start gap-3 shadow-xs">
          <span className="text-sm font-semibold leading-normal">{successMsg}</span>
        </div>
      )}

      {loading ? (
        <Loader message="Loading skills from database..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchSkills} />
      ) : skills.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl max-w-md mx-auto shadow-sm">
          <p className="text-slate-500 text-sm font-medium">No skills added yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Skill Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Display Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {skills.map((skill) => (
                <tr key={skill._id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-semibold text-slate-900">{skill.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center text-xs font-semibold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                      {skill.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{skill.order}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(skill)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                      title="Edit Skill"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(skill)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                      title="Delete Skill"
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

      {/* Add / Edit Skill Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white border border-slate-250 rounded-2xl max-w-md w-full shadow-xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                {editingId ? 'Edit Skill Details' : 'Add New Skill'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Skill Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Node.js"
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
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
                  placeholder="0"
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
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
                  {formLoading ? 'Saving...' : 'Save Skill'}
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
            <h3 className="text-md font-bold text-slate-900 mb-2">Delete Skill</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteTarget.name}"</span>?
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
