import { ArrowDown } from 'lucide-react';

export default function Hero({ profile, projectCount, skillCount }) {
  return (
    <section id="top" className="min-h-screen flex items-center pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center w-full">
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">{profile?.title || 'Full-Stack Software Engineer'}</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-parchment leading-[1.05]">
            {profile?.full_name || 'Your Name'}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-parchment-dim font-serif max-w-xl leading-relaxed">
            {profile?.tagline || 'I build reliable web systems from database to browser.'}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#work" className="btn-primary">
              View Work <ArrowDown size={16} />
            </a>
            {profile?.resume_url && (
              <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-secondary">
                Download Resume
              </a>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="panel p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-ink-border">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-accent" />
              <span className="text-slate-soft">system_status.log</span>
            </div>
            <dl className="space-y-3">
              <Row label="status" value="available for work" accent="teal" />
              <Row label="experience" value={`${profile?.years_experience ?? 0} years`} />
              <Row label="projects" value={String(projectCount)} />
              <Row label="skills tracked" value={String(skillCount)} />
              <Row label="stack" value="react / node / mysql" accent="amber" />
              <Row label="location" value={profile?.location || 'remote'} />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, accent }) {
  const color = accent === 'teal' ? 'text-teal-accent' : accent === 'amber' ? 'text-amber-accent' : 'text-parchment';
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-slate-soft">{label}</dt>
      <dd className={color}>{value}</dd>
    </div>
  );
}
