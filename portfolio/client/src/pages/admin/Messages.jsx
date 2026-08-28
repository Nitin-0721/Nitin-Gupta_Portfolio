import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import api from '../../services/api.js';
import { Mail, Check, Trash2, Calendar, User, MailCheck } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import Loader from '../../components/ui/Loader.jsx';
import ErrorMessage from '../../components/ui/ErrorMessage.jsx';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'read'
  const [deleteTargetId, setDeleteTargetId] = useState(null); // null = closed, messageId = open

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/contact');
      // Sort messages by date descending
      const sorted = (response.data?.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setMessages(sorted);
    } catch (err) {
      setError(err.message || 'Failed to load contact messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      setSuccessMsg('');
      await api.patch(`/contact/${id}/read`);
      setSuccessMsg('Message marked as read.');
      fetchMessages();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to mark message as read.');
    }
  };

  const handleDeleteMessage = (id) => {
    setDeleteTargetId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;

    try {
      setSuccessMsg('');
      await api.delete(`/contact/${deleteTargetId}`);
      setSuccessMsg('Message deleted successfully.');
      fetchMessages();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to delete message.');
    } finally {
      setDeleteTargetId(null);
    }
  };

  // Filter messages based on status
  const filteredMessages = messages.filter((msg) => {
    if (filter === 'unread') return !msg.isRead;
    if (filter === 'read') return msg.isRead;
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Contact Messages</h1>
          <p className="text-slate-500 mt-1.5 text-sm">Review inquiries and messages left by visitors</p>
        </div>

        {/* Filter buttons */}
        <div className="bg-white border border-slate-200 p-1.5 rounded-xl flex gap-1 shadow-3xs font-semibold text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              filter === 'all' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              filter === 'unread' ? 'bg-amber-50 text-amber-700' : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              filter === 'read' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            Read
          </button>
        </div>
      </div>

      {/* Response Banners */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-xl font-medium text-sm">
          {successMsg}
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-250 text-rose-800 rounded-xl font-medium text-sm">
          {error}
        </div>
      )}

      {/* Messages Feed */}
      {loading ? (
        <Loader message="Fetching inbox messages..." />
      ) : error && messages.length === 0 ? (
        <ErrorMessage message={error} onRetry={fetchMessages} />
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl max-w-md mx-auto">
          <Mail className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-450 text-sm">No messages found in this folder.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className={`bg-white border rounded-2xl p-6 shadow-3xs transition hover:shadow-xs relative ${
                !msg.isRead ? 'border-l-4 border-l-amber-500 border-slate-200' : 'border-slate-200'
              }`}
            >
              {/* Top row */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4 border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-450" /> {msg.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono flex items-center gap-2">
                    <MailCheck className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`mailto:${msg.email}`} className="hover:text-blue-600 hover:underline">
                      {msg.email}
                    </a>
                  </p>
                </div>

                <div className="flex items-center gap-1 text-slate-400 text-[11px] font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(msg.createdAt)}</span>
                </div>
              </div>

              {/* Message text */}
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line mb-6 pl-1">
                {msg.message}
              </p>

              {/* Actions footer */}
              <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-4">
                {/* Status indicator */}
                <div>
                  {!msg.isRead ? (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Unread
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Read
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {!msg.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(msg._id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-100/50 transition cursor-pointer"
                      title="Mark as Read"
                    >
                      <Check className="w-4.5 h-4.5" />
                      <span>Mark Read</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteMessage(msg._id)}
                    className="p-1.5 text-slate-450 hover:text-rose-650 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-100/50 transition cursor-pointer"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white border border-slate-250 rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-md font-bold text-slate-900 mb-2">Delete Message</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to delete this contact message? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button onClick={() => setDeleteTargetId(null)} variant="secondary" className="py-2 text-xs cursor-pointer">
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
