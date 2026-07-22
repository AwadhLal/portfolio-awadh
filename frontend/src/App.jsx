import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import Overview from './pages/admin/Overview.jsx';
import ManageProfile from './pages/admin/ManageProfile.jsx';
import ManageProjects from './pages/admin/ManageProjects.jsx';
import ManageSkills from './pages/admin/ManageSkills.jsx';
import ManageExperience from './pages/admin/ManageExperience.jsx';
import ManageEducation from './pages/admin/ManageEducation.jsx';
import ManageMessages from './pages/admin/ManageMessages.jsx';
import ManageTestimonials from './pages/admin/ManageTestimonials.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1B1F2B',
            color: '#EDE9E0',
            border: '1px solid #2A2F3F',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '13px',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="profile" element={<ManageProfile />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="skills" element={<ManageSkills />} />
          <Route path="experience" element={<ManageExperience />} />
          <Route path="education" element={<ManageEducation />} />
          <Route path="messages" element={<ManageMessages />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
