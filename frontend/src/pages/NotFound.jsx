import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-teal-accent text-sm mb-3">error 404</p>
        <h1 className="font-display text-4xl text-parchment font-semibold mb-3">Page not found</h1>
        <p className="text-slate-soft font-serif mb-8">
          The path you followed doesn't resolve to anything here.
        </p>
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
