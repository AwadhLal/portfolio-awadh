import { Quote } from 'lucide-react';

export default function Testimonials({ testimonials }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 border-t border-ink-border">
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow mb-3">06 — testimonials</p>
        <h2 className="section-heading mb-12">What people say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="panel p-7">
              <Quote className="text-teal-accent mb-4" size={22} />
              <p className="text-parchment-dim font-serif leading-relaxed mb-5">{t.content}</p>
              <p className="font-mono text-sm text-parchment">{t.author_name}</p>
              {t.author_role && <p className="font-mono text-xs text-slate-soft">{t.author_role}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
