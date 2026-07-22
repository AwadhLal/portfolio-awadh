import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Upload } from 'lucide-react';
import { getProfile, updateProfile, uploadAvatar, uploadResume } from '../../services/api';

const EMPTY = {
  full_name: '', title: '', tagline: '', bio: '', email: '', phone: '', location: '',
  avatar_url: '', resume_url: '', github_url: '', linkedin_url: '', twitter_url: '',
  website_url: '', years_experience: 0,
};

export default function ManageProfile() {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile().then(({ data }) => data.data && setForm({ ...EMPTY, ...data.data })).catch(() => {});
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const { data } = await uploadAvatar(formData);
      setForm((f) => ({ ...f, avatar_url: data.url }));
      toast.success('Avatar uploaded');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const { data } = await uploadResume(formData);
      setForm((f) => ({ ...f, resume_url: data.url }));
      toast.success('Résumé uploaded');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    }
  };

  const Field = (name, label, type = 'text') => (
    <div>
      <label className="field-label">{label}</label>
      <input name={name} type={type} className="field-input" value={form[name] || ''} onChange={handleChange} />
    </div>
  );

  return (
    <div>
      <p className="eyebrow mb-2">profile</p>
      <h1 className="font-display text-3xl font-semibold text-parchment mb-8">Edit profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-5">
          {Field('full_name', 'Full name')}
          {Field('title', 'Title')}
        </div>
        {Field('tagline', 'Tagline')}
        <div>
          <label className="field-label">Bio</label>
          <textarea name="bio" rows={5} className="field-input resize-none" value={form.bio || ''} onChange={handleChange} />
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {Field('email', 'Email', 'email')}
          {Field('phone', 'Phone')}
          {Field('location', 'Location')}
        </div>
        {Field('years_experience', 'Years of experience', 'number')}

        <div className="grid sm:grid-cols-2 gap-5">
          {Field('github_url', 'GitHub URL')}
          {Field('linkedin_url', 'LinkedIn URL')}
          {Field('twitter_url', 'Twitter URL')}
          {Field('website_url', 'Website URL')}
        </div>

        <div className="grid sm:grid-cols-2 gap-5 pt-2">
          <div>
            <label className="field-label">Avatar</label>
            <label className="btn-secondary cursor-pointer w-full justify-center">
              <Upload size={16} /> Upload image
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </label>
            {form.avatar_url && <p className="font-mono text-xs text-slate-soft mt-2 truncate">{form.avatar_url}</p>}
          </div>
          <div>
            <label className="field-label">Résumé (PDF)</label>
            <label className="btn-secondary cursor-pointer w-full justify-center">
              <Upload size={16} /> Upload PDF
              <input type="file" accept="application/pdf" className="hidden" onChange={handleResumeUpload} />
            </label>
            {form.resume_url && <p className="font-mono text-xs text-slate-soft mt-2 truncate">{form.resume_url}</p>}
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? 'Saving...' : 'Save changes'} <Save size={16} />
        </button>
      </form>
    </div>
  );
}
