export default function About({ profile }) {
  if (!profile) return null;
  return (
    <section id="about" className="py-24 border-t border-ink-border">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <p className="eyebrow mb-3">01 — about</p>
          <h2 className="section-heading">A little context</h2>
        </div>
        <div className="md:col-span-3">
          <p className="text-parchment-dim font-serif text-lg leading-relaxed whitespace-pre-line">
            {profile.bio}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-6 font-mono text-sm">
            {profile.location && (
              <div>
                <dt className="text-slate-soft mb-1">location</dt>
                <dd className="text-parchment">{profile.location}</dd>
              </div>
            )}
            {profile.email && (
              <div>
                <dt className="text-slate-soft mb-1">email</dt>
                <dd className="text-parchment">{profile.email}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
}
