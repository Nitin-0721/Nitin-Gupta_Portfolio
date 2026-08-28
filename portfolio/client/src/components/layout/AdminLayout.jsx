import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, Code, Briefcase, History, GraduationCap, Trophy, Mail, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLayout({ children }) {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Profile', path: '/admin/profile', icon: <User className="w-5 h-5" /> },
    { name: 'Skills', path: '/admin/skills', icon: <Code className="w-5 h-5" /> },
    { name: 'Projects', path: '/admin/projects', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Experience', path: '/admin/experience', icon: <History className="w-5 h-5" /> },
    { name: 'Education', path: '/admin/education', icon: <GraduationCap className="w-5 h-5" /> },
    { name: 'Achievements', path: '/admin/achievements', icon: <Trophy className="w-5 h-5" /> },
    { name: 'Messages', path: '/admin/messages', icon: <Mail className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800 font-sans">
      {/* Mobile Top Navbar */}
      <header className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-20">
        <span className="font-extrabold text-slate-900 tracking-tight text-md">
          Nitin Gupta <span className="text-blue-600 font-semibold text-xs">Admin</span>
        </span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-slate-600 hover:text-slate-900 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 z-30 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-100 hidden md:block">
            <span className="font-extrabold text-lg text-slate-900 tracking-tight block">
              Nitin Gupta
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mt-0.5">
              Admin Panel
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/admin'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition duration-150 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-100/60'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Info / Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          {admin && (
            <div className="px-4 mb-3.5">
              <p className="text-xs font-bold text-slate-900 truncate">{admin.name}</p>
              <p className="text-[10px] text-slate-400 font-mono truncate">{admin.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100/50 transition duration-150 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 z-10 md:hidden transition-opacity duration-200"
        />
      )}

      {/* Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-full">
        <div className="max-w-6xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
