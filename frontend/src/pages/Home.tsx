import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket } from 'lucide-react';

import PortalHero from '../components/home/PortalHero';
import AboutSection from '../components/home/AboutSection';
import SpeakersSection from '../components/home/SpeakersSection';
import SponsorsSection from '../components/home/SponsorsSection';
import BackboneSection from '../components/home/BackboneSection';
import AdvisorSection from '../components/home/AdvisorSection';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-body selection:bg-rose-600 selection:text-white overflow-hidden">
      
      {/* 1. HERO — Single video (recap.mp4) shrinks to bottom-right, giant typography reveal */}
      <PortalHero />

      {/* 2. WHAT IS E-CELL — GSAP counter animations (10 Years, 14 Heads, 100+ Members) */}
      <AboutSection />

      {/* 3. PREVIOUS SPEAKERS — 3 keynote cards with GSAP fade-up */}
      <SpeakersSection />

      {/* 4. SPONSORS & PARTNERS — Gradient badges + partner ribbon */}
      <SponsorsSection />

      {/* 5. BACKBONE — Team banner (ecell-team.jpg) + core council */}
      <BackboneSection />

      {/* 6. ADVISOR — Prof. Dr. Arun K. Sharma (ecell_advisor.jpg) */}
      <AdvisorSection />

      {/* 7. CALL TO ACTION */}
      <section className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-neutral-950 to-black text-center border-t border-neutral-900 overflow-hidden">
        {/* Ambient red glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[350px] bg-radial from-rose-600/20 via-red-950/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-500/40 text-xs font-bold uppercase tracking-widest text-yellow-400 shadow-lg">
            <Rocket className="w-3.5 h-3.5 text-yellow-400" />
            <span>BECOME A FOUNDER TODAY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white font-heading tracking-tight leading-tight">
            READY TO TURN YOUR IDEA <br className="hidden sm:inline" />
            INTO A <span className="text-yellow-400 glow-text-yellow">VENTURE ?</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Join DMCE E-Cell. Compete in pitch battles, attend exclusive masterclasses with C-suite founders, and connect with seed investors.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-5">
            <Link
              to="/events"
              className="px-9 py-4 rounded-full font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-rose-600 via-red-700 to-red-800 text-white border border-red-500/50 hover:from-rose-500 hover:to-red-700 hover:shadow-[0_0_30px_rgba(225,29,72,0.7)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Explore Flagship Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/login"
              className="px-9 py-4 rounded-full font-bold text-sm tracking-wider uppercase bg-neutral-900/90 text-neutral-200 border border-neutral-700 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.2)] transition-all transform hover:scale-105 active:scale-95"
            >
              Student Portal Access
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
