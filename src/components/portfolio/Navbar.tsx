import { useEffect, useState } from 'react';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { navLinks, profile, downloadResume } from '@/data/portfolio';
import { useTheme } from '@/components/theme-provider';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const isLight =
    theme === 'light' ||
    (theme === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      let current = '';
      for (const l of navLinks) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-zinc-200 dark:border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-9 w-9 rounded-full object-cover object-[center_18%] ring-2 ring-sky-400 transition-transform group-hover:scale-105"
          />
          <span className="hidden sm:block font-medium text-zinc-900 dark:text-white">{profile.name}</span>
        </button>

        <ul className="hidden md:flex items-center gap-9">
          {navLinks.map((l, i) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`link-underline text-sm transition-colors ${
                  active === l.id ? 'active text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                <span className="font-mono text-sky-700/80 dark:text-sky-400/80 mr-1.5 text-xs">0{i + 1}.</span>
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={downloadResume}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-sky-600/40 dark:border-sky-400/40 px-5 py-2 text-sm font-medium text-sky-700 dark:text-sky-300 transition-all hover:bg-sky-600 hover:text-white hover:border-sky-400"
          >
            <Download className="h-4 w-4" />
            Resume
          </button>
          <button
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:border-sky-500 hover:text-sky-700 dark:border-white/10 dark:text-zinc-300 dark:hover:border-sky-400 dark:hover:text-sky-300"
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            title={isLight ? 'Dark mode' : 'Light mode'}
          >
            {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-lg border border-zinc-200 text-zinc-900 dark:border-white/10 dark:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 h-px bg-sky-600 transition-[width] duration-150" style={{ width: `${progress}%` }} />

      {open && (
        <div className="md:hidden border-t border-zinc-200 dark:border-white/5 bg-white/95 dark:bg-[#0a0a0b]/95 backdrop-blur-xl px-6 pb-6 pt-2">
          {navLinks.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="flex w-full items-center gap-3 border-b border-zinc-200 dark:border-white/5 py-4 text-left text-lg text-zinc-800 dark:text-zinc-200"
            >
              <span className="font-mono text-xs text-sky-700 dark:text-sky-400">0{i + 1}</span>
              {l.label}
            </button>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              downloadResume();
            }}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 py-3 font-medium text-white"
          >
            <Download className="h-4 w-4" /> Download Resume
          </button>
        </div>
      )}
    </header>
  );
}
