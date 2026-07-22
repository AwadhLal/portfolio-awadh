import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, User, Briefcase, Sparkles, Clock, GraduationCap, Mail, MessageSquare, LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const NAV = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/profile', label: 'Profile', icon: User },
  { to: '/admin/projects', label: 'Projects', icon: Briefcase },
  { to: '/admin/skills', label: 'Skills', icon: Sparkles },
  { to: '/admin/experience', label: 'Experience', icon: Clock },
  { to: '/admin/education', label: 'Education', icon: GraduationCap },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
];

export default function AdminLayout() {
  const { admin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-ink flex">
      <aside className="w-64 shrink-0 border-r border-ink-border p-6 hidden md:flex md:flex-col">
        <p className="font-mono text-xs text-teal-accent mb-8">admin@portfolio:~$</p>
        <nav className="space-y-1 flex-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md font-mono text-sm transition-colors ${
                  isActive ? 'bg-ink-panel text-teal-accent' : 'text-slate-soft hover:text-parchment'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="pt-6 border-t border-ink-border">
          <p className="font-mono text-xs text-slate-soft mb-3 truncate">{admin?.email}</p>
          <button onClick={handleLogout} className="flex items-center gap-2 font-mono text-sm text-slate-soft hover:text-amber-accent">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        <Outlet />
      </main>
    </div>
  );
}
