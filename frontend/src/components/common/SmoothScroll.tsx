import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Initialize buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    window.__lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Sync route changes & anchor links with Lenis
  useEffect(() => {
    if (window.__lenis) {
      if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
          window.__lenis.scrollTo(target as HTMLElement, { offset: -70 });
          return;
        }
      }
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return <>{children}</>;
};

export default SmoothScroll;
