import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Zap, Trophy, Rocket, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const SponsorsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const sponsorLogos = [
    { name: 'ALUMNI ASSOCIATION', subtitle: 'DMCE ALUMNI NETWORK', icon: <Award className="w-8 h-8 text-yellow-400" /> },
    { name: 'E-CELL NETWORK', subtitle: 'NATIONAL STUDENT CHAPTER', icon: <Zap className="w-8 h-8 text-rose-500" /> },
    { name: 'NEC', subtitle: 'NATIONAL ENTREPRENEURSHIP CHALLENGE', icon: <Trophy className="w-8 h-8 text-amber-400" /> },
    { name: 'ENSPIRE', subtitle: 'ANNUAL E-SUMMIT FEST', icon: <Rocket className="w-8 h-8 text-rose-500" /> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sponsor-badge', {
        scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', once: true },
        scale: 0.8, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sponsors" ref={sectionRef} className="relative w-full bg-black text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-neutral-900">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 130% 90% at 100% 20%, rgba(225,29,72,0.35) 0%, rgba(150,15,25,0.2) 35%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-500/40 text-xs font-bold uppercase tracking-widest text-yellow-400 mb-4 shadow-lg">
            <Handshake className="w-3.5 h-3.5 text-yellow-400" />
            <span>COMMUNITY ALLIANCES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] font-heading">
            OUR SPONSORS & PARTNERS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 uppercase tracking-widest font-heading max-w-2xl mx-auto">
            Empowered by premier alumni, institutions, and national innovation hubs
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {sponsorLogos.map((s) => (
            <div key={s.name} className="sponsor-badge w-full max-w-[280px] rounded-[30px] p-[2px] cursor-pointer group shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2" style={{ background: 'linear-gradient(145deg, #7f1d1d 0%, #e11d48 50%, #991b1b 100%)' }}>
              <div className="w-full h-full rounded-[28px] bg-neutral-950/95 flex flex-col items-center justify-between p-6 text-center border border-red-900/40 group-hover:border-yellow-400/80 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-black/60 border border-neutral-800 flex items-center justify-center shadow-lg group-hover:border-yellow-400/50 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all mb-4">
                  {s.icon}
                </div>
                <span className="text-sm font-black text-yellow-400 tracking-wider uppercase font-heading">{s.name}</span>
                <span className="text-[10px] text-neutral-400 mt-1 uppercase leading-tight font-semibold tracking-wider">{s.subtitle}</span>
                <div className="mt-4 pt-3 border-t border-neutral-900/80 w-full">
                  <span className="text-[9px] uppercase font-bold text-rose-400 tracking-widest">Official Alliance</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-16 items-center justify-items-center pt-10 border-t border-neutral-900">
          {['ALUMNI', 'E-CELL', 'NEC', 'ENSPIRE'].map((name, i) => (
            <div key={name} className="flex flex-col items-center text-center p-4 rounded-2xl bg-neutral-950/50 border border-neutral-900 w-full hover:border-yellow-400/40 transition-colors">
              <span className="text-xl sm:text-2xl font-black text-yellow-400 tracking-widest uppercase font-heading">{name}</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider mt-1 font-semibold">
                {['DMCE Alumni Circle', 'IIT Bombay Fellow', 'Top 10 Finalist', 'Flagship Conclave'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
