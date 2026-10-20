import { useEffect, useRef } from 'react';
import Navbar from './portfolio/Navbar';
import Hero from './portfolio/Hero';
import About from './portfolio/About';
import Experience from './portfolio/Experience';
import Portfolio from './portfolio/Portfolio';
import Contact from './portfolio/Contact';
import Footer from './portfolio/Footer';

function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (event: PointerEvent) => {
      node.style.transform = `translate3d(${event.clientX - 220}px, ${event.clientY - 220}px, 0)`;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 h-[440px] w-[440px] rounded-full bg-sky-400/[0.07] blur-3xl dark:bg-sky-400/10"
    />
  );
}

export default function AppLayout() {
  return (
    <div className="portfolio-root min-h-screen font-sans antialiased selection:bg-sky-500 selection:text-white">
      <PointerGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
