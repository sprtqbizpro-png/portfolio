import { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { experience } from '@/data/portfolio';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

export default function Experience() {
  const [active, setActive] = useState(0);
  const job = experience[active];

  return (
    <section id="experience" className="relative py-28 md:py-36 border-t border-zinc-200 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Where I've worked."
          description="A track record of shipping production AI platforms across healthcare, fintech, and enterprise SaaS, alongside ongoing client web work."
        />

        <Reveal className="grid gap-10 lg:grid-cols-[320px_1fr]">
          {/* Company list / timeline */}
          <div className="relative">
            <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar lg:overflow-visible">
              {experience.map((j, i) => (
                <button
                  key={j.company}
                  onClick={() => setActive(i)}
                  className={`relative shrink-0 text-left rounded-xl px-5 py-4 transition-all lg:pl-8 ${
                    active === i
                      ? 'bg-white text-zinc-900 shadow-sm dark:bg-white/[0.05] dark:text-white dark:shadow-none'
                      : 'text-zinc-500 hover:bg-white hover:text-zinc-800 dark:hover:bg-white/[0.02] dark:hover:text-zinc-200'
                  }`}
                >
                  <span
                    className={`hidden lg:block absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-colors ${
                      active === i ? 'bg-sky-500 dark:bg-sky-600' : 'bg-zinc-300 dark:bg-white/10'
                    }`}
                  />
                  <p className="font-medium whitespace-nowrap lg:whitespace-normal">{j.company}</p>
                  <p className="mt-0.5 font-mono text-xs text-zinc-500 whitespace-nowrap">{j.period}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div key={active} className="animate-slide-in rounded-3xl border border-zinc-200 bg-white p-7 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.55)] md:p-10 dark:border-white/10 dark:bg-[#12161c] dark:shadow-[0_30px_80px_-48px_rgba(56,189,248,0.28)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {job.role} <span className="text-sky-700 dark:text-sky-400">@ {job.company}</span>
                </h3>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {job.period}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.type}</span>
                  {job.url && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sky-700 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300"
                    >
                      {job.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
              <span className="font-mono text-6xl font-bold text-zinc-900/[0.06] dark:text-white/[0.04] leading-none">
                0{active + 1}
              </span>
            </div>

            <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">{job.summary}</p>

            <ul className="mt-6 space-y-3.5">
              {job.achievements.map((a) => (
                <li key={a} className="flex gap-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400" />
                  {a}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2 border-t border-zinc-200 dark:border-white/5 pt-6">
              {job.stack.map((s) => (
                <span key={s} className="rounded-full bg-sky-500/10 px-3 py-1 font-mono text-xs text-sky-800 dark:bg-sky-400/10 dark:text-sky-300">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Full timeline overview */}
        <div className="mt-20 relative">
          <div className="absolute left-0 right-0 top-[7px] h-px bg-zinc-300 dark:bg-white/10 hidden lg:block" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {experience
              .map((job, index) => ({ job, index }))
              .sort((a, b) => {
                const year = (period: string) => Number(period.match(/\d{4}/)?.[0] ?? 0);
                return year(a.job.period) - year(b.job.period);
              })
              .map(({ job: j, index: idx }, i) => {
              return (
                <Reveal key={j.company} delay={i * 100}>
                  <button onClick={() => setActive(idx)} className="group text-left w-full">
                    <span
                      className={`hidden lg:block h-[15px] w-[15px] rounded-full border-2 transition-colors ${
                        active === idx ? 'border-sky-500 bg-sky-500 dark:border-sky-400 dark:bg-sky-600' : 'border-zinc-400 bg-[#f4f6f8] group-hover:border-sky-500 dark:border-zinc-600 dark:bg-[#0a0a0b] dark:group-hover:border-sky-400'
                      }`}
                    />
                    <p className="mt-4 font-mono text-xs text-sky-700 dark:text-sky-400">{j.period}</p>
                    <p className="mt-1 font-medium text-zinc-900 dark:text-white">{j.role}</p>
                    <p className="text-sm text-zinc-500">{j.company}</p>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
