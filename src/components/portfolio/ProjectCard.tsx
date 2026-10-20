import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '@/data/portfolio';
import SocialIcon from './SocialIcon';

interface Props {
  project: Project;
  index: number;
  total: number;
  onOpen: (p: Project) => void;
}

export default function ProjectCard({ project, index, total, onOpen }: Props) {
  return (
    <article
      data-card
      onClick={() => onOpen(project)}
      className="group relative flex w-[85vw] sm:w-[460px] xl:w-[540px] shrink-0 snap-center cursor-pointer flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-500 hover:border-sky-400/50 hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(56,189,248,0.25)] dark:border-white/10 dark:bg-zinc-900/60"
    >
      <div className="relative aspect-[16/10] lg:aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-xs text-white backdrop-blur-md">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="rounded-full bg-sky-400/90 px-3 py-1 text-xs font-medium text-black">
            {project.category}
          </span>
        </div>
        <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-black opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">{project.title}</h3>
          {project.year ? <span className="font-mono text-sm text-zinc-500">{project.year}</span> : null}
        </div>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-md border border-zinc-200 px-2.5 py-1 font-mono text-xs text-zinc-700 dark:border-white/10 dark:text-zinc-300">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="link-underline flex items-center gap-1.5 text-zinc-900 dark:text-white"
            >
              <ExternalLink className="h-4 w-4" /> Live site
            </a>
          )}
          {(project.links ?? []).map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="link-underline flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              <ExternalLink className="h-4 w-4" /> {link.label}
            </a>
          ))}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="link-underline flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              <SocialIcon name="github" className="h-4 w-4" /> Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
