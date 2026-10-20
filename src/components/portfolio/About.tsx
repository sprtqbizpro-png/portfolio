import { Code2, Server, Cloud, Sparkles } from 'lucide-react';
import { profile, skillGroups } from '@/data/portfolio';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const icons = [Code2, Server, Cloud, Sparkles];

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading index="01" eyebrow="About me" title="Building production AI systems that scale." />

        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {profile.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="flex flex-wrap gap-3 pt-4">
              {['Generative AI', 'RAG & Agents', 'HIPAA / SOC 2', 'System Design'].map((v) => (
                <span key={v} className="rounded-full border border-zinc-200 px-4 py-1.5 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300">
                  {v}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((g, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal
                  key={g.title}
                  delay={i * 100}
                  className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/60 hover:bg-sky-50/50 hover:shadow-[0_24px_50px_-24px_rgba(2,132,199,0.45)] dark:border-white/5 dark:bg-white/[0.02] dark:shadow-none dark:hover:border-sky-400/40 dark:hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500/10 text-sky-700 transition-transform group-hover:scale-110 dark:bg-sky-400/10 dark:text-sky-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-medium text-zinc-900 dark:text-white">{g.title}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span key={s} className="rounded-md bg-zinc-100 px-2.5 py-1 font-mono text-xs text-zinc-700 dark:bg-white/5 dark:text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
