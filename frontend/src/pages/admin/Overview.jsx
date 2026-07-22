import { useEffect, useState } from 'react';
import { Briefcase, Sparkles, Mail, MessageSquare } from 'lucide-react';
import { getProjects, getSkills, getMessages, getTestimonials } from '../../services/api';

export default function Overview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      const results = await Promise.allSettled([getProjects(), getSkills(), getMessages(), getTestimonials()]);
      const [projects, skills, messages, testimonials] = results;
      setStats({
        projects: projects.status === 'fulfilled' ? projects.value.data.count : 0,
        skills: skills.status === 'fulfilled' ? skills.value.data.count : 0,
        unreadMessages: messages.status === 'fulfilled' ? messages.value.data.unread_count : 0,
        testimonials: testimonials.status === 'fulfilled' ? testimonials.value.data.count : 0,
      });
    }
    load();
  }, []);

  const cards = [
    { label: 'Projects', value: stats?.projects, icon: Briefcase },
    { label: 'Skills tracked', value: stats?.skills, icon: Sparkles },
    { label: 'Unread messages', value: stats?.unreadMessages, icon: Mail },
    { label: 'Testimonials', value: stats?.testimonials, icon: MessageSquare },
  ];

  return (
    <div>
      <p className="eyebrow mb-2">overview</p>
      <h1 className="font-display text-3xl font-semibold text-parchment mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="panel p-5">
            <Icon className="text-teal-accent mb-4" size={20} />
            <p className="font-display text-3xl font-semibold text-parchment">{value ?? '—'}</p>
            <p className="font-mono text-xs text-slate-soft mt-1">{label}</p>
          </div>
        ))}
      </div>
      <p className="text-slate-soft font-serif mt-10 max-w-md">
        Use the sidebar to update your profile, add projects, log new roles, and read messages
        that come in through the public contact form.
      </p>
    </div>
  );
}
