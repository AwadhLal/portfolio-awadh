import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2, X } from 'lucide-react';
import { getTestimonials, createTestimonial, deleteTestimonial } from '../../services/api';

const EMPTY = { author_name: '', author_role: '', content: '', avatar_url: '' };

export default function ManageTestimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [showForm, setShowForm] = useState(false);

  const load = () => getTestimonials().then(({ data }) => setItems(data.data));
  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTestimonial(form);
      toast.success('Testimonial added');
      setForm(EMPTY);
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      toast.success('Testimonial deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">testimonials</p>
          <h1 className="font-display text-3xl font-semibold text-parchment">Manage testimonials</h1>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary"><Plus size={16} /> New testimonial</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="panel p-6 mb-8 space-y-5 max-w-2xl relative">
          <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-slate-soft hover:text-parchment">
            <X size={18} />
          </button>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label">Author name</label>
              <input name="author_name" className="field-input" value={form.author_name} onChange={handleChange} required />
            </div>
            <div>
              <label className="field-label">Author role</label>
              <input name="author_role" className="field-input" value={form.author_role} onChange={handleChange} placeholder="CTO, Company Inc." />
            </div>
          </div>
          <div>
            <label className="field-label">Content</label>
            <textarea name="content" rows={4} className="field-input resize-none" value={form.content} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-primary">Save testimonial</button>
        </form>
      )}

      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="panel p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-parchment font-medium">{t.author_name}</p>
              <p className="font-mono text-xs text-slate-soft">{t.author_role}</p>
            </div>
            <button onClick={() => handleDelete(t.id)} className="text-slate-soft hover:text-amber-accent shrink-0"><Trash2 size={16} /></button>
          </div>
        ))}
        {items.length === 0 && <p className="text-slate-soft font-serif">No testimonials yet.</p>}
      </div>
    </div>
  );
}
