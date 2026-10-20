import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Download, MapPin } from 'lucide-react';
import { profile, socials, stats, downloadResume, skillGroups } from '@/data/portfolio';
import { useTheme } from '@/components/theme-provider';
import SocialIcon from './SocialIcon';
import HeroCanvas from './HeroCanvas';

function StatValue({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(match ? '0' + match[2] : value);

  useEffect(() => {
    const parsed = value.match(/^(\d+)(.*)$/);
    if (!parsed) return;
    const target = Number(parsed[1]);
    const suffix = parsed[2];
    let frame = 0;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 900);
          const eased = 1 - (1 - progress) ** 3;
          setShown(`${Math.round(target * eased)}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [value]);

  return (
    <p ref={ref} className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300">
      {shown}
    </p>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const isLight =
    theme === 'light' ||
    (theme === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 md:pt-32">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-sky-500/15 blur-[120px] animate-aurora" />
      <div className="absolute bottom-0 -left-40 h-[400px] w-[400px] rounded-full bg-sky-500/15 blur-[120px] animate-aurora-delayed" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="animate-slide-in">
            <img
              src={profile.avatar}
              alt={profile.name}
              width={112}
              height={112}
              className="h-24 w-24 rounded-full object-cover object-[center_18%] ring-4 ring-white shadow-[0_16px_40px_-18px_rgba(15,23,42,0.55)] sm:h-28 sm:w-28 dark:ring-zinc-800"
            />
            {profile.available && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-600 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-600" />
                </span>
                Available for new opportunities
              </div>
            )}

            <p className="mt-8 font-mono text-sm text-sky-700 dark:text-sky-400">Hi, my name is</p>
            <h1 className="mt-3 text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tighter text-zinc-900 dark:text-white leading-[0.95]">
              {profile.name}
              <span className="text-sky-600 dark:text-sky-400">.</span>
            </h1>
            <h2 className="mt-4 text-2xl sm:text-4xl font-medium tracking-tight text-zinc-500">{profile.role}</h2>
            <a
              href={profile.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${profile.location} in Google Maps`}
              className="group mt-5 inline-flex max-w-md items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-3.5 py-2.5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-[0_12px_30px_-18px_rgba(2,132,199,0.9)] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-sky-400/40"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-zinc-900 dark:text-white">{profile.location}</span>
                <span className="mt-0.5 flex items-center gap-1 text-xs font-medium text-sky-700 dark:text-sky-400">
                  Open in Google Maps
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </a>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{profile.tagline}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 rounded-full bg-sky-600 px-7 py-3.5 font-medium text-white transition-all hover:bg-sky-500 hover:shadow-[0_16px_36px_-18px_rgba(2,132,199,0.55)]"
              >
                View my work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={downloadResume}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-7 py-3.5 font-medium text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-white/15 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </button>
            </div>

            <div className="mt-10 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.url}
                  target={s.key === 'email' || s.key === 'phone' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition-all hover:-translate-y-1 hover:border-sky-500 hover:text-sky-700 dark:border-white/10 dark:text-zinc-400 dark:hover:border-sky-400/50 dark:hover:text-sky-400"
                >
                  <SocialIcon name={s.key} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.6rem] bg-gradient-to-br from-sky-400/25 via-transparent to-sky-400/20 blur-2xl" />
              <div className="absolute -inset-[1.5px] overflow-hidden rounded-[2.05rem]">
                <div className="absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0%,#38bdf8_14%,transparent_30%,#0ea5e9_58%,transparent_74%)] opacity-80" />
              </div>
              <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white p-2 shadow-[0_30px_80px_-36px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_30px_80px_-36px_rgba(2,132,199,0.35)]">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem]">
                  <HeroCanvas />
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-6">
                    <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${isLight ? 'text-sky-700' : 'text-sky-300'}`}>
                      How I work
                    </p>
                    <p className={`mt-2 max-w-[15rem] text-[1.05rem] font-medium leading-snug ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                      From source documents to a shipped agent, on one retrieval path.
                    </p>
                  </div>
                  <p className="sr-only">
                    Isometric workflow: ingest feeds agents through RAG and MCP tools, then deliver the product.
                  </p>
                  <div
                    className={`absolute inset-x-5 bottom-5 flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 backdrop-blur-md ${
                      isLight ? 'border-zinc-200/80 bg-white/80' : 'border-white/10 bg-black/55'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className={`text-sm font-medium ${isLight ? 'text-zinc-900' : 'text-white'}`}>{profile.role}</p>
                      <a
                        href={profile.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${profile.location} in Google Maps`}
                        className={`group mt-1 flex items-start gap-1 text-xs leading-snug ${
                          isLight ? 'text-zinc-500' : 'text-zinc-400'
                        }`}
                      >
                        <MapPin className={`mt-0.5 h-3 w-3 shrink-0 ${isLight ? 'text-sky-700' : 'text-sky-400'}`} />
                        <span>
                          <span className="underline decoration-sky-500/50 underline-offset-2 transition-colors group-hover:text-sky-700 dark:group-hover:text-sky-300">
                            {profile.location}
                          </span>
                          <span className={`mt-0.5 flex items-center gap-0.5 text-[10px] font-medium uppercase tracking-wider ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>
                            Google Maps
                            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </span>
                      </a>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-semibold ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>
                        {profile.yearsExperience}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500">Years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)] dark:border-white/5 dark:bg-white/5 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="group bg-[#f4f6f8] p-6 transition-colors duration-300 hover:bg-white dark:bg-[#0a0a0b] dark:hover:bg-white/[0.03] md:p-8">
              <StatValue value={s.value} />
              <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="mx-auto mt-12 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-sky-700 dark:hover:text-sky-400 transition-colors"
        >
          Scroll
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl px-6 pb-16 lg:px-10">
        <div className="mb-8 max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky-700 dark:text-sky-400">
            Skills flow
          </p>
          <p className="mt-1 text-lg font-medium text-zinc-900 dark:text-white">
            From models to cloud — one delivery path
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            How the stack connects when I ship an AI product end to end.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {skillGroups.map((group, index) => (
            <div key={group.title} className="flex flex-1 flex-col lg:flex-row lg:items-stretch">
              <div className="relative flex-1 rounded-2xl border border-zinc-200 bg-white/80 p-5 dark:border-white/10 dark:bg-[#12161c]">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-600 font-mono text-xs font-semibold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">{group.title}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                      Stage {index + 1}
                    </p>
                  </div>
                </div>
                <ul className="mt-4 space-y-1.5 border-t border-zinc-100 pt-4 dark:border-white/5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-sky-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {index < skillGroups.length - 1 && (
                <>
                  <div className="flex items-center justify-center py-2 lg:hidden" aria-hidden>
                    <ArrowDown className="h-4 w-4 text-sky-500" />
                  </div>
                  <div className="hidden items-center px-2 lg:flex" aria-hidden>
                    <ArrowRight className="h-4 w-4 shrink-0 text-sky-500" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
