import ProjectCard from './ProjectCard.jsx';

export default function Projects({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="work" className="py-24 border-t border-ink-border">
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow mb-3">03 — work</p>
        <h2 className="section-heading mb-12">Selected projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
