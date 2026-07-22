import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLogin() {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn(form.email, form.password);
    if (result.success) {
      toast.success('Welcome back.');
      navigate('/admin');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-mono text-xs text-teal-accent mb-2 text-center">admin@portfolio:~$</p>
        <h1 className="font-display text-2xl font-semibold text-parchment text-center mb-8">Sign in</h1>
        <form onSubmit={handleSubmit} className="panel p-6 space-y-5">
          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input
              id="email" type="email" className="field-input" required
              value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <input
              id="password" type="password" className="field-input" required
              value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign in'} <LogIn size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
