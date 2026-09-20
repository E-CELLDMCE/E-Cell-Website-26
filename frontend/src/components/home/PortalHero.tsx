import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PortalHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const whereRef = useRef<HTMLDivElement>(null);
  const ideasRef = useRef<HTMLDivElement>(null);
  const becomeRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);

  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoVignetteRef = useRef<HTMLDivElement>(null);

  const payoffRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const metadataRightRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const metadataLeftRef = useRef<HTMLDivElement>(null);
  const bridgeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force ScrollTrigger to recalculate on mount and resize
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);
    return () => window.removeEventListener('resize', refresh);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop Setup
        gsap.set(videoWrapperRef.current, {
          scale: 40 / 62, // Base size is now 62vw, starting visually at 40vw
          x: '24vw', // Starting further left to sit closer to type (100-40)/2 = 30; 30-6 margin = 24
          y: '0vh',
          borderRadius: '48px',
          borderColor: 'rgba(255,255,255,0.06)',
          boxShadow: '0 0px 0px rgba(0,0,0,0)'
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=220%',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1
          }
        });

        // Stage 1 (0% -> 20%)
        tl.to(becomeRef.current, { opacity: 0, y: -20, duration: 20, ease: 'power1.out' }, 0);
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: 10, duration: 10, ease: 'power1.out' }, 0);
        tl.to(metadataLeftRef.current, { opacity: 0, duration: 15, ease: 'power1.out' }, 0);
        tl.to(bridgeLineRef.current, { opacity: 0, scaleX: 0, duration: 18, ease: 'power1.out' }, 0);
        tl.to(videoWrapperRef.current, { scale: 50 / 62, x: '15vw', duration: 20, ease: 'power2.inOut' }, 0);

        // Stage 2 (20% -> 40%)
        tl.to(whereRef.current, { opacity: 0, y: -20, duration: 20, ease: 'power1.out' }, 20);
        tl.to(videoWrapperRef.current, {
          scale: 62 / 62,
          x: '5vw',
          borderRadius: '24px',
          duration: 20,
          ease: 'power2.inOut'
        }, 20);

        // Stage 3 (40% -> 60%)
        tl.to(impactRef.current, { opacity: 0, y: -20, duration: 20, ease: 'power1.out' }, 40);
        tl.to(videoWrapperRef.current, {
          scale: 78 / 62,
          x: '-5vw',
          borderRadius: '12px',
          duration: 20,
          ease: 'power2.inOut'
        }, 40);
        tl.to(videoVignetteRef.current, { backgroundColor: 'rgba(0,0,0,0.35)', duration: 20 }, 40);

        // Stage 4 (60% -> 85%) - Shrinks & settles
        tl.to(ideasRef.current, { opacity: 0, y: -20, duration: 25, ease: 'power1.out' }, 60);
        tl.to(videoWrapperRef.current, {
          scale: 1, // 62vw
          x: '0vw', // Centered horizontally
          y: '2vh', // Slightly below center
          borderRadius: '4px', // Final sharp corners (editorial)
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          duration: 25,
          ease: 'power2.inOut'
        }, 60);

        tl.fromTo(payoffRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 25, ease: 'power2.out' },
          60);

        // Stage 5 (85% -> 100%) - Lock and text fade in
        tl.to(videoWrapperRef.current, { borderColor: 'rgba(255,255,255,0.10)', duration: 15 }, 85);
        tl.fromTo(captionRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 15 }, 85);
        tl.fromTo(metadataRightRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 15 }, 85);
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile Setup
        gsap.set(videoWrapperRef.current, {
          scale: 60 / 90,
          x: '18vw',
          y: '0vh',
          borderRadius: '36px',
          borderColor: 'rgba(255,255,255,0.06)',
          boxShadow: '0 0px 0px rgba(0,0,0,0)'
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=220%',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1
          }
        });

        // Stage 1
        tl.to(becomeRef.current, { opacity: 0, y: -20, duration: 20, ease: 'power1.out' }, 0);
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: 10, duration: 10, ease: 'power1.out' }, 0);
        tl.to(metadataLeftRef.current, { opacity: 0, duration: 15, ease: 'power1.out' }, 0);
        tl.to(bridgeLineRef.current, { opacity: 0, scaleX: 0, duration: 18, ease: 'power1.out' }, 0);
        tl.to(videoWrapperRef.current, { scale: 70 / 90, x: '10vw', duration: 20, ease: 'power2.inOut' }, 0);

        // Stage 2
        tl.to(whereRef.current, { opacity: 0, y: -20, duration: 20, ease: 'power1.out' }, 20);
        tl.to(videoWrapperRef.current, { scale: 80 / 90, x: '2vw', borderRadius: '24px', duration: 20, ease: 'power2.inOut' }, 20);

        // Stage 3
        tl.to(impactRef.current, { opacity: 0, y: -20, duration: 20, ease: 'power1.out' }, 40);
        tl.to(videoWrapperRef.current, { scale: 100 / 90, x: '0vw', borderRadius: '12px', duration: 20, ease: 'power2.inOut' }, 40);
        tl.to(videoVignetteRef.current, { backgroundColor: 'rgba(0,0,0,0.35)', duration: 20 }, 40);

        // Stage 4
        tl.to(ideasRef.current, { opacity: 0, y: -20, duration: 25, ease: 'power1.out' }, 60);
        tl.to(videoWrapperRef.current, { scale: 1, x: '0vw', y: '-15vh', borderRadius: '4px', boxShadow: '0 30px 80px rgba(0,0,0,0.5)', duration: 25, ease: 'power2.inOut' }, 60);
        tl.fromTo(payoffRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 25, ease: 'power2.out' }, 60);

        // Stage 5
        tl.to(videoWrapperRef.current, { borderColor: 'rgba(255,255,255,0.10)', duration: 15 }, 85);
        tl.fromTo(captionRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 15 }, 85);
        tl.fromTo(metadataRightRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 15 }, 85);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden select-none font-heading text-white flex items-center justify-center">

      {/* 1. LEFT TYPOGRAPHY (Opening State) */}
      <div className="absolute left-[4vw] top-1/2 -translate-y-1/2 flex flex-col items-start z-10 pointer-events-none">
        <div ref={whereRef} className="text-[2vw] md:text-[0.9vw] tracking-[0.4em] uppercase font-normal text-white/60 mb-2">WHERE</div>
        <div ref={ideasRef} className="text-[15vw] md:text-[11vw] font-black text-white leading-[0.92] tracking-[-0.02em]">IDEAS</div>
        <div ref={becomeRef} className="text-[7vw] md:text-[5vw] font-extralight text-white/85 leading-[1.0]">BECOME</div>
        <div ref={impactRef} className="text-[15vw] md:text-[11vw] font-black leading-[0.92] tracking-[-0.02em] text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.85)' }}>IMPACT</div>
      </div>

      {/* 2. THE VIDEO WRAPPER */}
      {/* 
        Base CSS size is the FINAL desktop size (62vw) and Mobile size (90vw).
        Aspect ratio: 4:5 (portrait). Positioned center, scaled by GSAP.
      */}
      <div
        ref={videoWrapperRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[62vw] aspect-[4/5] border border-white/5 z-20 will-change-transform origin-center"
      >
        {/* Inner clip container — inherits border-radius for rounded clipping */}
        <div className="w-full h-full overflow-hidden rounded-[inherit] relative">
          <video
            src="/img_vid/recap.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center"
          />
          <div ref={videoVignetteRef} className="absolute inset-0 pointer-events-none bg-black/15" />
        </div>
        {/* Sub-caption below video card */}
        <div className="absolute top-[calc(100%+12px)] right-0 text-[2vw] md:text-[0.7vw] tracking-[0.35em] text-white/40 uppercase pointer-events-none whitespace-nowrap">
          E-CELL DMCE · RECAP · 25/26
        </div>
      </div>

      {/* BRIDGE LINE — thin horizontal connector between typography and video */}
      <div
        ref={bridgeLineRef}
        className="hidden md:block absolute top-1/2 left-[46vw] w-[6vw] h-[1px] z-10 pointer-events-none origin-left"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
      />

      {/* 3. PAYOFF LINE & LEFT METADATA (Ending State) */}
      <div
        ref={payoffRef}
        className="absolute left-[6vw] top-[auto] bottom-[10vh] md:top-1/2 md:bottom-[auto] md:-translate-y-1/2 z-30 pointer-events-none opacity-0 flex flex-col gap-[8vh]"
      >
        <div className="flex flex-col leading-[0.95]">
          <div className="text-[14vw] md:text-[5.5vw] font-black text-white">We don't pitch.</div>
          <div className="text-[14vw] md:text-[5.5vw] font-black text-[#e11d48]">We build.</div>
        </div>

        <div className="hidden md:flex flex-col gap-1 text-[1.5vw] md:text-[0.7vw] tracking-[0.4em] text-white/40">
          <div>E-CELL DMCE</div>
          <div>INNOVATE · CREATE · ELEVATE</div>
        </div>
      </div>

      {/* 4. VIDEO CAPTION (Ending State) */}
      <div
        ref={captionRef}
        className="absolute left-[4vw] md:left-1/2 md:-translate-x-1/2 bottom-[4vh] md:top-1/2 md:bottom-[auto] md:mt-[calc(38.75vw+4vh)] z-30 opacity-0 pointer-events-none text-[2vw] md:text-[0.75vw] tracking-[0.35em] text-white/50 uppercase font-normal"
      >
        E-CELL DMCE · CHAPTER 25/26
      </div>

      {/* 5. METADATA LEFT (Opening State - fades out) */}
      <div ref={metadataLeftRef} className="absolute left-[4vw] bottom-[4vh] md:bottom-[6vh] z-10 opacity-100 pointer-events-none flex flex-col gap-1 text-[1.5vw] md:text-[0.7vw] tracking-[0.35em] text-white/45">
        <div>E-CELL DMCE</div>
        <div>INNOVATE · CREATE · ELEVATE</div>
      </div>

      {/* 6. SCROLL INDICATOR (Opening State) */}
      <div ref={scrollIndicatorRef} className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
        <div className="w-[1px] h-[40px] bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>

      {/* 7. METADATA RIGHT (Ending State) */}
      <div ref={metadataRightRef} className="absolute right-[4vw] bottom-[4vh] md:bottom-[6vh] z-30 opacity-0 pointer-events-none flex flex-col items-end gap-1 text-[1.5vw] md:text-[0.7vw] tracking-[0.35em] text-white/45 text-right">
        <div>STUDENT DRIVEN</div>
        <div>COMMUNITY BUILT</div>
        <div>IMPACT FOCUSED</div>
      </div>
    </section>
  );
};

export default PortalHero;