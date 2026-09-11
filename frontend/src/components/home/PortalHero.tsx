import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * PortalHero — Awwwards-level hero section
 *
 * Single video (recap.mp4) starts fullscreen, smoothly shrinks and docks into
 * the bottom-right corner without cropping.
 * Clean, minimal metallic "E-CELL" typography with subtle red stroke reveals behind it.
 * "Small Steps Big Impact" sits to the LEFT of the video card (never hidden).
 * GSAP ScrollTrigger with scrub: 1.5 for buttery smooth, reversible motion.
 */
export const PortalHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dockedTargetRef = useRef<HTMLDivElement>(null);
  const typoBgRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const handLeftRef = useRef<HTMLDivElement>(null);
  const handRightRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Helper function to measure exact docked target bounds relative to hero container
      const getDockedMetrics = () => {
        if (!heroRef.current || !dockedTargetRef.current) {
          const isMob = window.innerWidth < 768;
          return {
            width: isMob ? 230 : 440,
            height: isMob ? 130 : 248,
            left: isMob ? window.innerWidth - 246 : window.innerWidth - 488,
            top: isMob ? window.innerHeight - 190 : window.innerHeight - 310,
          };
        }
        const heroRect = heroRef.current.getBoundingClientRect();
        const targetRect = dockedTargetRef.current.getBoundingClientRect();
        return {
          width: targetRect.width,
          height: targetRect.height,
          left: targetRect.left - heroRect.left,
          top: targetRect.top - heroRect.top,
        };
      };

      // Master GSAP ScrollTrigger timeline: pinned, scrubbed, slow & buttery smooth (scrub: 1.5)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ──────────────── 1. VIDEO SHRINK & DOCK (PERFECT BOUNDS, NO CROPPING) ────────────────
      tl.fromTo(
        videoWrapperRef.current,
        {
          width: '100%',
          height: '100%',
          left: '0px',
          top: '0px',
          borderRadius: '0px',
        },
        {
          width: () => `${getDockedMetrics().width}px`,
          height: () => `${getDockedMetrics().height}px`,
          left: () => `${getDockedMetrics().left}px`,
          top: () => `${getDockedMetrics().top}px`,
          borderRadius: () => (window.innerWidth < 768 ? '16px' : '24px'),
          boxShadow: '0 0 35px rgba(225, 29, 72, 0.35), 0 25px 60px rgba(0, 0, 0, 0.95)',
          ease: 'power2.inOut',
          duration: 1,
        },
        0
      );

      // ──────────────── 2. INITIAL SCROLL INDICATOR FADE OUT ────────────────
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: -25,
          duration: 0.25,
          ease: 'power1.out',
        },
        0
      );

      // ──────────────── 3. REVEAL MINIMAL & SOPHISTICATED "E-CELL" TITLE ────────────────
      tl.fromTo(
        centerTextRef.current,
        { opacity: 0, scale: 0.94, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.12
      );

      // ──────────────── 4. REVEAL SUBTITLE ────────────────
      tl.fromTo(
        subTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.28
      );

      // ──────────────── 5. REVEAL LEFT TEXT COLUMN ────────────────
      tl.fromTo(
        leftTextRef.current,
        { opacity: 0, x: -35 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        0.22
      );

      // ──────────────── 6. REVEAL RIGHT TEXT COLUMN ────────────────
      tl.fromTo(
        rightTextRef.current,
        { opacity: 0, x: 35 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        0.22
      );

      // ──────────────── 7. REVEAL HANDWRITTEN ACCENTS (ZERO OVERLAP) ────────────────
      // Bottom-left "Dream Plan Build"
      tl.fromTo(
        handLeftRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        0.38
      );

      // Bottom-right "Small Steps Big Impact" (sits safely to the left of the video card)
      tl.fromTo(
        handRightRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        0.42
      );

      // ──────────────── 8. REVEAL BOTTOM BAR ────────────────
      tl.fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power1.out' },
        0.48
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      {/* ═══════════ SUBTLE CYBERNETIC ACCENT LINES (MINIMAL, LIKE REFERENCE) ═══════════ */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep subtle dark vignette, no muddy blur blobs */}
        <div className="absolute inset-0 bg-radial from-red-950/20 via-black to-black" />

        {/* Diagonal Tech Cut Lines matching the -12deg slant of E-CELL logo */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
          fill="none"
        >
          <line
            x1="-100"
            y1="180"
            x2="1600"
            y2="680"
            stroke="rgba(225, 29, 72, 0.3)"
            strokeWidth="1"
          />
          <line
            x1="-50"
            y1="160"
            x2="1650"
            y2="660"
            stroke="rgba(225, 29, 72, 0.15)"
            strokeWidth="1"
            strokeDasharray="12 12"
          />
          <line
            x1="200"
            y1="820"
            x2="1400"
            y2="820"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* ═══════════ TYPOGRAPHY BACKGROUND LAYER (z-[1]) ═══════════ */}
      <div ref={typoBgRef} className="absolute inset-0 z-[1] pointer-events-none">

        {/* LEFT TEXT COLUMN: IDEAS / MEET / OPPORTUNITY */}
        <div
          ref={leftTextRef}
          className="absolute left-6 sm:left-10 lg:left-14 top-24 sm:top-28 lg:top-32 flex flex-col gap-0.5 opacity-0 select-none"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-neutral-300 font-heading">
            IDEAS
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-rose-500 font-heading">
              MEET
            </span>
            <div className="w-8 sm:w-12 h-[1px] bg-rose-500/70" />
            <span className="text-rose-500 text-xs font-mono">+</span>
          </div>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-neutral-300 font-heading">
            OPPORTUNITY
          </span>
        </div>

        {/* RIGHT TEXT COLUMN: DMCE / ENTREPRENEURSHIP / INNOVATION / COMMUNITY / GROWTH */}
        <div
          ref={rightTextRef}
          className="absolute right-6 sm:right-10 lg:right-14 top-24 sm:top-28 lg:top-32 flex flex-col gap-0.5 text-right opacity-0 select-none"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-rose-500 font-heading">
            DMCE
          </span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400 font-heading">
            ENTREPRENEURSHIP
          </span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400 font-heading">
            INNOVATION
          </span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400 font-heading">
            COMMUNITY
          </span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400 font-heading">
            GROWTH
          </span>
        </div>

        {/* CENTER: CLEAN, SOPHISTICATED "E-CELL" TITLE (LESS RED, MINIMAL AESTHETIC) */}
        <div
          ref={centerTextRef}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none px-4"
        >
          <div className="flex items-center justify-center font-heading font-black italic select-none transform -skew-x-12">
            {/* The 3 Slanted Red Bars representing 'E' from official E-Cell DMCE logo */}
            <div className="flex flex-col justify-between h-[7vw] sm:h-[8vw] lg:h-[9vw] max-h-[130px] mr-[1.5vw] sm:mr-[2vw]">
              <span className="w-[7.5vw] sm:w-[8.5vw] lg:w-[9.5vw] max-w-[135px] h-[24%] rounded-[2px] bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 shadow-[0_0_12px_rgba(225,29,72,0.4)] border border-rose-400/40" />
              <span className="w-[6.5vw] sm:w-[7.5vw] lg:w-[8.5vw] max-w-[120px] h-[24%] rounded-[2px] bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 shadow-[0_0_12px_rgba(225,29,72,0.4)] border border-rose-400/40" />
              <span className="w-[7.5vw] sm:w-[8.5vw] lg:w-[9.5vw] max-w-[135px] h-[24%] rounded-[2px] bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 shadow-[0_0_12px_rgba(225,29,72,0.4)] border border-rose-400/40" />
            </div>

            {/* The Slanted Hyphen '-' */}
            <span className="w-[3vw] sm:w-[3.5vw] lg:w-[4vw] max-w-[55px] h-[1.8vw] sm:h-[2vw] lg:h-[2.2vw] max-h-[30px] rounded-[2px] bg-gradient-to-r from-rose-600 to-red-700 shadow-[0_0_10px_rgba(225,29,72,0.35)] border border-rose-400/40 mr-[1.5vw]" />

            {/* 'CELL' in Clean Semi-Transparent Metallic with Crisp Subtle Red Stroke */}
            <h1
              className="text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[15vw] font-black tracking-wider uppercase font-heading leading-none ecell-title"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(190, 190, 200, 0.7) 40%, rgba(50, 50, 60, 0.85) 85%, rgba(20, 20, 25, 0.95) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              CELL
            </h1>
          </div>

          {/* Minimalist Subtitle */}
          <div ref={subTextRef} className="mt-4 sm:mt-6 flex flex-col items-center gap-1 opacity-0">
            <p className="text-[9px] sm:text-xs lg:text-sm tracking-[0.45em] uppercase text-neutral-400 font-heading font-medium">
              ENTREPRENEURSHIP CELL • DMCE
            </p>
          </div>
        </div>

        {/* BOTTOM-LEFT: Handwritten "Dream. Plan. Build." + Arrow pointing up-right */}
        <div
          ref={handLeftRef}
          className="absolute left-6 sm:left-10 lg:left-14 bottom-14 sm:bottom-18 lg:bottom-22 opacity-0 select-none z-[12]"
        >
          <div className="flex flex-col font-handwritten text-lg sm:text-2xl lg:text-3xl leading-tight">
            <span className="text-white/85">Dream</span>
            <span className="text-rose-500 text-xl sm:text-3xl lg:text-4xl font-bold italic">Plan</span>
            <span className="text-white/85">Build</span>
          </div>
          {/* Arrow pointing up-right toward center */}
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-white/60 mt-1"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 32 C 12 24, 20 16, 30 10" />
            <polyline points="20 10, 30 10, 30 20" />
          </svg>
        </div>

        {/* BOTTOM-RIGHT DOCKED LAYOUT: Text on the LEFT, Video Target on the RIGHT */}
        <div className="absolute right-4 sm:right-8 lg:right-12 bottom-4 sm:bottom-6 lg:bottom-8 flex items-end gap-3 sm:gap-6 pointer-events-none z-[12]">
          
          {/* Handwritten "Small Steps Big Impact" — Safely placed ON THE LEFT of the video card */}
          <div
            ref={handRightRef}
            className="flex flex-col items-end text-right opacity-0 select-none"
          >
            <div className="flex flex-col font-handwritten text-base sm:text-xl lg:text-2xl leading-tight items-end">
              <span className="text-white/80">Small</span>
              <span className="text-white/80">Steps</span>
              <span className="text-rose-500 text-xl sm:text-2xl lg:text-3xl font-bold italic">Big</span>
              <span className="text-white/80">Impact</span>
            </div>
            {/* Curved arrow pointing right directly toward the video card */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-white/60 mt-0.5"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 14 C 14 14, 24 18, 30 26" />
              <polyline points="20 26, 30 26, 30 16" />
            </svg>
          </div>

          {/* DOCKED TARGET PLACEHOLDER (Used by GSAP to calculate exact screen coordinates) */}
          <div
            ref={dockedTargetRef}
            className="w-[56vw] sm:w-[42vw] lg:w-[32vw] max-w-[460px] aspect-video rounded-2xl lg:rounded-3xl border border-rose-500/30 relative pointer-events-none"
          >
            {/* Subtle tech corner brackets matching reference */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-rose-500/70" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-rose-500/70" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-rose-500/70" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-rose-500/70" />
          </div>

        </div>

        {/* BOTTOM BAR: "E-CELL DMCE ───✦───" & "SCROLL TO EXPLORE" */}
        <div
          ref={bottomBarRef}
          className="absolute bottom-3 sm:bottom-5 left-0 right-0 flex items-center justify-between px-6 sm:px-10 lg:px-14 opacity-0 select-none z-[15]"
        >
          {/* Left: Brand name with decorative line and star */}
          <div className="flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neutral-400 font-heading font-bold">
            <span className="text-white">E-CELL DMCE</span>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-8 lg:w-12 h-[1px] bg-neutral-800" />
              <span className="text-rose-500 text-xs">✦</span>
              <span className="w-8 lg:w-12 h-[1px] bg-neutral-800" />
            </div>
          </div>

          {/* Center: Scroll to explore mouse indicator */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-4 h-7 rounded-full border border-neutral-600 flex items-start justify-center pt-1">
              <div className="w-1 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </div>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-heading">
              SCROLL TO EXPLORE
            </span>
          </div>

          {/* Right spacer for symmetrical centering */}
          <div className="w-24 hidden lg:block" />
        </div>

      </div>

      {/* ═══════════ VIDEO CONTAINER (z-[10]) — ANIMATES TO DOCKED TARGET ═══════════ */}
      <div
        ref={videoWrapperRef}
        className="absolute top-0 left-0 w-full h-full z-[10] overflow-hidden will-change-transform"
        style={{
          boxShadow: '0 0 0 rgba(0,0,0,0)',
        }}
      >
        {/* Only ONE video: recap.mp4 */}
        <video
          ref={videoRef}
          src="/img_vid/recap.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

        {/* Inner border that shines as video shrinks into card */}
        <div className="absolute inset-0 rounded-[inherit] border border-rose-500/40 pointer-events-none" />
      </div>

      {/* ═══════════ SCROLL INDICATOR (INITIAL FULLSCREEN STATE) ═══════════ */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[20] flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-5 h-9 rounded-full border-2 border-white/50 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white animate-bounce" />
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-neutral-300 font-heading font-bold">
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
};

export default PortalHero;
