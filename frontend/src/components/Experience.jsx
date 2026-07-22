function formatRange(start, end, isCurrent) {
  const opts = { year: 'numeric', month: 'short' };
  const startStr = start ? new Date(start).toLocaleDateString('en-US', opts) : '';
  const endStr = isCurrent ? 'Present' : end ? new Date(end).toLocaleDateString('en-US', opts) : 'Present';
  return `${startStr} — ${endStr}`;
}

export default function Experience({ experience, education }) {
  const hasExperience = experience && experience.length > 0;
  const hasEducation = education && education.length > 0;
  if (!hasExperience && !hasEducation) return null;

  return (
    <section id="experience" className="py-24 border-t border-ink-border">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-16">
        {hasExperience && (
          <div className="md:col-span-3">
            <p className="eyebrow mb-3">04 — experience</p>
            <h2 className="section-heading mb-10">Where I've worked</h2>
            <div className="space-y-8">
              {experience.map((job) => (
                <div key={job.id} className="border-l-2 border-ink-border pl-6 relative">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-teal-accent" />
                  <p className="font-mono text-xs text-slate-soft mb-1">
                    {formatRange(job.start_date, job.end_date, job.is_current)}
                  </p>
                  <h3 className="font-display text-lg font-semibold text-parchment">{job.role}</h3>
                  <p className="font-mono text-sm text-amber-accent mb-2">
                    {job.company}{job.location ? ` · ${job.location}` : ''}
                  </p>
                  {job.description && (
                    <p className="text-parchment-dim text-sm font-serif leading-relaxed">{job.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {hasEducation && (
          <div className="md:col-span-2">
            <p className="eyebrow mb-3">05 — education</p>
            <h2 className="section-heading mb-10 !text-2xl">Background</h2>
            <div className="space-y-8">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-ink-border pl-6 relative">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-amber-accent" />
                  <p className="font-mono text-xs text-slate-soft mb-1">
                    {formatRange(edu.start_date, edu.end_date, edu.is_current)}
                  </p>
                  <h3 className="font-display text-base font-semibold text-parchment">{edu.degree}</h3>
                  <p className="font-mono text-sm text-teal-accent mb-2">{edu.institution}</p>
                  {edu.field_of_study && (
                    <p className="text-parchment-dim text-sm font-serif">{edu.field_of_study}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
