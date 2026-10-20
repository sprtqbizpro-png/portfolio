import { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/data/portfolio';
import SocialIcon from './SocialIcon';

interface Props {
  project: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ProjectModal({ project, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        key={project.id}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-zinc-200 bg-white animate-slide-in dark:border-white/10 dark:bg-zinc-950"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <img src={project.image} alt={project.title} className="aspect-video w-full object-cover" />

        <div className="p-7 md:p-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider">
            <span className="text-sky-700 dark:text-sky-400">{project.category}</span>
            {project.year ? (
              <>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">{project.year}</span>
              </>
            ) : null}
          </div>
          <h3 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">{project.title}</h3>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">{project.description}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider text-zinc-500">Highlights</h4>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="h-5 w-5 text-sky-600 dark:text-sky-400" /> {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider text-zinc-500">Tech stack</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="rounded-full bg-sky-500/10 px-3 py-1.5 font-mono text-xs text-sky-800 dark:bg-sky-400/10 dark:text-sky-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 dark:border-white/5 pt-6">
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-500"
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
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                >
                  <ExternalLink className="h-4 w-4" /> {link.label}
                </a>
              ))}
              {project.githubUrl && project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                >
                  <SocialIcon name="github" className="h-4 w-4" /> Source code
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={onPrev} className="grid h-10 w-10 place-items-center rounded-full border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10" aria-label="Previous project">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={onNext} className="grid h-10 w-10 place-items-center rounded-full border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10" aria-label="Next project">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
