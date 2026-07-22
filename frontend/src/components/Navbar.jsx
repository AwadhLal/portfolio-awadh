import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#about', label: './About' },
  { href: '#work', label: './Work' },
  { href: '#experience', label: './Experience' },
  { href: '#contact', label: './Contact' },
];

export default function Navbar({ name }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const firstName = (name || 'portfolio').split(' ')[0].toLowerCase();

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-ink/90 backdrop-blur border-b border-ink-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm text-parchment">
          <span className="text-teal-accent">{firstName}</span>
          <span className="text-slate-soft">@portfolio</span>
          {/* <span className="text-amber-accent">:~$</span> */}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-slate-soft hover:text-teal-accent transition-colors"
            >
              {link.label}
            </a>
          ))}

          <a href="#contact" className="btn-primary !px-4 !py-2 text-sm">
            Say hello
          </a>
        </div>

        <button
          className="md:hidden text-parchment"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ink border-t border-ink-border px-6 py-4 flex flex-col gap-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-sm text-slate-soft hover:text-teal-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}