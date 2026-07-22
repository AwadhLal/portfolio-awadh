import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer({ profile }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-border">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-mono text-xs text-slate-soft">
          © {year} {profile?.full_name || 'Portfolio'}. Built with React, Node.js &amp; MySQL.
        </p>
        <div className="flex items-center gap-5">
          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="text-slate-soft hover:text-teal-accent transition-colors">
              <Github size={18} />
            </a>
          )}
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="text-slate-soft hover:text-teal-accent transition-colors">
              <Linkedin size={18} />
            </a>
          )}
          {profile?.twitter_url && (
            <a href={profile.twitter_url} target="_blank" rel="noreferrer" className="text-slate-soft hover:text-teal-accent transition-colors">
              <Twitter size={18} />
            </a>
          )}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="text-slate-soft hover:text-teal-accent transition-colors">
              <Mail size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
