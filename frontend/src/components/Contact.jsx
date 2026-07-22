import { useState } from 'react';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';
import { submitContactMessage } from '../services/api';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in your name, email, and message.');
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await submitContactMessage(form);
      toast.success(data.message || 'Message sent.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-ink-border">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <p className="eyebrow mb-3">07 — contact</p>
          <h2 className="section-heading mb-4">Let's build something</h2>
          <p className="text-parchment-dim font-serif leading-relaxed mb-6">
            Have a project in mind or just want to talk shop? My inbox is open.
          </p>
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="font-mono text-sm text-teal-accent hover:underline">
              {profile.email}
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label" htmlFor="name">Name</label>
              <input
                id="name" name="name" type="text" className="field-input"
                value={form.name} onChange={handleChange} placeholder="Jane Doe" required
              />
            </div>
            <div>
              <label className="field-label" htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email" className="field-input"
                value={form.email} onChange={handleChange} placeholder="jane@example.com" required
              />
            </div>
          </div>
          <div>
            <label className="field-label" htmlFor="subject">Subject</label>
            <input
              id="subject" name="subject" type="text" className="field-input"
              value={form.subject} onChange={handleChange} placeholder="Project inquiry"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="message">Message</label>
            <textarea
              id="message" name="message" rows={5} className="field-input resize-none"
              value={form.message} onChange={handleChange} placeholder="Tell me about your project..." required
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
            {submitting ? 'Sending...' : 'Send message'} <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}
