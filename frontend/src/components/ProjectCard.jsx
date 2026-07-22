import { ExternalLink, Github } from 'lucide-react';

export default function ProjectCard({ project }) {
  const stack = (project.tech_stack || '').split(',').map((s) => s.trim()).filter(Boolean);

  return (
    <div className="panel overflow-hidden group flex flex-col">
      <div className="aspect-video bg-ink-soft overflow-hidden">
        {project.image_url && (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        {project.featured ? <p className="font-mono text-xs text-amber-accent mb-2">featured</p> : null}
        <h3 className="font-display text-xl font-semibold text-parchment mb-2">{project.title}</h3>
        <p className="text-parchment-dim text-sm font-serif leading-relaxed mb-4 flex-1">
          {project.short_description}
        </p>
        {stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {stack.map((tech) => (
              <span key={tech} className="font-mono text-[11px] px-2 py-1 rounded bg-ink border border-ink-border text-slate-soft">
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-4 font-mono text-sm">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-teal-accent hover:underline">
              <ExternalLink size={14} /> live
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-soft hover:text-parchment">
              <Github size={14} /> source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
