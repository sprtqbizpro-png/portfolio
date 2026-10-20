import { useState } from 'react';
import { resolveSkillIcon } from '@/data/skillIcons';
import { useTheme } from '@/components/theme-provider';

interface Props {
  name: string;
  compact?: boolean;
}

export default function SkillBadge({ name, compact = false }: Props) {
  const { theme } = useTheme();
  const isLight =
    theme === 'light' ||
    (theme === 'system' && typeof window !== 'undefined' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
  const icon = resolveSkillIcon(name);
  const [broken, setBroken] = useState(false);

  let src: string | null = null;
  if (!broken) {
    if (icon.kind === 'skillicons') {
      src = `https://skillicons.dev/icons?i=${icon.id}&theme=${isLight ? 'light' : 'dark'}`;
    } else if (icon.kind === 'simpleicons') {
      src = `https://cdn.simpleicons.org/${icon.slug}/${icon.color ?? '38bdf8'}`;
    }
  }

  const size = compact ? 'h-8 w-8' : 'h-10 w-10';

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border border-zinc-200/90 bg-white/90 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/50 hover:shadow-[0_18px_40px_-24px_rgba(2,132,199,0.55)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-sky-400/40 dark:hover:bg-white/[0.07] ${
        compact ? 'px-2.5 py-2' : 'px-3 py-2.5'
      }`}
      title={name}
    >
      <span
        className={`relative grid ${size} shrink-0 place-items-center overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900/80`}
      >
        {src ? (
          <img
            src={src}
            alt=""
            width={compact ? 32 : 40}
            height={compact ? 32 : 40}
            loading="lazy"
            decoding="async"
            className={`${compact ? 'h-7 w-7' : 'h-9 w-9'} object-contain`}
            onError={() => setBroken(true)}
          />
        ) : (
          <span
            className="grid h-full w-full place-items-center text-[10px] font-bold tracking-wide text-white"
            style={{ background: icon.kind === 'initials' ? icon.color : '#0284c7' }}
          >
            {icon.kind === 'initials' ? icon.text : name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className={`min-w-0 truncate font-medium text-zinc-800 dark:text-zinc-100 ${compact ? 'text-xs' : 'text-sm'}`}>
        {name}
      </span>
    </div>
  );
}
