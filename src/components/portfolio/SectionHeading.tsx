import Reveal from './Reveal';

interface Props {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ index, eyebrow, title, description }: Props) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-sky-700 dark:text-sky-400">
        <span>{index}</span>
        <span className="h-px w-10 bg-sky-600/40 dark:bg-sky-400/50" />
        <span className="text-zinc-500 dark:text-zinc-400">{eyebrow}</span>
      </div>
      <h2 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white max-w-3xl leading-[1.05]">
        {title}
      </h2>
      {description && <p className="mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>}
    </Reveal>
  );
}
