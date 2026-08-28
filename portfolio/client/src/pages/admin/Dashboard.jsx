import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import api from '../../services/api.js';
import { Briefcase, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../../components/ui/Loader.jsx';
import ErrorMessage from '../../components/ui/ErrorMessage.jsx';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    messagesCount: 0,
    unreadMessagesCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch projects and contact messages in parallel
        const [projRes, msgRes] = await Promise.all([
          api.get('/projects'),
          api.get('/contact')
        ]);

        const projects = projRes.data?.data || [];
        const messages = msgRes.data?.data || [];
        const unread = messages.filter((m) => !m.isRead);

        setStats({
          projectsCount: projects.length,
          messagesCount: messages.length,
          unreadMessagesCount: unread.length
        });
      } catch (err) {
        setError(err.message || 'Error occurred while loading statistics.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [retryTrigger]);

  const cardItems = [
    {
      title: 'Total Projects',
      value: stats.projectsCount,
      desc: 'Showcased portfolio works',
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50 border-blue-100',
      link: '/admin/projects',
      linkText: 'Manage projects'
    },
    {
      title: 'Total Messages',
      value: stats.messagesCount,
      desc: 'Inquiries submitted by users',
      icon: <MessageSquare className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100',
      link: '/admin/messages',
      linkText: 'Read messages'
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessagesCount,
      desc: 'Messages awaiting review',
      icon: <Mail className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-100',
      link: '/admin/messages',
      linkText: 'Review inbox'
    }
  ];

  return (
    <AdminLayout>
      {/* Title block */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1.5 text-sm">System summary and metrics monitoring indicators</p>
      </div>

      {loading ? (
        <Loader message="Loading data feeds..." />
      ) : error ? (
        <ErrorMessage
          message={error}
          onRetry={() => setRetryTrigger((prev) => prev + 1)}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Icon row */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 border rounded-xl ${item.bg}`}>
                    {item.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {item.value}
                  </span>
                </div>

                <h3 className="text-md font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6">
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline group"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
