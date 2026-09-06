import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PortalHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalWrapperRef = useRef<HTMLDivElement>(null);
  const recapVideoRef = useRef<HTMLVideoElement>(null);
  const diveVideoRef = useRef<HTMLVideoElement>(null);
  const cursorAuraRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef<boolean>(false);

  // 0 = recap.mp4 active, 1 = dive.mp4 active
  const [activeVideo, setActiveVideo] = useState<0 | 1>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Click-to-Zoom "Portal Dive" Transition
  const handlePortalClick = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const fromVideo = activeVideo === 0 ? recapVideoRef.current : diveVideoRef.current;
    const toVideo = activeVideo === 0 ? diveVideoRef.current : recapVideoRef.current;

    if (!fromVideo || !toVideo) {
      isTransitioning.current = false;
      return;
    }

    // Ensure target video is playing smoothly
    toVideo.play().catch(() => {});

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveVideo((prev) => (prev === 0 ? 1 : 0));
        isTransitioning.current = false;
      },
    });

    // Detect mobile for lighter scale factor
    const isMobile = window.innerWidth < 768;
    const zoomScale = isMobile ? 1.35 : 1.5;

    // Bring next video above while scaling
    gsap.set(toVideo, {
      zIndex: 2,
      opacity: 0,
      scale: 0.8,
      filter: 'brightness(1.4) blur(4px)',
    });
    gsap.set(fromVideo, {
      zIndex: 1,
    });

    // Animate active video zooming out and fading into the portal
    tl.to(
      fromVideo,
      {
        scale: zoomScale,
        opacity: 0,
        filter: 'brightness(1.8) blur(8px)',
        duration: 1.1,
        ease: 'power2.inOut',
      },
      0
    );

    // Simultaneously reveal target video scaling up to full screen
    tl.to(
      toVideo,
      {
        scale: 1,
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
        duration: 1.1,
        ease: 'power2.inOut',
      },
      0.05
    );

    // Subtle portal flash on click
    if (portalWrapperRef.current) {
      tl.fromTo(
        portalWrapperRef.current,
        { boxShadow: 'inset 0 0 60px rgba(239, 68, 68, 0.6), 0 0 50px rgba(250, 204, 21, 0.4)' },
        {
          boxShadow: 'inset 0 0 0px rgba(0, 0, 0, 0), 0 0 0px rgba(0, 0, 0, 0)',
          duration: 1.0,
          ease: 'power1.out',
        },
        0
      );
    }
  }, [activeVideo]);

  // Cursor Aura Following Effect (Purely visual, zero text)
  useEffect(() => {
    const container = containerRef.current;
    const aura = cursorAuraRef.current;
    if (!container || !aura) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(aura, {
        x,
        y,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', onMouseMove);
    return () => {
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // GSAP Context & ScrollTrigger clip-path setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Scroll-triggered clip-path shrinking to centered rectangle
      // Full screen initially: inset(0% 0% 0% 0%)
      // Shrinks on scroll: inset(18% 28% round 28px) on desktop, inset(12% 8% round 20px) on mobile
      const targetInset = isMobile
        ? 'inset(12% 8% 12% 8% round 20px)'
        : 'inset(18% 28% 18% 28% round 28px)';

      gsap.fromTo(
        portalWrapperRef.current,
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
        },
        {
          clipPath: targetInset,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=75%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      {/* Background ambient lighting visible when portal shrinks */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-radial from-red-600/25 via-red-950/15 to-transparent blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[35vw] h-[35vh] bg-radial from-yellow-500/15 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vh] bg-radial from-red-900/20 to-transparent blur-3xl" />
      </div>

      {/* Main Video Portal Container (Animated via clip-path) */}
      <div
        ref={portalWrapperRef}
        onClick={handlePortalClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-full cursor-pointer overflow-hidden z-10 [will-change:clip-path] [transform:translate3d(0,0,0)]"
        style={{
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
        }}
      >
        {/* First Video: recap.mp4 */}
        <video
          ref={recapVideoRef}
          src="/img_vid/recap.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-center [will-change:transform,opacity] [transform:translate3d(0,0,0)] z-[1]"
        />

        {/* Second Video: dive.mp4 */}
        <video
          ref={diveVideoRef}
          src="/img_vid/dive.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-center [will-change:transform,opacity] [transform:translate3d(0,0,0)] opacity-0 scale-[0.8] z-[0]"
        />

        {/* Dark subtle vignette over videos for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none z-[3]" />

        {/* Dynamic Interactive Portal Cursor Aura (Follows mouse, zero text) */}
        <div
          ref={cursorAuraRef}
          className={`hidden md:block pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[10] transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Glowing Aperture Portal Rings */}
          <div className="relative flex items-center justify-center w-20 h-20">
            <div className="absolute inset-0 rounded-full border border-yellow-400/40 animate-ping opacity-35" />
            <div className="w-14 h-14 rounded-full border-2 border-red-500/80 bg-red-950/20 backdrop-blur-xs flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.5)]">
              <div className="w-5 h-5 rounded-full border border-yellow-400/80 bg-yellow-400/20 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalHero;
