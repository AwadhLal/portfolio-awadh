export default function Loader({ label = 'Loading' }) {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <div className="font-mono text-sm text-teal-accent flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-teal-accent animate-pulse" />
        {label}...
      </div>
    </div>
  );
}
