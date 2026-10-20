import { ArrowUp } from 'lucide-react';
import { navLinks, profile, socials, downloadResume } from '@/data/portfolio';
import SocialIcon from './SocialIcon';

export default function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative border-t border-zinc-200 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={profile.avatar}
                alt=""
                className="h-10 w-10 rounded-full object-cover object-[center_18%] ring-2 ring-sky-400"
              />
              <div>
                <p className="font-medium text-zinc-900 dark:text-white">{profile.name}</p>
                <p className="text-sm text-zinc-500">{profile.role}</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-zinc-500 leading-relaxed">{profile.tagline}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Navigate</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button onClick={() => go(l.id)} className="link-underline text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={downloadResume} className="link-underline text-sky-700 dark:text-sky-400">
                  Download Resume
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Connect</p>
            <ul className="mt-5 space-y-3">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.url}
                    target={s.key === 'email' || s.key === 'phone' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-zinc-700 hover:text-sky-700 dark:text-zinc-300 dark:hover:text-sky-400 transition-colors"
                  >
                    <SocialIcon name={s.key} className="h-4 w-4" /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <p className="select-none text-[16vw] md:text-[11vw] font-semibold leading-none tracking-tighter text-zinc-900/[0.06] dark:text-white/[0.03] whitespace-nowrap">
            {profile.name}
          </p>
        </div>

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-zinc-200 dark:border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} {profile.name}. Designed &amp; built with care.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            Back to top
            <span className="grid h-9 w-9 place-items-center rounded-full border border-zinc-300 transition-all group-hover:border-sky-500 group-hover:-translate-y-1 dark:border-white/10 dark:group-hover:border-sky-400">
              <ArrowUp className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
