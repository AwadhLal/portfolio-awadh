import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2, X } from 'lucide-react';
import { getSkills, createSkill, deleteSkill } from '../../services/api';

const EMPTY = { name: '', category: 'General', proficiency: 80, display_order: 0 };

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [showForm, setShowForm] = useState(false);

  const load = () => getSkills().then(({ data }) => setSkills(data.data));
  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSkill(form);
      toast.success('Skill added');
      setForm(EMPTY);
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add skill');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await deleteSkill(id);
      toast.success('Skill deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">skills</p>
          <h1 className="font-display text-3xl font-semibold text-parchment">Manage skills</h1>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary"><Plus size={16} /> New skill</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="panel p-6 mb-8 space-y-5 max-w-lg relative">
          <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-slate-soft hover:text-parchment">
            <X size={18} />
          </button>
          <div>
            <label className="field-label">Name</label>
            <input name="name" className="field-input" value={form.name} onChange={handleChange} required />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label">Category</label>
              <input name="category" className="field-input" value={form.category} onChange={handleChange} placeholder="Frontend, Backend, Database..." />
            </div>
            <div>
              <label className="field-label">Proficiency (0-100)</label>
              <input name="proficiency" type="number" min="0" max="100" className="field-input" value={form.proficiency} onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="btn-primary">Add skill</button>
        </form>
      )}

      <div className="space-y-3">
        {skills.map((s) => (
          <div key={s.id} className="panel p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-parchment font-medium">{s.name}</p>
              <p className="font-mono text-xs text-slate-soft">{s.category} · {s.proficiency}%</p>
            </div>
            <button onClick={() => handleDelete(s.id)} className="text-slate-soft hover:text-amber-accent shrink-0"><Trash2 size={16} /></button>
          </div>
        ))}
        {skills.length === 0 && <p className="text-slate-soft font-serif">No skills yet. Add your first one above.</p>}
      </div>
    </div>
  );
}
