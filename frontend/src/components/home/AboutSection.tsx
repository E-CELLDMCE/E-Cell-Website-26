import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Zap, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = [
        { ref: stat1Ref.current, target: 10, suffix: ' YEARS' },
        { ref: stat2Ref.current, target: 14, suffix: ' HEADS' },
        { ref: stat3Ref.current, target: 100, suffix: '+' },
      ];

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          counters.forEach((item) => {
            if (!item.ref) return;
            const obj = { value: 0 };
            gsap.to(obj, {
              value: item.target,
              duration: 2,
              ease: 'power3.out',
              onUpdate: () => {
                if (item.ref) {
                  item.ref.textContent = `${Math.floor(obj.value)}${item.suffix}`;
                }
              },
            });
          });

          gsap.from('.about-stat-card', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden border-t border-neutral-900"
      style={{
        background: `
          radial-gradient(ellipse 90% 60% at 50% 0%, rgba(225, 29, 72, 0.4), transparent 70%),
          radial-gradient(circle at 80% 60%, rgba(180, 0, 0, 0.25), transparent 50%),
          linear-gradient(to bottom, #000000 0%, #160202 50%, #000000 100%)
        `,
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-500/40 text-xs font-bold uppercase tracking-widest text-yellow-400 mb-6 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>OUR MISSION & PURPOSE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-yellow-400 drop-shadow-[0_2px_15px_rgba(250,204,21,0.4)] mb-8 font-heading">
          WHAT IS E-CELL ?
        </h2>

        <p className="text-neutral-100 text-base sm:text-lg md:text-xl leading-relaxed font-normal max-w-3xl mx-auto px-2 mb-16 sm:mb-20">
          The <span className="text-white font-bold">Entrepreneurship Cell (E-Cell)</span> of Datta Meghe College of Engineering is a student-driven catalyst dedicated to igniting the startup mindset. We bridge the gap between technical ideas and viable commercial enterprises through workshops, hackathons, investor conclaves, and industry mentorship.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-stretch justify-center pt-2">
          <div className="about-stat-card p-8 rounded-3xl bg-neutral-950/80 border border-neutral-800 hover:border-rose-500/60 hover:shadow-[0_0_35px_rgba(225,29,72,0.3)] transition-all duration-300 group flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-yellow-400 mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <span ref={stat1Ref} className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors font-heading">
              0 YEARS
            </span>
            <span className="block mt-2 text-xs uppercase font-bold tracking-widest text-neutral-400">Of Legacy & Leadership</span>
          </div>

          <div className="about-stat-card p-8 rounded-3xl bg-neutral-950/80 border border-neutral-800 hover:border-rose-500/60 hover:shadow-[0_0_35px_rgba(225,29,72,0.3)] transition-all duration-300 group flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-yellow-400 mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <span ref={stat2Ref} className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors font-heading">
              0 HEADS
            </span>
            <span className="block mt-2 text-xs uppercase font-bold tracking-widest text-neutral-400">Departmental Leads</span>
          </div>

          <div className="about-stat-card p-8 rounded-3xl bg-neutral-950/80 border border-neutral-800 hover:border-rose-500/60 hover:shadow-[0_0_35px_rgba(225,29,72,0.3)] transition-all duration-300 group flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-yellow-400 mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center">
              <span ref={stat3Ref} className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors font-heading">
                0+
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors font-heading ml-2">
                MEMBERS
              </span>
            </div>
            <span className="block mt-2 text-xs uppercase font-bold tracking-widest text-neutral-400">Active Student Innovators</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
