import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2, X } from 'lucide-react';
import { getExperience, createExperience, deleteExperience } from '../../services/api';

const EMPTY = { company: '', role: '', location: '', start_date: '', end_date: '', is_current: false, description: '' };

export default function ManageExperience() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [showForm, setShowForm] = useState(false);

  const load = () => getExperience().then(({ data }) => setItems(data.data));
  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExperience(form);
      toast.success('Experience added');
      setForm(EMPTY);
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add entry');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try {
      await deleteExperience(id);
      toast.success('Entry deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">experience</p>
          <h1 className="font-display text-3xl font-semibold text-parchment">Manage experience</h1>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary"><Plus size={16} /> New entry</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="panel p-6 mb-8 space-y-5 max-w-2xl relative">
          <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-slate-soft hover:text-parchment">
            <X size={18} />
          </button>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label">Company</label>
              <input name="company" className="field-input" value={form.company} onChange={handleChange} required />
            </div>
            <div>
              <label className="field-label">Role</label>
              <input name="role" className="field-input" value={form.role} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label className="field-label">Location</label>
            <input name="location" className="field-input" value={form.location} onChange={handleChange} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label">Start date</label>
              <input name="start_date" type="date" className="field-input" value={form.start_date} onChange={handleChange} required />
            </div>
            <div>
              <label className="field-label">End date</label>
              <input name="end_date" type="date" className="field-input" value={form.end_date} onChange={handleChange} disabled={form.is_current} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input id="is_current" type="checkbox" name="is_current" checked={!!form.is_current} onChange={handleChange} className="accent-teal-accent" />
            <label htmlFor="is_current" className="font-mono text-sm text-parchment">This is my current role</label>
          </div>
          <div>
            <label className="field-label">Description</label>
            <textarea name="description" rows={4} className="field-input resize-none" value={form.description} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-primary">Save entry</button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="panel p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-parchment font-medium">{item.role} · {item.company}</p>
              <p className="font-mono text-xs text-slate-soft">
                {item.start_date} — {item.is_current ? 'Present' : item.end_date}
              </p>
            </div>
            <button onClick={() => handleDelete(item.id)} className="text-slate-soft hover:text-amber-accent shrink-0"><Trash2 size={16} /></button>
          </div>
        ))}
        {items.length === 0 && <p className="text-slate-soft font-serif">No experience entries yet.</p>}
      </div>
    </div>
  );
}
