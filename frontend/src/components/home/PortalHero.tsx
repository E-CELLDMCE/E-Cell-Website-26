import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', refresh);
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', refresh);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Entrance timing: ~1.2s total on desktop, ~0.9s total on mobile
  const easeCustom = [0.22, 1, 0.36, 1];
  const t = isMobile
    ? {
        video: { delay: 0, duration: 0.45 },
        where: { delay: 0.15, duration: 0.3 },
        ideas: { delay: 0.26, duration: 0.38 },
        become: { delay: 0.38, duration: 0.38 },
        impact: { delay: 0.49, duration: 0.38 },
        meta: { delay: 0.6, duration: 0.3 },
      }
    : {
        video: { delay: 0, duration: 0.6 },
        where: { delay: 0.2, duration: 0.4 },
        ideas: { delay: 0.35, duration: 0.5 },
        become: { delay: 0.5, duration: 0.5 },
        impact: { delay: 0.65, duration: 0.5 },
        meta: { delay: 0.8, duration: 0.4 },
      };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // ──────────────── DESKTOP (>= 768px) ────────────────
      mm.add("(min-width: 768px)", () => {
        // Initial state: 40vw visual width (base size is 58vw -> 40/58), placed in right half
        gsap.set(videoWrapperRef.current, {
          xPercent: -50,
          yPercent: -50,
          scale: 40 / 58,
          x: '25vw',
          y: '0vh',
          borderRadius: '20px',
          borderColor: 'rgba(255,255,255,0.08)',
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

        // Stage 1 (0% -> 30%): Video barely grows (40vw -> 42vw), holds in right zone; type fully visible
        tl.to(becomeRef.current, { opacity: 0, y: -20, duration: 20, ease: 'power1.out' }, 0);
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: 10, duration: 10, ease: 'power1.out' }, 0);
        tl.to(metadataLeftRef.current, { opacity: 0, duration: 15, ease: 'power1.out' }, 0);
        tl.to(videoWrapperRef.current, {
          scale: 42 / 58,
          x: '23vw',
          duration: 30,
          ease: 'power1.inOut'
        }, 0);

        // Stage 2 (30% -> 55%): "WHERE" fades, video grows to 52vw
        tl.to(whereRef.current, { opacity: 0, y: -20, duration: 20, ease: 'power1.out' }, 30);
        tl.to(videoWrapperRef.current, {
          scale: 52 / 58,
          x: '14vw',
          borderRadius: '18px',
          duration: 25,
          ease: 'power2.inOut'
        }, 30);

        // Stage 3 (55% -> 80%): "IMPACT" & "IDEAS" fade out, video peaks at 60vw
        tl.to(impactRef.current, { opacity: 0, y: -20, duration: 20, ease: 'power1.out' }, 55);
        tl.to(ideasRef.current, { opacity: 0, y: -20, duration: 25, ease: 'power1.out' }, 60);
        tl.to(videoWrapperRef.current, {
          scale: 60 / 58,
          x: '6vw',
          borderRadius: '16px',
          duration: 25,
          ease: 'power2.inOut'
        }, 55);
        tl.to(videoVignetteRef.current, { backgroundColor: 'rgba(0,0,0,0.35)', duration: 25 }, 55);

        // Stage 4 (80% -> 100%): Video settles to 58vw at x: '8vw' (clears payoff text completely)
        tl.to(videoWrapperRef.current, {
          scale: 1, // 58vw
          x: '8vw',
          y: '0vh',
          borderRadius: '16px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          duration: 20,
          ease: 'power2.inOut'
        }, 80);

        tl.fromTo(payoffRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 20, ease: 'power2.out' },
          80
        );

        // Stage 5 (85% -> 100%): Subtle border shine and captions fade in
        tl.to(videoWrapperRef.current, { borderColor: 'rgba(255,255,255,0.12)', duration: 15 }, 85);
        tl.fromTo(captionRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 15 }, 85);
        tl.fromTo(metadataRightRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 15 }, 85);
      });

      // ──────────────── MOBILE (< 768px) ────────────────
      mm.add("(max-width: 767px)", () => {
        // Initial state: centered horizontally (xPercent: -50, x: 0vw) in lower zone
        gsap.set(videoWrapperRef.current, {
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          x: '0vw',
          y: '0vh',
          borderRadius: '16px',
          borderColor: 'rgba(255,255,255,0.08)',
          boxShadow: '0 0px 0px rgba(0,0,0,0)'
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1
          }
        });

        // Stage 1 (0% -> 30%): "BECOME" & indicators fade out; video stays stable
        tl.to(becomeRef.current, { opacity: 0, y: -15, duration: 20, ease: 'power1.out' }, 0);
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: 10, duration: 10, ease: 'power1.out' }, 0);
        tl.to(metadataLeftRef.current, { opacity: 0, duration: 15, ease: 'power1.out' }, 0);
        tl.to(videoWrapperRef.current, { y: '-4vh', duration: 25, ease: 'power1.inOut' }, 5);

        // Stage 2 (30% -> 60%): "WHERE" & "IMPACT" fade; video glides toward vertical center
        tl.to(whereRef.current, { opacity: 0, y: -15, duration: 20, ease: 'power1.out' }, 30);
        tl.to(impactRef.current, { opacity: 0, y: -15, duration: 20, ease: 'power1.out' }, 35);
        tl.to(videoWrapperRef.current, {
          y: '-12vh',
          scale: 1.04,
          duration: 30,
          ease: 'power2.inOut'
        }, 30);
        tl.to(videoVignetteRef.current, { backgroundColor: 'rgba(0,0,0,0.3)', duration: 25 }, 30);

        // Stage 3 (60% -> 85%): "IDEAS" fades out; video settles into final frame
        tl.to(ideasRef.current, { opacity: 0, y: -15, duration: 25, ease: 'power1.out' }, 60);
        tl.to(videoWrapperRef.current, {
          y: '-16vh',
          scale: 1,
          borderRadius: '14px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
          duration: 25,
          ease: 'power2.inOut'
        }, 60);

        // Stage 4 (65% -> 90%): Payoff line fades in below video with ample spacing
        tl.fromTo(payoffRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 25, ease: 'power2.out' },
          65
        );

        // Stage 5 (85% -> 100%): Details fade in
        tl.to(videoWrapperRef.current, { borderColor: 'rgba(255,255,255,0.12)', duration: 15 }, 85);
        tl.fromTo(captionRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 15 }, 85);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden select-none font-heading text-white flex items-center justify-center"
    >
      {/* 0. SUBTLE RED AMBIENT GRADIENT BEHIND VIDEO CARD (Prompt #7) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Desktop gradient: behind video card (approx 68% width, 55% height) */}
        <div
          className="hidden md:block w-full h-full"
          style={{
            background: 'radial-gradient(circle 35vw at 68% 55%, rgba(225, 29, 72, 0.12) 0%, rgba(225, 29, 72, 0.05) 45%, transparent 70%)',
          }}
        />
        {/* Mobile gradient: centered in lower video zone */}
        <div
          className="block md:hidden w-full h-full"
          style={{
            background: 'radial-gradient(circle 50vw at 50% 60%, rgba(225, 29, 72, 0.12) 0%, rgba(225, 29, 72, 0.04) 45%, transparent 75%)',
          }}
        />
      </div>

      {/* 1. LEFT / UPPER TYPOGRAPHY (Opening State) */}
      {/* On mobile: sits in upper section (top-[14vh]) to ensure ZERO overlap with video card below */}
      <div className="absolute left-[6vw] md:left-[4vw] top-[14vh] md:top-1/2 md:-translate-y-1/2 flex flex-col items-start z-10 pointer-events-none">
        
        {/* Red accent bar + "WHERE" (t=200ms: opacity 0 -> 1, y: 10 -> 0, 400ms) */}
        <div ref={whereRef} className="mb-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t.where.delay, duration: t.where.duration, ease: easeCustom }}
            className="flex items-center gap-[8px]"
          >
            <div className="w-[3px] h-[18px] md:h-[24px] bg-[#e11d48]" />
            <div className="text-xs md:text-[0.9vw] tracking-[0.4em] uppercase font-normal text-white/70">
              WHERE
            </div>
          </motion.div>
        </div>

        {/* "IDEAS" (t=350ms: opacity 0 -> 1, y: 30 -> 0, 500ms) */}
        <div
          ref={ideasRef}
          className="text-[13vw] md:text-[11vw] font-black text-white leading-[0.92] tracking-[-0.02em]"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t.ideas.delay, duration: t.ideas.duration, ease: easeCustom }}
          >
            IDEAS
          </motion.div>
        </div>

        {/* "BECOME" (t=500ms: opacity 0 -> 1, y: 30 -> 0, 500ms) */}
        <div
          ref={becomeRef}
          className="text-[6.5vw] md:text-[5vw] font-extralight text-white/85 leading-[1.0] my-0.5"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t.become.delay, duration: t.become.duration, ease: easeCustom }}
          >
            BECOME
          </motion.div>
        </div>

        {/* Yellow outline for "IMPACT" (t=650ms: opacity 0 -> 1, y: 30 -> 0, 500ms) */}
        <div
          ref={impactRef}
          className="text-[13vw] md:text-[11vw] font-black leading-[0.92] tracking-[-0.02em] text-transparent"
          style={{ WebkitTextStroke: '1.2px #facc15' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t.impact.delay, duration: t.impact.duration, ease: easeCustom }}
          >
            IMPACT
          </motion.div>
        </div>
      </div>

      {/* 2. THE VIDEO WRAPPER (16:9 Aspect Ratio) */}
      {/* t=0ms: Video wrapper fades in (opacity 0 -> 1, 600ms, ease-out) */}
      <div
        ref={videoWrapperRef}
        className="absolute left-1/2 top-[58vh] md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[86vw] md:w-[58vw] aspect-video border border-white/10 rounded-2xl md:rounded-3xl z-20 will-change-transform origin-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: t.video.delay, duration: t.video.duration, ease: 'easeOut' }}
          className="w-full h-full relative"
        >
          {/* Inner clip container — rounded clipping */}
          <div className="w-full h-full overflow-hidden rounded-[inherit] relative bg-neutral-950">
            <video
              src="/img_vid/recap.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center"
            />
            <div ref={videoVignetteRef} className="absolute inset-0 pointer-events-none bg-black/15 transition-colors" />
          </div>

          {/* Sub-caption below video card */}
          <div className="absolute top-[calc(100%+10px)] right-0 text-[11px] md:text-[0.7vw] tracking-[0.3em] text-white/45 uppercase pointer-events-none whitespace-nowrap">
            E-CELL DMCE · RECAP · 25/26
          </div>
        </motion.div>
      </div>

      {/* 3. PAYOFF LINE & LEFT METADATA (Ending State) */}
      <div
        ref={payoffRef}
        className="absolute left-[6vw] bottom-[14vh] md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-30 pointer-events-none opacity-0 flex flex-col gap-6 md:gap-[8vh]"
      >
        <div className="flex flex-col leading-[0.95]">
          <div className="text-3xl sm:text-4xl md:text-[4.8vw] font-black text-white tracking-tight">
            We don't pitch.
          </div>
          <div className="text-3xl sm:text-4xl md:text-[4.8vw] font-black text-[#e11d48] tracking-tight">
            We build.
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-1 text-[11px] md:text-[0.7vw] tracking-[0.4em] text-white/40">
          <div>E-CELL DMCE</div>
          <div>INNOVATE · CREATE · ELEVATE</div>
        </div>
      </div>

      {/* 4. VIDEO CAPTION (Ending State) */}
      <div
        ref={captionRef}
        className="absolute left-[6vw] md:left-1/2 md:-translate-x-1/2 bottom-[6vh] md:top-1/2 md:bottom-auto md:mt-[calc(17vw+5vh)] z-30 opacity-0 pointer-events-none text-[11px] md:text-[0.75vw] tracking-[0.35em] text-white/50 uppercase font-normal"
      >
        E-CELL DMCE · CHAPTER 25/26
      </div>

      {/* 5. METADATA LEFT (Opening State - t=800ms: opacity 0 -> 1, 400ms) */}
      <div
        ref={metadataLeftRef}
        className="absolute left-[6vw] md:left-[4vw] bottom-[3.5vh] md:bottom-[6vh] z-10 opacity-100 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: t.meta.delay, duration: t.meta.duration, ease: 'easeOut' }}
          className="flex flex-col gap-1 text-[11px] md:text-[0.7vw] tracking-[0.35em] text-white/45"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#facc15]" />
            <span className="font-semibold text-white/60">E-CELL DMCE</span>
          </div>
          <div className="text-[10px] md:text-[0.7vw] text-white/40">INNOVATE · CREATE · ELEVATE</div>
        </motion.div>
      </div>

      {/* 6. SCROLL INDICATOR (Opening State - t=800ms: opacity 0 -> 1, 400ms) */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-[3.5vh] left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: t.meta.delay, duration: t.meta.duration, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <div className="w-[1px] h-[36px] md:h-[40px] bg-gradient-to-b from-[#facc15] to-transparent animate-pulse" />
        </motion.div>
      </div>

      {/* 7. METADATA RIGHT (Ending State - Desktop only) */}
      <div
        ref={metadataRightRef}
        className="hidden md:flex absolute right-[4vw] bottom-[6vh] z-30 opacity-0 pointer-events-none flex-col items-end gap-1 text-[0.7vw] tracking-[0.35em] text-white/45 text-right"
      >
        <div>STUDENT DRIVEN</div>
        <div>COMMUNITY BUILT</div>
        <div>IMPACT FOCUSED</div>
      </div>
    </section>
  );
};

export default PortalHero;