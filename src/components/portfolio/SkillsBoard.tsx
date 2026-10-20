import { skillGroups } from '@/data/portfolio';
import SkillBadge from './SkillBadge';

export default function SkillsBoard() {
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="relative mx-auto mt-16 max-w-7xl px-6 pb-16 lg:px-10">
      <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-br from-white via-sky-50/40 to-white p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.45)] md:p-8 dark:border-white/10 dark:from-[#12161c] dark:via-[#0f1720] dark:to-[#0a0a0b] dark:shadow-[0_30px_80px_-48px_rgba(56,189,248,0.2)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky-700 dark:text-sky-400">
              Skills
            </p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
              The stack behind everything I ship
            </h3>
            <p className="mt-2 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
              Production tools I use to design, build, and operate AI systems across healthcare, fintech, and SaaS.
            </p>
          </div>
          <p className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 font-mono text-xs text-sky-800 dark:text-sky-300">
            {total} tools · {skillGroups.length} orbits
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <section
              key={group.title}
              className="rounded-2xl border border-zinc-200/70 bg-white/70 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  {group.title}
                </p>
                <span className="font-mono text-[10px] text-zinc-400">
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {group.items.map((item) => (
                  <SkillBadge key={item} name={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
