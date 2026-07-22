import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Upload, X } from 'lucide-react';
import {
  getProjects, createProject, updateProject, deleteProject, uploadProjectImage,
} from '../../services/api';

const EMPTY = {
  title: '', short_description: '', description: '', tech_stack: '',
  image_url: '', live_url: '', github_url: '', featured: false, display_order: 0,
};

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => getProjects().then(({ data }) => setProjects(data.data));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(EMPTY); setEditingId(null); setShowForm(true); };
  const openEdit = (project) => { setForm(project); setEditingId(project.id); setShowForm(true); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await uploadProjectImage(formData);
      setForm((f) => ({ ...f, image_url: data.url }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProject(editingId, form);
        toast.success('Project updated');
      } else {
        await createProject(form);
        toast.success('Project created');
      }
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">projects</p>
          <h1 className="font-display text-3xl font-semibold text-parchment">Manage projects</h1>
        </div>
        <button onClick={openCreate} className="btn-primary"><Plus size={16} /> New project</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="panel p-6 mb-8 space-y-5 max-w-2xl relative">
          <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-slate-soft hover:text-parchment">
            <X size={18} />
          </button>
          <h2 className="font-display text-lg font-semibold text-parchment">{editingId ? 'Edit project' : 'New project'}</h2>
          <div>
            <label className="field-label">Title</label>
            <input name="title" className="field-input" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label className="field-label">Short description</label>
            <input name="short_description" className="field-input" value={form.short_description || ''} onChange={handleChange} />
          </div>
          <div>
            <label className="field-label">Full description</label>
            <textarea name="description" rows={4} className="field-input resize-none" value={form.description || ''} onChange={handleChange} />
          </div>
          <div>
            <label className="field-label">Tech stack (comma separated)</label>
            <input name="tech_stack" className="field-input" value={form.tech_stack || ''} onChange={handleChange} placeholder="React, Node.js, MySQL" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label">Live URL</label>
              <input name="live_url" className="field-input" value={form.live_url || ''} onChange={handleChange} />
            </div>
            <div>
              <label className="field-label">GitHub URL</label>
              <input name="github_url" className="field-input" value={form.github_url || ''} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="field-label">Project image</label>
            <label className="btn-secondary cursor-pointer w-fit">
              <Upload size={16} /> Upload image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
            {form.image_url && <p className="font-mono text-xs text-slate-soft mt-2 truncate">{form.image_url}</p>}
          </div>
          <div className="flex items-center gap-3">
            <input id="featured" type="checkbox" name="featured" checked={!!form.featured} onChange={handleChange} className="accent-teal-accent" />
            <label htmlFor="featured" className="font-mono text-sm text-parchment">Featured</label>
          </div>
          <button type="submit" className="btn-primary">Save project</button>
        </form>
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="panel p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-parchment font-medium">{p.title}{p.featured && <span className="ml-2 font-mono text-xs text-amber-accent">featured</span>}</p>
              <p className="font-mono text-xs text-slate-soft">{p.short_description}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button onClick={() => openEdit(p)} className="text-slate-soft hover:text-teal-accent"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(p.id)} className="text-slate-soft hover:text-amber-accent"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-slate-soft font-serif">No projects yet. Add your first one above.</p>}
      </div>
    </div>
  );
}
