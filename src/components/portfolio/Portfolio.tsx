import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MousePointer2, Hand } from 'lucide-react';
import { projects, type Project } from '@/data/portfolio';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const GAP = 32;

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [distance, setDistance] = useState(0);
  const [x, setX] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  // Breakpoint detection
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const getStep = useCallback((root: HTMLElement | null) => {
    const card = root?.querySelector<HTMLElement>('[data-card]');
    return card ? card.offsetWidth + GAP : 500;
  }, []);

  // Measure horizontal distance for desktop sticky scroll
  useEffect(() => {
    if (!isDesktop) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop]);

  // Desktop: vertical scroll drives horizontal translate
  useEffect(() => {
    if (!isDesktop) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section || distance === 0) return;
        const top = section.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, -top / distance));
        setProgress(p);
        setX(p * distance);
        const step = getStep(trackRef.current);
        const intro = trackRef.current?.querySelector<HTMLElement>('[data-intro]');
        const introW = intro ? intro.offsetWidth + GAP : 0;
        const idx = Math.round(Math.max(0, p * distance - introW + step / 2) / step);
        setActiveIdx(Math.min(projects.length - 1, Math.max(0, idx)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isDesktop, distance, getStep]);

  // Mobile: native horizontal scroll progress
  const onMobileScroll = () => {
    const el = mobileRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setActiveIdx(Math.min(projects.length - 1, Math.round(el.scrollLeft / getStep(el))));
  };

  const nudge = (dir: 1 | -1) => {
    if (isDesktop) {
      window.scrollBy({ top: dir * getStep(trackRef.current), behavior: 'smooth' });
    } else {
      mobileRef.current?.scrollBy({ left: dir * getStep(mobileRef.current), behavior: 'smooth' });
    }
  };

  const openProject = (p: Project) => setSelected(projects.findIndex((pr) => pr.id === p.id));
  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(() => setSelected((s) => (s === null ? s : (s - 1 + projects.length) % projects.length)), []);
  const next = useCallback(() => setSelected((s) => (s === null ? s : (s + 1) % projects.length)), []);

  const Controls = (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-zinc-900 dark:text-white">{String(activeIdx + 1).padStart(2, '0')}</span>
        <div className="relative h-px w-28 sm:w-48 bg-zinc-300 dark:bg-white/15 overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-sky-600" style={{ width: `${Math.max(4, progress * 100)}%` }} />
        </div>
        <span className="font-mono text-sm text-zinc-500">{String(projects.length).padStart(2, '0')}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => nudge(-1)}
          disabled={progress <= 0.001}
          className="grid h-11 w-11 place-items-center rounded-full border border-zinc-300 text-zinc-800 transition-all hover:border-sky-500 hover:text-sky-700 dark:border-white/15 dark:text-white dark:hover:border-sky-400 dark:hover:text-sky-400 disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Previous"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => nudge(1)}
          disabled={progress >= 0.999}
          className="grid h-11 w-11 place-items-center rounded-full border border-zinc-300 text-zinc-800 transition-all hover:border-sky-500 hover:text-sky-700 dark:border-white/15 dark:text-white dark:hover:border-sky-400 dark:hover:text-sky-400 disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Next"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const EndCard = (
    <div className="flex w-[85vw] sm:w-[380px] shrink-0 snap-center flex-col justify-center rounded-3xl border border-dashed border-zinc-300 dark:border-white/15 p-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-sky-700 dark:text-sky-400">What's next?</p>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-tight">
        Your project could be here.
      </h3>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">Have an idea or a role in mind? Let's talk about how I can help.</p>
      <button
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-sky-600 hover:text-white dark:bg-white dark:text-black"
      >
        Start a conversation
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );

  return (
    <>
      {isDesktop ? (
        <section
          id="portfolio"
          ref={sectionRef}
          className="relative border-t border-zinc-200 dark:border-white/5"
          style={{ height: `calc(100vh + ${distance}px)` }}
        >
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
            <div className="absolute left-1/3 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-sky-500/[0.07] blur-[120px]" />

            <div
              ref={trackRef}
              className="relative flex w-max items-center will-change-transform pl-10 xl:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] pr-10"
              style={{ transform: `translate3d(${-x}px,0,0)`, gap: GAP }}
            >
              <div data-intro className="w-[400px] xl:w-[440px] shrink-0 pr-6">
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-sky-700 dark:text-sky-400">
                  <span>03</span>
                  <span className="h-px w-10 bg-sky-600/40 dark:bg-sky-400/50" />
                  <span className="text-zinc-500 dark:text-zinc-400">Portfolio</span>
                </div>
                <h2 className="mt-5 text-6xl xl:text-7xl font-semibold tracking-tighter text-zinc-900 dark:text-white leading-[0.95]">
                  Selected
                  <br />
                  <span className="bg-gradient-to-r from-sky-600 to-sky-600 dark:from-sky-300 dark:to-sky-300 bg-clip-text text-transparent">work.</span>
                </h2>
                <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A curated set of products I've designed, architected and shipped — from early-stage MVPs to platforms at scale.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-500">
                  <MousePointer2 className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  Keep scrolling to explore
                  <ArrowRight className="h-4 w-4 animate-pulse" />
                </div>
              </div>

              {projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} total={projects.length} onOpen={openProject} />
              ))}
              {EndCard}
            </div>

            <div className="relative mx-auto mt-10 flex w-full max-w-7xl items-center justify-between px-10">
              <p className="text-sm text-zinc-500">Click any project for details</p>
              {Controls}
            </div>
          </div>
        </section>
      ) : (
        <section id="portfolio" className="relative border-t border-zinc-200 dark:border-white/5 py-24">
          <div className="px-6">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-sky-700 dark:text-sky-400">
              <span>03</span>
              <span className="h-px w-10 bg-sky-600/40 dark:bg-sky-400/50" />
              <span className="text-zinc-500 dark:text-zinc-400">Portfolio</span>
            </div>
            <h2 className="mt-5 text-5xl font-semibold tracking-tighter text-zinc-900 dark:text-white leading-[0.95]">
              Selected{' '}
              <span className="bg-gradient-to-r from-sky-600 to-sky-600 dark:from-sky-300 dark:to-sky-300 bg-clip-text text-transparent">work.</span>
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">Products I've designed, architected and shipped.</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-500">
              <Hand className="h-4 w-4 text-sky-600 dark:text-sky-400" /> Swipe to explore
            </p>
          </div>

          <div
            ref={mobileRef}
            onScroll={onMobileScroll}
            className="no-scrollbar mt-10 flex snap-x snap-mandatory overflow-x-auto px-6 pb-6"
            style={{ gap: GAP }}
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} total={projects.length} onOpen={openProject} />
            ))}
            {EndCard}
          </div>

          <div className="mt-4 px-6">{Controls}</div>
        </section>
      )}

      <ProjectModal project={selected === null ? null : projects[selected]} onClose={close} onPrev={prev} onNext={next} />
    </>
  );
}
