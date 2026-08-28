import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProjectDetails from '../pages/ProjectDetails.jsx';
import NotFound from '../pages/NotFound';
import Login from '../pages/admin/Login.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import Projects from '../pages/admin/Projects.jsx';
import Messages from '../pages/admin/Messages.jsx';
import Profile from '../pages/admin/Profile.jsx';
import Skills from '../pages/admin/Skills.jsx';
import Experience from '../pages/admin/Experience.jsx';
import Education from '../pages/admin/Education.jsx';
import Achievements from '../pages/admin/Achievements.jsx';
import ProtectedRoute from '../components/admin/ProtectedRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectDetails />} />
      
      {/* Admin Panel Routes */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/skills"
        element={
          <ProtectedRoute>
            <Skills />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/experience"
        element={
          <ProtectedRoute>
            <Experience />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/education"
        element={
          <ProtectedRoute>
            <Education />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/achievements"
        element={
          <ProtectedRoute>
            <Achievements />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
