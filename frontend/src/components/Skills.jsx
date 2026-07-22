export default function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;

  const grouped = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section className="py-24 border-t border-ink-border">
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow mb-3">02 — skills</p>
        <h2 className="section-heading mb-12">What I work with</h2>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-amber-accent mb-4">
                {category}
              </h3>
              <div className="space-y-4">
                {items.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between font-mono text-sm mb-1.5">
                      <span className="text-parchment">{skill.name}</span>
                      <span className="text-slate-soft">{skill.proficiency}%</span>
                    </div>
                    <div className="h-1.5 bg-ink-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-accent rounded-full"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
