import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import { getEducations, createEducation, updateEducation, deleteEducation } from '../../services/educationService.js';
import Button from '../../components/common/Button.jsx';
import Loader from '../../components/ui/Loader.jsx';
import ErrorMessage from '../../components/ui/ErrorMessage.jsx';
import { Plus, Edit2, Trash2, X, AlertTriangle } from 'lucide-react';

export default function Education() {
  const [educations, setEducations] = useState([]);
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
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    order: 0
  });

  const fetchEducations = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getEducations();
      setEducations(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch education records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
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
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      order: 0
    });
    setIsModalOpen(true);
  };

  const openEditModal = (edu) => {
    setEditingId(edu._id);
    setFormError('');
    setFormData({
      institution: edu.institution || '',
      degree: edu.degree || '',
      field: edu.field || '',
      location: edu.location || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      description: edu.description || '',
      order: edu.order || 0
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { institution, degree, startDate } = formData;

    if (!institution.trim() || !degree.trim() || !startDate.trim()) {
      setFormError('Institution name, Degree, and Start Date are required.');
      return;
    }

    try {
      setFormLoading(true);
      setFormError('');
      if (editingId) {
        await updateEducation(editingId, formData);
        setSuccessMsg('Education record updated successfully.');
      } else {
        await createEducation(formData);
        setSuccessMsg('Education record added successfully.');
      }
      setIsModalOpen(false);
      fetchEducations();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setFormError(err.message || 'API request failed.');
    } finally {
      setFormLoading(false);
    }
  };

  const openDeleteConfirm = (edu) => {
    setDeleteTarget(edu);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteEducation(deleteTarget._id);
      setSuccessMsg('Education record deleted successfully.');
      fetchEducations();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to delete education.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Manage Education</h1>
          <p className="text-slate-500 mt-1.5 text-sm">Add, modify, or remove academic achievements and certificates</p>
        </div>
        <Button onClick={openAddModal} variant="primary" className="gap-1.5 cursor-pointer">
          <Plus className="w-4.5 h-4.5" />
          <span>Add Education</span>
        </Button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-start gap-3 shadow-xs">
          <span className="text-sm font-semibold leading-normal">{successMsg}</span>
        </div>
      )}

      {loading ? (
        <Loader message="Loading academic records..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchEducations} />
      ) : educations.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl max-w-md mx-auto shadow-sm">
          <p className="text-slate-500 text-sm font-medium">No education added yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Institution</th>
                <th className="px-6 py-4">Degree & Field</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {educations.map((edu) => (
                <tr key={edu._id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-semibold text-slate-900">{edu.institution}</td>
                  <td className="px-6 py-4">
                    {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                  </td>
                  <td className="px-6 py-4">
                    {edu.startDate} – {edu.endDate || 'Present'}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{edu.order}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(edu)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                      title="Edit Education"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(edu)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                      title="Delete Education"
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

      {/* Add / Edit Education Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white border border-slate-250 rounded-2xl max-w-2xl w-full shadow-xl flex flex-col overflow-hidden max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                {editingId ? 'Edit Education Details' : 'Add Academic Degree'}
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
                  Institution Name *
                </label>
                <input
                  type="text"
                  name="institution"
                  required
                  value={formData.institution}
                  onChange={handleInputChange}
                  placeholder="e.g. Madan Mohan Malaviya University of Technology"
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Degree *
                  </label>
                  <input
                    type="text"
                    name="degree"
                    required
                    value={formData.degree}
                    onChange={handleInputChange}
                    placeholder="e.g. B.Tech"
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    name="field"
                    value={formData.field}
                    onChange={handleInputChange}
                    placeholder="e.g. IoT Specialization"
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Gorakhpur, India"
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Start Year / Term *
                  </label>
                  <input
                    type="text"
                    name="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleInputChange}
                    placeholder="e.g. 2022"
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                    End Year (or Expected)
                  </label>
                  <input
                    type="text"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    placeholder="e.g. 2026"
                    className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
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
                  Description / Bullet points / Syllabus details
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Focusing on computer science basics, IoT firmware development, microcontrollers, embedded C..."
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
                  {formLoading ? 'Saving...' : 'Save Education'}
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
            <h3 className="text-md font-bold text-slate-900 mb-2">Delete Education Record</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteTarget.degree} from {deleteTarget.institution}"</span>?
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
